import { RGBArray, HSLString, RGBComponentString } from '../../types.d.ts';

export function getHslString([r, g, b]: RGBArray): HSLString {
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

function getSaturationRange(rgb: [number, number, number]) {
  return {
    max: maxInArray(rgb),
    min: minInArray(rgb),
  };
}

function maxInArray(arr: number[]) {
  return Math.max(...arr);
}

function minInArray(arr: number[]) {
  return Math.min(...arr);
}

function getSaturation(lightness, maxSaturation, minSaturation) {
  const saturationRange = maxSaturation - minSaturation;
  return lightness > 0.5
    ? saturationRange / (2 - maxSaturation - minSaturation)
    : saturationRange / (maxSaturation + minSaturation);
}

export function getHSLHue(
  normalisedRGB: number[],
  saturationRange: number
): number {
  const hueCalculator = getHSLHueCalculator(normalisedRGB, saturationRange);
  return hueCalculator.calculate();
}

function getHSLHueCalculator(
  normalisedRGB: number[],
  saturationRange: number
): HueCalculator {
  const maxSaturationComponent = getMaxSaturationComponent(normalisedRGB);
  const hueCalculators = {
    red: RedHueCalculator,
    green: GreenHueCalculator,
    blue: BlueHueCalculator,
  };

  const HueCalculatorClass = hueCalculators[maxSaturationComponent];
  return new HueCalculatorClass(normalisedRGB, saturationRange);
}

function getMaxSaturationComponent(normalisedRGB): RGBComponentString {
  const maxSatIndex = normalisedRGB.indexOf(Math.max(...normalisedRGB));
  return ['red', 'green', 'blue'][maxSatIndex] as RGBComponentString;
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
