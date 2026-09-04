"use client";

import React from "react";
import { PageSection } from "@/types/studio";
import { ProposalData } from "@/types/proposal";
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
  const secId = section.id;
  const title = section.title || section.label;
  const cType = section.componentType;

  // 1. Specific Proposal Sections (01 - 12) - Checked First
  if (secId === "sec-portada-excel" || secId.includes("portada") || title.includes("Presentación Ejecutiva")) {
    return <ExecutiveSummarySection secId={secId} proposal={proposal} onOpenAcceptModal={onOpenAcceptModal} />;
  }
  if (secId === "sec-valor-propuesta" || secId.includes("valor") || title.includes("Arquitectura de Valor") || title.includes("Ecosistema")) {
    return <ValueArchitectureSection secId={secId} />;
  }
  if (secId === "sec-7-epicas-alcance" || secId === "sec-alcance-epicas" || secId.includes("epica") || secId.includes("alcance") || title.includes("7 Épicas") || title.includes("Alcance")) {
    return <ScopeEpicsSection secId={secId} />;
  }
  if (secId === "sec-simulador-interactivo-app" || secId.includes("simulador") || title.includes("Simulador App")) {
    return <AppSimulatorSection secId={secId} />;
  }
  if (secId === "sec-calculadora-inversion" || secId.includes("calculadora") || title.includes("Calculadora")) {
    return <InvestmentCalculatorSection secId={secId} />;
  }
  if (secId === "sec-integracion-crm-sifi" || secId.includes("crm") || title.includes("Integración Dynamics")) {
    return <CrmIntegrationSection secId={secId} />;
  }
  if (secId === "sec-supervision-dashboards" || secId.includes("dashboards") || title.includes("Dashboards")) {
    return <KpiDashboardsSection secId={secId} />;
  }
  if (secId === "sec-equipo-cronograma" || secId.includes("equipo-cronograma") || title.includes("Equipo Especialista")) {
    return <TeamRoadmapSection secId={secId} proposal={proposal} />;
  }
  if (secId === "sec-propuesta-economica" || secId.includes("economica") || title.includes("Propuesta Económica")) {
    return <EconomicProposalSection secId={secId} />;
  }
  if (secId === "sec-sobre-enfoco-certificaciones" || secId.includes("sobre-enfoco") || title.includes("Sobre ENFOCO")) {
    return <AboutEnfocoSection secId={secId} />;
  }
  if (secId === "sec-experiencia-proyectos" || secId.includes("experiencia") || title.includes("Experiencia en Proyectos")) {
    return <PastProjectsSection secId={secId} />;
  }
  if (secId === "sec-cierre-acuerdo" || secId.includes("cierre") || title.includes("Cierre & Firma")) {
    return <ClosingSignatureSection secId={secId} proposal={proposal} onOpenAcceptModal={onOpenAcceptModal} />;
  }

  // 2. Fallback Base Component Types
  if (cType === "hero") {
    return <HeroSection proposal={proposal} onOpenAcceptModal={onOpenAcceptModal} />;
  }
  if (cType === "alcance") {
    return <ScopeSection requirements={proposal.requirements} />;
  }
  if (cType === "cronograma") {
    return <RoadmapSection roadmap={proposal.roadmap} estimatedDuration={proposal.project.estimatedDuration} />;
  }
  if (cType === "equipo") {
    return <TeamSection team={proposal.team} />;
  }
  if (cType === "responsabilidades") {
    return (
      <ResponsibilitiesSection
        clientResponsibilities={proposal.clientResponsibilities}
        enfocoResponsibilities={proposal.enfocoResponsibilities}
        guaranteePeriod={proposal.project.guaranteePeriod}
      />
    );
  }
  if (cType === "inversion") {
    return <BudgetSection budget={proposal.budget} onOpenAcceptModal={onOpenAcceptModal} />;
  }
  if (cType === "empresa") {
    return <CompanySection company={proposal.company} />;
  }
  if (cType === "contacto") {
    return <Footer proposal={proposal} />;
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
