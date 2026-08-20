"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { toast } from "sonner";

export const SidebarMockupsTab: React.FC = () => {
  const { addCanvasElement } = useStudioStore();

  const mockupsList = [
    {
      id: "mockup-macbook",
      mockupType: "macbook" as const,
      title: "Laptop Macbook Pro",
      desc: 'Marco de pantalla retina 16" con controles macOS y ventana viva.',
      icon: Monitor,
    },
    {
      id: "mockup-iphone",
      mockupType: "iphone" as const,
      title: "iPhone 15 Pro",
      desc: "Marco móvil vertical con Dynamic Island, wifi y estado de batería.",
      icon: Smartphone,
    },
    {
      id: "mockup-ipad",
      mockupType: "ipad" as const,
      title: 'iPad Pro 12.9"',
      desc: "Marco de tablet retina con vista de documento ejecutivo.",
      icon: Tablet,
    },
  ];

  const handleAddMockup = (m: typeof mockupsList[0]) => {
    const newId = addCanvasElement({
      type: "mockup",
      mockupType: m.mockupType,
      sectionId: "hero",
      title: m.title,
    });
    toast.success(`Mockup '${m.title}' (${newId}) insertado en el lienzo.`);
  };

  return (
    <div className="space-y-4 text-xs p-4">
      <div className="pb-2 border-b border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
          Marcos de Interfaz & Mockups
        </h4>
        <p className="text-[#71717A] text-[11px] mt-0.5">
          Inserta marcos de dispositivos reales para proyectar capturas o vistas del producto.
        </p>
      </div>

      <div className="space-y-3">
        {mockupsList.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              onClick={() => handleAddMockup(m)}
              className="p-4 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] cursor-pointer transition-all space-y-2 shadow-xs"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#111111] text-sm">{m.title}</h5>
                  <span className="text-[10px] text-[#71717A] font-mono">Formato Vectorial Interactivo</span>
                </div>
              </div>
              <p className="text-xs text-[#71717A] leading-relaxed">{m.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
