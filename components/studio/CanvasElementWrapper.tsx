"use client";

import React, { useState, useRef, useEffect } from "react";
import { useStudioStore, CanvasElement, PlainCardTab } from "@/store/useStudioStore";
import {
  Move,
  Sparkles,
  Layers,
  Cpu,
  Shield,
  CheckCircle2,
  Users,
  Monitor,
  Check,
  ChevronRight,
  Database,
  BarChart3,
  FileText,
  Building2,
  Award,
  EyeOff,
  Smartphone,
  Tablet,
  Globe,
  Lock,
  Wifi,
  Battery,
  Target,
  BarChart2,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CanvasElementWrapperProps {
  element: CanvasElement;
  onExecuteAction?: (config: any) => void;
}

export const CanvasElementWrapper: React.FC<CanvasElementWrapperProps> = ({
  element,
  onExecuteAction,
}) => {
  const {
    isDesignMode,
    selectedCanvasElementId,
    setSelectedCanvasElementId,
    updateCanvasElement,
    setActiveTabForCard,
    updateCardTabContent,
    canvasMode,
  } = useStudioStore();

  const isSelected = isDesignMode && selectedCanvasElementId === element.id;

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: element.x, y: element.y });
  const [initialSize, setInitialSize] = useState({ width: element.width, height: element.height });

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Active Tab for Multi-Tab Card
  const activeTabId = element.activeTabId || element.tabs?.[0]?.id || "tab-1";
  const activeTab = element.tabs?.find((t) => t.id === activeTabId) || element.tabs?.[0];

  // Mouse Handlers for Dragging and Resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDesignMode) return;
    e.stopPropagation();
    setSelectedCanvasElementId(element.id);

    // In 'select' mode, ONLY select the element. Do NOT start dragging cards around.
    if (canvasMode === "select") return;

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos({ x: element.x, y: element.y });
  };

  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    if (!isDesignMode) return;
    e.stopPropagation();
    setSelectedCanvasElementId(element.id);
    setIsResizing(handle);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos({ x: element.x, y: element.y });
    setInitialSize({ width: element.width, height: element.height });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        updateCanvasElement(element.id, {
          x: Math.max(0, initialPos.x + dx),
          y: Math.max(0, initialPos.y + dy),
        });
      } else if (isResizing) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        let newWidth = initialSize.width;
        let newHeight = initialSize.height;
        let newX = initialPos.x;
        let newY = initialPos.y;

        if (isResizing.includes("e")) newWidth = Math.max(80, initialSize.width + dx);
        if (isResizing.includes("s")) newHeight = Math.max(40, initialSize.height + dy);
        if (isResizing.includes("w")) {
          const possibleW = initialSize.width - dx;
          if (possibleW > 80) {
            newWidth = possibleW;
            newX = initialPos.x + dx;
          }
        }
        if (isResizing.includes("n")) {
          const possibleH = initialSize.height - dy;
          if (possibleH > 40) {
            newHeight = possibleH;
            newY = initialPos.y + dy;
          }
        }

        updateCanvasElement(element.id, {
          width: newWidth,
          height: newHeight,
          x: newX,
          y: newY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, initialPos, initialSize, element.id, updateCanvasElement]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDesignMode) {
      setSelectedCanvasElementId(element.id);
    }
    if (element.actionConfig && onExecuteAction) {
      onExecuteAction(element.actionConfig);
    }
  };

  const getFontFamilyCSS = (fontName?: string) => {
    if (!fontName) return undefined;
    switch (fontName) {
      case "Outfit":
        return "var(--font-outfit), 'Outfit', sans-serif";
      case "Roboto":
        return "var(--font-roboto), 'Roboto', sans-serif";
      case "Fira Code":
        return "var(--font-fira-code), 'Fira Code', monospace";
      case "Playfair Display":
        return "var(--font-playfair), 'Playfair Display', serif";
      case "Inter":
      default:
        return "var(--font-inter), 'Inter', sans-serif";
    }
  };

  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    zIndex: isSelected ? 999 : element.zIndex || 10,
    display: element.isHidden && !isDesignMode ? "none" : "block",
    opacity: element.isHidden ? 0.35 : 1,
    fontFamily: getFontFamilyCSS(element.fontFamily),
  };

  // Hide placeholder draft text elements from executive client view
  if (!isDesignMode && (element.isHidden || (element.title && element.title.toLowerCase().includes("recuadro")))) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      style={wrapperStyle}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={`group transition-all box-border select-none ${
        isDesignMode ? (canvasMode === "draw" ? "cursor-move" : "cursor-pointer") : "cursor-pointer"
      } ${
        element.isHidden ? "border-2 border-dashed border-red-500 rounded-2xl" : ""
      } ${
        isSelected
          ? "ring-2 ring-[#2563EB] ring-offset-2 ring-offset-zinc-900 shadow-xl"
          : isDesignMode
          ? "hover:ring-1 hover:ring-[#2563EB]/50"
          : ""
      }`}
    >
      {/* Header ID Badge (Studio Mode) */}
      {isDesignMode && isSelected && (
        <div className="absolute -top-6 left-0 bg-[#2563EB] text-white px-2 py-0.5 rounded-t text-[9px] font-mono font-bold flex items-center gap-1 shadow-md pointer-events-none z-50">
          <Move className="w-2.5 h-2.5" />
          <span>ID: {element.id}</span>
          {element.isHidden && <EyeOff className="w-2.5 h-2.5 text-amber-300 ml-1" />}
        </div>
      )}

      {/* Resize Handles (Studio Mode) */}
      {isDesignMode && isSelected && (
        <>
          {["nw", "ne", "se", "sw", "n", "s", "e", "w"].map((handle) => (
            <div
              key={handle}
              onMouseDown={(e) => handleResizeStart(e, handle)}
              className={`absolute w-3 h-3 bg-white border-2 border-[#2563EB] rounded-full shadow-md z-50 ${
                handle === "nw"
                  ? "-top-1.5 -left-1.5 cursor-nwse-resize"
                  : handle === "ne"
                  ? "-top-1.5 -right-1.5 cursor-nesw-resize"
                  : handle === "se"
                  ? "-bottom-1.5 -right-1.5 cursor-nwse-resize"
                  : handle === "sw"
                  ? "-bottom-1.5 -left-1.5 cursor-nesw-resize"
                  : handle === "n"
                  ? "-top-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize"
                  : handle === "s"
                  ? "-bottom-1.5 left-1/2 -translate-x-1/2 cursor-ns-resize"
                  : handle === "e"
                  ? "top-1/2 -right-1.5 -translate-y-1/2 cursor-ew-resize"
                  : "top-1/2 -left-1.5 -translate-y-1/2 cursor-ew-resize"
              }`}
            />
          ))}
        </>
      )}

      {/* CONTENT RENDERER */}
      <div className="w-full h-full p-1 flex flex-col justify-center items-center text-center overflow-hidden">
        {/* 1. BUTTON TYPE */}
        {element.type === "button" && (
          <button
            type="button"
            className="w-full h-full py-1 px-3 font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 border"
            style={{
              backgroundColor: element.customBg || "#2563EB",
              color: element.customText || "#FFFFFF",
              borderColor: element.customBorder || "transparent",
              fontFamily: getFontFamilyCSS(element.fontFamily),
              fontSize: element.fontSize ? `${element.fontSize}px` : undefined,
            }}
          >
            <span
              contentEditable={isDesignMode}
              suppressContentEditableWarning
              onBlur={(e) =>
                updateCanvasElement(element.id, {
                  title: e.currentTarget.innerText,
                })
              }
              className="outline-none"
              style={{
                fontFamily: getFontFamilyCSS(element.fontFamily),
                fontSize: element.fontSize ? `${element.fontSize}px` : undefined,
              }}
            >
              {element.title || "Button"}
            </span>
          </button>
        )}

        {/* 2. CARD OR TEXT TYPE */}
        {(element.type === "card" || element.type === "text") && (
          <div
            className={`w-full h-full p-2 flex flex-col justify-start text-left transition-colors ${
              element.type === "text" || (element.customBg === "transparent" && element.customBorder === "transparent")
                ? "bg-transparent border-none shadow-none"
                : "p-3.5 rounded-2xl border shadow-sm"
            }`}
            style={{
              backgroundColor: element.customBg && element.customBg !== "transparent" ? element.customBg : "transparent",
              borderColor: element.customBorder && element.customBorder !== "transparent" ? element.customBorder : "transparent",
              color: element.customText || "#18181B",
              fontFamily: getFontFamilyCSS(element.fontFamily),
              fontSize: element.fontSize ? `${element.fontSize}px` : undefined,
            }}
          >
            {element.isMultiTab && !element.hideTabPills && (
              <div className="flex items-center gap-1 overflow-x-auto pb-1.5 border-b border-zinc-200/60 mb-2 no-scrollbar">
                {element.tabs?.map((t) => {
                  const isActive = t.id === activeTabId;
                  return (
                    <button
                      key={t.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTabForCard(element.id, t.id);
                      }}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-[#2563EB] text-white shadow-xs"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            )}

            {element.isMultiTab && activeTab ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-zinc-200/40 pb-1 mb-1.5">
                    <span
                      contentEditable={isDesignMode}
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        updateCardTabContent(element.id, activeTab.id, {
                          title: e.currentTarget.innerText,
                        })
                      }
                      className="font-extrabold outline-none text-zinc-900"
                      style={{
                        fontFamily: getFontFamilyCSS(element.fontFamily),
                        fontSize: element.fontSize ? `${element.fontSize}px` : undefined,
                      }}
                    >
                      {activeTab.title}
                    </span>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 font-bold text-zinc-600">
                      ID: {element.id} • {activeTab.id}
                    </span>
                  </div>

                  <p
                    contentEditable={isDesignMode}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateCardTabContent(element.id, activeTab.id, {
                        subtitle: e.currentTarget.innerText,
                      })
                    }
                    className="text-zinc-600 outline-none leading-relaxed"
                    style={{
                      fontFamily: getFontFamilyCSS(element.fontFamily),
                      fontSize: element.fontSize ? `${Math.max(10, element.fontSize - 3)}px` : undefined,
                    }}
                  >
                    {activeTab.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="w-full h-full flex flex-col justify-start">
                <div
                  contentEditable={isDesignMode}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateCanvasElement(element.id, {
                      title: e.currentTarget.innerText,
                    })
                  }
                  className={`outline-none leading-tight font-extrabold ${
                    element.textType === "h1"
                      ? "text-3xl font-black"
                      : element.textType === "h2"
                      ? "text-xl font-extrabold"
                      : element.textType === "quote"
                      ? "text-base font-serif italic border-l-4 border-[#2563EB] pl-3 py-1 bg-blue-50/80 rounded-r-xl"
                      : element.textType === "bullet"
                      ? "whitespace-pre-line text-sm leading-relaxed"
                      : ""
                  }`}
                  style={{
                    fontFamily: getFontFamilyCSS(element.fontFamily),
                    fontSize: element.fontSize ? `${element.fontSize}px` : undefined,
                    color: element.customText || undefined,
                  }}
                >
                  {element.title || (element.type === "text" ? "Texto" : "Tarjeta Plain")}
                </div>

                {element.subtitle && element.type !== "text" && (
                  <p
                    contentEditable={isDesignMode}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateCanvasElement(element.id, {
                        subtitle: e.currentTarget.innerText,
                      })
                    }
                    className="opacity-80 outline-none leading-tight mt-1"
                    style={{
                      fontFamily: getFontFamilyCSS(element.fontFamily),
                      fontSize: element.fontSize ? `${Math.max(10, element.fontSize - 3)}px` : undefined,
                    }}
                  >
                    {element.subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* 3. PRE-CONFIGURED MODULE TEMPLATES */}
        {element.type === "module_template" && (
          <div className="w-full h-full p-4 rounded-3xl border bg-white border-zinc-200 shadow-md text-left flex flex-col justify-between">
            {element.templateType === "scope_master" && (
              <div className="w-full h-full flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <span className="text-xs font-extrabold text-zinc-900 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-[#2563EB]" />
                    <span>Módulo Base Alcance (Inspector Maestro-Detalle)</span>
                  </span>
                  <span className="text-[9px] font-mono bg-blue-100 text-[#2563EB] px-2 py-0.5 rounded font-bold">
                    {element.id}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-3 flex-1">
                  <div className="col-span-4 bg-zinc-50 p-2 rounded-xl border border-zinc-200 space-y-1">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase">Módulos</span>
                    <div className="p-1.5 bg-[#2563EB] text-white rounded-lg text-[10px] font-bold">1. Requerimientos Core</div>
                    <div className="p-1.5 bg-white text-zinc-700 rounded-lg text-[10px] font-semibold border border-zinc-200">2. Integración SQL</div>
                  </div>

                  <div className="col-span-8 bg-[#FAF9F6] p-3 rounded-xl border border-zinc-200 flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-xs text-zinc-900">Requerimientos Técnicos Core</h4>
                      <p className="text-[10px] text-zinc-500 mt-1">Especificación técnica con entregables verificables.</p>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] text-emerald-600 font-bold bg-emerald-50 p-1.5 rounded-lg border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>2 Entregables Verificados</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {element.templateType === "team_master" && (
              <div className="w-full h-full flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <span className="text-xs font-extrabold text-zinc-900 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>Módulo Base Equipo Especialista</span>
                  </span>
                  <span className="text-[9px] font-mono bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">
                    {element.id}
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white font-black flex items-center justify-center text-xs">
                    RM
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-zinc-900 block">Rosa Elba Martínez</span>
                    <span className="text-[10px] text-zinc-500 block">Líder de Arquitectura Cloud & TI</span>
                  </div>
                </div>
              </div>
            )}

            {element.templateType === "company_master" && (
              <div className="w-full h-full flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <span className="text-xs font-extrabold text-zinc-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#2563EB]" />
                    <span>Módulo Base Sobre ENFOCO (Empresa)</span>
                  </span>
                  <span className="text-[9px] font-mono bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded font-bold">
                    {element.id}
                  </span>
                </div>

                <div className="p-3 bg-[#111111] text-white rounded-2xl border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-xs block text-white">ENFOCO OS v2.0</span>
                    <span className="text-[10px] text-zinc-400 block">Arquitectura de Calidad ISO 27002</span>
                  </div>
                  <Monitor className="w-5 h-5 text-[#2563EB]" />
                </div>
              </div>
            )}

            {element.templateType === "kpi_card" && (
              <div className="w-full h-full p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30 text-white shadow-xl flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">Métrica Clave KPI</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold">
                    +35% vs anterior
                  </span>
                </div>
                <div className="my-2">
                  <span className="text-3xl font-extrabold text-white tracking-tight">15 min</span>
                  <p className="text-xs text-slate-300 mt-1 font-medium">Tiempo Promedio de Respuesta por WhatsApp</p>
                </div>
                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Operación Excel</span>
                  <span className="text-amber-400 font-bold">Reducción del 40%</span>
                </div>
              </div>
            )}

            {element.templateType === "whatsapp_sim" && (
              <div className="w-full h-full p-3 rounded-3xl bg-[#0B141A] border border-emerald-500/30 text-white shadow-2xl flex flex-col justify-between font-sans">
                {/* Header */}
                <div className="flex items-center justify-between bg-[#202C33] p-2.5 rounded-2xl border border-white/5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-amber-500 font-bold text-slate-950 flex items-center justify-center text-xs shadow-md">
                      EX
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-none">Excel Puesto de Bolsa</span>
                      <span className="text-[9px] text-emerald-400 font-mono">en línea • WhatsApp Oficial</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[8px] font-mono font-bold rounded-full border border-emerald-500/30">
                    VERIFICADO ✅
                  </span>
                </div>

                {/* Messages */}
                <div className="my-2 space-y-2 text-xs">
                  <div className="bg-[#202C33] p-2.5 rounded-2xl rounded-tl-xs max-w-[85%] border border-white/5 text-slate-200">
                    <p className="leading-snug">¡Hola Sr. Rodríguez! 👋 Bienvenido al WhatsApp Oficial de Excel. ¿En qué podemos asistirte hoy?</p>
                    <span className="text-[8px] text-slate-400 block text-right mt-1 font-mono">9:41 AM</span>
                  </div>

                  <div className="bg-[#005C4B] p-2.5 rounded-2xl rounded-tr-xs max-w-[85%] ml-auto text-white shadow-sm">
                    <p className="leading-snug">Deseo consultar el estado de mi Mutuo Estructurado y renovar plazo.</p>
                    <span className="text-[8px] text-emerald-200 block text-right mt-1 font-mono">9:42 AM • Visto</span>
                  </div>
                </div>

                {/* Quick Action Pills */}
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button type="button" className="p-1.5 bg-[#202C33] hover:bg-[#2A3942] text-amber-300 rounded-xl text-[10px] font-bold border border-amber-500/20 text-center">
                    📄 Ver Estados de Cuenta
                  </button>
                  <button type="button" className="p-1.5 bg-[#202C33] hover:bg-[#2A3942] text-emerald-300 rounded-xl text-[10px] font-bold border border-emerald-500/20 text-center">
                    🔄 Renovar Mutuo (10.5%)
                  </button>
                </div>
              </div>
            )}

            {element.templateType === "ai_expediente" && (
              <div className="w-full h-full p-4 rounded-3xl bg-slate-900 border border-indigo-500/30 text-white shadow-2xl flex flex-col justify-between font-sans">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Expediente Inteligente CRM (IA Context)</span>
                  </span>
                  <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[9px] font-mono font-bold rounded-full border border-indigo-500/30">
                    Prioridad Alta ⚡
                  </span>
                </div>

                <div className="my-2 p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-1.5">
                  <div className="text-[10px] text-slate-400 font-mono font-bold uppercase">Resumen IA para el Ejecutivo:</div>
                  <p className="text-xs text-slate-200 leading-snug">
                    "Cliente con portafolio diversificado en Bonos Soberanos. Su Mutuo Estructurado vence en 15 días. Documentación KYC 100% verificada."
                  </p>
                </div>

                <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/30 flex items-center justify-between">
                  <div className="text-[10px]">
                    <span className="text-amber-400 font-bold block">Siguiente Acción Recomendada</span>
                    <span className="text-slate-300">Ofrecer renovación automática a 180 días (10.5%).</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                </div>
              </div>
            )}

            {element.templateType === "investment_calc" && (
              <div className="w-full h-full p-4 rounded-3xl bg-slate-900 border border-emerald-500/30 text-white shadow-2xl flex flex-col justify-between font-sans">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    <span>Calculadora de Renovación de Mutuo</span>
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Excel Puesto de Bolsa
                  </span>
                </div>

                <div className="my-2 grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-center cursor-pointer hover:border-emerald-500">
                    <span className="text-[9px] text-slate-400 block font-mono">90 Días</span>
                    <span className="text-sm font-extrabold text-emerald-400">9.5%</span>
                  </div>
                  <div className="p-2.5 bg-emerald-500/20 rounded-xl border-2 border-emerald-500 text-center cursor-pointer">
                    <span className="text-[9px] text-emerald-300 block font-mono">180 Días</span>
                    <span className="text-sm font-extrabold text-white">10.5%</span>
                  </div>
                  <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-center cursor-pointer hover:border-emerald-500">
                    <span className="text-[9px] text-slate-400 block font-mono">360 Días</span>
                    <span className="text-sm font-extrabold text-emerald-400">12.0%</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Retorno Estimado de Inversión:</span>
                  <span className="text-emerald-400 font-extrabold text-sm">USD 10,500</span>
                </div>
              </div>
            )}

            {element.templateType === "pricing_block" && (
              <div className="w-full h-full p-4 rounded-3xl bg-slate-900 border border-slate-700 text-white shadow-2xl flex flex-col justify-between font-sans">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Propuesta Económica Excel WSMAX</span>
                  </span>
                  <span className="text-[9px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    Banca de Inversión
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 my-2">
                  <div className="p-3 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-amber-400 uppercase font-bold block">Bloque 1 • Pago Único</span>
                      <h4 className="text-sm font-extrabold text-white mt-0.5">Implementación & CRM</h4>
                      <p className="text-[9px] text-slate-400 mt-1">Configuración WSMAX + Integración Dynamics CRM + Flujos.</p>
                    </div>
                    <div className="mt-3 text-lg font-black text-amber-400">USD 5,000</div>
                  </div>

                  <div className="p-3 bg-slate-800/90 rounded-2xl border border-emerald-500/40 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold block">Bloque 2 • Recurrente</span>
                      <h4 className="text-sm font-extrabold text-white mt-0.5">Licencias & IA</h4>
                      <p className="text-[9px] text-slate-400 mt-1">5 Agentes Exec. + Super Agente IA + 5 Agentes Virtuales.</p>
                    </div>
                    <div className="mt-3 text-lg font-black text-emerald-400">USD 1,195 <span className="text-[10px] text-slate-400 font-normal">/mes</span></div>
                  </div>
                </div>
              </div>
            )}

            {element.templateType === "feature_grid" && (
              <div className="w-full h-full p-4 rounded-3xl bg-slate-900 border border-slate-700 text-white shadow-2xl flex flex-col justify-between font-sans">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>8 Objetivos Estratégicos del Proyecto</span>
                  </span>
                  <span className="text-[9px] font-mono text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                    Transformación 360°
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 my-2 text-[10px]">
                  <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 font-bold text-slate-200">1. Número Único Corporativo</div>
                  <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 font-bold text-slate-200">2. Trato Personalizado Asignado</div>
                  <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 font-bold text-slate-200">3. Respuesta Inmediata (-40%)</div>
                  <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 font-bold text-slate-200">4. Autoatención 24/7</div>
                  <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 font-bold text-slate-200">5. Preparación previa con IA</div>
                  <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 font-bold text-slate-200">6. Trazabilidad & Cumplimiento</div>
                  <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 font-bold text-slate-200">7. Eliminación Tareas Repetitivas</div>
                  <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 font-bold text-slate-200">8. Humanización Digital</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. SHAPE TYPE */}
        {element.type === "shape" && (
          <div
            className="w-full h-full flex flex-col items-center justify-center p-2 rounded-xl"
            style={{
              backgroundColor: element.customBg || "transparent",
              borderColor: element.customBorder || "transparent",
              color: element.customText || "#18181B",
            }}
          >
            <Sparkles
              className="w-8 h-8"
              style={{ color: element.customAccent || element.customText || "#2563EB" }}
            />
            <span className="text-[9px] font-bold mt-1">{element.title}</span>
          </div>
        )}

        {/* 5. MOCKUP INTERFACE TYPE (EXACT MATCH TO EXECUTIVE USER SCREENSHOT) */}
        {element.type === "mockup" && (
          <div
            className="w-full h-full rounded-2xl border shadow-2xl overflow-hidden flex flex-col text-left transition-colors font-sans"
            style={{
              backgroundColor: "#111111",
              borderColor: element.customBorder || "#18181B",
            }}
          >
            {/* MACBOOK PRO MOCKUP (EXACT MATCH TO EXECUTIVE PROPOSAL SCREENSHOT) */}
            {element.mockupType === "macbook" && (
              <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden bg-[#111111] border border-zinc-800">
                {/* macOS Dark Header Bar with Traffic Lights */}
                <div className="bg-[#111111] px-3 py-2 border-b border-zinc-800 flex items-center justify-between shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                  </div>
                  <div className="text-zinc-300 font-mono text-[9px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <span>ENFOCO OS</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-blue-400">[MISIÓN]</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
                    v2.5
                  </span>
                </div>

                {/* macOS Screen Viewport Body (Light Background matching Executive Design) */}
                <div
                  className="p-3.5 flex-1 flex flex-col justify-between"
                  style={{
                    backgroundColor: element.customBg || "#FAF9F6",
                    color: element.customText || "#111111",
                  }}
                >
                  {/* Viewport Header */}
                  <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 flex items-center justify-center text-[#2563EB]">
                        <Target className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-extrabold text-xs text-[#111111]">
                        {element.title || "Nuestra Misión Corporativa"}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#2563EB] font-mono text-[8px] font-extrabold tracking-wider">
                      OBJETIVO PRINCIPAL
                    </span>
                  </div>

                  {/* Main Quote Card */}
                  <div className="p-3 bg-white border border-[#E4E4E7] rounded-xl shadow-xs my-1">
                    <p className="text-[10px] text-zinc-700 italic leading-relaxed font-serif">
                      "Brindar servicios de asesoría, desarrollo de nuevos modelos operativos y aplicaciones a la medida, con asistencia empresarial personalizada, garantizando soluciones confiables a cargo de nuestro equipo de profesionales calificados, de la más alta calidad, para satisfacer a nuestros clientes."
                    </p>
                  </div>

                  {/* Bottom Metrics Cards */}
                  <div className="grid grid-cols-2 gap-2 my-1">
                    <div className="bg-white p-2 rounded-xl border border-[#E4E4E7] shadow-2xs">
                      <span className="text-[8px] text-zinc-400 font-mono font-bold block uppercase">Garantía</span>
                      <span className="text-xs font-extrabold text-[#111111]">100% a la Medida</span>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-[#E4E4E7] shadow-2xs">
                      <span className="text-[8px] text-zinc-400 font-mono font-bold block uppercase">Soporte SLA</span>
                      <span className="text-xs font-extrabold text-[#2563EB]">60 Días Cobertura</span>
                    </div>
                  </div>

                  {/* Dark Footer Inside Viewport */}
                  <div className="bg-[#111111] text-zinc-400 px-2.5 py-1 rounded-lg text-[8px] font-mono flex items-center justify-between mt-1">
                    <span>ENFOCO, S.R.L. • RNC 1-31-44504-0</span>
                    <span className="text-blue-400 font-bold">100% calidad garantizada</span>
                  </div>
                </div>
              </div>
            )}

            {/* IPHONE 15 PRO MOCKUP */}
            {element.mockupType === "iphone" && (
              <div
                className="w-full h-full flex flex-col border-4 rounded-3xl overflow-hidden p-2 relative shadow-2xl"
                style={{
                  backgroundColor: "#09090B",
                  borderColor: element.customBorder || "#3F3F46",
                }}
              >
                {/* Dynamic Island Notch */}
                <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-end px-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                </div>

                {/* Mobile Status Header */}
                <div className="flex items-center justify-between px-2 text-[8px] text-zinc-400 font-mono mb-2">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-2.5 h-2.5 text-zinc-300" />
                    <Battery className="w-2.5 h-2.5 text-zinc-300" />
                  </div>
                </div>

                {/* Mobile Screen Viewport */}
                <div
                  className="flex-1 rounded-2xl p-3 flex flex-col justify-between border border-zinc-200"
                  style={{
                    backgroundColor: element.customBg || "#FAF9F6",
                    color: element.customText || "#111111",
                  }}
                >
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-xs text-white shadow-xs">
                      E
                    </div>
                    <h4 className="font-extrabold text-xs text-[#111111]">App Móvil ARS</h4>
                    <p className="text-[9px] text-zinc-500">Captura de Expedientes Médicos</p>
                  </div>

                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <span className="text-[9px] font-bold text-emerald-700">Expediente Sincronizado</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              </div>
            )}

            {/* IPAD PRO TABLET MOCKUP */}
            {element.mockupType === "ipad" && (
              <div
                className="w-full h-full flex flex-col border-2 rounded-3xl overflow-hidden p-3 relative shadow-2xl"
                style={{
                  backgroundColor: "#18181B",
                  borderColor: element.customBorder || "#3F3F46",
                }}
              >
                <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2 text-[10px] text-zinc-400">
                  <span className="font-extrabold text-white flex items-center gap-1">
                    <Tablet className="w-3.5 h-3.5 text-indigo-400" />
                    <span>iPad Pro Executive View</span>
                  </span>
                  <span className="text-[8px] font-mono bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                    Retina 12.9"
                  </span>
                </div>

                <div
                  className="flex-1 rounded-xl p-3 flex flex-col justify-between border border-zinc-200"
                  style={{
                    backgroundColor: element.customBg || "#FAF9F6",
                    color: element.customText || "#111111",
                  }}
                >
                  <div>
                    <h4 className="font-extrabold text-xs text-[#111111]">Propuesta Técnica & Presupuesto</h4>
                    <p className="text-[9px] text-zinc-500 mt-0.5">Firma Digital e ISO 27002</p>
                  </div>

                  <div className="p-2 bg-blue-50 border border-blue-200 rounded-xl text-[9px] font-bold text-[#2563EB] flex items-center justify-between">
                    <span>Estado: Aceptación Pendiente</span>
                    <Shield className="w-3.5 h-3.5 text-[#2563EB]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
