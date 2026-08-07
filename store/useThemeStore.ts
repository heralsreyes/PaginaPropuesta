import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ThemeConfig {
  bgMain: string;
  accentColor: string;
  cardBg: string;
  textPrimary: string;
  borderColor: string;
}

export interface PresetTheme {
  id: string;
  name: string;
  theme: ThemeConfig;
}

export const PRESET_THEMES: PresetTheme[] = [
  {
    id: "default",
    name: "Ejecutivo Claro (Default)",
    theme: {
      bgMain: "#FAF9F6",
      accentColor: "#2563EB",
      cardBg: "#FFFFFF",
      textPrimary: "#18181B",
      borderColor: "#E4E4E7",
    },
  },
  {
    id: "dark",
    name: "Dark Mode Elegante",
    theme: {
      bgMain: "#09090B",
      accentColor: "#3B82F6",
      cardBg: "#18181B",
      textPrimary: "#F4F4F5",
      borderColor: "#27272A",
    },
  },
  {
    id: "midnight",
    name: "Midnight Cobalt",
    theme: {
      bgMain: "#0F172A",
      accentColor: "#0284C7",
      cardBg: "#1E293B",
      textPrimary: "#F8FAFC",
      borderColor: "#334155",
    },
  },
  {
    id: "emerald",
    name: "Esmeralda Corporativo",
    theme: {
      bgMain: "#F0FDF4",
      accentColor: "#059669",
      cardBg: "#FFFFFF",
      textPrimary: "#064E3B",
      borderColor: "#A7F3D0",
    },
  },
];

const applyCssVars = (theme: ThemeConfig) => {
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--bg-main", theme.bgMain);
    document.documentElement.style.setProperty("--accent-color", theme.accentColor);
    document.documentElement.style.setProperty("--card-bg", theme.cardBg);
    document.documentElement.style.setProperty("--text-primary", theme.textPrimary);
    document.documentElement.style.setProperty("--border-color", theme.borderColor);
  }
};

interface ThemeState {
  theme: ThemeConfig;
  setTheme: (updates: Partial<ThemeConfig>) => void;
  applyPreset: (preset: ThemeConfig) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: PRESET_THEMES[0].theme,

      setTheme: (updates) => {
        set((state) => {
          const next = { ...state.theme, ...updates };
          applyCssVars(next);
          return { theme: next };
        });
      },

      applyPreset: (newTheme) => {
        applyCssVars(newTheme);
        set({ theme: newTheme });
      },

      resetTheme: () => {
        const defaultTheme = PRESET_THEMES[0].theme;
        applyCssVars(defaultTheme);
        set({ theme: defaultTheme });
      },
    }),
    {
      name: "enfoco-theme-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyCssVars(state.theme);
        }
      },
    }
  )
);
