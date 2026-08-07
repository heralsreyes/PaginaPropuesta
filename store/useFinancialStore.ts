import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FinancialState {
  baseSubtotal: number;
  currency: "USD" | "DOP";
  hasTax: boolean;
  taxPercent: number;
  hasDiscount: boolean;
  discountValue: number;
  discountType: "fixed" | "percent";

  // Actions
  setBaseSubtotal: (val: number) => void;
  setCurrency: (currency: "USD" | "DOP") => void;
  setHasTax: (hasTax: boolean) => void;
  setTaxPercent: (taxPercent: number) => void;
  setHasDiscount: (hasDiscount: boolean) => void;
  setDiscountValue: (discountValue: number) => void;
  setDiscountType: (discountType: "fixed" | "percent") => void;
  toggleTax: () => void;
  toggleDiscount: () => void;
  updateFinancials: (updates: Partial<FinancialState>) => void;
  resetFinancials: () => void;
}

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set) => ({
      baseSubtotal: 12500,
      currency: "USD",
      hasTax: true,
      taxPercent: 18,
      hasDiscount: false,
      discountValue: 0,
      discountType: "fixed",

      setBaseSubtotal: (baseSubtotal) => set((state) => ({ ...state, baseSubtotal })),
      setCurrency: (currency) => set((state) => ({ ...state, currency })),
      setHasTax: (hasTax) => set((state) => ({ ...state, hasTax })),
      setTaxPercent: (taxPercent) => set((state) => ({ ...state, taxPercent })),
      setHasDiscount: (hasDiscount) => set((state) => ({ ...state, hasDiscount })),
      setDiscountValue: (discountValue) => set((state) => ({ ...state, discountValue })),
      setDiscountType: (discountType) => set((state) => ({ ...state, discountType })),
      toggleTax: () => set((state) => ({ ...state, hasTax: !state.hasTax })),
      toggleDiscount: () => set((state) => ({ ...state, hasDiscount: !state.hasDiscount })),
      updateFinancials: (updates) => set((state) => ({ ...state, ...updates })),
      resetFinancials: () =>
        set({
          baseSubtotal: 12500,
          currency: "USD",
          hasTax: true,
          taxPercent: 18,
          hasDiscount: false,
          discountValue: 0,
          discountType: "fixed",
        }),
    }),
    { name: "enfoco-financial-storage" }
  )
);
