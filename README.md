# waveshare-epaper-7in3e

TypeScript driver for the **Waveshare 7.3inch e-Paper HAT (E)** — 6-color E Ink Spectra 6 display (800×480 px).

## Features

- Full pixel-level control (800×480 = 384 000 pixels)
- All 6 colors: Black, White, Red, Green, Blue, Yellow + Orange
- Drawing primitives: `fillRect`, `drawRect`, `drawHLine`, `drawVLine`, `drawCircle`, `fillCircle`
- Image loading with **Floyd-Steinberg dithering** (requires `jimp`)
- Clean TypeScript types, zero native addon dependencies
- Deep sleep support for low-power operation

## Hardware requirements

- Raspberry Pi (any model with 40-pin GPIO)
- Waveshare 7.3inch e-Paper HAT (E)
- SPI enabled on Raspberry Pi

## Wiring (default — matches HAT)

| e-Paper pin | Raspberry Pi pin | BCM GPIO |
|-------------|-----------------|----------|
| VCC         | 3.3V (Pin 1)    | —        |
| GND         | GND  (Pin 6)    | —        |
| DIN (MOSI)  | Pin 19          | GPIO 10  |
| CLK (SCLK)  | Pin 23          | GPIO 11  |
| CS          | Pin 24 (CE0)    | GPIO 8   |
| DC          | Pin 22          | GPIO 25  |
| RST         | Pin 11          | GPIO 17  |
| BUSY        | Pin 18          | GPIO 24  |

## Setup on Raspberry Pi

### 1. Enable SPI

```bash
sudo raspi-config
# → Interface Options → SPI → Yes
sudo reboot
```

### 2. Install Node.js (if not already installed)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Clone and install

```bash
git clone <your-repo-url>
cd waveshare-epaper-7in3e
npm install
```

### 4. Run the demo

```bash
# Must run as root (or add your user to the gpio/spi groups)
sudo npm run demo
```

## Usage

### Basic drawing

```typescript
import { EPD, EpaperColor } from './src';

const epd = new EPD();
epd.init();

const buf = epd.newBuffer(EpaperColor.WHITE);  // blank white canvas

// Draw a red rectangle
epd.fillRect(buf, 50, 50, 200, 100, EpaperColor.RED);

// Draw a blue circle
epd.fillCircle(buf, 400, 240, 80, EpaperColor.BLUE);

// Set individual pixels
epd.setPixel(buf, 10, 10, EpaperColor.BLACK);

// Send to display (~15–20 seconds, screen will flicker)
epd.display(buf);

epd.sleep();
epd.close();
```

### Display an image

```bash
npm install jimp
sudo npx ts-node src/examples/showImage.ts my-photo.jpg
```

```typescript
import { EPD } from './src';
import { imageFileToBuffer } from './src/imageLoader';

const epd = new EPD();
epd.init();
const buf = await imageFileToBuffer(epd, 'photo.jpg', { dither: true });
epd.display(buf);
epd.sleep();
epd.close();
```

### Custom GPIO pins

```typescript
import { EPD } from './src';

const epd = new EPD({
  cs:   8,   // CE0
  dc:   25,
  rst:  17,
  busy: 24,
});
```

## Available colors

| Constant              | Display color |
|-----------------------|--------------|
| `EpaperColor.BLACK`   | Black        |
| `EpaperColor.WHITE`   | White        |
| `EpaperColor.RED`     | Red          |
| `EpaperColor.GREEN`   | Green        |
| `EpaperColor.BLUE`    | Blue         |
| `EpaperColor.YELLOW`  | Yellow       |
| `EpaperColor.ORANGE`  | Orange       |

## Running without root (optional)

```bash
sudo usermod -a -G gpio,spi $USER
# Then log out and back in
```

## Notes

- **Refresh time:** ~15–20 seconds per full frame. The screen will flicker — this is normal.
- **No partial refresh** on this 6-color model (only supported on 2-color e-paper).
- **No backlight / brightness control** — e-paper reflects ambient light only.
- After each `display()` call, always call `sleep()` to extend display lifetime.
- Keep the display in a 15–35°C environment for best color accuracy.

## License

MIT
