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
      {/* Brand Badge Left (Sleek Compact Dual-Tone Pill Badge) */}
      <div className="pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#00383C]/95 via-[#002224]/95 to-[#001416]/95 backdrop-blur-xl border border-[#F08D17]/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] ring-1 ring-[#F08D17]/30 hover:border-[#F08D17] transition-all duration-300 hover:scale-[1.02] select-none group">
        {/* Live Gold Pulse Dot */}
        <span className="w-2 h-2 rounded-full bg-[#F08D17] animate-pulse shadow-sm shadow-[#F08D17] shrink-0" />

        {/* Provider Brand Logo */}
        <span className="font-black text-xs text-white tracking-wider uppercase group-hover:text-[#F08D17] transition-colors shrink-0">
          ENFOCO
        </span>

        {/* Divider Dot */}
        <span className="text-[#F08D17] font-bold text-xs shrink-0">•</span>

        {/* Client Brand with Emerald-to-Gold Gradient Text */}
        <span className="font-mono text-[11px] font-black uppercase tracking-tight bg-gradient-to-r from-emerald-300 via-amber-200 to-[#F08D17] bg-clip-text text-transparent truncate max-w-[240px] sm:max-w-none">
          Excel Puesto de Bolsa & ESAFI
        </span>
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
