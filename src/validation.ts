import type {
  NormalisedNumber,
  RGBString,
  HexString,
  HSLString,
  EightBitNumber,
} from './types.d.ts';
export function validate(
  startColor: string,
  endColor: string,
  interpolation: number
) {
  assertColorIsSupported(startColor);
  assertColorIsSupported(endColor);
  assertNormalised(interpolation);
  return {
    startColor,
    endColor,
    interpolation,
  };
}

export function assertNormalised(
  value: number
): asserts value is NormalisedNumber {
  if (value < 0 || value > 1) {
    throw new Error('Value must be a number between 0 and 1');
  }
}

export function assertColorIsSupported(
  color: string
): asserts color is RGBString | HexString | HSLString {
  if (
    typeof color !== 'string' ||
    !isRgbColor(color) ||
    !isHexColor(color) ||
    !isHslColor(color)
  ) {
    throw new Error(
      `Invalid color: ${color}. Must be a valid RGB, HEX, or HSL color`
    );
  }
}

export function isRgbColor(color: string): color is RGBString {
  const rgbRegex = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
  const match = color.match(rgbRegex);
  if (!match) return false;

  const [_, r, g, b] = match.map(Number);
  return r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255;
}

export function isHexColor(color: string): color is HexString {
  const hexRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
  return hexRegex.test(color);
}

export function isHslColor(color: string): color is HSLString {
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
  const match = color.match(hslRegex);
  if (!match) return false;

  const [_, h, s, l] = match.map(Number);
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
}

export function asertIsEightBitNumber(
  input: number
): asserts input is EightBitNumber {
  if (input < 0 || input > 255 || Math.round(input) !== input) {
    throw new Error('Value must be an 8-bit number');
  }
}
