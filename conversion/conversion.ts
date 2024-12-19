import {
  RGBString,
  HexString,
  HSLString,
  RGBArray,
  StringFormat,
} from '../types.d.ts';
import { isRgbColor, isHexColor, isHslColor } from '../validation.ts';
import { getHslString } from './to-string/hsl.ts';
import { getRGBArray as getRGBArrayHex } from './hex.ts';
import { getRGBArray as getRGBArrayHsl } from './hsl.ts';
import { getRGBArray as getRGBArrayRgb } from './rgb.ts';
import { getRGBString } from './to-string/rgb.ts';
import { getHexString } from './to-string/hex.ts';

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
