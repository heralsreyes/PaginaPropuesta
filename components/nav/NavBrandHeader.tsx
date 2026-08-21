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
      {/* Authentic Human-Crafted Executive Brand Badge */}
      <div className="pointer-events-auto flex items-center px-5 py-2.5 rounded-2xl bg-[#002224]/90 backdrop-blur-md border border-white/15 shadow-lg select-none">
        {/* Provider Brand */}
        <span className="font-extrabold text-sm text-white tracking-wide">
          Enfoco
        </span>

        {/* Divider */}
        <span className="text-slate-400/80 font-mono text-sm mx-2.5">|</span>

        {/* Client Brand */}
        <span className="font-mono text-sm font-bold text-slate-200">
          Excel Puesto de bolsa
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
