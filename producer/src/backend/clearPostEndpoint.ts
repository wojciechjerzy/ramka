import type { Express } from 'express';
import type { Consumer } from './consumer/consumer.js';

export function clearPostEndpoint(app: Express, consumer: Consumer) {
  app.post('/clear', (_req, res) => {
    consumer.sendAction({ name: 'clear' });
    res.sendStatus(200);
  });
}
