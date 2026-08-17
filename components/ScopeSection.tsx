"use client";

import React, { useState } from "react";
import { Requirement } from "@/data/proposalData";
import { useProposal } from "@/context/ProposalContext";
import { useStudioStore } from "@/store/useStudioStore";
import { EditableText } from "@/components/studio/EditableText";
import { DeletableItem } from "@/components/studio/DeletableItem";
import { Layers, CheckCircle2, Cpu, Shield, FileText, Database, BarChart3, Sparkles, ChevronRight, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ScopeSectionProps {
  requirements: Requirement[];
}

export const ScopeSection: React.FC<ScopeSectionProps> = ({ requirements }) => {
  const { updateRequirement, removeRequirement, addRequirement } = useProposal();
  const { isDesignMode } = useStudioStore();

  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedRequirementId, setSelectedRequirementId] = useState<string>(requirements[0]?.id || "REQ-01");

  const categories = ["Todos", "Core", "Automatización", "Integración", "Reportes", "Seguridad"];

  const filtered = selectedCategory === "Todos"
    ? requirements
    : requirements.filter((r) => r.category === selectedCategory);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const newFiltered = cat === "Todos" ? requirements : requirements.filter((r) => r.category === cat);
    if (newFiltered.length > 0) {
      setSelectedRequirementId(newFiltered[0].id);
    }
  };

  const activeRequirement = requirements.find((r) => r.id === selectedRequirementId) || filtered[0] || requirements[0];
  const activeReqIndex = requirements.findIndex((r) => r.id === activeRequirement?.id);

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
    <section id="alcance" className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-[var(--bg-main)] border-t border-[var(--border-color)] px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* 💻 Screen Interactive View */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="screen-only max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-4 py-1.5 rounded-full border border-[var(--accent-color)]/30 inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARQUITECTURA DE ALCANCE • INSPECTOR MAESTRO-DETALLE</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[var(--text-primary)] mt-2 mb-1">
            Alcance & Funcionalidades Requeridas
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Seleccione un módulo a la izquierda para inspeccionar sus especificaciones técnicas y entregables en el panel derecho.
          </p>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-5 shrink-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[var(--accent-color)] text-white border-[var(--accent-color)] shadow-md shadow-[var(--accent-color)]/20 scale-105"
                    : "bg-[var(--bg-main)] text-[var(--text-primary)]/80 border-[var(--border-color)] hover:border-[var(--accent-color)]/40 hover:text-[var(--text-primary)]"
                }`}
              >
                {isActive && (
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Master-Detail Architecture Inspector Split Layout (max-w-6xl) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-stretch max-w-6xl mx-auto w-full">
          {/* Left Navigation Column */}
          <div className="xl:col-span-4 flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-xs font-bold text-[var(--text-primary)]/60 uppercase tracking-wider font-mono">
                Módulos del Sistema ({filtered.length})
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
              {filtered.map((req) => {
                const isSelected = activeRequirement?.id === req.id;
                const reqIdx = requirements.findIndex((r) => r.id === req.id);
                return (
                  <DeletableItem
                    key={req.id}
                    onDelete={() => removeRequirement(reqIdx)}
                    itemTitle="módulo de alcance"
                  >
                    <div
                      onClick={() => setSelectedRequirementId(req.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between shadow-xs ${
                        isSelected
                          ? "bg-[var(--text-primary)] text-[var(--bg-main)] border-[var(--text-primary)] shadow-md scale-[1.02]"
                          : "bg-[var(--bg-main)] text-[var(--text-primary)] border-[var(--border-color)] hover:border-[var(--accent-color)]/40"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {isSelected ? (
                          <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-color)]" />
                          </span>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-[var(--border-color)]" />
                        )}

                        <div>
                          <span className={`text-[10px] font-mono font-bold block ${isSelected ? "opacity-70" : "text-[var(--text-primary)]/60"}`}>
                            {req.id} • {req.category}
                          </span>
                          <h4 className={`text-xs sm:text-sm font-extrabold block leading-snug ${isSelected ? "text-[var(--bg-main)]" : "text-[var(--text-primary)]"}`}>
                            <EditableText
                              value={req.title}
                              onChange={(val) => updateRequirement(reqIdx, { title: val })}
                              tag="span"
                            />
                          </h4>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[var(--accent-color)] translate-x-1" : "opacity-50"}`} />
                    </div>
                  </DeletableItem>
                );
              })}
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className="xl:col-span-8">
            {activeRequirement && (
              <div id="card-inspector-02" className="bg-[var(--bg-main)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 md:p-9 shadow-md flex flex-col justify-between min-h-[420px] w-full relative overflow-hidden transition-colors duration-300">
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
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 flex items-center justify-center">
                            {getCategoryIcon(activeRequirement.category)}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3.5 py-1 rounded-full border border-[var(--accent-color)]/30">
                            Módulo de {activeRequirement.category}
                          </span>
                        </div>

                        <span className="text-xs font-mono font-bold text-[var(--text-primary)]/70 px-3 py-1 rounded-md bg-[var(--bg-main)] border border-[var(--border-color)]">
                          {activeRequirement.id}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-2xl md:text-3xl font-extrabold font-display text-[var(--text-primary)] mb-3 leading-tight">
                        <EditableText
                          value={activeRequirement.title}
                          onChange={(val) => updateRequirement(activeReqIndex, { title: val })}
                          tag="span"
                        />
                      </h3>
                      <div className="text-[var(--text-primary)]/80 text-sm md:text-base leading-relaxed font-normal max-w-2xl">
                        <EditableText
                          value={activeRequirement.description}
                          onChange={(val) => updateRequirement(activeReqIndex, { description: val })}
                          multiline
                          tag="p"
                        />
                      </div>
                    </div>

                    {/* Deliverables Grid Zone */}
                    <div className="pt-5 border-t border-[var(--border-color)] mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block font-mono">
                          ENTREGABLES Y CAPACIDADES CLAVE:
                        </span>
                        {isDesignMode && (
                          <button
                            onClick={() => {
                              const updatedDeliverables = [...activeRequirement.deliverables, "Nuevo Entregable"];
                              updateRequirement(activeReqIndex, { deliverables: updatedDeliverables });
                            }}
                            className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Añadir Entregable</span>
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeRequirement.deliverables.map((del, dIdx) => (
                          <DeletableItem
                            key={dIdx}
                            onDelete={() => {
                              const updatedDeliverables = activeRequirement.deliverables.filter((_, i) => i !== dIdx);
                              updateRequirement(activeReqIndex, { deliverables: updatedDeliverables });
                            }}
                            itemTitle="entregable"
                          >
                            <div className="bg-[var(--accent-color)]/10 text-[var(--accent-color)] text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-[var(--accent-color)]/30 flex items-center gap-2.5 shadow-xs">
                              <div className="w-5 h-5 rounded-full bg-[var(--accent-color)] text-white flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[var(--text-primary)] font-medium leading-snug">
                                <EditableText
                                  value={del}
                                  onChange={(newDelVal) => {
                                    const updatedDeliverables = [...activeRequirement.deliverables];
                                    updatedDeliverables[dIdx] = newDelVal;
                                    updateRequirement(activeReqIndex, { deliverables: updatedDeliverables });
                                  }}
                                  tag="span"
                                />
                              </span>
                            </div>
                          </DeletableItem>
                        ))}
                      </div>
                    </div>

                    {/* Footer Tag */}
                    <div className="pt-4 border-t border-[var(--border-color)] mt-4 flex items-center justify-between text-xs text-[var(--text-primary)]/60 font-mono">
                      <span>ENFOCO S.R.L. • Arquitectura Verificada</span>
                      <span className="text-[var(--accent-color)] font-bold">100% Garantizado</span>
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
