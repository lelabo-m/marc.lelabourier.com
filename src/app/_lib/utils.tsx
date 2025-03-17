import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type RemoveReadonly<T> = {
  -readonly [key in keyof T]: T[key];
};

export function objectKeys<Obj extends {}>(obj: Obj): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[];
}

export function objectEntries<Obj extends {}>(obj: Obj) {
  return Object.entries(obj) as [keyof Obj, Obj[keyof Obj]][];
}

// Utility type to recursively get all keys of a nested object
export type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | `${K}.${DeepKeys<T[K]>}`
        : never;
    }[keyof T]
  : "";

// Utility type to extract the type of a nested value given a path
export type DeepValue<T, Path extends string> = Path extends keyof T
  ? T[Path]
  : Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? Rest extends DeepKeys<T[Key]>
        ? DeepValue<T[Key], Rest>
        : never
      : never
    : never;

export type ConfigRecord<Key extends string, Type> = Partial<Record<Key, Type>>;
