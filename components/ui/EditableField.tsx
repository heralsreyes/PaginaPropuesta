"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Palette } from "lucide-react";
import { TextColorPopover } from "@/components/ui/TextColorPopover";

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
        <TextColorPopover
          popoverRef={popoverRef}
          pendingColor={pendingColor}
          setPendingColor={setPendingColor}
          onConfirm={handleConfirmColor}
          onCancel={handleCancelColor}
        />
      )}
    </span>
  );
};

export const EditableField = memo(EditableFieldBase);
