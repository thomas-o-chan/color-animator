import { RGBArray, EightBitNumber } from '../types.d.ts';

function getUniformRGBArray(newValue): RGBArray {
  return [newValue, newValue, newValue];
}

function get8BitRGBArray(hue: EightBitNumber, saturation, lightness): RGBArray {
  // intermediary values with no direct meaning
  const q =
    lightness < 0.5
      ? lightness * (1 + saturation)
      : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  return [
    hue2rgb(p, q, hue + 1 / 3),
    hue2rgb(p, q, hue),
    hue2rgb(p, q, hue - 1 / 3),
  ] as RGBArray;
}

function deNormalise(value: number): EightBitNumber {
  return Math.round(value * 255) as EightBitNumber;
}

const hue2rgb = (primary: number, secondary: number, hue: number) => {
  if (hue < 0) hue += 1;
  if (hue > 1) hue -= 1;
  if (hue < 1 / 6)
    return deNormalise(primary + (secondary - primary) * 6 * hue);
  if (hue < 1 / 2) return deNormalise(secondary);
  if (hue < 2 / 3)
    return deNormalise(primary + (secondary - primary) * (2 / 3 - hue) * 6);
  return deNormalise(primary);
};

export function getRGBArray(hsl: string): [number, number, number] {
  const hslRegex = /hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\)/;
  const result = hsl.match(hslRegex);

  if (!result) {
    throw new Error('Invalid HSL string');
  }

  let [_, rawHue, rawSat, rawLight] = result.map(Number);
  const hue = (rawHue / 360) as EightBitNumber;
  const saturation = (rawSat / 100) as EightBitNumber;
  const lightness = (rawLight / 100) as EightBitNumber;

  return saturation === 0
    ? getUniformRGBArray(Math.round(lightness))
    : get8BitRGBArray(hue, saturation, lightness);
}
