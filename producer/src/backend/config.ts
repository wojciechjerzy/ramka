import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(import.meta.dirname, '..', '..', 'config.json');

interface Config {
    albumUrl?: string;
}

function readConfig(): Config {
    try {
        return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8')) as Config;
    } catch {
        return {};
    }
}

export function getConfig() {
    return readConfig();
}

export function updateConfig(patch: Partial<Config>) {
    const updated = {...readConfig(), ...patch};
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(updated, null, 2) + '\n', 'utf-8');
}
