"use client";

import { useState, useEffect } from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { toast } from "sonner";

export interface DrawingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useCanvasDrawing() {
  const {
    isDesignMode,
    toggleDesignMode,
    activeDrawingTool,
    setActiveDrawingTool,
    addCanvasElementAtPosition,
  } = useStudioStore();

  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [currentBox, setCurrentBox] = useState<DrawingBox | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeDrawingTool) {
        setActiveDrawingTool(null);
        setIsDrawing(false);
        setDrawStart(null);
        setCurrentBox(null);
        toast.info("Modo de dibujo de recuadro cancelado.");
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        toggleDesignMode();
        toast.info(
          !isDesignMode
            ? "🎨 Design Studio Canva/Figma Activo (Ctrl+Shift+E para salir)"
            : "👀 Vista Ejecutiva Cliente Activa"
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDesignMode, toggleDesignMode, activeDrawingTool, setActiveDrawingTool]);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (!isDesignMode || !activeDrawingTool) return;
    const canvasEl = document.getElementById("studio-canvas");
    if (!canvasEl) return;

    const rect = canvasEl.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = canvasEl.scrollTop + (e.clientY - rect.top);

    setIsDrawing(true);
    setDrawStart({ x: startX, y: startY });
    setCurrentBox({ x: startX, y: startY, width: 0, height: 0 });
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !drawStart) return;
    const canvasEl = document.getElementById("studio-canvas");
    if (!canvasEl) return;

    const rect = canvasEl.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = canvasEl.scrollTop + (e.clientY - rect.top);

    const x = Math.min(drawStart.x, currentX);
    const y = Math.min(drawStart.y, currentY);
    const width = Math.abs(currentX - drawStart.x);
    const height = Math.abs(currentY - drawStart.y);

    setCurrentBox({ x, y, width, height });
  };

  const handleCanvasMouseUp = () => {
    if (!isDrawing || !currentBox || !activeDrawingTool) return;

    const finalWidth = Math.max(currentBox.width, 180);
    const finalHeight = Math.max(currentBox.height, 60);

    const newId = addCanvasElementAtPosition({
      ...activeDrawingTool,
      x: currentBox.x,
      y: currentBox.y,
      width: finalWidth,
      height: finalHeight,
    });

    toast.success(`Elemento (${newId}) dibujado e insertado.`);
    setIsDrawing(false);
    setDrawStart(null);
    setCurrentBox(null);
    setActiveDrawingTool(null);
  };

  return {
    isDrawing,
    currentBox,
    handleCanvasMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
  };
}
