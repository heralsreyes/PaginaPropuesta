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
      {/* Horizontal Brand Card Container (Larger Prominent Enfoco | Excel) */}
      <div className="pointer-events-auto flex items-center gap-3.5 px-6 py-3.5 sm:px-7 rounded-2xl bg-[#002224]/95 backdrop-blur-xl border border-white/20 shadow-2xl select-none group hover:border-[#F08D17] transition-all duration-300">
        {/* Live Status Dot */}
        <span className="w-3.5 h-3.5 rounded-full bg-[#F08D17] animate-pulse shrink-0 shadow-md shadow-[#F08D17]" />

        {/* Enfoco Brand */}
        <span className="font-black text-base sm:text-lg text-white tracking-wide">
          Enfoco
        </span>

        {/* Divider */}
        <span className="text-slate-400 font-mono text-base sm:text-lg font-bold mx-0.5">|</span>

        {/* Excel Brand */}
        <span className="font-mono text-base sm:text-lg font-black text-slate-100 tracking-tight">
          Excel
        </span>
      </div>

      {/* Action Buttons Right */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenAcceptModal}
          className="px-3 py-1.5 rounded-xl bg-[#004F54] hover:bg-[#006B70] text-white font-extrabold text-[11px] sm:text-xs shadow-md border border-[#F08D17]/40 transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#F08D17]" />
          <span>Aceptar Propuesta</span>
        </button>
      </div>
    </div>
  );
};
