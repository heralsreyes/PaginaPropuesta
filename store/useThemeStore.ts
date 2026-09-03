import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { debouncedSafeLocalStorage } from "@/lib/safeStorage";

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
  aboutBg?: string;
  aboutCardBg?: string;
  aboutTextColor?: string;
  aboutCardBorder?: string;
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
      aboutBg: "#D6E5DE",
      aboutCardBg: "#BFDAD1",
      aboutTextColor: "#135A34",
      aboutCardBorder: "#A6C5BB",
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

export const applyCssVarDirect = (key: keyof ThemeConfig, value: string) => {
  if (typeof document === "undefined") return;
  const s = document.documentElement.style;
  switch (key) {
    case "bgMain":
      s.setProperty("--bg-main", value);
      break;
    case "accentColor":
      s.setProperty("--accent-color", value);
      break;
    case "secondaryAccent":
      s.setProperty("--secondary-accent", value);
      break;
    case "cardBg":
      s.setProperty("--card-bg", value);
      break;
    case "cardBorder":
      s.setProperty("--card-border", value);
      s.setProperty("--border-color", value);
      break;
    case "textPrimary":
      s.setProperty("--text-primary", value);
      break;
    case "textSecondary":
      s.setProperty("--text-secondary", value);
      break;
    case "navBg":
      s.setProperty("--nav-bg", value);
      break;
    case "h1Color":
      s.setProperty("--theme-h1", value);
      break;
    case "h2Color":
      s.setProperty("--theme-h2", value);
      break;
    case "textColor":
      s.setProperty("--theme-text", value);
      break;
    case "cardBorderRadius":
      s.setProperty("--card-radius", value);
      break;
    case "aboutBg":
      s.setProperty("--about-bg", value);
      break;
    case "aboutCardBg":
      s.setProperty("--about-card-bg", value);
      break;
    case "aboutTextColor":
      s.setProperty("--about-text", value);
      break;
    case "aboutCardBorder":
      s.setProperty("--about-border", value);
      break;
  }
};

export const applyCssVars = (theme: ThemeConfig) => {
  if (typeof document !== "undefined") {
    const s = document.documentElement.style;
    s.setProperty("--bg-main", theme.bgMain);
    s.setProperty("--accent-color", theme.accentColor);
    s.setProperty("--secondary-accent", theme.secondaryAccent || "#F08D17");
    s.setProperty("--card-bg", theme.cardBg);
    s.setProperty("--card-border", theme.cardBorder || theme.secondaryAccent || "#F08D17");
    s.setProperty("--text-primary", theme.textPrimary);
    s.setProperty("--text-secondary", theme.textSecondary || "#D5E4E2");
    s.setProperty("--nav-bg", theme.navBg || "#002224");
    s.setProperty("--border-color", theme.cardBorder || theme.secondaryAccent || "#F08D17");
    s.setProperty("--theme-h1", theme.h1Color || theme.textPrimary);
    s.setProperty("--theme-h2", theme.h2Color || theme.secondaryAccent || theme.accentColor);
    s.setProperty("--theme-text", theme.textColor || theme.textSecondary || "#D5E4E2");
    s.setProperty("--card-radius", theme.cardBorderRadius || "24px");
    s.setProperty("--about-bg", theme.aboutBg || "#D6E5DE");
    s.setProperty("--about-card-bg", theme.aboutCardBg || "#BFDAD1");
    s.setProperty("--about-text", theme.aboutTextColor || "#135A34");
    s.setProperty("--about-border", theme.aboutCardBorder || "#A6C5BB");
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
      storage: createJSONStorage(() => debouncedSafeLocalStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyCssVars(state.theme);
        }
      },
    }
  )
);
