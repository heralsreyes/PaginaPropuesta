"use client";

import React, { useEffect } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { useProposal } from "@/context/ProposalContext";
import {
  Eye,
  PanelLeftClose,
  PanelLeftOpen,
  MousePointer,
  SquareDashed,
  Undo2,
  Redo2,
  CheckCircle2,
  Save,
  Loader2,
  Check,
} from "lucide-react";
import { toast } from "sonner";

export const StudioToolbar: React.FC = () => {
  const { undo, redo, canUndo, canRedo, saveProposalToServer, isSaving, lastSavedTime } = useProposal();
  const {
    toggleDesignMode,
    isPanelOpen,
    togglePanel,
    setActiveToolTab,
    canvasMode,
    setCanvasMode,
  } = useStudioStore();

  useEffect(() => {
    const handleSaveKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveProposalToServer();
      }
    };
    window.addEventListener("keydown", handleSaveKeyDown);
    return () => window.removeEventListener("keydown", handleSaveKeyDown);
  }, [saveProposalToServer]);

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

      {/* Center: Undo / Redo & Autosave Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1 shadow-inner">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
              canUndo
                ? "text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
                : "text-zinc-600 cursor-not-allowed opacity-50"
            }`}
            title="Deshacer última acción (Ctrl + Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Deshacer</span>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all ${
              canRedo
                ? "text-zinc-200 hover:text-white hover:bg-zinc-800 cursor-pointer"
                : "text-zinc-600 cursor-not-allowed opacity-50"
            }`}
            title="Rehacer acción (Ctrl + Y / Ctrl + Shift + Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Rehacer</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-1 rounded-lg">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Autoguardado</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Direct Save to Server Button */}
        <button
          onClick={() => saveProposalToServer()}
          disabled={isSaving}
          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:bg-zinc-700 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-900/30 transition-all cursor-pointer transform hover:scale-105 active:scale-95"
          title="Guardar propuesta en el servidor (Ctrl + S)"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
          ) : lastSavedTime ? (
            <Check className="w-3.5 h-3.5 text-white" />
          ) : (
            <Save className="w-3.5 h-3.5 text-white" />
          )}
          <span>{isSaving ? "Guardando..." : "Guardar"}</span>
          <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono ml-0.5 hidden sm:inline text-emerald-200">
            Ctrl+S
          </span>
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
