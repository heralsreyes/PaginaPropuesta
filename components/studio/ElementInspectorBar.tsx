"use client";

import React, { useState, useRef } from "react";
import { useStudioStore, ButtonActionConfig } from "@/store/useStudioStore";
import {
  Palette,
  Link,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  X,
  Layers,
  Sparkles,
  Check,
  Eye,
  EyeOff,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

export const ElementInspectorBar: React.FC = () => {
  const {
    isDesignMode,
    selectedCanvasElementId,
    canvasElements,
    updateCanvasElement,
    removeCanvasElement,
    duplicateCanvasElement,
    bringToFront,
    sendToBack,
    setElementColorOverride,
    bindButtonAction,
    setSelectedCanvasElementId,
    convertCardToMultiTab,
    toggleHideTabPills,
    addTabToCard,
    setActiveTabForCard,
  } = useStudioStore();

  const [activeColorPopover, setActiveColorPopover] = useState<
    "bg" | "border" | "text" | "accent" | null
  >(null);

  const rafRef = useRef<number | null>(null);

  if (!isDesignMode || !selectedCanvasElementId) {
    return null;
  }

  const selectedElement = canvasElements.find(
    (el) => el.id === selectedCanvasElementId
  );

  if (!selectedElement) {
    return null;
  }

  const availableTargetCards = canvasElements.filter(
    (el) => el.type === "card" || el.type === "module_template"
  );

  const currentAction = selectedElement.actionConfig || {
    targetId: availableTargetCards[0]?.id || "card-target-01",
    type: "CHANGE_TAB",
    payload: "tab-1",
  };

  const handleActionChange = (updates: Partial<ButtonActionConfig>) => {
    const newConfig: ButtonActionConfig = {
      ...currentAction,
      ...updates,
    };
    bindButtonAction(selectedElement.id, newConfig);
    toast.success(`Acción '${newConfig.type}' vinculada al botón '${selectedElement.id}'.`);
  };

  const curatedColors = [
    { name: "Blanco Puro", hex: "#FFFFFF" },
    { name: "Oscuro Zinc", hex: "#18181B" },
    { name: "Azul Rey ENFOCO", hex: "#2563EB" },
    { name: "Verde Esmeralda", hex: "#059669" },
    { name: "Ámbar Naranja", hex: "#D97706" },
    { name: "Púrpura Neón", hex: "#9333EA" },
    { name: "Rosa Caramelo", hex: "#E11D48" },
    { name: "Cian Cloud", hex: "#0891B2" },
    { name: "Índigo Profundo", hex: "#4F46E5" },
    { name: "Gris Suave", hex: "#F4F4F5" },
    { name: "Crema Pastel", hex: "#FEF3C7" },
    { name: "Transparente", hex: "transparent" },
  ];

  // 60FPS High Performance Color Override with requestAnimationFrame batching
  const handleApplyColor = (type: "bg" | "border" | "text" | "accent", colorHex: string) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setElementColorOverride(selectedElement.id, {
        [type]: colorHex,
      });
    });
  };

  const targetedCardObject = canvasElements.find(
    (el) => el.id === currentAction.targetId
  );

  const sectionsList = [
    { id: "hero", label: "Sección Inicio" },
    { id: "alcance", label: "Sección Alcance" },
    { id: "cronograma", label: "Sección Cronograma" },
    { id: "equipo", label: "Sección Equipo" },
    { id: "responsabilidades", label: "Sección Garantía" },
    { id: "inversion", label: "Sección Presupuesto" },
    { id: "empresa", label: "Sección Sobre ENFOCO" },
    { id: "contacto", label: "Sección Contacto" },
  ];

  const systemTriggersList = [
    { id: "PRINT_PDF", label: "Descargar PDF Completo" },
    { id: "ACCEPT_MODAL", label: "Abrir Modal Aceptar Propuesta" },
    { id: "EXPORT_JSON", label: "Exportar JSON Respaldo" },
    { id: "TOGGLE_MODE", label: "Cambiar Modo Studio / Cliente" },
    { id: "RESET", label: "Restablecer Propuesta Inicial" },
  ];

  const stopAll = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={stopAll}
      onMouseDown={stopAll}
      onPointerDown={stopAll}
      className="no-print fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#18181B] text-white p-2.5 px-4 rounded-2xl shadow-2xl border border-zinc-700 flex items-center space-x-3 text-xs font-sans select-none max-w-[95vw] overflow-visible"
    >
      {/* 1. ID Indicator & Renamer */}
      <div className="flex items-center space-x-1.5 border-r border-zinc-700 pr-3 shrink-0">
        <span className="text-[10px] font-mono text-zinc-400 font-bold">ID:</span>
        <input
          type="text"
          value={selectedElement.id}
          onChange={(e) =>
            updateCanvasElement(selectedElement.id, { id: e.target.value })
          }
          className="bg-zinc-800 border border-zinc-600 rounded px-1.5 py-0.5 text-xs font-mono font-bold text-white w-28 focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* 2. Position X/Y and Dimensions W/H */}
      <div className="flex items-center space-x-2 border-r border-zinc-700 pr-3 font-mono text-[11px] shrink-0">
        <div className="flex items-center space-x-1">
          <span className="text-zinc-500">W:</span>
          <input
            type="number"
            value={Math.round(selectedElement.width)}
            onChange={(e) =>
              updateCanvasElement(selectedElement.id, {
                width: Number(e.target.value),
              })
            }
            className="w-12 bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5 text-center text-white font-bold"
          />
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-zinc-500">H:</span>
          <input
            type="number"
            value={Math.round(selectedElement.height)}
            onChange={(e) =>
              updateCanvasElement(selectedElement.id, {
                height: Number(e.target.value),
              })
            }
            className="w-12 bg-zinc-800 border border-zinc-700 rounded px-1 py-0.5 text-center text-white font-bold"
          />
        </div>
      </div>

      {/* 3. Individual Color Pickers with In-Place Floating Swatches (UNCLIPPED & 60FPS) */}
      <div className="flex items-center space-x-2 border-r border-zinc-700 pr-3 relative shrink-0 overflow-visible">
        <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1">
          <Palette className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Color:</span>
        </span>

        {/* Fondo */}
        <div className="relative overflow-visible" onClick={stopAll} onMouseDown={stopAll} onPointerDown={stopAll}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveColorPopover(activeColorPopover === "bg" ? null : "bg");
            }}
            className="w-5 h-5 rounded-full border border-zinc-400 shadow-xs cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: selectedElement.customBg || "#FFFFFF" }}
            title="Color de Fondo Individual"
          />

          {activeColorPopover === "bg" && (
            <div
              onClick={stopAll}
              onMouseDown={stopAll}
              onPointerDown={stopAll}
              className="absolute top-9 left-0 z-[100] w-60 bg-zinc-900 border border-zinc-700 p-3 rounded-2xl shadow-2xl space-y-2 text-white"
            >
              <div className="flex items-center justify-between text-[11px] font-bold border-b border-zinc-800 pb-1.5">
                <span>Color de Fondo</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColorPopover(null);
                  }}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {curatedColors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyColor("bg", c.hex);
                    }}
                    className="w-full h-6 rounded-lg border border-zinc-700 cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedElement.customBg === c.hex && (
                      <Check className="w-3 h-3 text-[#2563EB] drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                <input
                  type="color"
                  value={
                    selectedElement.customBg && selectedElement.customBg !== "transparent"
                      ? selectedElement.customBg
                      : "#FFFFFF"
                  }
                  onInput={(e: any) => handleApplyColor("bg", e.target.value)}
                  onChange={(e) => handleApplyColor("bg", e.target.value)}
                  className="w-7 h-7 rounded border-0 cursor-pointer p-0 bg-transparent"
                />
                <input
                  type="text"
                  value={selectedElement.customBg || "#FFFFFF"}
                  onChange={(e) => handleApplyColor("bg", e.target.value)}
                  className="w-20 bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-center font-mono text-[10px] font-bold text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Borde */}
        <div className="relative overflow-visible" onClick={stopAll} onMouseDown={stopAll} onPointerDown={stopAll}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveColorPopover(activeColorPopover === "border" ? null : "border");
            }}
            className="w-5 h-5 rounded-full border-2 border-zinc-300 shadow-xs cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: selectedElement.customBorder || "#E4E4E7" }}
            title="Color de Borde Individual"
          />

          {activeColorPopover === "border" && (
            <div
              onClick={stopAll}
              onMouseDown={stopAll}
              onPointerDown={stopAll}
              className="absolute top-9 left-0 z-[100] w-60 bg-zinc-900 border border-zinc-700 p-3 rounded-2xl shadow-2xl space-y-2 text-white"
            >
              <div className="flex items-center justify-between text-[11px] font-bold border-b border-zinc-800 pb-1.5">
                <span>Color de Borde</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColorPopover(null);
                  }}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {curatedColors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyColor("border", c.hex);
                    }}
                    className="w-full h-6 rounded-lg border border-zinc-700 cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedElement.customBorder === c.hex && (
                      <Check className="w-3 h-3 text-[#2563EB] drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                <input
                  type="color"
                  value={
                    selectedElement.customBorder && selectedElement.customBorder !== "transparent"
                      ? selectedElement.customBorder
                      : "#E4E4E7"
                  }
                  onInput={(e: any) => handleApplyColor("border", e.target.value)}
                  onChange={(e) => handleApplyColor("border", e.target.value)}
                  className="w-7 h-7 rounded border-0 cursor-pointer p-0 bg-transparent"
                />
                <input
                  type="text"
                  value={selectedElement.customBorder || "#E4E4E7"}
                  onChange={(e) => handleApplyColor("border", e.target.value)}
                  className="w-20 bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-center font-mono text-[10px] font-bold text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Texto */}
        <div className="relative overflow-visible" onClick={stopAll} onMouseDown={stopAll} onPointerDown={stopAll}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveColorPopover(activeColorPopover === "text" ? null : "text");
            }}
            className="w-5 h-5 rounded-full border border-zinc-400 shadow-xs cursor-pointer hover:scale-110 transition-transform flex items-center justify-center font-extrabold text-[9px]"
            style={{
              backgroundColor: selectedElement.customText || "#18181B",
              color: "#FFFFFF",
            }}
            title="Color de Texto Individual"
          >
            T
          </button>

          {activeColorPopover === "text" && (
            <div
              onClick={stopAll}
              onMouseDown={stopAll}
              onPointerDown={stopAll}
              className="absolute top-9 left-0 z-[100] w-60 bg-zinc-900 border border-zinc-700 p-3 rounded-2xl shadow-2xl space-y-2 text-white"
            >
              <div className="flex items-center justify-between text-[11px] font-bold border-b border-zinc-800 pb-1.5">
                <span>Color de Texto</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColorPopover(null);
                  }}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {curatedColors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyColor("text", c.hex);
                    }}
                    className="w-full h-6 rounded-lg border border-zinc-700 cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedElement.customText === c.hex && (
                      <Check className="w-3 h-3 text-[#2563EB] drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                <input
                  type="color"
                  value={
                    selectedElement.customText && selectedElement.customText !== "transparent"
                      ? selectedElement.customText
                      : "#18181B"
                  }
                  onInput={(e: any) => handleApplyColor("text", e.target.value)}
                  onChange={(e) => handleApplyColor("text", e.target.value)}
                  className="w-7 h-7 rounded border-0 cursor-pointer p-0 bg-transparent"
                />
                <input
                  type="text"
                  value={selectedElement.customText || "#18181B"}
                  onChange={(e) => handleApplyColor("text", e.target.value)}
                  className="w-20 bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-center font-mono text-[10px] font-bold text-white"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. MULTI-TAB CONTROLS FOR CARDS */}
      {selectedElement.type === "card" && (
        <div className="flex items-center space-x-2 border-r border-zinc-700 pr-3 shrink-0">
          {!selectedElement.isMultiTab ? (
            <button
              onClick={() => {
                convertCardToMultiTab(selectedElement.id);
                toast.success("Tarjeta convertida a Contenedor Multi-Pestaña.");
              }}
              className="px-2.5 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-lg text-[10px] flex items-center gap-1 cursor-pointer transition-all shadow-xs"
            >
              <Sparkles className="w-3 h-3" />
              <span>+ Convertir a Multi-Pestañas</span>
            </button>
          ) : (
            <div className="flex items-center space-x-1.5 text-[10px] font-bold">
              {/* Toggle Hide Tab Pills */}
              <button
                onClick={() => {
                  toggleHideTabPills(selectedElement.id);
                  toast.info(
                    !selectedElement.hideTabPills
                      ? "Pestañas arriba Ocultas (Controlable únicamente por botones externos)."
                      : "Pestañas arriba Visibles."
                  );
                }}
                className={`p-1 rounded-lg border flex items-center gap-1 cursor-pointer transition-colors ${
                  selectedElement.hideTabPills
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white"
                }`}
                title="Ocultar o mostrar botones de pestañas en la cabecera de la tarjeta"
              >
                {selectedElement.hideTabPills ? (
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span>{selectedElement.hideTabPills ? "Sin Pestañas Arriba" : "Pestañas Visibles"}</span>
              </button>

              {/* Add New Tab */}
              <button
                onClick={() => {
                  addTabToCard(selectedElement.id);
                  toast.success("Nueva pestaña añadida a la tarjeta.");
                }}
                className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg border border-zinc-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3 text-emerald-400" />
                <span>+ Pestaña</span>
              </button>

              {/* Tab Selector */}
              <select
                value={selectedElement.activeTabId || selectedElement.tabs?.[0]?.id}
                onChange={(e) =>
                  setActiveTabForCard(selectedElement.id, e.target.value)
                }
                className="bg-zinc-800 border border-zinc-600 rounded px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 focus:outline-none"
              >
                {selectedElement.tabs?.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} ({t.id})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* 5. COMPLETE ACTION BINDING FOR BUTTONS */}
      {selectedElement.type === "button" && (
        <div className="flex items-center space-x-2 border-r border-zinc-700 pr-3 shrink-0">
          <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1">
            <Link className="w-3.5 h-3.5 text-emerald-400" />
            <span>Acción:</span>
          </span>

          {/* Action Type Dropdown */}
          <select
            value={currentAction.type}
            onChange={(e) =>
              handleActionChange({ type: e.target.value as any })
            }
            className="bg-zinc-800 border border-zinc-600 rounded px-1.5 py-0.5 text-[10px] font-bold text-white focus:outline-none"
          >
            <option value="CHANGE_TAB">1. Conmutar Pestaña Tarjeta</option>
            <option value="NEXT_TAB">2. Siguiente Pestaña (Carrusel)</option>
            <option value="TOGGLE_VISIBILITY">3. Mostrar / Ocultar Elemento</option>
            <option value="NAVIGATE_SECTION">4. Saltar a Sección (#id)</option>
            <option value="SYSTEM_TRIGGER">5. Acción del Sistema</option>
          </select>

          {/* Target Element / Card Selection */}
          {(currentAction.type === "CHANGE_TAB" ||
            currentAction.type === "NEXT_TAB" ||
            currentAction.type === "TOGGLE_VISIBILITY") && (
            <select
              value={currentAction.targetId}
              onChange={(e) => handleActionChange({ targetId: e.target.value })}
              className="bg-zinc-800 border border-zinc-600 rounded px-1.5 py-0.5 text-[10px] font-bold text-blue-400 focus:outline-none max-w-[130px] truncate"
            >
              {canvasElements.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  Target: {opt.id}
                </option>
              ))}
            </select>
          )}

          {/* Target Tab Selection if action is CHANGE_TAB */}
          {currentAction.type === "CHANGE_TAB" && (
            <select
              value={currentAction.payload || "tab-1"}
              onChange={(e) => handleActionChange({ payload: e.target.value })}
              className="bg-zinc-800 border border-zinc-600 rounded px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 focus:outline-none"
            >
              {targetedCardObject?.tabs ? (
                targetedCardObject.tabs.map((t) => (
                  <option key={t.id} value={t.id}>
                    Pestaña: {t.label} ({t.id})
                  </option>
                ))
              ) : (
                <>
                  <option value="tab-1">Pestaña 1 (tab-1)</option>
                  <option value="tab-2">Pestaña 2 (tab-2)</option>
                  <option value="tab-3">Pestaña 3 (tab-3)</option>
                </>
              )}
            </select>
          )}

          {/* Target Section Selection if action is NAVIGATE_SECTION */}
          {currentAction.type === "NAVIGATE_SECTION" && (
            <select
              value={currentAction.payload || "alcance"}
              onChange={(e) => handleActionChange({ payload: e.target.value })}
              className="bg-zinc-800 border border-zinc-600 rounded px-1.5 py-0.5 text-[10px] font-bold text-purple-400 focus:outline-none"
            >
              {sectionsList.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.label} (#{sec.id})
                </option>
              ))}
            </select>
          )}

          {/* System Trigger Action Selection if action is SYSTEM_TRIGGER */}
          {currentAction.type === "SYSTEM_TRIGGER" && (
            <select
              value={currentAction.payload || "PRINT_PDF"}
              onChange={(e) => handleActionChange({ payload: e.target.value })}
              className="bg-zinc-800 border border-zinc-600 rounded px-1.5 py-0.5 text-[10px] font-bold text-amber-400 focus:outline-none"
            >
              {systemTriggersList.map((sys) => (
                <option key={sys.id} value={sys.id}>
                  {sys.label}
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* 6. Layering: Bring to Front / Send to Back */}
      <div className="flex items-center space-x-1 border-r border-zinc-700 pr-3 shrink-0">
        <button
          onClick={() => bringToFront(selectedElement.id)}
          className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white cursor-pointer"
          title="Traer al Frente (Z-Index +1)"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => sendToBack(selectedElement.id)}
          className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white cursor-pointer"
          title="Enviar al Fondo (Z-Index -1)"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 7. Duplicate & Delete */}
      <div className="flex items-center space-x-1 shrink-0">
        <button
          onClick={() => duplicateCanvasElement(selectedElement.id)}
          className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-[#D4D4D8] hover:text-white cursor-pointer"
          title="Duplicar Elemento"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => removeCanvasElement(selectedElement.id)}
          className="p-1 rounded bg-red-900/60 hover:bg-red-600 text-red-200 hover:text-white cursor-pointer"
          title="Eliminar Elemento del Lienzo"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setSelectedCanvasElementId(null)}
          className="p-1 rounded text-zinc-400 hover:text-white cursor-pointer ml-1"
          title="Cerrar Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
