"use client";

import React, { useState } from "react";
import { ProposalData } from "@/data/proposalData";
import { useProposal } from "@/context/ProposalContext";
import { useStudioStore } from "@/store/useStudioStore";
import { EditableText } from "@/components/studio/EditableText";
import { DeletableItem } from "@/components/studio/DeletableItem";
import { CheckCircle2, CreditCard, ShieldCheck, Tag, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface BudgetSectionProps {
  budget: ProposalData["budget"];
  onOpenAcceptModal: () => void;
}

export const BudgetSection: React.FC<BudgetSectionProps> = ({ budget, onOpenAcceptModal }) => {
  const { updateBudget, addPaymentTerm, removePaymentTerm } = useProposal();
  const { isDesignMode } = useStudioStore();

  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "DOP">("USD");

  const exchangeRate = 60.0;
  const currentCurrency = selectedCurrency || budget.currency || "USD";

  const formatMoney = (amount: number, curr: "USD" | "DOP") => {
    const finalAmount = curr === "DOP" ? amount * exchangeRate : amount;
    return new Intl.NumberFormat(curr === "USD" ? "en-US" : "es-DO", {
      style: "currency",
      currency: curr,
      minimumFractionDigits: 2,
    }).format(finalAmount);
  };

  const isTaxActive = budget.hasTax ?? true;
  const taxPercentVal = budget.taxPercent ?? 18;
  const isDiscountActive = budget.hasDiscount ?? false;
  const discountValueVal = budget.discountValue ?? 0;
  const discountTypeVal = budget.discountType || "fixed";
  const baseSubtotal = budget.amountWithoutTax || 12500;

  // Real-time calculation
  const isPercent = (discountTypeVal as string) === "percent" || (discountTypeVal as string) === "percentage";
  const discountAmount = isDiscountActive
    ? isPercent
      ? baseSubtotal * (discountValueVal / 100)
      : discountValueVal
    : 0;

  const subtotalNeto = Math.max(0, baseSubtotal - discountAmount);
  const taxAmount = isTaxActive ? subtotalNeto * (taxPercentVal / 100) : 0;
  const totalFinal = subtotalNeto + taxAmount;

  return (
    <section id="inversion" className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-[var(--bg-main)] border-t border-[var(--border-color)] px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3.5 py-1 rounded-full border border-[var(--accent-color)]/30">
            PROPUESTA ECONÓMICA • INVERSIÓN TRANSPARENTE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--text-primary)] mt-3 mb-2">
            Presupuesto & Esquema de Inversión
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Monto total estimado para la ejecución del proyecto con desglose de impuestos y modalidades de pago por entregables.
          </p>
        </div>

        {/* High-Impact Pricing Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-6xl mx-auto w-full items-stretch">
          {/* Left Card: Dark Hero Pricing Card */}
          <div className="xl:col-span-5 bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[420px] transition-colors duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent-color)]/15 blur-3xl rounded-full pointer-events-none" />

            <div>
              {/* Currency Selector Toggle Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)]/60 font-bold">
                  Resumen Financiero
                </span>
                <div className="inline-flex p-1 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)]">
                  <button
                    onClick={() => setSelectedCurrency("USD")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      currentCurrency === "USD" ? "bg-[var(--accent-color)] text-white" : "text-[var(--text-primary)]/70"
                    }`}
                  >
                    USD
                  </button>
                  <button
                    onClick={() => setSelectedCurrency("DOP")}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      currentCurrency === "DOP" ? "bg-[var(--accent-color)] text-white" : "text-[var(--text-primary)]/70"
                    }`}
                  >
                    DOP
                  </button>
                </div>
              </div>

              {/* Financial Breakdown Rows */}
              <div className="space-y-2.5 mb-2 text-xs">
                {/* Subtotal Base */}
                <div className="flex items-center justify-between text-[var(--text-primary)]/70">
                  <span>Monto Subtotal Base:</span>
                  <span className="font-mono font-bold text-[var(--text-primary)]">
                    {formatMoney(baseSubtotal, currentCurrency)}
                  </span>
                </div>

                {/* Descuento Especial (si aplica) */}
                {isDiscountActive && discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600 font-semibold">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      Descuento Comercial ({isPercent ? `${discountValueVal}%` : "Monto Fijo"}):
                    </span>
                    <span className="font-mono font-semibold">
                      -{formatMoney(discountAmount, currentCurrency)}
                    </span>
                  </div>
                )}

                {/* ITBIS / Impuestos */}
                {isTaxActive ? (
                  <div className="flex items-center justify-between text-[var(--text-primary)]/70">
                    <span>ITBIS ({taxPercentVal}%):</span>
                    <span className="text-[var(--accent-color)] font-mono font-semibold bg-[var(--accent-color)]/10 px-2.5 py-0.5 rounded-lg border border-[var(--accent-color)]/30">
                      +{formatMoney(taxAmount, currentCurrency)}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-amber-600 text-[11px]">
                    <span>ITBIS Exento:</span>
                    <span className="font-mono">$0.00 (Sin Impuestos)</span>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-[var(--border-color)] my-3" />

              {/* Main Total Display (BIG & PROMINENT) */}
              <div>
                <span className="text-xs font-bold text-[var(--text-primary)]/60 tracking-wider uppercase block font-mono">
                  TOTAL GENERAL AGREGADO {isTaxActive ? "(CON ITBIS)" : "(SIN IMPUESTOS)"}
                </span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-[var(--text-primary)] tracking-tight my-2 pr-2">
                  {formatMoney(totalFinal, currentCurrency)}
                </div>
              </div>
            </div>

            {/* CTA & Footer Meta */}
            <div>
              <button
                onClick={onOpenAcceptModal}
                className="w-full inline-flex items-center justify-center space-x-2.5 bg-[var(--accent-color)] hover:opacity-90 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-[var(--accent-color)]/30 transition-all text-sm mt-3 transform hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Aceptar Propuesta Formal</span>
              </button>

              <div className="text-[var(--text-primary)]/60 text-[11px] text-center mt-2.5 font-mono flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-color)]" />
                <span>Incluye 60 Días de Garantía SLA Post-Pase</span>
              </div>
            </div>
          </div>

          {/* Right Card: Payment Milestones */}
          <div className="xl:col-span-7 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between transition-colors duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-primary)] flex items-center space-x-2.5">
                  <CreditCard className="w-5 h-5 text-[var(--accent-color)]" />
                  <span>Esquema de Pagos por Entregables</span>
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-3.5 py-1 rounded-full border border-[var(--accent-color)]/30">
                    {budget.paymentTerms.length} Hitos de Pago
                  </span>
                  {isDesignMode && (
                    <button
                      onClick={() =>
                        addPaymentTerm({
                          milestone: "Nuevo Hito de Pago",
                          percentage: 20,
                          description: "Descripción editable del hito.",
                        })
                      }
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3.5">
                {budget.paymentTerms.map((term, idx) => (
                  <DeletableItem
                    key={idx}
                    onDelete={() => removePaymentTerm(idx)}
                    itemTitle="hito de pago"
                  >
                    <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-start space-x-4 hover:border-[var(--accent-color)]/40 transition-all">
                      <div className="w-11 h-11 rounded-2xl bg-[var(--accent-color)] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                        {term.percentage}%
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] truncate">
                            <EditableText
                              value={term.milestone || `Hito ${idx + 1}`}
                              onChange={(val) => {
                                const nextTerms = [...budget.paymentTerms];
                                nextTerms[idx] = { ...nextTerms[idx], milestone: val };
                                updateBudget({ paymentTerms: nextTerms });
                              }}
                              tag="span"
                            />
                          </h4>
                          <span className="text-xs sm:text-sm font-mono font-bold text-[var(--accent-color)] shrink-0 pl-2">
                            {formatMoney((totalFinal * term.percentage) / 100, currentCurrency)}
                          </span>
                        </div>
                        <div className="text-xs text-[var(--text-primary)]/70 leading-relaxed font-normal">
                          <EditableText
                            value={term.description}
                            onChange={(val) => {
                              const nextTerms = [...budget.paymentTerms];
                              nextTerms[idx] = { ...nextTerms[idx], description: val };
                              updateBudget({ paymentTerms: nextTerms });
                            }}
                            multiline
                            tag="p"
                          />
                        </div>
                      </div>
                    </div>
                  </DeletableItem>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-[var(--border-color)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-primary)]/60 font-mono">
              <span>Modalidad: Transferencia Bancaria</span>
              <span className="font-bold text-[var(--text-primary)]">Facturación con NCF Fiscal</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
