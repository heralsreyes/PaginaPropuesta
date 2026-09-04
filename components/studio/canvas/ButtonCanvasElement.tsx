"use client";

import React from "react";
import { CanvasElement, ButtonActionConfig } from "@/types/studio";
import {
  ArrowRight,
  Sparkles,
  Download,
  Zap,
  Activity,
  CheckCircle2,
  FileText,
  Smartphone,
} from "lucide-react";

interface ButtonCanvasElementProps {
  element: CanvasElement;
  onExecuteAction?: (config: ButtonActionConfig) => void;
}

export const ButtonCanvasElement: React.FC<ButtonCanvasElementProps> = ({
  element,
  onExecuteAction,
}) => {
  const variant = element.buttonVariant || "neon_glow_cta";

  const handleClick = (e: React.MouseEvent) => {
    if (element.actionConfig && onExecuteAction) {
      e.stopPropagation();
      onExecuteAction(element.actionConfig);
    }
  };

  // 1. TRANSLÚCIDO GLASS
  if (variant === "glass_translucent") {
    return (
      <button
        onClick={handleClick}
        style={{
          backgroundColor: element.customBg || "rgba(255, 255, 255, 0.12)",
          borderColor: element.customBorder || "rgba(255, 255, 255, 0.3)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full rounded-2xl border backdrop-blur-xl shadow-lg flex items-center justify-center gap-2.5 font-bold text-xs hover:bg-white/20 active:scale-95 transition-all cursor-pointer px-4"
      >
        <Sparkles className="w-4 h-4 text-[#F08D17] theme-h2-color" />
        <span>{element.title || "Botón Translúcido Glass"}</span>
      </button>
    );
  }

  // 2. DOTTED BLUEPRINT TÉCNICO
  if (variant === "dotted_blueprint") {
    return (
      <button
        onClick={handleClick}
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #002224)",
          borderColor: element.customBorder || "var(--card-border, #F08D17)",
          color: element.customText || "var(--secondary-accent, #F08D17)",
        }}
        className="w-full h-full rounded-xl border-2 border-dashed shadow-md flex items-center justify-center gap-2 font-mono font-bold text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer px-4"
      >
        <span className="text-[#F08D17] theme-h2-color font-black">[+]</span>
        <span>{element.title || "Botón Dotted Blueprint"}</span>
      </button>
    );
  }

  // 3. CYBER CHAMFER (CORTE EN BISEL)
  if (variant === "cyber_chamfer") {
    return (
      <button
        onClick={handleClick}
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #003B3F)",
          borderColor: element.customBorder || "var(--card-border, #F08D17)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
          clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
        }}
        className="w-full h-full border-2 shadow-xl flex items-center justify-center gap-2 font-mono font-black text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer px-4"
      >
        <span>{element.title || "CYBER BUTTON ➔"}</span>
      </button>
    );
  }

  // 4. PÍLDORA CON ICONO FLOTANTE EN CÍRCULO
  if (variant === "pill_floating_icon") {
    return (
      <button
        onClick={handleClick}
        style={{
          backgroundColor: element.customBg || "var(--bg-main, #004F54)",
          borderColor: element.customBorder || "var(--card-border, #F08D17)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full rounded-full border p-1 pr-4 shadow-xl flex items-center justify-between gap-3 font-bold text-xs hover:shadow-2xl active:scale-95 transition-all cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full bg-[#F08D17] theme-accent-bg text-white flex items-center justify-center shrink-0 shadow-md">
          <Zap className="w-4 h-4" />
        </div>
        <span className="font-extrabold truncate">{element.title || "Explorar Entregables"}</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#F08D17] theme-h2-color" />
      </button>
    );
  }

  // 5. DOS LÍNEAS / SUBTÍTULO TÉCNICO
  if (variant === "two_line_tech") {
    return (
      <button
        onClick={handleClick}
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #002B2E)",
          borderColor: element.customBorder || "rgba(255, 255, 255, 0.2)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full rounded-2xl border p-2.5 px-4 shadow-xl flex items-center justify-between text-left hover:border-[#F08D17] active:scale-95 transition-all cursor-pointer"
      >
        <div>
          <span className="text-[9px] font-mono text-[#F08D17] theme-h2-color font-extrabold uppercase block tracking-wider">
            DESCARGA OFICIAL
          </span>
          <span className="font-extrabold text-xs text-white theme-h1-color block">
            {element.title || "Ficha Técnica SIMV"}
          </span>
        </div>
        <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-[#F08D17] theme-h2-color shrink-0">
          <Download className="w-4 h-4" />
        </div>
      </button>
    );
  }

  // 6. LIVE PULSE BADGE (ESTADO EN VIVO)
  if (variant === "live_pulse_badge") {
    return (
      <button
        onClick={handleClick}
        style={{
          backgroundColor: element.customBg || "var(--card-bg, rgba(0, 34, 36, 0.9))",
          borderColor: element.customBorder || "#059669",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full rounded-full border px-4 shadow-lg flex items-center justify-center gap-2 text-xs font-mono font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>{element.title || "● SISTEMA ONLINE 99.9%"}</span>
      </button>
    );
  }

  // 7. CIRCULAR FAB (BOTÓN REDONDO DE ACCIÓN)
  if (variant === "circular_fab") {
    return (
      <button
        onClick={handleClick}
        style={{
          backgroundColor: element.customBg || "var(--secondary-accent, #F08D17)",
          borderColor: element.customBorder || "#FFFFFF",
          color: element.customText || "#FFFFFF",
        }}
        className="w-full h-full rounded-full border-2 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
        title={element.title || "Acción Rápida"}
      >
        <ArrowRight className="w-6 h-6 text-white stroke-[3]" />
      </button>
    );
  }

  // 8. NEON GLOW CTA (DEFAULT PRINCIPAL)
  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: element.customBg || "var(--secondary-accent, #F08D17)",
        borderColor: element.customBorder || "transparent",
        color: element.customText || "#FFFFFF",
      }}
      className="w-full h-full rounded-2xl shadow-[0_0_20px_rgba(240,141,23,0.4)] flex items-center justify-center gap-2 font-black text-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer px-4"
    >
      <span>{element.title || "Aceptar & Firmar Propuesta"}</span>
      <ArrowRight className="w-4 h-4" />
    </button>
  );
};
