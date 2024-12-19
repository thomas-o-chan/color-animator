import {
  RGBString,
  HexString,
  HSLString,
  RGBArray,
  StringFormat,
} from '../types.d.ts';
import { isRgbColor, isHexColor, isHslColor } from '../validation';
import { getHslString } from './to-string/hsl.js';
import { getRGBArray as getRGBArrayHex } from './to-array/hex.js';
import { getRGBArray as getRGBArrayHsl } from './to-array/hsl.js';
import { getRGBArray as getRGBArrayRgb } from './to-array/rgb.js';
import { getRGBString } from './to-string/rgb.js';
import { getHexString } from './to-string/hex.js';

const conversion = {
  toRGBArray: {
    rgb: getRGBArrayRgb,
    hex: getRGBArrayHex,
    hsl: getRGBArrayHsl,
  },
  toString: {
    rgb: getRGBString,
    hex: getHexString,
    hsl: getHslString,
  },
};

export function getRGBComponents(
  input: RGBString | HexString | HSLString
): RGBArray {
  if (isRgbColor(input)) {
    return conversion.toRGBArray.rgb(input);
  }

  if (isHexColor(input)) {
    return conversion.toRGBArray.hex(input);
  }

  if (isHslColor(input)) {
    return conversion.toRGBArray.hsl(input);
  }

  throw new Error('Invalid color');
}

export function convertToFormat(
  rgbArray: RGBArray,
  format: StringFormat = 'rgb'
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
