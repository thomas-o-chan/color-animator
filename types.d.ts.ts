
type Brand<T, B> = T & { __brand: B };

export type RGBString = Brand<string, 'RGBString'>;
export type HexString = Brand<string, 'HexString'>;
export type HSLString = Brand<string, 'HSLString'>;
export type NormalisedNumber = Brand<number, 'NormalisedNumber'>;
