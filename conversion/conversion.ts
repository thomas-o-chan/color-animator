import {
  RGBString,
  HexString,
  HSLString,
  RGBArray,
  StringFormat,
  RGBComponentString,
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

function getHSLHueCalculator(normalisedRGB: number[], saturationRange: number): HueCalculator {
  const maxSaturationComponent = getMaxSaturationComponent(normalisedRGB);
  const hueCalculators = {
    red: RedHueCalculator,
    green: GreenHueCalculator,
    blue: BlueHueCalculator,
  };

  const HueCalculatorClass = hueCalculators[maxSaturationComponent];
  return new HueCalculatorClass(normalisedRGB, saturationRange);
}
abstract class HueCalculator {
  constructor(
    protected normalisedRGB: number[],
    protected saturationRange: number
  ) {}
  abstract calculate(): number;
}

class RedHueCalculator extends HueCalculator {
  calculate(): number {
    const normalisedGreen = this.normalisedRGB[1];
    const noralisedBlue = this.normalisedRGB[2];
    return (
      ((normalisedGreen - noralisedBlue) / this.saturationRange +
        (normalisedGreen < noralisedBlue ? 6 : 0)) /
      6
    );
  }
}

class GreenHueCalculator extends HueCalculator {
  calculate(): number {
    const normalisedRed = this.normalisedRGB[0];
    const noralisedBlue = this.normalisedRGB[2];
    return ((noralisedBlue - normalisedRed) / this.saturationRange + 2) / 6;
  }
}

class BlueHueCalculator extends HueCalculator {
  calculate(): number {
    const normalisedRed = this.normalisedRGB[0];
    const normalisedGreen = this.normalisedRGB[1];
    return ((normalisedRed - normalisedGreen) / this.saturationRange + 4) / 6;
  }
}

function getHSLHue(normalisedRGB: number[], saturationRange: number): number {
  const hueCalculator = getHSLHueCalculator(normalisedRGB, saturationRange);
  return hueCalculator.calculate();
}

function getMaxSaturationComponent(normalisedRGB): RGBComponentString {
  const maxSatIndex = normalisedRGB.indexOf(Math.max(...normalisedRGB));
  return ['red', 'green', 'blue'][maxSatIndex] as RGBComponentString;
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

  const { max: maxSaturation, min: minSaturation } = getSaturationRange([
    normalisedRed,
    normalisedGreen,
    noralisedBlue,
  ]);
  let hue = 0,
    saturation = 0,
    lightness = (maxSaturation + minSaturation) / 2;

  if (maxSaturation !== minSaturation) {
    const saturationRange = maxSaturation - minSaturation;
    saturation = getSaturation(lightness, maxSaturation, minSaturation);

    hue = getHSLHue(
      [normalisedRed, normalisedGreen, noralisedBlue],
      saturationRange
    );
  }

  const hslString = `hsl(${Math.round(hue * 360)}, ${Math.round(
    saturation * 100
  )}%, ${Math.round(lightness * 100)}%)`;
  return hslString as HSLString;
}
