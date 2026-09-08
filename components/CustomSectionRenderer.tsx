"use client";

import React from "react";
import { PageSection } from "@/types/studio";
import { ProposalData } from "@/types/proposal";
import { sampleProposal } from "@/data/proposalData";
import { HeroSection } from "@/components/HeroSection";
import { ScopeSection } from "@/components/ScopeSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { TeamSection } from "@/components/TeamSection";
import { ResponsibilitiesSection } from "@/components/ResponsibilitiesSection";
import { BudgetSection } from "@/components/BudgetSection";
import { CompanySection } from "@/components/CompanySection";
import { Footer } from "@/components/Footer";
import { ExecutiveSummarySection } from "@/components/sections/ExecutiveSummarySection";
import { ValueArchitectureSection } from "@/components/sections/ValueArchitectureSection";
import { ScopeEpicsSection } from "@/components/sections/ScopeEpicsSection";
import { AppSimulatorSection } from "@/components/sections/AppSimulatorSection";
import { InvestmentCalculatorSection } from "@/components/sections/InvestmentCalculatorSection";
import { CrmIntegrationSection } from "@/components/sections/CrmIntegrationSection";
import { KpiDashboardsSection } from "@/components/sections/KpiDashboardsSection";
import { TeamRoadmapSection } from "@/components/sections/TeamRoadmapSection";
import { EconomicProposalSection } from "@/components/sections/EconomicProposalSection";
import { AboutEnfocoSection } from "@/components/sections/AboutEnfocoSection";
import { PastProjectsSection } from "@/components/sections/PastProjectsSection";
import { ClosingSignatureSection } from "@/components/sections/ClosingSignatureSection";
import { EditableField } from "@/components/ui/EditableField";

import { useStudioStore } from "@/store/useStudioStore";
import { Sparkles, Plus } from "lucide-react";

interface CustomSectionRendererProps {
  section: PageSection;
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
}

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({
  section,
  proposal,
  onOpenAcceptModal,
}) => {
  const { isDesignMode } = useStudioStore();
  const safeProposal = proposal || sampleProposal;
  const secId = section?.id || "unknown-sec";
  const title = section?.title || section?.label || "";
  const cType = section?.componentType;

  // 1. Standard Base Component Types (Checked by componentType first)
  if (cType === "hero") {
    return <HeroSection proposal={safeProposal} onOpenAcceptModal={onOpenAcceptModal} />;
  }
  if (cType === "alcance") {
    return <ScopeSection requirements={safeProposal.requirements || []} />;
  }
  if (cType === "cronograma") {
    return (
      <RoadmapSection
        roadmap={safeProposal.roadmap || []}
        estimatedDuration={safeProposal.project?.estimatedDuration || "12 Semanas"}
      />
    );
  }
  if (cType === "equipo") {
    return <TeamSection team={safeProposal.team || []} />;
  }
  if (cType === "responsabilidades") {
    return (
      <ResponsibilitiesSection
        clientResponsibilities={safeProposal.clientResponsibilities || []}
        enfocoResponsibilities={safeProposal.enfocoResponsibilities || []}
        guaranteePeriod={safeProposal.project?.guaranteePeriod || "60 Días"}
      />
    );
  }
  if (cType === "inversion") {
    return <BudgetSection budget={safeProposal.budget || sampleProposal.budget} onOpenAcceptModal={onOpenAcceptModal} />;
  }
  if (cType === "empresa") {
    return <CompanySection company={safeProposal.company || sampleProposal.company} />;
  }
  if (cType === "experiencia") {
    return <PastProjectsSection secId={secId} />;
  }
  if (cType === "contacto") {
    return <Footer proposal={safeProposal} />;
  }

  // 2. Specific Custom Proposal Sections (01 - 12) - For Excel or specific custom sections
  if (secId === "sec-portada-excel") {
    return <ExecutiveSummarySection secId={secId} proposal={safeProposal} onOpenAcceptModal={onOpenAcceptModal} />;
  }
  if (secId === "sec-valor-propuesta") {
    return <ValueArchitectureSection secId={secId} />;
  }
  if (secId === "sec-7-epicas-alcance") {
    return <ScopeEpicsSection secId={secId} />;
  }
  if (secId === "sec-simulador-interactivo-app") {
    return <AppSimulatorSection secId={secId} />;
  }
  if (secId === "sec-calculadora-inversion") {
    return <InvestmentCalculatorSection secId={secId} />;
  }
  if (secId === "sec-integracion-crm-sifi") {
    return <CrmIntegrationSection secId={secId} />;
  }
  if (secId === "sec-supervision-dashboards") {
    return <KpiDashboardsSection secId={secId} />;
  }
  if (secId === "sec-equipo-cronograma") {
    return <TeamRoadmapSection secId={secId} proposal={safeProposal} />;
  }
  if (secId === "sec-propuesta-economica") {
    return <EconomicProposalSection secId={secId} />;
  }
  if (secId === "sec-sobre-enfoco-certificaciones") {
    return <AboutEnfocoSection secId={secId} />;
  }
  if (secId === "sec-experiencia-proyectos") {
    return <PastProjectsSection secId={secId} />;
  }
  if (secId === "sec-cierre-acuerdo") {
    return <ClosingSignatureSection secId={secId} proposal={safeProposal} onOpenAcceptModal={onOpenAcceptModal} />;
  }

  // 3. Custom Blank Section (Lienzo Libre) - Integrated with Global Theme Palette
  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden theme-section-bg bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 py-20 border-b border-[#004F54]/50 transition-colors duration-300"
    >
      {/* Ambient Theme Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#F08D17]/10 theme-accent-bg blur-[200px] opacity-20 rounded-full pointer-events-none" />

      {/* Subtle Design Mode Helper (Only visible during editing, completely hidden in preview/print) */}
      {isDesignMode && (
        <div className="max-w-4xl mx-auto w-full min-h-[420px] rounded-3xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-8 text-center space-y-3 pointer-events-none opacity-40 select-none">
          <Sparkles className="w-8 h-8 text-[#F08D17] theme-h2-color" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#F08D17] theme-h2-color uppercase">
            Lienzo de Sección en Blanco
          </span>
          <p className="text-xs text-slate-200/80 theme-text-color max-w-md">
            Arrastra elementos, formas, tarjetas o textos desde el menú lateral para componer esta sección.
          </p>
        </div>
      )}
    </section>
  );
};
