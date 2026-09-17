import React from "react";
import { ProposalData } from "@/types/proposal";
import { useProposal } from "@/context/ProposalContext";
import { useStudioStore } from "@/store/useStudioStore";
import { useThemeStore } from "@/store/useThemeStore";
import { EditableText } from "@/components/studio/EditableText";
import { EditableField } from "@/components/ui/EditableField";
import { CheckCircle2, Palette } from "lucide-react";

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
  const { currentSlug, updateCompany, updateClient } = useProposal();
  const { isDesignMode, isPanelOpen } = useStudioStore();
  const { theme, setTheme } = useThemeStore();

  const companyName = proposal?.company?.name || "Enfoco";
  const clientName = proposal?.client?.name || "Cliente Institucional";

  // Position: In design mode, place inside visible canvas avoiding left rail and top bar
  const containerPositionClass = isDesignMode
    ? isPanelOpen
      ? "fixed top-[74px] left-[396px] right-6 z-40"
      : "fixed top-[74px] left-[88px] right-6 z-40"
    : "fixed top-4 left-4 right-4 z-40";

  return (
    <div
      className={`no-print ${containerPositionClass} flex items-center justify-between pointer-events-none transition-all duration-300`}
    >
      {/* Authentic Human-Crafted Executive Brand Badge (Reacts dynamically to theme palette) */}
      <div
        style={{
          backgroundColor: "var(--nav-bg, var(--card-bg, #002224))",
          borderColor: "var(--card-border, var(--border-color, #F08D17))",
        }}
        className="pointer-events-auto flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-[var(--theme-h1,#ffffff)] backdrop-blur-md border shadow-2xl transition-all duration-300 max-w-[65vw] sm:max-w-none overflow-hidden group/navbadge"
      >
        {/* Provider Brand */}
        <span
          style={{ color: "var(--theme-h1, var(--text-primary, #ffffff))" }}
          className="font-extrabold text-xs sm:text-sm tracking-wide shrink-0"
        >
          <EditableText
            id={`nav_brand_company_${currentSlug || "default"}`}
            value={companyName}
            onChange={(val) => updateCompany({ name: val })}
            className="font-extrabold text-xs sm:text-sm tracking-wide"
            style={{ color: "var(--theme-h1, var(--text-primary, #ffffff))" }}
            tag="span"
          />
        </span>

        {/* Divider */}
        <EditableField
          id={`nav_brand_divider_${currentSlug || "default"}`}
          defaultText="|"
          className="font-mono text-xs sm:text-sm mx-2 sm:mx-2.5 select-none shrink-0"
          style={{ color: "var(--theme-text, #ffffff)", opacity: 0.4 }}
        />

        {/* Client Brand */}
        <span
          style={{ color: "var(--secondary-accent, var(--accent-color, #F08D17))" }}
          className="font-mono text-xs sm:text-sm font-bold truncate"
        >
          <EditableText
            id={`nav_brand_client_${currentSlug || "default"}`}
            value={clientName}
            onChange={(val) => updateClient({ name: val })}
            className="font-mono text-xs sm:text-sm font-bold"
            style={{ color: "var(--secondary-accent, var(--accent-color, #F08D17))" }}
            tag="span"
          />
        </span>

        {/* Quick Palette Trigger in Design Mode */}
        {isDesignMode && (
          <div className="ml-2.5 pl-2 border-l border-white/20 flex items-center gap-1 shrink-0">
            <label
              title="Ajustar color de fondo del badge / header con la paleta"
              className="cursor-pointer p-1 rounded-lg hover:bg-white/20 transition-all text-white/80 hover:text-white flex items-center justify-center"
            >
              <Palette className="w-3.5 h-3.5" />
              <input
                type="color"
                value={theme.navBg || "#002224"}
                onChange={(e) => setTheme({ navBg: e.target.value })}
                className="sr-only"
              />
            </label>
          </div>
        )}
      </div>

      {/* Action Buttons Right (Reacts dynamically to theme palette) */}
      <div className="pointer-events-auto flex items-center gap-2">
        <div className="relative flex items-center gap-1.5">
          {/* Accept Proposal Modal Button */}
          <button
            type="button"
            onClick={onOpenAcceptModal}
            style={{
              backgroundColor: "var(--secondary-accent, var(--accent-color, #F08D17))",
              borderColor: "var(--card-border, var(--border-color, rgba(255,255,255,0.25)))",
              color: "#FFFFFF",
            }}
            className="px-3.5 py-1.5 rounded-xl font-extrabold text-[11px] sm:text-xs shadow-lg border transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5 hover:brightness-110 drop-shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
            <span>Aceptar Propuesta</span>
          </button>

          {/* Direct Palette Color Picker for Button in Design Mode */}
          {isDesignMode && (
            <label
              title="Ajustar color del botón Aceptar Propuesta (Acento Secundario) con la paleta"
              className="cursor-pointer p-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 shadow-md"
            >
              <Palette className="w-3.5 h-3.5" />
              <input
                type="color"
                value={theme.secondaryAccent || "#F08D17"}
                onChange={(e) => setTheme({ secondaryAccent: e.target.value })}
                className="sr-only"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
