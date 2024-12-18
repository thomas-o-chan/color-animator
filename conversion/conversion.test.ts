import { describe, it, expect } from 'vitest';
import { getRGBComponents, hslToRgbArray, rgbToRGBArray } from './conversion';

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

describe('rgbToRGBArray', () => {
  it('should return a 3-length array', () => {
    const input: any = 'rgb(255, 0, 0)';
    expect(Array.isArray(rgbToRGBArray(input))).toBe(true);
    expect(rgbToRGBArray(input).length).toEqual(3);
  });
  it('should return RGB components for a valid RGB string', () => {
    const input: any = 'rgb(255, 0, 0)';
    const expected = [255, 0, 0];
    expect(rgbToRGBArray(input)).toEqual(expected);
  });
  it('should return RGB components correctly mapped', () => {
    // randomly generate component values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const input: any = `rgb(${r}, ${g}, ${b})`;
    const expected = [r, g, b];
    expect(rgbToRGBArray(input)).toEqual(expected);
  });
  it('should correctly parse RGB strings with a mix of spaces', () => {
    const input: any = 'rgb(146,56, 220)';
    const expected = [146, 56, 220];
    expect(rgbToRGBArray(input)).toEqual(expected);
  });

  it('should throw an error for an RGB string missing components', () => {
    const input: any = 'rgb(255, 0)';
    expect(() => rgbToRGBArray(input)).toThrow();
  });
  it('should throw an error for an RGB string with extra components', () => {
    const input: any = 'rgb(255, 0, 12, 24)';
    expect(() => rgbToRGBArray(input)).toThrow();
  });
  it('should throw an error for a non-RGB string', () => {
    const input: any = 'hsl(240, 100%, 50%)';
    expect(() => rgbToRGBArray(input)).toThrow();
  });
  it('should throw an error for an RGB string with negative components', () => {
    const input: any = 'rgb(-20, 0, 54)';
    expect(() => rgbToRGBArray(input)).toThrow();
  });
});

describe('hslToRgbArray', () => {
  // Not great debugging, but we want to make sure weird cases are handled properly
  conversions.hsl.forEach(({ input, output }) => {
    it(`should give the expected output for ${input}`, () => {
      expect(hslToRgbArray(input as any)).toEqual(output);
    });
  });
});

const conversions = {
  hsl: [
    {
      input: 'hsl(240, 100%, 50%)',
      output: [0, 0, 255],
    },
    {
      input: 'hsl(129, 100%, 50%)',
      output: [0, 255, 38],
    },
    {
      input: 'hsl(129, 100%, 100%)',
      output: [255, 255, 255],
    },
    {
      input: 'hsl(129, 70%, 3%)',
      output: [2, 13, 4],
    },
    {
      input: 'hsl(4, 20%, 60%)',
      output: [173, 135, 133],
    },
    {
      input: 'hsl(87, 0%, 100%)',
      output: [1, 1, 1], // TODO verify
    },
    {
      input: 'hsl(1, 0%, 100%)',
      output: [1, 1, 1],
    },
    {
      input: 'hsl(1, 100%, 100%)',
      output: [255, 255, 255],
    },
    {
      input: 'hsl(1, 0%, 0%)',
      output: [0, 0, 0],
    },
    {
      input: 'hsl(1, 100%, 0%)',
      output: [0, 0, 0],
    },
  ],
};