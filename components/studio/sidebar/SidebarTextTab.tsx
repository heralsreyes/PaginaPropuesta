"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Heading1, Heading2, AlignLeft, ListOrdered, Quote, MousePointerClick, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

export const SidebarTextTab: React.FC = () => {
  const { activeDrawingTool, setActiveDrawingTool } = useStudioStore();

  const textOptions = [
    {
      type: "h1",
      label: "Titular Principal (H1)",
      text: "Titular Principal Relevante",
      icon: Heading1,
      fontSize: 28,
    },
    {
      type: "h2",
      label: "Subtítulo de Sección (H2)",
      text: "Subtítulo Descriptivo de Módulo",
      icon: Heading2,
      fontSize: 20,
    },
    {
      type: "p",
      label: "Cuerpo de Párrafo (P)",
      text: "Texto explicativo sobre el requerimiento o la solución técnica.",
      icon: AlignLeft,
      fontSize: 14,
    },
    {
      type: "bullet",
      label: "Lista con Viñetas",
      text: "• Entregables clave del proyecto\n• Garantía post-entrega",
      icon: ListOrdered,
      fontSize: 13,
    },
    {
      type: "quote",
      label: "Frase Destacada (Quote)",
      text: '"La innovación diferencia a los líderes de los seguidores."',
      icon: Quote,
      fontSize: 15,
    },
  ];

  const handleSelectTextTool = (opt: typeof textOptions[0]) => {
    // If already active, toggle off
    if (activeDrawingTool && activeDrawingTool.textType === opt.type) {
      setActiveDrawingTool(null);
      toast.info("Modo de dibujo desactivado.");
      return;
    }

    setActiveDrawingTool({
      type: "text",
      textType: opt.type,
      fontSize: opt.fontSize,
      sectionId: "hero",
      title: opt.text,
      customBg: "transparent",
      customBorder: "transparent",
      customText:
        opt.type === "h1"
          ? "var(--theme-h1, #FFFFFF)"
          : opt.type === "h2"
          ? "var(--theme-h2, #F08D17)"
          : "var(--theme-text, #D5E4E2)",
    });

    toast.info(
      `✏️ Modo Dibujo Activado: Haz clic y arrastra en el lienzo para trazar tu caja de '${opt.label}'.`
    );
  };

  return (
    <div className="space-y-4 text-xs p-4">
      <div className="pb-2 border-b border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
          Cajas & Bloques de Texto
        </h4>
        <p className="text-[#71717A] text-[11px] mt-0.5">
          Haz clic en un estilo para activar el modo dibujo, luego traza la caja en el lienzo.
        </p>
      </div>

      {activeDrawingTool?.type === "text" && (
        <div className="p-3 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-between text-[#1E40AF]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#2563EB] animate-pulse" />
            <span className="font-bold text-[11px]">Modo Dibujo Activo</span>
          </div>
          <button
            onClick={() => setActiveDrawingTool(null)}
            className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="space-y-2.5">
        {textOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = activeDrawingTool?.textType === opt.type;

          return (
            <button
              key={opt.type}
              onClick={() => handleSelectTextTool(opt)}
              className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between shadow-xs ${
                isActive
                  ? "border-[#2563EB] bg-[#EFF6FF] ring-2 ring-[#2563EB]/30"
                  : "border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB]"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? "bg-[#2563EB] text-white" : "bg-[#2563EB]/10 text-[#2563EB]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#111111] block">{opt.label}</span>
                  <span className="text-[10px] text-[#71717A] font-mono">{opt.fontSize}px</span>
                </div>
              </div>

              {isActive ? (
                <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs">
                  <Check className="w-3.5 h-3.5" />
                </span>
              ) : (
                <span className="text-xs text-[#2563EB] font-bold">+</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
