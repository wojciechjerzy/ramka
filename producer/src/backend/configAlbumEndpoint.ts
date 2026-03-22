import type { Express } from 'express';
import { getConfig, updateConfig } from './config.js';

export function configAlbumEndpoint(app: Express, onUpdate: () => void) {
  app.get('/config-album', (_req, res) => {
    res.json({ albumUrl: getConfig().albumUrl });
  });

  app.post('/config-album', (req, res) => {
    const { albumUrl } = req.body as Record<string, unknown>;
    if (typeof albumUrl !== 'string') {
      res.status(400).json({ error: 'albumUrl is required' });
      return;
    }
    updateConfig({ albumUrl });
    onUpdate();
    res.sendStatus(200);
  });
}
