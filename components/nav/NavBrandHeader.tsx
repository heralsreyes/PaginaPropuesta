import React from "react";
import { ProposalData } from "@/types/proposal";
import { useProposal } from "@/context/ProposalContext";
import { EditableText } from "@/components/studio/EditableText";
import { CheckCircle2 } from "lucide-react";

interface NavBrandHeaderProps {
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
  onOpenCustomizer?: () => void;
}

export const NavBrandHeader: React.FC<NavBrandHeaderProps> = ({
  proposal,
  onOpenAcceptModal,
}) => {
  const { updateCompany, updateClient } = useProposal();

  const companyName = proposal?.company?.name || "Enfoco";
  const clientName = proposal?.client?.name || "Cliente Institucional";

  return (
    <div className="no-print fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
      {/* Authentic Human-Crafted Executive Brand Badge */}
      <div className="pointer-events-auto flex items-center px-5 py-2.5 rounded-2xl bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-lg transition-colors duration-300">
        {/* Provider Brand */}
        <EditableText
          id="nav_brand_company"
          value={companyName}
          onChange={(val) => updateCompany({ name: val })}
          className="font-extrabold text-sm text-[var(--text-primary)] tracking-wide"
          tag="span"
        />

        {/* Divider */}
        <span className="text-[var(--text-primary)]/40 font-mono text-sm mx-2.5 select-none">|</span>

        {/* Client Brand */}
        <EditableText
          id="nav_brand_client"
          value={clientName}
          onChange={(val) => updateClient({ name: val })}
          className="font-mono text-sm font-bold text-[var(--accent-color)]"
          tag="span"
        />
      </div>

      {/* Action Buttons Right */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Accept Proposal Modal Button */}
        <button
          type="button"
          onClick={onOpenAcceptModal}
          className="px-3 py-1.5 rounded-xl bg-[var(--accent-color)] hover:opacity-90 text-white font-extrabold text-[11px] sm:text-xs shadow-md border border-[var(--secondary-accent)]/40 transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--secondary-accent)]" />
          <span>Aceptar Propuesta</span>
        </button>
      </div>
    </div>
  );
};
