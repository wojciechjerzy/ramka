import type { Express } from 'express';
import type { Consumer } from './consumer/consumer.js';

export function fillPostEndpoint(app: Express, consumer: Consumer) {
  app.post('/fill', (req, res) => {
    const { payload } = req.body;
    if (!payload) { res.status(400).json({ error: 'No payload provided' }); return; }
    consumer.sendAction({ name: 'fill', payload });
    res.sendStatus(200);
  });
}
