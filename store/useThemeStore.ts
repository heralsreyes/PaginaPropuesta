import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { safeLocalStorage } from "@/lib/safeStorage";

export interface ThemeConfig {
  bgMain: string;
  accentColor: string;
  secondaryAccent: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  navBg: string;
  h1Color?: string;
  h2Color?: string;
  textColor?: string;
  cardBorderRadius?: string;
}

export interface PresetTheme {
  id: string;
  name: string;
  theme: ThemeConfig;
}

export const PRESET_THEMES: PresetTheme[] = [
  {
    id: "excel-official",
    name: "Excel Oficial (#004F54 & #F08D17)",
    theme: {
      bgMain: "#004F54",
      accentColor: "#004F54",
      secondaryAccent: "#F08D17",
      cardBg: "#002224",
      cardBorder: "#F08D17",
      textPrimary: "#FFFFFF",
      textSecondary: "#D5E4E2",
      navBg: "#002224",
      h1Color: "#FFFFFF",
      h2Color: "#F08D17",
      textColor: "#D5E4E2",
      cardBorderRadius: "24px",
    },
  },
  {
    id: "default-white",
    name: "Excel Blanco Ejecutivo",
    theme: {
      bgMain: "#FFFFFF",
      accentColor: "#004F54",
      secondaryAccent: "#F08D17",
      cardBg: "#F8FAFC",
      cardBorder: "#CBD5E1",
      textPrimary: "#0F172A",
      textSecondary: "#475569",
      navBg: "#002224",
      h1Color: "#0F172A",
      h2Color: "#004F54",
      textColor: "#475569",
      cardBorderRadius: "24px",
    },
  },
  {
    id: "obsidian-gold",
    name: "Obsidiana & Oro Luxury",
    theme: {
      bgMain: "#0A0A0A",
      accentColor: "#D97706",
      secondaryAccent: "#F59E0B",
      cardBg: "#171717",
      cardBorder: "#D97706",
      textPrimary: "#FAFAFA",
      textSecondary: "#A3A3A3",
      navBg: "#171717",
      h1Color: "#FAFAFA",
      h2Color: "#F59E0B",
      textColor: "#A3A3A3",
      cardBorderRadius: "24px",
    },
  },
  {
    id: "midnight-cyan",
    name: "Midnight Cobalt & Cyan",
    theme: {
      bgMain: "#0F172A",
      accentColor: "#0284C7",
      secondaryAccent: "#38BDF8",
      cardBg: "#1E293B",
      cardBorder: "#0284C7",
      textPrimary: "#F8FAFC",
      textSecondary: "#94A3B8",
      navBg: "#0F172A",
      h1Color: "#F8FAFC",
      h2Color: "#38BDF8",
      textColor: "#94A3B8",
      cardBorderRadius: "24px",
    },
  },
  {
    id: "emerald-forest",
    name: "Esmeralda Bosque",
    theme: {
      bgMain: "#064E3B",
      accentColor: "#059669",
      secondaryAccent: "#34D399",
      cardBg: "#022C22",
      cardBorder: "#10B981",
      textPrimary: "#ECFDF5",
      textSecondary: "#A7F3D0",
      navBg: "#022C22",
      h1Color: "#ECFDF5",
      h2Color: "#34D399",
      textColor: "#A7F3D0",
      cardBorderRadius: "24px",
    },
  },
  {
    id: "royal-indigo",
    name: "Indigo Corporativo",
    theme: {
      bgMain: "#1E1B4B",
      accentColor: "#4338CA",
      secondaryAccent: "#818CF8",
      cardBg: "#312E81",
      cardBorder: "#6366F1",
      textPrimary: "#EEF2FF",
      textSecondary: "#C7D2FE",
      navBg: "#1E1B4B",
      h1Color: "#EEF2FF",
      h2Color: "#818CF8",
      textColor: "#C7D2FE",
      cardBorderRadius: "24px",
    },
  },
];

export const applyCssVars = (theme: ThemeConfig) => {
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--bg-main", theme.bgMain);
    document.documentElement.style.setProperty("--accent-color", theme.accentColor);
    document.documentElement.style.setProperty("--secondary-accent", theme.secondaryAccent || "#F08D17");
    document.documentElement.style.setProperty("--card-bg", theme.cardBg);
    document.documentElement.style.setProperty("--card-border", theme.cardBorder || theme.secondaryAccent || "#F08D17");
    document.documentElement.style.setProperty("--text-primary", theme.textPrimary);
    document.documentElement.style.setProperty("--text-secondary", theme.textSecondary || "#D5E4E2");
    document.documentElement.style.setProperty("--nav-bg", theme.navBg || "#002224");
    document.documentElement.style.setProperty("--border-color", theme.cardBorder || theme.secondaryAccent || "#F08D17");
    document.documentElement.style.setProperty("--theme-h1", theme.h1Color || theme.textPrimary);
    document.documentElement.style.setProperty("--theme-h2", theme.h2Color || theme.secondaryAccent || theme.accentColor);
    document.documentElement.style.setProperty("--theme-text", theme.textColor || theme.textSecondary || "#D5E4E2");
    document.documentElement.style.setProperty("--card-radius", theme.cardBorderRadius || "24px");
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
      storage: createJSONStorage(() => safeLocalStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyCssVars(state.theme);
        }
      },
    }
  )
);
