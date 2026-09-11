"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Palette } from "lucide-react";
import { TextColorPopover } from "@/components/ui/TextColorPopover";

interface EditableTextProps {
  id?: string;
  value: string;
  onChange: (newVal: string) => void;
  className?: string;
  multiline?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  style?: React.CSSProperties;
}

export const EditableText: React.FC<EditableTextProps> = ({
  id,
  value,
  onChange,
  className = "",
  multiline = false,
  tag = "span",
  style,
}) => {
  const { isDesignMode } = useStudioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Stable identifier for localStorage color persistence
  const fallbackHash = useRef(
    "etxt_" +
      Math.abs(
        (value || "").split("").reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
      ).toString(36)
  ).current;
  const elementId = id || fallbackHash;

  const [customColor, setCustomColor] = useState<string | null>(null);
  const [pendingColor, setPendingColor] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLSpanElement | null>(null);

  // Sync value prop
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  // Load color from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedColor = localStorage.getItem(`editable_color_${elementId}`);
      if (savedColor) {
        setCustomColor(savedColor);
      }
    }
  }, [elementId]);

  // Sync / Reset events
  useEffect(() => {
    const handleReset = () => {
      setCustomColor(null);
      setPendingColor(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(`editable_color_${elementId}`);
      }
    };
    const handleSync = () => {
      if (typeof window !== "undefined") {
        const savedColor = localStorage.getItem(`editable_color_${elementId}`);
        setCustomColor(savedColor || null);
      }
    };
    window.addEventListener("enfoco-reset-all", handleReset);
    window.addEventListener("enfoco-sync-editables", handleSync);
    return () => {
      window.removeEventListener("enfoco-reset-all", handleReset);
      window.removeEventListener("enfoco-sync-editables", handleSync);
    };
  }, [elementId]);

  // Click outside to cancel and close color popover
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

  // Focus input when editing
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (tempValue.trim() !== value) {
      onChange(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      handleSave();
    } else if (e.key === "Escape") {
      setTempValue(value);
      setIsEditing(false);
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
        localStorage.setItem(`editable_color_${elementId}`, pendingColor);
      } else {
        localStorage.removeItem(`editable_color_${elementId}`);
      }
    }
    setShowColorPicker(false);
  };

  const handleCancelColor = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPendingColor(customColor);
    setShowColorPicker(false);
  };

  // Preview color while picker is open, or confirmed color
  const activeColor = showColorPicker ? pendingColor : customColor;

  const computedStyle: React.CSSProperties = {
    ...style,
    ...(activeColor ? { color: activeColor } : {}),
  };

  const Tag = tag;

  if (!isDesignMode) {
    return (
      <Tag className={className} style={computedStyle} suppressHydrationWarning>
        {value}
      </Tag>
    );
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          onMouseDown={(e) => e.stopPropagation()}
          rows={3}
          style={computedStyle}
          className={`w-full bg-white text-[#111111] border-2 border-[#2563EB] rounded-xl p-2 outline-none shadow-lg font-sans text-sm z-30 ${className}`}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        style={computedStyle}
        className={`bg-white text-zinc-950 font-medium border-2 border-[var(--accent-color)] rounded-lg px-2 py-0.5 outline-none shadow-lg font-sans text-xs z-30 min-w-[70px] ${className}`}
      />
    );
  }

  const isBlock = tag === "div" || tag === "p" || multiline;

  return (
    <span className={`relative group/editable ${isBlock ? "block" : "inline-block"}`}>
      <Tag
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        style={computedStyle}
        className={`cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-[var(--accent-color)]/40 hover:bg-[var(--accent-color)]/10 rounded px-1 -mx-1 relative ${className}`}
        title="Clic para editar este texto"
      >
        {value}
      </Tag>

      {/* Mini Color Trigger Button on Hover (placed on top-left to avoid colliding with delete trash buttons on the right) */}
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={handleOpenPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleOpenPicker(e);
        }}
        className="no-print absolute -top-2.5 -left-2.5 opacity-0 group-hover/editable:opacity-100 transition-opacity bg-zinc-900 text-white p-0.5 rounded-full border border-zinc-600 shadow-md cursor-pointer hover:scale-110 z-30 inline-flex items-center justify-center select-none"
        title="Cambiar color de este texto"
      >
        <Palette className="w-2.5 h-2.5 text-amber-400" />
      </span>

      {/* Color Picker Popover with Required "Aceptar" Confirmation */}
      {showColorPicker && (
        <TextColorPopover
          popoverRef={popoverRef}
          anchorEl={triggerRef.current}
          pendingColor={pendingColor}
          setPendingColor={setPendingColor}
          onConfirm={handleConfirmColor}
          onCancel={handleCancelColor}
        />
      )}
    </span>
  );
};