import { Gpio } from 'onoff';
import * as spiDevice from 'spi-device';
import { PinConfig, DEFAULT_PINS } from './types';

/**
 * Low-level hardware interface:
 *  - SPI bus via /dev/spidev0.0 (4-wire, mode 0, MSB first)
 *  - GPIO pins: DC, RST, BUSY via onoff
 *
 * SPI timing per Waveshare spec: CPOL=0, CPHA=0 (Mode 0), up to 10 MHz.
 */
export class HardwareInterface {
  private spi: spiDevice.SpiDevice;
  private pinDC:   Gpio;
  private pinRST:  Gpio;
  private pinBUSY: Gpio;

  private readonly SPI_SPEED_HZ = 4_000_000; // 4 MHz — safe for all Pi models

  constructor(pins: PinConfig = DEFAULT_PINS) {
    // Open SPI bus 0, device 0 (/dev/spidev0.0)
    this.spi = spiDevice.openSync(0, 0, {
      mode:           spiDevice.MODE0,
      maxSpeedHz:     this.SPI_SPEED_HZ,
      bitsPerWord:    8,
      chipSelectHigh: false,
    });

    this.pinDC   = new Gpio(pins.dc,   'out');
    this.pinRST  = new Gpio(pins.rst,  'out');
    this.pinBUSY = new Gpio(pins.busy, 'in');
  }

  /** Send a single command byte (DC low) */
  sendCommand(cmd: number): void {
    this.pinDC.writeSync(0);
    this.spi.transferSync([{
      sendBuffer:  Buffer.from([cmd & 0xff]),
      receiveBuffer: Buffer.alloc(1),
      byteLength:  1,
      speedHz:     this.SPI_SPEED_HZ,
    }]);
  }

  /** Send one or more data bytes (DC high) */
  sendData(data: number | Buffer | Uint8Array): void {
    this.pinDC.writeSync(1);
    const buf = typeof data === 'number'
      ? Buffer.from([data & 0xff])
      : Buffer.from(data);

    // For large buffers, chunk to avoid SPI transfer size limits (4096 bytes on some kernels)
    const CHUNK = 4096;
    for (let offset = 0; offset < buf.length; offset += CHUNK) {
      const chunk = buf.subarray(offset, offset + CHUNK);
      this.spi.transferSync([{
        sendBuffer:    chunk,
        receiveBuffer: Buffer.alloc(chunk.length),
        byteLength:    chunk.length,
        speedHz:       this.SPI_SPEED_HZ,
      }]);
    }
  }

  /** Hardware reset: pull RST low for 10ms, then high */
  reset(): void {
    this.pinRST.writeSync(1);
    this.sleep(20);
    this.pinRST.writeSync(0);
    this.sleep(2);
    this.pinRST.writeSync(1);
    this.sleep(20);
  }

  /** Block until BUSY pin goes LOW (display is ready) */
  waitUntilIdle(): void {
    let timeout = 0;
    // BUSY is active HIGH on this display (busy = 1, ready = 0)
    while (this.pinBUSY.readSync() === 1) {
      this.sleep(10);
      timeout += 10;
      if (timeout > 30_000) {
        throw new Error('e-Paper display timeout: BUSY pin stuck high after 30s');
      }
    }
  }

  /** Synchronous sleep in milliseconds */
  sleep(ms: number): void {
    const end = Date.now() + ms;
    while (Date.now() < end) { /* busy wait — needed for accurate GPIO timing */ }
  }

  /** Release all GPIO and SPI resources */
  close(): void {
    this.spi.closeSync();
    this.pinDC.unexport();
    this.pinRST.unexport();
    this.pinBUSY.unexport();
  }
}
