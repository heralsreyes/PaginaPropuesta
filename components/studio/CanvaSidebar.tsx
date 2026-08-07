"use client";

import React, { useState } from "react";
import {
  useStudioStore,
  StudioTab,
  CanvasElement,
} from "@/store/useStudioStore";
import { useProposal } from "@/context/ProposalContext";
import {
  Palette,
  Type,
  Layers,
  Monitor,
  DollarSign,
  FileCode,
  X,
  ChevronLeft,
  Search,
  Plus,
  Copy,
  Trash2,
  Sparkles,
  MousePointerClick,
  Square,
  Circle,
  Triangle,
  Star,
  Hexagon,
  Octagon,
  Heart,
  Zap,
  ShieldCheck,
  MessageSquare,
  Diamond,
  CloudRain,
  Minus,
  ArrowRight,
  ArrowUpRight,
  ArrowLeftRight,
  CornerDownRight,
  TrendingUp,
  MoveRight,
  CheckCircle2,
  Server,
  Cpu,
  Lock,
  Award,
  Target,
  Briefcase,
  Database,
  PieChart,
  BarChart2,
  Flame,
  BadgeCheck,
  UserCheck,
  Cloud,
  SlidersHorizontal,
  GitCommitHorizontal,
  Heading1,
  Heading2,
  AlignLeft,
  Smartphone,
  Tablet,
  Users,
  Building2,
  Download,
  Upload,
  RefreshCw,
  Code2,
} from "lucide-react";
import { PRESET_THEMES } from "@/store/useThemeStore";
import { toast } from "sonner";

export const CanvaSidebar: React.FC = () => {
  const {
    isDesignMode,
    toggleDesignMode,
    activeToolTab,
    setActiveToolTab,
    isPanelOpen,
    togglePanel,
    addCanvasElement,
    canvasElements,
    clearAllCanvasElements,
  } = useStudioStore();

  const {
    proposal,
    applyPreset,
    resetTheme,
    updateBudget,
    exportJson,
    importJson,
    resetToDefault,
  } = useProposal();

  const budget = proposal?.budget;

  const [elementSearch, setElementSearch] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("todos");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Financial Form States
  const [baseSubtotal, setBaseSubtotal] = useState(budget?.amountWithoutTax || 3850);
  const [currency, setCurrency] = useState<"USD" | "DOP">(budget?.currency || "USD");
  const [hasTax, setHasTax] = useState(budget?.hasTax ?? true);
  const [taxPercent, setTaxPercent] = useState(budget?.taxPercent || 18);
  const [hasDiscount, setHasDiscount] = useState(budget?.hasDiscount ?? false);
  const [discountValue, setDiscountValue] = useState(budget?.discountValue || 0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(budget?.discountType || "percentage");

  const navItems = [
    { id: "plantillas" as StudioTab, label: "Plantillas", icon: Palette },
    { id: "texto" as StudioTab, label: "Texto", icon: Type },
    { id: "elementos" as StudioTab, label: "Elementos", icon: Layers },
    { id: "mockups" as StudioTab, label: "Mockups", icon: Monitor },
    { id: "presupuesto" as StudioTab, label: "Finanzas", icon: DollarSign },
    { id: "json" as StudioTab, label: "Exportar", icon: FileCode },
  ];

  const handleTaxToggle = () => {
    const nextTax = !hasTax;
    setHasTax(nextTax);
    updateBudget({ hasTax: nextTax });
  };

  const handleDiscountToggle = () => {
    const nextDiscount = !hasDiscount;
    setHasDiscount(nextDiscount);
    updateBudget({ hasDiscount: nextDiscount });
  };

  const handleCurrencyChange = (curr: "USD" | "DOP") => {
    setCurrency(curr);
    updateBudget({ currency: curr });
  };

  const handleSubtotalChange = (val: number) => {
    setBaseSubtotal(val);
    updateBudget({ amountWithoutTax: val });
  };

  // COMPLETE LIST OF ALL BUTTONS (12 STYLES)
  const allButtons = [
    { id: "btn-gray-01", label: "Button", style: "bg-zinc-600 hover:bg-zinc-700 text-white rounded-md shadow-xs", bg: "#52525B", text: "#FFFFFF" },
    { id: "btn-pill-grn", label: "Button", style: "bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-sm", bg: "#059669", text: "#FFFFFF" },
    { id: "btn-ora-grad", label: "Button ↗", style: "bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md shadow-sm", bg: "#F97316", text: "#FFFFFF" },
    { id: "btn-prp-glow", label: "Button", style: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md shadow-purple-500/20", bg: "#9333EA", text: "#FFFFFF" },
    { id: "btn-mag-arr", label: "Button →", style: "bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-sm", bg: "#EC4899", text: "#FFFFFF" },
    { id: "btn-wht-shd", label: "Button →", style: "bg-white text-zinc-900 border border-[#E4E4E7] rounded-lg shadow-sm", bg: "#FFFFFF", text: "#18181B" },
    { id: "btn-out-oval", label: "Button →", style: "bg-transparent text-zinc-800 border-2 border-zinc-800 rounded-full", bg: "transparent", text: "#18181B" },
    { id: "btn-light-gry", label: "Button", style: "bg-zinc-200 text-zinc-800 rounded-xl", bg: "#E4E4E7", text: "#18181B" },
    { id: "btn-black-09", label: "Button", style: "bg-[#18181B] text-white rounded-md shadow-md", bg: "#18181B", text: "#FFFFFF" },
    { id: "btn-cbl-grad", label: "Button", style: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md shadow-blue-500/20", bg: "#2563EB", text: "#FFFFFF" },
    { id: "btn-royal-pill", label: "Button", style: "bg-[#2563EB] text-white rounded-full shadow-md", bg: "#2563EB", text: "#FFFFFF" },
    { id: "btn-sky-pstl", label: "Button", style: "bg-sky-200 text-sky-900 rounded-md", bg: "#BAE6FD", text: "#0C4A6E" },
  ];

  // PLAIN NEUTRAL CARDS BY SHAPE & CORNER RADIUS (6 STYLES)
  const plainShapeCards = [
    { id: "card-plain-rnd-01", title: "Tarjeta Redondeada", style: "rounded-2xl border border-[#E4E4E7] bg-white", bg: "#FFFFFF", border: "#E4E4E7" },
    { id: "card-plain-pill-02", title: "Tarjeta Cápsula Pill", style: "rounded-3xl border border-blue-400 bg-blue-50/50", bg: "#EFF6FF", border: "#60A5FA" },
    { id: "card-plain-sqr-03", title: "Tarjeta Cuadrada Sharp", style: "rounded-none border border-zinc-900 bg-white", bg: "#FFFFFF", border: "#18181B" },
    { id: "card-plain-glass-04", title: "Tarjeta Glassmorphism", style: "rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur-md", bg: "#F4F4F5", border: "#D4D4D8" },
    { id: "card-plain-out-05", title: "Tarjeta Outline Borde", style: "rounded-2xl border-2 border-dashed border-[#2563EB] bg-transparent", bg: "transparent", border: "#2563EB" },
    { id: "card-plain-shd-06", title: "Tarjeta Sombra Elevada", style: "rounded-2xl border border-zinc-200 bg-white shadow-lg", bg: "#FFFFFF", border: "#E4E4E7" },
  ];

  // PRE-CONFIGURED READY-TO-USE MODULE TEMPLATES (4 FULL TEMPLATES)
  const moduleTemplates = [
    {
      id: "mod-template-scope",
      templateType: "scope_master",
      title: "Módulo Base Alcance (Inspector Maestro-Detalle)",
      desc: "Menú izquierdo de módulos y panel derecho de entregables técnicos.",
      icon: Cpu,
      badgeBg: "bg-blue-100 text-[#2563EB]",
    },
    {
      id: "mod-template-team",
      templateType: "team_master",
      title: "Módulo Base Equipo Especialista",
      desc: "Visor de equipo con avatar, roles y asignación de responsabilidades.",
      icon: Users,
      badgeBg: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "mod-template-company",
      templateType: "company_master",
      title: "Módulo Base Sobre ENFOCO (Empresa)",
      desc: "Visor corporativo con mockup de interfaz macOS e ISO 27002.",
      icon: Building2,
      badgeBg: "bg-[#111111] text-white",
    },
    {
      id: "mod-template-clean-multitab",
      templateType: "clean_multitab",
      title: "Tarjeta Plain Multi-Vista Limpia (Sin Pestañas Visibles)",
      desc: "Tarjeta con 3 estados de contenido conmutables mediante botones externos.",
      icon: Sparkles,
      badgeBg: "bg-amber-100 text-amber-800",
    },
  ];

  // MOCKUPS LIST (3 FULLY FUNCTIONAL INTERFACE FRAMES)
  const mockupsList = [
    {
      id: "mockup-macbook",
      mockupType: "macbook" as const,
      title: "Laptop Macbook Pro",
      desc: "Marco de pantalla retina 16\" con controles macOS y ventana viva.",
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
      title: "iPad Pro 12.9\"",
      desc: "Marco de tablet retina con vista de documento ejecutivo.",
      icon: Tablet,
    },
  ];

  // COMPLETE LIST OF ALL SHAPES (12 SHAPES)
  const allShapes = [
    { icon: Circle, label: "Círculo", color: "text-[#2563EB]", hex: "#2563EB" },
    { icon: Square, label: "Cuadrado", color: "text-[#18181B]", hex: "#18181B" },
    { icon: Triangle, label: "Triángulo", color: "text-amber-500", hex: "#F59E0B" },
    { icon: Star, label: "Estrella", color: "text-yellow-500", hex: "#EAB308" },
    { icon: Hexagon, label: "Hexágono", color: "text-indigo-500", hex: "#6366F1" },
    { icon: Octagon, label: "Octágono", color: "text-rose-500", hex: "#F43F5E" },
    { icon: Heart, label: "Corazón", color: "text-red-500", hex: "#EF4444" },
    { icon: Zap, label: "Rayo", color: "text-amber-400", hex: "#FBBF24" },
    { icon: ShieldCheck, label: "Escudo", color: "text-emerald-600", hex: "#059669" },
    { icon: MessageSquare, label: "Burbuja Chat", color: "text-sky-500", hex: "#0EA5E9" },
    { icon: Diamond, label: "Diamante", color: "text-blue-500", hex: "#3B82F6" },
    { icon: CloudRain, label: "Nube Vector", color: "text-cyan-500", hex: "#06B6D4" },
  ];

  // COMPLETE LIST OF ALL LINES & ARROWS (10 CONNECTORS)
  const allLines = [
    { label: "Línea Continua Estándar", icon: Minus },
    { label: "Flecha de Dirección Derecha", icon: ArrowRight },
    { label: "Flecha Crecimiento Diagonal", icon: ArrowUpRight },
    { label: "Flecha Doble Sentido Sincronización", icon: ArrowLeftRight },
    { label: "Conector Punteado de Flujo EDT", icon: SlidersHorizontal },
    { label: "Flecha Curva de Proceso / Clic", icon: CornerDownRight },
    { label: "Línea Divisora con Gradiente", icon: Sparkles },
    { label: "Cronograma Hito Timeline", icon: GitCommitHorizontal },
    { label: "Barra de Progreso / Avance %", icon: TrendingUp },
    { label: "Conector Estilo Canva Thin Arrow", icon: MoveRight },
  ];

  // COMPLETE LIST OF ALL GRAPHICS & ICONS (16 ICONS)
  const allGraphics = [
    { icon: CheckCircle2, label: "Verificado", color: "text-emerald-600" },
    { icon: ShieldCheck, label: "ISO 27002", color: "text-[#2563EB]" },
    { icon: Sparkles, label: "Sparkles AI", color: "text-amber-500" },
    { icon: Server, label: "Cloud Server", color: "text-purple-600" },
    { icon: Cpu, label: "Microprocesador", color: "text-[#2563EB]" },
    { icon: Lock, label: "Seguridad SSL", color: "text-emerald-600" },
    { icon: Award, label: "Premio Calidad", color: "text-amber-600" },
    { icon: Target, label: "Target Objetivos", color: "text-rose-600" },
    { icon: Briefcase, label: "Consultoría", color: "text-[#18181B]" },
    { icon: Database, label: "Base de Datos", color: "text-[#2563EB]" },
    { icon: PieChart, label: "Gráfico Tarta", color: "text-indigo-600" },
    { icon: BarChart2, label: "Gráfico Barras", color: "text-purple-600" },
    { icon: Flame, label: "High Speed", color: "text-orange-500" },
    { icon: BadgeCheck, label: "Certificación", color: "text-blue-600" },
    { icon: UserCheck, label: "Trazabilidad", color: "text-teal-600" },
    { icon: Cloud, label: "Cloud Infra", color: "text-cyan-600" },
  ];

  // Handlers for Adding Elements/Templates/Mockups to Canvas
  const handleAddButtonToCanvas = (btn: typeof allButtons[0]) => {
    const newId = addCanvasElement({
      type: "button",
      sectionId: "hero",
      title: btn.label,
      customBg: btn.bg,
      customText: btn.text,
    });
    toast.success(`Botón (${newId}) insertado en el lienzo.`);
  };

  const handleAddCardToCanvas = (c: typeof plainShapeCards[0]) => {
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

  const handleAddMockupToCanvas = (m: typeof mockupsList[0]) => {
    const newId = addCanvasElement({
      type: "mockup",
      mockupType: m.mockupType,
      sectionId: "hero",
      title: m.title,
    });
    toast.success(`Mockup '${m.title}' (${newId}) insertado en el lienzo.`);
  };

  const handleAddModuleTemplateToCanvas = (tmpl: typeof moduleTemplates[0]) => {
    if (tmpl.templateType === "clean_multitab") {
      const newId = addCanvasElement({
        type: "card",
        sectionId: "hero",
        title: "Tarjeta Plain Limpia (Sin Pestañas Visibles)",
        subtitle: "Pestaña 1 activa.",
        isMultiTab: true,
        hideTabPills: true,
        activeTabId: "tab-1",
        tabs: [
          { id: "tab-1", label: "Vista 1", title: "Vista 1 Resumen", subtitle: "Contenido de la primera vista." },
          { id: "tab-2", label: "Vista 2", title: "Vista 2 Detalles", subtitle: "Especificación técnica alternada." },
          { id: "tab-3", label: "Vista 3", title: "Vista 3 Garantía", subtitle: "Respaldo y soporte de la vista 3." },
        ],
        customBg: "#FFFFFF",
        customBorder: "#2563EB",
        customText: "#18181B",
      });
      toast.success(`Tarjeta Plain Multi-Vista Limpia (${newId}) insertada.`);
    } else {
      const newId = addCanvasElement({
        type: "module_template",
        templateType: tmpl.templateType as any,
        sectionId: "hero",
        title: tmpl.title,
      });
      toast.success(`Módulo Preconfigurado '${tmpl.title}' (${newId}) insertado.`);
    }
  };

  const handleDragStart = (e: React.DragEvent, itemData: any) => {
    e.dataTransfer.setData("application/json", JSON.stringify(itemData));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <aside className="no-print shrink-0 h-full flex shadow-2xl transition-all duration-300 font-sans z-40 select-none border-r border-zinc-800">
      {/* 1. Left Vertical Icon Rail (72px) */}
      <div className="w-[72px] bg-[#18181B] text-white flex flex-col items-center justify-between py-4 border-r border-zinc-800 shrink-0 select-none z-20">
        <div className="flex flex-col items-center space-y-5 w-full">
          {/* Logo / Studio Badge */}
          <div
            onClick={toggleDesignMode}
            className="w-11 h-11 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-black text-xs cursor-pointer hover:scale-105 transition-transform shadow-md shadow-[#2563EB]/30 mb-2"
            title="Canva Studio • Clic o Ctrl+Shift+E para salir"
          >
            <span>CS</span>
          </div>

          {/* Rail Items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeToolTab === item.id && isPanelOpen;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveToolTab(item.id);
                  setExpandedSection(null);
                }}
                className={`w-full py-3 flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer relative ${
                  isActive
                    ? "text-white bg-zinc-800/90 font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#2563EB] rounded-r" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? "text-[#2563EB]" : ""}`} />
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Exit Studio Button */}
        <button
          onClick={toggleDesignMode}
          className="p-2.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-red-600/80 transition-all cursor-pointer"
          title="Salir del Modo Studio (Ctrl+Shift+E)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Expandable / Collapsible Secondary Panel (320px or 0px) */}
      <div
        className={`bg-white border-r border-[#E4E4E7] flex flex-col justify-between shadow-xl transition-all duration-300 relative overflow-hidden z-10 ${
          isPanelOpen ? "w-80 opacity-100" : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Panel Collapse Handle */}
        <button
          onClick={togglePanel}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-6 h-12 bg-white border border-[#E4E4E7] rounded-r-xl shadow-md flex items-center justify-center text-zinc-600 hover:text-[#2563EB] cursor-pointer transition-colors"
          title={isPanelOpen ? "Ocultar panel lateral" : "Mostrar panel lateral"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Header of Secondary Panel */}
        <div className="p-4 border-b border-[#E4E4E7] bg-[#FAF9F6] flex items-center justify-between shrink-0">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#111111] font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span>
              {activeToolTab === "plantillas" && "Paletas & Estilo Visual"}
              {activeToolTab === "texto" && "Tipografía & Títulos"}
              {activeToolTab === "elementos" && "Biblioteca de Elementos"}
              {activeToolTab === "mockups" && "Interfaces & Ordenador"}
              {activeToolTab === "presupuesto" && "Controles Financieros"}
              {activeToolTab === "json" && "Exportación & JSON"}
            </span>
          </span>

          <button
            onClick={togglePanel}
            className="p-1 text-zinc-400 hover:text-zinc-700 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body Scrollable */}
        <div className="p-4 overflow-y-auto flex-1 space-y-6 text-xs min-w-[320px]">
          {/* TAB 1: PLANTILLAS */}
          {activeToolTab === "plantillas" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
                  Presets Rápidos de Estilo
                </h4>
                <button
                  onClick={resetTheme}
                  className="text-[11px] font-bold text-[#71717A] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  ↺ Defecto
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {PRESET_THEMES.map((preset) => {
                  const isSelected =
                    theme.bgMain === preset.theme.bgMain && theme.accentColor === preset.theme.accentColor;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset.theme)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-white border-[#2563EB] shadow-md ring-2 ring-[#2563EB]/20"
                          : "bg-[#FAF9F6] border-[#E4E4E7] hover:border-zinc-400"
                      }`}
                    >
                      <span className="font-extrabold text-[#111111] text-xs">{preset.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full border border-zinc-300" style={{ backgroundColor: preset.theme.bgMain }} />
                        <span className="w-4 h-4 rounded-full border border-zinc-300" style={{ backgroundColor: preset.theme.accentColor }} />
                        <span className="w-4 h-4 rounded-full border border-zinc-300" style={{ backgroundColor: preset.theme.cardBg }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: TEXTO & TIPOGRAFÍA */}
          {activeToolTab === "texto" && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-[#111111] text-xs font-mono">Tipografía & Títulos</h4>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    addCanvasElement({
                      type: "card",
                      sectionId: "hero",
                      title: "Título Principal H1",
                      subtitle: "Subtítulo descriptivo de sección.",
                      customBg: "transparent",
                      customBorder: "transparent",
                      customText: "#18181B",
                    });
                    toast.success("Bloque de Título Principal agregado.");
                  }}
                  className="w-full p-3 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl text-left font-black text-base text-[#111111] flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Heading1 className="w-5 h-5 text-[#2563EB]" />
                  <span>Añadir Título Grande</span>
                </button>

                <button
                  onClick={() => {
                    addCanvasElement({
                      type: "card",
                      sectionId: "hero",
                      title: "Subtítulo H2 Destacado",
                      subtitle: "Texto explicativo breve.",
                      customBg: "transparent",
                      customBorder: "transparent",
                      customText: "#18181B",
                    });
                    toast.success("Bloque de Subtítulo agregado.");
                  }}
                  className="w-full p-3 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl text-left font-extrabold text-sm text-[#111111] flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Heading2 className="w-4 h-4 text-indigo-600" />
                  <span>Añadir Subtítulo</span>
                </button>

                <button
                  onClick={() => {
                    addCanvasElement({
                      type: "card",
                      sectionId: "hero",
                      title: "Párrafo de Cuerpo",
                      subtitle: "Este es un párrafo de texto explicativo para detallar información técnica.",
                      customBg: "transparent",
                      customBorder: "transparent",
                      customText: "#52525B",
                    });
                    toast.success("Bloque de Párrafo agregado.");
                  }}
                  className="w-full p-3 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl text-left text-xs text-zinc-600 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <AlignLeft className="w-4 h-4 text-zinc-400" />
                  <span>Añadir Párrafo</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: BIBLIOTECA COMPLETA CON TODAS LAS SECCIONES */}
          {activeToolTab === "elementos" && (
            <div className="space-y-6">
              {/* Canva Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar elementos en Canva..."
                  value={elementSearch}
                  onChange={(e) => setElementSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl text-xs text-[#111111] font-medium focus:outline-none focus:border-[#2563EB] transition-colors"
                />
              </div>

              {/* Category Filter Pills Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px] font-bold">
                {["todos", "modulos", "botones", "cards", "formas", "lineas", "graficos"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-full capitalize whitespace-nowrap cursor-pointer transition-colors ${
                      activeCategoryFilter === cat
                        ? "bg-[#18181B] text-white"
                        : "bg-[#FAF9F6] text-zinc-600 hover:bg-zinc-200 border border-[#E4E4E7]"
                    }`}
                  >
                    {cat === "modulos" ? "Módulos Base" : cat}
                  </button>
                ))}
              </div>

              {/* SECCIÓN MÓDULOS BASE PRECONFIGURADOS */}
              {(activeCategoryFilter === "todos" || activeCategoryFilter === "modulos") && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-[#111111] text-xs font-mono flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Módulos Base Preconfigurados</span>
                    </h4>
                  </div>

                  <div className="space-y-2.5">
                    {moduleTemplates.map((tmpl) => {
                      const TmplIcon = tmpl.icon;
                      return (
                        <div
                          key={tmpl.id}
                          draggable={true}
                          onDragStart={(e) =>
                            handleDragStart(e, {
                              type: tmpl.templateType === "clean_multitab" ? "card" : "module_template",
                              templateType: tmpl.templateType,
                              sectionId: "hero",
                              title: tmpl.title,
                              isMultiTab: tmpl.templateType === "clean_multitab",
                              hideTabPills: tmpl.templateType === "clean_multitab",
                              activeTabId: "tab-1",
                              tabs: tmpl.templateType === "clean_multitab" ? [
                                { id: "tab-1", label: "Vista 1", title: "Vista 1 Resumen", subtitle: "Contenido de la primera vista." },
                                { id: "tab-2", label: "Vista 2", title: "Vista 2 Detalles", subtitle: "Especificación técnica alternada." },
                                { id: "tab-3", label: "Vista 3", title: "Vista 3 Garantía", subtitle: "Respaldo y soporte de la vista 3." },
                              ] : undefined,
                            })
                          }
                          onClick={() => handleAddModuleTemplateToCanvas(tmpl)}
                          className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl cursor-grab active:cursor-grabbing transition-all space-y-1.5 hover:scale-[1.02]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs text-[#111111] flex items-center gap-1.5">
                              <TmplIcon className="w-4 h-4 text-[#2563EB]" />
                              <span>{tmpl.title}</span>
                            </span>
                            <span className={`text-[8px] font-mono px-2 py-0.5 rounded-full font-bold ${tmpl.badgeBg}`}>
                              Plantilla
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 leading-tight">{tmpl.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECCIÓN 1: BOTONES (12 STYLES) */}
              {(activeCategoryFilter === "todos" || activeCategoryFilter === "botones") && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-[#111111] text-xs font-mono flex items-center gap-1">
                      <MousePointerClick className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>Botones ({allButtons.length})</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {allButtons.map((btn) => (
                      <div
                        key={btn.id}
                        draggable={true}
                        onDragStart={(e) =>
                          handleDragStart(e, {
                            type: "button",
                            sectionId: "hero",
                            title: btn.label,
                            customBg: btn.bg,
                            customText: btn.text,
                          })
                        }
                        onClick={() => handleAddButtonToCanvas(btn)}
                        className="p-2.5 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-xl cursor-grab active:cursor-grabbing transition-all flex flex-col items-center justify-center text-center hover:scale-105 shadow-xs"
                      >
                        <span className={`py-1 px-3 font-bold text-[10px] ${btn.style}`}>
                          {btn.label}
                        </span>
                        <span className="text-[8px] font-mono text-zinc-400 font-bold mt-1">ID: {btn.id}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECCIÓN 2: TARJETAS PLAIN (6 MODELOS) */}
              {(activeCategoryFilter === "todos" || activeCategoryFilter === "cards") && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-[#111111] text-xs font-mono flex items-center gap-1">
                      <Layers className="w-3.5 h-[#2563EB]" />
                      <span>Tarjetas Plain</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    {plainShapeCards.map((c) => (
                      <div
                        key={c.id}
                        draggable={true}
                        onDragStart={(e) =>
                          handleDragStart(e, {
                            type: "card",
                            sectionId: "hero",
                            title: c.title,
                            subtitle: "Haga doble clic para editar este texto in-situ.",
                            customBg: c.bg,
                            customBorder: c.border,
                            customText: "#18181B",
                          })
                        }
                        onClick={() => handleAddCardToCanvas(c)}
                        className={`p-2.5 cursor-grab active:cursor-grabbing hover:border-[#2563EB] hover:scale-105 transition-all text-xs font-bold text-zinc-800 ${c.style}`}
                      >
                        <span>{c.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECCIÓN 3: FORMAS VECTORIALES (12 SHAPES) */}
              {(activeCategoryFilter === "todos" || activeCategoryFilter === "formas") && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-[#111111] text-xs font-mono">Formas ({allShapes.length})</h4>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    {allShapes.map((item, idx) => {
                      const ShapeIcon = item.icon;
                      return (
                        <div
                          key={idx}
                          draggable={true}
                          onDragStart={(e) =>
                            handleDragStart(e, {
                              type: "shape",
                              sectionId: "hero",
                              title: item.label,
                              customAccent: item.hex,
                            })
                          }
                          onClick={() => {
                            addCanvasElement({
                              type: "shape",
                              sectionId: "hero",
                              title: item.label,
                              customAccent: item.hex,
                            });
                            toast.success(`Forma '${item.label}' añadida.`);
                          }}
                          className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-all hover:scale-105"
                        >
                          <ShapeIcon className={`w-6 h-6 ${item.color}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECCIÓN 4: LÍNEAS Y FLECHAS (10 CONNECTORS) */}
              {(activeCategoryFilter === "todos" || activeCategoryFilter === "lineas") && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-[#111111] text-xs font-mono">Líneas y flechas ({allLines.length})</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {allLines.map((line, idx) => {
                      const LineIcon = line.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => toast.info(`Línea '${line.label}' agregada.`)}
                          className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          <LineIcon className="w-5 h-5 text-[#2563EB]" />
                          <span className="text-[10px] font-bold text-zinc-700 truncate">{line.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECCIÓN 5: GRÁFICOS E ÍCONOS (16 ICONS) */}
              {(activeCategoryFilter === "todos" || activeCategoryFilter === "graficos") && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-[#111111] text-xs font-mono">Gráficos e Íconos ({allGraphics.length})</h4>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center">
                    {allGraphics.map((g, idx) => {
                      const GIcon = g.icon;
                      return (
                        <div
                          key={idx}
                          onClick={() => toast.info(`Ícono '${g.label}' añadido.`)}
                          className="p-2.5 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
                        >
                          <GIcon className={`w-5 h-5 ${g.color}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MOCKUPS (AHORA 100% FUNCIONALES Y ARRASTRABLES AL LIENZO) */}
          {activeToolTab === "mockups" && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-[#111111] text-xs font-mono">Interfaces & Ordenador</h4>

              <div className="grid grid-cols-1 gap-2.5">
                {mockupsList.map((m) => {
                  const MIcon = m.icon;
                  return (
                    <div
                      key={m.id}
                      draggable={true}
                      onDragStart={(e) =>
                        handleDragStart(e, {
                          type: "mockup",
                          mockupType: m.mockupType,
                          sectionId: "hero",
                          title: m.title,
                        })
                      }
                      onClick={() => handleAddMockupToCanvas(m)}
                      className="p-3.5 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] shadow-xs"
                    >
                      <MIcon className="w-6 h-6 text-[#2563EB]" />
                      <div>
                        <span className="font-bold text-xs block text-[#111111]">{m.title}</span>
                        <span className="text-[10px] text-zinc-500">{m.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: PRESUPUESTO & FINANZAS */}
          {activeToolTab === "presupuesto" && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-[#111111] text-xs font-mono">Controles Financieros</h4>

              {/* Subtotal Base */}
              <div className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">Subtotal Base ({currency})</label>
                <input
                  type="number"
                  value={baseSubtotal}
                  onChange={(e) => handleSubtotalChange(Number(e.target.value))}
                  className="w-full bg-white border border-[#E4E4E7] rounded-xl p-2 font-mono text-sm font-bold text-[#111111] focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              {/* Moneda */}
              <div className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">Moneda de Cotización</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCurrencyChange("USD")}
                    className={`py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      currency === "USD"
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "bg-white text-zinc-700 border border-[#E4E4E7]"
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => handleCurrencyChange("DOP")}
                    className={`py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                      currency === "DOP"
                        ? "bg-[#2563EB] text-white shadow-xs"
                        : "bg-white text-zinc-700 border border-[#E4E4E7]"
                    }`}
                  >
                    DOP (RD$)
                  </button>
                </div>
              </div>

              {/* Impuesto ITBIS Toggle */}
              <div className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-[#111111]">Aplicar Impuesto ITBIS (18%)</span>
                  <input
                    type="checkbox"
                    checked={hasTax}
                    onChange={handleTaxToggle}
                    className="w-4 h-4 rounded text-[#2563EB] cursor-pointer"
                  />
                </div>
                {hasTax && (
                  <div className="flex items-center gap-2 pt-1 border-t border-zinc-200">
                    <span className="text-[10px] text-zinc-500 font-bold">Porcentaje ITBIS %:</span>
                    <input
                      type="number"
                      value={taxPercent}
                      onChange={(e) => setTaxPercent(Number(e.target.value))}
                      className="w-16 bg-white border border-[#E4E4E7] rounded px-2 py-1 font-mono text-xs font-bold text-[#111111]"
                    />
                  </div>
                )}
              </div>

              {/* Descuento Toggle */}
              <div className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-[#111111]">Aplicar Descuento Especial</span>
                  <input
                    type="checkbox"
                    checked={hasDiscount}
                    onChange={handleDiscountToggle}
                    className="w-4 h-4 rounded text-[#2563EB] cursor-pointer"
                  />
                </div>
                {hasDiscount && (
                  <div className="space-y-2 pt-1 border-t border-zinc-200">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 font-bold">Valor Descuento:</span>
                      <input
                        type="number"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(Number(e.target.value))}
                        className="w-20 bg-white border border-[#E4E4E7] rounded px-2 py-1 font-mono text-xs font-bold text-[#111111]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setDiscountType("percentage")}
                        className={`py-1 rounded text-[10px] font-bold cursor-pointer ${
                          discountType === "percentage"
                            ? "bg-[#2563EB] text-white"
                            : "bg-white text-zinc-700 border border-[#E4E4E7]"
                        }`}
                      >
                        Porcentaje (%)
                      </button>
                      <button
                        onClick={() => setDiscountType("fixed")}
                        className={`py-1 rounded text-[10px] font-bold cursor-pointer ${
                          discountType === "fixed"
                            ? "bg-[#2563EB] text-white"
                            : "bg-white text-zinc-700 border border-[#E4E4E7]"
                        }`}
                      >
                        Monto Fijo ({currency === "USD" ? "$" : "RD$"})
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: EXPORTAR & JSON */}
          {activeToolTab === "json" && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-[#111111] text-xs font-mono">Gestión de Respaldo & JSON</h4>

              <div className="space-y-2">
                <button
                  onClick={exportJson}
                  className="w-full p-3 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl flex items-center justify-between text-xs font-bold text-[#111111] cursor-pointer transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#2563EB]" />
                    <span>Descargar JSON de Propuesta</span>
                  </span>
                  <Code2 className="w-4 h-4 text-zinc-400" />
                </button>

                <label className="w-full p-3 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] rounded-2xl flex items-center justify-between text-xs font-bold text-[#111111] cursor-pointer transition-all">
                  <span className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Cargar Respaldo JSON</span>
                  </span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            importJson(event.target.result as string);
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={resetToDefault}
                  className="w-full p-3 bg-red-50 border border-red-200 hover:bg-red-100 rounded-2xl flex items-center justify-between text-xs font-bold text-red-700 cursor-pointer transition-all"
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-red-600" />
                    <span>Restablecer Propuesta Inicial</span>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
