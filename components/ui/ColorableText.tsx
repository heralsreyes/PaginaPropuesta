"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Palette } from "lucide-react";
import { TextColorPopover } from "@/components/ui/TextColorPopover";

interface ColorableTextProps {
  id: string;
  text: string;
  className?: string;
  tag?: "span" | "div" | "h1" | "h2" | "h3" | "h4" | "p";
  style?: React.CSSProperties;
}

const ColorableTextBase: React.FC<ColorableTextProps> = ({
  id,
  text,
  className = "",
  tag = "span",
  style,
}) => {
  const { isDesignMode } = useStudioStore();
  const [customColor, setCustomColor] = useState<string | null>(null);
  const [pendingColor, setPendingColor] = useState<string | null>(null);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedColor = localStorage.getItem(`editable_color_${id}`);
      if (savedColor) {
        setCustomColor(savedColor);
      }
    }
  }, [id]);

  useEffect(() => {
    const handleReset = () => {
      setCustomColor(null);
      setPendingColor(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(`editable_color_${id}`);
      }
    };
    const handleSync = () => {
      if (typeof window !== "undefined") {
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
  }, [id]);

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

  const handleOpenPicker = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setPendingColor(customColor);
    setShowColorPicker((prev) => !prev);
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
    <span className={`relative group/editable ${tag === "div" ? "block" : "inline-block"}`}>
      <Tag
        suppressHydrationWarning
        style={computedStyle}
        className={`${className} transition-colors`}
      >
        {text}
      </Tag>

      {/* Mini Color Trigger Button on Hover */}
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={handleOpenPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleOpenPicker(e);
        }}
        className="no-print absolute -top-2.5 -left-2.5 opacity-0 group-hover/editable:opacity-100 transition-opacity bg-zinc-900 text-white p-0.5 rounded-full border border-zinc-600 shadow-md cursor-pointer hover:scale-110 z-30 inline-flex items-center justify-center select-none"
        title="Cambiar color de este monto"
      >
        <Palette className="w-2.5 h-2.5 text-amber-400" />
      </span>

      {/* Color Picker Popover */}
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

export const ColorableText = memo(ColorableTextBase);
