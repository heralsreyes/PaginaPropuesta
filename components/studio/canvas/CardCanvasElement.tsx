"use client";

import React from "react";
import { CanvasElement, PlainCardTab } from "@/types/studio";
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
  Plus,
  Trash2,
  X,
} from "lucide-react";

interface CardCanvasElementProps {
  element: CanvasElement;
}

export const CardCanvasElement: React.FC<CardCanvasElementProps> = ({ element }) => {
  const {
    isDesignMode,
    setActiveTabForCard,
    updateCanvasElement,
    addTabToCard,
    removeTabFromCard,
    updateCardTabContent,
  } = useStudioStore();

  const variant = element.cardVariant || "glass_translucent";
  const isMulti = Boolean(element.isMultiTab && element.tabs && element.tabs.length > 0);

  const activeTabId = element.activeTabId || element.tabs?.[0]?.id || "tab-1";
  const activeTab = element.tabs?.find((t) => t.id === activeTabId) || element.tabs?.[0];

  // Tab Header Renderer
  const renderTabHeader = () => {
    if (!isMulti || element.hideTabPills || !element.tabs) return null;

    return (
      <div className="flex items-center gap-1.5 flex-wrap pb-3 mb-2 border-b border-white/15 relative z-20">
        {element.tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          return (
            <div key={tab.id} className="relative group/tab flex items-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTabForCard(element.id, tab.id);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#F08D17] text-white shadow-md scale-105"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {isDesignMode ? (
                  <EditableText
                    value={tab.label}
                    onChange={(val) =>
                      updateCardTabContent(element.id, tab.id, { label: val })
                    }
                  />
                ) : (
                  <span>{tab.label}</span>
                )}
              </button>

              {/* Remove Tab (Design Mode only, if more than 1 tab) */}
              {isDesignMode && element.tabs && element.tabs.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTabFromCard(element.id, tab.id);
                  }}
                  className="opacity-0 group-hover/tab:opacity-100 ml-0.5 p-0.5 rounded-full bg-red-600 hover:bg-red-700 text-white transition-opacity cursor-pointer text-[10px]"
                  title="Eliminar esta pestaña"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Add Tab Button (Design Mode Only) */}
        {isDesignMode && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addTabToCard(element.id, `Vista ${(element.tabs?.length || 0) + 1}`);
            }}
            className="px-2 py-1 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1 cursor-pointer transition-all"
            title="Añadir nueva pestaña"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Pestaña</span>
          </button>
        )}
      </div>
    );
  };

  // Tab Active Body Content
  const renderCardBody = () => {
    if (isMulti && activeTab) {
      return (
        <div className="space-y-2 relative z-10 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <EditableText
              value={activeTab.title || "Título de Pestaña"}
              onChange={(val) =>
                updateCardTabContent(element.id, activeTab.id, { title: val })
              }
              className="font-extrabold text-base sm:text-lg block text-white"
            />
            <EditableText
              value={activeTab.subtitle || "Haga doble clic para editar el contenido de esta vista."}
              onChange={(val) =>
                updateCardTabContent(element.id, activeTab.id, { subtitle: val })
              }
              multiline
              className="text-xs text-white/80 block leading-relaxed"
            />
          </div>

          {activeTab.deliverables && activeTab.deliverables.length > 0 && (
            <ul className="space-y-1.5 text-xs text-slate-200 pt-2 border-t border-white/10">
              {activeTab.deliverables.map((d, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F08D17] shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }

    // Default single-tab body
    return (
      <div className="space-y-2 relative z-10 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <EditableText
            value={element.title || "Título de Tarjeta"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-base sm:text-lg block text-white"
          />
          <EditableText
            value={element.subtitle || "Haga doble clic para editar este texto in-situ."}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            multiline
            className="text-xs text-white/80 block leading-relaxed"
          />
        </div>
      </div>
    );
  };

  // 1. TRANSLÚCIDA / FROSTED GLASS
  if (variant === "glass_translucent") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #002224)",
          borderColor: element.customBorder || "var(--card-border, #F08D17)",
          borderRadius: element.customRadius || "var(--card-radius, 24px)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full p-5 sm:p-6 rounded-3xl border backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F08D17]/10 theme-accent-bg blur-2xl rounded-full pointer-events-none" />
        
        {/* Header with badge / Icon */}
        <div className="flex items-center justify-between mb-2 relative z-10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#F08D17] theme-h2-color font-bold px-2 py-0.5 rounded-full bg-[#F08D17]/15 border border-[#F08D17]/30">
            {element.badgeText || "GLASS PRO"}
          </span>
          <Sparkles className="w-4 h-4 text-[#F08D17] theme-h2-color" />
        </div>

        {renderTabHeader()}
        {renderCardBody()}
      </div>
    );
  }

  // 2. DOTTED / BLUEPRINT TÉCNICO
  if (variant === "dotted_blueprint") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #002224)",
          borderColor: element.customBorder || "var(--card-border, #F08D17)",
          borderRadius: element.customRadius || "var(--card-radius, 24px)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full p-5 sm:p-6 border-2 border-dashed shadow-xl flex flex-col justify-between relative overflow-hidden"
      >
        {/* Corner Crosshairs */}
        <span className="absolute top-1 left-1 text-[10px] font-mono text-[#F08D17] theme-h2-color font-black">+</span>
        <span className="absolute top-1 right-1 text-[10px] font-mono text-[#F08D17] theme-h2-color font-black">+</span>
        <span className="absolute bottom-1 left-1 text-[10px] font-mono text-[#F08D17] theme-h2-color font-black">+</span>
        <span className="absolute bottom-1 right-1 text-[10px] font-mono text-[#F08D17] theme-h2-color font-black">+</span>

        <div className="flex items-center justify-between border-b border-dashed border-white/20 pb-2 mb-2">
          <span className="text-[9px] font-mono text-[#F08D17] theme-h2-color font-bold uppercase tracking-wider">
            [SPEC // TÉCNICA]
          </span>
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        </div>

        {renderTabHeader()}
        {renderCardBody()}
      </div>
    );
  }

  // 3. CORTE DIAGONAL / CYBER CHAMFER
  if (variant === "cyber_chamfer") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #003B3F)",
          borderColor: element.customBorder || "var(--card-border, #F08D17)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
          clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
        }}
        className="w-full h-full p-5 sm:p-6 border-2 shadow-2xl flex flex-col justify-between relative"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#F08D17]" />
          <span className="text-[10px] font-mono font-bold uppercase text-[#F08D17] tracking-widest">
            FINTECH ANGLED
          </span>
        </div>

        {renderTabHeader()}
        {renderCardBody()}
      </div>
    );
  }

  // 4. NEÓN GLOW
  if (variant === "neon_glow") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #001B1E)",
          borderColor: element.customBorder || "var(--card-border, #F08D17)",
          borderRadius: element.customRadius || "var(--card-radius, 24px)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full p-5 sm:p-6 border-2 shadow-[0_0_25px_rgba(240,141,23,0.35)] flex flex-col justify-between relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#F08D17] theme-h2-color flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#F08D17] theme-h2-color" />
            HIGH PERFORMANCE
          </span>
        </div>

        {renderTabHeader()}
        {renderCardBody()}
      </div>
    );
  }

  // 5. SPLIT ACCENT (HORIZONTAL DIVIDIDA)
  if (variant === "split_accent") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #002B2E)",
          borderColor: element.customBorder || "rgba(255,255,255,0.15)",
          borderRadius: element.customRadius || "var(--card-radius, 24px)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full border shadow-xl flex overflow-hidden"
      >
        <div className="w-1/3 bg-[#F08D17] theme-accent-bg flex flex-col items-center justify-center p-4 text-white text-center">
          <ShieldCheck className="w-8 h-8 mb-1" />
          <span className="text-[10px] font-mono font-bold uppercase">100% SEGURO</span>
        </div>
        <div className="w-2/3 p-5 flex flex-col justify-between">
          {renderTabHeader()}
          {renderCardBody()}
        </div>
      </div>
    );
  }

  // 6. PÍLDORA CÁPSULA (ULTRA-SOFT BENTO)
  if (variant === "pill_capsule") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "var(--about-card-bg, #BFDAD1)",
          borderColor: element.customBorder || "var(--about-border, #A6C5BB)",
          color: element.customText || "var(--about-text, #135A34)",
        }}
        className="w-full h-full p-6 rounded-[36px] border-2 shadow-lg flex flex-col justify-between"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#135A34]/15 text-[#135A34] text-[10px] font-bold font-mono mb-2">
          ● ENFOCO SAGE
        </div>
        {renderTabHeader()}
        {renderCardBody()}
      </div>
    );
  }

  // 7. KPI / MÉTRICA STAT CARD
  if (variant === "metric_kpi") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #003B3F)",
          borderColor: element.customBorder || "var(--card-border, rgba(255,255,255,0.2))",
          borderRadius: element.customRadius || "var(--card-radius, 24px)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full p-5 sm:p-6 border shadow-xl flex flex-col justify-between space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#F08D17] theme-h2-color">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
            +24.8% ↑
          </span>
        </div>
        {renderTabHeader()}
        {renderCardBody()}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#F08D17] theme-accent-bg h-full rounded-full w-4/5" />
        </div>
      </div>
    );
  }

  // 8. TESTIMONIAL / CITA EJECUTIVA
  if (variant === "testimonial_quote") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #002224)",
          borderColor: element.customBorder || "var(--card-border, #F08D17)",
          borderRadius: element.customRadius || "var(--card-radius, 24px)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full p-5 sm:p-6 border shadow-2xl flex flex-col justify-between relative overflow-hidden"
      >
        <Quote className="w-12 h-12 text-[#F08D17]/15 theme-h2-color opacity-20 absolute top-2 right-2 pointer-events-none" />
        {renderTabHeader()}
        <div className="space-y-3 relative z-10">
          <p className="text-xs sm:text-sm italic text-slate-200 theme-text-color leading-relaxed font-medium">
            <EditableText
              value={element.subtitle || '"La plataforma ha transformado la agilidad operativa y la satisfacción de nuestros inversionistas de forma contundente."'}
              onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
              multiline
            />
          </p>
          <div className="flex items-center gap-3 pt-2 border-t border-white/15">
            <div className="w-9 h-9 rounded-full bg-[#F08D17] theme-accent-bg text-white font-bold text-xs flex items-center justify-center">
              EP
            </div>
            <div>
              <span className="font-bold text-xs text-white theme-h1-color block">
                <EditableText
                  value={element.title || "Director de Operaciones"}
                  onChange={(val) => updateCanvasElement(element.id, { title: val })}
                />
              </span>
              <span className="text-[10px] text-[#F08D17] theme-h2-color font-mono">Excel Puesto de Bolsa</span>
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
          backgroundColor: element.customBg || "var(--card-bg, #003B3F)",
          borderColor: element.customBorder || "var(--card-border, rgba(255,255,255,0.2))",
          borderRadius: element.customRadius || "var(--card-radius, 24px)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full p-5 sm:p-6 border shadow-xl flex flex-col justify-between space-y-3"
      >
        <div className="w-9 h-9 rounded-xl bg-[#F08D17]/20 border border-[#F08D17]/40 text-[#F08D17] theme-h2-color flex items-center justify-center">
          <Award className="w-5 h-5" />
        </div>
        {renderTabHeader()}
        {renderCardBody()}
      </div>
    );
  }

  // 10. PRICING / COTIZACIÓN CON CTA
  if (variant === "pricing_cta") {
    return (
      <div
        style={{
          backgroundColor: element.customBg || "var(--card-bg, #002B2E)",
          borderColor: element.customBorder || "var(--card-border, #F08D17)",
          borderRadius: element.customRadius || "var(--card-radius, 24px)",
          color: element.customText || "var(--theme-h1, #FFFFFF)",
        }}
        className="w-full h-full p-5 sm:p-6 border-2 shadow-2xl flex flex-col justify-between space-y-3 relative"
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-2">
          <span className="text-[9px] font-mono font-bold bg-[#F08D17] theme-accent-bg text-white px-2 py-0.5 rounded-full">
            RECOMENDADO
          </span>
        </div>
        {renderTabHeader()}
        {renderCardBody()}
        <button
          type="button"
          className="w-full py-2 rounded-xl bg-[#F08D17] theme-accent-bg hover:opacity-90 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
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
        backgroundColor: element.customBg || "var(--card-bg, #002224)",
        borderColor: element.customBorder || "var(--card-border, #F08D17)",
        borderRadius: element.customRadius || "var(--card-radius, 24px)",
        color: element.customText || "var(--theme-h1, #FFFFFF)",
      }}
      className="w-full h-full p-5 border shadow-md flex flex-col justify-between overflow-hidden"
    >
      {renderTabHeader()}
      {renderCardBody()}
    </div>
  );
};
