"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { useProposal } from "@/context/ProposalContext";
import {
  Sparkles,
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  ZoomIn,
  ZoomOut,
  Download,
  FileCode,
  Palette,
  MousePointer,
  SquareDashed,
} from "lucide-react";
import { toast } from "sonner";

export const StudioToolbar: React.FC = () => {
  const {
    toggleDesignMode,
    isPanelOpen,
    togglePanel,
    zoomLevel,
    setZoomLevel,
    setActiveToolTab,
    canvasMode,
    setCanvasMode,
  } = useStudioStore();
  const { exportJson } = useProposal();

  const handleZoomIn = () => {
    if (zoomLevel < 140) setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 60) setZoomLevel(zoomLevel - 10);
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  const handlePrint = () => {
    toast.info("Generando vista de impresión PDF (8 páginas)...");
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <header className="no-print sticky top-0 z-40 w-full h-14 bg-[#18181B] border-b border-zinc-800 text-white shadow-md flex items-center justify-between px-4 sm:px-6 select-none font-sans shrink-0">
      {/* Left Context Controls */}
      <div className="flex items-center space-x-3 text-xs">
        <button
          onClick={togglePanel}
          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white cursor-pointer transition-colors"
          title={isPanelOpen ? "Ocultar panel de herramientas" : "Mostrar panel de herramientas"}
        >
          {isPanelOpen ? (
            <PanelLeftClose className="w-4 h-4 text-[#2563EB]" />
          ) : (
            <PanelLeftOpen className="w-4 h-4 text-zinc-400" />
          )}
        </button>

        {/* Mode Switcher: Seleccionar vs Dibujar/Arrastrar Recuadro */}
        <div className="inline-flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-bold">
          <button
            onClick={() => {
              setCanvasMode("select");
              toast.info("👆 Modo Seleccionar / Mover activo.");
            }}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
              canvasMode === "select"
                ? "bg-[#2563EB] text-white shadow-md font-extrabold"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Modo Seleccionar y Mover Elementos (👆)"
          >
            <MousePointer className="w-3.5 h-3.5" />
            <span>Seleccionar</span>
          </button>

          <button
            onClick={() => {
              setCanvasMode("draw");
              setActiveToolTab("texto");
              toast.info("✏️ Modo Arrastrar / Dibujar Recuadro activo: Selecciona o arrastra en el lienzo.");
            }}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
              canvasMode === "draw"
                ? "bg-[#2563EB] text-white shadow-md font-extrabold"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Modo Dibujar y Arrastrar Recuadro (✏️)"
          >
            <SquareDashed className="w-3.5 h-3.5" />
            <span>Dibujar / Arrastrar</span>
          </button>
        </div>

        {/* Quick Tab Switch Buttons */}
        <div className="hidden lg:flex items-center space-x-1 pl-2 border-l border-zinc-800 text-[11px] font-bold">
          <button
            onClick={() => setActiveToolTab("plantillas")}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Palette className="w-3.5 h-3.5 text-purple-400" />
            <span>Paletas</span>
          </button>

          <button
            onClick={() => setActiveToolTab("elementos")}
            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Elementos</span>
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Zoom Controls Bar */}
        <div className="inline-flex items-center space-x-1 bg-zinc-800/90 px-2.5 py-1 rounded-xl border border-zinc-700 text-xs font-mono">
          <button
            onClick={handleZoomOut}
            className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Reducir Zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="px-1.5 font-bold text-zinc-200 hover:text-white cursor-pointer"
            title="Restablecer Zoom (100%)"
          >
            {zoomLevel}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Aumentar Zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PDF Download Action */}
        <button
          onClick={handlePrint}
          className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold rounded-xl text-xs border border-zinc-700 cursor-pointer transition-all"
          title="Descargar PDF Completo"
        >
          <Download className="w-3.5 h-3.5" />
          <span>PDF</span>
        </button>

        {/* Export JSON */}
        <button
          onClick={exportJson}
          className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-semibold rounded-xl text-xs border border-zinc-700 cursor-pointer transition-all"
          title="Exportar Propuesta JSON"
        >
          <FileCode className="w-3.5 h-3.5 text-blue-400" />
          <span>JSON</span>
        </button>

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
