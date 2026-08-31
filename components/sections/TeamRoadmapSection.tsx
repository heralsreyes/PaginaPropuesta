"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { ProposalData } from "@/data/proposalData";

interface TeamRoadmapSectionProps {
  secId: string;
  proposal: ProposalData;
}

const sectionContainerVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const TeamRoadmapSection: React.FC<TeamRoadmapSectionProps> = ({ secId, proposal }) => {
  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden theme-section-bg bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#004F54]/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10"
      >
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] theme-h2-color uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec8_badge" defaultText="08. ESTRUCTURA DE EJECUCIÓN" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white theme-h1-color">
            <EditableField id="sec8_h2" defaultText="Equipo Especialista & Cronograma (8-12 Semanas)" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 theme-text-color max-w-3xl mx-auto font-medium">
            <EditableField id="sec8_desc" defaultText="Equipo multidisciplinario asignado y plan de trabajo estructurado por entregables valorados." />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposal.team.map((member, i) => (
            <div key={i} className="p-6 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F08D17] shrink-0 font-bold">
                  <UserCheck className="w-6 h-6 text-[#F08D17]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white">{member.role}</h3>
                  <span className="text-xs text-emerald-300 font-mono font-bold">
                    {member.category} • {member.dedicationPercent}% Dedicación
                  </span>
                </div>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200 pl-2">
                {member.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx}>• {resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
