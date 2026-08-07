"use client";

import React, { useEffect } from "react";
import { useStudioStore, ButtonActionConfig } from "@/store/useStudioStore";
import { CanvaSidebar } from "@/components/studio/CanvaSidebar";
import { StudioToolbar } from "@/components/studio/StudioToolbar";
import { ElementInspectorBar } from "@/components/studio/ElementInspectorBar";
import { CanvasElementWrapper } from "@/components/studio/CanvasElementWrapper";
import { useProposal } from "@/context/ProposalContext";
import { toast } from "sonner";

interface StudioLayoutProps {
  children: React.ReactNode;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ children }) => {
  const {
    isDesignMode,
    toggleDesignMode,
    canvasElements,
    setSelectedCanvasElementId,
    addCanvasElementAtPosition,
    setActiveTabForCard,
    toggleElementVisibility,
  } = useStudioStore();

  const { exportJson, resetToDefault } = useProposal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [isDesignMode, toggleDesignMode]);

  // Execute button action assigned to target card ID or section
  const handleExecuteButtonAction = (config: ButtonActionConfig) => {
    if (!config) return;

    // 1. CHANGE TAB ACTION
    if (config.type === "CHANGE_TAB") {
      if (config.targetId && config.payload) {
        setActiveTabForCard(config.targetId, config.payload);
      }
      const targetEl = document.getElementById(config.targetId);
      const canvasContainer = document.getElementById("studio-canvas");
      if (targetEl && canvasContainer) {
        canvasContainer.scrollTo({
          top: targetEl.offsetTop - 100,
          behavior: "smooth",
        });
      }
      toast.success(`Pestaña '${config.payload || "activa"}' activada en tarjeta '${config.targetId}'.`);
    }

    // 2. NEXT TAB (CAROUSEL) ACTION
    else if (config.type === "NEXT_TAB") {
      const targetObj = canvasElements.find((e) => e.id === config.targetId);
      if (targetObj && targetObj.tabs && targetObj.tabs.length > 0) {
        const currentIdx = targetObj.tabs.findIndex(
          (t) => t.id === targetObj.activeTabId
        );
        const nextIdx = (currentIdx + 1) % targetObj.tabs.length;
        const nextTab = targetObj.tabs[nextIdx];
        setActiveTabForCard(config.targetId, nextTab.id);
        toast.success(`Carrusel: Cambiado a Pestaña '${nextTab.label}'.`);
      } else {
        toast.info(`La tarjeta '${config.targetId}' no tiene múltiples pestañas asignadas.`);
      }
    }

    // 3. TOGGLE VISIBILITY ACTION (WORKS ON BOTH CANVAS ELEMENTS & DOM SECTIONS/CARDS)
    else if (config.type === "TOGGLE_VISIBILITY") {
      if (config.targetId) {
        // Toggle canvas element state in Zustand store
        const canvasObj = canvasElements.find((e) => e.id === config.targetId);
        if (canvasObj) {
          toggleElementVisibility(config.targetId);
          toast.success(
            `Visibilidad del elemento '${config.targetId}' alternada (${
              canvasObj.isHidden ? "Mostrado" : "Oculto"
            }).`
          );
        }

        // Toggle DOM element style if present on proposal HTML
        const domEl = document.getElementById(config.targetId);
        if (domEl) {
          if (domEl.style.display === "none") {
            domEl.style.display = "";
            toast.success(`Elemento HTML #${config.targetId} MOSTRADO.`);
          } else {
            domEl.style.display = "none";
            toast.success(`Elemento HTML #${config.targetId} OCULTADO.`);
          }
        }
      }
    }

    // 4. NAVIGATE SECTION ACTION
    else if (config.type === "NAVIGATE_SECTION") {
      const sectionId = config.payload || "alcance";
      const targetSec = document.getElementById(sectionId);
      const canvasContainer = document.getElementById("studio-canvas");
      if (targetSec && canvasContainer) {
        canvasContainer.scrollTo({
          top: targetSec.offsetTop,
          behavior: "smooth",
        });
        toast.success(`Navegando a la sección #${sectionId}.`);
      } else {
        toast.info(`Sección #${sectionId} alcanzada.`);
      }
    }

    // 5. SYSTEM TRIGGER ACTION
    else if (config.type === "SYSTEM_TRIGGER") {
      const trigger = config.payload || "PRINT_PDF";
      if (trigger === "PRINT_PDF") {
        toast.info("Generando vista de impresión PDF (8 páginas)...");
        setTimeout(() => window.print(), 300);
      } else if (trigger === "ACCEPT_MODAL") {
        toast.success("Abriendo modal de aceptación de propuesta.");
      } else if (trigger === "EXPORT_JSON") {
        exportJson();
      } else if (trigger === "TOGGLE_MODE") {
        toggleDesignMode();
      } else if (trigger === "RESET") {
        resetToDefault();
      }
    }
  };

  // Drag & Drop handlers for inserting elements directly on canvas at drop position
  const handleDragOver = (e: React.DragEvent) => {
    if (!isDesignMode) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent) => {
    if (!isDesignMode) return;
    e.preventDefault();
    const rawData = e.dataTransfer.getData("application/json");
    if (!rawData) return;

    try {
      const itemData = JSON.parse(rawData);
      const canvasEl = document.getElementById("studio-canvas");
      if (!canvasEl) return;

      const rect = canvasEl.getBoundingClientRect();
      const dropX = e.clientX - rect.left;
      const dropY = canvasEl.scrollTop + (e.clientY - rect.top);

      const newId = addCanvasElementAtPosition({
        ...itemData,
        x: Math.max(10, dropX - 70),
        y: Math.max(10, dropY - 20),
      });

      toast.success(`Elemento (${newId}) soltado en el lienzo.`);
    } catch (err) {
      console.error("Drop error parsing data", err);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--bg-main)] font-sans">
      {/* Left Sidebar: Fixed Width & Non-Shrinkable Flex Child */}
      {isDesignMode && <CanvaSidebar />}

      {/* Right Canvas: Single Master Scroll Container with Drag & Drop */}
      <main
        id="studio-canvas"
        onClick={() => {
          if (isDesignMode) setSelectedCanvasElementId(null);
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth relative bg-[var(--bg-main)] transition-all duration-300"
      >
        {/* Top Floating / Sticky Toolbar */}
        {isDesignMode && <StudioToolbar />}

        {/* Floating Figma Inspector Bar for Selected Element */}
        <ElementInspectorBar />

        {/* Dynamic Canvas Elements Layer */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {canvasElements.map((element) => {
            return (
              <div
                key={element.id}
                className="pointer-events-auto"
              >
                <CanvasElementWrapper
                  element={element}
                  onExecuteAction={handleExecuteButtonAction}
                />
              </div>
            );
          })}
        </div>

        {/* Proposal Sections Canvas Container */}
        <div className="w-full box-border relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};
