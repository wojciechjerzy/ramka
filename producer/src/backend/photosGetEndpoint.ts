import type {Express} from 'express';
import {getConfig} from './config.js';
import {fetchImageUrls} from "./fetchImageUrls.js";

export function photosGetEndpoint(app: Express) {
    app.get('/photos', async (req, res) => {
        const url = getConfig().albumUrl;
        if (!url) {
            res.status(400).json({error: 'Album URL not configured'});
            return;
        } else {
            res.json(await fetchImageUrls(url));
        }
    });
}