"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Building2, ArrowRight, Smartphone } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { ProposalData } from "@/data/proposalData";

interface ExecutiveSummarySectionProps {
  secId: string;
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
}

export const ExecutiveSummarySection: React.FC<ExecutiveSummarySectionProps> = ({
  secId,
}) => {
  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-between items-center relative overflow-hidden bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 pt-24 pb-12 transition-colors duration-300 border-b border-[#004F54]/50"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#F08D17]/10 blur-[200px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto text-center relative z-10 my-auto w-full flex flex-col items-center px-2 space-y-6"
      >
        {/* Top Section Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F08D17] text-xs sm:text-sm font-extrabold font-mono tracking-wider uppercase shadow-md">
          <Sparkles className="w-4 h-4 text-[#F08D17]" />
          <EditableField id="sec1_badge" defaultText="01. Presentación Ejecutiva Institucional" />
        </div>

        {/* JUMBO CO-BRANDING HERO BANNER (DELIMITADO CON BORDE DE CRISTAL BLANCO) */}
        <div className="w-full max-w-5xl mx-auto my-3 p-6 sm:p-8 rounded-3xl bg-[#004F54]/80 backdrop-blur-2xl shadow-2xl border-2 border-white/25 relative overflow-hidden transition-all text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center text-center md:text-left justify-between relative z-10">
            {/* Lado Izquierdo: EMPRESA (ENFOCO S.R.L.) */}
            <div className="flex flex-col items-center md:items-start space-y-1">
              <span className="text-xs font-mono font-extrabold text-emerald-200 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                EMPRESA DESARROLLADORA
              </span>
              <div className="flex items-center gap-3 pt-1">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
                  ENFOCO<span className="text-emerald-400">.</span>
                </span>
                <span className="text-sm sm:text-base px-3 py-1 rounded-xl bg-white/15 text-emerald-300 font-black font-mono border border-white/20 shadow-md">
                  S.R.L.
                </span>
              </div>
            </div>

            {/* Lado Derecho: CLIENTE (EXCEL PUESTO DE BOLSA & ESAFI) */}
            <div className="flex flex-col items-center md:items-end space-y-1 text-center md:text-right">
              <span className="text-xs font-mono font-extrabold text-emerald-200 uppercase tracking-widest flex items-center gap-1.5">
                CLIENTE INSTITUCIONAL
                <Building2 className="w-4 h-4 text-emerald-300" />
              </span>
              <div className="pt-1">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight block leading-tight drop-shadow-sm font-display">
                  EXCEL PUESTO DE BOLSA & ESAFI
                </span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display text-white text-center leading-[1.1] max-w-5xl mx-auto tracking-tight pt-2">
          <EditableField id="sec1_h1_part1" defaultText="Portal de Inversionistas & " />
          <span className="text-[#F08D17]">
            <EditableField id="sec1_h1_part2" defaultText="App Móvil Inteligente" />
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-200/90 text-center max-w-3xl mx-auto leading-relaxed font-medium">
          <EditableField
            id="sec1_desc"
            defaultText="Plataforma de autogestión 24/7 para clientes e inversionistas de Excel: Portafolio 360°, Trade Ticket digital con aprobación fehaciente, integración directa con Microsoft Dynamics CRM & SIFI Fondos, y resúmenes con Inteligencia Artificial."
          />
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#sec-7-epicas-alcance"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-[#F08D17] to-[#EA580C] hover:from-[#EA580C] hover:to-[#D97706] text-white font-black px-9 py-4 rounded-2xl shadow-xl shadow-[#F08D17]/30 transition-all transform hover:scale-105 active:scale-95 text-base"
          >
            <span>Explorar las 7 Épicas</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </a>
          <a
            href="#sec-simulador-interactivo-app"
            className="inline-flex items-center space-x-2.5 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white font-bold px-7 py-4 rounded-2xl shadow-lg transition-all text-base"
          >
            <Smartphone className="w-5 h-5 text-[#F08D17]" />
            <span>Simulador App Móvil</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};
