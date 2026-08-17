"use client";

import React, { useState, useEffect } from "react";
import { ProposalData } from "@/data/proposalData";
import { useProposal } from "@/context/ProposalContext";
import { useStudioStore } from "@/store/useStudioStore";
import { CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";

interface SidebarNavProps {
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
  onOpenCustomizer?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ proposal, onOpenAcceptModal }) => {
  const { isDesignMode, sections } = useStudioStore();
  const [activeSection, setActiveSection] = useState<string>("hero");

  const enabledSections = sections.filter((s) => s.enabled);
  const slides = enabledSections.length > 0
    ? enabledSections.map((s) => ({ id: s.id, label: s.label || s.title || s.id }))
    : [
        { id: "hero", label: "Inicio" },
        { id: "alcance", label: "Alcance" },
        { id: "cronograma", label: "Cronograma" },
        { id: "equipo", label: "Equipo" },
        { id: "responsabilidades", label: "Garantía" },
        { id: "inversion", label: "Presupuesto" },
        { id: "empresa", label: "Sobre ENFOCO" },
        { id: "contacto", label: "Contacto" },
      ];

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let canvasEl: HTMLElement | null = null;

    const handleScroll = () => {
      canvasEl = document.getElementById("studio-canvas");
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
      handleScroll();
    };

    initNav();
    const timerId = setTimeout(initNav, 300);

    return () => {
      clearTimeout(timerId);
      if (observer) observer.disconnect();
      if (canvasEl) canvasEl.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePrint = () => {
    toast.info("Generando vista de impresión PDF (8 páginas)...");
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const scrollToSlide = (id: string) => {
    const el = document.getElementById(id);
    const canvasEl = document.getElementById("studio-canvas");
    if (el && canvasEl) {
      canvasEl.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Top Left Floating Brand Co-Badge (Only in Executive Client Mode) */}
      {!isDesignMode && (
        <div className="no-print fixed top-6 left-6 z-40 flex items-center space-x-3 p-3 px-4 sm:px-5 bg-[var(--card-bg)]/80 backdrop-blur-md rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
          <div className="flex items-center space-x-2">
            <span className="text-lg sm:text-xl font-bold font-display tracking-tight text-[var(--text-primary)]">
              ENFOCO<span className="text-[var(--accent-color)]">.</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#004F54] text-white border border-[#004F54] font-extrabold shadow-sm">
              S.R.L.
            </span>
          </div>
          <span className="text-[#D4D4D8] font-light text-sm">/</span>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]/80">
            {proposal.client.shortName}
          </span>
        </div>
      )}

      {/* Top Right Floating Action Buttons (Only in Executive Client Mode) */}
      {!isDesignMode && (
        <div className="no-print fixed top-6 right-6 sm:right-8 z-40 flex items-center space-x-2 sm:space-x-3">
          {/* PDF Download Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)]/80 hover:text-[var(--text-primary)] bg-[var(--card-bg)]/80 hover:bg-[var(--card-bg)] backdrop-blur-md border border-[var(--border-color)] rounded-xl shadow-sm transition-all cursor-pointer"
            title="Descargar PDF Completo"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Descargar PDF</span>
          </button>

          {/* Primary Accept Proposal Button */}
          <button
            onClick={onOpenAcceptModal}
            className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[var(--accent-color)] hover:opacity-90 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Aceptar Propuesta</span>
          </button>
        </div>
      )}

      {/* Right Vertical Dots Navigation Menu (VISIBLE IN BOTH MODES) */}
      <aside className="no-print fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end space-y-4 py-2 bg-transparent pointer-events-auto select-none">
        {slides.map((slide) => {
          const isActive = activeSection === slide.id;
          return (
            <button
              key={slide.id}
              onClick={() => scrollToSlide(slide.id)}
              className="group flex items-center space-x-3 justify-end focus:outline-none cursor-pointer"
            >
              {/* Text Label */}
              <span
                className={`text-xs sm:text-sm font-medium px-2.5 py-1 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "opacity-100 text-[var(--text-primary)] font-semibold bg-[var(--card-bg)]/90 backdrop-blur-md border border-[var(--border-color)] shadow-sm translate-x-0"
                    : "opacity-0 group-hover:opacity-100 text-[var(--text-primary)]/70 bg-[var(--card-bg)]/80 backdrop-blur-sm border border-[var(--border-color)]/60 translate-x-1 group-hover:translate-x-0"
                }`}
              >
                {slide.label}
              </span>

              {/* Dot Indicator */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-3.5 h-3.5 bg-[var(--accent-color)] ring-4 ring-[var(--accent-color)]/30 shadow-md scale-110"
                    : "w-2.5 h-2.5 bg-[var(--border-color)] group-hover:bg-[var(--accent-color)] group-hover:scale-125 opacity-70 hover:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </aside>
    </>
  );
};
