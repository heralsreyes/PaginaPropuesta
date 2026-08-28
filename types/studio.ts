export type StudioTab =
  | "plantillas"
  | "secciones"
  | "texto"
  | "elementos"
  | "mockups"
  | "presupuesto"
  | "json";

export interface PageSection {
  id: string;
  label: string;
  componentType:
    | "hero"
    | "alcance"
    | "cronograma"
    | "equipo"
    | "responsabilidades"
    | "inversion"
    | "empresa"
    | "contacto"
    | "custom";
  enabled: boolean;
  title?: string;
  subtitle?: string;
}

export interface ButtonActionConfig {
  targetId: string;
  type: "CHANGE_TAB" | "TOGGLE_VISIBILITY" | "NAVIGATE_SECTION" | "SYSTEM_TRIGGER" | "NEXT_TAB";
  payload?: string;
}

export interface PlainCardTab {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  customBg?: string;
  customBorder?: string;
  customText?: string;
  deliverables?: string[];
}

export interface CanvasElement {
  id: string;
  type: "button" | "card" | "shape" | "line" | "graphic" | "text" | "module_template" | "mockup" | "image";
  templateType?:
    | "scope_master"
    | "team_master"
    | "company_master"
    | "clean_multitab"
    | "kpi_card"
    | "whatsapp_sim"
    | "ai_expediente"
    | "investment_calc"
    | "pricing_block"
    | "feature_grid";
  mockupType?: "macbook" | "iphone" | "ipad";
  imageUrl?: string;
  objectFit?: "contain" | "cover" | "fill";
  sectionId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  title: string;
  subtitle?: string;
  content?: string;

  // Multi-Tab & Visibility Controls
  isMultiTab?: boolean;
  hideTabPills?: boolean;
  activeTabId?: string;
  tabs?: PlainCardTab[];
  tabStyle?: "pills" | "underline" | "folders";
  isHidden?: boolean;

  // Color Overrides
  customBg?: string;
  customBorder?: string;
  customText?: string;
  customAccent?: string;

  // Style variant / icon / typography
  variant?: string;
  iconName?: string;
  fontFamily?: string;
  fontSize?: number;
  textType?: "h1" | "h2" | "p" | "bullet" | "quote" | string;

  // Button action binding
  actionConfig?: ButtonActionConfig;
}
