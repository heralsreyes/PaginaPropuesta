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
      {/* Brand Badge Left (Exotic Dual-Chamber Synergy Badge) */}
      <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-2xl bg-[#002224]/90 backdrop-blur-2xl border border-[#F08D17]/70 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-[#F08D17]/30 hover:border-[#F08D17] transition-all duration-300 hover:scale-[1.02] select-none group">
        {/* Provider Chamber (ENFOCO) */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[#F08D17] animate-pulse shadow-sm shadow-[#F08D17]" />
            <span className="absolute w-3.5 h-3.5 rounded-full bg-[#F08D17]/40 animate-ping" />
          </div>
          <span className="font-black text-xs tracking-widest text-white uppercase group-hover:text-[#F08D17] transition-colors">
            ENFOCO
          </span>
        </div>

        {/* Center Connection Icon */}
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#F08D17]/20 border border-[#F08D17]/40 text-[#F08D17] shrink-0">
          <Sparkles className="w-3 h-3" />
        </div>

        {/* Client Chamber (Excel Puesto de Bolsa, S.A. & ESAFI) */}
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-xl bg-[#001416]/90 border border-white/15">
          <div className="flex flex-col text-left">
            <span className="text-[8px] font-mono font-bold text-[#F08D17] uppercase tracking-wider leading-none mb-0.5">
              PROPUESTA EXCLUSIVA PARA:
            </span>
            <span className="text-xs font-mono font-extrabold text-slate-100 tracking-tight leading-tight">
              Excel Puesto de Bolsa & ESAFI
            </span>
          </div>
          <span className="text-[8px] font-mono font-black uppercase px-1.5 py-0.5 rounded bg-[#F08D17]/30 text-[#F08D17] border border-[#F08D17]/50 shrink-0">
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
