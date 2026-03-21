/**
 * Clear the screen to white.
 * Useful after testing to leave the display in a clean state.
 * Run with: npm run clear
 */
import { EPD, EpaperColor } from '../index';

async function main() {
  console.log('Clearing e-Paper display...');
  const epd = new EPD();
  try {
    epd.init();
    console.log('Clearing to white (~15 seconds)...');
    epd.clear(EpaperColor.WHITE);
    console.log('Clear done. Sleeping.');
    epd.sleep();
  } finally {
    epd.close();
  }
}

main().catch(console.error);
