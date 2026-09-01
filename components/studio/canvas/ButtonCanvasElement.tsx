"use client";

import React from "react";
import { CanvasElement, ButtonActionConfig } from "@/types/studio";

interface ButtonCanvasElementProps {
  element: CanvasElement;
  onExecuteAction?: (config: ButtonActionConfig) => void;
}

export const ButtonCanvasElement: React.FC<ButtonCanvasElementProps> = ({
  element,
  onExecuteAction,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (element.actionConfig && onExecuteAction) {
      e.stopPropagation();
      onExecuteAction(element.actionConfig);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: element.customBg || "#2563EB",
        color: element.customText || "#FFFFFF",
      }}
      className="w-full h-full font-bold text-xs rounded-xl shadow-md flex items-center justify-center transition-all hover:opacity-95 active:scale-95 cursor-pointer px-3 py-2"
    >
      {element.title}
    </button>
  );
};
