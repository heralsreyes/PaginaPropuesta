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
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#DDD4C3] via-[#D5CBB8] to-[#C9BEA8] text-[#1E1812] px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#C0B49D]"
    >
      {/* Sutil halo ambiental cálido ámbar/crema */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#F08D17]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[400px] h-[400px] bg-[#004F54]/8 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10 relative z-10"
      >
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#7C4300] uppercase font-mono px-4 py-1.5 rounded-full bg-[#7C4300]/10 border border-[#7C4300]/20 inline-flex items-center gap-2 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#F08D17]" />
            <EditableField id="sec10_badge" defaultText="10. SOBRE ENFOCO S.R.L. · PERFIL CORPORATIVO & CERTIFICACIONES" />
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C160F] tracking-tight leading-[1.1] pt-2 font-display">
            <EditableField id="sec10_h2" defaultText="Más de 10 Años Impulsando la Transformación Digital" />
          </h2>

          <p className="text-base sm:text-lg text-[#4A3E31] max-w-3xl mx-auto font-medium leading-relaxed">
            <EditableField
              id="sec10_desc"
              defaultText="Especialistas en desarrollo de software a la medida, automatización de procesos complejos y gobierno de datos para los sectores financiero, seguros y salud."
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-[#EDE6D8]/90 backdrop-blur-md border border-[#D5C9B3] shadow-xl shadow-[#382C1E]/5 hover:shadow-2xl hover:border-[#F08D17]/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F08D17]/15 border border-[#F08D17]/30 flex items-center justify-center text-[#B86200]">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-[#1C160F] font-display">Perfil & Trayectoria</h3>
            <p className="text-xs sm:text-sm text-[#4A3E31] leading-relaxed font-medium">
              Empresa con sede en República Dominicana y más de 10 años en el mercado. Ejecutamos proyectos presenciales y remotos garantizando el acompañamiento continuo en cada fase.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#EDE6D8]/90 backdrop-blur-md border border-[#D5C9B3] shadow-xl shadow-[#382C1E]/5 hover:shadow-2xl hover:border-[#F08D17]/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F08D17]/15 border border-[#F08D17]/30 flex items-center justify-center text-[#B86200]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-[#1C160F] font-display">Filosofía Empresarial</h3>
            <p className="text-xs sm:text-sm text-[#4A3E31] leading-relaxed font-medium">
              Nuestra misión es ser el mejor aliado tecnológico de nuestros clientes, fundamentados en valores de Innovación, Liderazgo, Integridad, Compromiso y Lealtad.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#EDE6D8]/90 backdrop-blur-md border border-[#D5C9B3] shadow-xl shadow-[#382C1E]/5 hover:shadow-2xl hover:border-[#F08D17]/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F08D17]/15 border border-[#F08D17]/30 flex items-center justify-center text-[#B86200]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-[#1C160F] font-display">Calidad & Continuidad</h3>
            <p className="text-xs sm:text-sm text-[#4A3E31] leading-relaxed font-medium">
              Equipo multidisciplinario certificado en gestión de proyectos PMI, arquitectura de software, metodologías Ágiles (Scrum), BCP (Continuidad) y DRP (Recuperación).
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#EDE6D8]/90 backdrop-blur-md border border-[#D5C9B3] shadow-xl shadow-[#382C1E]/5 space-y-6">
          <h3 className="font-extrabold text-base sm:text-lg uppercase font-mono text-[#7C4300] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F08D17]" />
            <span>Estándares de Calidad & Certificaciones Internacionales</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-[#E4DCCB] border border-[#D0C4AC] text-center space-y-1 hover:border-[#F08D17]/40 transition-all">
              <span className="text-xs font-mono font-bold text-[#1C160F] block">ISO 27001 / 27002</span>
              <span className="text-[10px] text-[#6B5A47]">Seguridad de Información</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#E4DCCB] border border-[#D0C4AC] text-center space-y-1 hover:border-[#F08D17]/40 transition-all">
              <span className="text-xs font-mono font-bold text-[#1C160F] block">ISO 9001</span>
              <span className="text-[10px] text-[#6B5A47]">Gestión de Calidad</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#E4DCCB] border border-[#D0C4AC] text-center space-y-1 hover:border-[#F08D17]/40 transition-all">
              <span className="text-xs font-mono font-bold text-[#1C160F] block">DAMA CDMP</span>
              <span className="text-[10px] text-[#6B5A47]">Gobierno de Datos</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#E4DCCB] border border-[#D0C4AC] text-center space-y-1 hover:border-[#F08D17]/40 transition-all">
              <span className="text-xs font-mono font-bold text-[#1C160F] block">CMMI & COBIT</span>
              <span className="text-[10px] text-[#6B5A47]">Ingeniería de Software</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#E4DCCB] border border-[#D0C4AC] text-center space-y-1 hover:border-[#F08D17]/40 transition-all">
              <span className="text-xs font-mono font-bold text-[#1C160F] block">ITIL v4</span>
              <span className="text-[10px] text-[#6B5A47]">Gestión de Servicios</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#E4DCCB] border border-[#D0C4AC] text-center space-y-1 hover:border-[#F08D17]/40 transition-all">
              <span className="text-xs font-mono font-bold text-[#1C160F] block">Scrum / PMI</span>
              <span className="text-[10px] text-[#6B5A47]">Metodología Ágil</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
