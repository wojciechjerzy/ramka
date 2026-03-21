/**
 * Demo: draws 6 vertical color stripes, then overlays colored rectangles.
 * Run with: npm run demo
 */
import { EPD, EpaperColor } from '../index';

async function main() {
  console.log('Waveshare 7.3" e-Paper HAT (E) — demo');

  const epd = new EPD();

  try {
    console.log('Initializing display...');
    epd.init();

    console.log('Building frame buffer...');
    const buf = epd.newBuffer(EpaperColor.WHITE);

    // ── 6 vertical color stripes ──────────────────────────────────────────────
    const stripeWidth = Math.floor(epd.width / 6);
    const colors = [
      EpaperColor.BLACK,
      EpaperColor.WHITE,
      EpaperColor.RED,
      EpaperColor.GREEN,
      EpaperColor.BLUE,
      EpaperColor.YELLOW,
    ];
    colors.forEach((color, i) => {
      epd.fillRect(buf, i * stripeWidth, 0, stripeWidth, epd.height, color);
    });

    // ── Orange filled circle in the center ───────────────────────────────────
    epd.fillCircle(buf, epd.width / 2, epd.height / 2, 80, EpaperColor.ORANGE);

    // ── Black border rectangle ────────────────────────────────────────────────
    epd.drawRect(buf, 10, 10, epd.width - 20, epd.height - 20, EpaperColor.BLACK);

    console.log('Sending to display (this takes ~15–20 seconds)...');
    epd.display(buf);

    console.log('Done! Putting display to sleep.');
    epd.sleep();

  } finally {
    epd.close();
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
