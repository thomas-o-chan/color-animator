import { convertToFormat, getRGBComponents } from './conversion.ts';
import { EightBitNumber, Options, RGBArray, StringColor } from './types.d.ts';
import {
  validate,
} from './validation.ts';

function interpolate(
  startColor: string,
  endColor: string,
  interpolation: number,
  options?: Options
) {
  const {startColor: validatedstart, endColor: validatedEnd, interpolation: validatedInterpolation } = validate(startColor, endColor, interpolation);
  const resultArray = interpolateColors(validatedstart, validatedEnd, validatedInterpolation);
  return convertToFormat(resultArray, options?.returnFormat);
}

function interpolateColors(
  startColor: StringColor,
  endColor: StringColor,
  interpolation: number
) {
  const startRGBArray = getRGBComponents(startColor);
  const endRGBArray = getRGBComponents(endColor);
  const outRGBArray = interpolateComponents(startRGBArray, endRGBArray, interpolation);
  return outRGBArray
}

function interpolateComponents(
  startRGBArray: number[],
  endRGBArray: number[],
  interpolation: number
) {
  const interpolatedRGBArray = startRGBArray.map((startValue, index) =>
    lerp(startValue, endRGBArray[index], interpolation)
  ) as RGBArray;
  return interpolatedRGBArray;
}

function lerp(start: number, end: number, interpolation: number): number {
  return start * (1 - interpolation) + end * interpolation;
}