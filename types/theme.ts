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
