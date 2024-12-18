import {
  RGBString,
  HexString,
  HSLString,
  RGBArray,
  StringFormat,
  StringColor,
} from '../types.d.ts';
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

function getHueIfRedIsMax(normalisedRGB, saturationRange) {
  const normalisedGreen = normalisedRGB[1];
  const noralisedBlue = normalisedRGB[2];
  return (
    ((normalisedGreen - noralisedBlue) / saturationRange +
      (normalisedGreen < noralisedBlue ? 6 : 0)) /
    6
  );
}

function getHueIfGreenIsMax(normalisedRGB, saturationRange) {
  const normalisedRed = normalisedRGB[0];
  const noralisedBlue = normalisedRGB[2];
  return ((noralisedBlue - normalisedRed) / saturationRange + 2) / 6;
}
function getHueIfBlueIsMax(normalisedRGB, saturationRange) {
  const normalisedRed = normalisedRGB[0];
  const normalisedGreen = normalisedRGB[1];
  return ((normalisedRed - normalisedGreen) / saturationRange + 4) / 6;
}

function getHue(normalisedRGB, saturationRange) {
  const hueCalculator = {
    red: getHueIfRedIsMax(normalisedRGB, saturationRange),
    green: getHueIfGreenIsMax(normalisedRGB, saturationRange),
    blue: getHueIfBlueIsMax(normalisedRGB, saturationRange),
  }
  return hueCalculator[getMaxSaturationComponent(normalisedRGB)];
}

function getMaxSaturationComponent(normalisedRGB) {
  const maxSatIndex = normalisedRGB.indexOf(Math.max(...normalisedRGB));
  return ['red', 'green', 'blue'][maxSatIndex];
}

function maxInArray(arr: number[]) {
  return Math.max(...arr);
}
function minInArray(arr: number[]) {
  return Math.min(...arr);
}

function getSaturationRange(rgb: [number, number, number]) {
  return {
    max: maxInArray(rgb),
    min: minInArray(rgb),
  };
}

function getHslString([r, g, b]: RGBArray): HSLString {
  const normalisedRed = r / 255;
  const normalisedGreen = g / 255;
  const noralisedBlue = b / 255;

  const { max: maxSaturation, min: minSaturation} = getSaturationRange([normalisedRed, normalisedGreen, noralisedBlue]);
  let hue = 0,
    saturation = 0,
    lightness = (maxSaturation + minSaturation) / 2;

  if (maxSaturation !== minSaturation) {
    const saturationRange = maxSaturation - minSaturation;
    saturation = getSaturation(lightness, maxSaturation, minSaturation);

    hue = getHue(
      [normalisedRed, normalisedGreen, noralisedBlue],
      saturationRange
    );
  }

  const hslString = `hsl(${Math.round(hue * 360)}, ${Math.round(
    saturation * 100
  )}%, ${Math.round(lightness * 100)}%)`;
  return hslString as HSLString;
}
