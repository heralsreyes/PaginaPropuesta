"use client";

import React, { useState, useEffect } from "react";
import { ProposalProvider, useProposal } from "@/context/ProposalContext";
import { SidebarNav } from "@/components/SidebarNav";
import { AcceptModal } from "@/components/AcceptModal";
import { CustomizerDrawer } from "@/components/CustomizerDrawer";
import { StudioLayout } from "@/components/studio/StudioLayout";
import { useStudioStore } from "@/store/useStudioStore";
import { CustomSectionRenderer } from "@/components/CustomSectionRenderer";
import { toast } from "sonner";

function ProposalContent() {
  const { proposal } = useProposal();
  const { sections, isDesignMode, toggleDesignMode } = useStudioStore();
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      // 1. Toggle Studio Design Mode: Ctrl + Shift + E or Cmd + Shift + E or Alt + E
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "e") ||
        (e.altKey && e.key.toLowerCase() === "e")
      ) {
        e.preventDefault();
        toggleDesignMode();
        toast.info(
          !isDesignMode
            ? "🎨 Modo Visual Design Studio Activado"
            : "👔 Modo Vista Ejecutiva Cliente Activado"
        );
      }

      // 2. Toggle Customizer Drawer: Ctrl + Shift + P or Alt + P or Ctrl + Shift + C
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "p") ||
        (e.altKey && e.key.toLowerCase() === "p") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c")
      ) {
        e.preventDefault();
        setIsCustomizerOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDesignMode, toggleDesignMode]);

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
