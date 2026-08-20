"use client";

import React from "react";
import { ProposalData } from "@/types/proposal";
import { CheckCircle2, Sliders } from "lucide-react";

interface NavBrandHeaderProps {
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
  onOpenCustomizer?: () => void;
}

export const NavBrandHeader: React.FC<NavBrandHeaderProps> = ({
  proposal,
  onOpenAcceptModal,
  onOpenCustomizer,
}) => {
  return (
    <div className="no-print fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
      {/* Brand Badge Left */}
      <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-md text-xs font-bold">
        <div className="flex items-center gap-1">
          <span className="font-extrabold text-slate-900">ENFOCO</span>
          <span className="text-[#004F54] font-black">.</span>
        </div>
        <span className="text-slate-300">|</span>
        <span className="text-[#004F54] font-bold font-mono">
          {proposal?.client?.name || "EXCEL"}
        </span>
      </div>

      {/* Action Buttons Right */}
      <div className="pointer-events-auto flex items-center gap-2">
        {onOpenCustomizer && (
          <button
            onClick={onOpenCustomizer}
            className="p-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200 shadow-md transition-all hover:scale-105 cursor-pointer"
            title="Personalizar datos de la propuesta"
          >
            <Sliders className="w-4 h-4 text-[#004F54]" />
          </button>
        )}

        <button
          onClick={onOpenAcceptModal}
          className="px-4 py-2 rounded-2xl bg-[#004F54] hover:bg-[#006B70] text-white font-extrabold text-xs shadow-lg shadow-[#004F54]/20 transition-all hover:scale-105 cursor-pointer flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-[#F08D17]" />
          <span>Aceptar Propuesta</span>
        </button>
      </div>
    </div>
  );
};
