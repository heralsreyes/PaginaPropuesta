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

  // Click outside to close color popover
  useEffect(() => {
    if (!showColorPicker) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showColorPicker]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerText;
    if (newText !== undefined) {
      setText(newText);
      if (typeof window !== "undefined") {
        localStorage.setItem(`editable_${id}`, newText);
      }
    }
  };

  const applyColor = (colorHex: string | null) => {
    setCustomColor(colorHex);
    if (typeof window !== "undefined") {
      if (colorHex) {
        localStorage.setItem(`editable_color_${id}`, colorHex);
      } else {
        localStorage.removeItem(`editable_color_${id}`);
      }
    }
    setShowColorPicker(false);
  };

  const computedStyle: React.CSSProperties = {
    ...style,
    ...(customColor ? { color: customColor } : {}),
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
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setShowColorPicker(!showColorPicker);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            e.preventDefault();
            setShowColorPicker(!showColorPicker);
          }
        }}
        className="no-print absolute -top-3 -right-2 opacity-0 group-hover/editable:opacity-100 transition-opacity bg-zinc-900 text-white p-0.5 rounded-full border border-zinc-600 shadow-md cursor-pointer hover:scale-110 z-30 inline-flex items-center justify-center select-none"
        title="Cambiar color de este texto"
      >
        <Palette className="w-2.5 h-2.5 text-amber-400" />
      </span>

      {/* Color Picker Popover */}
      {showColorPicker && (
        <div
          ref={popoverRef}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="no-print absolute top-full left-0 mt-1 z-50 bg-[#18181B] border border-zinc-700 p-2.5 rounded-2xl shadow-2xl space-y-2 text-white text-xs w-48 font-sans font-normal"
        >
          <div className="flex items-center justify-between text-[11px] font-bold border-b border-zinc-800 pb-1 text-zinc-300">
            <span>Color del Texto</span>
            <span
              role="button"
              tabIndex={0}
              onClick={() => setShowColorPicker(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setShowColorPicker(false);
              }}
              className="text-zinc-500 hover:text-white cursor-pointer inline-flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {/* Auto / Default */}
            <span
              role="button"
              tabIndex={0}
              onClick={() => applyColor(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") applyColor(null);
              }}
              className={`w-7 h-7 rounded-lg border flex items-center justify-center cursor-pointer transition-transform hover:scale-105 select-none ${
                !customColor ? "border-amber-400 ring-1 ring-amber-400" : "border-zinc-700 bg-zinc-800"
              }`}
              title="Color Automático / Heredar"
            >
              <span className="text-[9px] font-bold text-zinc-300">Auto</span>
            </span>

            {/* White */}
            <span
              role="button"
              tabIndex={0}
              onClick={() => applyColor("#FFFFFF")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") applyColor("#FFFFFF");
              }}
              className={`w-7 h-7 rounded-lg border bg-white flex items-center justify-center cursor-pointer transition-transform hover:scale-105 select-none ${
                customColor === "#FFFFFF" ? "border-blue-500 ring-2 ring-blue-500" : "border-zinc-300"
              }`}
              title="Blanco"
            >
              {customColor === "#FFFFFF" && <Check className="w-3 h-3 text-blue-600" />}
            </span>

            {/* Black */}
            <span
              role="button"
              tabIndex={0}
              onClick={() => applyColor("#000000")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") applyColor("#000000");
              }}
              className={`w-7 h-7 rounded-lg border bg-black flex items-center justify-center cursor-pointer transition-transform hover:scale-105 select-none ${
                customColor === "#000000" ? "border-blue-500 ring-2 ring-blue-500" : "border-zinc-700"
              }`}
              title="Negro"
            >
              {customColor === "#000000" && <Check className="w-3 h-3 text-white" />}
            </span>

            {/* Theme Accent */}
            <span
              role="button"
              tabIndex={0}
              onClick={() => applyColor("var(--accent-color)")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") applyColor("var(--accent-color)");
              }}
              className="w-7 h-7 rounded-lg border border-zinc-700 bg-[var(--accent-color)] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 select-none"
              title="Color de Acento del Tema"
            >
              {customColor === "var(--accent-color)" && <Check className="w-3 h-3 text-white" />}
            </span>

            {/* Theme Secondary Accent */}
            <span
              role="button"
              tabIndex={0}
              onClick={() => applyColor("var(--secondary-accent)")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") applyColor("var(--secondary-accent)");
              }}
              className="w-7 h-7 rounded-lg border border-zinc-700 bg-[var(--secondary-accent)] flex items-center justify-center cursor-pointer transition-transform hover:scale-105 select-none"
              title="Acento Secundario del Tema"
            >
              {customColor === "var(--secondary-accent)" && <Check className="w-3 h-3 text-white" />}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t border-zinc-800 text-[10px]">
            <span className="text-zinc-400">Personalizado:</span>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={customColor && customColor.startsWith("#") ? customColor : "#FFFFFF"}
                onChange={(e) => applyColor(e.target.value)}
                className="w-6 h-6 rounded border-0 cursor-pointer p-0 bg-transparent"
              />
              <span className="font-mono text-[9px] text-zinc-300 uppercase">
                {customColor || "Auto"}
              </span>
            </div>
          </div>
        </div>
      )}
    </span>
  );
};

export const EditableField = memo(EditableFieldBase);
