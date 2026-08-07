"use client";

import React from "react";
import { RoadmapPhase } from "@/data/proposalData";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

interface RoadmapSectionProps {
  roadmap: RoadmapPhase[];
  estimatedDuration?: string;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ roadmap, estimatedDuration }) => {
  // Helper to dynamically calculate total project duration from phase durations if available
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

  const getStatusBadge = (status: RoadmapPhase["status"]) => {
    switch (status) {
      case "Completado":
        return (
          <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completado</span>
          </span>
        );
      case "En Proceso":
        return (
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-bold text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-2.5 py-1 rounded-full border border-[var(--accent-color)]/30 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-color)]" />
            </span>
            <span>En Proceso</span>
          </span>
        );
      case "Pendiente":
        return (
          <span className="inline-flex items-center space-x-1 text-[10px] font-semibold text-[var(--text-primary)]/60 bg-[var(--bg-main)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
            <Circle className="w-3 h-3 text-[var(--text-primary)]/40" />
            <span>Planificado</span>
          </span>
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
        className="max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-4 py-1.5 rounded-full border border-[var(--accent-color)]/30">
            CRONOGRAMA DE EJECUCIÓN • ESTIMACIÓN: {getComputedDuration()}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--text-primary)] mt-3 mb-2">
            Plan de Trabajo & Fases EDT
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Estructura de Descomposición del Trabajo secuencial diseñada para asegurar entregas continuas de valor.
          </p>
        </div>

        {/* Unified Stepper Container */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-7 sm:p-9 shadow-sm max-w-7xl mx-auto w-full relative transition-colors duration-300">
          {/* Thick Gradient Connecting Line */}
          <div className="hidden md:block absolute top-[5.25rem] left-[6%] right-[6%] h-1 bg-gradient-to-r from-[var(--accent-color)] via-blue-500 to-[var(--border-color)] z-0 rounded-full" />

          {/* Stepper Grid (4 Expanded Content Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {roadmap.map((item, idx) => (
              <div
                key={idx}
                className="min-h-[220px] p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:-translate-y-1 hover:border-[var(--accent-color)]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Large Node Badge & Status Badge */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-base bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/30 shadow-md shadow-[var(--accent-color)]/15">
                      {idx + 1}
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  {/* Phase Info */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]/60 font-mono block mb-0.5">
                    {item.phase} • {item.duration}
                  </span>
                  <h3 className="text-sm font-extrabold text-[var(--text-primary)] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed mb-4 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Milestones Bullet List */}
                <div className="w-full pt-3 border-t border-[var(--border-color)] space-y-1.5 text-left">
                  <span className="text-[10px] font-bold text-[var(--text-primary)]/60 uppercase tracking-wider block font-mono">
                    Hitos Clave:
                  </span>
                  {item.milestones &&
                    item.milestones.map((m, mIdx) => (
                      <div key={mIdx} className="flex items-center space-x-1.5 text-[11px] text-[var(--text-primary)]/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-color)] shrink-0" />
                        <span className="font-medium text-[var(--text-primary)] leading-tight">{m}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
