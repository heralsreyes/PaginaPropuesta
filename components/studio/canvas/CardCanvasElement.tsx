"use client";

import React from "react";
import { CanvasElement } from "@/types/studio";
import { useStudioStore } from "@/store/useStudioStore";
import { EditableText } from "@/components/studio/EditableText";
import {
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  ArrowRight,
  Quote,
  Activity,
  Layers,
} from "lucide-react";

interface CardCanvasElementProps {
  element: CanvasElement;
}

export const CardCanvasElement: React.FC<CardCanvasElementProps> = ({ element }) => {
  const { setActiveTabForCard, updateCanvasElement } = useStudioStore();
  const variant = element.cardVariant || "glass_translucent";

  const activeTabId = element.activeTabId || element.tabs?.[0]?.id || "tab-1";
  const activeTab = element.tabs?.find((t) => t.id === activeTabId) || element.tabs?.[0];

  // 1. TRANSLÚCIDA / FROSTED GLASS
  if (variant === "glass_translucent") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "rgba(255, 255, 255, 0.06)",
          borderColor: element.customBorder || "rgba(255, 255, 255, 0.2)",
          color: element.customText || "#FFFFFF",
        }}
        className="w-full h-full p-6 rounded-3xl border backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F08D17]/10 blur-2xl rounded-full pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F08D17] font-bold px-2 py-0.5 rounded-full bg-[#F08D17]/15 border border-[#F08D17]/30">
              {element.badgeText || "GLASS PRO"}
            </span>
            <Sparkles className="w-4 h-4 text-[#F08D17]" />
          </div>
          <EditableText
            value={element.title || "Tarjeta Translúcida Glass"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-lg sm:text-xl block text-white"
          />
          <EditableText
            value={element.subtitle || "Efecto de cristal esmerilado con desenfoque de fondo y reflejo ambiental."}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            multiline
            className="text-xs text-white/80 block leading-relaxed"
          />
        </div>
      </div>
    );
  }

  // 2. DOTTED / BLUEPRINT TÉCNICO
  if (variant === "dotted_blueprint") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "#002224",
          borderColor: element.customBorder || "#F08D17",
          color: element.customText || "#FFFFFF",
        }}
        className="w-full h-full p-6 rounded-2xl border-2 border-dashed shadow-xl flex flex-col justify-between relative overflow-hidden"
      >
        {/* Corner Crosshairs */}
        <span className="absolute top-1 left-1 text-[10px] font-mono text-[#F08D17] font-black">+</span>
        <span className="absolute top-1 right-1 text-[10px] font-mono text-[#F08D17] font-black">+</span>
        <span className="absolute bottom-1 left-1 text-[10px] font-mono text-[#F08D17] font-black">+</span>
        <span className="absolute bottom-1 right-1 text-[10px] font-mono text-[#F08D17] font-black">+</span>

        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-dashed border-white/20 pb-2">
            <span className="text-[9px] font-mono text-[#F08D17] font-bold uppercase tracking-wider">
              [SPEC // TÉCNICA]
            </span>
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </div>
          <EditableText
            value={element.title || "Tarjeta Dotted Blueprint"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-mono font-black text-base text-white block"
          />
          <EditableText
            value={element.subtitle || "Bordes discontinuos técnicos con cuadrícula blueprint para especificaciones."}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            multiline
            className="text-xs font-mono text-slate-300 block leading-relaxed"
          />
        </div>
      </div>
    );
  }

  // 3. CORTE DIAGONAL / CYBER CHAMFER
  if (variant === "cyber_chamfer") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "#003B3F",
          borderColor: element.customBorder || "#F08D17",
          color: element.customText || "#FFFFFF",
          clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
        }}
        className="w-full h-full p-6 border-2 shadow-2xl flex flex-col justify-between relative"
      >
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F08D17]" />
            <span className="text-[10px] font-mono font-bold uppercase text-[#F08D17] tracking-widest">
              FINTECH ANGLED
            </span>
          </div>
          <EditableText
            value={element.title || "Tarjeta Cyber Chamfer"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-black text-lg text-white block"
          />
          <EditableText
            value={element.subtitle || "Esquinas cortadas en bisel geométrico para arquitectura y seguridad SIMV."}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            multiline
            className="text-xs text-slate-200 block"
          />
        </div>
      </div>
    );
  }

  // 4. NEÓN GLOW
  if (variant === "neon_glow") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "#001B1E",
          borderColor: element.customBorder || "#F08D17",
          color: element.customText || "#FFFFFF",
        }}
        className="w-full h-full p-6 rounded-3xl border-2 shadow-[0_0_25px_rgba(240,141,23,0.35)] flex flex-col justify-between relative overflow-hidden"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#F08D17] flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#F08D17]" />
              HIGH PERFORMANCE
            </span>
          </div>
          <EditableText
            value={element.title || "Tarjeta Neón Glow"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-xl text-white block"
          />
          <EditableText
            value={element.subtitle || "Aura luminosa exterior con alto contraste visual."}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            multiline
            className="text-xs text-slate-200 block"
          />
        </div>
      </div>
    );
  }

  // 5. SPLIT ACCENT (HORIZONTAL DIVIDIDA)
  if (variant === "split_accent") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "#002B2E",
          borderColor: element.customBorder || "rgba(255,255,255,0.15)",
          color: element.customText || "#FFFFFF",
        }}
        className="w-full h-full rounded-3xl border shadow-xl flex overflow-hidden"
      >
        <div className="w-1/3 bg-[#F08D17] flex flex-col items-center justify-center p-4 text-white text-center">
          <ShieldCheck className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-mono font-bold uppercase">100% SEGURO</span>
        </div>
        <div className="w-2/3 p-5 flex flex-col justify-center space-y-1.5">
          <EditableText
            value={element.title || "Tarjeta Split con Acento"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-bold text-sm sm:text-base text-white block"
          />
          <EditableText
            value={element.subtitle || "Columna visual izquierda con descripción lateral."}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            multiline
            className="text-xs text-slate-300 block"
          />
        </div>
      </div>
    );
  }

  // 6. PÍLDORA CÁPSULA (ULTRA-SOFT BENTO)
  if (variant === "pill_capsule") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "#BFDAD1",
          borderColor: element.customBorder || "#A6C5BB",
          color: element.customText || "#135A34",
        }}
        className="w-full h-full p-6 rounded-[36px] border-2 shadow-lg flex flex-col justify-between"
      >
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#135A34]/15 text-[#135A34] text-[10px] font-bold font-mono">
            ● ENFOCO SAGE
          </div>
          <EditableText
            value={element.title || "Tarjeta Cápsula Ultra-Soft"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-lg text-[#135A34] block"
          />
          <EditableText
            value={element.subtitle || "Bordes envolventes ultra suaves estilo Bento moderno."}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            multiline
            className="text-xs text-[#1E3A2F] block leading-relaxed"
          />
        </div>
      </div>
    );
  }

  // 7. KPI / MÉTRICA STAT CARD
  if (variant === "metric_kpi") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "#003B3F",
          borderColor: element.customBorder || "rgba(255,255,255,0.2)",
          color: element.customText || "#FFFFFF",
        }}
        className="w-full h-full p-6 rounded-3xl border shadow-xl flex flex-col justify-between space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#F08D17]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
            +24.8% ↑
          </span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-black font-mono text-white block">
            <EditableText
              value={element.title || "$1.45M"}
              onChange={(val) => updateCanvasElement(element.id, { title: val })}
            />
          </span>
          <span className="text-xs text-slate-300 font-mono block mt-1">
            <EditableText
              value={element.subtitle || "Volumen Transaccional Procesado"}
              onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            />
          </span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#F08D17] h-full rounded-full w-4/5" />
        </div>
      </div>
    );
  }

  // 8. TESTIMONIAL / CITA EJECUTIVA
  if (variant === "testimonial_quote") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "#002224",
          borderColor: element.customBorder || "#F08D17",
          color: element.customText || "#FFFFFF",
        }}
        className="w-full h-full p-6 rounded-3xl border shadow-2xl flex flex-col justify-between relative overflow-hidden"
      >
        <Quote className="w-12 h-12 text-[#F08D17]/15 absolute top-2 right-2 pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <p className="text-xs sm:text-sm italic text-slate-200 leading-relaxed font-medium">
            <EditableText
              value={element.subtitle || '"La plataforma ha transformado la agilidad operativa y la satisfacción de nuestros inversionistas de forma contundente."'}
              onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
              multiline
            />
          </p>
          <div className="flex items-center gap-3 pt-2 border-t border-white/15">
            <div className="w-9 h-9 rounded-full bg-[#F08D17] text-white font-bold text-xs flex items-center justify-center">
              EP
            </div>
            <div>
              <span className="font-bold text-xs text-white block">
                <EditableText
                  value={element.title || "Director de Operaciones"}
                  onChange={(val) => updateCanvasElement(element.id, { title: val })}
                />
              </span>
              <span className="text-[10px] text-[#F08D17] font-mono">Excel Puesto de Bolsa</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 9. CHECKLIST / CARACTERÍSTICAS
  if (variant === "checklist_feature") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "#003B3F",
          borderColor: element.customBorder || "rgba(255,255,255,0.2)",
          color: element.customText || "#FFFFFF",
        }}
        className="w-full h-full p-6 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4"
      >
        <div className="space-y-1.5">
          <div className="w-9 h-9 rounded-xl bg-[#F08D17]/20 border border-[#F08D17]/40 text-[#F08D17] flex items-center justify-center mb-2">
            <Award className="w-5 h-5" />
          </div>
          <EditableText
            value={element.title || "Garantía & Criterios DoD"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-base text-white block"
          />
        </div>
        <ul className="space-y-2 text-xs text-slate-200">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F08D17] shrink-0" />
            <span>Autenticación biométrica FaceID</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F08D17] shrink-0" />
            <span>Trade Ticket digital fehaciente</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F08D17] shrink-0" />
            <span>Integración directa Dynamics CRM</span>
          </li>
        </ul>
      </div>
    );
  }

  // 10. PRICING / COTIZACIÓN CON CTA
  if (variant === "pricing_cta") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "#002B2E",
          borderColor: element.customBorder || "#F08D17",
          color: element.customText || "#FFFFFF",
        }}
        className="w-full h-full p-6 rounded-3xl border-2 shadow-2xl flex flex-col justify-between space-y-4 relative"
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-2">
          <EditableText
            value={element.title || "Plan Implementación"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-bold text-sm text-white block"
          />
          <span className="text-[9px] font-mono font-bold bg-[#F08D17] text-white px-2 py-0.5 rounded-full">
            RECOMENDADO
          </span>
        </div>
        <div>
          <span className="text-3xl font-black font-mono text-white">$18,500</span>
          <span className="text-xs text-slate-400 font-mono"> USD</span>
        </div>
        <button
          type="button"
          className="w-full py-2.5 rounded-xl bg-[#F08D17] hover:bg-[#d87c0f] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Seleccionar Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  // Default Standard Card
  return (
    <div
      style={{
        backgroundColor: element.customBg || "#FFFFFF",
        borderColor: element.customBorder || "#E4E4E7",
        color: element.customText || "#18181B",
      }}
      className="w-full h-full p-5 rounded-2xl border shadow-md flex flex-col justify-between overflow-hidden"
    >
      <div>
        <EditableText
          value={element.title || "Título de Tarjeta"}
          onChange={(val) => updateCanvasElement(element.id, { title: val })}
          className="font-extrabold text-sm sm:text-base mb-1 block"
        />
        <EditableText
          value={element.subtitle || "Haga doble clic para editar este texto in-situ."}
          onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
          className="text-xs text-zinc-500 block"
        />
      </div>
    </div>
  );
};
