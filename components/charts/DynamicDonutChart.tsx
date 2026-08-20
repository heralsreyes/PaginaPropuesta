"use client";

import React, { memo } from "react";

export interface PortfolioAllocation {
  name?: string;
  label?: string;
  percent: number;
  color: string;
  amount?: number;
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
}) => {
  let accumulatedPercent = 0;
  const displayYield = formattedYield || (totalYield ? `${totalYield.toFixed(2)}%` : "10.15%");

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#002D30" strokeWidth="12" fill="none" />
        {allocations.map((item, idx) => {
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
            />
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
  );
};

export const DynamicDonutChart = memo(DynamicDonutChartBase);
