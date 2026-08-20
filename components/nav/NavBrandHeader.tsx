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
      {/* Clean Authentic Brand Badge Left (Slightly Larger & Perfectly Balanced) */}
      <div className="pointer-events-auto flex items-center gap-3 px-4.5 py-2 rounded-2xl bg-[#002224]/90 backdrop-blur-xl border border-white/20 shadow-xl select-none">
        {/* Live Status Dot */}
        <span className="w-2.5 h-2.5 rounded-full bg-[#F08D17] animate-pulse shrink-0 shadow-sm shadow-[#F08D17]" />

        {/* Provider Brand */}
        <span className="font-extrabold text-xs sm:text-sm text-white tracking-wider uppercase">
          ENFOCO
        </span>

        {/* Divider */}
        <span className="text-slate-400 font-mono text-xs sm:text-sm font-bold">|</span>

        {/* Client Brand */}
        <span className="font-mono text-xs sm:text-sm font-bold text-slate-100">
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
