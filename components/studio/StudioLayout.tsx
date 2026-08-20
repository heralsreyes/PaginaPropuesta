"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
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
  } = useStudioStore();

  const {
    isDrawing,
    currentBox,
    handleCanvasMouseDown,
    handleCanvasMouseMove,
    handleCanvasMouseUp,
  } = useCanvasDrawing();

  const handleExecuteAction = (actionConfig: any) => {
    executeButtonAction(actionConfig, {
      setActiveTabForCard,
      toggleElementVisibility,
    });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-950 font-sans select-none">
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
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onClick={(e) => {
            if (e.target === e.currentTarget && isDesignMode) {
              setSelectedCanvasElementId(null);
            }
          }}
          className={`flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth ${
            isDesignMode && activeDrawingTool ? "cursor-crosshair" : ""
          }`}
        >
          {/* Base Document Content */}
          <div className="relative z-10">{children}</div>

          {/* Absolute Drag & Drop Canvas Elements Layer */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {canvasElements.map((el) => (
              <div key={el.id} className="pointer-events-auto absolute" style={{ left: el.x, top: el.y }}>
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
                className="absolute border-2 border-dashed border-[#2563EB] bg-[#2563EB]/15 rounded-xl pointer-events-none z-40 transition-all"
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
