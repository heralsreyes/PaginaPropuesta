"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";

export const COLOR_PRESETS: { label: string; value: string | null; bgClass?: string; isSpecial?: boolean }[] = [
  { label: "Auto", value: null, isSpecial: true },
  { label: "Blanco", value: "#FFFFFF" },
  { label: "Negro", value: "#000000" },
  { label: "Acento 1", value: "var(--accent-color)" },
  { label: "Acento 2", value: "var(--secondary-accent)" },
  { label: "Ámbar", value: "#F59E0B" },
  { label: "Esmeralda", value: "#10B981" },
  { label: "Azul", value: "#2563EB" },
  { label: "Rojo", value: "#EF4444" },
  { label: "Plata", value: "#94A3B8" },
];

interface TextColorPopoverProps {
  popoverRef: React.Ref<HTMLDivElement>;
  anchorEl?: HTMLElement | null;
  pendingColor: string | null;
  setPendingColor: (color: string | null) => void;
  onConfirm: (e?: React.MouseEvent) => void;
  onCancel: (e?: React.MouseEvent) => void;
}

export const TextColorPopover: React.FC<TextColorPopoverProps> = ({
  popoverRef,
  anchorEl,
  pendingColor,
  setPendingColor,
  onConfirm,
  onCancel,
}) => {
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const localRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updatePosition = () => {
      if (!anchorEl) return;
      const rect = anchorEl.getBoundingClientRect();
      const popoverWidth = 230;
      const popoverHeight = 220;

      // Vertical positioning: Flip up if insufficient room below, with viewport clamping
      let top = rect.bottom + 6;
      if (rect.bottom + popoverHeight > window.innerHeight - 12) {
        if (rect.top > popoverHeight + 12) {
          top = rect.top - popoverHeight - 6;
        } else {
          // Clamp within viewport
          top = Math.max(12, window.innerHeight - popoverHeight - 12);
        }
      }

      // Horizontal positioning: Clamp to stay fully visible inside screen
      let left = rect.left;
      const maxLeft = window.innerWidth - popoverWidth - 12;
      left = Math.max(12, Math.min(left, maxLeft));

      setCoords({ top, left });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [mounted, anchorEl]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  const content = (
    <div
      ref={(node) => {
        localRef.current = node;
        if (typeof popoverRef === "function") {
          popoverRef(node);
        } else if (popoverRef && "current" in popoverRef) {
          (popoverRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        maxHeight: "calc(100vh - 24px)",
        overflowY: "auto",
        zIndex: 999999,
      }}
      className="no-print bg-[#18181B] border border-zinc-700 p-3 rounded-2xl shadow-2xl space-y-2.5 text-white text-xs w-56 font-sans font-normal animate-in fade-in zoom-in-95 duration-100"
    >
      {/* Header with Title and Cancel 'X' */}
      <div className="flex items-center justify-between text-[11px] font-bold border-b border-zinc-800 pb-1.5 text-zinc-300">
        <span>Color del Texto</span>
        <button
          type="button"
          onClick={onCancel}
          className="text-zinc-500 hover:text-white cursor-pointer inline-flex items-center justify-center p-0.5 rounded transition-colors"
          title="Cancelar y cerrar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Color Presets Grid */}
      <div className="grid grid-cols-5 gap-1.5">
        {COLOR_PRESETS.map((preset, idx) => {
          const isSelected = pendingColor === preset.value;
          if (preset.isSpecial) {
            return (
              <button
                type="button"
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingColor(null);
                }}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center cursor-pointer transition-transform hover:scale-105 select-none ${
                  isSelected
                    ? "border-amber-400 ring-2 ring-amber-400 bg-zinc-800"
                    : "border-zinc-700 bg-zinc-800/80 hover:border-zinc-500"
                }`}
                title="Color Automático (Heredar)"
              >
                <span className="text-[9px] font-bold text-zinc-300">Auto</span>
              </button>
            );
          }

          const isVar = preset.value?.startsWith("var(");
          const swatchStyle: React.CSSProperties = isVar
            ? { background: preset.value! }
            : { backgroundColor: preset.value! };

          return (
            <button
              type="button"
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setPendingColor(preset.value);
              }}
              style={swatchStyle}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center cursor-pointer transition-transform hover:scale-105 select-none ${
                isSelected ? "border-white ring-2 ring-[#2563EB]" : "border-zinc-700"
              }`}
              title={preset.label}
            >
              {isSelected && (
                <Check
                  className={`w-3.5 h-3.5 ${
                    preset.value === "#FFFFFF" ? "text-zinc-900" : "text-white"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Custom Color Picker & Hex Input */}
      <div className="pt-2 border-t border-zinc-800 text-[10px] space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400 font-medium">Personalizado:</span>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={pendingColor && pendingColor.startsWith("#") ? pendingColor : "#2563EB"}
              onChange={(e) => setPendingColor(e.target.value)}
              className="w-7 h-7 rounded-lg border border-zinc-600 cursor-pointer p-0.5 bg-zinc-800"
            />
            <input
              type="text"
              value={pendingColor || ""}
              onChange={(e) => {
                const val = e.target.value.trim();
                setPendingColor(val === "" ? null : val);
              }}
              placeholder="Auto"
              className="w-20 bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-[10px] font-mono text-zinc-200 uppercase focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>
        </div>
      </div>

      {/* Footer Action Buttons: Cancelar & Aceptar */}
      <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-1.5 px-2 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 text-[11px] font-semibold transition-colors cursor-pointer text-center"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer text-center"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Aceptar</span>
        </button>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};