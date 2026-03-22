import type { Express } from 'express';
import multer from 'multer';
import type { Consumer } from './consumer/consumer.js';
import { imageToFill } from './image.js';

export function displayPostEndpoint(app: Express, consumer: Consumer, qrBuffer: Buffer) {
  const upload = multer({ storage: multer.memoryStorage() });

  app.post('/display', upload.single('image'), async (req, res) => {
    if (!req.file) { res.status(400).json({ error: 'No image provided' }); return; }
    const payload = await imageToFill(req.file.buffer, qrBuffer);
    consumer.sendAction({ name: 'fill', payload });
    res.sendStatus(200);
  });
}
