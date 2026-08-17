"use client";

import React from "react";
import { ProposalData } from "@/data/proposalData";
import { useProposal } from "@/context/ProposalContext";
import { EditableText } from "@/components/studio/EditableText";
import { ShieldCheck, Calendar, FileText, UserCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ proposal }) => {
  const { updateProject, updateClient } = useProposal();

  return (
    <section id="hero" className="min-h-screen w-full flex flex-col justify-between items-center relative overflow-hidden bg-[var(--bg-main)] px-4 sm:px-6 lg:px-8 pt-20 pb-8 transition-colors duration-300">
      {/* Background Accent Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[var(--accent-color)]/10 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center relative z-10 my-auto w-full flex flex-col items-center px-2"
      >
        {/* Tracking Label */}
        <span className="text-xs font-bold tracking-widest text-[#71717A] uppercase mb-3">
          PRESENTACIÓN EJECUTIVA · PROPUESTA TÉCNICA
        </span>

        {/* Co-Branding Header */}
        <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm text-xs font-semibold uppercase tracking-wider mb-5 transition-colors duration-300">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black font-display text-[var(--text-primary)]">
              ENFOCO<span className="text-[var(--accent-color)]">.</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[var(--text-primary)] border border-[var(--border-color)] font-medium leading-none">
              S.R.L.
            </span>
          </div>

          <span className="text-[#D4D4D8] font-light text-xs">|</span>

          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)]">
            <EditableText
              value={proposal.client.name}
              onChange={(val) => updateClient({ name: val })}
              tag="span"
            />
          </span>
        </div>

        {/* Dynamic 2-Tone Headline with Accent */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display text-[var(--text-primary)] text-center leading-[1.14] max-w-3xl mx-auto tracking-tight mb-4 transition-colors duration-300">
          {proposal.project.heroTitleAccent ? (
            <>
              <EditableText
                value={proposal.project.heroTitlePrefix || ""}
                onChange={(val) => updateProject({ heroTitlePrefix: val })}
                tag="span"
              />{" "}
              <span className="text-[var(--accent-color)]">
                <EditableText
                  value={proposal.project.heroTitleAccent}
                  onChange={(val) => updateProject({ heroTitleAccent: val })}
                  tag="span"
                />
              </span>{" "}
              <EditableText
                value={proposal.project.heroTitleSuffix || ""}
                onChange={(val) => updateProject({ heroTitleSuffix: val })}
                tag="span"
              />
            </>
          ) : (
            <EditableText
              value={proposal.project.heroHeadline || "Una nueva era en la *automatización & gestión* operativa"}
              onChange={(val) => updateProject({ heroHeadline: val })}
              tag="span"
            />
          )}
        </h1>

        {/* Dynamic Subtitle */}
        <div className="text-xs sm:text-sm md:text-base text-[var(--text-primary)]/80 text-center max-w-xl mx-auto mt-1 mb-5 font-normal leading-relaxed transition-colors duration-300">
          <EditableText
            value={
              proposal.project.heroSubtitle ||
              `Transformando la operativa de ${proposal.client.shortName} a través de una arquitectura web moderna, escalable y desarrollada a la medida.`
            }
            onChange={(val) => updateProject({ heroSubtitle: val })}
            multiline
            tag="p"
          />
        </div>

        {/* Call to Action (CTA) Button */}
        <div className="flex items-center justify-center mb-5">
          <a
            href="#alcance"
            className="inline-flex items-center space-x-2.5 bg-[var(--accent-color)] hover:opacity-90 text-white font-bold px-7 py-3 rounded-full shadow-lg shadow-[var(--accent-color)]/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer text-sm"
          >
            <span>Comenzar Experiencia</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Expanded High-Scale Bottom Metadata Card (Grid-cols-2 on tablet/studio, grid-cols-4 on xl screens) */}
        <div className="max-w-4xl w-full mx-auto p-4 sm:p-5 rounded-3xl bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-lg shadow-zinc-900/5 mt-2 text-left grid grid-cols-2 xl:grid-cols-4 gap-4 items-center divide-y xl:divide-y-0 xl:divide-x divide-[var(--border-color)] transition-colors duration-300">
          {/* Column 1: Fecha de Emisión */}
          <div className="px-3 py-1 flex flex-col justify-center">
            <div className="text-[11px] font-semibold text-[var(--text-primary)]/60 uppercase tracking-wider gap-1.5 flex items-center mb-1">
              <Calendar className="w-4 h-4 text-[var(--accent-color)]" />
              <span>Fecha de Emisión</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] leading-tight">
              <EditableText
                value={proposal.project.date}
                onChange={(val) => updateProject({ date: val })}
                tag="span"
              />
            </p>
          </div>

          {/* Column 2: Versión & Código */}
          <div className="px-3 py-1 flex flex-col justify-center pt-3 xl:pt-1">
            <div className="text-[11px] font-semibold text-[var(--text-primary)]/60 uppercase tracking-wider gap-1.5 flex items-center mb-1">
              <FileText className="w-4 h-4 text-[var(--accent-color)]" />
              <span>Versión & Código</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] leading-tight">
              v{proposal.project.version} (
              <EditableText
                value={proposal.project.code}
                onChange={(val) => updateProject({ code: val })}
                tag="span"
              />
              )
            </p>
          </div>

          {/* Column 3: Preparado Por */}
          <div className="px-3 py-1 flex flex-col justify-center pt-3 xl:pt-1">
            <div className="text-[11px] font-semibold text-[var(--text-primary)]/60 uppercase tracking-wider gap-1.5 flex items-center mb-1">
              <UserCheck className="w-4 h-4 text-[var(--accent-color)]" />
              <span>Preparado Por</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] leading-tight">
              <EditableText
                value={proposal.project.author}
                onChange={(val) => updateProject({ author: val })}
                tag="span"
              />
            </p>
          </div>

          {/* Column 4: Garantía Incluida */}
          <div className="px-3 py-1 flex flex-col justify-center pt-3 xl:pt-1">
            <div className="text-[11px] font-semibold text-[var(--text-primary)]/60 uppercase tracking-wider gap-1.5 flex items-center mb-1">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-color)]" />
              <span>Garantía Incluida</span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-[var(--accent-color)] leading-tight">
              <EditableText
                value={proposal.project.guaranteePeriod || "60 Días Cobertura"}
                onChange={(val) => updateProject({ guaranteePeriod: val })}
                tag="span"
              />
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
