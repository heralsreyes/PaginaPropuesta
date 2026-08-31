"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStudioStore } from "@/store/useStudioStore";

interface EditableTextProps {
  value: string;
  onChange: (newVal: string) => void;
  className?: string;
  multiline?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  className = "",
  multiline = false,
  tag = "span",
}) => {
  const { isDesignMode } = useStudioStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

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

  const Tag = tag;

  if (!isDesignMode) {
    return <Tag className={className}>{value}</Tag>;
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
          rows={3}
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
        className={`w-full bg-white text-[#111111] border-2 border-[#2563EB] rounded-lg px-2 py-1 outline-none shadow-lg font-sans z-30 ${className}`}
      />
    );
  }

    <Tag
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-[#2563EB]/40 hover:bg-[#2563EB]/10 rounded px-1 -mx-1 relative ${className}`}
      title="Clic para editar este texto"
    >
      {value}
    </Tag>
  );
};
