"use client";

import React, { useState, useEffect } from "react";
import { ProposalData } from "@/data/proposalData";
import { CheckCircle2, Download, Menu, X } from "lucide-react";
import { toast } from "sonner";

interface NavbarProps {
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ proposal, onOpenAcceptModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 20);
      if (totalHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => {
    toast.info("Generando vista imprimible de la propuesta...");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const navLinks = [
    { name: "Empresa", href: "#empresa" },
    { name: "Equipo", href: "#equipo" },
    { name: "Alcance", href: "#alcance" },
    { name: "Cronograma", href: "#cronograma" },
    { name: "Garantía", href: "#garantia" },
    { name: "Inversión", href: "#inversion" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#E4E4E7] shadow-sm py-3"
          : "bg-[#FAF9F6]/80 backdrop-blur-sm py-4 border-b border-[#E4E4E7]/60"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-[var(--accent-color)] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Co-Branding Logo */}
        <div className="flex items-center space-x-3 bg-[#002224]/90 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/20 shadow-md">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-black font-display tracking-tight text-white">
              ENFOCO<span className="text-[#F08D17]">.</span>
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#F08D17] text-white font-black font-mono shadow-sm">
              S.R.L.
            </span>
          </div>

          <span className="text-white/30 font-light text-base">/</span>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-[#F08D17]">
              {proposal.client.shortName}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#52525B] hover:text-[#111111] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="no-print inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-[#52525B] hover:text-[#111111] bg-white hover:bg-[#F4F4F5] border border-[#E4E4E7] rounded-lg transition-all shadow-sm"
            title="Descargar o Imprimir propuesta en PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>

          {/* Primary Accent Cobalt Blue Button with White Text */}
          <button
            onClick={onOpenAcceptModal}
            className="inline-flex items-center space-x-2 px-4 py-2 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg shadow-sm transition-all hover:scale-[1.02] active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Aceptar Propuesta</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#52525B] hover:text-[#111111] bg-white rounded-lg border border-[#E4E4E7]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E4E4E7] px-4 pt-3 pb-6 space-y-3 mt-3 shadow-md">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#52525B] hover:text-[#111111] text-xs py-2 px-3 rounded-md hover:bg-[#F4F4F5]"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E4E4E7] flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handlePrint();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 text-xs font-medium text-[#111111] bg-white rounded-lg border border-[#E4E4E7]"
            >
              <Download className="w-4 h-4" />
              <span>Descargar PDF</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAcceptModal();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 py-2.5 text-xs font-medium text-white bg-[#2563EB] rounded-lg"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Aceptar Propuesta</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
