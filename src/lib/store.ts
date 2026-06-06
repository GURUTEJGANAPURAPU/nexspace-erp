// Generic localStorage-backed reactive collection hook.
// Multiple components subscribed to the same key stay in sync.
import { useCallback, useEffect, useState } from "react";

const cache = new Map<string, unknown[]>();
const listeners = new Map<string, Set<() => void>>();

function load<T>(key: string, seed: T[]): T[] {
  if (cache.has(key)) return cache.get(key) as T[];
  let val: T[] = seed;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(key);
      if (raw) val = JSON.parse(raw) as T[];
      else localStorage.setItem(key, JSON.stringify(seed));
    } catch {
      /* ignore */
    }
  }
  cache.set(key, val as unknown[]);
  return val;
}

function save<T>(key: string, val: T[]) {
  cache.set(key, val as unknown[]);
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {
      /* ignore */
    }
  }
  listeners.get(key)?.forEach((fn) => fn());
}

export function useCollection<T extends { id: string }>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(() => load(key, seed));

  useEffect(() => {
    const fn = () => setItems(cache.get(key) as T[]);
    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key)!.add(fn);
    setItems(load(key, seed));
    return () => {
      listeners.get(key)!.delete(fn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const add = useCallback(
    (item: T, position: "start" | "end" = "start") => {
      const cur = (cache.get(key) as T[]) ?? [];
      save(key, position === "start" ? [item, ...cur] : [...cur, item]);
    },
    [key],
  );

  const update = useCallback(
    (id: string, patch: Partial<T>) => {
      const cur = (cache.get(key) as T[]) ?? [];
      save(
        key,
        cur.map((i) => (i.id === id ? { ...i, ...patch } : i)),
      );
    },
    [key],
  );

  const upsert = useCallback(
    (item: T) => {
      const cur = (cache.get(key) as T[]) ?? [];
      const exists = cur.some((i) => i.id === item.id);
      save(key, exists ? cur.map((i) => (i.id === item.id ? item : i)) : [item, ...cur]);
    },
    [key],
  );

  const remove = useCallback(
    (id: string) => {
      const cur = (cache.get(key) as T[]) ?? [];
      save(
        key,
        cur.filter((i) => i.id !== id),
      );
    },
    [key],
  );

  const replace = useCallback((next: T[]) => save(key, next), [key]);
  const reset = useCallback(() => save(key, seed), [key, seed]);

  return { items, add, update, upsert, remove, replace, reset };
}

export const newId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
