type Brand<T, B> = T & { __brand: B };
export type StringFormat = 'rgb' | 'hex' | 'hsl';
export type RGBString = Brand<string, 'RGBString'>;
export type HexString = Brand<string, 'HexString'>;
export type HSLString = Brand<string, 'HSLString'>;
export type StringColor = RGBString | HexString | HSLString;
export type NormalisedNumber = Brand<number, 'NormalisedNumber'>;
export type EightBitNumber = Brand<number, 'EightBitNumber'>;
export type RGBArray = [EightBitNumber, EightBitNumber, EightBitNumber];
export type RGBComponentString = 'red' | 'green' | 'blue';
export interface Options {
  returnFormat?: StringFormat;
}