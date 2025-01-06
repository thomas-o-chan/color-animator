import { describe, it, expect } from 'vitest';
import { getRGBString } from './rgb';
describe('getRGBString', () => {
  it('should convert an RGB array to an RGB string', () => {
    const rgbArray = [255, 0, 0];
    const result = getRGBString(rgbArray as any);
    expect(result).toBe('rgb(255, 0, 0)');
  });

  it('should handle an RGB array with different values', () => {
    const rgbArray = [0, 255, 0];
    const result = getRGBString(rgbArray as any);
    expect(result).toBe('rgb(0, 255, 0)');
  });

  it('should handle an RGB array with all zero values', () => {
    const rgbArray = [0, 0, 0];
    const result = getRGBString(rgbArray as any);
    expect(result).toBe('rgb(0, 0, 0)');
  });

  it('should handle an RGB array with all maximum values', () => {
    const rgbArray = [255, 255, 255];
    const result = getRGBString(rgbArray as any);
    expect(result).toBe('rgb(255, 255, 255)');
  });

  it('should handle an RGB array with mixed values', () => {
    const rgbArray = [123, 45, 67];
    const result = getRGBString(rgbArray as any);
    expect(result).toBe('rgb(123, 45, 67)');
  });
});
