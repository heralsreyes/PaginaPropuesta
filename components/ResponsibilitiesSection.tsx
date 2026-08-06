"use client";

import React from "react";
import { Check, ShieldCheck, Award, Building2, Server } from "lucide-react";
import { motion } from "framer-motion";

interface ResponsibilitiesSectionProps {
  clientResponsibilities: string[];
  enfocoResponsibilities: string[];
  guaranteePeriod: string;
}

export const ResponsibilitiesSection: React.FC<ResponsibilitiesSectionProps> = ({
  clientResponsibilities,
  enfocoResponsibilities,
  guaranteePeriod,
}) => {
  return (
    <section id="responsabilidades" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[#FAF9F6] border-t border-[#E4E4E7] px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-6xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3.5 py-1 rounded-full border border-[#BFDBFE]">
            ACUERDO DE SERVICIO & GARANTÍA
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#111111] mt-3 mb-2">
            Matriz de Responsabilidades & Garantía
          </h2>
          <p className="text-[#52525B] text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Delimitación clara de compromisos recíprocos para asegurar la entrega en tiempos y estándares acordados.
          </p>
        </div>

        {/* Base44 Dual-Panel Highlight Aesthetic (Max-w-6xl) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full mb-6">
          {/* Left Panel (Provider - ENFOCO Commitments): Dark Theme Card */}
          <div className="bg-[#18181B] text-white rounded-3xl p-7 sm:p-8 shadow-xl border border-zinc-800 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#2563EB]/15 blur-2xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-[#2563EB]/25">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Compromisos de ENFOCO, S.R.L.</h3>
                  <span className="text-xs font-semibold text-[#2563EB]">Proveedor Tecnológico</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {enfocoResponsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-zinc-200">
                    <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="leading-relaxed font-normal">{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-xs font-bold text-[#2563EB] flex items-center justify-between font-mono">
              <span>SLA Calidad & Entrega</span>
              <span>100% Cobertura</span>
            </div>
          </div>

          {/* Right Panel (Client - Empresa X Commitments): Light Tint Card */}
          <div className="bg-[#F4F4F5] border border-[#E4E4E7] text-[#111111] rounded-3xl p-7 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E4E4E7] text-[#52525B] flex items-center justify-center shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#111111]">Compromisos de la Empresa Cliente</h3>
                  <span className="text-xs font-semibold text-[#71717A]">Contraparte Operativa</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {clientResponsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#52525B]">
                    <div className="w-5 h-5 rounded-full bg-white text-[#52525B] border border-[#E4E4E7] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-relaxed font-normal text-[#111111]">{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#E4E4E7] text-xs font-semibold text-[#71717A] flex items-center justify-between font-mono">
              <span>Gestión de Aprobaciones</span>
              <span>Cronograma Conjunto</span>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Highlighted Guarantee Banner */}
        <div className="max-w-6xl mx-auto w-full bg-white border-2 border-[#2563EB]/30 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5 text-[#52525B]">
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <strong className="text-sm font-bold text-[#111111] block">Garantía Total de la Solución: {guaranteePeriod}</strong>
              <span className="text-xs text-[#71717A]">Acompañamiento continuo post-pase a producción para certificar el correcto funcionamiento.</span>
            </div>
          </div>

          <div className="shrink-0 inline-flex items-center space-x-1.5 bg-[#EFF6FF] px-4 py-2 rounded-xl border border-[#BFDBFE] text-[#2563EB] font-bold text-xs">
            <Award className="w-4 h-4" />
            <span>Respaldo 100% Incluido</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
