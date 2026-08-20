"use client";

import React from "react";
import { useStudioStore, StudioTab } from "@/store/useStudioStore";
import {
  Palette,
  Type,
  Layers,
  Monitor,
  DollarSign,
  FileCode,
  X,
  ChevronLeft,
  Sparkles,
  LayoutList,
} from "lucide-react";
import { SidebarTemplatesTab } from "./sidebar/SidebarTemplatesTab";
import { SidebarSectionsTab } from "./sidebar/SidebarSectionsTab";
import { SidebarTextTab } from "./sidebar/SidebarTextTab";
import { SidebarElementsTab } from "./sidebar/SidebarElementsTab";
import { SidebarMockupsTab } from "./sidebar/SidebarMockupsTab";
import { SidebarBudgetTab } from "./sidebar/SidebarBudgetTab";
import { SidebarJsonTab } from "./sidebar/SidebarJsonTab";

export const CanvaSidebar: React.FC = () => {
  const {
    toggleDesignMode,
    activeToolTab,
    setActiveToolTab,
    isPanelOpen,
    togglePanel,
  } = useStudioStore();

  const navItems = [
    { id: "plantillas" as StudioTab, label: "Plantillas", icon: Palette },
    { id: "secciones" as StudioTab, label: "Secciones", icon: LayoutList },
    { id: "texto" as StudioTab, label: "Texto", icon: Type },
    { id: "elementos" as StudioTab, label: "Elementos", icon: Layers },
    { id: "mockups" as StudioTab, label: "Mockups", icon: Monitor },
    { id: "presupuesto" as StudioTab, label: "Finanzas", icon: DollarSign },
    { id: "json" as StudioTab, label: "Exportar", icon: FileCode },
  ];

  return (
    <aside className="no-print shrink-0 h-full flex shadow-2xl transition-all duration-300 font-sans z-40 select-none border-r border-zinc-800">
      {/* Left Vertical Icon Rail */}
      <div className="w-[72px] bg-[#18181B] text-white flex flex-col items-center justify-between py-4 border-r border-zinc-800 shrink-0 select-none z-20">
        <div className="flex flex-col items-center space-y-5 w-full">
          <div
            onClick={toggleDesignMode}
            className="w-11 h-11 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-black text-xs cursor-pointer hover:scale-105 transition-transform shadow-md shadow-[#2563EB]/30 mb-2"
            title="Canva Studio • Clic o Ctrl+Shift+E para salir"
          >
            <span>CS</span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeToolTab === item.id && isPanelOpen;
            return (
              <button
                key={item.id}
                onClick={() => setActiveToolTab(item.id)}
                className={`w-full py-3 flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer relative ${
                  isActive
                    ? "text-white bg-zinc-800/90 font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB] rounded-r" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? "text-[#2563EB]" : ""}`} />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={toggleDesignMode}
          className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-red-600/80 transition-all cursor-pointer"
          title="Salir del Modo Studio (Ctrl+Shift+E)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Expandable Secondary Panel */}
      <div
        className={`bg-white border-r border-[#E4E4E7] flex flex-col justify-between shadow-xl transition-all duration-300 relative overflow-hidden z-10 ${
          isPanelOpen ? "w-80 opacity-100" : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={togglePanel}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-6 h-12 bg-white border border-[#E4E4E7] rounded-r-xl shadow-md flex items-center justify-center text-zinc-600 hover:text-[#2563EB] cursor-pointer transition-colors"
          title={isPanelOpen ? "Ocultar panel lateral" : "Mostrar panel lateral"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="p-4 border-b border-[#E4E4E7] bg-[#FAF9F6] flex items-center justify-between shrink-0">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#111111] font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span>
              {activeToolTab === "plantillas" && "Paletas & Estilo Visual"}
              {activeToolTab === "secciones" && "Estructura de Secciones"}
              {activeToolTab === "texto" && "Tipografía & Texto"}
              {activeToolTab === "elementos" && "Biblioteca de Elementos"}
              {activeToolTab === "mockups" && "Marcos & Dispositivos"}
              {activeToolTab === "presupuesto" && "Controles Financieros"}
              {activeToolTab === "json" && "Exportación & JSON"}
            </span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeToolTab === "plantillas" && <SidebarTemplatesTab />}
          {activeToolTab === "secciones" && <SidebarSectionsTab />}
          {activeToolTab === "texto" && <SidebarTextTab />}
          {activeToolTab === "elementos" && <SidebarElementsTab />}
          {activeToolTab === "mockups" && <SidebarMockupsTab />}
          {activeToolTab === "presupuesto" && <SidebarBudgetTab />}
          {activeToolTab === "json" && <SidebarJsonTab />}
        </div>
      </div>
    </aside>
  );
};
