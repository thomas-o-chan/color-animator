import { describe, it, expect } from 'vitest';
import { getRGBArray } from './rgb';

describe('getRGBArray', () => {
  it('should return a 3-length array', () => {
    const input: any = 'rgb(255, 0, 0)';
    expect(Array.isArray(getRGBArray(input))).toBe(true);
    expect(getRGBArray(input).length).toEqual(3);
  });
  it('should return RGB components for a valid RGB string', () => {
    const input: any = 'rgb(255, 0, 0)';
    const expected = [255, 0, 0];
    expect(getRGBArray(input)).toEqual(expected);
  });
  it('should return RGB components correctly mapped', () => {
    // randomly generate component values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const input: any = `rgb(${r}, ${g}, ${b})`;
    const expected = [r, g, b];
    expect(getRGBArray(input)).toEqual(expected);
  });
  it('should correctly parse RGB strings with a mix of spaces', () => {
    const input: any = 'rgb(146,56, 220)';
    const expected = [146, 56, 220];
    expect(getRGBArray(input)).toEqual(expected);
  });

  it('should throw an error for an RGB string missing components', () => {
    const input: any = 'rgb(255, 0)';
    expect(() => getRGBArray(input)).toThrow();
  });
  it('should throw an error for an RGB string with extra components', () => {
    const input: any = 'rgb(255, 0, 12, 24)';
    expect(() => getRGBArray(input)).toThrow();
  });
  it('should throw an error for a non-RGB string', () => {
    const input: any = 'hsl(240, 100%, 50%)';
    expect(() => getRGBArray(input)).toThrow();
  });
  it('should throw an error for an RGB string with negative components', () => {
    const input: any = 'rgb(-20, 0, 54)';
    expect(() => getRGBArray(input)).toThrow();
  });
});
