"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
import {
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  MousePointer,
  SquareDashed,
} from "lucide-react";
import { toast } from "sonner";

export const StudioToolbar: React.FC = () => {
  const {
    toggleDesignMode,
    isPanelOpen,
    togglePanel,
    setActiveToolTab,
    canvasMode,
    setCanvasMode,
  } = useStudioStore();

  return (
    <header className="no-print sticky top-0 z-40 w-full h-16 bg-[#18181B] border-b border-zinc-800 text-white shadow-md flex items-center justify-between px-4 sm:px-6 select-none font-sans shrink-0">
      {/* Left Context Controls */}
      <div className="flex items-center gap-[3.5rem] text-sm">
        <button
          onClick={togglePanel}
          className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
          title={isPanelOpen ? "Ocultar panel de herramientas" : "Mostrar panel de herramientas"}
        >
          {isPanelOpen ? (
            <PanelLeftClose className="w-5 h-5 text-[#2563EB]" />
          ) : (
            <PanelLeftOpen className="w-5 h-5 text-zinc-400" />
          )}
        </button>

        {/* Mode Switcher: Seleccionar vs Dibujar/Arrastrar Recuadro */}
        <div className="inline-flex p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm font-bold shadow-inner">
          <button
            onClick={() => {
              setCanvasMode("select");
              toast.info("👆 Modo Seleccionar / Mover activo.");
            }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              canvasMode === "select"
                ? "bg-[#2563EB] text-white shadow-md font-extrabold"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Modo Seleccionar y Mover Elementos (👆)"
          >
            <MousePointer className="w-4 h-4" />
            <span>Seleccionar</span>
          </button>

          <button
            onClick={() => {
              setCanvasMode("draw");
              setActiveToolTab("texto");
              toast.info("✏️ Modo Arrastrar / Dibujar Recuadro activo: Selecciona o arrastra en el lienzo.");
            }}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
              canvasMode === "draw"
                ? "bg-[#2563EB] text-white shadow-md font-extrabold"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Modo Dibujar y Arrastrar Recuadro (✏️)"
          >
            <SquareDashed className="w-4 h-4" />
            <span>Dibujar / Arrastrar</span>
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Executive View Switch / Exit Studio */}
        <button
          onClick={toggleDesignMode}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs shadow-md shadow-[#2563EB]/30 transition-all cursor-pointer transform hover:scale-105"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vista Ejecutiva</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono ml-1 hidden sm:inline">
            Ctrl+Shift+E
          </span>
        </button>
      </div>
    </header>
  );
};
