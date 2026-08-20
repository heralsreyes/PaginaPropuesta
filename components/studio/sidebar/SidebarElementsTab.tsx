"use client";

import React, { useState } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Sparkles, Layers, Cpu, Users, Building2, MessageSquare, BarChart2, TrendingUp, Award, Globe } from "lucide-react";
import { toast } from "sonner";

export const SidebarElementsTab: React.FC = () => {
  const { addCanvasElement } = useStudioStore();
  const [activeSubCategory, setActiveSubCategory] = useState<"botones" | "tarjetas" | "modulos">("modulos");

  const allButtons = [
    { id: "btn-gray-01", label: "Button", style: "bg-zinc-600 hover:bg-zinc-700 text-white rounded-md shadow-xs", bg: "#52525B", text: "#FFFFFF" },
    { id: "btn-pill-grn", label: "Button", style: "bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-sm", bg: "#059669", text: "#FFFFFF" },
    { id: "btn-ora-grad", label: "Button ↗", style: "bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md shadow-sm", bg: "#F97316", text: "#FFFFFF" },
    { id: "btn-royal-pill", label: "Button", style: "bg-[#2563EB] text-white rounded-full shadow-md", bg: "#2563EB", text: "#FFFFFF" },
  ];

  const plainShapeCards = [
    { id: "card-plain-rnd-01", title: "Tarjeta Redondeada", bg: "#FFFFFF", border: "#E4E4E7" },
    { id: "card-plain-pill-02", title: "Tarjeta Cápsula Pill", bg: "#EFF6FF", border: "#60A5FA" },
    { id: "card-plain-out-05", title: "Tarjeta Outline Borde", bg: "transparent", border: "#2563EB" },
    { id: "card-plain-shd-06", title: "Tarjeta Sombra Elevada", bg: "#FFFFFF", border: "#E4E4E7" },
  ];

  const moduleTemplates = [
    {
      id: "mod-template-scope",
      templateType: "scope_master",
      title: "Módulo Base Alcance (Inspector Maestro-Detalle)",
      desc: "Menú izquierdo de módulos y panel derecho de entregables técnicos.",
      icon: Cpu,
    },
    {
      id: "mod-template-team",
      templateType: "team_master",
      title: "Módulo Base Equipo Especialista",
      desc: "Visor de equipo con avatar, roles y asignación de responsabilidades.",
      icon: Users,
    },
    {
      id: "mod-template-company",
      templateType: "company_master",
      title: "Módulo Base Sobre ENFOCO (Empresa)",
      desc: "Visor corporativo con mockup de interfaz macOS e ISO 27002.",
      icon: Building2,
    },
    {
      id: "mod-template-whatsapp-sim",
      templateType: "whatsapp_sim",
      title: "Simulador Chat WhatsApp Oficial (Interactive Bot)",
      desc: "Burbujas de chat con respuestas automáticas y estado en línea.",
      icon: MessageSquare,
    },
    {
      id: "mod-template-[#2563EB]-card",
      templateType: "kpi_card",
      title: "Métrica KPI Pro (Indicador con Tendencia)",
      desc: "Tarjeta de estadísticas con número gigante e indicador.",
      icon: BarChart2,
    },
  ];

  const handleAddButton = (btn: typeof allButtons[0]) => {
    const newId = addCanvasElement({
      type: "button",
      sectionId: "hero",
      title: btn.label,
      customBg: btn.bg,
      customText: btn.text,
    });
    toast.success(`Botón (${newId}) insertado en el lienzo.`);
  };

  const handleAddCard = (c: typeof plainShapeCards[0]) => {
    const newId = addCanvasElement({
      type: "card",
      sectionId: "hero",
      title: c.title,
      subtitle: "Haga doble clic para editar este texto in-situ.",
      customBg: c.bg,
      customBorder: c.border,
      customText: "#18181B",
    });
    toast.success(`Tarjeta (${newId}) insertada en el lienzo.`);
  };

  const handleAddTemplate = (tmpl: typeof moduleTemplates[0]) => {
    const newId = addCanvasElement({
      type: "module_template",
      templateType: tmpl.templateType as any,
      sectionId: "hero",
      title: tmpl.title,
    });
    toast.success(`Módulo Preconfigurado '${tmpl.title}' (${newId}) insertado.`);
  };

  return (
    <div className="space-y-4 text-xs p-4">
      {/* Subtabs */}
      <div className="flex items-center space-x-1 p-1 bg-[#F4F4F5] rounded-xl border border-[#E4E4E7]">
        <button
          onClick={() => setActiveSubCategory("modulos")}
          className={`w-full py-1.5 rounded-lg font-bold text-center transition-all cursor-pointer ${
            activeSubCategory === "modulos" ? "bg-white text-[#2563EB] shadow-xs" : "text-[#71717A]"
          }`}
        >
          Módulos
        </button>
        <button
          onClick={() => setActiveSubCategory("tarjetas")}
          className={`w-full py-1.5 rounded-lg font-bold text-center transition-all cursor-pointer ${
            activeSubCategory === "tarjetas" ? "bg-white text-[#2563EB] shadow-xs" : "text-[#71717A]"
          }`}
        >
          Tarjetas
        </button>
        <button
          onClick={() => setActiveSubCategory("botones")}
          className={`w-full py-1.5 rounded-lg font-bold text-center transition-all cursor-pointer ${
            activeSubCategory === "botones" ? "bg-white text-[#2563EB] shadow-xs" : "text-[#71717A]"
          }`}
        >
          Botones
        </button>
      </div>

      {activeSubCategory === "modulos" && (
        <div className="space-y-3">
          {moduleTemplates.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <div
                key={tmpl.id}
                onClick={() => handleAddTemplate(tmpl)}
                className="p-3.5 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] cursor-pointer transition-all space-y-1.5 shadow-xs"
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-[#2563EB]" />
                  <span className="font-extrabold text-[#111111]">{tmpl.title}</span>
                </div>
                <p className="text-[11px] text-[#71717A] leading-relaxed">{tmpl.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {activeSubCategory === "tarjetas" && (
        <div className="grid grid-cols-2 gap-2.5">
          {plainShapeCards.map((c) => (
            <button
              key={c.id}
              onClick={() => handleAddCard(c)}
              className="p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1 bg-[#FAF9F6] border-[#E4E4E7] hover:border-[#2563EB]"
            >
              <span className="font-bold text-[#111111] block text-xs">{c.title}</span>
              <span className="text-[10px] text-[#71717A]">Clic para insertar</span>
            </button>
          ))}
        </div>
      )}

      {activeSubCategory === "botones" && (
        <div className="grid grid-cols-2 gap-2.5">
          {allButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleAddButton(btn)}
              className={`p-2.5 font-bold text-xs text-center transition-all cursor-pointer ${btn.style}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
