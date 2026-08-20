"use client";

import React from "react";
import { useProposal } from "@/context/ProposalContext";
import { useFinancialStore } from "@/store/useFinancialStore";
import { Plus, Trash2 } from "lucide-react";

export const BudgetTab: React.FC = () => {
  const { proposal, updateBudget, addPaymentTerm, removePaymentTerm, updatePaymentTerm } = useProposal();
  const { hasTax, taxPercent, hasDiscount, discountValue, discountType, setHasTax, setTaxPercent, setHasDiscount, setDiscountValue, setDiscountType } = useFinancialStore();

  return (
    <div className="space-y-6 text-xs">
      <div className="pb-4 border-b border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-3">
          Configuración Financiera Global
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Monto Base Sin Impuestos</label>
            <input
              type="number"
              value={proposal.budget.amountWithoutTax}
              onChange={(e) => updateBudget({ amountWithoutTax: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono font-bold"
            />
          </div>
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Monto Total Estimado</label>
            <input
              type="number"
              value={proposal.budget.totalAmount}
              onChange={(e) => updateBudget({ totalAmount: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono font-bold text-[#F08D17]"
            />
          </div>
        </div>

        {/* Impuestos & Descuentos */}
        <div className="p-4 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasTax}
                onChange={(e) => setHasTax(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-[#2563EB]"
              />
              <span className="font-bold text-[#111111]">Aplicar Impuesto / ITBIS</span>
            </div>
            {hasTax && (
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  className="w-16 px-2 py-1 bg-white border border-[#E4E4E7] rounded-lg text-right font-mono"
                />
                <span className="font-bold">%</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#E4E4E7]">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={hasDiscount}
                onChange={(e) => setHasDiscount(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-300 text-[#2563EB]"
              />
              <span className="font-bold text-[#111111]">Aplicar Descuento Especial</span>
            </div>
            {hasDiscount && (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-20 px-2 py-1 bg-white border border-[#E4E4E7] rounded-lg text-right font-mono"
                />
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as "percent" | "fixed")}
                  className="px-2 py-1 bg-white border border-[#E4E4E7] rounded-lg"
                >
                  <option value="percent">%</option>
                  <option value="fixed">USD</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Condición de Pago Hitos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
            Hitos & Términos de Pago ({proposal.budget.paymentTerms.length})
          </h4>
          <button
            onClick={() => addPaymentTerm({ percentage: 20, milestone: "Nuevo Hito", description: "Contra entrega" })}
            className="px-3 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Agregar Hito</span>
          </button>
        </div>

        <div className="space-y-3">
          {proposal.budget.paymentTerms.map((term, i) => (
            <div key={i} className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2 shrink-0">
                <input
                  type="number"
                  value={term.percentage}
                  onChange={(e) => updatePaymentTerm(i, { percentage: Number(e.target.value) })}
                  className="w-16 px-2 py-1 bg-white border border-[#E4E4E7] rounded-lg text-right font-mono font-bold"
                />
                <span className="font-bold">%</span>
              </div>

              <input
                type="text"
                value={term.milestone}
                onChange={(e) => updatePaymentTerm(i, { milestone: e.target.value })}
                className="w-full px-2 py-1 bg-white border border-[#E4E4E7] rounded-lg font-medium"
                placeholder="Nombre del hito"
              />

              <button
                onClick={() => removePaymentTerm(i)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
