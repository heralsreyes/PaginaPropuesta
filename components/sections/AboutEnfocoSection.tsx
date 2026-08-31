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
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0C1322] to-[#080D18] text-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-slate-800"
    >
      {/* Sutil halo ambiental suave */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-slate-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-[400px] h-[400px] bg-[#F08D17]/5 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10 relative z-10"
      >
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] uppercase font-mono px-4 py-1.5 rounded-full bg-white/5 border border-white/10 inline-flex items-center gap-2 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#F08D17]" />
            <EditableField id="sec10_badge" defaultText="10. SOBRE ENFOCO S.R.L. · PERFIL CORPORATIVO & CERTIFICACIONES" />
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] pt-2 font-display">
            <EditableField id="sec10_h2" defaultText="Más de 10 Años Impulsando la Transformación Digital" />
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            <EditableField
              id="sec10_desc"
              defaultText="Especialistas en desarrollo de software a la medida, automatización de procesos complejos y gobierno de datos para los sectores financiero, seguros y salud."
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:border-slate-500/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F08D17]">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-white font-display">Perfil & Trayectoria</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Empresa con sede en República Dominicana y más de 10 años en el mercado. Ejecutamos proyectos presenciales y remotos garantizando el acompañamiento continuo en cada fase.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:border-slate-500/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F08D17]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-white font-display">Filosofía Empresarial</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Nuestra misión es ser el mejor aliado tecnológico de nuestros clientes, fundamentados en valores de Innovación, Liderazgo, Integridad, Compromiso y Lealtad.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl hover:border-slate-500/50 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F08D17]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-white font-display">Calidad & Continuidad</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Equipo multidisciplinario certificado en gestión de proyectos PMI, arquitectura de software, metodologías Ágiles (Scrum), BCP (Continuidad) y DRP (Recuperación).
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl space-y-6">
          <h3 className="font-extrabold text-base sm:text-lg uppercase font-mono text-[#F08D17] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F08D17]" />
            <span>Estándares de Calidad & Certificaciones Internacionales</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 hover:border-slate-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-white block">ISO 27001 / 27002</span>
              <span className="text-[10px] text-slate-400">Seguridad de Información</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 hover:border-slate-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-white block">ISO 9001</span>
              <span className="text-[10px] text-slate-400">Gestión de Calidad</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 hover:border-slate-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-white block">DAMA CDMP</span>
              <span className="text-[10px] text-slate-400">Gobierno de Datos</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 hover:border-slate-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-white block">CMMI & COBIT</span>
              <span className="text-[10px] text-slate-400">Ingeniería de Software</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 hover:border-slate-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-white block">ITIL v4</span>
              <span className="text-[10px] text-slate-400">Gestión de Servicios</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 hover:border-slate-500/50 transition-all">
              <span className="text-xs font-mono font-bold text-white block">Scrum / PMI</span>
              <span className="text-[10px] text-slate-400">Metodología Ágil</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
