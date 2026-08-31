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
  const color = element.customText || (textType === "h1" ? "#FFFFFF" : textType === "h2" ? "var(--theme-h2, #F08D17)" : "var(--theme-text, #D5E4E2)");

  const getContainerStyles = () => {
    switch (textType) {
      case "h1":
        return "font-black tracking-tight leading-tight font-display";
      case "h2":
        return "font-extrabold tracking-tight leading-snug font-display";
      case "quote":
        return "italic font-medium border-l-4 border-[#F08D17] pl-3 py-1 bg-[#F08D17]/15 rounded-r-xl";
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
        backgroundColor: element.customBg || "rgba(0, 34, 36, 0.85)",
        borderColor: element.customBorder || "rgba(240, 141, 23, 0.4)",
        color: color,
        fontSize: `${fontSize}px`,
      }}
      className={`w-full h-full p-4 border rounded-2xl shadow-xl flex flex-col justify-center backdrop-blur-md ${getContainerStyles()}`}
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
