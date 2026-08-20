"use client";

import React, { useState } from "react";
import { ProposalProvider, useProposal } from "@/context/ProposalContext";
import { SidebarNav } from "@/components/SidebarNav";
import { AcceptModal } from "@/components/AcceptModal";
import { CustomizerDrawer } from "@/components/CustomizerDrawer";
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
      {activeSections.map((sec) => (
        <CustomSectionRenderer
          key={sec.id}
          section={sec}
          proposal={proposal}
          onOpenAcceptModal={() => setIsAcceptModalOpen(true)}
        />
      ))}

      {/* Interactive Acceptance Modal */}
      <AcceptModal
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
