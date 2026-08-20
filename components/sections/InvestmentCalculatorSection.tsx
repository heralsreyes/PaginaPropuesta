"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, PieChart, Download, Clock } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { calculateYield, calculatePortfolioAllocations } from "@/lib/financial";
import { DynamicDonutChart } from "@/components/charts/DynamicDonutChart";

interface InvestmentCalculatorSectionProps {
  secId: string;
}

const sectionContainerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const InvestmentCalculatorSection: React.FC<InvestmentCalculatorSectionProps> = ({ secId }) => {
  const [calcAmount, setCalcAmount] = useState<number>(50000);
  const [calcTermDays, setCalcTermDays] = useState<number>(180);
  const [customRatePercent, setCustomRatePercent] = useState<number>(9.5);
  const [calcCompound, setCalcCompound] = useState<boolean>(false);
  const [mutuoWeightPercent, setMutuoWeightPercent] = useState<number>(50);

  const { currentRate, calculatedTotal, calculatedYield } = calculateYield(
    calcAmount,
    customRatePercent,
    calcTermDays,
    calcCompound
  );

  const pieAllocations = calculatePortfolioAllocations(calcAmount, mutuoWeightPercent);

  const mutuoPct = mutuoWeightPercent;
  const remainingPct = 100 - mutuoPct;
  const inmoPct = Math.round(remainingPct * 0.55);
  const esafiPct = Math.round(remainingPct * 0.25);
  const rfPct = 100 - (mutuoPct + inmoPct + esafiPct);

  const exportExcelCsv = () => {
    const csvRows = [
      ["HOJA DE SIMULACION FINANCIERA - EXCEL PUESTO DE BOLSA & ESAFI"],
      ["Codigo Propuesta", "ENF-PROP-2026-EXCEL"],
      ["Monto Inversión Base (USD)", calcAmount],
      ["Plazo en Días", calcTermDays],
      ["Tasa Anual Aplicada", `${(currentRate * 100).toFixed(2)}%`],
      ["Interés Ganado Estimado (USD)", calculatedYield.toFixed(2)],
      ["Monto Total al Vencimiento (USD)", calculatedTotal.toFixed(2)],
      [],
      ["FILA", "COL_A_PRODUCTO", "COL_B_ASIGNACION", "COL_C_TASA_PA", "COL_D_INTERES_USD", "COL_E_TOTAL_NETO_USD"],
      [
        "1",
        "Mutuo Estructurado Excel",
        `${mutuoPct}%`,
        `${(currentRate * 100).toFixed(2)}%`,
        (calculatedYield * (mutuoPct / 100)).toFixed(2),
        (calcAmount * (mutuoPct / 100) + calculatedYield * (mutuoPct / 100)).toFixed(2),
      ],
      [
        "2",
        "Fondo Inmobiliario Excel II",
        `${inmoPct}%`,
        "8.50%",
        (calculatedYield * (inmoPct / 100)).toFixed(2),
        (calcAmount * (inmoPct / 100) + calculatedYield * (inmoPct / 100)).toFixed(2),
      ],
      [
        "3",
        "Fondo Abierto Liquidez ESAFI",
        `${esafiPct}%`,
        "7.50%",
        (calculatedYield * (esafiPct / 100)).toFixed(2),
        (calcAmount * (esafiPct / 100) + calculatedYield * (esafiPct / 100)).toFixed(2),
      ],
      [
        "4",
        "Renta Fija & Sell-Backs",
        `${rfPct}%`,
        "9.00%",
        (calculatedYield * (rfPct / 100)).toFixed(2),
        (calcAmount * (rfPct / 100) + calculatedYield * (rfPct / 100)).toFixed(2),
      ],
      [
        "TOTAL",
        "CONSOLIDADO TOTAL",
        "100%",
        `${(currentRate * 100).toFixed(2)}%`,
        calculatedYield.toFixed(2),
        calculatedTotal.toFixed(2),
      ],
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Simulacion_Excel_ENFOCO_${calcAmount}USD.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#004F54]/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10"
      >
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec5_badge" defaultText="05. SIMULADOR INTERACTIVO & EXCEL FINANCIAL DASHBOARD" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            <EditableField id="sec5_h2" defaultText="Calculadora de Rendimiento & Dashboard Estilo Excel" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 max-w-3xl mx-auto font-medium">
            <EditableField
              id="sec5_desc"
              defaultText="Ajusta cualquiera de los 4 deslizadores para mover el gráfico pastel y la hoja de cálculo en tiempo real."
            />
          </p>
        </div>

        {/* TOP MULTI-BAR PARAMETER CONTROL SUITE */}
        <div className="p-8 rounded-3xl bg-[#002224]/95 backdrop-blur-xl shadow-2xl border border-white/15 text-white space-y-6">
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-6 h-6 text-[#F08D17]" />
              <h3 className="font-extrabold text-base sm:text-lg text-white font-mono uppercase">
                SUITE DE BARRAS DESLIZANTES & CONTROL DINÁMICO DE VALORES
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-300">Modo Interés:</span>
              <button
                onClick={() => setCalcCompound(!calcCompound)}
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  calcCompound ? "bg-[#F08D17] text-white shadow-md" : "bg-white/10 text-white border border-white/20"
                }`}
              >
                {calcCompound ? "⚡ Compuesto (Re-inversión)" : "Simple (Retiro Mensual)"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Slider 1: Capital Inicial */}
            <div className="space-y-2 bg-[#001618]/90 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs sm:text-sm font-extrabold">
                <span className="text-slate-200">1. Capital Inicial:</span>
                <span className="font-mono text-emerald-300 text-base">${calcAmount.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full accent-[#F08D17] cursor-pointer h-2.5"
              />
              <span className="text-[10px] text-slate-400 font-mono block">$10k a $1,000,000 USD</span>
            </div>

            {/* Slider 2: Tasa Anual Retorno */}
            <div className="space-y-2 bg-[#001618]/90 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs sm:text-sm font-extrabold">
                <span className="text-slate-200">2. Tasa Anual:</span>
                <span className="font-mono text-[#F08D17] text-base">{customRatePercent.toFixed(1)}% p.a.</span>
              </div>
              <input
                type="range"
                min="7.5"
                max="16.0"
                step="0.5"
                value={customRatePercent}
                onChange={(e) => setCustomRatePercent(Number(e.target.value))}
                className="w-full accent-[#F08D17] cursor-pointer h-2.5"
              />
              <span className="text-[10px] text-slate-400 font-mono block">Rango: 7.5% a 16.0% p.a.</span>
            </div>

            {/* Slider 3: Asignación Mutuos */}
            <div className="space-y-2 bg-[#001618]/90 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs sm:text-sm font-extrabold">
                <span className="text-slate-200">3. % Mutuos:</span>
                <span className="font-mono text-[#F08D17] text-base">{mutuoWeightPercent}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={mutuoWeightPercent}
                onChange={(e) => setMutuoWeightPercent(Number(e.target.value))}
                className="w-full accent-[#F08D17] cursor-pointer h-2.5"
              />
              <span className="text-[10px] text-emerald-300 font-mono font-bold block">¡Mueve el Gráfico Pastel!</span>
            </div>

            {/* Slider 4: Plazo en Días */}
            <div className="space-y-2 bg-[#001618]/90 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs sm:text-sm font-extrabold">
                <span className="text-slate-200">4. Plazo Duración:</span>
                <span className="font-mono text-emerald-300 text-base">{calcTermDays} Días</span>
              </div>
              <div className="grid grid-cols-4 gap-1 pt-1">
                {[90, 180, 360, 720].map((d) => (
                  <button
                    key={d}
                    onClick={() => setCalcTermDays(d)}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                      calcTermDays === d ? "bg-[#F08D17] text-white shadow-md" : "bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    {d === 720 ? "2 Años" : `${d}d`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DUAL INTERACTIVE PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#002224]/95 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 text-center text-white">
            <div className="flex items-center justify-between border-b border-white/15 pb-3 text-left">
              <div>
                <h3 className="font-extrabold text-base text-white">Distribución Portafolio</h3>
                <span className="text-xs text-slate-300 font-mono">Gráfico Pastel Animado</span>
              </div>
              <PieChart className="w-5 h-5 text-[#F08D17]" />
            </div>

            <DynamicDonutChart allocations={pieAllocations} totalUsd={calcAmount} totalYield={calculatedYield} />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#002224]/95 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F08D17] text-white flex items-center justify-center font-mono font-bold text-xs shadow-md">
                  XLS
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white font-mono">Simulación_Inversión_Excel.xlsx</h3>
                  <span className="text-xs text-slate-300">Hoja de Cálculo Viva con Fórmulas</span>
                </div>
              </div>

              <button
                onClick={exportExcelCsv}
                className="px-4 py-2 bg-[#F08D17] hover:bg-[#d87c0f] text-white text-xs font-bold font-mono rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Exportar Excel (.CSV)</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-white/15 rounded-xl font-mono text-xs shadow-sm">
              <table className="w-full text-left divide-y divide-white/10">
                <thead className="bg-[#001416] text-slate-200 font-bold border-b border-white/15">
                  <tr>
                    <th className="p-2.5 border-r border-white/10 text-center w-8 text-slate-400">#</th>
                    <th className="p-2.5 border-r border-white/10">A · PRODUCTO</th>
                    <th className="p-2.5 border-r border-white/10 text-right">B · ASIGNACIÓN</th>
                    <th className="p-2.5 border-r border-white/10 text-right">C · TASA</th>
                    <th className="p-2.5 border-r border-white/10 text-right">D · INTERÉS (USD)</th>
                    <th className="p-2.5 text-right">E · MONTO FINAL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-[#001718]/90 text-white">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-2.5 border-r border-white/10 text-center bg-[#001214] font-bold text-slate-400">1</td>
                    <td className="p-2.5 border-r border-white/10 font-bold text-white">Mutuo Estructurado Excel</td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#F08D17] font-bold">
                      {mutuoPct}% (${Math.round(calcAmount * (mutuoPct / 100)).toLocaleString()})
                    </td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#F08D17] font-bold">
                      {(currentRate * 100).toFixed(1)}%
                    </td>
                    <td className="p-2.5 border-r border-white/10 text-right font-bold text-[#F08D17]">
                      ${(calculatedYield * (mutuoPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-2.5 text-right font-extrabold text-white">
                      ${(calcAmount * (mutuoPct / 100) + calculatedYield * (mutuoPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-2.5 border-r border-white/10 text-center bg-[#001214] font-bold text-slate-400">2</td>
                    <td className="p-2.5 border-r border-white/10 font-bold text-white">Fondo Inmobiliario Excel II</td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#38BDF8] font-bold">
                      {inmoPct}% (${Math.round(calcAmount * (inmoPct / 100)).toLocaleString()})
                    </td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#38BDF8] font-bold">8.5%</td>
                    <td className="p-2.5 border-r border-white/10 text-right font-bold text-[#38BDF8]">
                      ${(calculatedYield * (inmoPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-2.5 text-right font-extrabold text-white">
                      ${(calcAmount * (inmoPct / 100) + calculatedYield * (inmoPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-2.5 border-r border-white/10 text-center bg-[#001214] font-bold text-slate-400">3</td>
                    <td className="p-2.5 border-r border-white/10 font-bold text-white">Fondo Abierto Liquidez ESAFI</td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#34D399] font-bold">
                      {esafiPct}% (${Math.round(calcAmount * (esafiPct / 100)).toLocaleString()})
                    </td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#34D399] font-bold">7.5%</td>
                    <td className="p-2.5 border-r border-white/10 text-right font-bold text-[#34D399]">
                      ${(calculatedYield * (esafiPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-2.5 text-right font-extrabold text-white">
                      ${(calcAmount * (esafiPct / 100) + calculatedYield * (esafiPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-2.5 border-r border-white/10 text-center bg-[#001214] font-bold text-slate-400">4</td>
                    <td className="p-2.5 border-r border-white/10 font-bold text-white">Renta Fija & Sell-Backs</td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#F59E0B] font-bold">
                      {rfPct}% (${Math.round(calcAmount * (rfPct / 100)).toLocaleString()})
                    </td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#F59E0B] font-bold">9.0%</td>
                    <td className="p-2.5 border-r border-white/10 text-right font-bold text-[#F59E0B]">
                      ${(calculatedYield * (rfPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-2.5 text-right font-extrabold text-white">
                      ${(calcAmount * (rfPct / 100) + calculatedYield * (rfPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                  <tr className="bg-[#001214] font-bold border-t-2 border-[#F08D17]">
                    <td className="p-2.5 border-r border-white/10 text-center bg-[#F08D17] text-white font-black">∑</td>
                    <td className="p-2.5 border-r border-white/10 text-[#F08D17] uppercase">TOTALES CONSOLIDADOS</td>
                    <td className="p-2.5 border-r border-white/10 text-right text-white font-mono">
                      100% (${calcAmount.toLocaleString()})
                    </td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#F08D17] font-mono">
                      {(currentRate * 100).toFixed(1)}% p.a.
                    </td>
                    <td className="p-2.5 border-r border-white/10 text-right text-[#F08D17] font-black">
                      ${calculatedYield.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td className="p-2.5 text-right text-emerald-300 font-black">
                      ${calculatedTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-[#001618] border border-[#F08D17]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#F08D17] shrink-0" />
                <span className="text-xs sm:text-sm text-slate-100 font-bold">
                  Alerta Vencimiento 15 Días: Notificación automática con opción de re-pago a Tasa del {(currentRate * 100).toFixed(1)}%.
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-white bg-[#F08D17] px-2.5 py-1 rounded-lg shrink-0 shadow-md">
                ACTIVO 24/7
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
