"use client";

import React, { useState, useRef, useEffect } from "react";
import { CanvasElement } from "@/types/studio";
import { useStudioStore } from "@/store/useStudioStore";
import { Move } from "lucide-react";
import { ButtonCanvasElement } from "./canvas/ButtonCanvasElement";
import { CardCanvasElement } from "./canvas/CardCanvasElement";
import { MockupCanvasElement } from "./canvas/MockupCanvasElement";
import { ImageCanvasElement } from "./canvas/ImageCanvasElement";
import { TextCanvasElement } from "./canvas/TextCanvasElement";
import { ModuleCanvasElement } from "./canvas/ModuleCanvasElement";
import { UIComponentCanvasElement } from "./canvas/UIComponentCanvasElement";

interface CanvasElementWrapperProps {
  element: CanvasElement;
  onExecuteAction?: (config: any) => void;
}

export const CanvasElementWrapper: React.FC<CanvasElementWrapperProps> = ({
  element,
  onExecuteAction,
}) => {
  const {
    isDesignMode,
    selectedCanvasElementId,
    setSelectedCanvasElementId,
    updateCanvasElement,
    canvasMode,
  } = useStudioStore();

  const isSelected = isDesignMode && selectedCanvasElementId === element.id;

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: element.x, y: element.y });
  const [initialSize, setInitialSize] = useState({ width: element.width, height: element.height });

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDesignMode) return;
    const target = e.target as HTMLElement;
    if (
      target.isContentEditable ||
      target.closest("[contenteditable='true']") ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "BUTTON" ||
      target.closest("button") ||
      target.tagName === "A" ||
      target.closest("a") ||
      target.closest(".nodrag")
    ) {
      setSelectedCanvasElementId(element.id);
      return;
    }

    e.stopPropagation();
    setSelectedCanvasElementId(element.id);

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos({ x: element.x, y: element.y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isDesignMode || e.touches.length !== 1) return;
    const target = e.target as HTMLElement;
    if (
      target.isContentEditable ||
      target.closest("[contenteditable='true']") ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "BUTTON" ||
      target.closest("button")
    ) {
      setSelectedCanvasElementId(element.id);
      return;
    }

    e.stopPropagation();
    setSelectedCanvasElementId(element.id);

    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setInitialPos({ x: element.x, y: element.y });
  };

  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    if (!isDesignMode) return;
    e.stopPropagation();
    setSelectedCanvasElementId(element.id);
    setIsResizing(handle);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos({ x: element.x, y: element.y });
    setInitialSize({ width: element.width, height: element.height });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        updateCanvasElement(element.id, {
          x: Math.max(0, initialPos.x + dx),
          y: Math.max(0, initialPos.y + dy),
        });
      } else if (isResizing) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;

        if (isResizing.includes("e")) {
          updateCanvasElement(element.id, { width: Math.max(80, initialSize.width + dx) });
        }
        if (isResizing.includes("s")) {
          updateCanvasElement(element.id, { height: Math.max(40, initialSize.height + dy) });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, initialPos, initialSize, element.id, updateCanvasElement]);

  if (element.isHidden) return null;

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: "relative",
        width: element.width ? `${element.width}px` : "100%",
        height: element.height ? `${element.height}px` : "auto",
        zIndex: element.zIndex || 10,
      }}
      className={`group transition-all ${
        isDesignMode ? "cursor-move hover:outline-2 hover:outline-dashed hover:outline-[#2563EB]" : ""
      } ${isSelected ? "outline-2 outline-[#2563EB] shadow-xl" : ""}`}
    >
      {/* Design Mode Overlay Handles */}
      {isSelected && isDesignMode && (
        <>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 z-30 shadow-md">
            <Move className="w-3 h-3" />
            <span>
              {element.type.toUpperCase()} ({element.id})
            </span>
          </div>

          {/* Resizers */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "se")}
            className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-[#2563EB] border-2 border-white rounded-full cursor-se-resize z-30 shadow-md"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, "e")}
            className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#2563EB] border-2 border-white rounded-full cursor-e-resize z-30"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, "s")}
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2563EB] border-2 border-white rounded-full cursor-s-resize z-30"
          />
        </>
      )}

      {/* Render Subcomponents based on element.type */}
      {element.type === "button" && (
        <ButtonCanvasElement element={element} onExecuteAction={onExecuteAction} />
      )}

      {element.type === "card" && <CardCanvasElement element={element} />}

      {element.type === "module_template" && <ModuleCanvasElement element={element} />}

      {(element.type === "shape" || element.type === "line" || element.type === "graphic") && (
        <UIComponentCanvasElement element={element} />
      )}

      {element.type === "mockup" && <MockupCanvasElement element={element} />}

      {element.type === "text" && <TextCanvasElement element={element} />}

      {element.type === "image" && <ImageCanvasElement element={element} />}

      {element.type !== "button" &&
        element.type !== "card" &&
        element.type !== "module_template" &&
        element.type !== "shape" &&
        element.type !== "line" &&
        element.type !== "graphic" &&
        element.type !== "mockup" &&
        element.type !== "text" &&
        element.type !== "image" && <CardCanvasElement element={element} />}
    </div>
  );
};
