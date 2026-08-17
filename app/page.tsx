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

import { useStudioStore } from "@/store/useStudioStore";
import { CustomSectionRenderer } from "@/components/CustomSectionRenderer";

function ProposalContent() {
  const { proposal } = useProposal();
  const { sections } = useStudioStore();
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const activeSections = sections.filter((s) => s.enabled);

  return (
    <div className="w-full bg-[var(--bg-main)] text-[var(--text-primary)] relative transition-colors duration-300">
      {/* Floating Vertical Sidebar & Top Branding Nav */}
      <SidebarNav
        proposal={proposal}
        onOpenAcceptModal={() => setIsAcceptModalOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Render Active Sections in Exact Order Defined in Design Studio */}
      {activeSections.map((sec) => {
        if (sec.componentType === "hero") {
          return (
            <HeroSection
              key={sec.id}
              proposal={proposal}
              onOpenAcceptModal={() => setIsAcceptModalOpen(true)}
            />
          );
        }
        if (sec.componentType === "alcance") {
          return <ScopeSection key={sec.id} requirements={proposal.requirements} />;
        }
        if (sec.componentType === "cronograma") {
          return (
            <RoadmapSection
              key={sec.id}
              roadmap={proposal.roadmap}
              estimatedDuration={proposal.project.estimatedDuration}
            />
          );
        }
        if (sec.componentType === "equipo") {
          return <TeamSection key={sec.id} team={proposal.team} />;
        }
        if (sec.componentType === "responsabilidades") {
          return (
            <ResponsibilitiesSection
              key={sec.id}
              clientResponsibilities={proposal.clientResponsibilities}
              enfocoResponsibilities={proposal.enfocoResponsibilities}
              guaranteePeriod={proposal.project.guaranteePeriod}
            />
          );
        }
        if (sec.componentType === "inversion") {
          return (
            <BudgetSection
              key={sec.id}
              budget={proposal.budget}
              onOpenAcceptModal={() => setIsAcceptModalOpen(true)}
            />
          );
        }
        if (sec.componentType === "empresa") {
          return <CompanySection key={sec.id} company={proposal.company} />;
        }
        if (sec.componentType === "contacto") {
          return <Footer key={sec.id} proposal={proposal} />;
        }

        // Custom Section Renderer (01 - 10 Custom Sections)
        return (
          <CustomSectionRenderer
            key={sec.id}
            section={sec}
            proposal={proposal}
            onOpenAcceptModal={() => setIsAcceptModalOpen(true)}
          />
        );
      })}

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
