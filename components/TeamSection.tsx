"use client";

import React, { useState } from "react";
import { ProposalData, TeamMember } from "@/data/proposalData";
import { CheckCircle2, Percent, Users, ShieldCheck, Briefcase, Cpu, Code, Database, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamSectionProps {
  team: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);
  const selectedMember = team[selectedRoleIndex] || team[0];

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-[#2563EB]" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-[#2563EB]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 text-[#2563EB]" />;
      case "Code":
        return <Code className="w-5 h-5 text-[#2563EB]" />;
      case "Database":
        return <Database className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <Users className="w-5 h-5 text-[#2563EB]" />;
    }
  };

  return (
    <section id="equipo" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[#FAF9F6] border-t border-[#E4E4E7] px-4 sm:px-6 lg:px-8">
      {/* 💻 Screen Interactive Inspector View */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="screen-only max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3.5 py-1 rounded-full border border-[#BFDBFE]">
            MATRIZ DE RECURSOS • ESPECIFICACIÓN OFICIAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#111111] mt-2.5 mb-1.5">
            Recursos Necesarios & Roles del Proyecto
          </h2>
          <p className="text-[#52525B] text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Seleccione cualquier rol a la derecha para inspeccionar sus responsabilidades y alcance técnico en el panel izquierdo.
          </p>
        </div>

        {/* Master-Detail Interactive Split Layout (Max-w-7xl) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-7xl mx-auto w-full">
          {/* Left Column (col-span-5) - Dynamic Master Inspector Dark Card */}
          <div className="lg:col-span-5 bg-[#18181B] text-white rounded-3xl p-7 sm:p-8 shadow-2xl flex flex-col justify-between border border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#2563EB]/15 blur-3xl rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRoleIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                      {getRoleIcon(selectedMember.iconName)}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#2563EB] text-white text-xs font-bold shadow-xs">
                      {selectedMember.dedicationPercent}% Dedicación
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                    {selectedMember.category} • Inspección Activa
                  </span>
                  <h3 className="text-2xl font-black font-display text-white mb-4 leading-tight">
                    {selectedMember.role}
                  </h3>

                  <div className="space-y-3 pt-4 border-t border-white/10 mb-6">
                    <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block font-mono">
                      Responsabilidades Principales:
                    </span>
                    {selectedMember.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start space-x-2.5 text-xs text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-normal">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <ShieldCheck className="w-5 h-5 text-[#2563EB]" />
                    <span className="font-semibold">Estándar CMMI / ISO 27002</span>
                  </div>
                  <span className="font-mono text-zinc-400 text-[11px]">ENFOCO S.R.L.</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column (col-span-7) - Interactive Selector List */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE] inline-flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>🖱️ Haz clic en un rol para inspeccionar detalles</span>
              </span>
              <span className="text-xs font-mono text-[#71717A] font-semibold">5 Roles Lead</span>
            </div>

            <div className="space-y-2.5">
              {team.map((member, idx) => {
                const isSelected = selectedRoleIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedRoleIndex(idx)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between shadow-xs ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF6FF]/30 shadow-md translate-x-1"
                        : "border-[#E4E4E7] bg-white hover:border-[#2563EB]/40 hover:bg-[#FAF9F6]"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected ? "bg-[#2563EB] text-white" : "bg-[#EFF6FF] text-[#2563EB]"
                        }`}
                      >
                        {getRoleIcon(member.iconName)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider font-mono block">
                          {member.category}
                        </span>
                        <h4 className={`text-xs sm:text-sm font-extrabold block ${isSelected ? "text-[#2563EB]" : "text-[#111111]"}`}>
                          {member.role}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                        {member.dedicationPercent}%
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[#2563EB] translate-x-1" : "text-[#A1A1AA]"}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🖨️ Print-Only Full Unwrapped View (All 5 Roles Visible in PDF) */}
      <div className="print-only max-w-7xl mx-auto w-full my-auto">
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-4 py-1.5 rounded-full border border-[#BFDBFE]">
            MATRIZ DE RECURSOS Y EQUIPO DEL PROYECTO
          </span>
          <h2 className="text-2xl font-extrabold text-[#111111] mt-2 mb-1">
            Roles, Responsabilidades & Dedicación (100% Desplegado)
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white border border-[#E4E4E7] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#52525B] px-2 py-0.5 rounded bg-[#F4F4F5]">
                    {member.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                    {member.dedicationPercent}% Dedicación
                  </span>
                </div>

                <h3 className="text-xs font-extrabold text-[#111111] mb-2">{member.role}</h3>

                <div className="space-y-1 text-[10px] text-[#52525B]">
                  <span className="font-bold text-[#111111] font-mono block">Responsabilidades:</span>
                  {member.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-[#E4E4E7] text-[9px] text-[#71717A] flex justify-between">
                <span>ENFOCO S.R.L.</span>
                <span className="font-mono">Asignado</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
