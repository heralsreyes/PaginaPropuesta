"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Users, CheckCircle2, TrendingUp } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";

interface ValueArchitectureSectionProps {
  secId: string;
}

const sectionContainerVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const sectionItemVariants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export const ValueArchitectureSection: React.FC<ValueArchitectureSectionProps> = ({ secId }) => {
  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden theme-section-bg bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#004F54]/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10"
      >
        <motion.div variants={sectionItemVariants} className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] theme-h2-color uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec2_badge" defaultText="02. Arquitectura de Valor & Ecosistema" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white theme-h1-color">
            <EditableField id="sec2_h2" defaultText="Autogestión 24/7 + Asesoría Comercial de Alto Valor" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 theme-text-color max-w-3xl mx-auto font-medium">
            <EditableField
              id="sec2_desc"
              defaultText="Eliminamos la fricción operativa transaccional mediante canales digitales autogestionados y potenciamos la venta ejecutiva con Inteligencia Artificial."
            />
          </p>
        </motion.div>

        <motion.div variants={sectionItemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Model 1: Autogestión Inversionista 24/7 */}
          <div className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl shadow-2xl border border-white/10 text-white space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F08D17] shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-white">
                  <EditableField id="sec2_card1_title" defaultText="Autogestión Inversionista 24/7" />
                </h3>
                <span className="text-sm text-white/60 font-medium font-mono">
                  <EditableField id="sec2_card1_sub" defaultText="App Móvil iOS/Android & Portal Web" />
                </span>
              </div>
            </div>
            <ul className="space-y-4 text-sm sm:text-base text-white/80">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                <span>Consulta unificada 360° de Renta Fija, Mutuos, Fondos Inmobiliarios Excel I y II y Fondos Abiertos ESAFI.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                <span>Descarga directa de estados de cuenta PDF mensuales protegidos con contraseña del titular.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                <span>Solicitudes digitales de inversión y renovaciones con generación de Trade Ticket fehaciente.</span>
              </li>
            </ul>
          </div>

          {/* Model 2: Relaciones de Alto Valor & CRM Dynamics */}
          <div className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl shadow-2xl border border-white/10 text-white space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F08D17] shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-white">
                  <EditableField id="sec2_card2_title" defaultText="Gestión Comercial & CRM" />
                </h3>
                <span className="text-sm text-white/60 font-medium font-mono">
                  <EditableField id="sec2_card2_sub" defaultText="Ejecutivos Enfocados en Cierre y Valor" />
                </span>
              </div>
            </div>
            <ul className="space-y-4 text-sm sm:text-base text-white/80">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                <span>Creación automática de Oportunidades comerciales vinculadas al titular en Microsoft Dynamics 365.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                <span>Expediente CRM enriquecido con resúmenes generados por IA previa llamada de atención.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                <span>Notificaciones automáticas a 15 días del vencimiento de Mutuos Estructurados.</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* ROI Comparison Table */}
        <motion.div variants={sectionItemVariants} className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl shadow-2xl border border-white/10 text-white overflow-x-auto">
          <h3 className="font-extrabold text-base sm:text-lg uppercase font-mono text-[#F08D17] mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#F08D17]" />
            <span>Impacto Operativo: Modelo Tradicional vs Solución Digital ENFOCO</span>
          </h3>
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-white/10 text-white/50 font-mono text-xs sm:text-sm uppercase tracking-wider">
                <th className="pb-3 px-2">Proceso Operativo</th>
                <th className="pb-3 px-2 text-white/50">Antes (Manual / Presencial)</th>
                <th className="pb-3 px-2 text-white font-bold">Con Plataforma ENFOCO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              <tr>
                <td className="py-4 px-2 font-bold text-base text-white">Solicitud de Estado de Cuenta</td>
                <td className="py-4 px-2 text-white/60">Llamada/Email (Tiempo espera: 24h)</td>
                <td className="py-4 px-2 font-bold text-white">Descarga Inmediata PDF Protegido 24/7</td>
              </tr>
              <tr>
                <td className="py-4 px-2 font-bold text-base text-white">Pacto / Renovación de Mutuo</td>
                <td className="py-4 px-2 text-white/60">Firma física en oficina / escaneo</td>
                <td className="py-4 px-2 font-bold text-white">Trade Ticket Digital + Fehaciente OTP</td>
              </tr>
              <tr>
                <td className="py-4 px-2 font-bold text-base text-white">Seguimiento Comercial EPB</td>
                <td className="py-4 px-2 text-white/60">Registro manual de llamadas</td>
                <td className="py-4 px-2 font-bold text-white">Oportunidad Autocreada en Dynamics CRM</td>
              </tr>
              <tr>
                <td className="py-4 px-2 font-bold text-base text-white">Operaciones ESAFI (Fondos Abiertos)</td>
                <td className="py-4 px-2 text-white/60">Trámite por formulario físico</td>
                <td className="py-4 px-2 font-bold text-white">Integración Directa a SIFI Fondos</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </section>
  );
};
