"use client";

import React from "react";
import { useStudioStore, ButtonActionConfig } from "@/store/useStudioStore";
import { CanvaSidebar } from "@/components/studio/CanvaSidebar";
import { StudioToolbar } from "@/components/studio/StudioToolbar";
import { ElementInspectorBar } from "@/components/studio/ElementInspectorBar";
import { CanvasElementWrapper } from "@/components/studio/CanvasElementWrapper";
import { useCanvasDrawing } from "@/hooks/useCanvasDrawing";
import { executeButtonAction } from "@/lib/actionDispatcher";

interface StudioLayoutProps {
  children: React.ReactNode;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ children }) => {
  const {
    isDesignMode,
    canvasElements,
    setSelectedCanvasElementId,
    setActiveTabForCard,
    toggleElementVisibility,
    activeDrawingTool,
    addCanvasElementAtPosition,
  } = useStudioStore();

  const {
    isDrawing,
    currentBox,
    handleCanvasMouseDown,
  } = useCanvasDrawing();

  const handleExecuteAction = (actionConfig: ButtonActionConfig) => {
    executeButtonAction(actionConfig, {
      setActiveTabForCard,
      toggleElementVisibility,
    });
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    if (!isDesignMode) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    if (!isDesignMode) return;
    e.preventDefault();
    const rawData = e.dataTransfer.getData("application/json");
    if (!rawData) return;

    try {
      const data = JSON.parse(rawData);
      const canvasEl = document.getElementById("studio-canvas");
      if (!canvasEl) return;

      const rect = canvasEl.getBoundingClientRect();
      const dropX = e.clientX - rect.left - (data.width ? data.width / 2 : 120);
      const dropY = canvasEl.scrollTop + (e.clientY - rect.top) - (data.height ? data.height / 2 : 40);

      addCanvasElementAtPosition({
        ...data,
        x: Math.max(10, Math.round(dropX)),
        y: Math.max(10, Math.round(dropY)),
      });
    } catch (err) {
      console.error("Error dropping element on canvas:", err);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 font-sans">
      {/* Design Studio Left Sidebar */}
      {isDesignMode && <CanvaSidebar />}

      <main className="flex-1 h-full flex flex-col relative overflow-hidden bg-[#F4F4F5]">
        {/* Top Control Toolbar & Inspector Bar */}
        {isDesignMode && (
          <div className="shrink-0 flex flex-col z-30">
            <StudioToolbar />
            <ElementInspectorBar />
          </div>
        )}

        {/* Scrollable Viewport Canvas */}
        <div
          id="studio-canvas"
          onMouseDown={handleCanvasMouseDown}
          onDragOver={handleCanvasDragOver}
          onDrop={handleCanvasDrop}
          onClick={(e) => {
            if (e.target === e.currentTarget && isDesignMode) {
              setSelectedCanvasElementId(null);
            }
          }}
          className={`flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth ${
            isDesignMode && activeDrawingTool ? "cursor-crosshair" : ""
          }`}
        >
          <div className="relative min-h-full w-full">
            {/* Base Document Content */}
            <div className="relative z-10">{children}</div>

            {/* Absolute Drag & Drop Canvas Elements Layer */}
            <div className="absolute inset-0 pointer-events-none z-30">
              {canvasElements.map((el) => (
                <div
                  key={el.id}
                  className="pointer-events-auto absolute"
                  style={{ left: `${el.x}px`, top: `${el.y}px` }}
                >
                  <CanvasElementWrapper element={el} onExecuteAction={handleExecuteAction} />
                </div>
              ))}

              {/* Active PPTX/Figma Drawing Rectangle Box */}
              {isDrawing && currentBox && (
                <div
                  style={{
                    left: `${currentBox.x}px`,
                    top: `${currentBox.y}px`,
                    width: `${currentBox.width}px`,
                    height: `${currentBox.height}px`,
                  }}
                  className="absolute border-2 border-dashed border-[#2563EB] bg-[#2563EB]/25 rounded-xl pointer-events-none z-50 transition-none shadow-xl"
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
