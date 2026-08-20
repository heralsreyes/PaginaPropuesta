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
      {/* Vertical Stacked Luxury Brand Card (Grows Downward, Compact Width) */}
      <div className="pointer-events-auto flex flex-col items-start gap-1.5 p-3.5 sm:p-4 rounded-2xl bg-[#002224]/95 backdrop-blur-2xl border border-white/20 shadow-2xl select-none min-w-[210px] sm:min-w-[230px] group hover:border-[#F08D17] transition-all duration-300">
        {/* Top Tier: Provider Logo & Live Dot */}
        <div className="flex items-center justify-between w-full border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F08D17] animate-pulse shrink-0 shadow-sm shadow-[#F08D17]" />
            <span className="font-black text-xs sm:text-sm text-white tracking-widest uppercase group-hover:text-[#F08D17] transition-colors">
              ENFOCO
            </span>
          </div>
          <span className="text-[9px] font-mono font-bold text-[#F08D17] uppercase bg-[#F08D17]/20 px-2 py-0.5 rounded-md border border-[#F08D17]/30">
            PROPUESTA
          </span>
        </div>

        {/* Bottom Tier: Client Name (Grows Downward) */}
        <div className="pt-0.5 w-full space-y-0.5">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block leading-none">
            PRESENTADO A:
          </span>
          <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-100 leading-tight block">
            Excel Puesto de Bolsa & ESAFI
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
