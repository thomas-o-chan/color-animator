import { describe, it, expect } from 'vitest';
import { getHexString } from './hex';

describe('getHexString', () => {
  it('should return hex string for a valid RGB array', () => {
    const input = [255, 0, 0];
    const expected = '#ff0000';
    expect(getHexString(input as any)).toBe(expected);
  });

  it('should return hex string for another valid RGB array', () => {
    const input = [0, 255, 0];
    const expected = '#00ff00';
    expect(getHexString(input as any)).toBe(expected);
  });

  it('should return hex string for black color', () => {
    const input = [0, 0, 0];
    const expected = '#000000';
    expect(getHexString(input as any)).toBe(expected);
  });

  it('should return hex string for white color', () => {
    const input = [255, 255, 255];
    const expected = '#ffffff';
    expect(getHexString(input as any)).toBe(expected);
  });

  it('should return hex string for a mixed color', () => {
    const input = [123, 45, 67];
    const expected = '#7b2d43';
    expect(getHexString(input as any)).toBe(expected);
  });
});
