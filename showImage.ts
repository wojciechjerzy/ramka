/**
 * Display an image file on the e-Paper screen.
 * Usage: npx ts-node src/examples/showImage.ts path/to/image.png
 *
 * Requires: npm install jimp
 */
import { EPD, EpaperColor } from '../index';
import { imageFileToBuffer } from '../imageLoader';
import * as path from 'path';

async function main() {
  const imagePath = process.argv[2];
  if (!imagePath) {
    console.error('Usage: npx ts-node src/examples/showImage.ts <image-path>');
    process.exit(1);
  }

  const absPath = path.resolve(imagePath);
  console.log(`Loading image: ${absPath}`);

  const epd = new EPD();
  try {
    epd.init();

    console.log('Converting image (dithering enabled)...');
    const buf = await imageFileToBuffer(epd, absPath, { dither: true });

    console.log('Sending to display (~15–20 seconds)...');
    epd.display(buf);

    console.log('Done. Sleeping display.');
    epd.sleep();
  } finally {
    epd.close();
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
