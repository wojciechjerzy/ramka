import { EpaperColor, Pixel } from './types';

/**
 * RGB reference values for the 6 display colors.
 * Approximate — actual printed colors vary by temperature and batch,
 * but these are good defaults for quantization.
 */
const COLOR_RGB: Record<EpaperColor, [number, number, number]> = {
  [EpaperColor.BLACK]:  [0,   0,   0  ],
  [EpaperColor.WHITE]:  [255, 255, 255],
  [EpaperColor.GREEN]:  [0,   128, 0  ],
  [EpaperColor.BLUE]:   [0,   0,   255],
  [EpaperColor.RED]:    [255, 0,   0  ],
  [EpaperColor.YELLOW]: [255, 255, 0  ],
  [EpaperColor.ORANGE]: [255, 128, 0  ],
};

/**
 * Map an arbitrary RGB pixel to the nearest supported EpaperColor.
 * Uses Euclidean distance in RGB space.
 */
export function nearestColor(pixel: Pixel): EpaperColor {
  let best: EpaperColor = EpaperColor.WHITE;
  let bestDist = Infinity;

  for (const key in COLOR_RGB) {
    const color = Number(key) as EpaperColor;
    const [r, g, b] = COLOR_RGB[color];
    const dist = (pixel.r - r) ** 2 + (pixel.g - g) ** 2 + (pixel.b - b) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = color;
    }
  }
  return best;
}

/**
 * Floyd-Steinberg dithering over a flat RGBA pixel array (Uint8ClampedArray or similar).
 * Input: flat array of bytes in RGBA order, width × height pixels.
 * Returns: flat Uint8Array of EpaperColor values, one per pixel.
 *
 * Dithering gives much better results than simple nearest-color when displaying
 * photographs or gradients on a 6-color e-paper display.
 */
export function ditherFloydSteinberg(
  rgba: Uint8Array | Uint8ClampedArray,
  width: number,
  height: number,
): Uint8Array {
  // Copy input to float32 arrays for error accumulation
  const r = new Float32Array(width * height);
  const g = new Float32Array(width * height);
  const b = new Float32Array(width * height);

  for (let i = 0; i < width * height; i++) {
    r[i] = rgba[i * 4];
    g[i] = rgba[i * 4 + 1];
    b[i] = rgba[i * 4 + 2];
  }

  const out = new Uint8Array(width * height);

  const clamp = (v: number) => Math.max(0, Math.min(255, v));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const pixel: Pixel = { r: clamp(r[i]), g: clamp(g[i]), b: clamp(b[i]) };
      const chosen = nearestColor(pixel);
      out[i] = chosen;

      const [cr, cg, cb] = COLOR_RGB[chosen];
      const er = pixel.r - cr;
      const eg = pixel.g - cg;
      const eb = pixel.b - cb;

      // Distribute error to neighbours (Floyd-Steinberg coefficients)
      const distribute = (dx: number, dy: number, factor: number) => {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || nx >= width || ny >= height) return;
        const ni = ny * width + nx;
        r[ni] += er * factor;
        g[ni] += eg * factor;
        b[ni] += eb * factor;
      };

      distribute( 1,  0, 7/16);
      distribute(-1,  1, 3/16);
      distribute( 0,  1, 5/16);
      distribute( 1,  1, 1/16);
    }
  }

  return out;
}
