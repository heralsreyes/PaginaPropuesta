"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";

interface EconomicProposalSectionProps {
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

export const EconomicProposalSection: React.FC<EconomicProposalSectionProps> = ({ secId }) => {
  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#004F54]/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10"
      >
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec9_badge" defaultText="09. ESQUEMA DE INVERSIÓN" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            <EditableField id="sec9_h2" defaultText="Propuesta Económica & Desglose de Costos" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 max-w-3xl mx-auto font-medium">
            <EditableField id="sec9_desc" defaultText="Esquema transparente configurado en USD según las especificaciones del requerimiento." />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bloque 1: Inversión Única */}
          <div className="p-8 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-white">Inversión Única de Implementación</h3>
                <span className="text-sm text-[#F08D17] font-mono font-bold">Desarrollo Web, App & Integración Dynamics/SIFI</span>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-black text-white font-mono">USD 5,000</span>
                <span className="text-xs text-slate-300 font-mono block font-bold">+ 18% ITBIS (USD 900)</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm sm:text-base text-slate-200 font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                <span>Desarrollo completo del portal web Next.js y app móvil multiplataforma.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                <span>Integración de conectores bidireccionales con Microsoft Dynamics CRM & SIFI.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                <span>Desarrollo de las 7 Épicas funcionales, Trade Ticket digital y expedientes IA.</span>
              </li>
            </ul>
          </div>

          {/* Bloque 2: Recurrente Mensual */}
          <div className="p-8 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-white">Recurrente Mensual</h3>
                <span className="text-sm text-emerald-300 font-mono font-bold">Operación, Mantenimiento & Soporte SLA</span>
              </div>
              <div className="text-right">
                <span className="text-3xl sm:text-4xl font-black text-[#F08D17] font-mono">USD 1,195 / mo</span>
                <span className="text-xs text-slate-300 font-mono block font-bold">Licencias + Soporte SIMV</span>
              </div>
            </div>

            <ul className="space-y-3 text-sm sm:text-base text-slate-200 font-medium">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Licenciamiento del motor de autogestión, notificaciones y resúmenes IA.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mantenimiento correctivo/evolutivo, parches de seguridad e infraestructura cloud.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Soporte técnico con SLA prioritario y monitoreo continuo 24/7.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="p-8 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl text-white space-y-4">
          <h4 className="font-extrabold text-base text-[#F08D17] uppercase font-mono mb-4">
            CONDICIONES & HITOS DE PAGO (INVERSIÓN ÚNICA)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm sm:text-base">
            <div className="p-5 rounded-2xl bg-[#002D30] border border-white/10 space-y-1 shadow-sm">
              <span className="font-extrabold text-[#F08D17] font-mono block text-lg">50% (USD 2,500)</span>
              <span className="text-slate-200 font-medium">Aprobación de la propuesta y firma de contrato.</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#002D30] border border-white/10 space-y-1 shadow-sm">
              <span className="font-extrabold text-[#F08D17] font-mono block text-lg">40% (USD 2,000)</span>
              <span className="text-slate-200 font-medium">Entrega de desarrollo core y pruebas UAT.</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#002D30] border border-white/10 space-y-1 shadow-sm">
              <span className="font-extrabold text-[#F08D17] font-mono block text-lg">10% (USD 500)</span>
              <span className="text-slate-200 font-medium">Pase a producción y aceptación final.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
