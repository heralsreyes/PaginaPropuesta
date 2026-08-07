"use client";

import React from "react";
import { ProposalData } from "@/data/proposalData";
import { MessageSquare, ArrowUp, UserCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface FooterProps {
  proposal: ProposalData;
}

export const Footer: React.FC<FooterProps> = ({ proposal }) => {
  const scrollToTop = () => {
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Jorge, estuve revisando la propuesta web de ENFOCO para ${proposal.client.name} (${proposal.project.code}) y quisiera conversar algunos detalles.`
  );

  return (
    <footer id="contacto" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[var(--bg-main)] border-t border-[var(--border-color)] px-4 sm:px-6 lg:px-12 py-10 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header Context */}
        <div className="text-center max-w-3xl mx-auto shrink-0 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-4 py-1.5 rounded-full border border-[var(--accent-color)]/30 inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONTACTO & SIGUIENTES PASOS</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[var(--text-primary)] mt-2 mb-1">
            Estamos Listos para Comenzar
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs sm:text-sm font-normal max-w-xl mx-auto">
            Póngase en contacto directo con nuestra gerencia estratégica o comuníquese vía WhatsApp.
          </p>
        </div>

        {/* Expanded 3-Column Hero Layout (max-w-7xl) */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mt-4 mb-6">
          {/* Card 1: Company Profile (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 md:p-10 shadow-lg flex flex-col justify-between min-h-[380px] transition-colors duration-300">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-black font-display text-[var(--text-primary)] tracking-tight">
                  ENFOCO<span className="text-[var(--accent-color)]">.</span>
                </span>
                <span className="text-xs px-3 py-1 rounded-lg bg-[var(--bg-main)] text-[var(--text-primary)] border border-[var(--border-color)] font-bold">
                  S.R.L.
                </span>
              </div>
              <p className="text-[var(--text-primary)]/80 text-base leading-relaxed mt-4 font-medium">
                Soluciones tecnológicas integrales a la medida con altos estándares de calidad CMMI, ISO 27002 y máxima seguridad operativa.
              </p>
            </div>

            <div className="pt-5 border-t border-[var(--border-color)] space-y-2">
              <div className="text-sm font-semibold bg-[var(--bg-main)] text-[var(--text-primary)]/80 px-4 py-2 rounded-xl border border-[var(--border-color)] font-mono">
                RNC: <strong className="text-[var(--text-primary)] font-bold">{proposal.company.rnc}</strong>
              </div>
              <div className="text-xs font-semibold text-[var(--text-primary)]/70 bg-[var(--bg-main)] px-4 py-2 rounded-xl border border-[var(--border-color)] font-mono">
                Santo Domingo, República Dominicana
              </div>
            </div>
          </div>

          {/* Card 2: Executive Contacts (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 md:p-10 shadow-lg flex flex-col justify-between min-h-[380px] transition-colors duration-300">
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider flex items-center space-x-2 font-mono">
                <UserCheck className="w-4 h-4 text-[var(--accent-color)]" />
                <span>Contactos Estratégicos</span>
              </h4>
              <div className="space-y-3.5">
                {proposal.contacts.map((contact, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] shadow-xs">
                    <span className="text-lg font-bold text-[var(--text-primary)] block leading-tight">{contact.name}</span>
                    <span className="text-sm font-semibold text-[var(--accent-color)] block mb-2">{contact.role}</span>
                    <div className="flex items-center justify-between text-sm font-mono font-medium text-[var(--text-primary)]/70 pt-2 border-t border-[var(--border-color)]">
                      <span className="truncate pr-2 text-xs">{contact.email}</span>
                      <span className="font-bold text-[var(--text-primary)] shrink-0">{contact.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Direct Action & WhatsApp CTA (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[var(--card-bg)] text-[var(--text-primary)] rounded-3xl p-8 md:p-10 shadow-2xl border border-[var(--border-color)] flex flex-col justify-between min-h-[380px] relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent-color)]/20 blur-3xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-2xl font-extrabold text-[var(--text-primary)] flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-[var(--accent-color)]" />
                  <span>Atención Directa</span>
                </h4>
                <span className="bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-bold font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>En Línea</span>
                </span>
              </div>

              <p className="text-[var(--text-primary)]/80 text-base leading-relaxed my-4 font-normal">
                Comuníquese en tiempo real por WhatsApp con nuestro Gerente General para agendar una sesión de trabajo o resolver dudas técnicas.
              </p>
            </div>

            <div>
              <a
                href={`https://wa.me/18094814035?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--accent-color)] hover:opacity-90 text-white font-bold py-5 px-8 rounded-2xl text-lg shadow-xl shadow-[var(--accent-color)]/30 w-full transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chatear con Jorge Martínez</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-5 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium text-[var(--text-primary)]/70 max-w-7xl mx-auto w-full">
          <p>© 2026 ENFOCO, S.R.L. Todos los derechos reservados. Documento confidencial para {proposal.client.name}.</p>
          <button
            onClick={scrollToTop}
            className="text-sm font-bold px-5 py-2.5 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm hover:bg-[var(--bg-main)] text-[var(--text-primary)] cursor-pointer flex items-center space-x-2 transition-all"
          >
            <span>Ir al Inicio</span>
            <ArrowUp className="w-4 h-4 text-[var(--accent-color)]" />
          </button>
        </div>
      </motion.div>
    </footer>
  );
};
