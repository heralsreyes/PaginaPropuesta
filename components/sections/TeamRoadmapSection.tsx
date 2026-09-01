import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, Plus, Trash2, Calendar, CheckCircle2, Clock } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { EditableBlockWrapper } from "@/components/studio/EditableBlockWrapper";
import { useStudioStore } from "@/store/useStudioStore";
import { useProposal } from "@/context/ProposalContext";
import { ProposalData, TeamMember, RoadmapPhase } from "@/types/proposal";

interface TeamRoadmapSectionProps {
  secId: string;
  proposal?: ProposalData;
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

export const TeamRoadmapSection: React.FC<TeamRoadmapSectionProps> = ({ secId, proposal: propProp }) => {
  const { proposal: contextProp, addRoadmapPhase, removeRoadmapPhase, updateRoadmapPhase } = useProposal();
  const proposal = propProp || contextProp;
  const { isDesignMode } = useStudioStore();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(proposal.team || []);

  const roadmapPhases = proposal.roadmap || [];

  const handleDeleteMember = (index: number) => {
    if (teamMembers.length <= 1) return;
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleAddMember = () => {
    const newMember: TeamMember = {
      role: "Especialista Frontend / QA",
      category: "Construcción",
      dedicationPercent: 100,
      responsibilities: [
        "Desarrollo e integración de interfaces",
        "Aseguramiento de calidad y pruebas UAT",
      ],
      iconName: "Cpu",
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const durationEst = proposal.project?.estimatedDuration || "8-12 Semanas";

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
        className="max-w-6xl mx-auto w-full space-y-12"
      >
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] theme-h2-color uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec8_badge" defaultText="08. ESTRUCTURA DE EJECUCIÓN & CRONOGRAMA" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white theme-h1-color">
            <EditableField id="sec8_h2" defaultText={`Equipo Especialista & Cronograma (${durationEst})`} />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 theme-text-color max-w-3xl mx-auto font-medium">
            <EditableField id="sec8_desc" defaultText="Equipo multidisciplinario asignado y plan de trabajo estructurado por hitos y entregables de valor." />
          </p>
        </div>

        {/* 1. Team Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#F08D17]" />
              <span>Equipo Multidisciplinario Asignado</span>
            </h3>
            {isDesignMode && (
              <button
                onClick={handleAddMember}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#F08D17] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Integrante</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <EditableBlockWrapper
                key={i}
                id={`team-member-${i}`}
                label="Integrante"
                onDelete={teamMembers.length > 1 ? () => handleDeleteMember(i) : undefined}
                className="h-full"
              >
                <div className="p-6 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4 text-white h-full flex flex-col justify-between hover:border-[#F08D17]/50 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F08D17] shrink-0 font-bold">
                        <UserCheck className="w-6 h-6 text-[#F08D17]" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base sm:text-lg text-white">
                          <EditableField id={`sec8_member_${i}_role`} defaultText={member.role} />
                        </h4>
                        <span className="text-xs text-emerald-300 font-mono font-bold">
                          <EditableField id={`sec8_member_${i}_meta`} defaultText={`${member.category} • ${member.dedicationPercent}% Dedicación`} />
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-200 pl-2">
                      {member.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>
                          • <EditableField id={`sec8_member_${i}_resp_${rIdx}`} defaultText={resp} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </EditableBlockWrapper>
            ))}
          </div>
        </div>

        {/* 2. Roadmap Timeline Display */}
        <div className="space-y-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#F08D17]" />
                <span>Cronograma de Ejecución & Hitos Clave</span>
              </h3>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                Estimación de entrega modular continua • {durationEst}
              </p>
            </div>
            {isDesignMode && (
              <button
                onClick={() => addRoadmapPhase({ title: "Nueva Fase EDT", duration: "Semanas 9-10" })}
                className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#F08D17] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Fase</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapPhases.map((phase, pIdx) => (
              <EditableBlockWrapper
                key={pIdx}
                id={`roadmap-phase-${pIdx}`}
                label="Fase del Cronograma"
                onDelete={roadmapPhases.length > 1 ? () => removeRoadmapPhase(pIdx) : undefined}
                className="h-full"
              >
                <div className="p-6 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4 text-white h-full flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F08D17]/20 text-[#F08D17] border border-[#F08D17]/40">
                        {phase.phase || `Fase ${pIdx + 1}`}
                      </span>
                      <span className="text-xs font-mono text-emerald-300 flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                        <Clock className="w-3 h-3" />
                        {phase.duration}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base sm:text-lg text-white">
                      <EditableField id={`sec8_phase_${pIdx}_title`} defaultText={phase.title} />
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      <EditableField id={`sec8_phase_${pIdx}_desc`} defaultText={phase.description} />
                    </p>

                    {phase.milestones && phase.milestones.length > 0 && (
                      <div className="pt-2 border-t border-white/10 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                          Entregables / Hitos:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-200">
                          {phase.milestones.map((m, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <EditableField id={`sec8_phase_${pIdx}_ms_${mIdx}`} defaultText={m} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </EditableBlockWrapper>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
