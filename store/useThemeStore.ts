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
    name: "Excel Blanco Corporativo (Default)",
    theme: {
      bgMain: "#FFFFFF",
      accentColor: "#004F54",
      cardBg: "#FFFFFF",
      textPrimary: "#0F172A",
      borderColor: "#E2E8F0",
    },
  },
  {
    id: "dark",
    name: "Excel Dark Mode",
    theme: {
      bgMain: "#061C1E",
      accentColor: "#006B70",
      cardBg: "#0B292C",
      textPrimary: "#F8FAFC",
      borderColor: "#163E42",
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
