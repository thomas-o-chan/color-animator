import { getRGBComponents } from '../conversion';
import { RGBArray, StringColor } from '../types.d.ts';

export function interpolateColors(
  startColor: StringColor,
  endColor: StringColor,
  interpolation: number
) {
  const startRGBArray = getRGBComponents(startColor);
  const endRGBArray = getRGBComponents(endColor);
  const outRGBArray = interpolateComponents(
    startRGBArray,
    endRGBArray,
    interpolation
  );
  return outRGBArray;
}

export function interpolateComponents(
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
