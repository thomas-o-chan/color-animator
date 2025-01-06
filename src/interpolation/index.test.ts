import { describe, it, expect } from 'vitest';
import { interpolateComponents } from '.';

describe('interpolateComponents', () => {
  it('should return the start value if interpolation is 0', () => {
    const start = [0, 0, 0];
    const end = [255, 255, 255];
    const interpolation = 0;
    const result = interpolateComponents(start, end, interpolation);
    expect(result).toEqual(start);
  });
  it('should return the end value if interpolation is 1', () => {
    const start = [0, 0, 0];
    const end = [255, 255, 255];
    const interpolation = 1;
    const result = interpolateComponents(start, end, interpolation);
    expect(result).toEqual(end);
  });
  it('should return the midpoint if interpolation is 0.5', () => {
    const start = [0, 0, 0];
    const end = [254, 254, 254];
    const interpolation = 0.5;
    const expected = [127, 127, 127];
    const result = interpolateComponents(start, end, interpolation);
    expect(result).toEqual(expected);
  });
  it.skip('should return whole integers', () => {
    const start = [0, 0, 0];
    const end = [255, 255, 255];
    const interpolation = 0.5;
    const expected = [127, 127, 127];
    const result = interpolateComponents(start, end, interpolation);
    expect(result).toEqual(expected);
  });
});
