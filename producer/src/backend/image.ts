import sharp from 'sharp';

const WIDTH = 800;
const HEIGHT = 480;

const PALETTE: [number, number, number][] = [
  [0,   0,   0],    // 0 black
  [255, 255, 255],  // 1 white
  [255, 255, 0],    // 2 yellow
  [255, 0,   0],    // 3 red
  [0,   0,   255],  // 4 blue
  [0,   255, 0],    // 5 green
];

function nearestColor(r: number, g: number, b: number): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < PALETTE.length; i++) {
    const [pr, pg, pb] = PALETTE[i]!;
    const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
}

function encodePixels(pixels: number[]): string {
  const bytes = new Uint8Array(Math.ceil(pixels.length / 2));
  for (let i = 0; i < bytes.length; i++) {
    const hi = pixels[i * 2] ?? 0;
    const lo = pixels[i * 2 + 1] ?? 0;
    bytes[i] = ((hi & 0x0F) << 4) | (lo & 0x0F);
  }
  return Buffer.from(bytes).toString('base64');
}

export async function imageToFill(imageBuffer: Buffer, qrBuffer?: Buffer): Promise<string> {
  let pipeline = sharp(imageBuffer).resize(WIDTH, HEIGHT, { fit: 'fill' });

  if (qrBuffer) {
    pipeline = pipeline.composite([{ input: qrBuffer, top: 0, left: 0 }]);
  }

  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const buf = new Float32Array(WIDTH * HEIGHT * 3);
  for (let i = 0; i < WIDTH * HEIGHT; i++) {
    buf[i * 3 + 0] = data[i * channels + 0] ?? 0;
    buf[i * 3 + 1] = data[i * channels + 1] ?? 0;
    buf[i * 3 + 2] = data[i * channels + 2] ?? 0;
  }

  const pixels: number[] = [];
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const idx = (y * WIDTH + x) * 3;
      const oldR = Math.max(0, Math.min(255, buf[idx] ?? 0));
      const oldG = Math.max(0, Math.min(255, buf[idx + 1] ?? 0));
      const oldB = Math.max(0, Math.min(255, buf[idx + 2] ?? 0));

      const colorIdx = nearestColor(oldR, oldG, oldB);
      pixels.push(colorIdx);

      const [newR, newG, newB] = PALETTE[colorIdx]!;
      const errR = oldR - newR;
      const errG = oldG - newG;
      const errB = oldB - newB;

      const distribute = (dx: number, dy: number, factor: number) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= WIDTH || ny < 0 || ny >= HEIGHT) return;
        const ni = (ny * WIDTH + nx) * 3;
        buf[ni]!     += errR * factor;
        buf[ni + 1]! += errG * factor;
        buf[ni + 2]! += errB * factor;
      };

      distribute(1,  0, 7 / 16);
      distribute(-1, 1, 3 / 16);
      distribute(0,  1, 5 / 16);
      distribute(1,  1, 1 / 16);
    }
  }

  return encodePixels(pixels);
}
