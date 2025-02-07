export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function filterObject<T extends object, K extends keyof T>(obj: T, fn: (key: K, value: T[K]) => boolean): T {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => fn(key as K, value as T[K]))) as T;
}
