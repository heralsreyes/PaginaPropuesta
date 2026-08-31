"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Monitor, Smartphone, Tablet, Globe, CreditCard } from "lucide-react";
import { toast } from "sonner";

export const SidebarMockupsTab: React.FC = () => {
  const { addCanvasElement } = useStudioStore();

  const mockupsList = [
    {
      id: "mockup-macbook",
      mockupType: "macbook" as const,
      title: "Laptop MacBook Pro 16\"",
      desc: "Marco de pantalla retina 16\" con controles macOS y ventana viva.",
      icon: Monitor,
      width: 420,
      height: 260,
    },
    {
      id: "mockup-iphone",
      mockupType: "iphone" as const,
      title: "iPhone 15 Pro (Móvil)",
      desc: "Marco vertical con Dynamic Island, wifi y estado de batería.",
      icon: Smartphone,
      width: 240,
      height: 420,
    },
    {
      id: "mockup-ipad",
      mockupType: "ipad" as const,
      title: "iPad Pro 12.9\" (Tablet)",
      desc: "Marco de tablet retina con vista de documento ejecutivo.",
      icon: Tablet,
      width: 360,
      height: 280,
    },
    {
      id: "mockup-browser",
      mockupType: "browser" as const,
      title: "Ventana de Navegador Web",
      desc: "Interfaz web con barra de direcciones URL y controles de navegación.",
      icon: Globe,
      width: 420,
      height: 250,
    },
    {
      id: "mockup-ticket",
      mockupType: "financial_ticket" as const,
      title: "Trade Ticket de Inversión",
      desc: "Tarjeta interactiva de operación financiera con validación OTP.",
      icon: CreditCard,
      width: 320,
      height: 220,
    },
  ];

  const handleDragStart = (e: React.DragEvent, m: typeof mockupsList[0]) => {
    const elementData = {
      type: "mockup",
      mockupType: m.mockupType,
      sectionId: "hero",
      title: m.title,
      width: m.width,
      height: m.height,
    };
    e.dataTransfer.setData("application/json", JSON.stringify(elementData));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleAddMockup = (m: typeof mockupsList[0]) => {
    const newId = addCanvasElement({
      type: "mockup",
      mockupType: m.mockupType as any,
      sectionId: "hero",
      title: m.title,
      width: m.width,
      height: m.height,
    });
    toast.success(`Mockup '${m.title}' insertado.`);
  };

  return (
    <div className="space-y-4 text-xs p-4">
      <div className="pb-2 border-b border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
          Marcos de Interfaz & Mockups
        </h4>
        <p className="text-[#71717A] text-[11px] mt-0.5">
          Arrastra cualquier marco directamente al lienzo o haz clic para insertarlo.
        </p>
      </div>

      <p className="text-[11px] text-zinc-500 italic">
        💡 Arrastra el dispositivo a la sección deseada del lienzo.
      </p>

      <div className="space-y-2.5">
        {mockupsList.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              draggable
              onDragStart={(e) => handleDragStart(e, m)}
              onClick={() => handleAddMockup(m)}
              className="p-3.5 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all space-y-1.5 shadow-xs group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#111111] text-xs">{m.title}</h5>
                  <span className="text-[10px] text-[#71717A] font-mono">Vectorial & Interactivo</span>
                </div>
              </div>
              <p className="text-[11px] text-[#71717A] leading-relaxed">{m.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
