import { Buffer } from "buffer";

export const isArraysEqual = <T>(arr1: Array<T>, arr2: Array<T>) => {
  return arr1.every((val) => arr2.includes(val)) && arr1.length === arr2.length;
};

export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString("base64");
};

export const decodeBase64 = (data: string) => {
  return Buffer.from(data, "base64").toString("ascii");
};
