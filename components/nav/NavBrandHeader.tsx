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
      {/* Clean Mint Emerald & White Glass Brand Card */}
      <div className="pointer-events-auto flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#002224]/95 backdrop-blur-2xl border border-white/20 shadow-xl select-none group hover:border-white/40 transition-all duration-300">
        {/* White Live Status Indicator Dot */}
        <span className="w-2.5 h-2.5 rounded-full bg-white shadow-sm shrink-0" />

        {/* Enfoco Logo */}
        <div className="flex items-center gap-0.5">
          <span className="font-black text-base text-white tracking-wide">
            Enfoco
          </span>
          <span className="text-emerald-400 font-black text-lg leading-none">.</span>
        </div>

        {/* Subtle White Divider Line */}
        <div className="h-4 w-[1.5px] bg-white/20 mx-0.5" />

        {/* Excel Mint Emerald Chip */}
        <div className="flex items-center gap-1.5 bg-[#004F54]/40 px-3 py-1 rounded-xl border border-emerald-500/30">
          <span className="font-mono text-sm font-extrabold text-emerald-300 tracking-wide">
            Excel
          </span>
        </div>
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
