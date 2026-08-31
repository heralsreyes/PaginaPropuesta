"use client";

import React from "react";
import { CanvasElement } from "@/types/studio";
import { Sparkles, CheckCircle2, ChevronDown } from "lucide-react";

interface UIComponentCanvasElementProps {
  element: CanvasElement;
}

export const UIComponentCanvasElement: React.FC<UIComponentCanvasElementProps> = ({ element }) => {
  const title = (element.title || "").toLowerCase();

  // 1. Indicador de Scroll Vertical (Dots Indicator)
  if (title.includes("scroll") || title.includes("dots")) {
    const dots = [1, 2, 3, 4, 5, 6, 7];
    return (
      <div className="w-full h-full bg-black/60 backdrop-blur-xl rounded-full py-4 px-1.5 border border-white/20 shadow-2xl flex flex-col items-center justify-between">
        <span className="text-[8px] font-mono text-zinc-400 font-bold">NAV</span>
        <div className="flex flex-col items-center space-y-2.5 my-auto">
          {dots.map((d, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === 0
                  ? "bg-[#F08D17] ring-2 ring-[#F08D17]/40 scale-125"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-400 animate-bounce" />
      </div>
    );
  }

  // 2. Línea Divisoria de Conexión
  if (title.includes("line") || title.includes("divisoria") || element.type === "line") {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#F08D17] to-transparent shadow-sm" />
        <div className="absolute w-3.5 h-3.5 rotate-45 bg-[#F08D17] border border-white/40 shadow-md" />
      </div>
    );
  }

  // 3. Barra de Progreso de Sprint
  if (title.includes("sprint") || title.includes("progreso") || title.includes("barra")) {
    return (
      <div className="w-full h-full bg-[#002224] rounded-2xl p-3 border border-emerald-500/40 shadow-xl text-white flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-[11px] font-mono">SPRINT 2: PILOTO SIMV</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400">75% COMPLETADO</span>
        </div>

        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden my-1">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-[#F08D17] rounded-full w-3/4" />
        </div>

        <div className="flex justify-between text-[9px] font-mono text-zinc-400">
          <span>Semana 4 de 8</span>
          <span>4 de 6 Historias DoD</span>
        </div>
      </div>
    );
  }

  // Default Shape
  return (
    <div
      style={{
        backgroundColor: element.customBg || "rgba(0, 34, 36, 0.8)",
        borderColor: element.customBorder || "rgba(240, 141, 23, 0.4)",
        color: element.customText || "#FFFFFF",
      }}
      className="w-full h-full p-3 rounded-2xl border shadow-lg flex items-center justify-center text-center text-xs font-bold"
    >
      {element.title}
    </div>
  );
};
