import { HardwareInterface } from './hardware';
import {
  EpaperColor,
  EPD_WIDTH,
  EPD_HEIGHT,
  PinConfig,
  DEFAULT_PINS,
  FrameBuffer,
} from './types';

/**
 * Driver for Waveshare 7.3inch e-Paper HAT (E) — E Ink Spectra 6, 6-color.
 *
 * Initialization sequence and register values are ported 1:1 from the official
 * Waveshare Python driver (epd7in3e.py, MIT License, Waveshare team).
 *
 * Pixel encoding: 4 bits per pixel, 2 pixels packed per byte, high nibble first.
 * Buffer size: 800 * 480 / 2 = 192 000 bytes.
 */
export class EPD {
  public readonly width  = EPD_WIDTH;
  public readonly height = EPD_HEIGHT;

  private hw: HardwareInterface;

  // ── Register / command constants ────────────────────────────────────────────
  private static readonly CMD_PANEL_SETTING          = 0x00;
  private static readonly CMD_POWER_SETTING          = 0x01;
  private static readonly CMD_POWER_OFF              = 0x02;
  private static readonly CMD_POWER_OFF_SEQ          = 0x03;
  private static readonly CMD_POWER_ON               = 0x04;
  private static readonly CMD_POWER_ON_MEASURE       = 0x05;
  private static readonly CMD_BOOSTER_SOFT_START     = 0x06;
  private static readonly CMD_DEEP_SLEEP             = 0x07;
  private static readonly CMD_DATA_START_TRANSMISSION= 0x10;
  private static readonly CMD_DATA_STOP              = 0x11;
  private static readonly CMD_DISPLAY_REFRESH        = 0x12;
  private static readonly CMD_IMAGE_PROCESS          = 0x13;
  private static readonly CMD_VCOM_LUT               = 0x20;
  private static readonly CMD_W2W_LUT                = 0x21;
  private static readonly CMD_B2W_LUT                = 0x22;
  private static readonly CMD_W2B_LUT                = 0x23;
  private static readonly CMD_B2B_LUT                = 0x24;
  private static readonly CMD_PLL_CONTROL            = 0x30;
  private static readonly CMD_TEMPERATURE_CALIB      = 0x40;
  private static readonly CMD_TEMPERATURE_SENSOR_SEL = 0x41;
  private static readonly CMD_TEMPERATURE_SENSOR_WRITE=0x42;
  private static readonly CMD_TEMPERATURE_SENSOR_READ= 0x43;
  private static readonly CMD_VCOM_INTERVAL          = 0x50;
  private static readonly CMD_LOW_POWER_DETECTION    = 0x51;
  private static readonly CMD_RESOLUTION_SETTING     = 0x61;
  private static readonly CMD_GSST_SETTING           = 0x65;
  private static readonly CMD_GET_STATUS             = 0x71;
  private static readonly CMD_AUTO_MEASURE_VCOM      = 0x80;
  private static readonly CMD_READ_VCOM_VALUE        = 0x81;
  private static readonly CMD_VCM_DC_SETTING         = 0x82;
  private static readonly CMD_CASCADE_SETTING        = 0xe0;
  private static readonly CMD_POWER_SAVING           = 0xe3;
  private static readonly CMD_LVD_VOLTAGE_SELECT     = 0xe4;
  private static readonly CMD_FORCE_TEMPERATURE      = 0xe5;

  constructor(pins: PinConfig = DEFAULT_PINS) {
    this.hw = new HardwareInterface(pins);
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  /**
   * Initialize the display. Must be called before any drawing operation.
   * Sequence ported from Waveshare epd7in3e.py init().
   */
  init(): void {
    this.hw.reset();

    this.hw.waitUntilIdle();
    this.hw.sendCommand(0xAA); // CMDH
    this.hw.sendData(0x49);
    this.hw.sendData(0x55);
    this.hw.sendData(0x20);
    this.hw.sendData(0x08);
    this.hw.sendData(0x09);
    this.hw.sendData(0x18);

    this.hw.sendCommand(0x01);
    this.hw.sendData(0x3F);
    this.hw.sendData(0x00);
    this.hw.sendData(0x32);
    this.hw.sendData(0x2A);
    this.hw.sendData(0x0E);
    this.hw.sendData(0x2A);

    this.hw.sendCommand(0x00);
    this.hw.sendData(0x5F);
    this.hw.sendData(0x69);

    this.hw.sendCommand(0x03);
    this.hw.sendData(0x00);
    this.hw.sendData(0x54);
    this.hw.sendData(0x00);
    this.hw.sendData(0x44);

    this.hw.sendCommand(0x05);
    this.hw.sendData(0x40);
    this.hw.sendData(0x1F);
    this.hw.sendData(0x1F);
    this.hw.sendData(0x2C);

    this.hw.sendCommand(0x06);
    this.hw.sendData(0x6F);
    this.hw.sendData(0x1F);
    this.hw.sendData(0x1F);
    this.hw.sendData(0x22);

    this.hw.sendCommand(0x08);
    this.hw.sendData(0x6F);
    this.hw.sendData(0x1F);
    this.hw.sendData(0x1F);
    this.hw.sendData(0x22);

    this.hw.sendCommand(0x13); // IPC
    this.hw.sendData(0x00);
    this.hw.sendData(0x04);

    this.hw.sendCommand(0x30);
    this.hw.sendData(0x3C);

    this.hw.sendCommand(0x41); // TSE
    this.hw.sendData(0x00);

    this.hw.sendCommand(0x50);
    this.hw.sendData(0x3F);

    this.hw.sendCommand(0x60);
    this.hw.sendData(0x02);
    this.hw.sendData(0x00);

    this.hw.sendCommand(0x61); // Resolution
    this.hw.sendData(0x03);   // 800 >> 8
    this.hw.sendData(0x20);   // 800 & 0xFF
    this.hw.sendData(0x01);   // 480 >> 8
    this.hw.sendData(0xE0);   // 480 & 0xFF

    this.hw.sendCommand(0x82);
    this.hw.sendData(0x1E);

    this.hw.sendCommand(0x84);
    this.hw.sendData(0x00);

    this.hw.sendCommand(0x86); // AGID
    this.hw.sendData(0x00);

    this.hw.sendCommand(0xE3);
    this.hw.sendData(0x2F);

    this.hw.sendCommand(0xE0); // CCSET
    this.hw.sendData(0x00);

    this.hw.sendCommand(0xE6); // TSSET
    this.hw.sendData(0x00);
  }

  /**
   * Create an empty frame buffer filled with the given color (default: WHITE).
   * Buffer format: 2 pixels per byte, high nibble = left pixel, low nibble = right pixel.
   */
  newBuffer(fillColor: EpaperColor = EpaperColor.WHITE): FrameBuffer {
    const size = (this.width * this.height) / 2;
    const buf  = new Uint8Array(size);
    const byte = (fillColor << 4) | fillColor;
    buf.fill(byte);
    return buf;
  }

  /**
   * Set a single pixel in a frame buffer.
   * @param buf   - frame buffer from newBuffer()
   * @param x     - 0–799
   * @param y     - 0–479
   * @param color - one of EpaperColor
   */
  setPixel(buf: FrameBuffer, x: number, y: number, color: EpaperColor): void {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) return;
    const idx   = Math.floor((y * this.width + x) / 2);
    const isHigh = (x % 2 === 0);
    if (isHigh) {
      buf[idx] = (buf[idx] & 0x0F) | ((color & 0x0F) << 4);
    } else {
      buf[idx] = (buf[idx] & 0xF0) | (color & 0x0F);
    }
  }

  /**
   * Read the color of a single pixel from a frame buffer.
   */
  getPixel(buf: FrameBuffer, x: number, y: number): EpaperColor {
    const idx   = Math.floor((y * this.width + x) / 2);
    const isHigh = (x % 2 === 0);
    return isHigh
      ? ((buf[idx] >> 4) & 0x0F) as EpaperColor
      : (buf[idx] & 0x0F) as EpaperColor;
  }

  /**
   * Fill a rectangular region with a solid color.
   */
  fillRect(
    buf: FrameBuffer,
    x: number, y: number,
    w: number, h: number,
    color: EpaperColor,
  ): void {
    for (let row = y; row < y + h; row++) {
      for (let col = x; col < x + w; col++) {
        this.setPixel(buf, col, row, color);
      }
    }
  }

  /**
   * Draw a horizontal line.
   */
  drawHLine(buf: FrameBuffer, x: number, y: number, length: number, color: EpaperColor): void {
    this.fillRect(buf, x, y, length, 1, color);
  }

  /**
   * Draw a vertical line.
   */
  drawVLine(buf: FrameBuffer, x: number, y: number, length: number, color: EpaperColor): void {
    this.fillRect(buf, x, y, 1, length, color);
  }

  /**
   * Draw an unfilled rectangle border.
   */
  drawRect(
    buf: FrameBuffer,
    x: number, y: number,
    w: number, h: number,
    color: EpaperColor,
  ): void {
    this.drawHLine(buf, x,     y,         w, color);
    this.drawHLine(buf, x,     y + h - 1, w, color);
    this.drawVLine(buf, x,     y,         h, color);
    this.drawVLine(buf, x + w - 1, y,     h, color);
  }

  /**
   * Draw a circle (Bresenham algorithm).
   */
  drawCircle(
    buf: FrameBuffer,
    cx: number, cy: number,
    r: number,
    color: EpaperColor,
  ): void {
    let x = 0, y = r, d = 1 - r;
    const plot = (px: number, py: number) => this.setPixel(buf, px, py, color);
    while (x <= y) {
      plot(cx+x, cy+y); plot(cx-x, cy+y);
      plot(cx+x, cy-y); plot(cx-x, cy-y);
      plot(cx+y, cy+x); plot(cx-y, cy+x);
      plot(cx+y, cy-x); plot(cx-y, cy-x);
      if (d < 0) { d += 2*x + 3; }
      else       { d += 2*(x-y) + 5; y--; }
      x++;
    }
  }

  /**
   * Draw a filled circle.
   */
  fillCircle(
    buf: FrameBuffer,
    cx: number, cy: number,
    r: number,
    color: EpaperColor,
  ): void {
    for (let y = -r; y <= r; y++) {
      const halfW = Math.round(Math.sqrt(r * r - y * y));
      this.drawHLine(buf, cx - halfW, cy + y, halfW * 2 + 1, color);
    }
  }

  /**
   * Send the frame buffer to the display and trigger a full refresh.
   * This will cause the screen to flicker — that is normal for e-paper.
   * Full refresh takes ~15–20 seconds for this display.
   */
  display(buf: FrameBuffer): void {
    this.hw.sendCommand(0x10); // Data Transmission 1
    this.hw.sendData(buf);

    this.hw.sendCommand(0x04); // Power ON
    this.hw.sendData(0x00);
    this.hw.waitUntilIdle();

    this.hw.sendCommand(0x12); // Display Refresh
    this.hw.sendData(0x00);
    this.hw.waitUntilIdle();
  }

  /**
   * Fill the entire screen with a single color.
   */
  clear(color: EpaperColor = EpaperColor.WHITE): void {
    const buf = this.newBuffer(color);
    this.display(buf);
  }

  /**
   * Put the display into deep sleep mode to save power.
   * Call init() again before the next display() call.
   */
  sleep(): void {
    this.hw.sendCommand(0x02); // Power OFF
    this.hw.sendData(0x00);
    this.hw.waitUntilIdle();
    this.hw.sendCommand(0x07); // Deep sleep
    this.hw.sendData(0xA5);    // Check code
  }

  /**
   * Release hardware resources (SPI + GPIO).
   */
  close(): void {
    this.hw.close();
  }
}
