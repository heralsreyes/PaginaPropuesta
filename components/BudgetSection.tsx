"use client";

import React, { useState } from "react";
import { ProposalData } from "@/data/proposalData";
import { CheckCircle2, CreditCard, Award, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface BudgetSectionProps {
  budget: ProposalData["budget"];
  onOpenAcceptModal: () => void;
}

export const BudgetSection: React.FC<BudgetSectionProps> = ({ budget, onOpenAcceptModal }) => {
  const [currency, setCurrency] = useState<"USD" | "DOP">("USD");

  const exchangeRate = 60.0;

  const formatMoney = (amount: number, curr: "USD" | "DOP") => {
    const finalAmount = curr === "DOP" ? amount * exchangeRate : amount;
    return new Intl.NumberFormat(curr === "USD" ? "en-US" : "es-DO", {
      style: "currency",
      currency: curr,
      minimumFractionDigits: 2,
    }).format(finalAmount);
  };

  const taxAmount = budget.totalAmount - budget.amountWithoutTax;

  return (
    <section id="inversion" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[#FAF9F6] border-t border-[#E4E4E7] px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3.5 py-1 rounded-full border border-[#BFDBFE]">
            PROPUESTA ECONÓMICA • INVERSIÓN TRANSPARENTE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#111111] mt-3 mb-2">
            Presupuesto & Esquema de Inversión
          </h2>
          <p className="text-[#52525B] text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Monto total estimado para la ejecución del proyecto con desglose de impuestos y modalidades de pago por entregables.
          </p>
        </div>

        {/* High-Impact Contrast Focal Point (Max-w-7xl) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full items-stretch">
          {/* Left Card (col-span-5): Refactored Dark Theme Highlight Hero Pricing Card */}
          <div className="lg:col-span-5 bg-[#18181B] text-white border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[440px]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/20 blur-3xl rounded-full pointer-events-none" />

            <div>
              {/* Currency Selector Toggle Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                  Resumen Financiero
                </span>
                <div className="inline-flex p-1 rounded-xl bg-zinc-800 border border-zinc-700">
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      currency === "USD" ? "bg-[#2563EB] text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    USD
                  </button>
                  <button
                    onClick={() => setCurrency("DOP")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      currency === "DOP" ? "bg-[#2563EB] text-white" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    DOP
                  </button>
                </div>
              </div>

              {/* Financial Breakdown Rows (Subtotal & ITBIS) */}
              <div className="space-y-3 mb-2">
                <div className="flex items-center justify-between text-sm pr-2">
                  <span className="text-zinc-400 font-medium">Monto Sin Impuestos:</span>
                  <span className="text-zinc-300 font-mono font-medium">
                    {formatMoney(budget.amountWithoutTax, currency)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm pr-2">
                  <span className="text-zinc-400 font-medium">ITBIS / Impuestos (18%):</span>
                  <span className="text-[#3B82F6] font-mono font-semibold bg-[#2563EB]/15 px-2.5 py-1 rounded-lg border border-[#2563EB]/30">
                    +{formatMoney(taxAmount, currency)}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-800 my-4" />

              {/* Main Total Display (BIG & PROMINENT) */}
              <div>
                <span className="text-xs font-bold text-zinc-400 tracking-wider uppercase block font-mono">
                  TOTAL GENERAL AGREGADO (CON ITBIS)
                </span>
                <div className="text-5xl md:text-6xl font-black font-display text-white tracking-tight my-2 pr-2">
                  {formatMoney(budget.totalAmount, currency)}
                </div>
              </div>
            </div>

            {/* CTA & Footer Meta */}
            <div>
              <button
                onClick={onOpenAcceptModal}
                className="w-full inline-flex items-center justify-center space-x-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#2563EB]/30 transition-all text-base mt-4 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Aceptar Propuesta Formal</span>
              </button>

              <div className="text-zinc-400 text-xs text-center mt-3 font-mono flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span>Incluye 60 Días de Garantía SLA Post-Pase</span>
              </div>
            </div>
          </div>

          {/* Right Card (col-span-7): Payment Milestones Breakdown */}
          <div className="lg:col-span-7 bg-white border border-[#E4E4E7] rounded-3xl p-7 sm:p-8 md:p-10 shadow-sm flex flex-col justify-between pr-8 md:pr-10">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base sm:text-lg font-extrabold text-[#111111] flex items-center space-x-2.5">
                  <CreditCard className="w-5 h-5 text-[#2563EB]" />
                  <span>Esquema de Pagos por Entregables</span>
                </h3>
                <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-3.5 py-1 rounded-full border border-[#BFDBFE]">
                  3 Hitos de Pago
                </span>
              </div>

              <div className="space-y-4">
                {budget.paymentTerms.map((term, idx) => (
                  <div
                    key={idx}
                    className="p-4.5 rounded-2xl bg-[#FAF9F6] border border-[#E4E4E7] flex items-start space-x-4 hover:border-[#2563EB]/40 transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {term.percentage}%
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#111111] truncate">{term.milestone}</h4>
                        <span className="text-xs sm:text-sm font-mono font-bold text-[#2563EB] shrink-0 pl-2">
                          {formatMoney((budget.totalAmount * term.percentage) / 100, currency)}
                        </span>
                      </div>
                      <p className="text-xs text-[#52525B] leading-relaxed font-normal">{term.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-[#E4E4E7] flex flex-wrap items-center justify-between gap-2 text-xs text-[#71717A] font-mono">
              <span>Modalidad: Transferencia Bancaria</span>
              <span className="font-bold text-[#111111]">Facturación con NCF Fiscal</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
