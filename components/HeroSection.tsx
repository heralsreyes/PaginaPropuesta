"use client";

import React from "react";
import { ProposalData } from "@/data/proposalData";
import { ShieldCheck, Calendar, FileText, UserCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ proposal, onOpenAcceptModal }) => {
  // Fallback helper to parse *asterisks* if explicit heroTitleAccent is not passed
  const renderFormattedHeadline = (text?: string) => {
    if (!text) {
      return (
        <>
          Una nueva era en la{" "}
          <span className="text-[var(--accent-color)]">
            automatización & gestión
          </span>{" "}
          operativa para {proposal.client.shortName}
        </>
      );
    }

    if (text.includes("*")) {
      const parts = text.split(/\*(.*?)\*/g);
      return parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="text-[var(--accent-color)]">
            {part}
          </span>
        ) : (
          part
        )
      );
    }

    return text;
  };

  return (
    <section id="hero" className="h-screen w-full snap-start snap-always flex flex-col justify-between items-center relative overflow-hidden bg-[var(--bg-main)] px-4 sm:px-6 lg:px-8 pt-20 pb-8 transition-colors duration-300">
      {/* Background Accent Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[var(--accent-color)]/10 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-6xl mx-auto text-center relative z-10 my-auto w-full flex flex-col items-center"
      >
        {/* Tracking Label */}
        <span className="text-xs font-bold tracking-widest text-[#71717A] uppercase mb-3">
          PRESENTACIÓN EJECUTIVA · PROPUESTA TÉCNICA
        </span>

        {/* Co-Branding Header */}
        <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm text-xs font-semibold uppercase tracking-wider mb-6 transition-colors duration-300">
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
            {proposal.client.name}
          </span>
        </div>

        {/* Dynamic 2-Tone Headline with Accent */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display text-[var(--text-primary)] text-center leading-[1.14] max-w-4xl mx-auto tracking-tight mb-4 transition-colors duration-300">
          {proposal.project.heroTitleAccent ? (
            <>
              {proposal.project.heroTitlePrefix}{" "}
              <span className="text-[var(--accent-color)]">
                {proposal.project.heroTitleAccent}
              </span>{" "}
              {proposal.project.heroTitleSuffix}
            </>
          ) : (
            renderFormattedHeadline(proposal.project.heroHeadline)
          )}
        </h1>

        {/* Dynamic Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-[var(--text-primary)]/80 text-center max-w-2xl mx-auto mt-2 mb-6 font-normal leading-relaxed transition-colors duration-300">
          {proposal.project.heroSubtitle ||
            `Transformando la operativa de ${proposal.client.shortName} a través de una arquitectura web moderna, escalable y desarrollada a la medida.`}
        </p>

        {/* Call to Action (CTA) Button */}
        <div className="flex items-center justify-center mb-6">
          <a
            href="#alcance"
            className="inline-flex items-center space-x-2.5 bg-[var(--accent-color)] hover:opacity-90 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-[var(--accent-color)]/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Comenzar Experiencia</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Expanded High-Scale Bottom Metadata Card */}
        <div className="max-w-5xl md:max-w-6xl w-full mx-auto p-5 md:p-6 rounded-3xl bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-lg shadow-zinc-900/5 mt-4 text-left grid grid-cols-2 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-[var(--border-color)] transition-colors duration-300">
          {/* Column 1: Fecha de Emisión */}
          <div className="px-4 py-2 flex flex-col justify-center">
            <div className="text-xs font-semibold text-[var(--text-primary)]/60 uppercase tracking-wider gap-2 flex items-center mb-1.5">
              <Calendar className="w-5 h-5 text-[var(--accent-color)]" />
              <span>Fecha de Emisión</span>
            </div>
            <p className="text-base md:text-lg font-extrabold text-[var(--text-primary)] whitespace-nowrap">{proposal.project.date}</p>
          </div>

          {/* Column 2: Versión & Código */}
          <div className="px-4 py-2 flex flex-col justify-center pt-4 md:pt-2">
            <div className="text-xs font-semibold text-[var(--text-primary)]/60 uppercase tracking-wider gap-2 flex items-center mb-1.5">
              <FileText className="w-5 h-5 text-[var(--accent-color)]" />
              <span>Versión & Código</span>
            </div>
            <p className="text-base md:text-lg font-extrabold text-[var(--text-primary)] whitespace-nowrap">v{proposal.project.version} ({proposal.project.code})</p>
          </div>

          {/* Column 3: Preparado Por */}
          <div className="px-4 py-2 flex flex-col justify-center pt-4 md:pt-2">
            <div className="text-xs font-semibold text-[var(--text-primary)]/60 uppercase tracking-wider gap-2 flex items-center mb-1.5">
              <UserCheck className="w-5 h-5 text-[var(--accent-color)]" />
              <span>Preparado Por</span>
            </div>
            <p className="text-base md:text-lg font-extrabold text-[var(--text-primary)] whitespace-nowrap">{proposal.project.author}</p>
          </div>

          {/* Column 4: Garantía Incluida */}
          <div className="px-4 py-2 flex flex-col justify-center pt-4 md:pt-2">
            <div className="text-xs font-semibold text-[var(--text-primary)]/60 uppercase tracking-wider gap-2 flex items-center mb-1.5">
              <ShieldCheck className="w-5 h-5 text-[var(--accent-color)]" />
              <span>Garantía Incluida</span>
            </div>
            <p className="text-base md:text-lg font-extrabold text-[var(--accent-color)] whitespace-nowrap">60 Días Cobertura</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
