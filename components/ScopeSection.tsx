"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Requirement, RequirementCategory } from "@/data/proposalData";
import { useProposal } from "@/context/ProposalContext";
import { useStudioStore } from "@/store/useStudioStore";
import { EditableText } from "@/components/studio/EditableText";
import { EditableField } from "@/components/ui/EditableField";
import { DeletableItem } from "@/components/studio/DeletableItem";
import {
  Layers,
  CheckCircle2,
  Cpu,
  Shield,
  FileText,
  Database,
  BarChart3,
  Sparkles,
  ChevronRight,
  Plus,
  Maximize2,
  Minimize2,
  Trash2,
  EyeOff,
  Palette,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ScopeSectionProps {
  requirements: Requirement[];
  secId?: string;
}

export const ScopeSection: React.FC<ScopeSectionProps> = ({ requirements, secId = "alcance" }) => {
  const {
    currentSlug,
    proposal,
    updateRequirement,
    removeRequirement,
    addRequirement,
    updateRequirementCategory,
    removeRequirementCategory,
  } = useProposal();
  const { isDesignMode } = useStudioStore();

  const activeRequirements =
    proposal?.requirements && Array.isArray(proposal.requirements) && proposal.requirements.length > 0
      ? proposal.requirements
      : requirements || [];

  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [todosLabel, setTodosLabel] = useState<string>("Todos");
  const [selectedRequirementId, setSelectedRequirementId] = useState<string>(activeRequirements[0]?.id || "REQ-01");
  const [isCardStretched, setIsCardStretched] = useState<boolean>(false);
  const [hiddenDeliverablesMap, setHiddenDeliverablesMap] = useState<Record<string, boolean>>({});
  const [stretchedDeliverables, setStretchedDeliverables] = useState<Record<string, boolean>>({});
  const [hiddenDelIcons, setHiddenDelIcons] = useState<Record<string, boolean>>({});
  const [delPillVariants, setDelPillVariants] = useState<Record<string, "primary" | "secondary" | "subtle">>({});

  // Deliverable Pills Drag-to-Resize State (Custom 2D Sizing: Horizontal and Vertical)
  const [pillCustomSizes, setPillCustomSizes] = useState<
    Record<string, { width?: number; height?: number }>
  >({});
  const [draggingPill, setDraggingPill] = useState<{
    key: string;
    direction: "e" | "s" | "se";
  } | null>(null);
  const pillDragStartRef = useRef<{
    startX: number;
    startY: number;
    startW: number;
    startH: number;
  }>({
    startX: 0,
    startY: 0,
    startW: 0,
    startH: 0,
  });

  const handlePillDragStart = (
    e: React.MouseEvent | React.TouchEvent,
    pillKey: string,
    direction: "e" | "s" | "se",
    pillEl: HTMLElement | null
  ) => {
    e.stopPropagation();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    if (pillEl) {
      const rect = pillEl.getBoundingClientRect();
      pillDragStartRef.current = {
        startX: clientX,
        startY: clientY,
        startW: rect.width,
        startH: rect.height,
      };
    }
    setDraggingPill({ key: pillKey, direction });
  };

  // Helper to load scoped or fallback configurations for this proposal
  const loadScopedConfig = useCallback((slugToLoad: string) => {
    if (typeof window === "undefined") return;
    const slug = slugToLoad || "propuesta";

    // 1. Todos Label
    const savedTodos =
      localStorage.getItem(`scope_todos_label_${slug}`) ||
      localStorage.getItem("scope_todos_label");
    if (savedTodos) setTodosLabel(savedTodos);

    // 2. Pill Custom Sizes
    try {
      const savedSizes =
        localStorage.getItem(`scope_pill_custom_sizes_${slug}`) ||
        (proposal as any)?.scopePillsConfig?.pillCustomSizes ||
        localStorage.getItem("scope_pill_custom_sizes");
      if (savedSizes) {
        const parsed = typeof savedSizes === "string" ? JSON.parse(savedSizes) : savedSizes;
        if (typeof parsed === "object" && parsed !== null) {
          setPillCustomSizes(parsed);
        } else {
          setPillCustomSizes({});
        }
      } else {
        setPillCustomSizes({});
      }
    } catch {
      setPillCustomSizes({});
    }

    // 3. Stretched Deliverables Map
    try {
      const savedStretched =
        localStorage.getItem(`scope_stretched_deliverables_${slug}`) ||
        (proposal as any)?.scopePillsConfig?.stretchedDeliverables ||
        localStorage.getItem("scope_stretched_deliverables_map");
      if (savedStretched) {
        const parsed = typeof savedStretched === "string" ? JSON.parse(savedStretched) : savedStretched;
        setStretchedDeliverables(parsed || {});
      } else {
        setStretchedDeliverables({});
      }
    } catch {
      setStretchedDeliverables({});
    }

    // 4. Hidden Cotejo Icons
    try {
      const savedIcons =
        localStorage.getItem(`scope_hidden_del_icons_${slug}`) ||
        (proposal as any)?.scopePillsConfig?.hiddenDelIcons ||
        localStorage.getItem("scope_hidden_del_icons");
      if (savedIcons) {
        const parsed = typeof savedIcons === "string" ? JSON.parse(savedIcons) : savedIcons;
        setHiddenDelIcons(parsed || {});
      } else {
        setHiddenDelIcons({});
      }
    } catch {
      setHiddenDelIcons({});
    }

    // 5. Del Pill Variants
    try {
      const savedVariants =
        localStorage.getItem(`scope_del_variants_${slug}`) ||
        (proposal as any)?.scopePillsConfig?.delPillVariants ||
        localStorage.getItem("scope_del_variants");
      if (savedVariants) {
        const parsed = typeof savedVariants === "string" ? JSON.parse(savedVariants) : savedVariants;
        setDelPillVariants(parsed || {});
      } else {
        setDelPillVariants({});
      }
    } catch {
      setDelPillVariants({});
    }

    // 6. Hidden Deliverables Map
    try {
      const savedHidden =
        localStorage.getItem(`scope_hidden_deliverables_map_${slug}`) ||
        (proposal as any)?.scopePillsConfig?.hiddenDeliverablesMap ||
        localStorage.getItem("scope_hidden_deliverables_map");
      if (savedHidden) {
        const parsed = typeof savedHidden === "string" ? JSON.parse(savedHidden) : savedHidden;
        setHiddenDeliverablesMap(parsed || {});
      } else {
        setHiddenDeliverablesMap({});
      }
    } catch {
      setHiddenDeliverablesMap({});
    }
  }, [proposal]);

  // Load configuration on mount and whenever proposal or slug changes
  useEffect(() => {
    loadScopedConfig(currentSlug);
  }, [currentSlug, loadScopedConfig]);

  // Listen for proposal switched event
  useEffect(() => {
    const handleProposalSwitched = (e: Event) => {
      const customEvt = e as CustomEvent;
      const targetSlug = customEvt.detail?.slug || currentSlug;
      loadScopedConfig(targetSlug);
    };
    window.addEventListener("enfoco-proposal-switched", handleProposalSwitched);
    return () => window.removeEventListener("enfoco-proposal-switched", handleProposalSwitched);
  }, [currentSlug, loadScopedConfig]);

  // Sync selectedRequirementId when activeRequirements change
  useEffect(() => {
    if (activeRequirements && activeRequirements.length > 0) {
      const exists = activeRequirements.some((r) => r.id === selectedRequirementId);
      if (!exists) {
        setSelectedRequirementId(activeRequirements[0].id);
      }
    }
  }, [activeRequirements, selectedRequirementId]);

  // Sync selectedCategory if it doesn't exist in the current proposal's categories
  useEffect(() => {
    if (selectedCategory !== "Todos" && activeRequirements && activeRequirements.length > 0) {
      const catExists = activeRequirements.some((r) => r.category === selectedCategory);
      if (!catExists) {
        setSelectedCategory("Todos");
      }
    }
  }, [activeRequirements, selectedCategory]);

  useEffect(() => {
    if (!draggingPill) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - pillDragStartRef.current.startX;
      const dy = clientY - pillDragStartRef.current.startY;

      const { key, direction } = draggingPill;

      setPillCustomSizes((prev) => {
        const current = prev[key] || {};
        const updated = { ...current };

        if (direction.includes("e")) {
          const newW = Math.max(160, Math.min(1400, Math.round(pillDragStartRef.current.startW + dx)));
          updated.width = newW;
          if (newW > 380) {
            setStretchedDeliverables((sPrev) => ({ ...sPrev, [key]: true }));
          } else if (newW < 280) {
            setStretchedDeliverables((sPrev) => ({ ...sPrev, [key]: false }));
          }
        }
        if (direction.includes("s")) {
          const newH = Math.max(42, Math.min(600, Math.round(pillDragStartRef.current.startH + dy)));
          updated.height = newH;
        }

        const next = { ...prev, [key]: updated };
        if (typeof window !== "undefined") {
          localStorage.setItem(`scope_pill_custom_sizes_${currentSlug}`, JSON.stringify(next));
          localStorage.setItem("scope_pill_custom_sizes", JSON.stringify(next));
        }
        return next;
      });
    };

    const handleUp = () => {
      setDraggingPill(null);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [draggingPill, currentSlug]);

  const resetOrTogglePill = (key: string) => {
    const hasCustom = Boolean(pillCustomSizes[key]?.width || pillCustomSizes[key]?.height);
    if (hasCustom) {
      setPillCustomSizes((prev) => {
        const copy = { ...prev };
        delete copy[key];
        if (typeof window !== "undefined") {
          localStorage.setItem(`scope_pill_custom_sizes_${currentSlug}`, JSON.stringify(copy));
          localStorage.setItem("scope_pill_custom_sizes", JSON.stringify(copy));
        }
        return copy;
      });
      setStretchedDeliverables((prev) => {
        const next = { ...prev, [key]: false };
        if (typeof window !== "undefined") {
          localStorage.setItem(`scope_stretched_deliverables_${currentSlug}`, JSON.stringify(next));
          localStorage.setItem("scope_stretched_deliverables_map", JSON.stringify(next));
        }
        return next;
      });
    } else {
      toggleStretchDeliverable(key);
    }
  };

  const toggleHideDeliverables = (reqId: string) => {
    setHiddenDeliverablesMap((prev) => {
      const next = { ...prev, [reqId]: !prev[reqId] };
      if (typeof window !== "undefined") {
        localStorage.setItem(`scope_hidden_deliverables_map_${currentSlug}`, JSON.stringify(next));
        localStorage.setItem("scope_hidden_deliverables_map", JSON.stringify(next));
      }
      return next;
    });
  };

  const toggleStretchDeliverable = (key: string) => {
    setStretchedDeliverables((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (typeof window !== "undefined") {
        localStorage.setItem(`scope_stretched_deliverables_${currentSlug}`, JSON.stringify(next));
        localStorage.setItem("scope_stretched_deliverables_map", JSON.stringify(next));
      }
      return next;
    });
  };

  const toggleDelIcon = (key: string) => {
    setHiddenDelIcons((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (typeof window !== "undefined") {
        localStorage.setItem(`scope_hidden_del_icons_${currentSlug}`, JSON.stringify(next));
        localStorage.setItem("scope_hidden_del_icons", JSON.stringify(next));
      }
      return next;
    });
  };

  const cyclePillVariant = (key: string) => {
    setDelPillVariants((prev) => {
      const current = prev[key] || "primary";
      const nextVariant: "primary" | "secondary" | "subtle" =
        current === "primary" ? "secondary" : current === "secondary" ? "subtle" : "primary";
      const next: Record<string, "primary" | "secondary" | "subtle"> = { ...prev, [key]: nextVariant };
      if (typeof window !== "undefined") {
        localStorage.setItem(`scope_del_variants_${currentSlug}`, JSON.stringify(next));
        localStorage.setItem("scope_del_variants", JSON.stringify(next));
      }
      return next;
    });
  };

  // Dynamic categories extracted from current activeRequirements
  const existingCategories = Array.from(new Set(activeRequirements.map((r) => r.category).filter(Boolean)));
  const knownDefaults = ["Core", "Automatización", "Integración", "Reportes", "Seguridad"];
  const allSelectableCategories = Array.from(new Set([...existingCategories, ...knownDefaults]));
  const categories = ["Todos", ...existingCategories];

  const filteredWithIndices = activeRequirements
    .map((req, origIdx) => ({ req, origIdx }))
    .filter(({ req }) => selectedCategory === "Todos" || req.category === selectedCategory);
  const filtered = filteredWithIndices.map((f) => f.req);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const newFiltered = activeRequirements
      .map((req, origIdx) => ({ req, origIdx }))
      .filter(({ req }) => cat === "Todos" || req.category === cat);
    if (newFiltered.length > 0) {
      setSelectedRequirementId(newFiltered[0].req.id || String(newFiltered[0].origIdx));
    }
  };

  const activeItem = filteredWithIndices.find(({ req, origIdx }) =>
    req.id === selectedRequirementId || String(origIdx) === selectedRequirementId
  ) || (filteredWithIndices.length > 0 ? filteredWithIndices[0] : null);

  const activeRequirement = activeItem?.req || null;
  const activeReqIndex = activeItem?.origIdx ?? -1;

  const getCategoryIcon = (cat: string, dark = false) => {
    const iconClass = dark ? "w-4 h-4 text-white" : "w-4 h-4 text-[var(--accent-color)]";
    switch (cat) {
      case "Core":
        return <Cpu className={iconClass} />;
      case "Automatización":
        return <Layers className={iconClass} />;
      case "Integración":
        return <Database className={iconClass} />;
      case "Reportes":
        return <BarChart3 className={iconClass} />;
      case "Seguridad":
        return <Shield className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  return (
    <section
      id={secId || "alcance"}
      className="min-h-screen w-full flex flex-col justify-start items-center relative overflow-hidden bg-[var(--bg-main)] border-t border-[var(--border-color)] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 transition-colors duration-300"
    >
      {/* 💻 Screen Interactive View */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="screen-only max-w-7xl mx-auto w-full flex flex-col justify-start"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-4 py-1.5 rounded-full border border-[var(--accent-color)]/30 inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              <EditableField
                id={`scope_header_badge_${currentSlug || "default"}`}
                defaultText={
                  currentSlug?.includes("excel")
                    ? "03. ALCANCE FUNCIONAL COMPLETO • ÉPICAS SIMV"
                    : "ARQUITECTURA DE ALCANCE • INSPECTOR MAESTRO-DETALLE"
                }
              />
            </span>
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[var(--h2-color)] mt-2 mb-1">
            <EditableField
              id={`scope_header_h2_${currentSlug || "default"}`}
              defaultText={
                currentSlug?.includes("excel")
                  ? "Detalle Funcional por 7 Épicas SIMV"
                  : "Alcance & Funcionalidades Requeridas"
              }
            />
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            <EditableField
              id={`scope_header_desc_${currentSlug || "default"}`}
              defaultText="Seleccione un módulo a la izquierda para inspeccionar sus especificaciones técnicas y entregables en el panel derecho."
            />
          </p>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-5 shrink-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <div
                key={cat}
                role="button"
                tabIndex={0}
                onClick={() => handleCategorySelect(cat)}
                className={`inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "bg-[var(--accent-color)] text-white border-[var(--accent-color)] shadow-md shadow-[var(--accent-color)]/20 scale-105"
                    : "bg-[var(--card-bg)] text-[var(--theme-text)] border-[var(--border-color)] hover:border-[var(--accent-color)]/40 hover:text-[var(--accent-color)]"
                }`}
              >
                {isActive && (
                  <span className="relative flex h-2 w-2 mr-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                )}

                {cat === "Todos" ? (
                  <EditableText
                    id={`scope_cat_todos_label_${currentSlug || "default"}`}
                    value={todosLabel}
                    onChange={(val) => {
                      const trimmed = val.trim() || "Todos";
                      setTodosLabel(trimmed);
                      if (typeof window !== "undefined") {
                        localStorage.setItem(`scope_todos_label_${currentSlug}`, trimmed);
                        localStorage.setItem("scope_todos_label", trimmed);
                      }
                    }}
                    tag="span"
                    className="cursor-pointer"
                  />
                ) : (
                  <div className="inline-flex items-center gap-1.5">
                    <EditableText
                      id={`scope_cat_item_${cat.toLowerCase().replace(/\s+/g, '_')}`}
                      value={cat}
                      onChange={(newVal) => {
                        const trimmed = newVal.trim();
                        if (trimmed && trimmed !== cat) {
                          updateRequirementCategory(cat, trimmed);
                          if (selectedCategory === cat) {
                            setSelectedCategory(trimmed);
                          }
                        }
                      }}
                      tag="span"
                      className="cursor-pointer"
                    />
                    {isDesignMode && existingCategories.length > 1 && (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`¿Deseas eliminar la categoría "${cat}" y todos sus módulos asociados?`)) {
                            removeRequirementCategory(cat);
                            setSelectedCategory("Todos");
                          }
                        }}
                        className={`text-xs opacity-50 hover:opacity-100 hover:text-red-400 cursor-pointer p-0.5 rounded transition-opacity ${
                          isActive ? "text-white" : "text-[var(--text-primary)]"
                        }`}
                        title={`Eliminar categoría "${cat}"`}
                      >
                        ×
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Add Category in Design Mode */}
          {isDesignMode && (
            <button
              type="button"
              onClick={() => {
                const newCatName = `Categoría ${existingCategories.length + 1}`;
                addRequirement({
                  category: newCatName as RequirementCategory,
                  title: `Nuevo Módulo (${newCatName})`,
                  description: "Descripción editable de este módulo.",
                  deliverables: ["Entregable 1"],
                });
                setSelectedCategory(newCatName);
              }}
              className="inline-flex items-center px-3.5 py-1.5 text-xs font-bold rounded-full border border-dashed border-[var(--accent-color)]/70 text-[var(--accent-color)] hover:bg-[var(--accent-color)]/10 transition-all cursor-pointer gap-1"
              title="Añadir una nueva categoría de módulos"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Categoría</span>
            </button>
          )}
        </div>

        {/* Master-Detail Architecture Inspector Split Layout (max-w-6xl) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-stretch max-w-6xl mx-auto w-full">
          {/* Left Navigation Column */}
          {!isCardStretched && (
            <div className="xl:col-span-4 flex flex-col justify-start space-y-2.5">
              <div className="flex items-center justify-between px-1 mb-1">
                <span className="text-xs font-bold text-[var(--text-primary)]/60 uppercase tracking-wider font-mono">
                  <EditableField id="scope_modules_label" defaultText="Módulos del Sistema" /> ({filteredWithIndices.length})
                </span>
                {isDesignMode && (
                  <button
                    onClick={() =>
                      addRequirement({
                        category: "Core",
                        title: "Nuevo Módulo",
                        description: "Descripción editable del nuevo módulo.",
                        deliverables: ["Entregable 1"],
                      })
                    }
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </button>
                )}
              </div>

              <div className="space-y-2.5">
                {filteredWithIndices.length === 0 ? (
                  <div className="p-6 text-center bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl">
                    <p className="text-xs font-bold text-[var(--text-primary)]">
                      No hay módulos en la categoría "{selectedCategory}"
                    </p>
                    <p className="text-[11px] text-[var(--text-primary)]/60 mt-1">
                      Selecciona otra categoría o añade uno nuevo.
                    </p>
                    {isDesignMode && (
                      <button
                        type="button"
                        onClick={() => {
                          const nextNum = activeRequirements.length + 1;
                          addRequirement({
                            id: `REQ-${nextNum < 10 ? "0" + nextNum : nextNum}`,
                            category: (selectedCategory === "Todos" ? "Core" : selectedCategory) as RequirementCategory,
                            title: `Nuevo Módulo ${nextNum}`,
                            description: "Descripción editable del módulo.",
                            deliverables: ["Entregable 1"],
                          });
                        }}
                        className="mt-3 px-3.5 py-1.5 rounded-xl bg-[var(--accent-color)] text-white text-xs font-bold shadow-md hover:scale-105 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Crear módulo</span>
                      </button>
                    )}
                  </div>
                ) : (
                  filteredWithIndices.map(({ req, origIdx }) => {
                    const isSelected = activeReqIndex === origIdx;
                    return (
                      <div
                        key={`${req.id || 'req'}-${origIdx}`}
                        onClick={() => {
                          if (isSelected) {
                            setIsCardStretched(!isCardStretched);
                          } else {
                            setSelectedRequirementId(req.id || String(origIdx));
                          }
                        }}
                        onDoubleClick={() => {
                          setSelectedRequirementId(req.id || String(origIdx));
                          setIsCardStretched(true);
                        }}
                        title="Haz clic para seleccionar, o doble clic para estirar a ancho completo"
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between shadow-xs ${
                          isSelected
                            ? "bg-[var(--card-bg)] text-[var(--accent-color)] border-2 border-[var(--accent-color)] shadow-md scale-[1.02]"
                            : "bg-[var(--card-bg)] text-[var(--theme-text)] border border-[var(--border-color)] hover:border-[var(--accent-color)]/50"
                        }`}
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          {isSelected ? (
                            <span className="relative flex h-2 w-2 mr-1 shrink-0">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-color)]" />
                            </span>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-[var(--border-color)] shrink-0" />
                          )}

                          <div className="min-w-0 flex-1">
                            <div className={`text-[10px] font-mono font-bold flex items-center gap-1.5 mb-0.5 ${isSelected ? "text-[var(--accent-color)] font-extrabold" : "text-[var(--theme-text)]/70"}`}>
                              <span>{req.id}</span>
                              <span>•</span>
                              {isDesignMode ? (
                                <select
                                  value={req.category}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateRequirement(origIdx, { category: e.target.value as RequirementCategory });
                                  }}
                                  className="bg-black/10 dark:bg-white/10 text-inherit border border-current/20 rounded px-1 py-0.5 text-[10px] font-mono cursor-pointer outline-none hover:border-[var(--accent-color)]"
                                  title="Asignar a qué botón de categoría pertenece este módulo"
                                >
                                  {allSelectableCategories.map((c) => (
                                    <option key={c} value={c} className="bg-zinc-900 text-white font-sans">
                                      {c}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span>{req.category}</span>
                              )}
                            </div>
                            <h4 className={`text-xs sm:text-sm font-extrabold block leading-snug ${isSelected ? "text-[var(--accent-color)]" : "text-[var(--theme-text)]"}`}>
                              <EditableText
                                id={`scope_req_${currentSlug || "default"}_${req.id || origIdx}_title`}
                                value={req.title}
                                onChange={(val) => updateRequirement(origIdx, { title: val })}
                                tag="span"
                              />
                            </h4>
                          </div>
                        </div>

                        {/* Action Buttons: Stretch and Delete cleanly placed side-by-side with zero overlap */}
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {isDesignMode && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedRequirementId(req.id || String(origIdx));
                                setIsCardStretched(!isCardStretched);
                              }}
                              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-[var(--accent-color)] opacity-70 hover:opacity-100 transition-all cursor-pointer"
                              title={isCardStretched && isSelected ? "Reducir tarjeta" : "Estirar esta tarjeta a pantalla completa"}
                            >
                              {isCardStretched && isSelected ? (
                                <Minimize2 className="w-3.5 h-3.5" />
                              ) : (
                                <Maximize2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}

                          {isDesignMode && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeRequirement(origIdx);
                              }}
                              className="p-1.5 rounded-lg text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                              title="Eliminar este módulo de alcance"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[var(--accent-color)] translate-x-1" : "opacity-50"}`} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Right Detail Panel */}
          <div className={isCardStretched ? "xl:col-span-12" : "xl:col-span-8"}>
            {!activeRequirement ? (
              <div className="bg-[var(--card-bg)] text-[var(--theme-text)] border border-[var(--border-color)] rounded-3xl p-8 shadow-md flex flex-col items-center justify-center min-h-[420px] w-full text-center">
                <Layers className="w-12 h-12 text-[var(--accent-color)]/30 mb-3" />
                <h3 className="text-lg font-bold text-[var(--accent-color)]">Sin módulos seleccionados</h3>
                <p className="text-xs text-[var(--theme-text)]/70 max-w-sm mt-1">
                  Selecciona una categoría con requerimientos activos o añade un nuevo módulo a la propuesta.
                </p>
              </div>
            ) : (
              <div
                id="card-inspector-02"
                className={`bg-[var(--card-bg)] text-[var(--theme-text)] border rounded-3xl p-6 sm:p-8 md:p-9 shadow-md flex flex-col justify-between min-h-[420px] w-full relative overflow-hidden transition-all duration-300 ${
                  isCardStretched
                    ? "border-2 border-[var(--accent-color)] shadow-2xl ring-4 ring-[var(--accent-color)]/20"
                    : "border-[var(--border-color)]"
                }`}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent-color)]/10 blur-3xl rounded-full pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRequirement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="w-full flex flex-col justify-between h-full"
                  >
                    <div>
                      {/* Header Zone */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 flex items-center justify-center">
                            {getCategoryIcon(activeRequirement.category)}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3.5 py-1 rounded-full border border-[var(--accent-color)]/30 inline-flex items-center gap-1.5">
                            <span><EditableField id="scope_module_type_prefix" defaultText="Módulo de" /></span>
                            {isDesignMode ? (
                              <select
                                value={activeRequirement.category}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateRequirement(activeReqIndex, { category: e.target.value as RequirementCategory });
                                }}
                                className="bg-transparent font-bold text-[var(--accent-color)] cursor-pointer outline-none border-b border-dashed border-[var(--accent-color)]/50 hover:bg-[var(--accent-color)]/10 rounded px-1 py-0.5"
                                title="Selecciona a qué botón de categoría responde este módulo"
                              >
                                {allSelectableCategories.map((c) => (
                                  <option key={c} value={c} className="bg-zinc-900 text-white font-sans">
                                    {c}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span>{activeRequirement.category}</span>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsCardStretched(!isCardStretched)}
                            className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--theme-text)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]/50 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer select-none"
                            title={isCardStretched ? "Reducir a vista dividida" : "Estirar tarjeta al ancho completo"}
                          >
                            {isCardStretched ? (
                              <>
                                <Minimize2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                                <span>Reducir</span>
                              </>
                            ) : (
                              <>
                                <Maximize2 className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                                <span>Estirar Tarjeta</span>
                              </>
                            )}
                          </button>

                          <span className="text-xs font-mono font-bold text-[var(--accent-color)] px-3 py-1 rounded-md bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30">
                            <EditableText
                              id={`scope_detail_${currentSlug || "default"}_${activeRequirement.id}_id`}
                              value={activeRequirement.id}
                              onChange={(val) => {
                                const trimmed = val.trim();
                                if (!trimmed) return;
                                updateRequirement(activeReqIndex, { id: trimmed });
                                setSelectedRequirementId(trimmed);
                              }}
                              tag="span"
                            />
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-2xl md:text-3xl font-extrabold font-display text-[var(--accent-color)] mb-3 leading-tight">
                        <EditableText
                          id={`scope_detail_${currentSlug || "default"}_${activeRequirement.id}_title`}
                          value={activeRequirement.title}
                          onChange={(val) => updateRequirement(activeReqIndex, { title: val })}
                          tag="span"
                        />
                      </h3>
                      <div className="text-[var(--theme-text)] text-sm md:text-base leading-relaxed font-normal max-w-2xl">
                        <EditableText
                          id={`scope_detail_${currentSlug || "default"}_${activeRequirement.id}_desc`}
                          value={activeRequirement.description}
                          onChange={(val) => updateRequirement(activeReqIndex, { description: val })}
                          multiline
                          tag="p"
                        />
                      </div>
                    </div>

                    {/* Deliverables Grid Zone */}
                    {!hiddenDeliverablesMap[activeRequirement.id] ? (
                      <div className="pt-5 border-t border-[var(--border-color)] mt-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-[var(--accent-color)] uppercase tracking-wider block font-mono">
                            <EditableField id="scope_deliverables_label" defaultText="ENTREGABLES Y CAPACIDADES CLAVE:" />
                          </span>
                          <div className="flex items-center gap-2">
                            {isDesignMode && (
                              <>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const currentDels = activeRequirement.deliverables || [];
                                    const updatedDeliverables = [...currentDels, `Entregable ${currentDels.length + 1}`];
                                    updateRequirement(activeReqIndex, { deliverables: updatedDeliverables });
                                  }}
                                  className="text-xs font-bold text-[var(--accent-color)] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Añadir Entregable</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => toggleHideDeliverables(activeRequirement.id)}
                                  className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer ml-2"
                                  title="Eliminar este recuadro de entregables"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span className="hidden sm:inline">Eliminar recuadro</span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {activeRequirement.deliverables.length === 0 ? (
                          <div className="p-4 rounded-xl border border-dashed border-[var(--border-color)] text-center text-xs text-[var(--theme-text)]/50">
                            Sin entregables registrados para este módulo. Pulsa "+ Añadir Entregable" para agregar uno.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                            {activeRequirement.deliverables.map((del, dIdx) => {
                              const pillKey = `${activeRequirement.id}_${dIdx}`;
                              const customSize = pillCustomSizes[pillKey];
                              const isDelStretched =
                                Boolean(stretchedDeliverables[pillKey]) ||
                                Boolean(customSize?.width && customSize.width > 380);
                              const isIconHidden = Boolean(hiddenDelIcons[pillKey]);
                              const variant = delPillVariants[pillKey] || "primary";

                              const variantClasses =
                                variant === "secondary"
                                  ? "bg-[var(--secondary-accent)]/15 text-[var(--secondary-accent)] border-[var(--secondary-accent)]/40"
                                  : variant === "subtle"
                                  ? "bg-[var(--card-bg)] text-[var(--theme-text)] border-[var(--border-color)]"
                                  : "bg-[var(--accent-color)]/10 text-[var(--accent-color)] border-[var(--accent-color)]/30";

                              const iconBgClass =
                                variant === "secondary"
                                  ? "bg-[var(--secondary-accent)]"
                                  : variant === "subtle"
                                  ? "bg-[var(--theme-text)]/70"
                                  : "bg-[var(--accent-color)]";

                              return (
                                <div
                                  key={dIdx}
                                  onDoubleClick={isDesignMode ? () => resetOrTogglePill(pillKey) : undefined}
                                  style={{
                                    width: customSize?.width ? `${customSize.width}px` : undefined,
                                    minHeight: customSize?.height ? `${customSize.height}px` : undefined,
                                    maxWidth: "100%",
                                  }}
                                  className={`${variantClasses} text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-2xl border flex items-center justify-between gap-2.5 shadow-xs transition-shadow duration-150 relative group/delpill select-none ${
                                    isDelStretched ? "md:col-span-2 ring-2 ring-[var(--accent-color)]/40" : ""
                                  }`}
                                  title={
                                    isDesignMode
                                      ? "Arrastra los bordes horizontal o verticalmente para personalizar su tamaño, o haz doble clic para restablecer"
                                      : undefined
                                  }
                                >
                                  {/* Editor Drag Handles: Strictly visible and interactive ONLY in Design Mode */}
                                  {isDesignMode && (
                                    <>
                                      {/* 1. Horizontal Border Resizer on Right Edge */}
                                      <div
                                        onMouseDown={(e) => handlePillDragStart(e, pillKey, "e", e.currentTarget.parentElement)}
                                        onTouchStart={(e) => handlePillDragStart(e, pillKey, "e", e.currentTarget.parentElement)}
                                        className="no-print absolute top-0 -right-1.5 w-3.5 h-full cursor-ew-resize hover:bg-[var(--accent-color)]/40 rounded-r-2xl transition-colors flex items-center justify-center z-20 group/resizew"
                                        title="Arrastra para estirar ancho horizontalmente"
                                      >
                                        <div className="w-1 h-5 bg-[var(--accent-color)]/50 group-hover/resizew:bg-[var(--accent-color)] rounded-full transition-colors" />
                                      </div>

                                      {/* 2. Vertical Border Resizer on Bottom Edge */}
                                      <div
                                        onMouseDown={(e) => handlePillDragStart(e, pillKey, "s", e.currentTarget.parentElement)}
                                        onTouchStart={(e) => handlePillDragStart(e, pillKey, "s", e.currentTarget.parentElement)}
                                        className="no-print absolute -bottom-1.5 left-0 w-full h-3.5 cursor-ns-resize hover:bg-[var(--accent-color)]/40 rounded-b-2xl transition-colors flex items-center justify-center z-20 group/resizeh"
                                        title="Arrastra para estirar alto verticalmente"
                                      >
                                        <div className="h-1 w-10 bg-[var(--accent-color)]/50 group-hover/resizeh:bg-[var(--accent-color)] rounded-full transition-colors" />
                                      </div>

                                      {/* 3. Southeast Corner Resizer for both horizontal & vertical stretching */}
                                      <div
                                        onMouseDown={(e) => handlePillDragStart(e, pillKey, "se", e.currentTarget.parentElement)}
                                        onTouchStart={(e) => handlePillDragStart(e, pillKey, "se", e.currentTarget.parentElement)}
                                        className="no-print absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--accent-color)] border-2 border-white cursor-se-resize z-30 shadow-xs hover:scale-125 transition-transform flex items-center justify-center"
                                        title="Arrastra la esquina para estirar tamaño horizontal y vertical a la vez"
                                      >
                                        <div className="w-1 h-1 bg-white rounded-full" />
                                      </div>
                                    </>
                                  )}

                                  <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1 py-0.5">
                                    {/* Cotejo / Checkmark Icon */}
                                    {!isDesignMode ? (
                                      !isIconHidden && (
                                        <div
                                          className={`w-5 h-5 rounded-full ${iconBgClass} text-white flex items-center justify-center shrink-0 shadow-2xs`}
                                        >
                                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                                        </div>
                                      )
                                    ) : !isIconHidden ? (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleDelIcon(pillKey);
                                        }}
                                        className={`w-5 h-5 rounded-full ${iconBgClass} text-white flex items-center justify-center shrink-0 shadow-2xs transition-all cursor-pointer hover:scale-125 hover:bg-red-500 group/icon`}
                                        title="Clic para quitar este ícono de cotejo"
                                      >
                                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5] group-hover/icon:hidden" />
                                        <EyeOff className="w-3 h-3 hidden group-hover/icon:block" />
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleDelIcon(pillKey);
                                        }}
                                        className="w-5 h-5 rounded-full border border-dashed border-zinc-400 hover:border-emerald-500 text-zinc-400 hover:text-emerald-500 flex items-center justify-center shrink-0 transition-all cursor-pointer hover:scale-125"
                                        title="Clic para restaurar el ícono de cotejo"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    )}

                                    {/* Deliverable Content */}
                                    <span className="text-[var(--theme-text)] font-medium leading-snug flex-1">
                                      <EditableText
                                        id={`scope_detail_${currentSlug || "default"}_${activeRequirement.id}_del_${dIdx}`}
                                        value={del}
                                        onChange={(newDelVal) => {
                                          const updatedDeliverables = [...activeRequirement.deliverables];
                                          updatedDeliverables[dIdx] = newDelVal;
                                          updateRequirement(activeReqIndex, { deliverables: updatedDeliverables });
                                        }}
                                        multiline
                                        tag="span"
                                      />
                                    </span>

                                    {/* Dimension readout tag if custom sized: ONLY visible in Design Mode */}
                                    {isDesignMode && customSize && (customSize.width || customSize.height) && (
                                      <span className="text-[10px] font-mono text-[var(--accent-color)]/70 px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 shrink-0 select-none">
                                        {customSize.width ? `${customSize.width}w` : ""}
                                        {customSize.width && customSize.height ? " × " : ""}
                                        {customSize.height ? `${customSize.height}h` : ""}
                                      </span>
                                    )}
                                  </div>

                                  {/* Action Controls: Strictly visible ONLY in Design Mode */}
                                  {isDesignMode && (
                                    <div className="flex items-center gap-1 shrink-0 ml-1.5 z-10 mr-2">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          cyclePillVariant(pillKey);
                                        }}
                                        className="text-[var(--accent-color)] opacity-60 hover:opacity-100 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
                                        title={`Alternar estilo cromático de la píldora (Actual: ${variant})`}
                                      >
                                        <Palette className="w-3 h-3" />
                                      </button>

                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          resetOrTogglePill(pillKey);
                                        }}
                                        className="text-[var(--accent-color)] opacity-70 hover:opacity-100 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer"
                                        title={
                                          isDelStretched || customSize
                                            ? "Restablecer tamaño de píldora"
                                            : "Estirar píldora a ancho completo (2 columnas)"
                                        }
                                      >
                                        {isDelStretched || customSize ? (
                                          <Minimize2 className="w-3.5 h-3.5" />
                                        ) : (
                                          <Maximize2 className="w-3.5 h-3.5" />
                                        )}
                                      </button>

                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const updatedDeliverables = activeRequirement.deliverables.filter((_, i) => i !== dIdx);
                                          updateRequirement(activeReqIndex, { deliverables: updatedDeliverables });
                                        }}
                                        className="text-red-500/70 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-500/10 transition-all cursor-pointer"
                                        title="Eliminar este entregable"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      isDesignMode && (
                        <div className="pt-4 border-t border-[var(--border-color)] mt-6 text-center">
                          <button
                            type="button"
                            onClick={() => toggleHideDeliverables(activeRequirement.id)}
                            className="px-3.5 py-2 rounded-xl border border-dashed border-[var(--accent-color)]/50 text-[var(--accent-color)] text-xs font-bold hover:bg-[var(--accent-color)]/10 inline-flex items-center gap-1.5 cursor-pointer transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Habilitar recuadro de Entregables</span>
                          </button>
                        </div>
                      )
                    )}

                    {/* Footer Tag */}
                    <div className="pt-4 border-t border-[var(--border-color)] mt-4 flex items-center justify-between text-xs text-[var(--text-primary)]/60 font-mono">
                      <span>
                        <EditableField id="scope_verified_arch" defaultText="ENFOCO S.R.L. • Arquitectura Verificada" />
                      </span>
                      <span className="text-[var(--accent-color)] font-bold">
                        <EditableField id="scope_guaranteed_tag" defaultText="100% Garantizado" />
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
