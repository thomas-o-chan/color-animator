import { convertToFormat } from './conversion';
import { interpolateColors } from './interpolation';
import { Options } from './types.d.ts';
import { validate } from './validation';

export default function colorAnimator(
  startColor: string,
  endColor: string,
  interpolation: number,
  options?: Options
) {
  const {
    startColor: validatedstart,
    endColor: validatedEnd,
    interpolation: validatedInterpolation,
  } = validate(startColor, endColor, interpolation);
  const resultArray = interpolateColors(
    validatedstart,
    validatedEnd,
    validatedInterpolation
  );
  return convertToFormat(resultArray, options?.returnFormat);
}

export { colorAnimator };

