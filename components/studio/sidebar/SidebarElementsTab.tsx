"use client";

import React, { useState, useRef } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { CanvasElement } from "@/types/studio";
import {
  Sparkles,
  Layers,
  Cpu,
  Users,
  Building2,
  MessageSquare,
  BarChart2,
  TrendingUp,
  Award,
  Globe,
  Upload,
  Image as ImageIcon,
  Plus,
  Table,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Smartphone,
  CreditCard,
  Sliders,
  DollarSign,
  GripHorizontal,
} from "lucide-react";
import { toast } from "sonner";

export const SidebarElementsTab: React.FC = () => {
  const { addCanvasElement } = useStudioStore();
  const [activeSubCategory, setActiveSubCategory] = useState<
    "modulos" | "tarjetas" | "botones" | "componentes" | "imagenes"
  >("modulos");
  const [uploadedImages, setUploadedImages] = useState<{ id: string; name: string; url: string }[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = (
    e: React.DragEvent,
    elementData: Parameters<typeof addCanvasElement>[0]
  ) => {
    e.dataTransfer.setData("application/json", JSON.stringify(elementData));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`'${file.name}' no es un archivo de imagen válido.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          const imgObj = {
            id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            name: file.name,
            url: dataUrl,
          };
          setUploadedImages((prev) => [imgObj, ...prev]);

          const newId = addCanvasElement({
            type: "image",
            imageUrl: dataUrl,
            sectionId: "hero",
            title: file.name,
            width: 320,
            height: 200,
          });
          toast.success(`Imagen '${file.name}' insertada.`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const allButtons = [
    {
      id: "btn-enfoco-gold",
      label: "Explorar las 7 Épicas ➔",
      type: "button",
      width: 200,
      height: 48,
      style: "bg-[#F08D17] hover:bg-[#D97706] text-white rounded-2xl shadow-md font-extrabold",
      bg: "#F08D17",
      text: "#FFFFFF",
    },
    {
      id: "btn-app-emerald",
      label: "Simulador App Móvil",
      type: "button",
      width: 190,
      height: 48,
      style: "bg-[#004F54] hover:bg-[#003B3F] text-white border border-[#F08D17]/40 rounded-2xl shadow-md font-bold",
      bg: "#004F54",
      text: "#FFFFFF",
      border: "#F08D17",
    },
    {
      id: "btn-prod-badge",
      label: "● PRODUCCIÓN",
      type: "button",
      width: 130,
      height: 32,
      style: "bg-[#7C9B8C]/25 text-[#135A34] border border-[#7C9B8C]/40 rounded-full font-mono font-bold text-[11px]",
      bg: "rgba(124, 155, 140, 0.25)",
      text: "#135A34",
      border: "#7C9B8C",
    },
    {
      id: "btn-royal-pill",
      label: "Aceptar Propuesta",
      type: "button",
      width: 160,
      height: 42,
      style: "bg-[#2563EB] text-white rounded-full shadow-md font-bold",
      bg: "#2563EB",
      text: "#FFFFFF",
    },
    {
      id: "btn-ora-grad",
      label: "Ver Entregables ↗",
      type: "button",
      width: 160,
      height: 40,
      style: "bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl shadow-sm font-bold",
      bg: "#F97316",
      text: "#FFFFFF",
    },
    {
      id: "btn-outline-cyan",
      label: "Documento PDF",
      type: "button",
      width: 150,
      height: 40,
      style: "bg-transparent border-2 border-[#0284C7] text-[#0284C7] rounded-xl font-bold",
      bg: "transparent",
      text: "#0284C7",
      border: "#0284C7",
    },
  ];

  const plainShapeCards = [
    {
      id: "card-mint-sage",
      title: "Tarjeta Verde Menta (Sage)",
      type: "card",
      width: 320,
      height: 180,
      bg: "#BFDAD1",
      border: "#A6C5BB",
      text: "#135A34",
      desc: "Estilo idéntico a sección 10 y 11 de ENFOCO.",
    },
    {
      id: "card-emerald-dark",
      title: "Tarjeta Esmeralda Luxury",
      type: "card",
      width: 320,
      height: 180,
      bg: "#002224",
      border: "#F08D17",
      text: "#FFFFFF",
      desc: "Estilo con acento dorado corporativo.",
    },
    {
      id: "card-plain-rnd-01",
      title: "Tarjeta Blanca Redondeada",
      type: "card",
      width: 300,
      height: 160,
      bg: "#FFFFFF",
      border: "#E4E4E7",
      text: "#111111",
      desc: "Tarjeta multipropósito limpia.",
    },
    {
      id: "card-iso-cert",
      title: "Cápsula Certificación ISO",
      type: "card",
      width: 220,
      height: 90,
      bg: "#AFCFC5",
      border: "#97BDB1",
      text: "#135A34",
      desc: "Píldora para badges y estándares.",
    },
    {
      id: "card-plain-pill-02",
      title: "Tarjeta Cápsula Pill",
      type: "card",
      width: 280,
      height: 140,
      bg: "#EFF6FF",
      border: "#60A5FA",
      text: "#1E40AF",
      desc: "Tarjeta de bordes ultra suaves.",
    },
    {
      id: "card-plain-out-05",
      title: "Tarjeta Outline Borde",
      type: "card",
      width: 300,
      height: 160,
      bg: "transparent",
      border: "#2563EB",
      text: "#111111",
      desc: "Tarjeta con borde acentuado sin fondo.",
    },
  ];

  const moduleTemplates = [
    {
      id: "mod-template-scope",
      templateType: "scope_master",
      title: "Módulo Base Alcance (Inspector Maestro-Detalle)",
      desc: "Menú izquierdo de módulos y panel derecho de entregables técnicos.",
      icon: Cpu,
      width: 540,
      height: 320,
    },
    {
      id: "mod-template-team",
      templateType: "team_master",
      title: "Módulo Base Equipo Especialista",
      desc: "Visor de equipo con avatar, roles y asignación de responsabilidades.",
      icon: Users,
      width: 480,
      height: 300,
    },
    {
      id: "mod-template-company",
      templateType: "company_master",
      title: "Módulo Base Sobre ENFOCO (Empresa)",
      desc: "Visor corporativo con mockup de interfaz macOS e ISO 27002.",
      icon: Building2,
      width: 480,
      height: 300,
    },
    {
      id: "mod-template-whatsapp-sim",
      templateType: "whatsapp_sim",
      title: "Simulador Chat WhatsApp Oficial (Interactive Bot)",
      desc: "Burbujas de chat con respuestas automáticas y estado en línea.",
      icon: MessageSquare,
      width: 340,
      height: 380,
    },
    {
      id: "mod-template-kpi-card",
      templateType: "kpi_card",
      title: "Métrica KPI Pro (Indicador con Tendencia)",
      desc: "Tarjeta de estadísticas con número gigante e indicador.",
      icon: BarChart2,
      width: 300,
      height: 180,
    },
    {
      id: "mod-template-investment-calc",
      templateType: "investment_calc",
      title: "Calculadora de Rendimiento & Mutuos",
      desc: "Simulador interactivo financiero con sliders y cálculo de intereses.",
      icon: DollarSign,
      width: 400,
      height: 260,
    },
    {
      id: "mod-template-pricing-block",
      templateType: "pricing_block",
      title: "Bloque de Propuesta Económica & Fases",
      desc: "Desglose de inversión sincronizado con términos de pago.",
      icon: CreditCard,
      width: 480,
      height: 240,
    },
    {
      id: "mod-template-feature-grid",
      templateType: "feature_grid",
      title: "Grid de 7 Épicas SIMV",
      desc: "Matriz interactiva de funcionalidades por fases del proyecto.",
      icon: Layers,
      width: 520,
      height: 280,
    },
  ];

  const uiComponents = [
    {
      id: "ui-scroll-indicator",
      title: "Indicador Scroll Vertical (Dots)",
      type: "shape",
      width: 44,
      height: 260,
      bg: "rgba(0,0,0,0.6)",
      border: "rgba(255,255,255,0.2)",
      text: "#FFFFFF",
      desc: "Barra de navegación vertical con bolitas de sección.",
    },
    {
      id: "ui-divider-line",
      title: "Línea Divisoria de Conexión",
      type: "line",
      width: 360,
      height: 24,
      bg: "#F08D17",
      desc: "Línea separadora con acento dorado.",
    },
    {
      id: "ui-sprint-progress",
      title: "Barra de Progreso de Sprint",
      type: "shape",
      width: 340,
      height: 80,
      bg: "#002224",
      border: "#059669",
      text: "#FFFFFF",
      desc: "Indicador de avance de entregables y roadmap.",
    },
  ];

  const brandLogos = [
    { name: "ENFOCO Logo", url: "/logo_enfoco.png" },
    { name: "Excel Puesto de Bolsa", url: "/logo_excel.png" },
    { name: "Distribuidora Corripio", url: "/logos/corripio.png" },
    { name: "Humano Seguros", url: "/logos/humano.png" },
  ];

  return (
    <div className="space-y-4 text-xs p-4">
      {/* Subtabs Navigation */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-[#F4F4F5] rounded-xl border border-[#E4E4E7] text-[10px]">
        {(["modulos", "tarjetas", "botones", "componentes", "imagenes"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubCategory(tab)}
            className={`py-1.5 rounded-lg font-bold text-center capitalize transition-all cursor-pointer truncate ${
              activeSubCategory === tab ? "bg-white text-[#2563EB] shadow-xs" : "text-[#71717A] hover:text-zinc-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-zinc-500 italic">
        💡 Arrastra cualquier elemento directamente al lienzo o haz clic para insertarlo.
      </p>

      {/* MÓDULOS */}
      {activeSubCategory === "modulos" && (
        <div className="space-y-3">
          {moduleTemplates.map((tmpl) => {
            const Icon = tmpl.icon;
            const elementData: Parameters<typeof addCanvasElement>[0] = {
              type: "module_template",
              templateType: tmpl.templateType as CanvasElement["templateType"],
              title: tmpl.title,
              width: tmpl.width,
              height: tmpl.height,
              sectionId: "hero",
            };

            return (
              <div
                key={tmpl.id}
                draggable
                onDragStart={(e) => handleDragStart(e, elementData)}
                onClick={() => addCanvasElement(elementData)}
                className="p-3.5 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all space-y-1.5 shadow-xs group"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-[#111111]">{tmpl.title}</span>
                </div>
                <p className="text-[11px] text-[#71717A] leading-relaxed">{tmpl.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* TARJETAS */}
      {activeSubCategory === "tarjetas" && (
        <div className="space-y-2.5">
          {plainShapeCards.map((c) => {
            const elementData: Parameters<typeof addCanvasElement>[0] = {
              type: "card",
              title: c.title,
              subtitle: "Haga doble clic para editar este texto in-situ.",
              customBg: c.bg,
              customBorder: c.border,
              customText: c.text,
              width: c.width,
              height: c.height,
              sectionId: "hero",
            };

            return (
              <div
                key={c.id}
                draggable
                onDragStart={(e) => handleDragStart(e, elementData)}
                onClick={() => addCanvasElement(elementData)}
                className="p-3.5 rounded-2xl border text-left transition-all cursor-grab active:cursor-grabbing space-y-1.5 bg-[#FAF9F6] border-[#E4E4E7] hover:bg-white hover:border-[#2563EB] shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-[#111111] text-xs">{c.title}</span>
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: c.bg }}
                  />
                </div>
                <p className="text-[10px] text-[#71717A] leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* BOTONES */}
      {activeSubCategory === "botones" && (
        <div className="grid grid-cols-1 gap-2.5">
          {allButtons.map((btn) => {
            const elementData: Parameters<typeof addCanvasElement>[0] = {
              type: "button",
              title: btn.label,
              customBg: btn.bg,
              customText: btn.text,
              customBorder: "border" in btn ? (btn.border as string) : undefined,
              width: btn.width,
              height: btn.height,
              sectionId: "hero",
            };

            return (
              <div
                key={btn.id}
                draggable
                onDragStart={(e) => handleDragStart(e, elementData)}
                onClick={() => addCanvasElement(elementData)}
                className="p-2.5 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] flex items-center justify-between cursor-grab active:cursor-grabbing transition-all shadow-xs"
              >
                <span className="font-bold text-[#111111] text-xs">{btn.label}</span>
                <span className={`px-3 py-1.5 text-xs text-center inline-block ${btn.style}`}>
                  Vista Previa
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* COMPONENTES UI */}
      {activeSubCategory === "componentes" && (
        <div className="space-y-2.5">
          {uiComponents.map((comp) => {
            const elementData: Parameters<typeof addCanvasElement>[0] = {
              type: comp.type as CanvasElement["type"],
              title: comp.title,
              customBg: comp.bg,
              customBorder: comp.border,
              customText: comp.text,
              width: comp.width,
              height: comp.height,
              sectionId: "hero",
            };

            return (
              <div
                key={comp.id}
                draggable
                onDragStart={(e) => handleDragStart(e, elementData)}
                onClick={() => addCanvasElement(elementData)}
                className="p-3.5 rounded-2xl border border-[#E4E4E7] bg-[#FAF9F6] hover:bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing transition-all space-y-1 shadow-xs"
              >
                <span className="font-extrabold text-[#111111] text-xs block">{comp.title}</span>
                <p className="text-[10px] text-[#71717A] leading-relaxed">{comp.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* IMÁGENES */}
      {activeSubCategory === "imagenes" && (
        <div className="space-y-4">
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            multiple
            className="hidden"
          />

          <div
            onClick={() => imageInputRef.current?.click()}
            className="p-5 border-2 border-dashed border-[#2563EB]/40 bg-[#EFF6FF]/60 hover:bg-[#EFF6FF] hover:border-[#2563EB] rounded-2xl cursor-pointer text-center space-y-2 transition-all group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-[#111111] block text-xs">
                Haz clic para subir imágenes
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                PNG, JPG, WebP, SVG o Logos
              </span>
            </div>
          </div>

          {/* Uploaded Local Images */}
          {uploadedImages.length > 0 && (
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                Tus Imágenes ({uploadedImages.length})
              </span>
              <div className="grid grid-cols-2 gap-2">
                {uploadedImages.map((img) => {
                  const elementData: Parameters<typeof addCanvasElement>[0] = {
                    type: "image",
                    imageUrl: img.url,
                    title: img.name,
                    width: 320,
                    height: 200,
                    sectionId: "hero",
                  };
                  return (
                    <div
                      key={img.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, elementData)}
                      onClick={() => addCanvasElement(elementData)}
                      className="p-2 border border-[#E4E4E7] rounded-xl bg-white hover:border-[#2563EB] cursor-grab active:cursor-grabbing space-y-1 group relative transition-all shadow-2xs"
                    >
                      <div className="w-full h-16 bg-zinc-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={img.url} alt={img.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-bold text-[#111111] text-[10px] truncate block">
                        {img.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
