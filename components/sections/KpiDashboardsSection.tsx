"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  Radio,
  Users,
  Clock,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Activity,
} from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";

interface KpiDashboardsSectionProps {
  secId: string;
}

const sectionContainerVariants = {
  hidden: { opacity: 1, y: 0 },
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

export const KpiDashboardsSection: React.FC<KpiDashboardsSectionProps> = ({ secId }) => {
  const [kpiPeriodTab, setKpiPeriodTab] = useState<"hoy" | "7d" | "mes" | "ano">("mes");
  const [selectedKpiCard, setSelectedKpiCard] = useState<number>(3);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(5);
  const [isLiveFeedActive, setIsLiveFeedActive] = useState<boolean>(true);

  const getKpiMetrics = () => {
    switch (kpiPeriodTab) {
      case "hoy":
        return {
          users: "1,420",
          usersTrend: "+14.2% hoy",
          usersSub: "582 activos en app móvil",
          responseTime: "< 8 min",
          responseTrend: "↓ 75% vs manual",
          responseSub: "SLA SIMV: 100% en verde",
          productiv: "+38.5%",
          productivTrend: "↑ 42 horas/semana",
          productivSub: "Oportunidades auto-creadas CRM",
          simvAudit: "100%",
          simvAuditTrend: "Bitácora activa 24/7",
          simvAuditSub: "Cumplimiento ISO 27002",
        };
      case "7d":
        return {
          users: "4,890",
          usersTrend: "+22.8% esta semana",
          usersSub: "2,140 accesos biométricos",
          responseTime: "< 11 min",
          responseTrend: "↓ 70% vs manual",
          responseSub: "1,240 Trade Tickets procesados",
          productiv: "+36.2%",
          productivTrend: "↑ 180 horas/semana",
          productivSub: "Trazabilidad completa EPB/ESAFI",
          simvAudit: "100%",
          simvAuditTrend: "0 hallazgos SIMV",
          simvAuditSub: "Logs inmutables AES-256",
        };
      case "ano":
        return {
          users: "145,000",
          usersTrend: "+45.0% acumulado 2026",
          usersSub: "Total accesos consolidados",
          responseTime: "< 12 min",
          responseTrend: "↓ 68% vs manual",
          responseSub: "Promedio anual sostenido",
          productiv: "+42.0%",
          productivTrend: "↑ 2,100 horas/año",
          productivSub: "Integración Dynamics 365 & SIFI",
          simvAudit: "100%",
          simvAuditTrend: "Certificación ISO 27002",
          simvAuditSub: "Auditoría de Sistemas SIMV",
        };
      case "mes":
      default:
        return {
          users: "18,250",
          usersTrend: "+18.4% este mes",
          usersSub: "8,920 accesos por App Móvil",
          responseTime: "< 15 min",
          responseTrend: "↓ 65% vs manual",
          responseSub: "3,480 Trade Tickets firmados",
          productiv: "+35.0%",
          productivTrend: "↑ 720 horas/mes",
          productivSub: "Productividad comercial liberada",
          simvAudit: "100%",
          simvAuditTrend: "Inspección SIMV lista",
          simvAuditSub: "Cifrado en reposo y tránsito",
        };
    }
  };

  const currentKpis = getKpiMetrics();

  const getDynamicChartData = () => {
    if (selectedKpiCard === 1) {
      if (kpiPeriodTab === "hoy") {
        return {
          title: "Usuarios Activos por Hora (Hoy)",
          subtitle: "Picos de tráfico en canal móvil & web",
          unit: "Usuarios",
          maxVal: 400,
          bars: [
            { label: "8 AM", val: 120, detail1: "120 Accesos", detail2: "92% App iOS/Android" },
            { label: "10 AM", val: 340, detail1: "340 Accesos", detail2: "Pico Máximo Mañana" },
            { label: "12 PM", val: 280, detail1: "280 Accesos", detail2: "Consultas Almuerzo" },
            { label: "2 PM", val: 390, detail1: "390 Accesos", detail2: "Trade Tickets Activos" },
            { label: "4 PM", val: 210, detail1: "210 Accesos", detail2: "Cierre Operacional" },
            { label: "6 PM", val: 80, detail1: "80 Accesos", detail2: "Autogestión Nocturna" },
          ],
        };
      }
      if (kpiPeriodTab === "7d") {
        return {
          title: "Usuarios Activos por Día (Última Semana)",
          subtitle: "Tráfico consolidado semanal",
          unit: "Usuarios",
          maxVal: 1600,
          bars: [
            { label: "Lun", val: 1120, detail1: "1,120 Usuarios", detail2: "890 Consultas 360°" },
            { label: "Mar", val: 1350, detail1: "1,350 Usuarios", detail2: "1,040 Consultas 360°" },
            { label: "Mié", val: 1420, detail1: "1,420 Usuarios", detail2: "1,150 Consultas 360°" },
            { label: "Jue", val: 1280, detail1: "1,280 Usuarios", detail2: "980 Consultas 360°" },
            { label: "Vie", val: 1490, detail1: "1,490 Usuarios", detail2: "Pico de Cierre Semanal" },
            { label: "Sáb", val: 420, detail1: "420 Usuarios", detail2: "Autogestión Fin de Semana" },
          ],
        };
      }
      return {
        title: "Usuarios Activos Mensuales (2026)",
        subtitle: "Adopción acumulada del canal digital",
        unit: "Usuarios",
        maxVal: 20000,
        bars: [
          { label: "Ene", val: 8200, detail1: "8,200 Usuarios", detail2: "Lanzamiento Fase 1" },
          { label: "Feb", val: 10400, detail1: "10,400 Usuarios", detail2: "Integración SIFI" },
          { label: "Mar", val: 12900, detail1: "12,900 Usuarios", detail2: "Habilitación Biometría" },
          { label: "Abr", val: 14800, detail1: "14,800 Usuarios", detail2: "Campañas Push CRM" },
          { label: "May", val: 16500, detail1: "16,500 Usuarios", detail2: "Migración Ejecutivos" },
          { label: "Jun", val: 18250, detail1: "18,250 Usuarios", detail2: "Récord Adopción 2026" },
        ],
      };
    }

    return {
      title: "Volumen Transaccional Invertido ($M USD)",
      subtitle: "Renta Fija, Mutuos, Fondos Inmobiliarios & ESAFI",
      unit: "$M USD",
      maxVal: 40,
      bars: [
        { label: "Ene", val: 12.4, detail1: "240 Trade Tickets", detail2: "580 PDF Descargados" },
        { label: "Feb", val: 15.8, detail1: "310 Trade Tickets", detail2: "640 PDF Descargados" },
        { label: "Mar", val: 19.2, detail1: "420 Trade Tickets", detail2: "790 PDF Descargados" },
        { label: "Abr", val: 24.5, detail1: "560 Trade Tickets", detail2: "920 PDF Descargados" },
        { label: "May", val: 31.0, detail1: "710 Trade Tickets", detail2: "1,150 PDF Descargados" },
        { label: "Jun", val: 38.4, detail1: "890 Trade Tickets", detail2: "1,420 PDF Descargados" },
      ],
    };
  };

  const getDynamicAuditLogs = () => {
    return [
      { time: "Hace 1m 24s", status: "🟢 APROBADO FACEID", title: "Renovación Mutuo USD $50,000", desc: "Trade Ticket #TT-2026-8841 enviado a Dynamics CRM", badgeColor: "bg-[#004F54]/20 text-[#38BDF8]" },
      { time: "Hace 4m 10s", status: "💼 OPORTUNIDAD CRM", title: "Creación Autocreada en Dynamics 365", desc: "Oportunidad vinculada al ejecutivo comercial asignado", badgeColor: "bg-[#F08D17]/20 text-[#F08D17]" },
      { time: "Hace 8m 45s", status: "⚡ CARGA SIFI FONDOS", title: "Aporte Fondo Abierto ESAFI $15,000 USD", desc: "Encargo #4092 procesado e integrado en SIFI", badgeColor: "bg-[#006B70]/20 text-[#34D399]" },
      { time: "Hace 15m 30s", status: "🤖 EXPEDIENTE IA", title: "Resumen IA Generado para Venta", desc: "Perfil e intención de reinversión analizados por IA", badgeColor: "bg-white/10 text-white" },
    ];
  };

  const currentChart = getDynamicChartData();
  const currentLogs = getDynamicAuditLogs();
  const safeMonthIdx = selectedMonthIdx < currentChart.bars.length ? selectedMonthIdx : currentChart.bars.length - 1;
  const currentSelectedBar = currentChart.bars[safeMonthIdx];

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
            <EditableField id="sec7_badge" defaultText="07. DASHBOARD DE CONTROL OPERATIVO & SIMV" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            <EditableField id="sec7_h2" defaultText="Supervisión Operativa & Métricas KPI en Tiempo Real" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 max-w-3xl mx-auto font-medium">
            <EditableField
              id="sec7_desc"
              defaultText="Toca cualquier tarjeta KPI o cambia el período para sincronizar automáticamente el gráfico y la bitácora en tiempo real."
            />
          </p>
        </div>

        {/* Time Period Filter Bar & Live Feed Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#003B3F]/90 backdrop-blur-md border border-white/15 shadow-lg text-white">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#F08D17]" />
            <span className="text-xs font-mono font-bold text-slate-200">Período de Análisis:</span>
            <div className="flex items-center gap-1.5 pl-2">
              {(["hoy", "7d", "mes", "ano"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setKpiPeriodTab(period);
                    setSelectedMonthIdx(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                    kpiPeriodTab === period
                      ? "bg-[#F08D17] text-white shadow-md"
                      : "bg-white/10 text-slate-200 border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {period === "hoy" ? "Hoy" : period === "7d" ? "7 Días" : period === "mes" ? "Este Mes" : "Año 2026"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiveFeedActive(!isLiveFeedActive)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isLiveFeedActive ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40" : "bg-white/10 text-slate-300 border border-white/20"
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isLiveFeedActive ? "text-emerald-300 animate-pulse" : "text-slate-400"}`} />
              <span>{isLiveFeedActive ? "● Monitoreo en Vivo (ACTIVO)" : "⏸ Pausado"}</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => {
              setSelectedKpiCard(1);
              setSelectedMonthIdx(0);
            }}
            className={`p-6 rounded-3xl transition-all cursor-pointer space-y-4 text-white ${
              selectedKpiCard === 1
                ? "bg-[#002B2E] border-2 border-[#F08D17] shadow-2xl ring-2 ring-[#F08D17]/30 scale-102"
                : "bg-[#003B3F]/90 border border-white/15 shadow-xl hover:border-white/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-[#F08D17] flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                {currentKpis.usersTrend}
              </span>
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold uppercase text-slate-300 block">KPI 01</span>
              <h4 className="text-sm font-extrabold text-white">Usuarios Activos 24/7</h4>
              <p className="text-3xl font-black text-white font-mono mt-1">{currentKpis.users}</p>
              <span className="text-xs text-emerald-300 font-mono font-bold block mt-1">{currentKpis.usersSub}</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#F08D17] h-full rounded-full w-[85%]" />
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedKpiCard(2);
              setSelectedMonthIdx(0);
            }}
            className={`p-6 rounded-3xl transition-all cursor-pointer space-y-4 text-white ${
              selectedKpiCard === 2
                ? "bg-[#002B2E] border-2 border-[#F08D17] shadow-2xl ring-2 ring-[#F08D17]/30 scale-102"
                : "bg-[#003B3F]/90 border border-white/15 shadow-xl hover:border-white/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-[#F08D17] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                {currentKpis.responseTrend}
              </span>
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold uppercase text-slate-300 block">KPI 02</span>
              <h4 className="text-sm font-extrabold text-white">Tiempo Promedio Respuesta</h4>
              <p className="text-3xl font-black text-emerald-300 font-mono mt-1">{currentKpis.responseTime}</p>
              <span className="text-xs text-emerald-300 font-mono font-bold block mt-1">{currentKpis.responseSub}</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full w-[94%]" />
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedKpiCard(3);
              setSelectedMonthIdx(0);
            }}
            className={`p-6 rounded-3xl transition-all cursor-pointer space-y-4 text-white ${
              selectedKpiCard === 3
                ? "bg-[#002B2E] border-2 border-[#F08D17] shadow-2xl ring-2 ring-[#F08D17]/30 scale-102"
                : "bg-[#003B3F]/90 border border-white/15 shadow-xl hover:border-white/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#F08D17]/20 text-[#F08D17] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#F08D17] bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                {currentKpis.productivTrend}
              </span>
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold uppercase text-slate-300 block">KPI 03</span>
              <h4 className="text-sm font-extrabold text-white">Productividad Comercial</h4>
              <p className="text-3xl font-black text-[#F08D17] font-mono mt-1">{currentKpis.productiv}</p>
              <span className="text-xs text-slate-300 font-mono font-bold block mt-1">{currentKpis.productivSub}</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#F08D17] h-full rounded-full w-[78%]" />
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedKpiCard(4);
              setSelectedMonthIdx(0);
            }}
            className={`p-6 rounded-3xl transition-all cursor-pointer space-y-4 text-white ${
              selectedKpiCard === 4
                ? "bg-[#002B2E] border-2 border-[#F08D17] shadow-2xl ring-2 ring-[#F08D17]/30 scale-102"
                : "bg-[#003B3F]/90 border border-white/15 shadow-xl hover:border-white/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                {currentKpis.simvAuditTrend}
              </span>
            </div>
            <div>
              <span className="text-xs font-mono font-extrabold uppercase text-slate-300 block">KPI 04</span>
              <h4 className="text-sm font-extrabold text-white">Auditoría & SIMV ISO 27002</h4>
              <p className="text-3xl font-black text-white font-mono mt-1">{currentKpis.simvAudit}</p>
              <span className="text-xs text-emerald-300 font-mono font-bold block mt-1">{currentKpis.simvAuditSub}</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* Dynamic Chart + Audit Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <h3 className="font-extrabold text-lg text-white">{currentChart.title}</h3>
                <span className="text-xs text-slate-300 font-mono">{currentChart.subtitle}</span>
              </div>
              <BarChart3 className="w-6 h-6 text-[#F08D17]" />
            </div>

            <div className="space-y-4">
              <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-white/15">
                {currentChart.bars.map((data, idx) => {
                  const isSelected = safeMonthIdx === idx;
                  const barHeightPercent = Math.min((data.val / currentChart.maxVal) * 100, 100);

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedMonthIdx(idx)}
                      className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end"
                    >
                      <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-[#F08D17]" : "text-slate-300"}`}>
                        {data.val} {currentChart.unit === "$M USD" ? "M" : ""}
                      </span>
                      <div
                        style={{ height: `${Math.max(barHeightPercent, 12)}%` }}
                        className={`w-full rounded-t-xl transition-all duration-300 ${
                          isSelected ? "bg-[#F08D17] shadow-lg scale-105" : "bg-white/20 hover:bg-white/40"
                        }`}
                      />
                      <span className={`text-xs font-bold font-mono ${isSelected ? "text-[#F08D17]" : "text-slate-300"}`}>
                        {data.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {currentSelectedBar && (
                <div className="p-4 rounded-2xl bg-[#002D30] border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white">
                  <div>
                    <span className="text-slate-400 font-bold block">ELEMENTO SELECCIONADO:</span>
                    <span className="text-sm font-extrabold text-[#F08D17]">{currentSelectedBar.label}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">MÉTRICA 1:</span>
                    <span className="text-sm font-extrabold text-emerald-300">{currentSelectedBar.detail1}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">MÉTRICA 2:</span>
                    <span className="text-sm font-extrabold text-white">{currentSelectedBar.detail2}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2.5">
                <Activity className="w-5 h-5 text-[#F08D17]" />
                <div>
                  <h3 className="font-extrabold text-base text-white">Bitácora de Eventos KPI 0{selectedKpiCard}</h3>
                  <span className="text-[10px] text-slate-300 font-mono">Filtro: {kpiPeriodTab.toUpperCase()}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/40">
                ● En Vivo
              </span>
            </div>

            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 text-xs">
              {currentLogs.map((log, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-[#002D30] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{log.time}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${log.badgeColor}`}>{log.status}</span>
                  </div>
                  <p className="font-bold text-white">{log.title}</p>
                  <span className="text-[10px] text-emerald-300 font-mono block">{log.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
