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
      {/* Brand Badge Left (Exotic Luxury Badge: ENFOCO / EXCEL) */}
      <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#002224]/90 backdrop-blur-xl border border-[#F08D17]/70 shadow-[0_8px_25px_rgba(0,0,0,0.4)] ring-1 ring-[#F08D17]/30 hover:border-[#F08D17] transition-all duration-300 hover:scale-[1.02] select-none group">
        {/* Pulsing Live Gold Indicator Dot */}
        <div className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F08D17] animate-pulse shadow-sm shadow-[#F08D17]" />
          <span className="absolute w-4 h-4 rounded-full bg-[#F08D17]/40 animate-ping" />
        </div>

        {/* ENFOCO / EXCEL Clean Text */}
        <div className="flex items-center gap-2 font-mono text-xs font-black text-white uppercase tracking-wider">
          <span className="font-extrabold text-white group-hover:text-[#F08D17] transition-colors">
            ENFOCO
          </span>
          <span className="text-[#F08D17] font-extrabold">/</span>
          <span className="font-black text-slate-100 tracking-widest text-xs bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
            EXCEL
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
