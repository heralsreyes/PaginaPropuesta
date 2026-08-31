"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Users, CheckCircle2, TrendingUp, Plus, Trash2 } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { EditableBlockWrapper } from "@/components/studio/EditableBlockWrapper";
import { useStudioStore } from "@/store/useStudioStore";

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

const DEFAULT_PILLARS = [
  {
    id: "pillar-1",
    title: "Autogestión Inversionista 24/7",
    sub: "App Móvil iOS/Android & Portal Web",
    icon: "zap",
    bullets: [
      "Consulta unificada 360° de Renta Fija, Mutuos, Fondos Inmobiliarios Excel I y II y Fondos Abiertos ESAFI.",
      "Descarga directa de estados de cuenta PDF mensuales protegidos con contraseña del titular.",
      "Solicitudes digitales de inversión y renovaciones con generación de Trade Ticket fehaciente.",
    ],
  },
  {
    id: "pillar-2",
    title: "Gestión Comercial & CRM",
    sub: "Ejecutivos Enfocados en Cierre y Valor",
    icon: "users",
    bullets: [
      "Creación automática de Oportunidades comerciales vinculadas al titular en Microsoft Dynamics 365.",
      "Expediente CRM enriquecido con resúmenes generados por IA previa llamada de atención.",
      "Notificaciones automáticas a 15 días del vencimiento de Mutuos Estructurados.",
    ],
  },
];

const DEFAULT_ROWS = [
  {
    id: "row-1",
    process: "Solicitud de Estado de Cuenta",
    before: "Llamada/Email (Tiempo espera: 24h)",
    after: "Descarga Inmediata PDF Protegido 24/7",
  },
  {
    id: "row-2",
    process: "Pacto / Renovación de Mutuo",
    before: "Firma física en oficina / escaneo",
    after: "Trade Ticket Digital + Fehaciente OTP",
  },
  {
    id: "row-3",
    process: "Seguimiento Comercial EPB",
    before: "Registro manual de llamadas",
    after: "Oportunidad Autocreada en Dynamics CRM",
  },
  {
    id: "row-4",
    process: "Operaciones ESAFI (Fondos Abiertos)",
    before: "Trámite por formulario físico",
    after: "Integración Directa a SIFI Fondos",
  },
];

export const ValueArchitectureSection: React.FC<ValueArchitectureSectionProps> = ({ secId }) => {
  const { isDesignMode } = useStudioStore();
  const [pillars, setPillars] = useState(DEFAULT_PILLARS);
  const [rows, setRows] = useState(DEFAULT_ROWS);

  const handleDeletePillar = (id: string) => {
    if (pillars.length <= 1) return;
    setPillars(pillars.filter((p) => p.id !== id));
  };

  const handleAddPillar = () => {
    const newId = `pillar-${Date.now()}`;
    setPillars([
      ...pillars,
      {
        id: newId,
        title: "Nuevo Pilar de Valor",
        sub: "Plataforma & Eficiencia Operativa",
        icon: "zap",
        bullets: [
          "Beneficio clave para la institución e inversionistas.",
          "Automatización de procesos y reducción de tiempos.",
        ],
      },
    ]);
  };

  const handleDeleteRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleAddRow = () => {
    const newId = `row-${Date.now()}`;
    setRows([
      ...rows,
      {
        id: newId,
        process: "Nuevo Proceso Operativo",
        before: "Gestión manual y tiempos de espera",
        after: "Automatización 100% digital e inmediata",
      },
    ]);
  };

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

        {/* Pillars Grid */}
        <motion.div variants={sectionItemVariants} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <EditableBlockWrapper
                key={pillar.id}
                id={pillar.id}
                label="Pilar de Valor"
                onDelete={pillars.length > 1 ? () => handleDeletePillar(pillar.id) : undefined}
                className="h-full"
              >
                <div className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl shadow-2xl border border-white/10 text-white space-y-6 h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F08D17] shrink-0">
                        {pillar.icon === "users" ? <Users className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xl sm:text-2xl text-white">
                          <EditableField id={`sec2_${pillar.id}_title`} defaultText={pillar.title} />
                        </h3>
                        <span className="text-sm text-white/60 font-medium font-mono">
                          <EditableField id={`sec2_${pillar.id}_sub`} defaultText={pillar.sub} />
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-4 text-sm sm:text-base text-white/80">
                      {pillar.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                          <EditableField id={`sec2_${pillar.id}_b${bIdx}`} defaultText={b} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </EditableBlockWrapper>
            ))}
          </div>

          {isDesignMode && (
            <div className="flex justify-center pt-2">
              <button
                onClick={handleAddPillar}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#F08D17] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Pilar de Valor</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* ROI Comparison Table */}
        <motion.div variants={sectionItemVariants} className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl shadow-2xl border border-white/10 text-white overflow-x-auto space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base sm:text-lg uppercase font-mono text-[#F08D17] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#F08D17]" />
              <span>Impacto Operativo: Modelo Tradicional vs Solución Digital ENFOCO</span>
            </h3>
            {isDesignMode && (
              <button
                onClick={handleAddRow}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#F08D17] font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Fila</span>
              </button>
            )}
          </div>
          <table className="w-full text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b border-white/10 text-white/50 font-mono text-xs sm:text-sm uppercase tracking-wider">
                <th className="pb-3 px-2">Proceso Operativo</th>
                <th className="pb-3 px-2 text-white/50">Antes (Manual / Presencial)</th>
                <th className="pb-3 px-2 text-white font-bold">Con Plataforma ENFOCO</th>
                {isDesignMode && <th className="pb-3 px-2 text-right">Acción</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {rows.map((row) => (
                <tr key={row.id} className="group">
                  <td className="py-4 px-2 font-bold text-base text-white">
                    <EditableField id={`sec2_row_${row.id}_proc`} defaultText={row.process} />
                  </td>
                  <td className="py-4 px-2 text-white/60">
                    <EditableField id={`sec2_row_${row.id}_bef`} defaultText={row.before} />
                  </td>
                  <td className="py-4 px-2 font-bold text-white">
                    <EditableField id={`sec2_row_${row.id}_aft`} defaultText={row.after} />
                  </td>
                  {isDesignMode && (
                    <td className="py-4 px-2 text-right">
                      {rows.length > 1 && (
                        <button
                          onClick={() => handleDeleteRow(row.id)}
                          className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-400 p-1 transition-opacity cursor-pointer"
                          title="Eliminar fila"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </section>
  );
};
