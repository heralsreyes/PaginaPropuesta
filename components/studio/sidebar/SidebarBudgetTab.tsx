"use client";

import React, { useState } from "react";
import { useProposal } from "@/context/ProposalContext";
import { DollarSign, Percent, Receipt, Sparkles, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const SidebarBudgetTab: React.FC = () => {
  const { proposal, updateBudget } = useProposal();
  const budget = proposal?.budget;

  const [baseSubtotal, setBaseSubtotal] = useState(budget?.amountWithoutTax || 5000);
  const [currency, setCurrency] = useState<"USD" | "DOP">(budget?.currency || "USD");
  const [hasTax, setHasTax] = useState(budget?.hasTax ?? true);
  const [taxPercent, setTaxPercent] = useState(budget?.taxPercent || 18);
  const [hasDiscount, setHasDiscount] = useState(budget?.hasDiscount ?? false);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(
    (budget?.discountType as "percentage" | "fixed") || "percentage"
  );
  const [discountValue, setDiscountValue] = useState(budget?.discountValue || 10);

  // Manual Payment Terms
  const defaultTerms = [
    { percentage: 50, description: "Aprobación de la propuesta y firma de contrato.", amount: 0 },
    { percentage: 40, description: "Entrega de desarrollo core y pruebas UAT.", amount: 0 },
    { percentage: 10, description: "Pase a producción y aceptación final.", amount: 0 },
  ];
  const [terms, setTerms] = useState(
    budget?.paymentTerms && budget.paymentTerms.length > 0 ? budget.paymentTerms : defaultTerms
  );

  const discountAmount = hasDiscount
    ? discountType === "percentage"
      ? (baseSubtotal * discountValue) / 100
      : discountValue
    : 0;

  const taxableAmount = Math.max(0, baseSubtotal - discountAmount);
  const taxAmount = hasTax ? (taxableAmount * taxPercent) / 100 : 0;
  const grandTotal = taxableAmount + taxAmount;

  const currSymbol = currency === "USD" ? "USD $" : "RD$";

  const handleTaxToggle = () => {
    const nextTax = !hasTax;
    setHasTax(nextTax);
    updateBudget({ hasTax: nextTax });
    toast.success(nextTax ? `ITBIS (${taxPercent}%) activado` : "ITBIS desactivado");
  };

  const handleTaxPercentChange = (val: number) => {
    setTaxPercent(val);
    updateBudget({ taxPercent: val });
  };

  const handleDiscountToggle = () => {
    const nextDiscount = !hasDiscount;
    setHasDiscount(nextDiscount);
    updateBudget({
      hasDiscount: nextDiscount,
      discountType,
      discountValue,
    });
  };

  const handleDiscountTypeChange = (type: "percentage" | "fixed") => {
    setDiscountType(type);
    updateBudget({ discountType: type });
  };

  const handleDiscountValueChange = (val: number) => {
    setDiscountValue(val);
    updateBudget({
      discountValue: val,
      discountType,
      hasDiscount: true,
    });
  };

  const handleCurrencyChange = (curr: "USD" | "DOP") => {
    setCurrency(curr);
    updateBudget({ currency: curr });
    toast.success(`Moneda cambiada a ${curr}`);
  };

  const handleSubtotalChange = (val: number) => {
    setBaseSubtotal(val);
    updateBudget({ amountWithoutTax: val });
  };

  // Milestone Actions
  const handleTermChange = (index: number, field: "percentage" | "description", val: any) => {
    const updated = [...terms];
    updated[index] = {
      ...updated[index],
      [field]: field === "percentage" ? Number(val) : val,
    };
    // Recalculate amount
    updated[index].amount = (grandTotal * (updated[index].percentage || 0)) / 100;
    setTerms(updated);
    updateBudget({ paymentTerms: updated as any });
  };

  const handleAddTerm = () => {
    const newTerm = {
      percentage: 20,
      description: `Hito ${terms.length + 1}: Nueva Entrega`,
      amount: (grandTotal * 20) / 100,
    };
    const updated = [...terms, newTerm];
    setTerms(updated);
    updateBudget({ paymentTerms: updated as any });
    toast.success("Nuevo hito de pago añadido");
  };

  const handleRemoveTerm = (index: number) => {
    if (terms.length <= 1) return;
    const updated = terms.filter((_, i) => i !== index);
    setTerms(updated);
    updateBudget({ paymentTerms: updated as any });
    toast.info("Hito de pago eliminado");
  };

  const handleApplyMilestonePreset = (split: number[]) => {
    const defaultDescriptions = [
      "Aprobación de la propuesta y firma de contrato.",
      "Entrega de desarrollo core y pruebas UAT.",
      "Pase a producción y aceptación final.",
      "Cierre y entrega de documentación.",
    ];

    const newTerms = split.map((pct, idx) => ({
      percentage: pct,
      description: defaultDescriptions[idx] || `Hito ${idx + 1}: Entrega intermedia`,
      amount: (grandTotal * pct) / 100,
    }));

    setTerms(newTerms);
    updateBudget({ paymentTerms: newTerms as any });
    toast.success(`Hitos de pago actualizados a esquema ${split.join(" / ")}`);
  };

  const totalPercentage = terms.reduce((sum, t) => sum + (Number(t.percentage) || 0), 0);

  return (
    <div className="space-y-5 text-xs p-4">
      <div className="pb-2 border-b border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-1">
          Configuración Financiera & Presupuesto
        </h4>
        <p className="text-[#71717A] text-[11px]">
          Los cambios se sincronizan en vivo en todas las tarjetas de precios y calculadoras.
        </p>
      </div>

      {/* Live Financial Summary Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#004F54] to-[#002B2E] text-white space-y-3 shadow-lg border border-[#F08D17]/30">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#F08D17] font-bold">
            RESUMEN ECONÓMICO VIVO
          </span>
          <Receipt className="w-4 h-4 text-[#F08D17]" />
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between text-zinc-300">
            <span>Subtotal:</span>
            <span className="font-mono font-bold">{currSymbol} {baseSubtotal.toLocaleString()}</span>
          </div>

          {hasDiscount && (
            <div className="flex justify-between text-amber-300">
              <span>Descuento ({discountType === "percentage" ? `${discountValue}%` : "Fijo"}):</span>
              <span className="font-mono font-bold">- {currSymbol} {Math.round(discountAmount).toLocaleString()}</span>
            </div>
          )}

          {hasTax && (
            <div className="flex justify-between text-zinc-300">
              <span>ITBIS ({taxPercent}%):</span>
              <span className="font-mono font-bold">+ {currSymbol} {Math.round(taxAmount).toLocaleString()}</span>
            </div>
          )}

          <div className="pt-2 border-t border-white/20 flex justify-between items-center text-sm font-black text-white">
            <span>TOTAL ESTIMADO:</span>
            <span className="text-[#F08D17] font-mono text-base">{currSymbol} {Math.round(grandTotal).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* 1. Subtotal */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-1">Monto Subtotal Sin Impuestos</label>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-2 bg-zinc-100 border border-[#E4E4E7] rounded-xl font-mono font-bold text-zinc-600">
              {currency === "USD" ? "$" : "RD$"}
            </span>
            <input
              type="number"
              value={baseSubtotal}
              onChange={(e) => handleSubtotalChange(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl font-mono font-bold text-[#111111] focus:ring-2 focus:ring-[#2563EB]/20 outline-none"
            />
          </div>
        </div>

        {/* 2. Moneda */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-1">Moneda Principal</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleCurrencyChange("USD")}
              className={`py-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                currency === "USD"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-[#FAF9F6] border border-[#E4E4E7] text-[#111111] hover:bg-white"
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => handleCurrencyChange("DOP")}
              className={`py-2 rounded-xl font-mono font-bold transition-all cursor-pointer ${
                currency === "DOP"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-[#FAF9F6] border border-[#E4E4E7] text-[#111111] hover:bg-white"
              }`}
            >
              DOP (RD$)
            </button>
          </div>
        </div>

        {/* 3. ITBIS / Impuesto con Porcentaje Editable */}
        <div className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-[#111111] block">Aplicar Impuesto / ITBIS</span>
              <span className="text-[10px] text-zinc-500 font-mono">Calculado sobre el subtotal neto</span>
            </div>
            <input
              type="checkbox"
              checked={hasTax}
              onChange={handleTaxToggle}
              className="w-4 h-4 rounded border-zinc-300 text-[#2563EB] cursor-pointer"
            />
          </div>

          {hasTax && (
            <div className="pt-2 border-t border-[#E4E4E7] flex items-center justify-between">
              <label className="text-zinc-600 font-semibold text-[11px]">Tasa de ITBIS (%)</label>
              <div className="flex items-center space-x-1.5">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxPercent}
                  onChange={(e) => handleTaxPercentChange(Number(e.target.value))}
                  className="w-16 px-2 py-1 bg-white border border-[#E4E4E7] rounded-lg font-mono font-bold text-center text-[#111111]"
                />
                <span className="font-mono font-bold text-zinc-500">%</span>
              </div>
            </div>
          )}
        </div>

        {/* 4. Descuento Comercial (Porcentaje o Fijo) */}
        <div className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-[#111111] block">Aplicar Descuento Comercial</span>
              <span className="text-[10px] text-zinc-500 font-mono">Ajuste especial de cierre</span>
            </div>
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={handleDiscountToggle}
              className="w-4 h-4 rounded border-zinc-300 text-[#2563EB] cursor-pointer"
            />
          </div>

          {hasDiscount && (
            <div className="pt-2 border-t border-[#E4E4E7] space-y-2">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-200/60 rounded-xl">
                <button
                  type="button"
                  onClick={() => handleDiscountTypeChange("percentage")}
                  className={`py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                    discountType === "percentage"
                      ? "bg-white text-[#2563EB] shadow-xs"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  % Porcentaje
                </button>
                <button
                  type="button"
                  onClick={() => handleDiscountTypeChange("fixed")}
                  className={`py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                    discountType === "fixed"
                      ? "bg-white text-[#2563EB] shadow-xs"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  $ Monto Fijo
                </button>
              </div>

              {/* Value Input */}
              <div className="flex items-center justify-between">
                <label className="text-zinc-600 font-semibold text-[11px]">
                  {discountType === "percentage" ? "Porcentaje de Descuento" : `Monto (${currSymbol})`}
                </label>
                <div className="flex items-center space-x-1.5">
                  <input
                    type="number"
                    min="0"
                    max={discountType === "percentage" ? 100 : baseSubtotal}
                    value={discountValue}
                    onChange={(e) => handleDiscountValueChange(Number(e.target.value))}
                    className="w-20 px-2 py-1 bg-white border border-[#E4E4E7] rounded-lg font-mono font-bold text-center text-[#111111]"
                  />
                  <span className="font-mono font-bold text-zinc-500">
                    {discountType === "percentage" ? "%" : currSymbol}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Gestor de Hitos Manuales y Presets */}
        <div className="pt-3 border-t border-[#E4E4E7] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-zinc-800 font-extrabold text-[11px] font-mono uppercase">
                Hitos de Pago (Milestones)
              </label>
              <span className={`text-[10px] font-mono font-bold ${totalPercentage === 100 ? "text-emerald-600" : "text-amber-600"}`}>
                Total: {totalPercentage}% {totalPercentage !== 100 && "(Debe sumar 100%)"}
              </span>
            </div>
            <button
              onClick={handleAddTerm}
              className="text-[10px] font-bold text-[#2563EB] hover:underline flex items-center gap-1 bg-[#EFF6FF] px-2 py-1 rounded-lg border border-[#2563EB]/20 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Hito
            </button>
          </div>

          {/* Presets Rápidos */}
          <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
            <button
              onClick={() => handleApplyMilestonePreset([50, 40, 10])}
              className="p-1.5 rounded-xl bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] font-bold text-center cursor-pointer"
            >
              50/40/10
            </button>
            <button
              onClick={() => handleApplyMilestonePreset([30, 40, 30])}
              className="p-1.5 rounded-xl bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] font-bold text-center cursor-pointer"
            >
              30/40/30
            </button>
            <button
              onClick={() => handleApplyMilestonePreset([50, 25, 25])}
              className="p-1.5 rounded-xl bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] font-bold text-center cursor-pointer"
            >
              50/25/25
            </button>
            <button
              onClick={() => handleApplyMilestonePreset([50, 50])}
              className="p-1.5 rounded-xl bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] font-bold text-center cursor-pointer"
            >
              50 / 50
            </button>
          </div>

          {/* Manual Milestone Editor Cards */}
          <div className="space-y-2 pt-1 max-h-[220px] overflow-y-auto pr-1">
            {terms.map((term, idx) => {
              const calculatedAmount = Math.round((grandTotal * (Number(term.percentage) || 0)) / 100);
              return (
                <div
                  key={idx}
                  className="p-2.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl space-y-1.5 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-mono font-bold text-zinc-500">#{idx + 1}</span>
                      <div className="flex items-center space-x-1">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={term.percentage}
                          onChange={(e) => handleTermChange(idx, "percentage", e.target.value)}
                          className="w-12 px-1.5 py-0.5 bg-white border border-[#E4E4E7] rounded font-mono font-extrabold text-xs text-center text-[#2563EB]"
                        />
                        <span className="font-mono font-bold text-zinc-600">%</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] font-bold text-zinc-700">
                        {currSymbol} {calculatedAmount.toLocaleString()}
                      </span>
                      {terms.length > 1 && (
                        <button
                          onClick={() => handleRemoveTerm(idx)}
                          className="text-zinc-400 hover:text-red-600 p-0.5 cursor-pointer transition-colors"
                          title="Eliminar hito"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={term.description}
                    onChange={(e) => handleTermChange(idx, "description", e.target.value)}
                    placeholder="Descripción del hito..."
                    className="w-full px-2 py-1 bg-white border border-[#E4E4E7] rounded text-[11px] text-zinc-800"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
