"use client";

import React, { useState, useEffect } from "react";
import { ProposalData } from "@/data/proposalData";
import { useProposal } from "@/context/ProposalContext";
import { CheckCircle2, Download, Settings } from "lucide-react";
import { toast } from "sonner";

interface SidebarNavProps {
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
  onOpenCustomizer: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ proposal, onOpenAcceptModal, onOpenCustomizer }) => {
  const { isAdmin } = useProposal();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mounted, setMounted] = useState(false);

  const slides = [
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
    setMounted(true);

    const handleScroll = () => {
      const slideElements = slides.map((s) => document.getElementById(s.id));
      const scrollPosition = window.innerHeight / 2;

      slideElements.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= scrollPosition && rect.bottom >= scrollPosition) {
            setActiveSection(slides[index].id);
          }
        }
      });
    };

    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (mainContainer) mainContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
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
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Left Floating Brand Co-Badge */}
      <div className="no-print fixed top-6 left-6 z-50 flex items-center space-x-3 p-3 px-4 sm:px-5 bg-[var(--card-bg)]/80 backdrop-blur-md rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <span className="text-lg sm:text-xl font-bold font-display tracking-tight text-[var(--text-primary)]">
            ENFOCO<span className="text-[var(--accent-color)]">.</span>
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-main)] text-[var(--text-primary)] border border-[var(--border-color)] font-semibold">
            S.R.L.
          </span>
        </div>
        <span className="text-[#D4D4D8] font-light text-sm">/</span>
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)]/80">
          {proposal.client.shortName}
        </span>
      </div>

      {/* Top Right Floating Action Buttons */}
      <div className="no-print fixed top-6 right-6 sm:right-8 z-50 flex items-center space-x-2 sm:space-x-3">
        {/* Customizer Trigger Button */}
        {mounted && isAdmin && (
          <button
            onClick={onOpenCustomizer}
            className="inline-flex items-center space-x-1.5 px-3 py-2.5 text-xs sm:text-sm font-bold text-amber-900 bg-amber-100/90 hover:bg-amber-200 backdrop-blur-md border border-amber-300 rounded-xl shadow-xs transition-all cursor-pointer transform hover:scale-105 animate-pulse"
            title="Modo Editor Activo (ENFOCO) • Clic para editar"
          >
            <Settings className="w-4 h-4 text-amber-800" />
            <span className="hidden sm:inline text-amber-900">Personalizar Propuesta</span>
          </button>
        )}

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

      {/* Blended Vertical Dots Navigation */}
      <aside className="no-print fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end space-y-4 py-2 bg-transparent pointer-events-auto">
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
                    ? "opacity-100 text-[var(--text-primary)] font-semibold bg-[var(--card-bg)]/80 backdrop-blur-sm border border-[var(--border-color)] shadow-xs translate-x-0"
                    : "opacity-0 group-hover:opacity-100 text-[var(--text-primary)]/60 bg-[var(--card-bg)]/60 backdrop-blur-sm border border-[var(--border-color)]/60 translate-x-1 group-hover:translate-x-0"
                }`}
              >
                {slide.label}
              </span>

              {/* Dot Indicator */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-3.5 h-3.5 bg-[var(--accent-color)] ring-4 ring-[var(--accent-color)]/25 shadow-sm"
                    : "w-2.5 h-2.5 bg-[var(--border-color)] group-hover:bg-[var(--accent-color)] group-hover:scale-125"
                }`}
              />
            </button>
          );
        })}
      </aside>
    </>
  );
};
