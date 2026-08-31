"use client";

import React, { useState } from "react";
import { useProposal } from "@/context/ProposalContext";
import { DollarSign, Percent, Receipt, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const SidebarBudgetTab: React.FC = () => {
  const { proposal, updateBudget } = useProposal();
  const budget = proposal?.budget;

  const [baseSubtotal, setBaseSubtotal] = useState(budget?.amountWithoutTax || 3850);
  const [currency, setCurrency] = useState<"USD" | "DOP">(budget?.currency || "USD");
  const [hasTax, setHasTax] = useState(budget?.hasTax ?? true);
  const [taxPercent, setTaxPercent] = useState(budget?.taxPercent || 18);
  const [hasDiscount, setHasDiscount] = useState(budget?.hasDiscount ?? false);
  const [discountValue, setDiscountValue] = useState(budget?.discountValue || 0);

  const discountAmount = hasDiscount ? discountValue : 0;
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

  const handleDiscountToggle = () => {
    const nextDiscount = !hasDiscount;
    setHasDiscount(nextDiscount);
    updateBudget({ hasDiscount: nextDiscount });
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

  const handleApplyMilestonePreset = (split: [number, number, number]) => {
    const terms = [
      {
        percentage: split[0],
        description: `Anticipo Inicial de Firma (${split[0]}%)`,
        amount: (grandTotal * split[0]) / 100,
      },
      {
        percentage: split[1],
        description: `Hito de Desarrollo & Entrega Piloto (${split[1]}%)`,
        amount: (grandTotal * split[1]) / 100,
      },
      {
        percentage: split[2],
        description: `Cierre, Capacitación & Puesta en Producción (${split[2]}%)`,
        amount: (grandTotal * split[2]) / 100,
      },
    ];
    updateBudget({ paymentTerms: terms as any });
    toast.success(`Hitos de pago actualizados a esquema ${split[0]}/${split[1]}/${split[2]}`);
  };

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
              <span>Descuento:</span>
              <span className="font-mono font-bold">- {currSymbol} {discountAmount.toLocaleString()}</span>
            </div>
          )}

          {hasTax && (
            <div className="flex justify-between text-zinc-300">
              <span>ITBIS ({taxPercent}%):</span>
              <span className="font-mono font-bold">+ {currSymbol} {taxAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="pt-2 border-t border-white/20 flex justify-between items-center text-sm font-black text-white">
            <span>TOTAL ESTIMADO:</span>
            <span className="text-[#F08D17] font-mono text-base">{currSymbol} {grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
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

        <div className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl">
          <div>
            <span className="font-bold text-[#111111] block">Aplicar Impuesto / ITBIS</span>
            <span className="text-[10px] text-zinc-500 font-mono">Tasa estándar {taxPercent}%</span>
          </div>
          <input
            type="checkbox"
            checked={hasTax}
            onChange={handleTaxToggle}
            className="w-4 h-4 rounded border-zinc-300 text-[#2563EB] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl">
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
          <div>
            <label className="block text-zinc-700 font-semibold mb-1">Monto del Descuento ({currSymbol})</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => {
                const val = Number(e.target.value);
                setDiscountValue(val);
                updateBudget({ discountValue: val });
              }}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl font-mono font-bold text-[#111111]"
            />
          </div>
        )}

        {/* Milestone Split Presets */}
        <div className="pt-2 border-t border-[#E4E4E7] space-y-2">
          <label className="block text-zinc-700 font-semibold text-[11px]">
            Esquemas de Hitos de Pago (Milestones)
          </label>
          <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
            <button
              onClick={() => handleApplyMilestonePreset([30, 40, 30])}
              className="p-2 rounded-xl bg-white border border-[#E4E4E7] hover:border-[#2563EB] font-bold text-center cursor-pointer shadow-2xs"
            >
              30 / 40 / 30
            </button>
            <button
              onClick={() => handleApplyMilestonePreset([50, 25, 25])}
              className="p-2 rounded-xl bg-white border border-[#E4E4E7] hover:border-[#2563EB] font-bold text-center cursor-pointer shadow-2xs"
            >
              50 / 25 / 25
            </button>
            <button
              onClick={() => handleApplyMilestonePreset([40, 30, 30])}
              className="p-2 rounded-xl bg-white border border-[#E4E4E7] hover:border-[#2563EB] font-bold text-center cursor-pointer shadow-2xs"
            >
              40 / 30 / 30
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
