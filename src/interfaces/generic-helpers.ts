export type IfExists<T> = T | undefined;
export type IsExtendable<T, K> = K extends void ? T : K;
