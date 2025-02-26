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
