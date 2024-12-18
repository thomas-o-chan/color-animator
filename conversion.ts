import {
  RGBString,
  HexString,
  HSLString,
  RGBArray,
  EightBitNumber,
} from './types.d.ts';
import { isRgbColor, isHexColor, isHslColor } from './validation';

function getUniformRGBArray(newValue): RGBArray {
  return [newValue, newValue, newValue];
}

function get8BitRGBArray(hue: EightBitNumber, saturation, lightness): RGBArray {
  // intermediary values with no direct meaning
  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  return [
    hue2rgb(p, q, hue + 1 / 3),
    hue2rgb(p, q, hue),
    hue2rgb(p, q, hue - 1 / 3),
  ] as RGBArray;
}

function deNormalise(value: number): EightBitNumber {
  return Math.round(value * 255) as EightBitNumber;
}

const hue2rgb = (primary: number, secondary: number, hue: number) => {
  if (hue < 0) hue += 1;
  if (hue > 1) hue -= 1;
  if (hue < 1 / 6)
    return deNormalise(primary + (secondary - primary) * 6 * hue);
  if (hue < 1 / 2) return deNormalise(secondary);
  if (hue < 2 / 3)
    return deNormalise(primary + (secondary - primary) * (2 / 3 - hue) * 6);
  return deNormalise(primary);
};

export function hslToRgbArray(hsl: string): [number, number, number] {
  const hslRegex = /hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\)/;
  const result = hsl.match(hslRegex);

  if (!result) {
    throw new Error('Invalid HSL string');
  }

  let [_, rawHue, rawSat, rawLight] = result.map(Number);
  const hue = (rawHue / 360) as EightBitNumber;
  const saturation = (rawSat / 100) as EightBitNumber;
  const lightness = (rawLight / 100) as EightBitNumber;

  return saturation === 0
    ? getUniformRGBArray(Math.round(lightness))
    : get8BitRGBArray(hue, saturation, lightness);
}

export function hexToRgbArray(hex: string): [number, number, number] {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  if (hex.length !== 6) {
    throw new Error('Invalid hex color');
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}

export function getRGBComponents(input: RGBString | HexString | HSLString) {
  if (isRgbColor(input)) {
    return rgbToRGBArray(input);
  }

  if (isHexColor(input)) {
    return hexToRgbArray(input);
  }

  if (isHslColor(input)) {
    return hslToRgbArray(input);
  }

  throw new Error('Invalid color');
}

export function rgbToRGBArray(rgb: RGBString): [number, number, number] {
  const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  const result = rgb.match(rgbRegex);
  return result!.slice(1).map(Number) as [number, number, number];
}

export function convertToFormat(
  rgbArray: RGBArray,
  format: 'rgb' | 'hsl' | 'hex' = 'rgb'
) {
  if (format === 'rgb') {
    return getRGBString(rgbArray);
  }
  if (format === 'hsl') {
    return getHslString(rgbArray);
  }
  if (format === 'hex') {
    return getHexString(rgbArray);
  }
  return getRGBString(rgbArray);
}

function getRGBString(rgbArray: RGBArray): RGBString {
  return `rgb(${rgbArray.join(', ')})` as RGBString;
}

function getHexString(rgbArray: RGBArray): HexString {
  return `#${rgbArray
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')}` as HexString;
}

function getSaturation(lightness, maxSaturation, minSaturation) {
  const saturationRange = maxSaturation - minSaturation;
  return lightness > 0.5
    ? saturationRange / (2 - maxSaturation - minSaturation)
    : saturationRange / (maxSaturation + minSaturation);
}

function getHslString([r, g, b]: RGBArray): HSLString {
  const normalisedRed = r / 255;
  const normalisedGreen = g / 255;
  const noralisedBlue = b / 255;

  const maxSaturation = Math.max(normalisedRed, normalisedGreen, noralisedBlue);
  const minSaturation = Math.min(normalisedRed, normalisedGreen, noralisedBlue);
  let hue = 0,
    saturation = 0,
    lightness = (maxSaturation + minSaturation) / 2;

  if (maxSaturation !== minSaturation) {
    const saturationRange = maxSaturation - minSaturation;
    saturation = getSaturation(lightness, maxSaturation, minSaturation);

    switch (maxSaturation) {
      case normalisedRed:
        hue =
          (normalisedGreen - noralisedBlue) / saturationRange +
          (normalisedGreen < noralisedBlue ? 6 : 0);
        break;
      case normalisedGreen:
        hue = (noralisedBlue - normalisedRed) / saturationRange + 2;
        break;
      case noralisedBlue:
        hue = (normalisedRed - normalisedGreen) / saturationRange + 4;
        break;
    }

    hue /= 6;
  }

  const hslString = `hsl(${Math.round(hue * 360)}, ${Math.round(
    saturation * 100
  )}%, ${Math.round(lightness * 100)}%)`;
  return hslString as HSLString;
}
