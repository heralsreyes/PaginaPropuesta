"use client";

import React from "react";
import { ProposalData } from "@/types/proposal";
import { CheckCircle2, Sparkles } from "lucide-react";

interface NavBrandHeaderProps {
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
  onOpenCustomizer?: () => void;
}

export const NavBrandHeader: React.FC<NavBrandHeaderProps> = ({
  proposal,
  onOpenAcceptModal,
}) => {
  return (
    <div className="no-print fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
      {/* Brand Badge Left (Exotic Luxury Glassmorphism Badge) */}
      <div className="pointer-events-auto flex items-center gap-3.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-[#002224]/90 backdrop-blur-2xl border-2 border-[#F08D17]/60 shadow-[0_10px_35px_rgba(0,0,0,0.5)] ring-1 ring-[#F08D17]/30 hover:border-[#F08D17] transition-all duration-300 hover:scale-[1.02] select-none group">
        {/* Pulsing Live Gold Indicator Dot */}
        <div className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F08D17] animate-pulse shadow-md shadow-[#F08D17]" />
          <span className="absolute w-4 h-4 rounded-full bg-[#F08D17]/40 animate-ping" />
        </div>

        {/* ENFOCO Brand Logo */}
        <div className="flex items-center gap-1">
          <span className="font-black text-sm tracking-widest text-white font-sans uppercase group-hover:text-[#F08D17] transition-colors">
            ENFOCO
          </span>
          <span className="text-[#F08D17] font-black text-lg leading-none">.</span>
        </div>

        {/* Metallic Gold Vertical Divider */}
        <div className="h-4 w-[1.5px] bg-gradient-to-b from-transparent via-[#F08D17]/80 to-transparent mx-0.5" />

        {/* Client Pill Badge */}
        <div className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-xl border border-white/20 transition-all">
          <Sparkles className="w-3.5 h-3.5 text-[#F08D17] shrink-0" />
          <span className="text-xs font-mono font-extrabold text-slate-100 tracking-wide">
            {proposal?.client?.name || "Excel Puesto de Bolsa, S.A. & ESAFI"}
          </span>
          <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-[#F08D17]/30 text-[#F08D17] border border-[#F08D17]/50 shrink-0">
            OFICIAL
          </span>
        </div>
      </div>

      {/* Action Buttons Right */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenAcceptModal}
          className="px-4 py-2.5 rounded-2xl bg-[#004F54] hover:bg-[#006B70] text-white font-extrabold text-xs shadow-lg shadow-[#004F54]/30 border border-[#F08D17]/40 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-[#F08D17]" />
          <span>Aceptar Propuesta</span>
        </button>
      </div>
    </div>
  );
};
