import { describe, it, expect } from 'vitest';
import { getRGBComponents } from '.';

describe('getRGBComponents', () => {
  it('should return RGB components for a valid RGB string', () => {
    const input: any = 'rgb(255, 0, 0)';
    const expected = [255, 0, 0];
    expect(getRGBComponents(input)).toEqual(expected);
  });

  it('should return RGB components for a valid hex string', () => {
    const input: any = '#00ff00';
    const expected = [0, 255, 0];
    expect(getRGBComponents(input)).toEqual(expected);
  });

  it('should return RGB components for a valid HSL string', () => {
    const input: any = 'hsl(240, 100%, 50%)';
    const expected = [0, 0, 255];
    expect(getRGBComponents(input)).toEqual(expected);
  });
  it('should throw an error for an invalid color string', () => {
    const input: any = 'invalid color';
    expect(() => getRGBComponents(input)).toThrow('Invalid color');
  });
});
