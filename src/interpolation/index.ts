import { getRGBComponents } from '../conversion';
import { RGBArray, StringColor } from '../types.d.ts';

/* Control variables to tweak interpolation */
const midPointOffsetFactor = 1.2;

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
    interpolate(startValue, endRGBArray[index], interpolation)
  ) as RGBArray;
  return interpolatedRGBArray;
}

function interpolate(
  start: number,
  end: number,
  interpolation: number
): number {
  const midPointBase = (start + end) / 2;
  const midpoint = Math.min(midPointBase * midPointOffsetFactor, 255);
  if (interpolation < 0.5) {
    return lerp(start, midpoint, interpolation * 2);
  }
  return lerp(midpoint, end, (interpolation - 0.5) * 2);
}

function lerp(start: number, end: number, interpolation: number): number {
  return start * (1 - interpolation) + end * interpolation;
}
