"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Building2, Award, ShieldCheck } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";

interface AboutEnfocoSectionProps {
  secId: string;
}

const sectionContainerVariants = {
  hidden: { opacity: 0, y: 40 },
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
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-[#F8F9FA] text-[#2D3748] px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10"
      >
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs sm:text-sm font-black tracking-widest text-[#1B7A38] uppercase font-mono px-6 py-2.5 rounded-full bg-[#1B7A38]/10 border border-[#1B7A38]/30 inline-flex items-center gap-2 shadow-sm">
            <Sparkles className="w-5 h-5 text-[#1B7A38]" />
            <EditableField id="sec10_badge" defaultText="10. SOBRE ENFOCO S.R.L. · PERFIL CORPORATIVO & CERTIFICACIONES" />
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#2D3748] tracking-tight leading-[1.1] pt-2">
            <span className="text-[#1B7A38] block text-base sm:text-lg md:text-xl font-mono font-extrabold uppercase tracking-widest mb-2">
              🏢 EMPRESA DESARROLLADORA DE PROYECTO
            </span>
            <span className="text-[#1B7A38]">SOBRE ENFOCO S.R.L.</span>
          </h2>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#2D3748] pt-1">
            <EditableField id="sec10_h2" defaultText="Más de 10 Años Impulsando la Transformación Digital" />
          </h3>

          <p className="text-base sm:text-lg text-[#4A5568] max-w-3xl mx-auto font-medium leading-relaxed">
            <EditableField
              id="sec10_desc"
              defaultText="Especialistas en desarrollo de software a la medida, automatización de procesos complejos y gobierno de datos para los sectores financiero, seguros y salud."
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1B7A38]/10 border border-[#1B7A38]/20 flex items-center justify-center text-[#1B7A38]">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-[#2D3748]">Perfil & Trayectoria</h3>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              Empresa con sede en República Dominicana y más de 10 años en el mercado. Ejecutamos proyectos presenciales y remotos garantizando el acompañamiento continuo en cada fase.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1B7A38]/10 border border-[#1B7A38]/20 flex items-center justify-center text-[#1B7A38]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-[#2D3748]">Filosofía Empresarial</h3>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              Nuestra misión es ser el mejor aliado tecnológico de nuestros clientes, fundamentados en valores de Innovación, Liderazgo, Integridad, Compromiso y Lealtad.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1B7A38]/10 border border-[#1B7A38]/20 flex items-center justify-center text-[#1B7A38]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-[#2D3748]">Calidad & Continuidad</h3>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              Equipo multidisciplinario certificado en gestión de proyectos PMI, arquitectura de software, metodologías Ágiles (Scrum), BCP (Continuidad) y DRP (Recuperación).
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white border-2 border-[#1B7A38] shadow-xl space-y-6">
          <h3 className="font-extrabold text-base sm:text-lg uppercase font-mono text-[#1B7A38] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1B7A38]" />
            <span>Estándares de Calidad & Certificaciones Internacionales</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-center space-y-1">
              <span className="text-xs font-mono font-bold text-[#1B7A38] block">ISO 27001 / 27002</span>
              <span className="text-[10px] text-[#718096]">Seguridad de Información</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-center space-y-1">
              <span className="text-xs font-mono font-bold text-[#1B7A38] block">ISO 9001</span>
              <span className="text-[10px] text-[#718096]">Gestión de Calidad</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-center space-y-1">
              <span className="text-xs font-mono font-bold text-[#1B7A38] block">DAMA CDMP</span>
              <span className="text-[10px] text-[#718096]">Gobierno de Datos</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-center space-y-1">
              <span className="text-xs font-mono font-bold text-[#1B7A38] block">CMMI & COBIT</span>
              <span className="text-[10px] text-[#718096]">Ingeniería de Software</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-center space-y-1">
              <span className="text-xs font-mono font-bold text-[#1B7A38] block">ITIL v4</span>
              <span className="text-[10px] text-[#718096]">Servicios de TI</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-center space-y-1">
              <span className="text-xs font-mono font-bold text-[#1B7A38] block">PMI & Agile</span>
              <span className="text-[10px] text-[#718096]">Metodología Ágil</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
