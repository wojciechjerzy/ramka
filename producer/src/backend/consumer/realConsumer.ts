import {type ChildProcessWithoutNullStreams, spawn} from "child_process";
import path from "path";
import type {Action} from "./action.js";
import type {Consumer} from "./consumer.js";

export class RealConsumer implements Consumer {
    private child: ChildProcessWithoutNullStreams;

    constructor() {
        const CONSUMER_PATH = path.join(import.meta.dirname, '..', '..', '..', '..', 'consumer', 'consume.py');
        this.child = spawn('python3', [CONSUMER_PATH]);

        this.child.stderr.on('data', (data: Buffer) => {
            process.stderr.write(`[consumer] ${data}`);
        });

        this.child.on('exit', (code) => {
            console.error(`[consumer] exited with code ${code}`);
        });
    }

    sendAction(action: Action) {
        this.child.stdin.write(JSON.stringify(action) + '\n');
    }
}