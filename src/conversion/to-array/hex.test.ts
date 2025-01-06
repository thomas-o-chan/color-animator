import { describe, it, expect } from 'vitest';
import { getRGBArray } from './hex';

describe('getRGBArray', () => {
  it('should return RGB array for a valid hex string with #', () => {
    const input = '#ff0000';
    const expected = [255, 0, 0];
    expect(getRGBArray(input)).toEqual(expected);
  });

  // not strictly necessary, but its good to be lenient
  it('should return an RGB array for a valid hex string without #', () => {
    const input = '00ff00';
    const expected = [0, 255, 0];
    expect(getRGBArray(input)).toEqual(expected);
  });

  it('should throw an error for an invalid hex string with incorrect length', () => {
    const input = '#123';
    expect(() => getRGBArray(input)).toThrow('Invalid hex color');
  });

  it('should return black for invalid hex characters', () => {
    const input = '#hijxyz';
    expect(getRGBArray(input)).toEqual([0, 0, 0]);
  });
});
