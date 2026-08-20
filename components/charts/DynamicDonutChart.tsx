"use client";

import React, { memo } from "react";

export interface PortfolioAllocation {
  name?: string;
  label?: string;
  percent: number;
  color: string;
  amount?: number;
  valUsd?: number;
}

interface DynamicDonutChartProps {
  allocations: PortfolioAllocation[];
  formattedYield?: string;
  totalUsd?: number;
  totalYield?: number;
}

const DynamicDonutChartBase: React.FC<DynamicDonutChartProps> = ({
  allocations,
  formattedYield,
  totalYield,
  totalUsd,
}) => {
  let accumulatedPercent = 0;
  const displayYield = formattedYield || (totalYield ? `${totalYield.toFixed(2)}%` : "10.15%");

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full">
      {/* SVG Donut Chart with Center Text */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#002D30" strokeWidth="12" fill="none" />
          {allocations.map((item, idx) => {
            const categoryName = item.label || item.name || `Categoría ${idx + 1}`;
            const strokeDasharray = `${item.percent * 2.51327} 251.327`;
            const strokeDashoffset = -accumulatedPercent * 2.51327;
            accumulatedPercent += item.percent;

            return (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r="40"
                stroke={item.color}
                strokeWidth="12"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-700 ease-out hover:opacity-80 cursor-pointer"
              >
                <title>{`${categoryName}: ${item.percent}% ${item.valUsd || item.amount ? `($${Math.round(item.valUsd || item.amount || 0).toLocaleString()} USD)` : ""}`}</title>
              </circle>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[10px] sm:text-xs text-slate-300 font-mono uppercase tracking-wider font-bold">
            RENDIMIENTO
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#F08D17] font-mono">{displayYield}</span>
          <span className="text-[9px] text-emerald-300 font-mono font-bold">ESTIMADO ANUAL</span>
        </div>
      </div>

      {/* Category Legend & Breakdown Box (A qué pertenece cada categoría) */}
      <div className="w-full space-y-2 pt-3 border-t border-white/15">
        <div className="text-xs font-mono font-extrabold text-[#F08D17] uppercase tracking-wider text-left px-1 mb-1">
          Desglose por Categoría:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
          {allocations.map((item, idx) => {
            const categoryName = item.label || item.name || `Categoría ${idx + 1}`;
            const dollarVal = item.valUsd || item.amount || (totalUsd ? totalUsd * (item.percent / 100) : 0);

            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#001416] border border-white/10 hover:border-white/30 transition-all text-xs font-mono"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-100 font-bold truncate">{categoryName}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="font-black text-[#F08D17]">{item.percent}%</span>
                  {dollarVal > 0 && (
                    <span className="text-slate-400 text-[10px]">
                      (${Math.round(dollarVal).toLocaleString()})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const DynamicDonutChart = memo(DynamicDonutChartBase);
