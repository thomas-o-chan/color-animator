type Brand<T, B> = T & { __brand: B };

export type RGBString = Brand<string, 'RGBString'>;
export type HexString = Brand<string, 'HexString'>;
export type HSLString = Brand<string, 'HSLString'>;
export type StringColor = RGBString | HexString | HSLString;
export type NormalisedNumber = Brand<number, 'NormalisedNumber'>;
export type EightBitNumber = Brand<number, 'EightBitNumber'>;
export type RGBArray = [EightBitNumber, EightBitNumber, EightBitNumber];
export interface Options {
  returnFormat?: 'rgb' | 'hex' | 'hsl';
}