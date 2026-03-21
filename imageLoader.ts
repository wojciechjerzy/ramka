import * as fs from 'fs';
import * as path from 'path';
import { EPD } from './epd';
import { EpaperColor, EPD_WIDTH, EPD_HEIGHT, FrameBuffer } from './types';
import { nearestColor, ditherFloydSteinberg } from './colorUtils';

/**
 * Load an image file and convert it to an EPD FrameBuffer.
 *
 * Requires the optional `jimp` package:
 *   npm install jimp
 *
 * The image is:
 *  1. Resized to 800×480 (maintaining aspect ratio with white letterbox)
 *  2. Quantized to the 6 supported colors (with optional Floyd-Steinberg dithering)
 *  3. Packed into the 4-bit-per-pixel buffer format
 *
 * If `jimp` is not installed, this module throws a helpful error.
 */
export async function imageFileToBuffer(
  epd: EPD,
  imagePath: string,
  options: {
    dither?: boolean;   // Default: true
    background?: EpaperColor; // Letterbox fill color. Default: WHITE
  } = {},
): Promise<FrameBuffer> {
  // Dynamic import so jimp is optional (not a hard dep for the driver itself)
  let Jimp: typeof import('jimp');
  try {
    Jimp = await import('jimp');
  } catch {
    throw new Error(
      'Package "jimp" is required to load images.\n' +
      'Run: npm install jimp'
    );
  }

  const { dither = true, background = EpaperColor.WHITE } = options;

  const image = await Jimp.default.read(imagePath);
  image.contain(EPD_WIDTH, EPD_HEIGHT); // fit with letterbox, no crop

  // Extract raw RGBA pixels
  const rgba = new Uint8Array(image.bitmap.data.buffer);

  // Quantize
  const pixels: Uint8Array = dither
    ? ditherFloydSteinberg(rgba, EPD_WIDTH, EPD_HEIGHT)
    : (() => {
        const out = new Uint8Array(EPD_WIDTH * EPD_HEIGHT);
        for (let i = 0; i < EPD_WIDTH * EPD_HEIGHT; i++) {
          out[i] = nearestColor({
            r: rgba[i * 4],
            g: rgba[i * 4 + 1],
            b: rgba[i * 4 + 2],
          });
        }
        return out;
      })();

  // Pack into FrameBuffer
  const buf = epd.newBuffer(background);
  for (let y = 0; y < EPD_HEIGHT; y++) {
    for (let x = 0; x < EPD_WIDTH; x++) {
      epd.setPixel(buf, x, y, pixels[y * EPD_WIDTH + x] as EpaperColor);
    }
  }
  return buf;
}
