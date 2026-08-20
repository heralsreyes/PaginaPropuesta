"use client";

import React, { useState } from "react";
import { useProposal } from "@/context/ProposalContext";

export const SidebarBudgetTab: React.FC = () => {
  const { proposal, updateBudget } = useProposal();
  const budget = proposal?.budget;

  const [baseSubtotal, setBaseSubtotal] = useState(budget?.amountWithoutTax || 3850);
  const [currency, setCurrency] = useState<"USD" | "DOP">(budget?.currency || "USD");
  const [hasTax, setHasTax] = useState(budget?.hasTax ?? true);
  const [taxPercent, setTaxPercent] = useState(budget?.taxPercent || 18);
  const [hasDiscount, setHasDiscount] = useState(budget?.hasDiscount ?? false);
  const [discountValue, setDiscountValue] = useState(budget?.discountValue || 0);

  const handleTaxToggle = () => {
    const nextTax = !hasTax;
    setHasTax(nextTax);
    updateBudget({ hasTax: nextTax });
  };

  const handleDiscountToggle = () => {
    const nextDiscount = !hasDiscount;
    setHasDiscount(nextDiscount);
    updateBudget({ hasDiscount: nextDiscount });
  };

  const handleCurrencyChange = (curr: "USD" | "DOP") => {
    setCurrency(curr);
    updateBudget({ currency: curr });
  };

  const handleSubtotalChange = (val: number) => {
    setBaseSubtotal(val);
    updateBudget({ amountWithoutTax: val });
  };

  return (
    <div className="space-y-5 text-xs p-4">
      <div className="pb-2 border-b border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-3">
          Controles Financieros del Studio
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-[#71717A] font-medium mb-1">Monto Subtotal Sin Impuestos</label>
            <input
              type="number"
              value={baseSubtotal}
              onChange={(e) => handleSubtotalChange(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl font-mono font-bold text-[#111111]"
            />
          </div>

          <div>
            <label className="block text-[#71717A] font-medium mb-1">Moneda Principal</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCurrencyChange("USD")}
                className={`py-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                  currency === "USD" ? "bg-[#2563EB] text-white shadow-xs" : "bg-[#FAF9F6] border border-[#E4E4E7] text-[#111111]"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => handleCurrencyChange("DOP")}
                className={`py-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                  currency === "DOP" ? "bg-[#2563EB] text-white shadow-xs" : "bg-[#FAF9F6] border border-[#E4E4E7] text-[#111111]"
                }`}
              >
                DOP (RD$)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl">
          <span className="font-bold text-[#111111]">Aplicar Impuesto / ITBIS ({taxPercent}%)</span>
          <input
            type="checkbox"
            checked={hasTax}
            onChange={handleTaxToggle}
            className="w-4 h-4 rounded border-zinc-300 text-[#2563EB]"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl">
          <span className="font-bold text-[#111111]">Aplicar Descuento Comercial</span>
          <input
            type="checkbox"
            checked={hasDiscount}
            onChange={handleDiscountToggle}
            className="w-4 h-4 rounded border-zinc-300 text-[#2563EB]"
          />
        </div>

        {hasDiscount && (
          <div>
            <label className="block text-[#71717A] font-medium mb-1">Valor del Descuento</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => {
                const val = Number(e.target.value);
                setDiscountValue(val);
                updateBudget({ discountValue: val });
              }}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl font-mono"
            />
          </div>
        )}
      </div>
    </div>
  );
};
