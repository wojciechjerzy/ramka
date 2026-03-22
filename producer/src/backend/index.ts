import express from 'express';
import QRCode from 'qrcode';
import os from 'os';
import fs from 'fs';
import path from 'path';
import type {Consumer} from './consumer/consumer.js';
import {imageToFill} from './image.js';
import {RealConsumer} from './consumer/realConsumer.js';
import {MockConsumer} from './consumer/mockConsumer.js';
import {photosGetEndpoint} from './photosGetEndpoint.js';
import {configAlbumEndpoint} from './configAlbumEndpoint.js';
import {clearPostEndpoint} from './clearPostEndpoint.js';
import {displayPostEndpoint} from './displayPostEndpoint.js';
import {fillPostEndpoint} from './fillPostEndpoint.js';
import {fetchImageUrls} from "./fetchImageUrls.js";
import {getConfig} from "./config.js";
import {UpdateEvent} from "./updateEvent.js";

const PORT = 3000;
const IMG_PATH = path.join(import.meta.dirname, '..', '..', 'test.png');
const PUBLIC_DIR = path.join(import.meta.dirname, '..', '..', 'public');

function getLocalIp(): string {
    for (const ifaces of Object.values(os.networkInterfaces())) {
        for (const iface of ifaces ?? []) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

async function generateQr(url: string): Promise<Buffer> {
    return QRCode.toBuffer(url, {width: 120, margin: 1});
}

async function displayStartupImage(consumer: Consumer, qrBuffer: Buffer) {
    const imageBuffer = fs.readFileSync(IMG_PATH);
    const payload = await imageToFill(imageBuffer, qrBuffer);
    consumer.sendAction({name: 'fill', payload});
}

async function main() {
    const albumUpdated = new UpdateEvent();
    const consumer: Consumer = process.platform === 'darwin' ? new MockConsumer() : new RealConsumer();

    const ip = getLocalIp();
    const url = `http://${ip}:${PORT}/index.html`;
    const qrBuffer = await generateQr(url);

    const app = express();

    app.use(express.json());
    app.use(express.static(PUBLIC_DIR));

    configAlbumEndpoint(app, () => albumUpdated.invoke());
    photosGetEndpoint(app);
    clearPostEndpoint(app, consumer);
    displayPostEndpoint(app, consumer, qrBuffer);
    fillPostEndpoint(app, consumer);

    app.listen(PORT, async () => {
        await displayStartupImage(consumer, qrBuffer);
        console.log(`\nReady. ${url}\n`);
        await sleep(5000, albumUpdated);
        loop(consumer, qrBuffer, albumUpdated);
    });
}

function sleep(ms: number, event?: UpdateEvent) {
    return new Promise<void>(resolve => {
        const timer = setTimeout(resolve, ms);
        event?.addListener(function handler() {
            clearTimeout(timer);
            event.removeListener(handler);
            resolve();
        });
    });
}

async function loop(consumer: Consumer, qrBuffer: Buffer, albumUpdated: UpdateEvent) {
    while (true) {
        const { albumUrl } = getConfig();
        if (albumUrl) {
            const urls = await fetchImageUrls(albumUrl);
            if (urls.length > 0) {
                const url = urls[Math.floor(Math.random() * urls.length)]!;
                const imageRes = await fetch(url);
                const imageBuffer = Buffer.from(await imageRes.arrayBuffer());
                const payload = await imageToFill(imageBuffer, qrBuffer);
                consumer.sendAction({ name: 'fill', payload });
            }
        }
        await sleep(60 * 60 * 1000, albumUpdated);
    }
}

main();
