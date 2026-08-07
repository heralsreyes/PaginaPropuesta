"use client";

import React, { useState } from "react";
import { ProposalProvider, useProposal } from "@/context/ProposalContext";
import { SidebarNav } from "@/components/SidebarNav";
import { HeroSection } from "@/components/HeroSection";
import { ScopeSection } from "@/components/ScopeSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { TeamSection } from "@/components/TeamSection";
import { ResponsibilitiesSection } from "@/components/ResponsibilitiesSection";
import { BudgetSection } from "@/components/BudgetSection";
import { CompanySection } from "@/components/CompanySection";
import { AcceptModal } from "@/components/AcceptModal";
import { CustomizerDrawer } from "@/components/CustomizerDrawer";
import { Footer } from "@/components/Footer";

import { StudioLayout } from "@/components/studio/StudioLayout";

function ProposalContent() {
  const { proposal } = useProposal();
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  return (
    <div className="w-full bg-[var(--bg-main)] text-[var(--text-primary)] relative transition-colors duration-300">
      {/* Floating Vertical Sidebar & Top Branding Nav */}
      <SidebarNav
        proposal={proposal}
        onOpenAcceptModal={() => setIsAcceptModalOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Slide 1: Hero Cover (#hero) */}
      <HeroSection
        proposal={proposal}
        onOpenAcceptModal={() => setIsAcceptModalOpen(true)}
      />

      {/* Slide 2: Alcance & Funcionalidades Requeridas (#alcance) */}
      <ScopeSection requirements={proposal.requirements} />

      {/* Slide 3: Cronograma de Ejecución Estimado (#cronograma) */}
      <RoadmapSection
        roadmap={proposal.roadmap}
        estimatedDuration={proposal.project.estimatedDuration}
      />

      {/* Slide 4: Recursos Necesarios & Roles del Proyecto (#equipo) */}
      <TeamSection team={proposal.team} />

      {/* Slide 5: Matriz de Responsabilidades & Garantía (#responsabilidades) */}
      <ResponsibilitiesSection
        clientResponsibilities={proposal.clientResponsibilities}
        enfocoResponsibilities={proposal.enfocoResponsibilities}
        guaranteePeriod={proposal.project.guaranteePeriod}
      />

      {/* Slide 6: Presupuesto & Esquema de Inversión (#inversion) */}
      <BudgetSection
        budget={proposal.budget}
        onOpenAcceptModal={() => setIsAcceptModalOpen(true)}
      />

      {/* Slide 7: Sobre ENFOCO (Misión & Visión) (#empresa) */}
      <CompanySection company={proposal.company} />

      {/* Slide 8: Contacto & Siguientes Pasos (#contacto) */}
      <Footer proposal={proposal} />

      {/* Interactive Acceptance Modal */}
      <AcceptModal
        proposal={proposal}
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
      />

      {/* Live Proposal Customizer Admin Drawer */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ProposalProvider>
      <StudioLayout>
        <ProposalContent />
      </StudioLayout>
    </ProposalProvider>
  );
}
