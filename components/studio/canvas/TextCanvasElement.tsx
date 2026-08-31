"use client";

import React from "react";
import { CanvasElement } from "@/types/studio";
import { useStudioStore } from "@/store/useStudioStore";
import { EditableText } from "@/components/studio/EditableText";

interface TextCanvasElementProps {
  element: CanvasElement;
}

export const TextCanvasElement: React.FC<TextCanvasElementProps> = ({ element }) => {
  const { updateCanvasElement } = useStudioStore();

  const textType = element.textType || "p";
  const fontSize = element.fontSize || (textType === "h1" ? 32 : textType === "h2" ? 24 : textType === "quote" ? 18 : 14);
  const color = element.customText || (textType === "h1" ? "var(--theme-h1, #0F172A)" : textType === "h2" ? "var(--theme-h2, #004F54)" : "var(--theme-text, #334155)");

  const getContainerStyles = () => {
    switch (textType) {
      case "h1":
        return "font-black tracking-tight leading-tight font-display";
      case "h2":
        return "font-extrabold tracking-tight leading-snug font-display";
      case "quote":
        return "italic font-medium border-l-4 border-[#2563EB] pl-3 py-1 bg-[#2563EB]/5 rounded-r-xl";
      case "bullet":
        return "font-medium leading-relaxed whitespace-pre-line";
      case "p":
      default:
        return "font-medium leading-relaxed";
    }
  };

  return (
    <div
      style={{
        backgroundColor: element.customBg || "transparent",
        borderColor: element.customBorder || "transparent",
        color: color,
        fontSize: `${fontSize}px`,
      }}
      className={`w-full h-full p-2 flex flex-col justify-center rounded-xl ${getContainerStyles()}`}
    >
      <EditableText
        value={element.title || "Escribe tu texto aquí..."}
        onChange={(newVal) => updateCanvasElement(element.id, { title: newVal })}
        multiline={textType === "p" || textType === "bullet" || textType === "quote"}
        className="w-full break-words select-text"
      />
    </div>
  );
};
