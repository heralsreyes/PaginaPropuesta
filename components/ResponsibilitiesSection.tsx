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
    <section id="responsabilidades" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[var(--bg-main)] border-t border-[var(--border-color)] px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-6xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3.5 py-1 rounded-full border border-[var(--accent-color)]/30">
            ACUERDO DE SERVICIO & GARANTÍA
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--text-primary)] mt-3 mb-2">
            Matriz de Responsabilidades & Garantía
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Delimitación clara de compromisos recíprocos para asegurar la entrega en tiempos y estándares acordados.
          </p>
        </div>

        {/* Dual-Panel Highlight Aesthetic (Max-w-6xl) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full mb-6">
          {/* Left Panel (Provider - ENFOCO Commitments): Card */}
          <div className="bg-[var(--card-bg)] text-[var(--text-primary)] rounded-3xl p-7 sm:p-8 shadow-xl border border-[var(--border-color)] flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--accent-color)]/10 blur-2xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-color)] text-white flex items-center justify-center shadow-md shadow-[var(--accent-color)]/25">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">Compromisos de ENFOCO, S.R.L.</h3>
                  <span className="text-xs font-semibold text-[var(--accent-color)]">Proveedor Tecnológico</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {enfocoResponsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[var(--text-primary)]/80">
                    <div className="w-5 h-5 rounded-full bg-[var(--accent-color)] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="leading-relaxed font-normal">{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[var(--border-color)] text-xs font-bold text-[var(--accent-color)] flex items-center justify-between font-mono">
              <span>SLA Calidad & Entrega</span>
              <span>100% Cobertura</span>
            </div>
          </div>

          {/* Right Panel (Client Commitments): Card */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-3xl p-7 sm:p-8 shadow-sm flex flex-col justify-between transition-colors duration-300">
            <div>
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)]/70 flex items-center justify-center shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)]">Compromisos de la Empresa Cliente</h3>
                  <span className="text-xs font-semibold text-[var(--text-primary)]/60">Contraparte Operativa</span>
                </div>
              </div>

              <div className="space-y-3.5">
                {clientResponsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[var(--text-primary)]/80">
                    <div className="w-5 h-5 rounded-full bg-[var(--bg-main)] text-[var(--text-primary)] border border-[var(--border-color)] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-relaxed font-normal text-[var(--text-primary)]">{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]/60 flex items-center justify-between font-mono">
              <span>Gestión de Aprobaciones</span>
              <span>Cronograma Conjunto</span>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Highlighted Guarantee Banner */}
        <div className="max-w-6xl mx-auto w-full bg-[var(--card-bg)] border-2 border-[var(--accent-color)]/30 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300">
          <div className="flex items-center space-x-3.5 text-[var(--text-primary)]/80">
            <div className="w-10 h-10 rounded-2xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 flex items-center justify-center text-[var(--accent-color)] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <strong className="text-sm font-bold text-[var(--text-primary)] block">Garantía Total de la Solución: {guaranteePeriod}</strong>
              <span className="text-xs text-[var(--text-primary)]/60">Acompañamiento continuo post-pase a producción para certificar el correcto funcionamiento.</span>
            </div>
          </div>

          <div className="shrink-0 inline-flex items-center space-x-1.5 bg-[var(--accent-color)]/10 px-4 py-2 rounded-xl border border-[var(--accent-color)]/30 text-[var(--accent-color)] font-bold text-xs">
            <Award className="w-4 h-4" />
            <span>Respaldo 100% Incluido</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
