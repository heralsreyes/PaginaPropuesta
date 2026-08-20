"use client";

import React, { useState, memo } from "react";
import { useStudioStore } from "@/store/useStudioStore";

interface EditableFieldProps {
  id: string;
  defaultText: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

const EditableFieldBase: React.FC<EditableFieldProps> = ({
  id,
  defaultText,
  className = "",
  tag = "span",
}) => {
  const { isDesignMode } = useStudioStore();
  const [text, setText] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`editable_${id}`);
      if (saved !== null) return saved;
    }
    return defaultText;
  });

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerText;
    if (newText !== undefined) {
      setText(newText);
      if (typeof window !== "undefined") {
        localStorage.setItem(`editable_${id}`, newText);
      }
    }
  };

  const Tag = tag;

  if (!isDesignMode) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} outline-none cursor-text hover:ring-2 hover:ring-[#004F54] hover:bg-[#004F54]/10 rounded px-1 -mx-1 relative transition-all`}
    >
      {text}
    </Tag>
  );
};

export const EditableField = memo(EditableFieldBase);
