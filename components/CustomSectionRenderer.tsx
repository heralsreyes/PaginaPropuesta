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

  // Fallback section renderer
  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
    >
      <div className="max-w-5xl mx-auto w-full text-center space-y-4">
        <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono">
          SECCIÓN PERSONALIZADA
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">
          <EditableField id={`sec_custom_title_${secId}`} defaultText={title} />
        </h2>
        <p className="text-base text-[#334155] max-w-xl mx-auto font-medium">Lienzo de sección interactiva.</p>
      </div>
    </section>
  );
};
