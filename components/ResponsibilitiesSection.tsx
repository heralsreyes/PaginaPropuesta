"use client";

import React, { useState, useEffect, useRef } from "react";
import { useProposal } from "@/context/ProposalContext";
import { useStudioStore } from "@/store/useStudioStore";
import { EditableText } from "@/components/studio/EditableText";
import { EditableField } from "@/components/ui/EditableField";
import { Check, ShieldCheck, Award, Server, Plus, ChevronLeft, ChevronRight, Trash2, Smartphone, Monitor, Maximize2, Minimize2, EyeOff, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryCard {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  items: string[];
}

interface ResponsibilitiesSectionProps {
  clientResponsibilities: string[];
  enfocoResponsibilities: string[];
  guaranteePeriod: string;
}

export const ResponsibilitiesSection: React.FC<ResponsibilitiesSectionProps> = ({
  clientResponsibilities,
  enfocoResponsibilities,
  guaranteePeriod,
}) => {
  const { currentSlug, updateProject, updateEnfocoResponsibilities, updateClientResponsibilities } = useProposal();
  const { isDesignMode } = useStudioStore();

  // Storage key for multiple stories list scoped by current proposal
  const STORAGE_KEY = `enfoco_user_stories_${currentSlug || "default"}`;
  const COTEJO_KEY = `enfoco_hidden_cotejo_icons_${currentSlug || "default"}`;

  const [stories, setStories] = useState<StoryCard[]>(() => {
    // Default initial stories from existing responsibilities
    return [
      {
        id: "hu-01",
        code: "HU01",
        title: "Cuestionario, calificación y recomendación de combinación de productos en Asesor en Línea",
        subtitle: "Proveedor Tecnológico",
        items:
          enfocoResponsibilities && enfocoResponsibilities.length > 0
            ? enfocoResponsibilities
            : [
                "Como cliente PYME Quiero responder un cuestionario en Asesor en Línea y recibir una recomendación de productos IZI PYMES Para identificar una propuesta de protección adecuada a las características de mi negocio.",
                "Debe mostrar un cuestionario orientado a perfilar la necesidad del cliente PYME.",
                "Debe capturar y almacenar las respuestas asociadas al caso o lead.",
                "Para un cliente nuevo, debe permitir continuar con la recomendación.",
                "La identificación de un cliente existente no debe modificar automáticamente primas ni condiciones.",
              ],
      },
      {
        id: "hu-02",
        code: "HU02",
        title: "Armado y presentación de propuesta IZI PYMES en OFV",
        subtitle: "Contraparte Operativa",
        items:
          clientResponsibilities && clientResponsibilities.length > 0
            ? clientResponsibilities
            : [
                "Como intermediario Quiero seleccionar las cotizaciones y productos elegibles de un mismo cliente y presentarlos dentro de una propuesta IZI PYMES.",
                "Debe permitir iniciar el armado de la propuesta desde una cotización en OFV mediante una acción como 'Armar IZI PYMES'.",
                "Debe validar que las cotizaciones y productos seleccionados correspondan al mismo RNC o cliente elegible.",
                "Las cotizaciones seleccionadas deben conservar su número, vigencia, monto, producto y core de origen.",
              ],
      },
    ];
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showGuaranteeBanner, setShowGuaranteeBanner] = useState<boolean>(true);
  const [stretchedStoryId, setStretchedStoryId] = useState<string | null>(null);

  const [touchStoryPinchDist, setTouchStoryPinchDist] = useState<number | null>(null);

  const handleStoryTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStoryPinchDist(dist);
    }
  };

  const handleStoryTouchMove = (e: React.TouchEvent, storyId: string, isStretched: boolean) => {
    if (e.touches.length === 2 && touchStoryPinchDist !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const diff = dist - touchStoryPinchDist;
      if (diff > 35 && !isStretched) {
        setStretchedStoryId(storyId);
        setTouchStoryPinchDist(dist);
      } else if (diff < -35 && isStretched) {
        setStretchedStoryId(null);
        setTouchStoryPinchDist(dist);
      }
    }
  };

  const handleStoryTouchEnd = () => {
    setTouchStoryPinchDist(null);
  };

  const handleStoryWheel = (e: React.WheelEvent, storyId: string, isStretched: boolean) => {
    if (e.ctrlKey) {
      if (e.deltaY < -15 && !isStretched) {
        setStretchedStoryId(storyId);
      } else if (e.deltaY > 15 && isStretched) {
        setStretchedStoryId(null);
      }
    }
  };

  // Persistence for hidden checkmark (cotejo) icons
  const [hiddenCotejoIcons, setHiddenCotejoIcons] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(COTEJO_KEY) || localStorage.getItem("enfoco_hidden_cotejo_icons");
        if (saved) {
          setHiddenCotejoIcons(JSON.parse(saved));
        } else {
          setHiddenCotejoIcons({});
        }
      } catch {
        setHiddenCotejoIcons({});
      }
    }
  }, [COTEJO_KEY]);

  const toggleCotejoIcon = (itemKey: string) => {
    setHiddenCotejoIcons((prev) => {
      const next = { ...prev, [itemKey]: !prev[itemKey] };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(COTEJO_KEY, JSON.stringify(next));
          localStorage.setItem("enfoco_hidden_cotejo_icons", JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  };

  const toggleAllIconsInStory = (storyId: string, itemsCount: number) => {
    setHiddenCotejoIcons((prev) => {
      const allHidden = Array.from({ length: itemsCount }).every((_, idx) => prev[`${storyId}_item_${idx}`]);
      const next = { ...prev };
      for (let i = 0; i < itemsCount; i++) {
        next[`${storyId}_item_${i}`] = !allHidden;
      }
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(COTEJO_KEY, JSON.stringify(next));
          localStorage.setItem("enfoco_hidden_cotejo_icons", JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  };

  // Load persisted stories from localStorage if available, or initialize from proposal
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setStories(parsed);
            return;
          }
        }
        const savedBanner = localStorage.getItem("enfoco_show_guarantee_banner");
        if (savedBanner !== null) {
          setShowGuaranteeBanner(savedBanner === "true");
        }
      } catch (e) {
        console.warn("Error loading stories:", e);
      }
    }

    setStories([
      {
        id: "hu-01",
        code: "HU01",
        title: "Cuestionario, calificación y recomendación de combinación de productos en Asesor en Línea",
        subtitle: "Proveedor Tecnológico",
        items:
          enfocoResponsibilities && enfocoResponsibilities.length > 0
            ? enfocoResponsibilities
            : [
                "Como cliente PYME Quiero responder un cuestionario en Asesor en Línea y recibir una recomendación de productos IZI PYMES Para identificar una propuesta de protección adecuada a las características de mi negocio.",
                "Debe mostrar un cuestionario orientado a perfilar la necesidad del cliente PYME.",
                "Debe capturar y almacenar las respuestas asociadas al caso o lead.",
                "Para un cliente nuevo, debe permitir continuar con la recomendación.",
                "La identificación de un cliente existente no debe modificar automáticamente primas ni condiciones.",
              ],
      },
      {
        id: "hu-02",
        code: "HU02",
        title: "Armado y presentación de propuesta IZI PYMES en OFV",
        subtitle: "Contraparte Operativa",
        items:
          clientResponsibilities && clientResponsibilities.length > 0
            ? clientResponsibilities
            : [
                "Como intermediario Quiero seleccionar las cotizaciones y productos elegibles de un mismo cliente y presentarlos dentro de una propuesta IZI PYMES.",
                "Debe permitir iniciar el armado de la propuesta desde una cotización en OFV mediante una acción como 'Armar IZI PYMES'.",
                "Debe validar que las cotizaciones y productos seleccionados correspondan al mismo RNC o cliente elegible.",
                "Las cotizaciones seleccionadas deben conservar su número, vigencia, monto, producto y core de origen.",
              ],
      },
    ]);
  }, [currentSlug, enfocoResponsibilities, clientResponsibilities, STORAGE_KEY]);

  const saveStories = (newStories: StoryCard[]) => {
    setStories(newStories);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newStories));
        localStorage.setItem("enfoco_user_stories_v1", JSON.stringify(newStories));
      } catch (e) {
        console.warn("Error saving stories:", e);
      }
    }
    // Sync with proposal context for first two cards if modified
    if (newStories.length > 0) {
      updateEnfocoResponsibilities(newStories[0].items);
    }
    if (newStories.length > 1) {
      updateClientResponsibilities(newStories[1].items);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 2));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 2 < stories.length ? prev + 2 : prev));
  };

  const handleAddStory = () => {
    const nextNum = stories.length + 1;
    const formattedCode = `HU${nextNum < 10 ? "0" + nextNum : nextNum}`;
    const newStory: StoryCard = {
      id: `hu-${Date.now()}`,
      code: formattedCode,
      title: `Historia de Usuario ${nextNum}: Descripción Funcional`,
      subtitle: "Especificación Ágil",
      items: [
        "Como usuario Quiero ejecutar esta funcionalidad Para obtener el valor comercial esperado.",
        "Criterio de aceptación inicial certificado bajo estándares ISO / CMMI.",
      ],
    };
    const updated = [...stories, newStory];
    saveStories(updated);
    // Jump to page containing the new story
    const newPageIdx = Math.floor((updated.length - 1) / 2) * 2;
    setCurrentIndex(newPageIdx);
  };

  const handleDeleteStory = (storyIndex: number) => {
    if (stories.length <= 1) return;
    const updated = stories.filter((_, idx) => idx !== storyIndex);
    saveStories(updated);
    if (currentIndex >= updated.length) {
      setCurrentIndex(Math.max(0, updated.length - 2));
    }
  };

  const handleAddCotejo = (storyIndex: number) => {
    const updated = [...stories];
    const story = { ...updated[storyIndex] };
    story.items = [...story.items, "Nuevo criterio o funcionalidad verificada."];
    updated[storyIndex] = story;
    saveStories(updated);
  };

  const handleDeleteCotejo = (storyIndex: number, itemIndex: number) => {
    const updated = [...stories];
    const story = { ...updated[storyIndex] };
    if (story.items.length <= 1) return;
    story.items = story.items.filter((_, idx) => idx !== itemIndex);
    updated[storyIndex] = story;
    saveStories(updated);
  };

  const handleUpdateCotejo = (storyIndex: number, itemIndex: number, text: string) => {
    const updated = [...stories];
    const story = { ...updated[storyIndex] };
    story.items = [...story.items];
    story.items[itemIndex] = text;
    updated[storyIndex] = story;
    saveStories(updated);
  };

  const handleUpdateStoryTitle = (storyIndex: number, title: string) => {
    const updated = [...stories];
    updated[storyIndex] = { ...updated[storyIndex], title };
    saveStories(updated);
  };

  const handleUpdateStorySubtitle = (storyIndex: number, subtitle: string) => {
    const updated = [...stories];
    updated[storyIndex] = { ...updated[storyIndex], subtitle };
    saveStories(updated);
  };

  const visibleStories = stretchedStoryId
    ? stories.filter((s) => s.id === stretchedStoryId)
    : stories.slice(currentIndex, currentIndex + 2);
  const totalPages = Math.ceil(stories.length / 2);
  const currentPageNum = Math.floor(currentIndex / 2) + 1;

  return (
    <section
      id="responsabilidades"
      className="min-h-screen w-full flex flex-col justify-start items-center relative overflow-hidden bg-[var(--bg-main)] border-t border-[var(--border-color)] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-6xl mx-auto w-full flex flex-col justify-start py-2"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3.5 py-1 rounded-full border border-[var(--accent-color)]/30">
            <EditableField id="resp_header_badge" defaultText="ACUERDO DE SERVICIO & GARANTÍA" />
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[var(--h2-color)] mt-2 mb-1">
            <EditableField id="resp_header_h2" defaultText="Matriz de Responsabilidades & Garantía" />
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            <EditableField id="resp_header_desc" defaultText="Delimitación clara de compromisos recíprocos para asegurar la entrega en tiempos y estándares acordados." />
          </p>
        </div>

        {/* Carousel Controls Bar */}
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3 py-1 rounded-full border border-[var(--accent-color)]/30">
              {stretchedStoryId
                ? `Vista Estirada (Ancho Completo)`
                : stories.length > 2
                ? `Historias ${currentIndex + 1}-${Math.min(currentIndex + 2, stories.length)} de ${stories.length}`
                : `${stories.length} Historias`}
            </span>
            {stretchedStoryId && (
              <button
                type="button"
                onClick={() => setStretchedStoryId(null)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer ml-1 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg border border-amber-300/40"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Restaurar vista 2 columnas</span>
              </button>
            )}
            {isDesignMode && !stretchedStoryId && (
              <button
                type="button"
                onClick={handleAddStory}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer ml-1"
                title="Añadir una nueva historia de usuario"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Historia</span>
              </button>
            )}
          </div>

          {/* Carousel Arrows */}
          {!stretchedStoryId && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  currentIndex === 0
                    ? "opacity-30 border-transparent text-zinc-400 cursor-not-allowed"
                    : "bg-[var(--card-bg)] text-[var(--accent-color)] border-[var(--border-color)] hover:border-[var(--accent-color)] shadow-xs hover:scale-105 active:scale-95"
                }`}
                title="Desplazar historias hacia la derecha (Anteriores)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-[var(--text-primary)]/70 px-1 font-semibold">
                {currentPageNum} / {totalPages || 1}
              </span>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex + 2 >= stories.length}
                className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  currentIndex + 2 >= stories.length
                    ? "opacity-30 border-transparent text-zinc-400 cursor-not-allowed"
                    : "bg-[var(--card-bg)] text-[var(--accent-color)] border-[var(--border-color)] hover:border-[var(--accent-color)] shadow-xs hover:scale-105 active:scale-95"
                }`}
                title="Desplazar historias hacia la izquierda (Siguientes)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Stories Horizontal Slider Cards (Animated with Framer Motion) */}
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={stretchedStoryId || currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className={`grid gap-5 w-full items-stretch ${
                stretchedStoryId ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              {visibleStories.map((story, vIdx) => {
                const globalIndex = stretchedStoryId
                  ? stories.findIndex((s) => s.id === story.id)
                  : currentIndex + vIdx;
                const isFirst = globalIndex % 2 === 0;
                const isStretched = stretchedStoryId === story.id;

                return (
                  <div
                    key={story.id || globalIndex}
                    className={`bg-[var(--card-bg)] text-[var(--theme-text)] rounded-3xl p-6 sm:p-8 shadow-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden min-h-[420px] ${
                      isStretched
                        ? "border-2 border-[var(--accent-color)] shadow-2xl ring-4 ring-[var(--accent-color)]/20"
                        : "border-[var(--border-color)]"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--accent-color)]/10 blur-2xl rounded-full pointer-events-none" />

                    <div>
                      {/* Card Header with Icon, Title, Subtitle, Stretch Toggle, and Delete Button */}
                      <div className="flex items-start justify-between mb-4 gap-3">
                        <div
                          onClick={() => setStretchedStoryId(isStretched ? null : story.id)}
                          className="flex items-start space-x-3 min-w-0 flex-1 cursor-pointer group/cardheader"
                          title="Haz clic para estirar/reducir esta tarjeta a pantalla completa"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[var(--accent-color)] text-white flex items-center justify-center shadow-xs shrink-0 mt-0.5 group-hover/cardheader:scale-105 transition-transform">
                            {isFirst ? <Smartphone className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm sm:text-base font-extrabold text-[var(--theme-text)] leading-snug">
                              <EditableText
                                id={`story_title_${story.id}`}
                                value={story.title}
                                onChange={(val) => handleUpdateStoryTitle(globalIndex, val)}
                                multiline
                                tag="span"
                              />
                            </h3>
                            <span className="text-[11px] font-semibold text-[var(--accent-color)] block mt-0.5">
                              <EditableText
                                id={`story_subtitle_${story.id}`}
                                value={story.subtitle || "Criterios & Alcance"}
                                onChange={(val) => handleUpdateStorySubtitle(globalIndex, val)}
                                tag="span"
                              />
                            </span>
                          </div>
                        </div>

                        {/* Top Right Action Controls: Stretch & Delete */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Stretch / Expand Button - strictly in Design Mode */}
                          {isDesignMode && (
                            <button
                              type="button"
                              onClick={() => setStretchedStoryId(isStretched ? null : story.id)}
                              className="px-2.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--theme-text)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/50 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer select-none"
                              title={isStretched ? "Reducir tarjeta a vista normal de 2 columnas" : "Estirar tarjeta a ancho completo (pantalla ancha)"}
                            >
                              {isStretched ? (
                                <>
                                  <Minimize2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                                  <span className="hidden sm:inline">Reducir</span>
                                </>
                              ) : (
                                <>
                                  <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                                  <span className="hidden sm:inline">Estirar Tarjeta</span>
                                </>
                              )}
                            </button>
                          )}

                          {/* Delete Story Button */}
                          {isDesignMode && stories.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteStory(globalIndex)}
                              className="text-zinc-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                              title="Eliminar esta tarjeta de historia"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Cotejos / Criteria List with Toggleable Cotejo Icon & Direct Deletion */}
                      <div className="space-y-3 mt-4">
                        {story.items.map((item, itemIdx) => {
                          const itemKey = `${story.id}_item_${itemIdx}`;
                          const isIconHidden = Boolean(hiddenCotejoIcons[itemKey]);

                          return (
                            <div
                              key={itemIdx}
                              className="flex items-start justify-between gap-2.5 group/cotejo text-xs sm:text-sm text-[var(--theme-text)]"
                            >
                              <div className="flex items-start space-x-2.5 flex-1 min-w-0">
                                {/* Cotejo Icon: Clickable to toggle off/on in design mode */}
                                {!isIconHidden ? (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (isDesignMode) toggleCotejoIcon(itemKey);
                                    }}
                                    className={`w-4 h-4 rounded-full bg-[var(--accent-color)] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs transition-all ${
                                      isDesignMode ? "cursor-pointer hover:scale-125 hover:bg-red-500 group/icon" : ""
                                    }`}
                                    title={isDesignMode ? "Clic para quitar este ícono de cotejo" : undefined}
                                  >
                                    <Check className="w-3 h-3 stroke-[3] group-hover/icon:hidden" />
                                    {isDesignMode && <EyeOff className="w-2.5 h-2.5 hidden group-hover/icon:block" />}
                                  </button>
                                ) : isDesignMode ? (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleCotejoIcon(itemKey);
                                    }}
                                    className="w-4 h-4 rounded-full border border-dashed border-zinc-400 hover:border-emerald-500 text-zinc-400 hover:text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer hover:scale-125"
                                    title="Clic para restaurar el ícono de cotejo"
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                ) : null}

                                <span className="leading-relaxed font-normal flex-1">
                                  <EditableText
                                    id={`story_item_${story.id}_${itemIdx}`}
                                    value={item}
                                    onChange={(newVal) => handleUpdateCotejo(globalIndex, itemIdx, newVal)}
                                    multiline
                                    tag="span"
                                  />
                                </span>
                              </div>

                              {/* Direct Delete Cotejo Button in Design Mode */}
                              {isDesignMode && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCotejo(globalIndex, itemIdx)}
                                  className="opacity-0 group-hover/cotejo:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition-all cursor-pointer shrink-0"
                                  title="Eliminar este criterio completo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Action Bar: Add Cotejo & Toggle All Icons in Story */}
                      {isDesignMode && (
                        <div className="flex items-center gap-3 mt-4 flex-wrap">
                          <button
                            type="button"
                            onClick={() => handleAddCotejo(globalIndex)}
                            className="text-xs font-bold text-[var(--accent-color)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Añadir cotejo / criterio</span>
                          </button>

                          <span className="text-zinc-400 text-xs hidden sm:inline">•</span>

                          <button
                            type="button"
                            onClick={() => toggleAllIconsInStory(story.id, story.items.length)}
                            className="text-xs font-semibold text-zinc-500 hover:text-[var(--accent-color)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                            title="Ocultar o mostrar todos los íconos de cotejo de esta historia"
                          >
                            <CheckCheck className="w-3.5 h-3.5" />
                            <span>
                              {story.items.every((_, i) => hiddenCotejoIcons[`${story.id}_item_${i}`])
                                ? "Restaurar todos los íconos de cotejo"
                                : "Quitar todos los íconos de cotejo"}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Card Footer Bar */}
                    <div className="pt-3 mt-5 border-t border-[var(--border-color)] text-[11px] font-bold text-[var(--accent-color)] flex items-center justify-between font-mono">
                      <span>
                        <EditableField id={`story_meta_left_${story.id}`} defaultText="SLA Calidad & Entrega" />
                      </span>
                      <span>
                        <EditableField id={`story_meta_right_${story.id}`} defaultText="100% Cobertura" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Carousel Pagination Dots */}
        {!stretchedStoryId && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, pIdx) => {
              const isActive = currentPageNum === pIdx + 1;
              return (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => setCurrentIndex(pIdx * 2)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "w-6 bg-[var(--accent-color)]"
                      : "w-2 bg-[var(--accent-color)]/30 hover:bg-[var(--accent-color)]/60"
                  }`}
                  title={`Ir a Historias ${pIdx * 2 + 1}-${Math.min((pIdx + 1) * 2, stories.length)}`}
                />
              );
            })}
          </div>
        )}

        {/* Bottom Full-Width Highlighted Guarantee Banner (Deletable/Toggleable in Design Mode) */}
        {showGuaranteeBanner ? (
          <div className="max-w-6xl mx-auto w-full bg-[var(--card-bg)] border-2 border-[var(--accent-color)]/30 rounded-2xl p-4.5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors duration-300 mt-5 relative group/banner">
            <div className="flex items-center space-x-3 text-[var(--theme-text)]">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 flex items-center justify-center text-[var(--accent-color)] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-xs sm:text-sm font-bold text-[var(--theme-text)] block">
                  <EditableField id="resp_guarantee_label" defaultText="Garantía Total de la Solución:" />{" "}
                  <EditableText
                    id="resp_guarantee_period"
                    value={guaranteePeriod}
                    onChange={(val) => updateProject({ guaranteePeriod: val })}
                    tag="span"
                  />
                </strong>
                <span className="text-[11px] text-[var(--theme-text)]/70">
                  <EditableField id="resp_guarantee_sub" defaultText="Acompañamiento continuo post-pase a producción para certificar el correcto funcionamiento." />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="shrink-0 inline-flex items-center space-x-1.5 bg-[var(--accent-color)]/10 px-3.5 py-1.5 rounded-xl border border-[var(--accent-color)]/30 text-[var(--accent-color)] font-bold text-xs">
                <Award className="w-3.5 h-3.5" />
                <span><EditableField id="resp_guarantee_badge" defaultText="Respaldo 100% Incluido" /></span>
              </div>

              {isDesignMode && (
                <button
                  type="button"
                  onClick={() => {
                    setShowGuaranteeBanner(false);
                    if (typeof window !== "undefined") {
                      localStorage.setItem("enfoco_show_guarantee_banner", "false");
                    }
                  }}
                  className="opacity-0 group-hover/banner:opacity-100 text-zinc-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all cursor-pointer ml-1"
                  title="Eliminar recuadro de garantía"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          isDesignMode && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowGuaranteeBanner(true);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("enfoco_show_guarantee_banner", "true");
                  }
                }}
                className="text-xs font-bold text-[var(--accent-color)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Habilitar recuadro de Garantía</span>
              </button>
            </div>
          )
        )}
      </motion.div>
    </section>
  );
};
