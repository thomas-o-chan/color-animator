import { describe, it, expect } from 'vitest';
import { getRGBArray } from './hsl';

describe('hslToRgbArray', () => {
  // Not great debugging, but we want to make sure weird cases are handled properly
  conversions.hsl.forEach(({ input, output }) => {
    it(`should give the expected output for ${input}`, () => {
      expect(getRGBArray(input as any)).toEqual(output);
    });
  });
  it('should throw an error for an invalid HSL string', () => {
    const input: any = 'hsl(240, 100%, 50)';
    expect(() => getRGBArray(input)).toThrow();
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
