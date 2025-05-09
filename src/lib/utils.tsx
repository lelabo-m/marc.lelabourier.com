import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export type RemoveReadonly<T> = {
  -readonly [key in keyof T]: T[key];
};

export function objectKeys<Obj extends object>(obj: Obj): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[];
}

export function objectEntries<Obj extends object>(obj: Obj) {
  return Object.entries(obj) as [keyof Obj, Obj[keyof Obj]][];
}

export function objectValues<Obj extends object>(obj: Obj): Obj[keyof Obj][] {
  return Object.values(obj) as Obj[keyof Obj][];
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

export function assertIsDefined<Value>(
  value: Value,
): asserts value is NonNullable<Value> {
  if (value === undefined || value === null) {
    throw new Error(`${value as string} is not defined`);
  }
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
