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

export type ElementActionType =
  | "CHANGE_TAB"
  | "TOGGLE_VISIBILITY"
  | "NAVIGATE_SECTION"
  | "SYSTEM_TRIGGER"
  | "NEXT_TAB";

export interface ButtonActionConfig {
  targetId: string;
  type: ElementActionType;
  payload?: string;
}

export type ExecuteActionConfig = ButtonActionConfig;

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
  type:
    | "button"
    | "card"
    | "shape"
    | "icon"
    | "line"
    | "graphic"
    | "text"
    | "module_template"
    | "mockup"
    | "image";
  shapeType?:
    | "circle"
    | "ellipse"
    | "square"
    | "rounded_rect"
    | "sharp_rect"
    | "triangle_up"
    | "triangle_down"
    | "triangle_right"
    | "triangle_left"
    | "diamond"
    | "pentagon"
    | "hexagon"
    | "octagon"
    | "trapezoid"
    | "parallelogram"
    | "star_4"
    | "star_5"
    | "star_6"
    | "cross"
    | "arrow_right"
    | "arrow_left"
    | "arrow_up"
    | "arrow_down"
    | "arrow_block_right"
    | "arrow_block_left"
    | "arrow_curved"
    | "arrow_double_h"
    | "arrow_double_v"
    | "chevron_right"
    | "line_solid"
    | "line_dashed"
    | "line_neon"
    | "line_vertical"
    | "pill_badge"
    | "speech_bubble"
    | "banner_ribbon"
    | "glass_container";
  iconStyle?: "plain" | "circle_badge" | "square_badge" | "glass_badge";
  iconStrokeWidth?: number;
  cardVariant?:
    | "glass_translucent"
    | "dotted_blueprint"
    | "cyber_chamfer"
    | "neon_glow"
    | "split_accent"
    | "pill_capsule"
    | "metric_kpi"
    | "testimonial_quote"
    | "checklist_feature"
    | "pricing_cta";
  buttonVariant?:
    | "glass_translucent"
    | "dotted_blueprint"
    | "cyber_chamfer"
    | "pill_floating_icon"
    | "two_line_tech"
    | "neon_glow_cta"
    | "live_pulse_badge"
    | "circular_fab";
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
  mockupType?: "macbook" | "iphone" | "ipad" | "browser" | "financial_ticket";
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
  badgeText?: string;

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

  // Custom data payload for persistent module templates
  customData?: Record<string, unknown>;
}
