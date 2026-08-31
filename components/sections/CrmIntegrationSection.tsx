"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  Zap,
  Smartphone,
  CheckCircle2,
  CheckCircle,
  Bot,
  ShieldCheck,
} from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";

interface CrmIntegrationSectionProps {
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

export const CrmIntegrationSection: React.FC<CrmIntegrationSectionProps> = ({ secId }) => {
  const [activeFlowTab, setActiveFlowTab] = useState<"epb" | "esafi">("epb");
  const [selectedFlowStep, setSelectedFlowStep] = useState<number>(1);
  const [isSimulatingTransmission, setIsSimulatingTransmission] = useState<boolean>(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState<boolean>(false);

  const calcAmount = 50000;
  const calcTermDays = 180;
  const currentRate = 0.095;

  const triggerTransmissionSimulation = () => {
    setIsSimulatingTransmission(true);
    setTransmissionSuccess(false);
    setSelectedFlowStep(1);

    setTimeout(() => setSelectedFlowStep(2), 600);
    setTimeout(() => setSelectedFlowStep(3), 1200);
    setTimeout(() => {
      setIsSimulatingTransmission(false);
      setTransmissionSuccess(true);
    }, 1800);
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
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] theme-h2-color uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec6_badge" defaultText="06. ARQUITECTURA DE INTEGRACIÓN CENTRAL" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white theme-h1-color">
            <EditableField id="sec6_h2" defaultText="Enrutamiento Inteligente — Dynamics CRM & SIFI Fondos" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 theme-text-color max-w-3xl mx-auto font-medium">
            <EditableField
              id="sec6_desc"
              defaultText="Toca los pasos del diagrama o presiona 'Simular Transmisión' para ver cómo viajan los datos entre sistemas."
            />
          </p>
        </div>

        {/* Dual Flow Selector */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-lg text-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveFlowTab("epb");
                setSelectedFlowStep(1);
                setTransmissionSuccess(false);
              }}
              className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer ${
                activeFlowTab === "epb"
                  ? "bg-[#F08D17] text-white shadow-xl scale-105"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              Flujo EPB (Puesto de Bolsa &rarr; Dynamics 365 CRM)
            </button>
            <button
              onClick={() => {
                setActiveFlowTab("esafi");
                setSelectedFlowStep(1);
                setTransmissionSuccess(false);
              }}
              className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer ${
                activeFlowTab === "esafi"
                  ? "bg-[#F08D17] text-white shadow-xl scale-105"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              Flujo ESAFI (Fondos Abiertos &rarr; SIFI Fondos)
            </button>
          </div>

          <button
            onClick={triggerTransmissionSimulation}
            disabled={isSimulatingTransmission}
            className="px-5 py-3 rounded-2xl bg-[#F08D17] hover:bg-[#d87c0f] text-white font-extrabold text-xs font-mono shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Zap className={`w-4 h-4 ${isSimulatingTransmission ? "animate-spin" : ""}`} />
            <span>{isSimulatingTransmission ? "Transmitiendo Datos..." : "⚡ Simular Transmisión de Orden"}</span>
          </button>
        </div>

        {/* Interactive Step-by-Step Diagram Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl space-y-8 text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <Database className="w-7 h-7 text-[#F08D17]" />
              <div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-white">
                  {activeFlowTab === "epb"
                    ? "Flujo Operaciones Excel Puesto de Bolsa (EPB)"
                    : "Flujo Operaciones Excel SAFI (Fondos Abiertos ESAFI)"}
                </h3>
                <span className="text-xs text-white/60 font-mono">Arquitectura con Conector Bidireccional RESTful</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                {activeFlowTab === "epb" ? "🟢 Dynamics CRM ONLINE (SLA 99.9%)" : "🟢 SIFI Webhook ONLINE (Latencia < 40ms)"}
              </span>
            </div>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div
              onClick={() => setSelectedFlowStep(1)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                selectedFlowStep === 1
                  ? "bg-[#002B2E] border-2 border-[#F08D17] shadow-xl ring-2 ring-[#F08D17]/30 scale-102"
                  : "bg-[#002D30]/80 border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#F08D17] bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                  PASO 01
                </span>
                <Smartphone className="w-6 h-6 text-[#F08D17]" />
              </div>
              <h4 className="font-extrabold text-base text-white">
                {activeFlowTab === "epb" ? "Solicitud del Inversionista" : "Solicitud de Aporte / Rescate"}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeFlowTab === "epb"
                  ? "Pacto de Mutuo o Renta Fija con firma fehaciente por FaceID desde App Móvil."
                  : "Inversionista solicita movimiento sobre su encargo de fondo abierto en la App."}
              </p>
            </div>

            <div
              onClick={() => setSelectedFlowStep(2)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                selectedFlowStep === 2
                  ? "bg-[#002B2E] border-2 border-[#F08D17] shadow-xl ring-2 ring-[#F08D17]/30 scale-102"
                  : "bg-[#002D30]/80 border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#F08D17] bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                  PASO 02
                </span>
                <Zap className="w-6 h-6 text-[#F08D17]" />
              </div>
              <h4 className="font-extrabold text-base text-white">
                {activeFlowTab === "epb" ? "Conector CRM & Expediente IA" : "Notificación & Carga SIFI"}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeFlowTab === "epb"
                  ? "Motor genera Oportunidad vinculada al titular e informe de intención analizado por IA."
                  : "Servicio notifica al área de operaciones e integra la orden en SIFI Fondos."}
              </p>
            </div>

            <div
              onClick={() => setSelectedFlowStep(3)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                selectedFlowStep === 3
                  ? "bg-[#002B2E] border-2 border-[#F08D17] shadow-xl ring-2 ring-[#F08D17]/30 scale-102"
                  : "bg-[#002D30]/80 border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold text-[#F08D17] bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                  PASO 03
                </span>
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h4 className="font-extrabold text-base text-white">
                {activeFlowTab === "epb" ? "Cierre Comercial & Registro" : "Confirmación Inmediata"}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeFlowTab === "epb"
                  ? "Ejecutivo de cartera aprueba en Dynamics 365 e instruye liquidación final."
                  : "Cliente recibe comprobante de procesamiento con sello de tiempo."}
              </p>
            </div>
          </div>

          {transmissionSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-[#002B2E] border border-emerald-400 flex items-center justify-between text-emerald-300 font-mono text-xs font-bold shadow-md"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  {activeFlowTab === "epb"
                    ? "✅ Transmisión Exitosa: Oportunidad autogestionada en Microsoft Dynamics 365 CRM (#OPP-2026-9912)"
                    : "✅ Transmisión Exitosa: Orden de Aporte cargada en SIFI Fondos (#ORD-2026-4092)"}
                </span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-400/40">
                HTTP 201 Created
              </span>
            </motion.div>
          )}

          <div className="p-6 sm:p-8 rounded-3xl bg-[#002D30]/90 border border-white/20 shadow-2xl space-y-6 text-white">
            <div className="flex flex-wrap items-center justify-between border-b border-white/15 pb-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#F08D17] text-white flex items-center justify-center font-bold shadow-md">
                  {activeFlowTab === "epb" ? <Bot className="w-5 h-5 text-white" /> : <Zap className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-white">
                    {activeFlowTab === "epb"
                      ? "Ficha Ejecutiva — Expediente Comercial IA Dynamics 365"
                      : "Ficha Ejecutiva — Registro Operativo SIFI Fondos"}
                  </h4>
                  <span className="text-xs text-slate-300 font-mono">
                    {activeFlowTab === "epb"
                      ? "Resumen de datos procesados para Dynamics 365 CRM"
                      : "Resumen de datos integrados en el Core SIFI"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-extrabold text-[#F08D17] bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Paso 0{selectedFlowStep} Seleccionado
                </span>
              </div>
            </div>

            {activeFlowTab === "epb" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#002B2E] border border-white/10 space-y-3">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <div className="w-10 h-10 rounded-full bg-[#F08D17] text-white font-bold text-sm flex items-center justify-center shadow-md">
                      JP
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm text-white">Juan Pérez</h5>
                      <span className="text-xs text-slate-400 font-mono">RNC: 001-XXXX-X</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="text-[#64748B] font-bold block font-mono">PERFIL KYC SIMV:</span>
                    <span className="font-bold text-[#004F54] bg-[#004F54]/10 px-2.5 py-1 rounded-lg inline-block">
                      Conservador / Renta Fija
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FFFBEB] border border-[#FCD34D] space-y-3">
                  <div className="border-b border-[#FCD34D] pb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#92400E] font-mono uppercase">SOLICITUD DIGITAL</span>
                    <span className="text-[10px] font-mono font-bold bg-[#F08D17] text-white px-2 py-0.5 rounded">EXCEL EPB</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">Renovación Mutuo Estructurado</p>
                    <p className="text-2xl font-black text-[#004F54] font-mono mt-1">${calcAmount.toLocaleString()} USD</p>
                    <span className="text-xs font-mono font-bold text-[#F08D17] block mt-1">
                      Tasa: {(currentRate * 100).toFixed(1)}% p.a. • Plazo: {calcTermDays} Días
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#A7F3D0] space-y-3">
                  <div className="border-b border-[#A7F3D0] pb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#166534] font-mono uppercase">IA & SEGURIDAD SIMV</span>
                    <ShieldCheck className="w-4 h-4 text-[#166534]" />
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#334155] font-bold">Firma FaceID:</span>
                      <span className="font-bold text-[#166534] font-mono">✔ Verificada</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#334155] font-bold">Score Retención IA:</span>
                      <span className="font-bold text-[#166534] font-mono">94.8% (Alto)</span>
                    </div>
                    <div className="w-full bg-[#A7F3D0] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#166534] h-full rounded-full w-[95%]" />
                    </div>
                    <span className="text-[10px] text-[#15803D] font-mono font-bold block pt-1">
                      Oportunidad Autocreada en Dynamics 365
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
                    <div className="w-10 h-10 rounded-full bg-[#006B70] text-white font-bold text-sm flex items-center justify-center shadow-md">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm text-[#0F172A]">Encargo #ENC-4092</h5>
                      <span className="text-xs text-[#64748B] font-mono">Fondo Abierto Liquidez</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="text-[#64748B] font-bold block font-mono">TITULAR REGISTRADO:</span>
                    <span className="font-bold text-[#0F172A]">Juan Pérez (RNC 001-XXXX-X)</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F0FDFA] border border-[#99F6E4] space-y-3">
                  <div className="border-b border-[#99F6E4] pb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F766E] font-mono uppercase">APORTE INMEDIATO</span>
                    <span className="text-[10px] font-mono font-bold bg-[#006B70] text-white px-2 py-0.5 rounded">ESAFI</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">Fondo Abierto Liquidez Excel</p>
                    <p className="text-2xl font-black text-[#006B70] font-mono mt-1">$15,000.00 USD</p>
                    <span className="text-xs font-mono font-bold text-[#0F766E] block mt-1">
                      Cuotas Calculadas: 1,240.50 Cuotas
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#A7F3D0] space-y-3">
                  <div className="border-b border-[#A7F3D0] pb-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#166534] font-mono uppercase">ESTATUS SIFI FONDOS</span>
                    <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#334155] font-bold">Horario Operacional:</span>
                      <span className="font-bold text-[#166534] font-mono">✔ Válido SIMV</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#334155] font-bold">Webhook Directo:</span>
                      <span className="font-bold text-[#166534] font-mono">HTTP 201 Created</span>
                    </div>
                    <span className="text-[10px] text-[#15803D] font-mono font-bold block pt-1 bg-[#A7F3D0]/40 p-1.5 rounded-lg text-center">
                      Carga Directa Completada Sin Manuales
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
