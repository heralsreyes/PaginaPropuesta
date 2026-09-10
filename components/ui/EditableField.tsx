"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Palette, X, Check } from "lucide-react";

interface EditableFieldProps {
  id: string;
  defaultText: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  style?: React.CSSProperties;
}

const COLOR_PRESETS: { label: string; value: string | null; bgClass?: string; isSpecial?: boolean }[] = [
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

const EditableFieldBase: React.FC<EditableFieldProps> = ({
  id,
  defaultText,
  className = "",
  tag = "span",
  style,
}) => {
  const { isDesignMode } = useStudioStore();
  const [text, setText] = useState<string>(defaultText);
  const [customColor, setCustomColor] = useState<string | null>(null);
  const [pendingColor, setPendingColor] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setText(defaultText);
    if (typeof window !== "undefined") {
      const savedText = localStorage.getItem(`editable_${id}`);
      if (savedText !== null && savedText !== "") {
        setText(savedText);
      }
      const savedColor = localStorage.getItem(`editable_color_${id}`);
      if (savedColor) {
        setCustomColor(savedColor);
      }
    }
  }, [id, defaultText]);

  useEffect(() => {
    const handleReset = () => {
      setText(defaultText);
      setCustomColor(null);
      setPendingColor(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(`editable_${id}`);
        localStorage.removeItem(`editable_color_${id}`);
      }
    };
    const handleSync = () => {
      if (typeof window !== "undefined") {
        const savedText = localStorage.getItem(`editable_${id}`);
        if (savedText !== null && savedText !== "") {
          setText(savedText);
        } else {
          setText(defaultText);
        }
        const savedColor = localStorage.getItem(`editable_color_${id}`);
        setCustomColor(savedColor || null);
      }
    };
    window.addEventListener("enfoco-reset-all", handleReset);
    window.addEventListener("enfoco-sync-editables", handleSync);
    return () => {
      window.removeEventListener("enfoco-reset-all", handleReset);
      window.removeEventListener("enfoco-sync-editables", handleSync);
    };
  }, [id, defaultText]);

  // Click outside to close color popover (cancels pending changes)
  useEffect(() => {
    if (!showColorPicker) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPendingColor(customColor);
        setShowColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showColorPicker, customColor]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerText;
    if (newText !== undefined) {
      setText(newText);
      if (typeof window !== "undefined") {
        localStorage.setItem(`editable_${id}`, newText);
      }
    }
  };

  const handleOpenPicker = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!showColorPicker) {
      setPendingColor(customColor);
      setShowColorPicker(true);
    } else {
      setPendingColor(customColor);
      setShowColorPicker(false);
    }
  };

  const handleConfirmColor = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCustomColor(pendingColor);
    if (typeof window !== "undefined") {
      if (pendingColor) {
        localStorage.setItem(`editable_color_${id}`, pendingColor);
      } else {
        localStorage.removeItem(`editable_color_${id}`);
      }
    }
    setShowColorPicker(false);
  };

  const handleCancelColor = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPendingColor(customColor);
    setShowColorPicker(false);
  };

  // Preview color while picker is open, or confirmed color when closed
  const activeColor = showColorPicker ? pendingColor : customColor;

  const computedStyle: React.CSSProperties = {
    ...style,
    ...(activeColor ? { color: activeColor } : {}),
  };

  const Tag = tag;

  if (!isDesignMode) {
    return (
      <Tag className={className} style={computedStyle} suppressHydrationWarning>
        {text}
      </Tag>
    );
  }

  return (
    <span className="relative inline-block group/editable">
      <Tag
        contentEditable
        suppressContentEditableWarning
        suppressHydrationWarning
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onBlur={handleBlur}
        style={computedStyle}
        className={`${className} outline-none cursor-text hover:ring-2 hover:ring-[var(--accent-color)]/60 hover:bg-[var(--accent-color)]/10 rounded px-1 -mx-1 relative transition-all`}
      >
        {text}
      </Tag>

      {/* Mini Color Trigger Button on Hover */}
      <span
        role="button"
        tabIndex={0}
        onClick={handleOpenPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleOpenPicker(e);
        }}
        className="no-print absolute -top-3 -right-2 opacity-0 group-hover/editable:opacity-100 transition-opacity bg-zinc-900 text-white p-0.5 rounded-full border border-zinc-600 shadow-md cursor-pointer hover:scale-110 z-30 inline-flex items-center justify-center select-none"
        title="Cambiar color de este texto"
      >
        <Palette className="w-2.5 h-2.5 text-amber-400" />
      </span>

      {/* Color Picker Popover with Required "Aceptar" Confirmation */}
      {showColorPicker && (
        <div
          ref={popoverRef}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="no-print absolute top-full left-0 mt-1 z-50 bg-[#18181B] border border-zinc-700 p-3 rounded-2xl shadow-2xl space-y-2.5 text-white text-xs w-56 font-sans font-normal"
        >
          {/* Header with Title and Cancel 'X' */}
          <div className="flex items-center justify-between text-[11px] font-bold border-b border-zinc-800 pb-1.5 text-zinc-300">
            <span>Color del Texto</span>
            <button
              type="button"
              onClick={handleCancelColor}
              className="text-zinc-500 hover:text-white cursor-pointer inline-flex items-center justify-center p-0.5 rounded transition-colors"
              title="Cancelar y cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Color Presets Grid (Clicking updates preview, does NOT close) */}
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
              onClick={handleCancelColor}
              className="flex-1 py-1.5 px-2 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 text-[11px] font-semibold transition-colors cursor-pointer text-center"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmColor}
              className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer text-center"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Aceptar</span>
            </button>
          </div>
        </div>
      )}
    </span>
  );
};

export const EditableField = memo(EditableFieldBase);
