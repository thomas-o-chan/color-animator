import { describe, it, expect } from 'vitest';
import { getHslString } from './hsl';

describe('getHslString', () => {
    const testCases = [
      { input: [0, 0, 255], output: 'hsl(240, 100%, 50%)' },
      { input: [0, 255, 38], output: 'hsl(129, 100%, 50%)' },
      { input: [100, 10, 38], output: 'hsl(341, 82%, 22%)' },
      { input: [255, 255, 255], output: 'hsl(0, 0%, 100%)' },
      { input: [123, 123, 123], output: 'hsl(0, 0%, 48%)' },
      { input: [2, 13, 4], output: 'hsl(131, 73%, 3%)' },
      { input: [173, 135, 133], output: 'hsl(3, 20%, 60%)' },
      { input: [1, 1, 1], output: 'hsl(0, 0%, 0%)' },
      { input: [255, 255, 255], output: 'hsl(0, 0%, 100%)' },
      { input: [0, 0, 0], output: 'hsl(0, 0%, 0%)' },
      { input: [0, 0, 0], output: 'hsl(0, 0%, 0%)' },
    ];
  
    testCases.forEach(({ input, output }) => {
      it(`should convert RGB ${input} to HSL string ${output}`, () => {
        expect(getHslString(input as any)).toBe(output);
      });
    });
  });