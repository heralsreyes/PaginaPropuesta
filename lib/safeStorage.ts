import { StateStorage } from "zustand/middleware";

const debounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export const safeLocalStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(name, value);
    } catch (err) {
      console.error(`Storage save error for "${name}":`, err);
    }
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(name);
    } catch (err) {
      console.error(`Storage remove error for "${name}":`, err);
    }
  },
};

export const debouncedSafeLocalStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    if (debounceTimers[name]) {
      clearTimeout(debounceTimers[name]);
    }
    debounceTimers[name] = setTimeout(() => {
      try {
        localStorage.setItem(name, value);
      } catch (err) {
        console.error(`Storage save error for "${name}":`, err);
      }
    }, 120);
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(name);
    } catch (err) {
      console.error(`Storage remove error for "${name}":`, err);
    }
  },
};
