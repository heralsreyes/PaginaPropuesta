"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";

interface ClosingSignatureSectionProps {
  secId: string;
  onOpenAcceptModal: () => void;
}

const sectionContainerVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const ClosingSignatureSection: React.FC<ClosingSignatureSectionProps> = ({ secId, onOpenAcceptModal }) => {
  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden theme-section-bg bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 pt-24 pb-12 transition-colors duration-300"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-5xl mx-auto w-full text-center space-y-10 my-auto"
      >
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] theme-h2-color uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec12_badge" defaultText="12. ACEPTACIÓN & CONCLUSIÓN" />
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white theme-h1-color">
            <EditableField id="sec10_h2" defaultText="Cierre & Firma Digital de Aceptación" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 theme-text-color max-w-2xl mx-auto leading-relaxed font-medium">
            <EditableField
              id="sec10_desc"
              defaultText="Al confirmar esta propuesta, formalizamos el inicio del proyecto de desarrollo web y app móvil para Excel Puesto de Bolsa y ESAFI."
            />
          </p>
        </div>

        <div className="p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl space-y-8 max-w-2xl mx-auto text-[#0F172A]">
          <div className="flex items-center justify-center gap-4">
            <ShieldCheck className="w-10 h-10 text-[#004F54]" />
            <span className="font-extrabold text-2xl text-[#0F172A] font-display">Garantía de Satisfacción ENFOCO</span>
          </div>

          <p className="text-base text-[#334155] leading-relaxed font-medium">
            Incluye 60 días de garantía total posterior al pase a producción, acompañamiento personalizado y soporte técnico certificado.
          </p>

          <button
            onClick={onOpenAcceptModal}
            className="w-full py-5 px-10 rounded-2xl bg-[#004F54] hover:bg-[#006B70] text-white font-extrabold text-lg shadow-2xl shadow-[#004F54]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-4"
          >
            <CheckCircle2 className="w-6 h-6 text-[#F08D17]" />
            <span>Aceptar & Firmar Propuesta Digital</span>
          </button>
        </div>

        <div className="text-sm font-mono text-[#64748B] pt-6">
          ENFOCO, S.R.L. • RNC 1-31-44504-0 • jmartinez@enfoco.com.do • (809) 481-4035
        </div>
      </motion.div>
    </section>
  );
};
