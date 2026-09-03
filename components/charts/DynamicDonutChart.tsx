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
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  let accumulatedPercent = 0;
  const displayYield = formattedYield || (totalYield ? `${totalYield.toFixed(2)}%` : "10.15%");

  const activeHoverItem = hoveredIdx !== null ? allocations[hoveredIdx] : null;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full">
      {/* SVG Donut Chart with Center Text & Interactive Hover Lift */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#002D30" strokeWidth="12" fill="none" />
          {allocations.map((item, idx) => {
            const categoryName = item.label || item.name || `Categoría ${idx + 1}`;
            const strokeDasharray = `${item.percent * 2.51327} 251.327`;
            const strokeDashoffset = -accumulatedPercent * 2.51327;
            accumulatedPercent += item.percent;

            const isHovered = hoveredIdx === idx;

            return (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r="40"
                stroke={item.color}
                strokeWidth={isHovered ? 16 : 12}
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transformOrigin: "50px 50px",
                  transform: isHovered ? "scale(1.06)" : "scale(1)",
                  filter: isHovered ? `drop-shadow(0px 0px 10px ${item.color})` : "none",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                className="cursor-pointer select-none"
              >
                <title>{`${categoryName}: ${item.percent}% ${item.valUsd || item.amount ? `($${Math.round(item.valUsd || item.amount || 0).toLocaleString()} USD)` : ""}`}</title>
              </circle>
            );
          })}
        </svg>

        {/* Center Text Readout: Switches dynamically on slice hover! */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4 transition-all duration-300">
          {activeHoverItem ? (
            <div className="space-y-0.5 animate-fadeIn">
              <span className="text-[10px] sm:text-xs text-slate-300 font-mono uppercase tracking-wider font-extrabold truncate max-w-[130px] block">
                {activeHoverItem.label || activeHoverItem.name}
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono block" style={{ color: activeHoverItem.color }}>
                {activeHoverItem.percent}%
              </span>
              {(activeHoverItem.valUsd || activeHoverItem.amount || totalUsd) && (
                <span className="text-[10px] text-emerald-300 font-mono font-bold block">
                  ${Math.round(activeHoverItem.valUsd || activeHoverItem.amount || (totalUsd ? totalUsd * (activeHoverItem.percent / 100) : 0)).toLocaleString()} USD
                </span>
              )}
            </div>
          ) : (
            <>
              <span className="text-[10px] sm:text-xs text-slate-300 font-mono uppercase tracking-wider font-bold">
                RENDIMIENTO
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#F08D17] font-mono">{displayYield}</span>
              <span className="text-[9px] text-emerald-300 font-mono font-bold">ESTIMADO ANUAL</span>
            </>
          )}
        </div>
      </div>

      {/* Category Legend & Breakdown Box (A qué pertenece cada categoría) */}
      <div className="w-full space-y-2 pt-3 border-t border-white/10">
        <div className="text-xs font-mono font-medium tracking-wider text-white/50 uppercase text-left px-1 mb-1 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F08D17]" />
            <span className="text-[#F08D17] font-bold">Desglose por Categoría:</span>
          </span>
          <span className="text-[10px] text-white/40 font-normal">Pasa el cursor sobre el gráfico</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
          {allocations.map((item, idx) => {
            const categoryName = item.label || item.name || `Categoría ${idx + 1}`;
            const dollarVal = item.valUsd || item.amount || (totalUsd ? totalUsd * (item.percent / 100) : 0);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-xs font-mono cursor-pointer select-none ${
                  isHovered
                    ? "bg-white/[0.08] backdrop-blur-md border-[#F08D17]/50 shadow-lg scale-[1.02] ring-1 ring-[#F08D17]/25 text-white"
                    : "bg-white/[0.02] hover:bg-white/[0.05] border-white/10 hover:border-white/20 text-white/80"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 transition-transform ${isHovered ? "scale-125 shadow-md" : ""}`}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={`font-medium truncate ${isHovered ? "text-white font-bold" : "text-white/80"}`}>
                    {categoryName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="font-bold text-[#F08D17]">{item.percent}%</span>
                  {dollarVal > 0 && (
                    <span className="text-white/40 text-[10px]">
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
