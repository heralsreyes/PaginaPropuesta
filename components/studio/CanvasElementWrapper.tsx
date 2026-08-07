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

  const wrapperStyle: React.CSSProperties = {
    position: "absolute",
    left: `${element.x}px`,
    top: `${element.y}px`,
    width: `${element.width}px`,
    height: `${element.height}px`,
    zIndex: isSelected ? 999 : element.zIndex || 10,
    display: element.isHidden && !isDesignMode ? "none" : "block",
    opacity: element.isHidden ? 0.35 : 1,
  };

  return (
    <div
      ref={wrapperRef}
      style={wrapperStyle}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={`group transition-all box-border select-none ${
        isDesignMode ? "cursor-move" : "cursor-pointer"
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
            className="w-full h-full py-1 px-3 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 border"
            style={{
              backgroundColor: element.customBg || "#2563EB",
              color: element.customText || "#FFFFFF",
              borderColor: element.customBorder || "transparent",
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
            >
              {element.title || "Button"}
            </span>
          </button>
        )}

        {/* 2. CARD TYPE */}
        {element.type === "card" && (
          <div
            className="w-full h-full p-3.5 rounded-2xl border flex flex-col justify-between text-left shadow-sm transition-colors"
            style={{
              backgroundColor: element.customBg || "#FFFFFF",
              borderColor: element.customBorder || "#E4E4E7",
              color: element.customText || "#18181B",
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
                      className="font-extrabold text-xs outline-none text-zinc-900"
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
                    className="text-[11px] text-zinc-600 outline-none leading-relaxed"
                  >
                    {activeTab.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-zinc-200/60 pb-1 mb-1">
                  <span
                    contentEditable={isDesignMode}
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      updateCanvasElement(element.id, {
                        title: e.currentTarget.innerText,
                      })
                    }
                    className="font-extrabold text-xs outline-none"
                  >
                    {element.title || "Tarjeta Plain"}
                  </span>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 font-bold text-zinc-800">
                    {element.id}
                  </span>
                </div>

                <p
                  contentEditable={isDesignMode}
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    updateCanvasElement(element.id, {
                      subtitle: e.currentTarget.innerText,
                    })
                  }
                  className="text-[10px] opacity-80 outline-none leading-tight"
                >
                  {element.subtitle || "Doble clic para editar texto in-situ."}
                </p>
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
