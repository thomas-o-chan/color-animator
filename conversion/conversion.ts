import { RGBString, HexString, HSLString, RGBArray } from '../types.d.ts';
import { isRgbColor, isHexColor, isHslColor } from '../validation.ts';
import { getRGBArray as getRGBArrayHex } from './hex.ts';
import { getRGBArray as getRGBArrayHsl } from './hsl.ts';
import { getRGBArray as getRGBArrayRgb } from './rgb.ts';

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
  }
}

export function getRGBComponents(input: RGBString | HexString | HSLString) {
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
