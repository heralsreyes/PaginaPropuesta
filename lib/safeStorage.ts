import { StateStorage } from "zustand/middleware";

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
