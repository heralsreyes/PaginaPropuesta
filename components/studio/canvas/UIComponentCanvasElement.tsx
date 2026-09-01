"use client";

import React from "react";
import { CanvasElement } from "@/types/studio";
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  PieChart,
  Briefcase,
  Landmark,
  CreditCard,
  Building2,
  Coins,
  Receipt,
  Wallet,
  Scale,
  Smartphone,
  Monitor,
  Zap,
  Bot,
  Database,
  Server,
  Lock,
  Cpu,
  Cloud,
  Code,
  Terminal,
  Globe,
  Wifi,
  Layers,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Star,
  User,
  Users,
  Heart,
  Search,
  Bell,
  Clock,
  Calendar,
  Award,
  Filter,
  AlertTriangle,
  HelpCircle,
  Activity,
  Check,
  Sliders,
  Maximize2,
  Phone,
  Mail,
  FileText,
  Percent,
  LucideIcon,
} from "lucide-react";

// Icon Map Registry
export const ICON_REGISTRY: Record<string, LucideIcon> = {
  // Finanzas
  dollar: DollarSign,
  trending_up: TrendingUp,
  shield: ShieldCheck,
  pie_chart: PieChart,
  briefcase: Briefcase,
  landmark: Landmark,
  credit_card: CreditCard,
  building: Building2,
  coins: Coins,
  receipt: Receipt,
  wallet: Wallet,
  scale: Scale,
  percent: Percent,
  file_text: FileText,

  // Tecnología
  smartphone: Smartphone,
  monitor: Monitor,
  zap: Zap,
  bot: Bot,
  database: Database,
  server: Server,
  lock: Lock,
  cpu: Cpu,
  cloud: Cloud,
  code: Code,
  terminal: Terminal,
  globe: Globe,
  wifi: Wifi,
  layers: Layers,
  activity: Activity,

  // Acciones & Estados
  check_circle: CheckCircle2,
  check: Check,
  arrow_right: ArrowRight,
  arrow_left: ArrowLeft,
  arrow_up: ArrowUp,
  arrow_down: ArrowDown,
  star: Star,
  sparkles: Sparkles,
  user: User,
  users: Users,
  heart: Heart,
  search: Search,
  bell: Bell,
  clock: Clock,
  calendar: Calendar,
  award: Award,
  filter: Filter,
  alert: AlertTriangle,
  help: HelpCircle,
  phone: Phone,
  mail: Mail,
  sliders: Sliders,
};

interface UIComponentCanvasElementProps {
  element: CanvasElement;
}

export const UIComponentCanvasElement: React.FC<UIComponentCanvasElementProps> = ({ element }) => {
  const title = (element.title || "").toLowerCase();
  const shapeType = element.shapeType;
  const fillColor = element.customBg || "#F08D17";
  const strokeColor = element.customBorder || "#FFFFFF";
  const textColor = element.customText || "#FFFFFF";
  const accentColor = element.customAccent || "#F08D17";

  // ==========================================
  // 1. RENDERIZADO DE ICONOS (TIPO ICON) - PURO SIN FONDOS NI BORDES
  // ==========================================
  if (element.type === "icon" || element.iconName) {
    const iconKey = element.iconName ? element.iconName.toLowerCase() : "sparkles";
    const IconComponent = ICON_REGISTRY[iconKey] || Sparkles;
    const strokeWidth = element.iconStrokeWidth || 2;
    const iconColor =
      element.customText ||
      element.customBg ||
      element.customBorder ||
      element.customAccent ||
      "#F08D17";

    return (
      <div
        style={{ color: iconColor }}
        className="w-full h-full flex items-center justify-center p-0.5"
      >
        <IconComponent
          className="w-full h-full stroke-current"
          strokeWidth={strokeWidth}
        />
      </div>
    );
  }

  // ==========================================
  // 2. RENDERIZADO DE FORMAS GEOMÉTRICAS (SHAPES)
  // ==========================================
  
  // A. Círculo
  if (shapeType === "circle") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="50" cy="50" r="46" fill={fillColor} stroke={strokeColor} strokeWidth="4" />
      </svg>
    );
  }

  // B. Elipse
  if (shapeType === "ellipse") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
        <ellipse cx="50" cy="30" rx="46" ry="26" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
      </svg>
    );
  }

  // C. Cuadrado / Rectángulo con esquinas rectas
  if (shapeType === "sharp_rect" || shapeType === "square") {
    return (
      <div
        style={{
          backgroundColor: fillColor,
          borderColor: strokeColor,
        }}
        className="w-full h-full border-2 shadow-md"
      />
    );
  }

  // D. Rectángulo Redondeado
  if (shapeType === "rounded_rect") {
    return (
      <div
        style={{
          backgroundColor: fillColor,
          borderColor: strokeColor,
        }}
        className="w-full h-full rounded-2xl border-2 shadow-lg"
      />
    );
  }

  // E. Triángulos (Arriba, Abajo, Derecha, Izquierda)
  if (shapeType === "triangle_up") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="50,6 94,94 6,94" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shapeType === "triangle_down") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="6,6 94,6 50,94" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shapeType === "triangle_right") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="6,6 94,50 6,94" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shapeType === "triangle_left") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="94,6 6,50 94,94" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  // F. Rombo / Diamante
  if (shapeType === "diamond") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="50,4 96,50 50,96 4,50" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  // G. Pentágono
  if (shapeType === "pentagon") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="50,4 96,38 78,94 22,94 4,38" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  // H. Hexágono
  if (shapeType === "hexagon") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="25,6 75,6 96,50 75,94 25,94 4,50" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  // I. Octágono
  if (shapeType === "octagon") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  // J. Trapecio
  if (shapeType === "trapezoid") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="20,8 80,8 96,92 4,92" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  // K. Paralelogramo
  if (shapeType === "parallelogram") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="25,8 96,8 75,92 4,92" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  // L. Estrellas (4, 5, 6 puntas)
  if (shapeType === "star_4") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="50,4 62,38 96,50 62,62 50,96 38,62 4,50 38,38" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shapeType === "star_5") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="50,4 63,35 97,37 70,58 80,92 50,72 20,92 30,58 3,37 37,35" fill={fillColor} stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shapeType === "star_6") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="50,2 62,26 88,14 78,38 98,50 78,62 88,86 62,74 50,98 38,74 12,86 22,62 2,50 22,38 12,14 38,26" fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  // M. Cruz / Plus
  if (shapeType === "cross") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="36,4 64,4 64,36 96,36 96,64 64,64 64,96 36,96 36,64 4,64 4,36 36,36" fill={fillColor} stroke={strokeColor} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  // ==========================================
  // 3. FLECHAS & CONECTORES
  // ==========================================

  // Flechas Lineales
  if (shapeType === "arrow_right") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <line x1="4" y1="20" x2="88" y2="20" stroke={fillColor} strokeWidth="8" strokeLinecap="round" />
        <polygon points="82,6 98,20 82,34" fill={fillColor} />
      </svg>
    );
  }

  if (shapeType === "arrow_left") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <line x1="96" y1="20" x2="12" y2="20" stroke={fillColor} strokeWidth="8" strokeLinecap="round" />
        <polygon points="18,6 2,20 18,34" fill={fillColor} />
      </svg>
    );
  }

  if (shapeType === "arrow_up") {
    return (
      <svg className="w-full h-full" viewBox="0 0 40 100" preserveAspectRatio="none">
        <line x1="20" y1="96" x2="20" y2="12" stroke={fillColor} strokeWidth="8" strokeLinecap="round" />
        <polygon points="6,18 20,2 34,18" fill={fillColor} />
      </svg>
    );
  }

  if (shapeType === "arrow_down") {
    return (
      <svg className="w-full h-full" viewBox="0 0 40 100" preserveAspectRatio="none">
        <line x1="20" y1="4" x2="20" y2="88" stroke={fillColor} strokeWidth="8" strokeLinecap="round" />
        <polygon points="6,82 20,98 34,82" fill={fillColor} />
      </svg>
    );
  }

  // Flechas Bloque Gruesa
  if (shapeType === "arrow_block_right") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
        <polygon points="4,20 60,20 60,6 96,30 60,54 60,40 4,40" fill={fillColor} stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" />
      </svg>
    );
  }

  if (shapeType === "arrow_block_left") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
        <polygon points="96,20 40,20 40,6 4,30 40,54 40,40 96,40" fill={fillColor} stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" />
      </svg>
    );
  }

  // Flecha Curva
  if (shapeType === "arrow_curved") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
        <path d="M10,20 C60,20 80,40 80,75" stroke={fillColor} strokeWidth="8" strokeLinecap="round" />
        <polygon points="66,70 80,92 94,70" fill={fillColor} />
      </svg>
    );
  }

  // Flecha Bidireccional Horizontal
  if (shapeType === "arrow_double_h") {
    return (
      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
        <line x1="16" y1="20" x2="84" y2="20" stroke={fillColor} strokeWidth="8" />
        <polygon points="18,6 2,20 18,34" fill={fillColor} />
        <polygon points="82,6 98,20 82,34" fill={fillColor} />
      </svg>
    );
  }

  // Flecha Bidireccional Vertical
  if (shapeType === "arrow_double_v") {
    return (
      <svg className="w-full h-full" viewBox="0 0 40 100" preserveAspectRatio="none">
        <line x1="20" y1="16" x2="20" y2="84" stroke={fillColor} strokeWidth="8" />
        <polygon points="6,18 20,2 34,18" fill={fillColor} />
        <polygon points="6,82 20,98 34,82" fill={fillColor} />
      </svg>
    );
  }

  // Chevron Derecho
  if (shapeType === "chevron_right") {
    return (
      <svg className="w-full h-full" viewBox="0 0 60 100" preserveAspectRatio="none">
        <polyline points="10,10 50,50 10,90" fill="none" stroke={fillColor} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // ==========================================
  // 4. LÍNEAS & DIVISORES
  // ==========================================

  if (shapeType === "line_solid" || element.type === "line") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div style={{ backgroundColor: fillColor }} className="w-full h-1 rounded-full shadow-sm" />
      </div>
    );
  }

  if (shapeType === "line_dashed") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div style={{ borderColor: fillColor }} className="w-full border-b-2 border-dashed" />
      </div>
    );
  }

  if (shapeType === "line_neon") {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#F08D17] to-transparent shadow-md" />
        <div className="absolute w-3.5 h-3.5 rotate-45 bg-[#F08D17] border border-white/60 shadow-lg" />
      </div>
    );
  }

  if (shapeType === "line_vertical") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div style={{ backgroundColor: fillColor }} className="h-full w-1 rounded-full shadow-sm" />
      </div>
    );
  }

  // ==========================================
  // 5. UI CONTENEDORES & BADGES
  // ==========================================

  if (shapeType === "pill_badge") {
    return (
      <div
        style={{
          backgroundColor: fillColor,
          borderColor: strokeColor,
          color: textColor,
        }}
        className="w-full h-full rounded-full border-2 px-4 py-1.5 flex items-center justify-center font-mono font-bold text-xs uppercase shadow-md tracking-wider text-center"
      >
        {element.title || "BADGE OFICIAL"}
      </div>
    );
  }

  if (shapeType === "speech_bubble") {
    return (
      <div className="w-full h-full relative">
        <div
          style={{
            backgroundColor: fillColor,
            borderColor: strokeColor,
            color: textColor,
          }}
          className="w-full h-[80%] rounded-2xl border-2 p-3 flex items-center justify-center font-bold text-xs shadow-lg text-center"
        >
          {element.title || "Mensaje / Nota"}
        </div>
        <div
          style={{
            borderTopColor: fillColor,
          }}
          className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] ml-6"
        />
      </div>
    );
  }

  if (shapeType === "glass_container") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "rgba(255, 255, 255, 0.05)",
          borderColor: element.customBorder || "rgba(255, 255, 255, 0.15)",
        }}
        className="w-full h-full rounded-3xl border backdrop-blur-xl shadow-2xl p-4 flex items-center justify-center"
      >
        {element.title && (
          <span style={{ color: textColor }} className="text-xs font-bold text-center">
            {element.title}
          </span>
        )}
      </div>
    );
  }

  // Fallback Shape / Default
  return (
    <div
      style={{
        backgroundColor: fillColor,
        borderColor: strokeColor,
        color: textColor,
      }}
      className="w-full h-full p-3 rounded-2xl border shadow-lg flex items-center justify-center text-center text-xs font-bold"
    >
      {element.title}
    </div>
  );
};
