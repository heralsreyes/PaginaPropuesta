import { DEFAULT_DOP_RATE } from "./constants";

export interface AllocationItem {
  label: string;
  percent: number;
  color: string;
  valUsd: number;
}

/**
 * Formats USD or DOP values based on currency mode
 */
export const formatAppCurrency = (
  usdVal: number,
  currencyMode: "USD" | "DOP",
  dopRate: number = DEFAULT_DOP_RATE
): string => {
  if (currencyMode === "DOP") {
    return `RD$ ${Math.round(usdVal * dopRate).toLocaleString()}`;
  }
  return `$${Math.round(usdVal).toLocaleString()} USD`;
};

/**
 * Calculates investment yields based on amount, rate, term and compound setting
 */
export const calculateYield = (
  calcAmount: number,
  customRatePercent: number,
  calcTermDays: number,
  calcCompound: boolean
) => {
  const currentRate = customRatePercent / 100;
  const compoundMultiplier = calcCompound
    ? Math.pow(1 + currentRate, calcTermDays / 360)
    : 1 + currentRate * (calcTermDays / 360);
  const calculatedTotal = calcAmount * compoundMultiplier;
  const calculatedYield = calculatedTotal - calcAmount;

  return {
    currentRate,
    calculatedTotal,
    calculatedYield,
  };
};

/**
 * Generates portfolio allocation breakdown based on mutuo weight
 */
export const calculatePortfolioAllocations = (
  calcAmount: number,
  mutuoWeightPercent: number
): AllocationItem[] => {
  const mutuoPct = mutuoWeightPercent;
  const remainingPct = 100 - mutuoPct;
  const inmoPct = Math.round(remainingPct * 0.55);
  const esafiPct = Math.round(remainingPct * 0.25);
  const rfPct = 100 - (mutuoPct + inmoPct + esafiPct);

  return [
    {
      label: "Mutuos Estructurados",
      percent: mutuoPct,
      color: "#F08D17",
      valUsd: calcAmount * (mutuoPct / 100),
    },
    {
      label: "Fondos Inmobiliarios I/II",
      percent: inmoPct,
      color: "#38BDF8",
      valUsd: calcAmount * (inmoPct / 100),
    },
    {
      label: "Fondos Abiertos ESAFI",
      percent: esafiPct,
      color: "#34D399",
      valUsd: calcAmount * (esafiPct / 100),
    },
    {
      label: "Renta Fija / Sell-Backs",
      percent: rfPct,
      color: "#F59E0B",
      valUsd: calcAmount * (rfPct / 100),
    },
  ];
};
