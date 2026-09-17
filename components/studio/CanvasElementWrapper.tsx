"use client";

import React, { useState, useRef, useEffect } from "react";
import { CanvasElement, ButtonActionConfig } from "@/types/studio";
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
  onExecuteAction?: (config: ButtonActionConfig) => void;
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
  const [isPinching, setIsPinching] = useState(false);
  const [initialPinchDist, setInitialPinchDist] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: element.x, y: element.y });
  const [initialSize, setInitialSize] = useState({ width: element.width || 300, height: element.height || 180 });

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
    if (!isDesignMode) return;

    // 1. Two-finger pinch gesture to resize & stretch
    if (e.touches.length === 2) {
      e.stopPropagation();
      setSelectedCanvasElementId(element.id);
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      setIsPinching(true);
      setIsDragging(false);
      setIsResizing(null);
      setInitialPinchDist(dist);
      setInitialSize({ width: element.width || 300, height: element.height || 180 });
      return;
    }

    // 2. Single-finger drag
    if (e.touches.length !== 1) return;
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
    setInitialSize({ width: element.width || 300, height: element.height || 180 });
  };

  const handleResizeTouchStart = (e: React.TouchEvent, handle: string) => {
    if (!isDesignMode || e.touches.length !== 1) return;
    e.stopPropagation();
    setSelectedCanvasElementId(element.id);
    setIsResizing(handle);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setInitialPos({ x: element.x, y: element.y });
    setInitialSize({ width: element.width || 300, height: element.height || 180 });
  };

  // Trackpad pinch gesture (wheel with ctrlKey)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !isSelected || !isDesignMode) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        const factor = e.deltaY < 0 ? 1.05 : 0.95;
        const currentWidth = element.width || 300;
        const currentHeight = element.height || 180;
        const newWidth = Math.max(60, Math.round(currentWidth * factor));
        const newHeight = Math.max(30, Math.round(currentHeight * factor));
        updateCanvasElement(element.id, { width: newWidth, height: newHeight });
      }
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", handleWheel);
  }, [isSelected, isDesignMode, element.id, element.width, element.height, updateCanvasElement]);

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
          updateCanvasElement(element.id, { width: Math.max(60, initialSize.width + dx) });
        }
        if (isResizing.includes("s")) {
          updateCanvasElement(element.id, { height: Math.max(30, initialSize.height + dy) });
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isPinching && e.touches.length === 2 && initialPinchDist > 0) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const factor = dist / initialPinchDist;
        const newWidth = Math.max(60, Math.round(initialSize.width * factor));
        const newHeight = Math.max(30, Math.round(initialSize.height * factor));
        updateCanvasElement(element.id, { width: newWidth, height: newHeight });
        return;
      }

      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      if (isDragging) {
        const dx = touch.clientX - dragStart.x;
        const dy = touch.clientY - dragStart.y;
        updateCanvasElement(element.id, {
          x: Math.max(0, initialPos.x + dx),
          y: Math.max(0, initialPos.y + dy),
        });
      } else if (isResizing) {
        const dx = touch.clientX - dragStart.x;
        const dy = touch.clientY - dragStart.y;

        if (isResizing.includes("e")) {
          updateCanvasElement(element.id, { width: Math.max(60, initialSize.width + dx) });
        }
        if (isResizing.includes("s")) {
          updateCanvasElement(element.id, { height: Math.max(30, initialSize.height + dy) });
        }
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setIsResizing(null);
      setIsPinching(false);
    };

    if (isDragging || isResizing || isPinching) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, isResizing, isPinching, initialPinchDist, dragStart, initialPos, initialSize, element.id, updateCanvasElement]);

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
          {/* Floating Label placed strictly ABOVE the element */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#2563EB] text-white px-2 py-0.5 rounded-md text-[9px] font-mono font-bold flex items-center gap-1 z-40 shadow-xl whitespace-nowrap pointer-events-none">
            <Move className="w-2.5 h-2.5" />
            <span>
              {element.type.toUpperCase()} ({element.id}) • Pellizca o estira
            </span>
          </div>

          {/* Full Right Edge Drag Bar (Arrastrar borde derecho para estirar ancho) */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "e")}
            onTouchStart={(e) => handleResizeTouchStart(e, "e")}
            className="absolute top-0 -right-2 w-3.5 h-full cursor-ew-resize hover:bg-[#2563EB]/40 rounded-r-md transition-colors z-30"
            title="Haz clic y arrastra este borde para estirar el ancho"
          />

          {/* Full Bottom Edge Drag Bar (Arrastrar borde inferior para estirar alto) */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "s")}
            onTouchStart={(e) => handleResizeTouchStart(e, "s")}
            className="absolute -bottom-2 left-0 w-full h-3.5 cursor-ns-resize hover:bg-[#2563EB]/40 rounded-b-md transition-colors z-30"
            title="Haz clic y arrastra este borde para estirar el alto"
          />

          {/* Corner Resizer - Southeast (Bottom Right) */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "se")}
            onTouchStart={(e) => handleResizeTouchStart(e, "se")}
            className="absolute -bottom-2.5 -right-2.5 w-5 h-5 bg-[#2563EB] border-2 border-white rounded-full cursor-se-resize z-40 shadow-lg hover:scale-125 transition-transform flex items-center justify-center"
            title="Pellizca o arrastra la esquina para estirar tamaño"
          />

          {/* Edge Resizer - East Handle Indicator */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "e")}
            onTouchStart={(e) => handleResizeTouchStart(e, "e")}
            className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-8 bg-[#2563EB] border-2 border-white rounded-full cursor-ew-resize z-40 shadow-md hover:scale-125 transition-transform flex items-center justify-center pointer-events-auto"
            title="Arrastra para estirar ancho"
          >
            <div className="w-0.5 h-3 bg-white rounded-full" />
          </div>

          {/* Edge Resizer - South Handle Indicator */}
          <div
            onMouseDown={(e) => handleResizeStart(e, "s")}
            onTouchStart={(e) => handleResizeTouchStart(e, "s")}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#2563EB] border-2 border-white rounded-full cursor-ns-resize z-40 shadow-md hover:scale-125 transition-transform flex items-center justify-center pointer-events-auto"
            title="Arrastra para estirar alto"
          >
            <div className="w-3 h-0.5 bg-white rounded-full" />
          </div>
        </>
      )}

      {/* Render Subcomponents based on element.type */}
      {element.type === "button" ? (
        <ButtonCanvasElement element={element} onExecuteAction={onExecuteAction} />
      ) : element.type === "card" ? (
        <CardCanvasElement element={element} />
      ) : element.type === "module_template" ? (
        <ModuleCanvasElement element={element} />
      ) : element.type === "shape" ||
        element.type === "line" ||
        element.type === "graphic" ||
        element.type === "icon" ? (
        <UIComponentCanvasElement element={element} />
      ) : element.type === "mockup" ? (
        <MockupCanvasElement element={element} />
      ) : element.type === "text" ? (
        <TextCanvasElement element={element} />
      ) : element.type === "image" ? (
        <ImageCanvasElement element={element} />
      ) : (
        <CardCanvasElement element={element} />
      )}
    </div>
  );
};
