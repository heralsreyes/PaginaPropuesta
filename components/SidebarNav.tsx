"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ProposalData } from "@/types/proposal";
import { useStudioStore } from "@/store/useStudioStore";
import { NavBrandHeader } from "./nav/NavBrandHeader";
import { NavDotIndicators } from "./nav/NavDotIndicators";

interface SidebarNavProps {
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
  onOpenCustomizer?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  proposal,
  onOpenAcceptModal,
  onOpenCustomizer,
}) => {
  const { sections } = useStudioStore();
  const [activeSection, setActiveSection] = useState<string>("hero");

  const slides = useMemo(() => {
    const enabledSections = sections.filter((s) => s.enabled);
    return enabledSections.length > 0
      ? enabledSections.map((s) => ({ id: s.id, label: s.label || s.title || s.id }))
      : [{ id: "hero", label: "Inicio" }];
  }, [sections]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let canvasEl: HTMLElement | null = null;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        if (!canvasEl) canvasEl = document.getElementById("studio-canvas");
        if (!canvasEl) return;

        const canvasRect = canvasEl.getBoundingClientRect();
        const triggerY = canvasRect.top + canvasRect.height * 0.4;

        for (let i = slides.length - 1; i >= 0; i--) {
          const slide = slides[i];
          const sectionEl = document.getElementById(slide.id);
          if (sectionEl) {
            const rect = sectionEl.getBoundingClientRect();
            if (rect.top <= triggerY) {
              setActiveSection(slide.id);
              break;
            }
          }
        }
      });
    };

    const initNav = () => {
      canvasEl = document.getElementById("studio-canvas");
      if (!canvasEl) return;

      const observerOptions = {
        root: canvasEl,
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0.1,
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);

      slides.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && observer) {
          observer.observe(el);
        }
      });

      canvasEl.addEventListener("scroll", handleScroll, { passive: true });
    };

    initNav();

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
      if (canvasEl) canvasEl.removeEventListener("scroll", handleScroll);
    };
  }, [slides]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <NavBrandHeader
        proposal={proposal}
        onOpenAcceptModal={onOpenAcceptModal}
        onOpenCustomizer={onOpenCustomizer}
      />
      <NavDotIndicators
        slides={slides}
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />
    </>
  );
};
