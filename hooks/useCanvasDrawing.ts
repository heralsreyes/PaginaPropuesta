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
    activeDrawingTool,
    setActiveDrawingTool,
    addCanvasElementAtPosition,
  } = useStudioStore();

  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [currentBox, setCurrentBox] = useState<DrawingBox | null>(null);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeDrawingTool) {
        setActiveDrawingTool(null);
        setIsDrawing(false);
        setDrawStart(null);
        setCurrentBox(null);
        toast.info("Modo de dibujo de recuadro cancelado.");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDrawingTool, setActiveDrawingTool]);

  // Window mousemove and mouseup listeners when drawing is active
  useEffect(() => {
    if (!isDrawing || !drawStart || !activeDrawingTool) return;

    const onMove = (e: MouseEvent) => {
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

    const onUp = () => {
      if (!currentBox) {
        setIsDrawing(false);
        setDrawStart(null);
        return;
      }

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

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDrawing, drawStart, currentBox, activeDrawingTool, addCanvasElementAtPosition, setActiveDrawingTool]);

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

  return {
    isDrawing,
    currentBox,
    handleCanvasMouseDown,
  };
}

