/* eslint-disable @typescript-eslint/no-explicit-any */
type StringIndexedObject<T = any> = {
    [key: string]: T;
};