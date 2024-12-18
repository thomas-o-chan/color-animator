import { assertColorIsSupported, assertNormalised } from "./validation.ts";

function interpolate(
  startColor: string,
  endColor: string,
  interpolation: number
) {
  assertColorIsSupported(startColor);
  assertColorIsSupported(endColor);
  assertNormalised(interpolation);
}
