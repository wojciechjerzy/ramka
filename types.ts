/**
 * Waveshare 7.3inch e-Paper HAT (E) - 6-color Spectra (E Ink Spectra 6)
 * Supported colors and their 4-bit nibble codes as used by the controller.
 *
 * The display uses 4 bits per pixel, packed 2 pixels per byte (high nibble first).
 * Color codes are defined by the Waveshare/E Ink Spectra 6 controller spec.
 */

export enum EpaperColor {
  BLACK  = 0x0,
  WHITE  = 0x1,
  GREEN  = 0x2,
  BLUE   = 0x3,
  RED    = 0x4,
  YELLOW = 0x5,
  ORANGE = 0x6,
  // 0x7 is "clean" / unused in normal display mode
}

/** Human-readable color name map for debugging */
export const COLOR_NAMES: Record<EpaperColor, string> = {
  [EpaperColor.BLACK]:  'BLACK',
  [EpaperColor.WHITE]:  'WHITE',
  [EpaperColor.GREEN]:  'GREEN',
  [EpaperColor.BLUE]:   'BLUE',
  [EpaperColor.RED]:    'RED',
  [EpaperColor.YELLOW]: 'YELLOW',
  [EpaperColor.ORANGE]: 'ORANGE',
};

/** Display dimensions */
export const EPD_WIDTH  = 800;
export const EPD_HEIGHT = 480;

/** GPIO pin numbers (BCM numbering) — matches Waveshare HAT default wiring */
export interface PinConfig {
  /** SPI MOSI — hardware SPI, do not change */
  // DIN  = GPIO10 (handled by spi-device)
  // CLK  = GPIO11 (handled by spi-device)

  /** SPI Chip Select (CE0) — active low */
  cs:   number;
  /** Data / Command selector — high=data, low=command */
  dc:   number;
  /** Hardware reset — active low */
  rst:  number;
  /** Busy signal output from display — high=busy */
  busy: number;
}

export const DEFAULT_PINS: PinConfig = {
  cs:   8,   // CE0
  dc:   25,
  rst:  17,
  busy: 24,
};

/** A simple RGBA pixel */
export interface Pixel {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/** A frame buffer: flat array of EpaperColor values, length = WIDTH * HEIGHT */
export type FrameBuffer = Uint8Array;
