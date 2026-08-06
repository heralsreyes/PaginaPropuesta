"use client";

import React from "react";
import { ProposalData } from "@/data/proposalData";
import { MessageSquare, ArrowUp, UserCheck, Sparkles, Phone, Mail } from "lucide-react";
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
    <footer id="contacto" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[#FAF9F6] border-t border-[#E4E4E7] px-4 sm:px-6 lg:px-12 py-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header Context */}
        <div className="text-center max-w-3xl mx-auto shrink-0 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-4 py-1.5 rounded-full border border-[#BFDBFE] inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CONTACTO & SIGUIENTES PASOS</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#111111] mt-2 mb-1">
            Estamos Listos para Comenzar
          </h2>
          <p className="text-[#52525B] text-xs sm:text-sm font-normal max-w-xl mx-auto">
            Póngase en contacto directo con nuestra gerencia estratégica o comuníquese vía WhatsApp.
          </p>
        </div>

        {/* Expanded 3-Column Hero Layout (max-w-7xl) */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mt-4 mb-6">
          {/* Card 1: Company Profile (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white border border-[#E4E4E7] rounded-3xl p-8 md:p-10 shadow-lg flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl font-black font-display text-[#111111] tracking-tight">
                  ENFOCO<span className="text-[#2563EB]">.</span>
                </span>
                <span className="text-xs px-3 py-1 rounded-lg bg-[#F4F4F5] text-[#52525B] border border-[#E4E4E7] font-bold">
                  S.R.L.
                </span>
              </div>
              <p className="text-[#52525B] text-base leading-relaxed mt-4 font-medium">
                Soluciones tecnológicas integrales a la medida con altos estándares de calidad CMMI, ISO 27002 y máxima seguridad operativa.
              </p>
            </div>

            <div className="pt-5 border-t border-[#E4E4E7] space-y-2">
              <div className="text-sm font-semibold bg-[#F4F4F5] text-[#52525B] px-4 py-2 rounded-xl border border-[#E4E4E7] font-mono">
                RNC: <strong className="text-[#111111] font-bold">{proposal.company.rnc}</strong>
              </div>
              <div className="text-xs font-semibold text-[#52525B] bg-[#FAF9F6] px-4 py-2 rounded-xl border border-[#E4E4E7] font-mono">
                Santo Domingo, República Dominicana
              </div>
            </div>
          </div>

          {/* Card 2: Executive Contacts (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white border border-[#E4E4E7] rounded-3xl p-8 md:p-10 shadow-lg flex flex-col justify-between min-h-[380px]">
            <div>
              <h4 className="text-xs font-bold text-[#111111] mb-4 uppercase tracking-wider flex items-center space-x-2 font-mono">
                <UserCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Contactos Estratégicos</span>
              </h4>
              <div className="space-y-3.5">
                {proposal.contacts.map((contact, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E4E4E7] shadow-xs">
                    <span className="text-lg font-bold text-[#111111] block leading-tight">{contact.name}</span>
                    <span className="text-sm font-semibold text-[#2563EB] block mb-2">{contact.role}</span>
                    <div className="flex items-center justify-between text-sm font-mono font-medium text-[#52525B] pt-2 border-t border-[#E4E4E7]">
                      <span className="truncate pr-2 text-xs">{contact.email}</span>
                      <span className="font-bold text-[#111111] shrink-0">{contact.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Direct Action & WhatsApp CTA (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#18181B] text-white rounded-3xl p-8 md:p-10 shadow-2xl border border-zinc-800 flex flex-col justify-between min-h-[380px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/20 blur-3xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-2xl font-extrabold text-white flex items-center space-x-2">
                  <MessageSquare className="w-6 h-6 text-[#2563EB]" />
                  <span>Atención Directa</span>
                </h4>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-bold font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>En Línea</span>
                </span>
              </div>

              <p className="text-zinc-300 text-base leading-relaxed my-4 font-normal">
                Comuníquese en tiempo real por WhatsApp con nuestro Gerente General para agendar una sesión de trabajo o resolver dudas técnicas.
              </p>
            </div>

            <div>
              <a
                href={`https://wa.me/18094814035?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-5 px-8 rounded-2xl text-lg shadow-xl shadow-[#2563EB]/40 w-full transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Chatear con Jorge Martínez</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-5 border-t border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium text-[#71717A] max-w-7xl mx-auto w-full">
          <p>© 2026 ENFOCO, S.R.L. Todos los derechos reservados. Documento confidencial para {proposal.client.name}.</p>
          <button
            onClick={scrollToTop}
            className="text-sm font-bold px-5 py-2.5 rounded-full bg-white border border-[#E4E4E7] shadow-sm hover:bg-[#FAF9F6] text-[#52525B] hover:text-[#111111] cursor-pointer flex items-center space-x-2 transition-all"
          >
            <span>Ir al Inicio</span>
            <ArrowUp className="w-4 h-4 text-[#71717A]" />
          </button>
        </div>
      </motion.div>
    </footer>
  );
};
