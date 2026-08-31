"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Building2, Award, ShieldCheck } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";

interface AboutEnfocoSectionProps {
  secId: string;
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

export const AboutEnfocoSection: React.FC<AboutEnfocoSectionProps> = ({ secId }) => {
  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#D6E5DE] via-[#D0E0D9] to-[#C8DCD3] text-[#1E3A2F] px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#B2CCC1]"
    >
      {/* Sutil halo ambiental suave en verde Enfoco */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#135A34]/6 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10 relative z-10"
      >
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs sm:text-sm md:text-base font-bold tracking-widest text-[#135A34] uppercase font-mono px-5 py-2 rounded-full bg-[#7C9B8C]/25 border border-[#7C9B8C]/40 inline-flex items-center gap-2 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#135A34]" />
            <EditableField id="sec10_badge" defaultText="10. SOBRE ENFOCO S.R.L. · PERFIL CORPORATIVO & CERTIFICACIONES" />
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#135A34] tracking-tight leading-[1.15] pt-2 font-display">
            <EditableField id="sec10_h2" defaultText="Más de 10 Años Impulsando la Transformación Digital" />
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-[#1E3A2F] max-w-4xl mx-auto font-medium leading-relaxed">
            <EditableField
              id="sec10_desc"
              defaultText="Especialistas en desarrollo de software a la medida, automatización de procesos complejos y gobierno de datos para los sectores financiero, seguros y salud."
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="p-8 sm:p-9 rounded-3xl bg-[#BFDAD1] border border-[#A6C5BB] shadow-lg shadow-emerald-950/5 hover:shadow-2xl hover:border-[#135A34]/40 transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#135A34]/15 border border-[#135A34]/30 flex items-center justify-center text-[#135A34]">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-2xl sm:text-3xl text-[#135A34] font-display">Perfil & Trayectoria</h3>
            <p className="text-sm sm:text-base md:text-lg text-[#1E3A2F] leading-relaxed font-medium">
              Empresa con sede en República Dominicana y más de 10 años en el mercado. Ejecutamos proyectos presenciales y remotos garantizando el acompañamiento continuo en cada fase.
            </p>
          </div>

          <div className="p-8 sm:p-9 rounded-3xl bg-[#BFDAD1] border border-[#A6C5BB] shadow-lg shadow-emerald-950/5 hover:shadow-2xl hover:border-[#135A34]/40 transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#135A34]/15 border border-[#135A34]/30 flex items-center justify-center text-[#135A34]">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-2xl sm:text-3xl text-[#135A34] font-display">Filosofía Empresarial</h3>
            <p className="text-sm sm:text-base md:text-lg text-[#1E3A2F] leading-relaxed font-medium">
              Nuestra misión es ser el mejor aliado tecnológico de nuestros clientes, fundamentados en valores de Innovación, Liderazgo, Integridad, Compromiso y Lealtad.
            </p>
          </div>

          <div className="p-8 sm:p-9 rounded-3xl bg-[#BFDAD1] border border-[#A6C5BB] shadow-lg shadow-emerald-950/5 hover:shadow-2xl hover:border-[#135A34]/40 transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#135A34]/15 border border-[#135A34]/30 flex items-center justify-center text-[#135A34]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-2xl sm:text-3xl text-[#135A34] font-display">Calidad & Continuidad</h3>
            <p className="text-sm sm:text-base md:text-lg text-[#1E3A2F] leading-relaxed font-medium">
              Equipo multidisciplinario certificado en gestión de proyectos PMI, arquitectura de software, metodologías Ágiles (Scrum), BCP (Continuidad) y DRP (Recuperación).
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#BFDAD1] border border-[#A6C5BB] shadow-lg shadow-emerald-950/5 space-y-6">
          <h3 className="font-extrabold text-lg sm:text-xl uppercase font-mono text-[#135A34] flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-[#135A34]" />
            <span>Estándares de Calidad & Certificaciones Internacionales</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            <div className="p-5 rounded-2xl bg-[#AFCFC5] border border-[#97BDB1] text-center space-y-1.5 hover:border-[#135A34]/40 transition-all">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#135A34] block">ISO 27001 / 27002</span>
              <span className="text-xs text-[#244738] font-medium">Seguridad de Información</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#AFCFC5] border border-[#97BDB1] text-center space-y-1.5 hover:border-[#135A34]/40 transition-all">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#135A34] block">ISO 9001</span>
              <span className="text-xs text-[#244738] font-medium">Gestión de Calidad</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#AFCFC5] border border-[#97BDB1] text-center space-y-1.5 hover:border-[#135A34]/40 transition-all">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#135A34] block">DAMA CDMP</span>
              <span className="text-xs text-[#244738] font-medium">Gobierno de Datos</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#AFCFC5] border border-[#97BDB1] text-center space-y-1.5 hover:border-[#135A34]/40 transition-all">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#135A34] block">CMMI & COBIT</span>
              <span className="text-xs text-[#244738] font-medium">Ingeniería de Software</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#AFCFC5] border border-[#97BDB1] text-center space-y-1.5 hover:border-[#135A34]/40 transition-all">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#135A34] block">ITIL v4</span>
              <span className="text-xs text-[#244738] font-medium">Gestión de Servicios</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#AFCFC5] border border-[#97BDB1] text-center space-y-1.5 hover:border-[#135A34]/40 transition-all">
              <span className="text-xs sm:text-sm font-mono font-bold text-[#135A34] block">Scrum / PMI</span>
              <span className="text-xs text-[#244738] font-medium">Metodología Ágil</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
