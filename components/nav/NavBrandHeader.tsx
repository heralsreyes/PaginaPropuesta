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
      {/* Brand Badge Left (Compact Exotic Luxury Badge) */}
      <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#002224]/90 backdrop-blur-xl border border-[#F08D17]/70 shadow-[0_8px_25px_rgba(0,0,0,0.4)] ring-1 ring-[#F08D17]/30 hover:border-[#F08D17] transition-all duration-300 hover:scale-[1.02] select-none group">
        {/* Pulsing Live Gold Indicator Dot */}
        <div className="relative flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-[#F08D17] animate-pulse shadow-sm shadow-[#F08D17]" />
          <span className="absolute w-3.5 h-3.5 rounded-full bg-[#F08D17]/40 animate-ping" />
        </div>

        {/* ENFOCO Brand Logo */}
        <div className="flex items-center gap-0.5">
          <span className="font-black text-xs tracking-wider text-white uppercase group-hover:text-[#F08D17] transition-colors">
            ENFOCO
          </span>
          <span className="text-[#F08D17] font-black text-sm leading-none">.</span>
        </div>

        {/* Metallic Gold Vertical Divider */}
        <div className="h-3.5 w-[1px] bg-gradient-to-b from-transparent via-[#F08D17]/70 to-transparent" />

        {/* Client Pill Badge */}
        <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/15">
          <Sparkles className="w-3 h-3 text-[#F08D17] shrink-0" />
          <span className="text-[11px] font-mono font-bold text-slate-100 tracking-tight">
            Excel Puesto de Bolsa & ESAFI
          </span>
          <span className="text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-[#F08D17]/25 text-[#F08D17] border border-[#F08D17]/40 shrink-0">
            OFICIAL
          </span>
        </div>
      </div>

      {/* Action Buttons Right */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenAcceptModal}
          className="px-3.5 py-1.5 rounded-xl bg-[#004F54] hover:bg-[#006B70] text-white font-extrabold text-xs shadow-lg shadow-[#004F54]/30 border border-[#F08D17]/40 transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#F08D17]" />
          <span>Aceptar Propuesta</span>
        </button>
      </div>
    </div>
  );
};
