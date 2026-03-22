#!/usr/bin/python
# -*- coding:utf-8 -*-
import sys
import os
import logging
import json
import base64

picdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'pic')
libdir = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

from waveshare_epd import epd7in3e
from PIL import Image

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Color index -> RGB (matches epd7in3e palette)
# 0: black, 1: white, 2: yellow, 3: red, 4: blue, 5: green
COLORS = [
    (0,   0,   0),    # 0 black
    (255, 255, 255),  # 1 white
    (255, 255, 0),    # 2 yellow
    (255, 0,   0),    # 3 red
    (0,   0,   255),  # 4 blue
    (0,   255, 0),    # 5 green
]


def action_clear(epd):
    epd.Clear()


def decode_pixels(payload: str) -> list:
    # nibble-packed base64: each byte = 2 pixels (high nibble, low nibble)
    raw = base64.b64decode(payload)
    pixels = []
    for byte in raw:
        pixels.append((byte >> 4) & 0x0F)
        pixels.append(byte & 0x0F)
    return pixels


def action_fill(epd, payload: str):
    colors = decode_pixels(payload)
    img = Image.new('RGB', (epd.width, epd.height), (255, 255, 255))
    pixels = img.load()

    for i, color in enumerate(colors):
        x = i % epd.width
        y = i // epd.width
        if y >= epd.height:
            break
        if color < 0 or color >= len(COLORS):
            raise ValueError(f"Unknown color index: {color}")
        pixels[x, y] = COLORS[color]

    epd.display(epd.getbuffer(img))


def main():
    epd = epd7in3e.EPD()
    epd.init()
    logger.info("Ready, waiting for actions on stdin...")

    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            action = json.loads(line)
            name = action.get('name')
            payload = action.get('payload')

            if name == 'clear':
                logger.info("Action: clear")
                action_clear(epd)
            elif name == 'fill':
                logger.info("Action: fill (%d colors)", len(payload))
                action_fill(epd, payload)
            else:
                logger.warning("Unknown action: %s", name)

        except json.JSONDecodeError as e:
            logger.error("Invalid JSON: %s", e)
        except Exception as e:
            logger.error("Error handling action: %s", e)

    epd.sleep()


if __name__ == '__main__':
    main()
