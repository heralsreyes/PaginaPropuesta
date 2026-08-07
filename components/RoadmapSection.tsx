"use client";

import React from "react";
import { RoadmapPhase } from "@/data/proposalData";
import { useProposal } from "@/context/ProposalContext";
import { useStudioStore } from "@/store/useStudioStore";
import { EditableText } from "@/components/studio/EditableText";
import { DeletableItem } from "@/components/studio/DeletableItem";
import { CheckCircle2, Circle, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface RoadmapSectionProps {
  roadmap: RoadmapPhase[];
  estimatedDuration?: string;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ roadmap, estimatedDuration }) => {
  const { updateRoadmapPhase, removeRoadmapPhase, addRoadmapPhase } = useProposal();
  const { isDesignMode } = useStudioStore();

  const getComputedDuration = () => {
    if (estimatedDuration && estimatedDuration.trim()) {
      return estimatedDuration;
    }

    if (!roadmap || roadmap.length === 0) return "12 a 16 Semanas";

    const allNumbers: number[] = [];
    roadmap.forEach((p) => {
      const matches = p.duration.match(/\d+/g);
      if (matches) {
        matches.forEach((m) => allNumbers.push(parseInt(m, 10)));
      }
    });

    if (allNumbers.length >= 2) {
      const min = Math.min(...allNumbers);
      const max = Math.max(...allNumbers);
      return `${max} Semanas (${min} a ${max})`;
    } else if (allNumbers.length === 1) {
      return `${allNumbers[0]} Semanas`;
    }

    return "12 a 16 Semanas";
  };

  const getStatusBadge = (status: RoadmapPhase["status"], phaseIdx: number) => {
    const cycleStatus = () => {
      const nextStatus: RoadmapPhase["status"] =
        status === "Completado" ? "En Proceso" : status === "En Proceso" ? "Pendiente" : "Completado";
      updateRoadmapPhase(phaseIdx, { status: nextStatus });
    };

    switch (status) {
      case "Completado":
        return (
          <button
            onClick={cycleStatus}
            className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 cursor-pointer"
            title="Clic para cambiar estado de fase"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completado</span>
          </button>
        );
      case "En Proceso":
        return (
          <button
            onClick={cycleStatus}
            className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-2.5 py-1 rounded-full border border-[var(--accent-color)]/30 shadow-xs cursor-pointer"
            title="Clic para cambiar estado de fase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-color)]" />
            </span>
            <span>En Proceso</span>
          </button>
        );
      case "Pendiente":
        return (
          <button
            onClick={cycleStatus}
            className="inline-flex items-center space-x-1 text-[10px] font-semibold text-[var(--text-primary)]/60 bg-[var(--bg-main)] px-2.5 py-1 rounded-full border border-[var(--border-color)] cursor-pointer"
            title="Clic para cambiar estado de fase"
          >
            <Circle className="w-3 h-3 text-[var(--text-primary)]/40" />
            <span>Planificado</span>
          </button>
        );
    }
  };

  return (
    <section id="cronograma" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[var(--bg-main)] border-t border-[var(--border-color)] px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-5xl xl:max-w-6xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-4 py-1.5 rounded-full border border-[var(--accent-color)]/30">
            CRONOGRAMA DE EJECUCIÓN • ESTIMACIÓN: {getComputedDuration()}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[var(--text-primary)] mt-3 mb-2">
            Plan de Trabajo & Fases EDT
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Estructura de Descomposición del Trabajo secuencial diseñada para asegurar entregas continuas de valor.
          </p>
        </div>

        {/* Unified Stepper Container */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-5 sm:p-7 shadow-sm max-w-6xl mx-auto w-full relative transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-[var(--text-primary)]/60">
              FASES DEL PROYECTO ({roadmap.length})
            </span>
            {isDesignMode && (
              <button
                onClick={() =>
                  addRoadmapPhase({
                    phase: `Fase ${roadmap.length + 1}`,
                    title: "Nueva Fase",
                    duration: "2 Semanas",
                    status: "Pendiente",
                    description: "Descripción editable de la fase.",
                    milestones: ["Hito 1"],
                  })
                }
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Fase EDT</span>
              </button>
            )}
          </div>

          {/* Stepper Grid (Responsive 2x2 on studio/tablet, 4x1 on xl wide) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 relative z-10">
            {roadmap.map((item, idx) => (
              <DeletableItem
                key={idx}
                onDelete={() => removeRoadmapPhase(idx)}
                itemTitle="fase EDT"
              >
                <div className="min-h-[210px] p-5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:-translate-y-1 hover:border-[var(--accent-color)]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    {/* Large Node Badge & Status Badge */}
                    <div className="flex items-center justify-between w-full mb-2.5">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/30 shadow-xs">
                        {idx + 1}
                      </div>
                      {getStatusBadge(item.status, idx)}
                    </div>

                    {/* Phase Info */}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]/60 font-mono block mb-0.5">
                      <EditableText
                        value={item.phase}
                        onChange={(val) => updateRoadmapPhase(idx, { phase: val })}
                        tag="span"
                      />{" "}
                      •{" "}
                      <EditableText
                        value={item.duration}
                        onChange={(val) => updateRoadmapPhase(idx, { duration: val })}
                        tag="span"
                      />
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] mb-1.5 leading-snug">
                      <EditableText
                        value={item.title}
                        onChange={(val) => updateRoadmapPhase(idx, { title: val })}
                        tag="span"
                      />
                    </h3>
                    <div className="text-[11px] text-[var(--text-primary)]/70 leading-relaxed mb-3 font-normal">
                      <EditableText
                        value={item.description}
                        onChange={(val) => updateRoadmapPhase(idx, { description: val })}
                        multiline
                        tag="p"
                      />
                    </div>
                  </div>

                  {/* Milestones Bullet List */}
                  <div className="w-full pt-2.5 border-t border-[var(--border-color)] space-y-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-[var(--text-primary)]/60 uppercase tracking-wider block font-mono">
                        Hitos Clave:
                      </span>
                      {isDesignMode && (
                        <button
                          onClick={() => {
                            const updatedM = [...(item.milestones || []), "Nuevo Hito"];
                            updateRoadmapPhase(idx, { milestones: updatedM });
                          }}
                          className="text-[10px] font-bold text-[#2563EB] hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Hito</span>
                        </button>
                      )}
                    </div>

                    {item.milestones &&
                      item.milestones.map((m, mIdx) => (
                        <DeletableItem
                          key={mIdx}
                          onDelete={() => {
                            const updatedM = item.milestones.filter((_, i) => i !== mIdx);
                            updateRoadmapPhase(idx, { milestones: updatedM });
                          }}
                          itemTitle="hito"
                        >
                          <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] text-[var(--text-primary)]/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-color)] shrink-0" />
                            <span className="font-medium text-[var(--text-primary)] leading-tight">
                              <EditableText
                                value={m}
                                onChange={(newM) => {
                                  const updatedM = [...item.milestones];
                                  updatedM[mIdx] = newM;
                                  updateRoadmapPhase(idx, { milestones: updatedM });
                                }}
                                tag="span"
                              />
                            </span>
                          </div>
                        </DeletableItem>
                      ))}
                  </div>
                </div>
              </DeletableItem>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
