"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Heading1, Heading2, AlignLeft, ListOrdered, Quote } from "lucide-react";
import { toast } from "sonner";

export const SidebarTextTab: React.FC = () => {
  const { addCanvasElement } = useStudioStore();

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

  const handleAddText = (opt: typeof textOptions[0]) => {
    const newId = addCanvasElement({
      type: "text",
      textType: opt.type,
      fontSize: opt.fontSize,
      sectionId: "hero",
      title: opt.text,
    });
    toast.success(`Elemento de texto (${newId}) insertado en el lienzo.`);
  };

  return (
    <div className="space-y-4 text-xs p-4">
      <div className="pb-2 border-b border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
          Inserción de Bloques de Texto
        </h4>
        <p className="text-[#71717A] text-[11px] mt-0.5">
          Toca cualquier estilo para agregar un nodo de texto editable al lienzo.
        </p>
      </div>

      <div className="space-y-2.5">
        {textOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.type}
              onClick={() => handleAddText(opt)}
              className="w-full p-3 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] text-left transition-all cursor-pointer flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#111111] block">{opt.label}</span>
                  <span className="text-[10px] text-[#71717A] font-mono">{opt.fontSize}px</span>
                </div>
              </div>
              <span className="text-xs text-[#2563EB] font-bold">+</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
