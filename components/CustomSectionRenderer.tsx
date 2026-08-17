"use client";

import React, { useState } from "react";
import { PageSection, useStudioStore } from "@/store/useStudioStore";
import { ProposalData } from "@/data/proposalData";
import {
  MessageSquare,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  DollarSign,
  CheckCircle2,
  Users,
  Clock,
  Briefcase,
  Bot,
  FileText,
  Building2,
  ArrowRight,
  ChevronRight,
  PieChart,
  UserCheck,
  FileCode,
  Lock,
  Layers,
  Sliders,
  Database,
  Calendar,
  Check,
  ExternalLink,
  Activity,
  RefreshCw,
  SlidersHorizontal,
  Download,
  Table,
  Send,
  Key,
  BarChart3,
  Filter,
  CheckCircle,
  AlertCircle,
  Eye,
  Radio,
  Play,
  CheckSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CustomSectionRendererProps {
  section: PageSection;
  proposal: ProposalData;
  onOpenAcceptModal: () => void;
}

// Interactive Inline Editable Text Component for Studio Design Mode
const EditableField: React.FC<{
  id: string;
  defaultText: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}> = ({ id, defaultText, className = "", tag = "span" }) => {
  const { isDesignMode } = useStudioStore();
  const [text, setText] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`editable_${id}`);
      if (saved !== null) return saved;
    }
    return defaultText;
  });

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerText;
    if (newText !== undefined) {
      setText(newText);
      if (typeof window !== "undefined") {
        localStorage.setItem(`editable_${id}`, newText);
      }
    }
  };

  const Tag = tag;

  if (!isDesignMode) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} outline-none cursor-text hover:ring-2 hover:ring-[#004F54] hover:bg-[#004F54]/10 rounded px-1 -mx-1 relative transition-all`}
    >
      {text}
    </Tag>
  );
};

// Fluid Scroll Entrance Animation Variants with Spring & Blur Reveal
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

const sectionItemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Dynamic SVG Donut Chart Component with Smooth Animated Slices
const DynamicDonutChart: React.FC<{
  allocations: { label: string; percent: number; color: string; valUsd: number }[];
  totalUsd: number;
  totalYield: number;
}> = ({ allocations, totalUsd, totalYield }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="#E2E8F0"
            strokeWidth="24"
          />
          {allocations.map((item, idx) => {
            const strokeDasharray = `${(item.percent / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
            accumulatedPercent += item.percent;

            return (
              <circle
                key={idx}
                cx="90"
                cy="90"
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={hoveredIdx === idx ? "32" : "24"}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: "stroke-dasharray 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1), stroke-width 0.3s ease",
                }}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 pointer-events-none">
          <span className="text-[10px] font-mono font-bold uppercase text-[#64748B]">PORTAFOLIO EXCEL</span>
          <span className="text-xl font-black text-[#0F172A] font-mono">${totalUsd.toLocaleString()}</span>
          <span className="text-xs font-bold text-[#004F54] font-mono">+${Math.round(totalYield).toLocaleString()} Ganancia</span>
        </div>
      </div>

      {/* Interactive Legend Items */}
      <div className="grid grid-cols-2 gap-2 text-xs w-full">
        {allocations.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
              hoveredIdx === idx ? "bg-[#004F54]/10 border-[#004F54] shadow-md scale-105" : "bg-white border-[#E2E8F0]"
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
            <div className="overflow-hidden">
              <p className="font-bold text-[#0F172A] truncate">{item.label}</p>
              <span className="font-mono text-[#004F54] font-extrabold">{item.percent}% (${Math.round(item.valUsd).toLocaleString()})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CustomSectionRenderer: React.FC<CustomSectionRendererProps> = ({
  section,
  proposal,
  onOpenAcceptModal,
}) => {
  // State for Section 03 (7 Epics Explorer)
  const [activeEpicTab, setActiveEpicTab] = useState<number>(1);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>("e1_s1");
  const [storyPhaseFilter, setStoryPhaseFilter] = useState<"todos" | "fase1" | "fase2">("todos");

  // State for Section 04 (Interactive App Simulator)
  const [appSimTab, setAppSimTab] = useState<"portafolio" | "ticket" | "estados" | "asesor">("portafolio");
  const [isFaceIdScanning, setIsFaceIdScanning] = useState<boolean>(false);
  const [faceIdSigned, setFaceIdSigned] = useState<boolean>(false);
  const [pinDigits, setPinDigits] = useState<string>("");
  const [pdfUnlocked, setPdfUnlocked] = useState<boolean>(false);
  const [showPushAlert, setShowPushAlert] = useState<boolean>(true);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "asesor"; text: string }>>([
    { sender: "asesor", text: "Hola Sr. Pérez, soy María Fernández. ¿En qué le puedo asistir con sus inversiones de Excel hoy?" }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // State for Section 05 (Investment & Mutuos Yield Calculator)
  const [calcAmount, setCalcAmount] = useState<number>(120000);
  const [calcTermDays, setCalcTermDays] = useState<number>(180);
  const [calcCompound, setCalcCompound] = useState<boolean>(true);
  const [customRatePercent, setCustomRatePercent] = useState<number>(10.5);
  const [mutuoWeightPercent, setMutuoWeightPercent] = useState<number>(45);

  // State for Section 06 (Architecture CRM/SIFI view & Interactive Simulator)
  const [activeFlowTab, setActiveFlowTab] = useState<"epb" | "esafi">("epb");
  const [selectedFlowStep, setSelectedFlowStep] = useState<number>(1);
  const [isSimulatingTransmission, setIsSimulatingTransmission] = useState<boolean>(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState<boolean>(false);

  // State for Section 07 (Interactive Operating Dashboard & KPI Controls)
  const [kpiPeriodTab, setKpiPeriodTab] = useState<"hoy" | "7d" | "mes" | "ano">("mes");
  const [selectedKpiCard, setSelectedKpiCard] = useState<number>(3);
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(5);
  const [isLiveFeedActive, setIsLiveFeedActive] = useState<boolean>(true);

  const secId = section.id;
  const title = section.title || section.label;

  // Calculate dynamic allocation weights for the Donut Chart & Excel Table
  const mutuoPct = mutuoWeightPercent;
  const remainingPct = 100 - mutuoPct;
  const inmoPct = Math.round(remainingPct * 0.55);
  const esafiPct = Math.round(remainingPct * 0.25);
  const rfPct = 100 - (mutuoPct + inmoPct + esafiPct);

  // Helper rate calculation
  const currentRate = customRatePercent / 100;
  const compoundMultiplier = calcCompound ? Math.pow(1 + currentRate, calcTermDays / 360) : (1 + currentRate * (calcTermDays / 360));
  const calculatedTotal = calcAmount * compoundMultiplier;
  const calculatedYield = calculatedTotal - calcAmount;

  const pieAllocations = [
    { label: "Mutuos Estructurados", percent: mutuoPct, color: "#F08D17", valUsd: calcAmount * (mutuoPct / 100) },
    { label: "Fondos Inmobiliarios I/II", percent: inmoPct, color: "#004F54", valUsd: calcAmount * (inmoPct / 100) },
    { label: "Fondos Abiertos ESAFI", percent: esafiPct, color: "#3A8F93", valUsd: calcAmount * (esafiPct / 100) },
    { label: "Renta Fija / Sell-Backs", percent: rfPct, color: "#006B70", valUsd: calcAmount * (rfPct / 100) },
  ];

  // Helper for Section 06 Transmission Simulator
  const triggerTransmissionSimulation = () => {
    setIsSimulatingTransmission(true);
    setTransmissionSuccess(false);
    setSelectedFlowStep(1);

    setTimeout(() => setSelectedFlowStep(2), 600);
    setTimeout(() => setSelectedFlowStep(3), 1200);
    setTimeout(() => {
      setIsSimulatingTransmission(false);
      setTransmissionSuccess(true);
    }, 1800);
  };

  // Helper for FaceID scan trigger
  const triggerFaceIdScan = () => {
    setIsFaceIdScanning(true);
    setTimeout(() => {
      setIsFaceIdScanning(false);
      setFaceIdSigned(true);
    }, 1800);
  };

  // Helper for PIN digit press
  const handlePinKeyPress = (digit: string) => {
    if (pinDigits.length < 4) {
      const nextPin = pinDigits + digit;
      setPinDigits(nextPin);
      if (nextPin.length === 4) {
        setTimeout(() => {
          setPdfUnlocked(true);
        }, 300);
      }
    }
  };

  // Helper for WhatsApp Chat Message
  const sendChatMessage = (userMsg: string) => {
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Perfecto. He registrado su consulta en Dynamics 365 CRM. Le enviaré el documento adjunto de inmediato.";
      if (userMsg.includes("tasa")) {
        replyText = `Su tasa personalizada actual es del ${(currentRate * 100).toFixed(1)}% p.a. para Mutuos a ${calcTermDays} días.`;
      } else if (userMsg.includes("renovación")) {
        replyText = `Excelente. Su orden de renovación de USD $${calcAmount.toLocaleString()} ha sido pre-aprobada.`;
      }
      setChatMessages(prev => [...prev, { sender: "asesor", text: replyText }]);
    }, 1400);
  };

  // CSV Export Helper
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
      ["1", "Mutuo Estructurado Excel", `${mutuoPct}%`, `${(currentRate * 100).toFixed(2)}%`, (calculatedYield * (mutuoPct / 100)).toFixed(2), (calcAmount * (mutuoPct / 100) + calculatedYield * (mutuoPct / 100)).toFixed(2)],
      ["2", "Fondo Inmobiliario Excel II", `${inmoPct}%`, "8.50%", (calculatedYield * (inmoPct / 100)).toFixed(2), (calcAmount * (inmoPct / 100) + calculatedYield * (inmoPct / 100)).toFixed(2)],
      ["3", "Fondo Abierto Liquidez ESAFI", `${esafiPct}%`, "7.50%", (calculatedYield * (esafiPct / 100)).toFixed(2), (calcAmount * (esafiPct / 100) + calculatedYield * (esafiPct / 100)).toFixed(2)],
      ["4", "Renta Fija & Sell-Backs", `${rfPct}%`, "9.00%", (calculatedYield * (rfPct / 100)).toFixed(2), (calcAmount * (rfPct / 100) + calculatedYield * (rfPct / 100)).toFixed(2)],
      ["TOTAL", "CONSOLIDADO TOTAL", "100%", `${(currentRate * 100).toFixed(2)}%`, calculatedYield.toFixed(2), calculatedTotal.toFixed(2)]
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Simulacion_Excel_ENFOCO_${calcAmount}USD.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic KPI Data Multiplier based on selected period tab
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

  // Dynamic Chart Generator reacting to BOTH kpiPeriodTab AND selectedKpiCard!
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
          ]
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
          ]
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
        ]
      };
    }

    if (selectedKpiCard === 2) {
      return {
        title: "Tiempo Promedio de Respuesta (Minutos vs SLA SIMV)",
        subtitle: "Meta SLA Regulado: Menos de 30 minutos",
        unit: "Minutos",
        maxVal: 30,
        bars: [
          { label: "Ene", val: 24, detail1: "24.0 min promedio", detail2: "SLA Cumplido 92%" },
          { label: "Feb", val: 19, detail1: "19.0 min promedio", detail2: "SLA Cumplido 95%" },
          { label: "Mar", val: 16, detail1: "16.0 min promedio", detail2: "Optimizador OTP Activo" },
          { label: "Abr", val: 14, detail1: "14.0 min promedio", detail2: "Conector CRM Directo" },
          { label: "May", val: 11, detail1: "11.0 min promedio", detail2: "Expediente IA Activo" },
          { label: "Jun", val: 8, detail1: "8.0 min promedio", detail2: "Récord Eficiencia SIMV" },
        ]
      };
    }

    if (selectedKpiCard === 4) {
      return {
        title: "Peticiones Cifradas & Eventos Auditados ISO 27002",
        subtitle: "Cifrado TLS 1.3 & AES-256 en tránsito y reposo",
        unit: "Eventos",
        maxVal: 5000,
        bars: [
          { label: "Ene", val: 1800, detail1: "1,800 Peticiones", detail2: "100% Cifradas SHA-256" },
          { label: "Feb", val: 2400, detail1: "2,400 Peticiones", detail2: "0 Vulnerabilidades SIMV" },
          { label: "Mar", val: 3100, detail1: "3,100 Peticiones", detail2: "Auditoría Interna OK" },
          { label: "Abr", val: 3800, detail1: "3,800 Peticiones", detail2: "Cuestionario KYC Validado" },
          { label: "May", val: 4200, detail1: "4,200 Peticiones", detail2: "RBAC Permisos Correctos" },
          { label: "Jun", val: 4950, detail1: "4,950 Peticiones", detail2: "Inspección SIMV Lista" },
        ]
      };
    }

    // Default: KPI 3 (Productivity & Sales Volume)
    if (kpiPeriodTab === "hoy") {
      return {
        title: "Volumen Invertido Hoy por Hora ($M USD)",
        subtitle: "Renta Fija, Mutuos, Fondos Inmobiliarios & ESAFI",
        unit: "$M USD",
        maxVal: 10,
        bars: [
          { label: "8 AM", val: 1.2, detail1: "12 Trade Tickets", detail2: "45 PDF Descargados" },
          { label: "10 AM", val: 3.5, detail1: "38 Trade Tickets", detail2: "110 PDF Descargados" },
          { label: "12 PM", val: 2.8, detail1: "26 Trade Tickets", detail2: "85 PDF Descargados" },
          { label: "2 PM", val: 4.1, detail1: "42 Trade Tickets", detail2: "140 PDF Descargados" },
          { label: "4 PM", val: 2.3, detail1: "18 Trade Tickets", detail2: "60 PDF Descargados" },
          { label: "6 PM", val: 0.9, detail1: "8 Trade Tickets", detail2: "25 PDF Descargados" },
        ]
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
      ]
    };
  };

  // Dynamic Audit Feed Generator reacting to BOTH kpiPeriodTab AND selectedKpiCard!
  const getDynamicAuditLogs = () => {
    if (selectedKpiCard === 1) {
      return [
        { time: "Hace 35s", status: "🟢 LOGIN BIOMÉTRICO", title: "FaceID Autenticado Exitosamente", desc: "Cliente #4920 ingresó a la App Móvil iOS", badgeColor: "bg-emerald-100 text-emerald-800" },
        { time: "Hace 2m 10s", status: "📱 SESIÓN ACTIVA", title: "Consulta Portafolio Consolidado 360°", desc: "Titular Juan Pérez revisa saldo Mutuo y Fondos II", badgeColor: "bg-[#004F54]/10 text-[#004F54]" },
        { time: "Hace 5m 45s", status: "🔑 OTP ENVIADO", title: "Código de Seguridad SMS Transmitido", desc: "Autenticación de 2 factores requerida para login", badgeColor: "bg-slate-100 text-[#0F172A]" },
        { time: "Hace 9m 12s", status: "🟢 LOGIN BIOMÉTRICO", title: "TouchID Autenticado Exitosamente", desc: "Cliente cotitular #1042 ingresó desde Android", badgeColor: "bg-emerald-100 text-emerald-800" },
      ];
    }

    if (selectedKpiCard === 2) {
      return [
        { time: "Hace 1m 05s", status: "⚡ SLA RÁPIDO (<5m)", title: "Trade Ticket #TT-8841 Procesado", desc: "Tiempo de confirmación: 4.2 minutos (Meta SIMV: 30 min)", badgeColor: "bg-emerald-100 text-emerald-800" },
        { time: "Hace 3m 40s", status: "⏱ RESPUESTA CRM", title: "Notificación 15 Días Disparada", desc: "Cliente atendido por ejecutiva María Fernández", badgeColor: "bg-[#F08D17]/15 text-[#92400E]" },
        { time: "Hace 8m 20s", status: "⚡ SLA RÁPIDO (<5m)", title: "Solicitud Aporte ESAFI Verificada", desc: "Validación de horario y fondo realizada en 3.5 minutos", badgeColor: "bg-emerald-100 text-emerald-800" },
        { time: "Hace 14m 10s", status: "⏱ RESPUESTA CRM", title: "Desglose PDF Entregado al Titular", desc: "Visor de PDF cargado sin tiempo de espera", badgeColor: "bg-[#006B70]/10 text-[#006B70]" },
      ];
    }

    if (selectedKpiCard === 4) {
      return [
        { time: "Hace 50s", status: "🔒 CIFRADO AES-256", title: "Descarga Estado PDF Cifrado", desc: "Titular RNC 001-XXXX-X ingresó PIN correcto", badgeColor: "bg-emerald-100 text-emerald-800" },
        { time: "Hace 4m 15s", status: "📜 AUDITORÍA SIMV", title: "Firma Fehaciente Registrada en Bitácora", desc: "Hash SHA-256 inmutable registrado en base de datos", badgeColor: "bg-[#004F54]/10 text-[#004F54]" },
        { time: "Hace 7m 30s", status: "🛡 ISO 27002 OK", title: "Verificación de Roles y Permisos (RBAC)", desc: "Acceso denegado a usuario no autorizado", badgeColor: "bg-[#FFFBEB] text-[#92400E]" },
        { time: "Hace 12m 00s", status: "🔒 TLS 1.3 OK", title: "Cierre Sesión por Inactividad (15 min)", desc: "Expiración segura de token de sesión en app móvil", badgeColor: "bg-slate-100 text-[#0F172A]" },
      ];
    }

    // Default: KPI 3 (Productivity & Sales Volume)
    return [
      { time: "Hace 1m 24s", status: "🟢 APROBADO FACEID", title: "Renovación Mutuo USD $50,000", desc: "Trade Ticket #TT-2026-8841 enviado a Dynamics CRM", badgeColor: "bg-emerald-100 text-emerald-800" },
      { time: "Hace 4m 10s", status: "💼 OPORTUNIDAD CRM", title: "Creación Autocreada en Dynamics 365", desc: "Oportunidad vinculada al ejecutivo comercial asignado", badgeColor: "bg-[#F08D17]/15 text-[#92400E]" },
      { time: "Hace 8m 45s", status: "⚡ CARGA SIFI FONDOS", title: "Aporte Fondo Abierto ESAFI $15,000 USD", desc: "Encargo #4092 procesado e integrado en SIFI", badgeColor: "bg-[#006B70]/10 text-[#006B70]" },
      { time: "Hace 15m 30s", status: "🤖 EXPEDIENTE IA", title: "Resumen IA Generado para Venta", desc: "Perfil e intención de reinversión analizados por IA", badgeColor: "bg-[#004F54]/10 text-[#004F54]" },
    ];
  };

  const currentChart = getDynamicChartData();
  const currentLogs = getDynamicAuditLogs();
  const safeMonthIdx = selectedMonthIdx < currentChart.bars.length ? selectedMonthIdx : currentChart.bars.length - 1;
  const currentSelectedBar = currentChart.bars[safeMonthIdx];

  // --------------------------------------------------------------------------
  // SECTION 01: Presentación Ejecutiva
  // --------------------------------------------------------------------------
  if (secId === "sec-portada-excel" || title.includes("Presentación Ejecutiva")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-between items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 pt-24 pb-12 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#004F54]/5 blur-[180px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto text-center relative z-10 my-auto w-full flex flex-col items-center px-2 space-y-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/30 text-[#004F54] text-xs sm:text-sm font-bold font-mono tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-[#F08D17]" />
            <EditableField id="sec1_badge" defaultText="01. Presentación Ejecutiva · Excel Puesto de Bolsa & ESAFI" />
          </div>

          <div className="inline-flex items-center gap-4 py-2.5 px-6 rounded-full bg-white border border-[#E2E8F0] shadow-md text-sm font-bold tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black font-display text-[#0F172A]">
                ENFOCO<span className="text-[#004F54]">.</span>
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#004F54] text-white border border-[#004F54] font-extrabold shadow-sm">
                S.R.L.
              </span>
            </div>
            <span className="text-[#E2E8F0] font-light text-base">|</span>
            <span className="text-sm font-extrabold text-[#004F54] uppercase">
              EXCEL PUESTO DE BOLSA & ESAFI
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display text-[#0F172A] text-center leading-[1.1] max-w-5xl mx-auto tracking-tight">
            <EditableField id="sec1_h1_part1" defaultText="Portal de Inversionistas & " />
            <span className="text-[#004F54]">
              <EditableField id="sec1_h1_part2" defaultText="App Móvil Inteligente" />
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#334155] text-center max-w-3xl mx-auto leading-relaxed font-medium">
            <EditableField
              id="sec1_desc"
              defaultText="Plataforma de autogestión 24/7 para clientes e inversionistas de Excel: Portafolio 360°, Trade Ticket digital con aprobación fehaciente, integración directa con Microsoft Dynamics CRM & SIFI Fondos, y resúmenes con Inteligencia Artificial."
            />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#sec-7-epicas-alcance"
              className="inline-flex items-center space-x-3 bg-[#004F54] hover:bg-[#006B70] text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-[#004F54]/25 transition-all transform hover:scale-105 active:scale-95 text-base"
            >
              <span>Explorar las 7 Épicas</span>
              <ArrowRight className="w-5 h-5 text-[#F08D17]" />
            </a>
            <a
              href="#sec-simulador-interactivo-app"
              className="inline-flex items-center space-x-2.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] font-bold px-7 py-4 rounded-2xl shadow-md transition-all text-base"
            >
              <Smartphone className="w-5 h-5 text-[#004F54]" />
              <span>Simulador App Móvil</span>
            </a>
          </div>

          {/* Bottom Executive Metadata Grid */}
          <div className="max-w-5xl w-full mx-auto p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl text-left grid grid-cols-2 xl:grid-cols-4 gap-6 items-center divide-y xl:divide-y-0 xl:divide-x divide-[#E2E8F0] mt-8">
            <div className="px-4 py-2 flex flex-col justify-center">
              <div className="text-xs font-bold text-[#004F54] uppercase tracking-wider gap-2 flex items-center mb-1 font-mono">
                <Building2 className="w-4 h-4 text-[#F08D17]" />
                <span>Cliente Institucional</span>
              </div>
              <p className="text-base sm:text-lg font-black text-[#0F172A] leading-tight">
                Excel Puesto de Bolsa & ESAFI
              </p>
            </div>

            <div className="px-4 py-2 flex flex-col justify-center pt-4 xl:pt-2">
              <div className="text-xs font-bold text-[#004F54] uppercase tracking-wider gap-2 flex items-center mb-1 font-mono">
                <FileText className="w-4 h-4 text-[#F08D17]" />
                <span>Código de Propuesta</span>
              </div>
              <p className="text-base sm:text-lg font-black text-[#0F172A] leading-tight font-mono">
                ENF-PROP-2026-EXCEL
              </p>
            </div>

            <div className="px-4 py-2 flex flex-col justify-center pt-4 xl:pt-2">
              <div className="text-xs font-bold text-[#004F54] uppercase tracking-wider gap-2 flex items-center mb-1 font-mono">
                <Clock className="w-4 h-4 text-[#F08D17]" />
                <span>Tiempo de Ejecución</span>
              </div>
              <p className="text-base sm:text-lg font-black text-[#0F172A] leading-tight">
                8 a 12 Semanas
              </p>
            </div>

            <div className="px-4 py-2 flex flex-col justify-center pt-4 xl:pt-2">
              <div className="text-xs font-bold text-[#004F54] uppercase tracking-wider gap-2 flex items-center mb-1 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#F08D17]" />
                <span>Garantía de Satisfacción</span>
              </div>
              <p className="text-base sm:text-lg font-black text-[#004F54] leading-tight">
                60 Días Cobertura Total
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 02: Arquitectura de Valor & Ecosistema
  // --------------------------------------------------------------------------
  if (secId === "sec-valor-propuesta" || title.includes("Arquitectura de Valor")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-10"
        >
          <motion.div variants={sectionItemVariants} className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec2_badge" defaultText="02. Arquitectura de Valor & Ecosistema" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec2_h2" defaultText="Autogestión 24/7 + Asesoría Comercial de Alto Valor" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField
                id="sec2_desc"
                defaultText="Eliminamos la fricción operativa transaccional mediante canales digitales autogestionados y potenciamos la venta ejecutiva con Inteligencia Artificial."
              />
            </p>
          </motion.div>

          <motion.div variants={sectionItemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Model 1: Autogestión Inversionista 24/7 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F08D17]/15 border border-[#F08D17]/30 flex items-center justify-center text-[#F08D17] shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A]">
                    <EditableField id="sec2_card1_title" defaultText="Autogestión Inversionista 24/7" />
                  </h3>
                  <span className="text-sm text-[#F08D17] font-bold font-mono">
                    <EditableField id="sec2_card1_sub" defaultText="App Móvil iOS/Android & Portal Web" />
                  </span>
                </div>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-[#334155]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004F54] shrink-0 mt-0.5" />
                  <span>Consulta unificada 360° de Renta Fija, Mutuos, Fondos Inmobiliarios Excel I y II y Fondos Abiertos ESAFI.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004F54] shrink-0 mt-0.5" />
                  <span>Descarga directa de estados de cuenta PDF mensuales protegidos con contraseña del titular.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004F54] shrink-0 mt-0.5" />
                  <span>Solicitudes digitales de inversión y renovaciones con generación de Trade Ticket fehaciente.</span>
                </li>
              </ul>
            </div>

            {/* Model 2: Relaciones de Alto Valor & CRM Dynamics */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#004F54]/15 border border-[#004F54]/30 flex items-center justify-center text-[#004F54] shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A]">
                    <EditableField id="sec2_card2_title" defaultText="Gestión Comercial & CRM" />
                  </h3>
                  <span className="text-sm text-[#004F54] font-bold font-mono">
                    <EditableField id="sec2_card2_sub" defaultText="Ejecutivos Enfocados en Cierre y Valor" />
                  </span>
                </div>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-[#334155]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004F54] shrink-0 mt-0.5" />
                  <span>Creación automática de Oportunidades comerciales vinculadas al titular en Microsoft Dynamics 365.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004F54] shrink-0 mt-0.5" />
                  <span>Expediente CRM enriquecido con resúmenes generados por IA previa llamada de atención.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004F54] shrink-0 mt-0.5" />
                  <span>Notificaciones automáticas a 15 días del vencimiento de Mutuos Estructurados.</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* ROI Comparison Table */}
          <motion.div variants={sectionItemVariants} className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl overflow-x-auto">
            <h3 className="font-extrabold text-base sm:text-lg uppercase font-mono text-[#004F54] mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#F08D17]" />
              <span>Impacto Operativo: Modelo Tradicional vs Solución Digital ENFOCO</span>
            </h3>
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b-2 border-[#E2E8F0] text-[#0F172A] font-mono text-xs sm:text-sm uppercase tracking-wider">
                  <th className="pb-3 px-2">Proceso Operativo</th>
                  <th className="pb-3 px-2 text-[#64748B]">Antes (Manual / Presencial)</th>
                  <th className="pb-3 px-2 text-[#004F54] font-bold">Con Plataforma ENFOCO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-[#0F172A]">
                <tr>
                  <td className="py-4 px-2 font-bold text-base">Solicitud de Estado de Cuenta</td>
                  <td className="py-4 px-2 text-[#64748B]">Llamada/Email (Tiempo espera: 24h)</td>
                  <td className="py-4 px-2 font-extrabold text-[#004F54]">Descarga Inmediata PDF Protegido 24/7</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 font-bold text-base">Pacto / Renovación de Mutuo</td>
                  <td className="py-4 px-2 text-[#64748B]">Firma física en oficina / escaneo</td>
                  <td className="py-4 px-2 font-extrabold text-[#004F54]">Trade Ticket Digital + Fehaciente OTP</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 font-bold text-base">Seguimiento Comercial EPB</td>
                  <td className="py-4 px-2 text-[#64748B]">Registro manual de llamadas</td>
                  <td className="py-4 px-2 font-extrabold text-[#004F54]">Oportunidad Autocreada en Dynamics CRM</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 font-bold text-base">Operaciones ESAFI (Fondos Abiertos)</td>
                  <td className="py-4 px-2 text-[#64748B]">Trámite por formulario físico</td>
                  <td className="py-4 px-2 font-extrabold text-[#004F54]">Integración Directa a SIFI Fondos</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 03: Visor Interactivo de Alcance Funcional (7 Épicas SIMV)
  // --------------------------------------------------------------------------
  if (secId === "sec-7-epicas-alcance" || title.includes("7 Épicas")) {
    const epicsData = [
      {
        id: 1,
        title: "Épica 1: Registro, Autenticación Segura & Perfil KYC",
        icon: UserCheck,
        badge: "Seguridad SIMV",
        coverage: "100% Cobertura SIMV",
        deliverables: ["Login Biométrico & OTP", "Perfilado Inversionista SIMV", "Sesiones Expirables Seguras"],
        richStories: [
          {
            id: "e1_s1",
            title: "Acceso Biométrico Rápido (FaceID / TouchID)",
            asA: "Inversionista de Excel",
            iWant: "Autenticarme en la App Móvil con mi rostro (FaceID) o huella dactilar",
            soThat: "Pueda consultar mi portafolio en 1 segundo con la máxima seguridad sin digitar claves.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            demoTab: "ticket" as const,
            dod: [
              "Soporte nativo iOS FaceID/TouchID & Android Biometric Prompt",
              "Resguardo seguro de llaves en Secure Enclave / KeyStore",
              "Fallback automático a PIN de 4 dígitos o clave titular"
            ]
          },
          {
            id: "e1_s2",
            title: "Autenticación de 2 Factores Segura (OTP SMS/Email)",
            asA: "Usuario Institucional o Inversionista",
            iWant: "Recibir un código OTP de 6 dígitos al registrarme o ingresar desde un dispositivo nuevo",
            soThat: "Se garantice que únicamente el titular autorizado puede acceder a su cuenta.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            dod: [
              "Motor de envío OTP SMS vía conector corporativo",
              "Expiración de código en 3 minutos con máximo 3 intentos",
              "Auditoría inmutable de IP, dispositivo y geolocalización"
            ]
          },
          {
            id: "e1_s3",
            title: "Cuestionario KYC Digital & Perfilado de Riesgo SIMV",
            asA: "Oficial de Cumplimiento & Inversionista",
            iWant: "Completar mi perfil KYC y prueba de tolerancia al riesgo de manera 100% digital",
            soThat: "Se me asignen los instrumentos financieros acordes a mi perfil (Conservador, Moderado, Agresivo).",
            status: "🔵 UAT Cliente",
            phase: "fase1",
            dod: [
              "Matriz de puntuación según normativa regulada SIMV",
              "Validación automática de linderos según perfil asignado",
              "Sincronización de expediente con Dynamics 365 CRM"
            ]
          },
          {
            id: "e1_s4",
            title: "Cierre Automático por Inactividad & Expiración Segura",
            asA: "Responsable de Seguridad ISO 27002",
            iWant: "Que la sesión expire tras 15 minutos de inactividad",
            soThat: "Se eviten accesos no autorizados si el dispositivo queda desatendido.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            dod: [
              "Timer de inactividad de 15 min en cliente y backend",
              "Invalidación inmediata del Token JWT / OAuth2",
              "Limpieza de almacenamiento sensible en caché"
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Épica 2: Consulta Portafolio 360° & Balances 24/7",
        icon: PieChart,
        badge: "Core Inversiones",
        coverage: "100% Datos Sincronizados",
        deliverables: ["Dashboard Portafolio 360°", "Saldos Diarios Actualizados", "Soporte Titular/Cotitular"],
        richStories: [
          {
            id: "e2_s1",
            title: "Resumen Consolidado 360° de Inversiones",
            asA: "Cliente Titular de Excel",
            iWant: "Ver el valor consolidado de todas mis inversiones en una sola pantalla",
            soThat: "Tenga visibilidad inmediata de mis Mutuos, Fondos Inmobiliarios y ESAFI.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            demoTab: "portafolio" as const,
            dod: [
              "Suma consolidada en tiempo real de cuentas titular y cotitular",
              "Gráfico interactivo de distribución por producto",
              "Cálculo automático de ganancia acumulada estimada"
            ]
          },
          {
            id: "e2_s2",
            title: "Desglose de Fondos Inmobiliarios Excel I y II",
            asA: "Inversionista de Fondos Cerrados",
            iWant: "Consultar las cuotas poseídas, valor del valor cuota y dividendos recibidos",
            soThat: "Pueda medir el retorno de mis inversiones inmobiliarias.",
            status: "🔵 UAT Cliente",
            phase: "fase1",
            dod: [
              "Tabla de desglose de cuotas y valor liquidativo por cuota",
              "Histórico de distribuciones de dividendos acreditados",
              "Descarga de comprobantes de dividendos en PDF"
            ]
          },
          {
            id: "e2_s3",
            title: "Detalle de Mutuos Estructurados & Renta Fija",
            asA: "Inversionista de Mutuos EPB",
            iWant: "Revisar la tasa pactada, fecha de emisión y fecha exacta de vencimiento de mis mutuos",
            soThat: "Sepa exactamente cuándo vence mi capital y el interés a recibir.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            demoTab: "portafolio" as const,
            dod: [
              "Visualización de tasa fija pactada p.a. y días restantes",
              "Cálculo transparente de intereses acumulados",
              "Acceso al botón de solicitud de renovación digital"
            ]
          },
          {
            id: "e2_s4",
            title: "Soporte Multi-Cuenta & Cuentas Cotitulares",
            asA: "Titular de Cuentas Conjuntas",
            iWant: "Alternar fácilmente entre mis cuentas de corretaje donde participo como cotitular",
            soThat: "Visualice de forma separada mis inversiones individuales y compartidas.",
            status: "🟡 Integración API",
            phase: "fase2",
            dod: [
              "Selector desplegable de cuenta de corretaje o encargo",
              "Validación de permisos de consulta para cotitulares",
              "Filtro de privacidad en descarga de estados de cuenta"
            ]
          }
        ]
      },
      {
        id: 3,
        title: "Épica 3: Estados de Cuenta Digitales PDF Protegidos",
        icon: FileText,
        badge: "Documentos",
        coverage: "Cifrado AES-256 Activo",
        deliverables: ["Visor PDF Integrado", "Clave Titular Cifrada", "Histórico 12 Meses"],
        richStories: [
          {
            id: "e3_s1",
            title: "Visor PDF Integrado Sin Descargas Externas",
            asA: "Inversionista de Excel",
            iWant: "Abrir mi estado de cuenta directamente dentro de la aplicación móvil o web",
            soThat: "No tenga que recurrir a lectores externos o salir del canal seguro.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            demoTab: "estados" as const,
            dod: [
              "Visor PDF responsivo sin almacenamiento de archivos en cliente",
              "Zoom y navegación fluida por páginas",
              "Botón seguro de descarga cifrada a carpeta local"
            ]
          },
          {
            id: "e3_s2",
            title: "Protección de PDF con Clave del Titular (RNC/Cédula)",
            asA: "Oficial de Seguridad de la Información",
            iWant: "Que cada archivo PDF descargado requiera la clave de acceso del titular",
            soThat: "Se garantice la confidencialidad en caso de reenvío por correo o almacenamiento.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            demoTab: "estados" as const,
            dod: [
              "Encriptación PDF estándar con contraseña derivante del RNC/Cédula",
              "Teclado PIN seguro de 4 dígitos en interfaz móvil",
              "Auditoría de eventos de desbloqueo exitosos e intentos fallidos"
            ]
          },
          {
            id: "e3_s3",
            title: "Histórico Continuo de 12 Meses",
            asA: "Cliente de Excel",
            iWant: "Acceder al histórico de mis estados de cuenta de los últimos 12 meses",
            soThat: "Pueda descargar declaraciones pasadas para fines impositivos o personales.",
            status: "🔵 UAT Cliente",
            phase: "fase1",
            dod: [
              "Listado filtrable por mes y año fiscal",
              "Depuración automática de períodos sin movimiento",
              "Consolidación por cuenta de corretaje"
            ]
          }
        ]
      },
      {
        id: 4,
        title: "Épica 4: Solicitudes Digitales, Trade Ticket & Mutuos",
        icon: FileCode,
        badge: "Transaccional",
        coverage: "Trade Ticket Fehaciente",
        deliverables: ["Motor de Solicitudes Digitales", "Trade Ticket Fehaciente", "Validación KYC en Tiempo Real"],
        richStories: [
          {
            id: "e4_s1",
            title: "Generación Automática del Trade Ticket Digital",
            asA: "Inversionista de Mutuos & Renta Fija",
            iWant: "Generar un Trade Ticket digital al solicitar una inversión o renovación",
            soThat: "Exista un comprobante legal fehaciente de mi instrucción operativa.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            demoTab: "ticket" as const,
            dod: [
              "Asignación de correlativo único de ticket (#TT-2026-XXXX)",
              "Firma fehaciente con timestamp y hash SHA-256",
              "Envío automático de copia en PDF a correo registrado"
            ]
          },
          {
            id: "e4_s2",
            title: "Validación de Horario Operacional & Linderos KYC",
            asA: "Director de Operaciones Excel",
            iWant: "Que el sistema valide automáticamente el horario de mercado y el perfil KYC",
            soThat: "No se ejecuten órdenes fuera de horario ni por encima del perfil del cliente.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            dod: [
              "Verificación de días hábiles y horario SIMV (8:00 AM a 4:00 PM)",
              "Bloqueo preventivo si el monto excede el perfil KYC",
              "Notificación de orden pendiente para el siguiente día hábil"
            ]
          },
          {
            id: "e4_s3",
            title: "Aportes & Rescates a Fondos Abiertos ESAFI",
            asA: "Cliente de Fondos ESAFI",
            iWant: "Solicitar aportes o rescates de cuotas de Fondos Abiertos directamente desde la App",
            soThat: "Mis instrucciones ingresen de inmediato al sistema de SIFI Fondos.",
            status: "🟡 Integración API",
            phase: "fase2",
            dod: [
              "Cálculo de valor cuota proyectado y fecha de liquidación",
              "Generación de orden de aporte/rescate con comprobante",
              "Webhook de integración directa con SIFI Fondos"
            ]
          }
        ]
      },
      {
        id: 5,
        title: "Épica 5: Mensajería Push, Alerta Vencimiento 15 Días & Asesor",
        icon: MessageSquare,
        badge: "Comunicación",
        coverage: "Dynamics 365 Linked",
        deliverables: ["Push Notifications Segmentadas", "Alerta Vencimiento 15 Días", "Bandeja de Mensajes"],
        richStories: [
          {
            id: "e5_s1",
            title: "Alerta Automática de Vencimiento de Mutuos a 15 Días",
            asA: "Inversionista de Mutuos Estructurados",
            iWant: "Recibir una notificación push 15 días antes de que venza mi mutuo",
            soThat: "Pueda instruir su renovación a tasa preferencial en 1 clic.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            demoTab: "ticket" as const,
            dod: [
              "Disparador programado a T-15 días del vencimiento",
              "Banner interactivo en Dynamic Island / barra superior app",
              "Opción de pre-aprobación de tasa de renovación"
            ]
          },
          {
            id: "e5_s2",
            title: "Chat WhatsApp Prioritario con Ejecutiva Asignada",
            asA: "Cliente de Alto Valor (Banca Privada)",
            iWant: "Iniciar una conversación por WhatsApp directamente con mi ejecutiva asignada",
            soThat: "Reciba asesoría personalizada sin llamadas frías.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            demoTab: "asesor" as const,
            dod: [
              "Enrutamiento directo a número WhatsApp corporativo",
              "Plantillas de mensaje con datos de inversión pre-cargados",
              "Registro del contacto como actividad en Dynamics 365 CRM"
            ]
          },
          {
            id: "e5_s3",
            title: "Notificaciones Push Segmentadas desde Dynamics CRM",
            asA: "Gerente de Mercadeo & Ventas Excel",
            iWant: "Enviar notificaciones push segmentadas por tipo de cliente desde Dynamics CRM",
            soThat: "Promocione nuevos fondos inmobiliarios a clientes calificados.",
            status: "🟡 Integración API",
            phase: "fase2",
            dod: [
              "Conector de salida de campañas CRM a servicio de Push",
              "Bandeja de mensajes pasados almacenada en la app",
              "Métricas de tasa de apertura e interacción"
            ]
          }
        ]
      },
      {
        id: 6,
        title: "Épica 6: Cotizaciones en Tiempo Real & Información Productos",
        icon: TrendingUp,
        badge: "Mercado",
        coverage: "Información Pública SIMV",
        deliverables: ["Cotizaciones en Vivo", "Directorio Productos", "Distintivo EPB vs ESAFI"],
        richStories: [
          {
            id: "e6_s1",
            title: "Precios de Cuotas & Rendimientos en Tiempo Real",
            asA: "Inversionista de Fondos Excel",
            iWant: "Ver el valor cuota actualizado diariamente de los fondos de ESAFI y EPB",
            soThat: "Conozca el desempeño de mercado de mis activos.",
            status: "🔵 UAT Cliente",
            phase: "fase1",
            dod: [
              "Actualización diaria de valor cuota tras cierre de mercado",
              "Gráfico de rendimiento histórico a 30, 90 y 365 días",
              "Diferenciación de marca entre EPB (Puesto de Bolsa) y ESAFI"
            ]
          },
          {
            id: "e6_s2",
            title: "Directorio Institucional & Accesos Oficiales",
            asA: "Usuario General de la App",
            iWant: "Consultar los canales oficiales de Excel, oficinas y enlaces regulados SIMV",
            soThat: "Tenga la garantía de interactuar con el portal oficial excel.com.do.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            dod: [
              "Ficha institucional de Excel Puesto de Bolsa y ESAFI",
              "Directorio telefónico y direcciones de sucursales",
              "Enlaces directos a reglamentos y prospectos SIMV"
            ]
          }
        ]
      },
      {
        id: 7,
        title: "Épica 7: Seguridad ISO 27002, Auditoría & Gobernanza SIMV",
        icon: ShieldCheck,
        badge: "Gobernanza",
        coverage: "Audit-Ready SIMV & ISO",
        deliverables: ["Logs de Auditoría Inmutables", "Cumplimiento ISO 27002 & SIMV", "Indicadores de Uso Gerencial"],
        richStories: [
          {
            id: "e7_s1",
            title: "Bitácora Centralizada Inmutable para Inspecciones SIMV",
            asA: "Oficial de Cumplimiento & Auditor SIMV",
            iWant: "Que todas las interacciones, logins y transacciones queden registradas en una bitácora inmutable",
            soThat: "Se pueda presentar evidencia fehaciente en auditorías de la SIMV.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            dod: [
              "Registro inmutable con timestamp UTC y hash SHA-256",
              "Filtros de búsqueda por RNC, fecha y tipo de evento",
              "Exportación directa a formato CSV / Excel oficial"
            ]
          },
          {
            id: "e7_s2",
            title: "Cifrado de Datos TLS 1.3 & AES-256 en Reposo",
            asA: "Oficial de Seguridad ISO 27002",
            iWant: "Que la información sensible viaje cifrada con TLS 1.3 y se guarde con AES-256",
            soThat: "Se impidan interceptaciones o fugas de información bancaria.",
            status: "🟢 Sprint 1 (Listo)",
            phase: "fase1",
            dod: [
              "Certificados SSL/TLS con calificación A+ en SSL Labs",
              "Cifrado de base de datos AES-256 a nivel de columna",
              "Monitoreo activo de vulnerabilidades OWASP Top 10"
            ]
          }
        ]
      },
    ];

    const currentEpic = epicsData.find((e) => e.id === activeEpicTab) || epicsData[0];
    const EpicIcon = currentEpic.icon;

    // Filter stories by selected implementation phase if applicable
    const filteredStories = currentEpic.richStories.filter(story => {
      if (storyPhaseFilter === "fase1") return story.phase === "fase1";
      if (storyPhaseFilter === "fase2") return story.phase === "fase2";
      return true;
    });

    const jumpToSimulatorTab = (simTab: "portafolio" | "ticket" | "estados" | "asesor") => {
      setAppSimTab(simTab);
      const el = document.getElementById("sec-simulador-interactivo-app");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-8"
        >
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec3_badge" defaultText="03. ALCANCE FUNCIONAL COMPLETO & HISTORIAS ÁGILES" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec3_h2" defaultText="Detalle Funcional por 7 Épicas SIMV" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField id="sec3_desc" defaultText="Toca cualquier historia de usuario para desplegar su estructura ágil (Como/Quiero/Para), criterios de aceptación (DoD) y probar la acción en vivo en el simulador." />
            </p>
          </div>

          {/* Phase Filter & Epic Metrics Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#004F54]" />
              <span className="text-xs font-mono font-bold text-[#0F172A]">Fase de Implementación:</span>
              <div className="flex items-center gap-1.5 pl-2">
                <button
                  onClick={() => setStoryPhaseFilter("todos")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                    storyPhaseFilter === "todos" ? "bg-[#004F54] text-white shadow-md" : "bg-white text-[#334155] border border-[#CBD5E1]"
                  }`}
                >
                  Todas (28 Stories)
                </button>
                <button
                  onClick={() => setStoryPhaseFilter("fase1")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                    storyPhaseFilter === "fase1" ? "bg-[#004F54] text-white shadow-md" : "bg-white text-[#334155] border border-[#CBD5E1]"
                  }`}
                >
                  Fase 1: App Inversionista
                </button>
                <button
                  onClick={() => setStoryPhaseFilter("fase2")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                    storyPhaseFilter === "fase2" ? "bg-[#006B70] text-white shadow-md" : "bg-white text-[#334155] border border-[#CBD5E1]"
                  }`}
                >
                  Fase 2: CRM Dynamics & Core
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#004F54] bg-[#004F54]/10 px-3.5 py-1.5 rounded-xl border border-[#004F54]/30">
              <CheckCircle2 className="w-4 h-4 text-[#F08D17]" />
              <span>{currentEpic.coverage}</span>
            </div>
          </div>

          {/* Epic Tab Bar */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {epicsData.map((epic) => (
              <button
                key={epic.id}
                onClick={() => {
                  setActiveEpicTab(epic.id);
                  setExpandedStoryId(epic.richStories[0]?.id || null);
                }}
                className={`px-5 py-3 rounded-2xl text-sm font-bold font-mono transition-all shrink-0 cursor-pointer flex items-center gap-2.5 border ${
                  activeEpicTab === epic.id
                    ? "bg-[#004F54] text-white border-[#004F54] shadow-lg scale-105"
                    : "bg-[#F1F5F9] text-[#0F172A] border-[#CBD5E1] hover:border-[#004F54]"
                }`}
              >
                <span>Épica {epic.id}</span>
              </button>
            ))}
          </div>

          {/* Selected Epic Details Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEpic.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Title & Deliverables */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#004F54]/15 border border-[#004F54]/30 flex items-center justify-center text-[#004F54] shrink-0">
                    <EpicIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase px-3 py-1 rounded-full bg-[#004F54]/10 text-[#004F54] border border-[#004F54]/30">
                      {currentEpic.badge}
                    </span>
                    <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A] mt-2">
                      <EditableField id={`epic_title_${currentEpic.id}`} defaultText={currentEpic.title} />
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold uppercase font-mono text-[#004F54] tracking-wider">
                    Entregables Técnicos Clave:
                  </h4>
                  <div className="space-y-3">
                    {currentEpic.deliverables.map((del, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm sm:text-base font-bold text-[#004F54]">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-[#F08D17]" />
                        <EditableField id={`epic_del_${currentEpic.id}_${i}`} defaultText={del} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Accordion User Stories */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold uppercase font-mono text-[#004F54] tracking-wider">
                    HISTORIAS DE USUARIO EN FORMATO ÁGIL ({filteredStories.length}):
                  </h4>
                  <span className="text-xs text-[#64748B] font-mono">Toca para desplegar DoD</span>
                </div>

                <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2 scrollbar-thin">
                  {filteredStories.map((story, idx) => {
                    const isExpanded = expandedStoryId === story.id;

                    return (
                      <div
                        key={story.id}
                        className={`rounded-2xl border transition-all overflow-hidden ${
                          isExpanded
                            ? "bg-white border-2 border-[#004F54] shadow-lg ring-2 ring-[#004F54]/10"
                            : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#004F54]"
                        }`}
                      >
                        {/* Header Bar of Story */}
                        <div
                          onClick={() => setExpandedStoryId(isExpanded ? null : story.id)}
                          className="p-4 cursor-pointer flex items-center justify-between gap-3 select-none"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#004F54] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                              0{idx + 1}
                            </span>
                            <span className="font-extrabold text-sm sm:text-base text-[#0F172A]">
                              {story.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0F172A]">
                              {story.status}
                            </span>
                            <ChevronRight className={`w-4 h-4 text-[#004F54] transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                          </div>
                        </div>

                        {/* Expanded Content Drawer */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-4 pb-4 pt-1 space-y-4 border-t border-[#E2E8F0] bg-[#F8FAFC]"
                            >
                              {/* Formato Ágil: Como / Quiero / Para */}
                              <div className="p-3.5 rounded-xl bg-white border border-[#CBD5E1] space-y-2 text-xs leading-relaxed">
                                <p className="text-[#0F172A]">
                                  <span className="font-mono font-extrabold text-[#004F54]">COMO:</span> {story.asA}
                                </p>
                                <p className="text-[#0F172A]">
                                  <span className="font-mono font-extrabold text-[#F08D17]">QUIERO:</span> {story.iWant}
                                </p>
                                <p className="text-[#0F172A]">
                                  <span className="font-mono font-extrabold text-[#006B70]">PARA:</span> {story.soThat}
                                </p>
                              </div>

                              {/* Acceptance Criteria (Definition of Done) */}
                              <div className="space-y-2">
                                <span className="text-[11px] font-mono font-extrabold text-[#004F54] uppercase tracking-wider block">
                                  CRITERIOS DE ACEPTACIÓN (DoD):
                                </span>
                                <div className="space-y-1.5">
                                  {story.dod.map((criterion, cIdx) => (
                                    <div key={cIdx} className="flex items-center gap-2.5 text-xs text-[#334155]">
                                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                                      <span>{criterion}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Action Link to Simulator */}
                              {story.demoTab && (
                                <div className="pt-2 flex justify-end">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      jumpToSimulatorTab(story.demoTab!);
                                    }}
                                    className="px-4 py-2 bg-[#004F54] hover:bg-[#006B70] text-white rounded-xl text-xs font-bold font-mono shadow-md transition-all flex items-center gap-2 cursor-pointer"
                                  >
                                    <Zap className="w-3.5 h-3.5 text-[#F08D17]" />
                                    <span>⚡ Probar en Simulador iPhone &rarr;</span>
                                  </button>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 04: SIMULADOR APP MÓVIL 100% INTERACTIVO & TÁCTIL (IPHONE)
  // --------------------------------------------------------------------------
  if (secId === "sec-simulador-interactivo-app" || title.includes("Simulador App")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-10"
        >
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec4_badge" defaultText="04. DEMOSTRACIÓN 100% INTERACTIVA & TÁCTIL" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec4_h2" defaultText="Simulador App Móvil & Trade Ticket Digital" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField id="sec4_desc" defaultText="Toca directamente los botones de la pantalla del iPhone o los controles laterales para experimentar la aplicación en vivo." />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Control Sidebar (Left) */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-extrabold text-sm uppercase font-mono text-[#004F54] tracking-wider mb-3">
                SELECCIONA O TOCA DIRECTAMENTE EN EL TELÉFONO:
              </h3>

              <button
                onClick={() => setAppSimTab("portafolio")}
                className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  appSimTab === "portafolio"
                    ? "bg-white border-[#004F54] shadow-xl ring-2 ring-[#004F54]/20 text-[#0F172A]"
                    : "bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] hover:border-[#004F54]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <PieChart className="w-6 h-6 text-[#004F54] shrink-0" />
                  <div>
                    <span className="font-extrabold text-base block">1. Portafolio Consolidado 360°</span>
                    <span className="text-xs text-[#64748B]">Saldos diarios en tiempo real</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#004F54]" />
              </button>

              <button
                onClick={() => setAppSimTab("ticket")}
                className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  appSimTab === "ticket"
                    ? "bg-white border-[#004F54] shadow-xl ring-2 ring-[#004F54]/20 text-[#0F172A]"
                    : "bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] hover:border-[#004F54]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <FileCode className="w-6 h-6 text-[#F08D17] shrink-0" />
                  <div>
                    <span className="font-extrabold text-base block">2. Trade Ticket & FaceID</span>
                    <span className="text-xs text-[#64748B]">Firmar con biometría animada</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#004F54]" />
              </button>

              <button
                onClick={() => setAppSimTab("estados")}
                className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  appSimTab === "estados"
                    ? "bg-white border-[#004F54] shadow-xl ring-2 ring-[#004F54]/20 text-[#0F172A]"
                    : "bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] hover:border-[#004F54]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Lock className="w-6 h-6 text-[#006B70] shrink-0" />
                  <div>
                    <span className="font-extrabold text-base block">3. Estados PDF con Teclado PIN</span>
                    <span className="text-xs text-[#64748B]">Desbloqueo por clave del titular</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#004F54]" />
              </button>

              <button
                onClick={() => setAppSimTab("asesor")}
                className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  appSimTab === "asesor"
                    ? "bg-white border-[#004F54] shadow-xl ring-2 ring-[#004F54]/20 text-[#0F172A]"
                    : "bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] hover:border-[#004F54]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <MessageSquare className="w-6 h-6 text-[#3A8F93] shrink-0" />
                  <div>
                    <span className="font-extrabold text-base block">4. Chat WhatsApp con Ejecutiva</span>
                    <span className="text-xs text-[#64748B]">Mensajería en vivo con respuestas en tiempo real</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#004F54]" />
              </button>
            </div>

            {/* iPhone 15 Pro Titanium Mockup Screen */}
            <div className="lg:col-span-7 flex justify-center">
              {/* Outer Metallic Titanium Frame & Buttons */}
              <div className="relative">
                {/* Left Side Buttons (Volume Up/Down & Action Button) */}
                <div className="absolute -left-2 top-24 w-1.5 h-7 bg-slate-600 rounded-l-md" />
                <div className="absolute -left-2 top-36 w-1.5 h-10 bg-slate-600 rounded-l-md" />
                <div className="absolute -left-2 top-48 w-1.5 h-10 bg-slate-600 rounded-l-md" />
                {/* Right Side Power Button */}
                <div className="absolute -right-2 top-36 w-1.5 h-14 bg-slate-600 rounded-r-md" />

                {/* Main Phone Body */}
                <div className="w-[360px] sm:w-[380px] h-[640px] bg-gradient-to-b from-slate-800 via-slate-900 to-black p-3.5 rounded-[52px] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)] border-4 border-slate-700/80 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* FaceID Scanning Overlay Animation */}
                  <AnimatePresence>
                    {isFaceIdScanning && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 bg-[#0F172A]/92 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 z-50 text-white space-y-4"
                      >
                        <div className="w-20 h-20 rounded-3xl border-4 border-[#38BDF8] flex items-center justify-center animate-pulse shadow-2xl shadow-[#38BDF8]/50">
                          <UserCheck className="w-10 h-10 text-[#38BDF8]" />
                        </div>
                        <p className="font-extrabold text-base">Escaneando FaceID...</p>
                        <span className="text-xs text-slate-300 font-mono">Verificando linderos KYC & SIMV</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dynamic Island Header */}
                  <div className="w-32 h-6 bg-black rounded-full mx-auto mb-1 flex items-center justify-between px-3 shrink-0 shadow-inner z-40 border border-slate-800">
                    <span className="w-2.5 h-2.5 bg-[#004F54] rounded-full border border-slate-700" />
                    <span className="w-2 h-2 bg-[#F08D17] rounded-full animate-pulse" />
                  </div>

                  {/* Dynamic Island Push Banner Alert */}
                  {showPushAlert && (
                    <motion.button
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      onClick={() => {
                        setAppSimTab("ticket");
                        setShowPushAlert(false);
                      }}
                      className="w-full bg-slate-900/95 border border-[#F08D17]/50 p-2.5 rounded-2xl shadow-2xl flex items-center justify-between text-white text-left cursor-pointer hover:border-[#F08D17] transition-all mb-2 shrink-0 z-30"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F08D17] animate-ping shrink-0" />
                        <div>
                          <p className="text-[11px] font-extrabold text-white leading-tight">🔔 Excel Alerta Vencimiento (15 Días)</p>
                          <span className="text-[10px] text-slate-300">Mutuo USD $50k vence. Toca para renovar &rarr;</span>
                        </div>
                      </div>
                    </motion.button>
                  )}

                  {/* iOS Status Bar */}
                  <div className="flex items-center justify-between px-4 text-[11px] text-slate-300 font-mono mb-1 shrink-0 font-bold">
                    <span>9:41</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-[#38BDF8]">5G</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">98% 🔋</span>
                    </div>
                  </div>

                  {/* Main Interactive Screen Content */}
                  <div className="flex-1 bg-[#F8FAFC] rounded-[36px] overflow-hidden flex flex-col justify-between border border-slate-700/50 text-[#0F172A] relative font-sans shadow-inner">
                    <AnimatePresence mode="wait">
                      {/* VIEW 1: PORTAFOLIO 360° */}
                      {appSimTab === "portafolio" && (
                        <motion.div
                          key="portafolio"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 space-y-3 flex-1 overflow-y-auto"
                        >
                          <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2">
                            <span className="text-xs font-extrabold text-[#0F172A]">Portafolio Consolidado 360°</span>
                            <span className="text-[10px] text-[#004F54] font-mono font-bold">● En Vivo</span>
                          </div>
                          <div className="p-3.5 bg-gradient-to-r from-[#004F54] to-[#006B70] rounded-2xl text-white space-y-1 shadow-lg">
                            <span className="text-[10px] text-white/80 block font-mono font-bold">VALOR TOTAL INVERSIONES</span>
                            <p className="text-2xl font-black text-white font-mono">${calcAmount.toLocaleString()} USD</p>
                            <span className="text-[10px] text-[#F08D17] font-mono font-bold block">+${Math.round(calculatedYield).toLocaleString()} Ganancia Est.</span>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="p-3 bg-white rounded-2xl flex items-center justify-between border border-[#E2E8F0] shadow-sm hover:border-[#004F54] cursor-pointer transition-all">
                              <div>
                                <p className="font-extrabold text-xs text-[#0F172A]">Mutuo Estructurado ({mutuoPct}%)</p>
                                <span className="text-[10px] text-[#F08D17] font-bold">Tasa: {(currentRate * 100).toFixed(1)}% • Vence 15d</span>
                              </div>
                              <span className="font-mono text-[#F08D17] font-extrabold text-xs">${Math.round(calcAmount * (mutuoPct / 100)).toLocaleString()}</span>
                            </div>
                            <div className="p-3 bg-white rounded-2xl flex items-center justify-between border border-[#E2E8F0] shadow-sm hover:border-[#004F54] cursor-pointer transition-all">
                              <div>
                                <p className="font-extrabold text-xs text-[#0F172A]">Fondo Inmobiliario II ({inmoPct}%)</p>
                                <span className="text-[10px] text-[#64748B]">Cuotas • Div: $1,250.00</span>
                              </div>
                              <span className="font-mono text-[#004F54] font-extrabold text-xs">${Math.round(calcAmount * (inmoPct / 100)).toLocaleString()}</span>
                            </div>
                            <div className="p-3 bg-white rounded-2xl flex items-center justify-between border border-[#E2E8F0] shadow-sm hover:border-[#004F54] cursor-pointer transition-all">
                              <div>
                                <p className="font-extrabold text-xs text-[#0F172A]">Fondo Liquidez ESAFI ({esafiPct}%)</p>
                                <span className="text-[10px] text-[#64748B]">Encargo #4092</span>
                              </div>
                              <span className="font-mono text-[#334155] font-extrabold text-xs">${Math.round(calcAmount * (esafiPct / 100)).toLocaleString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* VIEW 2: TRADE TICKET WITH FACEID SCAN */}
                      {appSimTab === "ticket" && (
                        <motion.div
                          key="ticket"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 space-y-3 flex-1 overflow-y-auto"
                        >
                          <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2">
                            <span className="text-xs font-extrabold text-[#004F54]">Trade Ticket Digital</span>
                            <span className="text-[10px] text-[#64748B] font-mono font-bold">#TT-2026-8841</span>
                          </div>
                          <div className="p-3 bg-[#FFFBEB] border border-[#FCD34D] rounded-2xl space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-[#92400E] block uppercase">
                              Aprobación Fehaciente Requerida
                            </span>
                            <p className="text-xs text-[#0F172A] leading-relaxed font-medium">
                              Solicitud: <span className="font-bold text-[#004F54]">Renovación Mutuo USD ${calcAmount.toLocaleString()}</span> a {calcTermDays} Días ({(currentRate * 100).toFixed(1)}%).
                            </p>
                          </div>
                          <div className="p-3 bg-white rounded-2xl border border-[#E2E8F0] space-y-3 text-center shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-[#004F54]/10 text-[#004F54] flex items-center justify-center mx-auto shadow-inner">
                              <ShieldCheck className="w-6 h-6 text-[#004F54]" />
                            </div>
                            <span className="text-xs font-extrabold text-[#0F172A] block">
                              {faceIdSigned ? "✅ Aprobado & Transmitido a CRM" : "Biometría FaceID Requerida"}
                            </span>
                            <button
                              onClick={triggerFaceIdScan}
                              disabled={faceIdSigned}
                              className={`w-full py-3 rounded-xl text-xs font-extrabold shadow-md cursor-pointer transition-all ${
                                faceIdSigned
                                  ? "bg-emerald-600 text-white"
                                  : "bg-[#004F54] hover:bg-[#006B70] text-white"
                              }`}
                            >
                              {faceIdSigned ? "✔ Orden Transmitida a Dynamics CRM" : "Touch / Escanear FaceID"}
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* VIEW 3: ESTADOS PDF WITH PIN KEYPAD */}
                      {appSimTab === "estados" && (
                        <motion.div
                          key="estados"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 space-y-3 flex-1 overflow-y-auto"
                        >
                          <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-2">
                            <span className="text-xs font-extrabold text-[#004F54]">Estados de Cuenta PDF</span>
                            <span className="text-[10px] text-[#64748B] font-mono">12 Meses</span>
                          </div>

                          {!pdfUnlocked ? (
                            <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl space-y-3 text-center shadow-sm">
                              <Lock className="w-6 h-6 text-[#F08D17] mx-auto" />
                              <div>
                                <p className="text-xs font-extrabold text-[#0F172A]">PDF Cifrado por Seguridad</p>
                                <span className="text-[10px] text-[#64748B]">Ingresa PIN del Titular (Ej: 1234)</span>
                              </div>
                              <div className="flex justify-center gap-2">
                                {[0, 1, 2, 3].map(i => (
                                  <span key={i} className={`w-3.5 h-3.5 rounded-full border transition-all ${i < pinDigits.length ? "bg-[#004F54] border-[#004F54] scale-110" : "bg-slate-100 border-slate-300"}`} />
                                ))}
                              </div>
                              <div className="grid grid-cols-3 gap-1.5 max-w-[190px] mx-auto pt-1 font-mono">
                                {["1","2","3","4","5","6","7","8","9"].map(num => (
                                  <button
                                    key={num}
                                    onClick={() => handlePinKeyPress(num)}
                                    className="p-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-extrabold rounded-xl text-xs cursor-pointer active:scale-95 shadow-sm"
                                  >
                                    {num}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="p-4 bg-[#F0FDF4] border border-[#A7F3D0] rounded-2xl space-y-3 shadow-sm text-center">
                              <FileText className="w-9 h-9 text-[#166534] mx-auto" />
                              <div>
                                <p className="text-xs font-extrabold text-[#166534]">Estado_Julio_2026_DESBLOQUEADO.pdf</p>
                                <span className="text-[10px] text-[#15803D]">Titular: Juan Pérez • RNC 001-XXXX-X</span>
                              </div>
                              <button
                                onClick={() => { setPdfUnlocked(false); setPinDigits(""); }}
                                className="py-2 px-4 bg-[#166534] text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-[#15803D]"
                              >
                                🔒 Volver a Bloquear PDF
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {/* VIEW 4: AUTHENTIC WHATSAPP iOS STYLE CHAT SIMULATOR */}
                      {appSimTab === "asesor" && (
                        <motion.div
                          key="asesor"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex flex-col justify-between h-full bg-[#efeae2] relative"
                        >
                          {/* WhatsApp Official Dark Teal Header Bar */}
                          <div className="bg-[#008069] text-white px-3 py-2 flex items-center justify-between shrink-0 shadow-md">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white/80 cursor-pointer">&lt;</span>
                              <div className="relative">
                                <div className="w-7 h-7 rounded-full bg-white text-[#008069] font-black text-xs flex items-center justify-center border border-white">
                                  MF
                                </div>
                                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute bottom-0 right-0 border border-white" />
                              </div>
                              <div>
                                <span className="text-xs font-extrabold text-white block leading-tight">María Fernández</span>
                                <span className="text-[9px] text-emerald-100 font-sans block">en línea</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-white">
                              <span className="text-xs cursor-pointer">🎥</span>
                              <span className="text-xs cursor-pointer">📞</span>
                            </div>
                          </div>

                          {/* Chat Thread with WhatsApp Bubbles */}
                          <div className="p-3 space-y-2.5 flex-1 overflow-y-auto text-xs font-sans">
                            {chatMessages.map((msg, i) => (
                              <div
                                key={i}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`p-2.5 rounded-2xl max-w-[82%] text-xs font-medium shadow-sm relative ${
                                    msg.sender === "user"
                                      ? "bg-[#d9fdd3] text-[#111b21] rounded-tr-none"
                                      : "bg-white text-[#111b21] rounded-tl-none border border-slate-200"
                                  }`}
                                >
                                  <p className="leading-snug">{msg.text}</p>
                                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-500 font-mono">
                                    <span>9:42 AM</span>
                                    {msg.sender === "user" && <span className="text-[#53bdeb] font-extrabold">✓✓</span>}
                                  </div>
                                </div>
                              </div>
                            ))}

                            {isTyping && (
                              <div className="flex justify-start">
                                <div className="bg-white px-3 py-2 rounded-2xl rounded-tl-none text-xs text-[#008069] font-bold flex items-center gap-1.5 shadow-sm">
                                  <span>María está escribiendo</span>
                                  <span className="flex gap-0.5">
                                    <span className="w-1.5 h-1.5 bg-[#008069] rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-[#008069] rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <span className="w-1.5 h-1.5 bg-[#008069] rounded-full animate-bounce [animation-delay:0.4s]" />
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Quick Interactive Prompt Buttons */}
                          <div className="p-2 bg-[#f0f2f5] border-t border-slate-300 space-y-1.5 shrink-0">
                            <div className="grid grid-cols-2 gap-1">
                              <button
                                onClick={() => sendChatMessage("¿Cuál es la tasa de renovación?")}
                                className="p-1.5 bg-white hover:bg-slate-100 text-[#008069] border border-slate-200 rounded-xl text-[10px] font-bold text-left truncate cursor-pointer shadow-sm"
                              >
                                💬 Tasa Mutuo
                              </button>
                              <button
                                onClick={() => sendChatMessage("Solicitar renovación de mi mutuo")}
                                className="p-1.5 bg-[#fff8e1] hover:bg-[#ffecb3] text-[#b78103] border border-[#ffe082] rounded-xl text-[10px] font-bold text-left truncate cursor-pointer shadow-sm"
                              >
                                ⚡ Pedir Renovación
                              </button>
                            </div>

                            {/* WhatsApp Footer Input Bar */}
                            <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1.5 border border-slate-300 shadow-sm">
                              <span className="text-slate-400 font-bold text-sm cursor-pointer">+</span>
                              <input
                                type="text"
                                readOnly
                                placeholder="Escribe un mensaje..."
                                className="w-full text-xs text-slate-700 outline-none bg-transparent"
                              />
                              <span className="text-slate-400 text-xs cursor-pointer">🎤</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* REALISTIC iOS BOTTOM TAB BAR INSIDE IPHONE SCREEN */}
                  <div className="pt-2 border-t border-slate-800 grid grid-cols-4 gap-1 text-center font-mono text-[9px] shrink-0 bg-[#0F172A] text-slate-300 rounded-b-[36px]">
                    <button
                      onClick={() => setAppSimTab("portafolio")}
                      className={`py-1.5 flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                        appSimTab === "portafolio" ? "text-[#38BDF8] font-black scale-110" : "hover:text-white"
                      }`}
                    >
                      <PieChart className="w-3.5 h-3.5" />
                      <span>Inicio</span>
                    </button>

                    <button
                      onClick={() => setAppSimTab("ticket")}
                      className={`py-1.5 flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                        appSimTab === "ticket" ? "text-[#F08D17] font-black scale-110" : "hover:text-white"
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      <span>Ticket</span>
                    </button>

                    <button
                      onClick={() => setAppSimTab("estados")}
                      className={`py-1.5 flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                        appSimTab === "estados" ? "text-[#34D399] font-black scale-110" : "hover:text-white"
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>

                    <button
                      onClick={() => setAppSimTab("asesor")}
                      className={`py-1.5 flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                        appSimTab === "asesor" ? "text-[#3A8F93] font-black scale-110" : "hover:text-white"
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Asesor</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 05: DASHBOARD INTERACTIVO "ESTILO EXCEL" + GRÁFICO PASTEL + SLIDERS
  // --------------------------------------------------------------------------
  if (secId === "sec-calculadora-inversion" || title.includes("Calculadora Rendimiento")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-10"
        >
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec5_badge" defaultText="05. SIMULADOR INTERACTIVO & EXCEL FINANCIAL DASHBOARD" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec5_h2" defaultText="Calculadora de Rendimiento & Dashboard Estilo Excel" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField id="sec5_desc" defaultText="Ajusta cualquiera de los 4 deslizadores para mover el gráfico pastel y la hoja de cálculo en tiempo real." />
            </p>
          </div>

          {/* TOP MULTI-BAR PARAMETER CONTROL SUITE */}
          <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-6 h-6 text-[#F08D17]" />
                <h3 className="font-extrabold text-base sm:text-lg text-[#0F172A] font-mono uppercase">
                  SUITE DE BARRAS DESLIZANTES & CONTROL DINÁMICO DE VALORES
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#64748B]">Modo Interés:</span>
                <button
                  onClick={() => setCalcCompound(!calcCompound)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    calcCompound ? "bg-[#004F54] text-white" : "bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1]"
                  }`}
                >
                  {calcCompound ? "⚡ Compuesto (Re-inversión)" : "Simple (Retiro Mensual)"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Slider 1: Capital Inicial */}
              <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <div className="flex justify-between text-xs sm:text-sm font-extrabold">
                  <span className="text-[#0F172A]">1. Capital Inicial:</span>
                  <span className="font-mono text-[#004F54] text-base">${calcAmount.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full accent-[#004F54] cursor-pointer h-2.5"
                />
                <span className="text-[10px] text-[#64748B] font-mono block">$10k a $1,000,000 USD</span>
              </div>

              {/* Slider 2: Tasa Anual Retorno */}
              <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <div className="flex justify-between text-xs sm:text-sm font-extrabold">
                  <span className="text-[#0F172A]">2. Tasa Anual:</span>
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
                <span className="text-[10px] text-[#64748B] font-mono block">Rango: 7.5% a 16.0% p.a.</span>
              </div>

              {/* Slider 3: Asignación Mutuos */}
              <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <div className="flex justify-between text-xs sm:text-sm font-extrabold">
                  <span className="text-[#0F172A]">3. % Mutuos:</span>
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
                <span className="text-[10px] text-[#004F54] font-mono font-bold block">¡Mueve el Gráfico Pastel!</span>
              </div>

              {/* Slider 4: Plazo en Días */}
              <div className="space-y-2 bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <div className="flex justify-between text-xs sm:text-sm font-extrabold">
                  <span className="text-[#0F172A]">4. Plazo Duración:</span>
                  <span className="font-mono text-[#006B70] text-base">{calcTermDays} Días</span>
                </div>
                <div className="grid grid-cols-4 gap-1 pt-1">
                  {[90, 180, 360, 720].map((d) => (
                    <button
                      key={d}
                      onClick={() => setCalcTermDays(d)}
                      className={`py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                        calcTermDays === d ? "bg-[#004F54] text-white" : "bg-white text-[#0F172A] border border-[#CBD5E1]"
                      }`}
                    >
                      {d === 720 ? "2 Años" : `${d}d`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DUAL INTERACTIVE PANEL: ANIMATED DONUT CHART + EXCEL SPREADSHEET */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Dynamic SVG Donut Chart */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-6 text-center">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 text-left">
                <div>
                  <h3 className="font-extrabold text-base text-[#0F172A]">Distribución Portafolio</h3>
                  <span className="text-xs text-[#64748B] font-mono">Gráfico Pastel Animado</span>
                </div>
                <PieChart className="w-5 h-5 text-[#004F54]" />
              </div>

              <DynamicDonutChart
                allocations={pieAllocations}
                totalUsd={calcAmount}
                totalYield={calculatedYield}
              />
            </div>

            {/* Right: Interactive Excel Financial Grid */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#004F54] shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#004F54] text-white flex items-center justify-center font-mono font-bold text-xs shadow-md">
                    XLS
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#0F172A] font-mono">Simulación_Inversión_Excel.xlsx</h3>
                    <span className="text-xs text-[#64748B]">Hoja de Cálculo Viva con Fórmulas</span>
                  </div>
                </div>

                <button
                  onClick={exportExcelCsv}
                  className="px-4 py-2 bg-[#004F54] hover:bg-[#006B70] text-white text-xs font-bold font-mono rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#F08D17]" />
                  <span>Exportar Excel (.CSV)</span>
                </button>
              </div>

              {/* Excel Table Grid */}
              <div className="overflow-x-auto border border-[#CBD5E1] rounded-xl font-mono text-xs shadow-sm">
                <table className="w-full text-left divide-y divide-[#E2E8F0]">
                  <thead className="bg-[#F1F5F9] text-[#475569] font-bold">
                    <tr>
                      <th className="p-2.5 border-r border-[#CBD5E1] text-center w-8">#</th>
                      <th className="p-2.5 border-r border-[#CBD5E1]">A · PRODUCTO</th>
                      <th className="p-2.5 border-r border-[#CBD5E1] text-right">B · ASIGNACIÓN</th>
                      <th className="p-2.5 border-r border-[#CBD5E1] text-right">C · TASA</th>
                      <th className="p-2.5 border-r border-[#CBD5E1] text-right">D · INTERÉS (USD)</th>
                      <th className="p-2.5 text-right">E · MONTO FINAL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] bg-white text-[#0F172A]">
                    <tr className="hover:bg-[#004F54]/5 transition-colors">
                      <td className="p-2.5 border-r border-[#CBD5E1] text-center bg-[#F8FAFC] font-bold text-[#64748B]">1</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] font-bold">Mutuo Estructurado Excel</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right text-[#F08D17] font-bold">{mutuoPct}% (${Math.round(calcAmount * (mutuoPct/100)).toLocaleString()})</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right text-[#F08D17] font-bold">{(currentRate * 100).toFixed(1)}%</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right font-bold text-[#004F54]">${(calculatedYield * (mutuoPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                      <td className="p-2.5 text-right font-extrabold">${(calcAmount * (mutuoPct / 100) + calculatedYield * (mutuoPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    </tr>
                    <tr className="hover:bg-[#004F54]/5 transition-colors">
                      <td className="p-2.5 border-r border-[#CBD5E1] text-center bg-[#F8FAFC] font-bold text-[#64748B]">2</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] font-bold">Fondo Inmobiliario Excel II</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right">{inmoPct}% (${Math.round(calcAmount * (inmoPct/100)).toLocaleString()})</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right text-[#004F54] font-bold">8.5%</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right font-bold text-[#004F54]">${(calculatedYield * (inmoPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                      <td className="p-2.5 text-right font-extrabold">${(calcAmount * (inmoPct / 100) + calculatedYield * (inmoPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    </tr>
                    <tr className="hover:bg-[#004F54]/5 transition-colors">
                      <td className="p-2.5 border-r border-[#CBD5E1] text-center bg-[#F8FAFC] font-bold text-[#64748B]">3</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] font-bold">Fondo Abierto Liquidez ESAFI</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right">{esafiPct}% (${Math.round(calcAmount * (esafiPct/100)).toLocaleString()})</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right text-[#006B70] font-bold">7.5%</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right font-bold text-[#004F54]">${(calculatedYield * (esafiPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                      <td className="p-2.5 text-right font-extrabold">${(calcAmount * (esafiPct / 100) + calculatedYield * (esafiPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    </tr>
                    <tr className="hover:bg-[#004F54]/5 transition-colors">
                      <td className="p-2.5 border-r border-[#CBD5E1] text-center bg-[#F8FAFC] font-bold text-[#64748B]">4</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] font-bold">Renta Fija & Sell-Backs</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right">{rfPct}% (${Math.round(calcAmount * (rfPct/100)).toLocaleString()})</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right text-[#006B70] font-bold">9.0%</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right font-bold text-[#004F54]">${(calculatedYield * (rfPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                      <td className="p-2.5 text-right font-extrabold">${(calcAmount * (rfPct / 100) + calculatedYield * (rfPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    </tr>
                    <tr className="bg-[#004F54]/10 font-bold border-t-2 border-[#004F54]">
                      <td className="p-2.5 border-r border-[#CBD5E1] text-center bg-[#004F54] text-white">∑</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-[#004F54] uppercase">TOTALES CONSOLIDADOS</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right text-[#004F54]">100% (${calcAmount.toLocaleString()})</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right text-[#F08D17]">{(currentRate * 100).toFixed(1)}% p.a.</td>
                      <td className="p-2.5 border-r border-[#CBD5E1] text-right text-[#004F54] font-black">${calculatedYield.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                      <td className="p-2.5 text-right text-[#0F172A] font-black">${calculatedTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Automated 15-Day Renewal Alert Simulation */}
              <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FCD34D] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#92400E] shrink-0" />
                  <span className="text-xs sm:text-sm text-[#0F172A] font-bold">
                    Alerta Vencimiento 15 Días: Notificación automática con opción de re-pago a Tasa del {(currentRate * 100).toFixed(1)}%.
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#92400E] bg-[#FCD34D]/40 px-2.5 py-1 rounded-lg shrink-0">
                  ACTIVO 24/7
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 06: INTEGRACIÓN DYNAMICS CRM & SIFI FONDOS (DIAGRAMA INTERACTIVO PRO)
  // --------------------------------------------------------------------------
  if (secId === "sec-integracion-crm-sifi" || title.includes("Integración Dynamics")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-10"
        >
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec6_badge" defaultText="06. ARQUITECTURA DE INTEGRACIÓN CENTRAL" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec6_h2" defaultText="Enrutamiento Inteligente — Dynamics CRM & SIFI Fondos" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField id="sec6_desc" defaultText="Toca los pasos del diagrama o presiona 'Simular Transmisión' para ver cómo viajan los datos entre sistemas." />
            </p>
          </div>

          {/* Dual Flow Selector & Simulation Trigger Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveFlowTab("epb");
                  setSelectedFlowStep(1);
                  setTransmissionSuccess(false);
                }}
                className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer ${
                  activeFlowTab === "epb"
                    ? "bg-[#004F54] text-white shadow-xl scale-105"
                    : "bg-white text-[#0F172A] border border-[#CBD5E1] hover:border-[#004F54]"
                }`}
              >
                Flujo EPB (Puesto de Bolsa &rarr; Dynamics 365 CRM)
              </button>
              <button
                onClick={() => {
                  setActiveFlowTab("esafi");
                  setSelectedFlowStep(1);
                  setTransmissionSuccess(false);
                }}
                className={`py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer ${
                  activeFlowTab === "esafi"
                    ? "bg-[#006B70] text-white shadow-xl scale-105"
                    : "bg-white text-[#0F172A] border border-[#CBD5E1] hover:border-[#006B70]"
                }`}
              >
                Flujo ESAFI (Fondos Abiertos &rarr; SIFI Fondos)
              </button>
            </div>

            <button
              onClick={triggerTransmissionSimulation}
              disabled={isSimulatingTransmission}
              className="px-5 py-3 rounded-2xl bg-[#F08D17] hover:bg-[#d87c0f] text-white font-extrabold text-xs font-mono shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Zap className={`w-4 h-4 ${isSimulatingTransmission ? "animate-spin" : ""}`} />
              <span>{isSimulatingTransmission ? "Transmitiendo Datos..." : "⚡ Simular Transmisión de Orden"}</span>
            </button>
          </div>

          {/* Interactive Step-by-Step Diagram Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-8">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-4">
                <Database className="w-7 h-7 text-[#004F54]" />
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A]">
                    {activeFlowTab === "epb" ? "Flujo Operaciones Excel Puesto de Bolsa (EPB)" : "Flujo Operaciones Excel SAFI (Fondos Abiertos ESAFI)"}
                  </h3>
                  <span className="text-xs text-[#64748B]">Arquitectura con Conector Bidireccional RESTful</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  {activeFlowTab === "epb" ? "🟢 Dynamics CRM ONLINE (SLA 99.9%)" : "🟢 SIFI Webhook ONLINE (Latencia < 40ms)"}
                </span>
              </div>
            </div>

            {/* Visual Step Process Stepper with Animated Connectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* STEP 1 */}
              <div
                onClick={() => setSelectedFlowStep(1)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                  selectedFlowStep === 1
                    ? "bg-[#004F54]/5 border-2 border-[#004F54] shadow-xl ring-2 ring-[#004F54]/20 scale-102"
                    : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#004F54]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-[#004F54] bg-[#004F54]/10 px-2.5 py-1 rounded-full">
                    PASO 01
                  </span>
                  <Smartphone className="w-6 h-6 text-[#004F54]" />
                </div>
                <h4 className="font-extrabold text-base text-[#0F172A]">
                  {activeFlowTab === "epb" ? "Solicitud del Inversionista" : "Solicitud de Aporte / Rescate"}
                </h4>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {activeFlowTab === "epb"
                    ? "Pacto de Mutuo o Renta Fija con firma fehaciente por FaceID desde App Móvil."
                    : "Inversionista solicita movimiento sobre su encargo de fondo abierto en la App."}
                </p>
              </div>

              {/* STEP 2 */}
              <div
                onClick={() => setSelectedFlowStep(2)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                  selectedFlowStep === 2
                    ? "bg-[#F08D17]/5 border-2 border-[#F08D17] shadow-xl ring-2 ring-[#F08D17]/20 scale-102"
                    : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#F08D17]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-[#F08D17] bg-[#F08D17]/10 px-2.5 py-1 rounded-full">
                    PASO 02
                  </span>
                  <Zap className="w-6 h-6 text-[#F08D17]" />
                </div>
                <h4 className="font-extrabold text-base text-[#0F172A]">
                  {activeFlowTab === "epb" ? "Conector CRM & Expediente IA" : "Notificación & Carga SIFI"}
                </h4>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {activeFlowTab === "epb"
                    ? "Motor genera Oportunidad vinculada al titular e informe de intención analizado por IA."
                    : "Servicio notifica al área de operaciones e integra la orden en SIFI Fondos."}
                </p>
              </div>

              {/* STEP 3 */}
              <div
                onClick={() => setSelectedFlowStep(3)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 relative ${
                  selectedFlowStep === 3
                    ? "bg-[#006B70]/5 border-2 border-[#006B70] shadow-xl ring-2 ring-[#006B70]/20 scale-102"
                    : "bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#006B70]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-[#006B70] bg-[#006B70]/10 px-2.5 py-1 rounded-full">
                    PASO 03
                  </span>
                  <CheckCircle2 className="w-6 h-6 text-[#006B70]" />
                </div>
                <h4 className="font-extrabold text-base text-[#0F172A]">
                  {activeFlowTab === "epb" ? "Cierre Comercial & Registro" : "Confirmación Inmediata"}
                </h4>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {activeFlowTab === "epb"
                    ? "Ejecutivo de cartera aprueba en Dynamics 365 e instruye liquidación final."
                    : "Cliente recibe comprobante de procesamiento con sello de tiempo."}
                </p>
              </div>
            </div>

            {/* Transmission Simulation Success Banner */}
            {transmissionSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between text-emerald-900 font-mono text-xs font-bold shadow-md"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    {activeFlowTab === "epb"
                      ? "✅ Transmisión Exitosa: Oportunidad autogestionada en Microsoft Dynamics 365 CRM (#OPP-2026-9912)"
                      : "✅ Transmisión Exitosa: Orden de Aporte cargada en SIFI Fondos (#ORD-2026-4092)"}
                  </span>
                </div>
                <span className="bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-lg">HTTP 201 Created</span>
              </motion.div>
            )}

            {/* EXECUTIVE VISUAL DATA INSPECTOR (Ficha Ejecutiva Visual del Expediente IA & SIFI) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#004F54] shadow-2xl space-y-6">
              {/* Header Bar */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#E2E8F0] pb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#004F54] text-white flex items-center justify-center font-bold shadow-md">
                    {activeFlowTab === "epb" ? <Bot className="w-5 h-5 text-[#F08D17]" /> : <Zap className="w-5 h-5 text-[#F08D17]" />}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg text-[#0F172A]">
                      {activeFlowTab === "epb"
                        ? "Ficha Ejecutiva — Expediente Comercial IA Dynamics 365"
                        : "Ficha Ejecutiva — Registro Operativo SIFI Fondos"}
                    </h4>
                    <span className="text-xs text-[#64748B] font-mono">
                      {activeFlowTab === "epb" ? "Resumen de datos procesados para Dynamics 365 CRM" : "Resumen de datos integrados en el Core SIFI"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-extrabold text-[#004F54] bg-[#004F54]/10 px-3 py-1 rounded-full border border-[#004F54]/30">
                    Paso 0{selectedFlowStep} Seleccionado
                  </span>
                </div>
              </div>

              {/* EPB Executive Card View */}
              {activeFlowTab === "epb" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Column 1: Titular Info */}
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
                      <div className="w-10 h-10 rounded-full bg-[#004F54] text-white font-bold text-sm flex items-center justify-center shadow-md">
                        JP
                      </div>
                      <div>
                        <h5 className="font-extrabold text-sm text-[#0F172A]">Juan Pérez</h5>
                        <span className="text-xs text-[#64748B] font-mono">RNC: 001-XXXX-X</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <span className="text-[#64748B] font-bold block font-mono">PERFIL KYC SIMV:</span>
                      <span className="font-bold text-[#004F54] bg-[#004F54]/10 px-2.5 py-1 rounded-lg inline-block">
                        Conservador / Renta Fija
                      </span>
                    </div>
                  </div>

                  {/* Column 2: Order Details */}
                  <div className="p-5 rounded-2xl bg-[#FFFBEB] border border-[#FCD34D] space-y-3">
                    <div className="border-b border-[#FCD34D] pb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#92400E] font-mono uppercase">SOLICITUD DIGITAL</span>
                      <span className="text-[10px] font-mono font-bold bg-[#F08D17] text-white px-2 py-0.5 rounded">EXCEL EPB</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">Renovación Mutuo Estructurado</p>
                      <p className="text-2xl font-black text-[#004F54] font-mono mt-1">${calcAmount.toLocaleString()} USD</p>
                      <span className="text-xs font-mono font-bold text-[#F08D17] block mt-1">
                        Tasa: {(currentRate * 100).toFixed(1)}% p.a. • Plazo: {calcTermDays} Días
                      </span>
                    </div>
                  </div>

                  {/* Column 3: AI & Security Score */}
                  <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#A7F3D0] space-y-3">
                    <div className="border-b border-[#A7F3D0] pb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#166534] font-mono uppercase">IA & SEGURIDAD SIMV</span>
                      <ShieldCheck className="w-4 h-4 text-[#166534]" />
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#334155] font-bold">Firma FaceID:</span>
                        <span className="font-bold text-[#166534] font-mono">✔ Verificada</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#334155] font-bold">Score Retención IA:</span>
                        <span className="font-bold text-[#166534] font-mono">94.8% (Alto)</span>
                      </div>
                      <div className="w-full bg-[#A7F3D0] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#166534] h-full rounded-full w-[95%]" />
                      </div>
                      <span className="text-[10px] text-[#15803D] font-mono font-bold block pt-1">
                        Oportunidad Autocreada en Dynamics 365
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* ESAFI Executive Card View */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Column 1: Encargo & Fondo */}
                  <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                    <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
                      <div className="w-10 h-10 rounded-full bg-[#006B70] text-white font-bold text-sm flex items-center justify-center shadow-md">
                        <Database className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-extrabold text-sm text-[#0F172A]">Encargo #ENC-4092</h5>
                        <span className="text-xs text-[#64748B] font-mono">Fondo Abierto Liquidez</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <span className="text-[#64748B] font-bold block font-mono">TITULAR REGISTRADO:</span>
                      <span className="font-bold text-[#0F172A]">Juan Pérez (RNC 001-XXXX-X)</span>
                    </div>
                  </div>

                  {/* Column 2: Order Details */}
                  <div className="p-5 rounded-2xl bg-[#F0FDFA] border border-[#99F6E4] space-y-3">
                    <div className="border-b border-[#99F6E4] pb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0F766E] font-mono uppercase">APORTE INMEDIATO</span>
                      <span className="text-[10px] font-mono font-bold bg-[#006B70] text-white px-2 py-0.5 rounded">ESAFI</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#0F172A]">Fondo Abierto Liquidez Excel</p>
                      <p className="text-2xl font-black text-[#006B70] font-mono mt-1">$15,000.00 USD</p>
                      <span className="text-xs font-mono font-bold text-[#0F766E] block mt-1">
                        Cuotas Calculadas: 1,240.50 Cuotas
                      </span>
                    </div>
                  </div>

                  {/* Column 3: SIFI Integration Health */}
                  <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#A7F3D0] space-y-3">
                    <div className="border-b border-[#A7F3D0] pb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#166534] font-mono uppercase">ESTATUS SIFI FONDOS</span>
                      <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#334155] font-bold">Horario Operacional:</span>
                        <span className="font-bold text-[#166534] font-mono">✔ Válido SIMV</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#334155] font-bold">Webhook Directo:</span>
                        <span className="font-bold text-[#166534] font-mono">HTTP 201 Created</span>
                      </div>
                      <span className="text-[10px] text-[#15803D] font-mono font-bold block pt-1 bg-[#A7F3D0]/40 p-1.5 rounded-lg text-center">
                        Carga Directa Completada Sin Manuales
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 07: DASHBOARD DE SUPERVISIÓN OPERATIVA & MÉTRICAS KPI (HIPER-INTERACTIVO)
  // --------------------------------------------------------------------------
  if (secId === "sec-supervision-dashboards" || title.includes("Dashboards Operativos")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-10"
        >
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec7_badge" defaultText="07. DASHBOARD DE CONTROL OPERATIVO & SIMV" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec7_h2" defaultText="Supervisión Operativa & Métricas KPI en Tiempo Real" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField id="sec7_desc" defaultText="Toca cualquier tarjeta KPI o cambia el período para sincronizar automáticamente el gráfico y la bitácora en tiempo real." />
            </p>
          </div>

          {/* Time Period Filter Bar & Live Feed Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#004F54]" />
              <span className="text-xs font-mono font-bold text-[#0F172A]">Período de Análisis:</span>
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
                        ? "bg-[#004F54] text-white shadow-md"
                        : "bg-white text-[#334155] border border-[#CBD5E1] hover:border-[#004F54]"
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
                  isLiveFeedActive ? "bg-[#F0FDF4] text-[#166534] border border-[#A7F3D0]" : "bg-[#F1F5F9] text-[#64748B] border border-[#CBD5E1]"
                }`}
              >
                <Radio className={`w-3.5 h-3.5 ${isLiveFeedActive ? "text-[#166534] animate-pulse" : "text-[#64748B]"}`} />
                <span>{isLiveFeedActive ? "● Monitoreo en Vivo (ACTIVO)" : "⏸ Pausado"}</span>
              </button>
            </div>
          </div>

          {/* 4 INTERACTIVE KPI CARDS THAT DIRECTLY FILTER THE CHART & LOGS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* KPI CARD 1 */}
            <div
              onClick={() => {
                setSelectedKpiCard(1);
                setSelectedMonthIdx(0);
              }}
              className={`p-6 rounded-3xl bg-white border transition-all cursor-pointer space-y-4 ${
                selectedKpiCard === 1
                  ? "border-2 border-[#004F54] shadow-2xl ring-2 ring-[#004F54]/20 scale-102"
                  : "border-[#E2E8F0] shadow-xl hover:border-[#004F54]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#004F54]/10 text-[#004F54] flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#004F54] bg-[#004F54]/10 px-2.5 py-1 rounded-full">
                  {currentKpis.usersTrend}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono font-extrabold uppercase text-[#64748B] block">KPI 01</span>
                <h4 className="text-sm font-extrabold text-[#0F172A]">Usuarios Activos 24/7</h4>
                <p className="text-3xl font-black text-[#0F172A] font-mono mt-1">{currentKpis.users}</p>
                <span className="text-xs text-[#004F54] font-mono font-bold block mt-1">{currentKpis.usersSub}</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#004F54] h-full rounded-full w-[85%]" />
              </div>
            </div>

            {/* KPI CARD 2 */}
            <div
              onClick={() => {
                setSelectedKpiCard(2);
                setSelectedMonthIdx(0);
              }}
              className={`p-6 rounded-3xl bg-white border transition-all cursor-pointer space-y-4 ${
                selectedKpiCard === 2
                  ? "border-2 border-[#004F54] shadow-2xl ring-2 ring-[#004F54]/20 scale-102"
                  : "border-[#E2E8F0] shadow-xl hover:border-[#004F54]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#006B70]/10 text-[#006B70] flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#006B70] bg-[#006B70]/10 px-2.5 py-1 rounded-full">
                  {currentKpis.responseTrend}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono font-extrabold uppercase text-[#64748B] block">KPI 02</span>
                <h4 className="text-sm font-extrabold text-[#0F172A]">Tiempo Promedio Respuesta</h4>
                <p className="text-3xl font-black text-[#004F54] font-mono mt-1">{currentKpis.responseTime}</p>
                <span className="text-xs text-[#006B70] font-mono font-bold block mt-1">{currentKpis.responseSub}</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#006B70] h-full rounded-full w-[94%]" />
              </div>
            </div>

            {/* KPI CARD 3 */}
            <div
              onClick={() => {
                setSelectedKpiCard(3);
                setSelectedMonthIdx(0);
              }}
              className={`p-6 rounded-3xl bg-white border transition-all cursor-pointer space-y-4 ${
                selectedKpiCard === 3
                  ? "border-2 border-[#F08D17] shadow-2xl ring-2 ring-[#F08D17]/20 scale-102"
                  : "border-[#E2E8F0] shadow-xl hover:border-[#F08D17]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#F08D17]/10 text-[#F08D17] flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-[#F08D17] bg-[#F08D17]/10 px-2.5 py-1 rounded-full">
                  {currentKpis.productivTrend}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono font-extrabold uppercase text-[#64748B] block">KPI 03</span>
                <h4 className="text-sm font-extrabold text-[#0F172A]">Productividad Comercial</h4>
                <p className="text-3xl font-black text-[#F08D17] font-mono mt-1">{currentKpis.productiv}</p>
                <span className="text-xs text-[#64748B] font-mono font-bold block mt-1">{currentKpis.productivSub}</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#F08D17] h-full rounded-full w-[78%]" />
              </div>
            </div>

            {/* KPI CARD 4 */}
            <div
              onClick={() => {
                setSelectedKpiCard(4);
                setSelectedMonthIdx(0);
              }}
              className={`p-6 rounded-3xl bg-white border transition-all cursor-pointer space-y-4 ${
                selectedKpiCard === 4
                  ? "border-2 border-[#004F54] shadow-2xl ring-2 ring-[#004F54]/20 scale-102"
                  : "border-[#E2E8F0] shadow-xl hover:border-[#004F54]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  {currentKpis.simvAuditTrend}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono font-extrabold uppercase text-[#64748B] block">KPI 04</span>
                <h4 className="text-sm font-extrabold text-[#0F172A]">Auditoría & SIMV ISO 27002</h4>
                <p className="text-3xl font-black text-[#0F172A] font-mono mt-1">{currentKpis.simvAudit}</p>
                <span className="text-xs text-[#004F54] font-mono font-bold block mt-1">{currentKpis.simvAuditSub}</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full w-full" />
              </div>
            </div>
          </div>

          {/* DUAL DYNAMICALLY RE-RENDERED PANEL: CHART + AUDIT LOG FEED */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Dynamic SVG Bar Chart Visualizer */}
            <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div>
                  <h3 className="font-extrabold text-lg text-[#0F172A]">{currentChart.title}</h3>
                  <span className="text-xs text-[#64748B] font-mono">{currentChart.subtitle}</span>
                </div>
                <BarChart3 className="w-6 h-6 text-[#004F54]" />
              </div>

              {/* SVG Animated Bar Chart */}
              <div className="space-y-4">
                <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-[#E2E8F0]">
                  {currentChart.bars.map((data, idx) => {
                    const isSelected = safeMonthIdx === idx;
                    const barHeightPercent = Math.min((data.val / currentChart.maxVal) * 100, 100);

                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedMonthIdx(idx)}
                        className="flex-1 flex flex-col items-center gap-2 group cursor-pointer h-full justify-end"
                      >
                        <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-[#004F54]" : "text-[#64748B]"}`}>
                          {data.val} {currentChart.unit === "$M USD" ? "M" : ""}
                        </span>
                        <div
                          style={{ height: `${Math.max(barHeightPercent, 12)}%` }}
                          className={`w-full rounded-t-xl transition-all duration-300 ${
                            isSelected
                              ? "bg-[#004F54] shadow-lg scale-105"
                              : "bg-[#004F54]/20 hover:bg-[#004F54]/40"
                          }`}
                        />
                        <span className={`text-xs font-bold font-mono ${isSelected ? "text-[#004F54]" : "text-[#64748B]"}`}>
                          {data.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Item Detail Drawer */}
                {currentSelectedBar && (
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[#64748B] font-bold block">ELEMENTO SELECCIONADO:</span>
                      <span className="text-sm font-extrabold text-[#004F54]">{currentSelectedBar.label}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] font-bold block">MÉTRICA 1:</span>
                      <span className="text-sm font-extrabold text-[#F08D17]">{currentSelectedBar.detail1}</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] font-bold block">MÉTRICA 2:</span>
                      <span className="text-sm font-extrabold text-[#006B70]">{currentSelectedBar.detail2}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Dynamic Audit Feed (Filtered by KPI Card & Period) */}
            <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-2.5">
                  <Activity className="w-5 h-5 text-[#004F54]" />
                  <div>
                    <h3 className="font-extrabold text-base text-[#0F172A]">Bitácora de Eventos KPI 0{selectedKpiCard}</h3>
                    <span className="text-[10px] text-[#64748B] font-mono">Filtro: {kpiPeriodTab.toUpperCase()}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#166534] bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                  ● En Vivo
                </span>
              </div>

              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 text-xs">
                {currentLogs.map((log, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                      <span>{log.time}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${log.badgeColor}`}>
                        {log.status}
                      </span>
                    </div>
                    <p className="font-bold text-[#0F172A]">{log.title}</p>
                    <span className="text-[10px] text-[#004F54] font-mono block">{log.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 08: Equipo Especialista & Cronograma
  // --------------------------------------------------------------------------
  if (secId === "sec-equipo-cronograma" || title.includes("Equipo Especialista")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-10"
        >
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec8_badge" defaultText="08. ESTRUCTURA DE EJECUCIÓN" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec8_h2" defaultText="Equipo Especialista & Cronograma (8-12 Semanas)" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField id="sec8_desc" defaultText="Equipo multidisciplinario asignado y plan de trabajo estructurado por entregables valorados." />
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposal.team.map((member, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#004F54]/10 border border-[#004F54]/30 flex items-center justify-center text-[#004F54] shrink-0 font-bold">
                    <UserCheck className="w-6 h-6 text-[#F08D17]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-[#0F172A]">{member.role}</h3>
                    <span className="text-xs text-[#004F54] font-mono font-bold">{member.category} • {member.dedicationPercent}% Dedicación</span>
                  </div>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#334155] pl-2">
                  {member.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx}>• {resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 09: Propuesta Económica & Inversión
  // --------------------------------------------------------------------------
  if (secId === "sec-propuesta-economica" || title.includes("Propuesta Económica")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-10"
        >
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec9_badge" defaultText="09. ESQUEMA DE INVERSIÓN" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec9_h2" defaultText="Propuesta Económica & Desglose de Costos" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField id="sec9_desc" defaultText="Esquema transparente configurado en USD según las especificaciones del requerimiento." />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bloque 1: Inversión Única */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#004F54] shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A]">Inversión Única de Implementación</h3>
                  <span className="text-sm text-[#004F54] font-mono font-bold">Desarrollo Web, App & Integración Dynamics/SIFI</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl sm:text-4xl font-black text-[#0F172A] font-mono">USD 5,000</span>
                  <span className="text-xs text-[#64748B] font-mono block font-bold">+ 18% ITBIS (USD 900)</span>
                </div>
              </div>

              <ul className="space-y-3 text-sm sm:text-base text-[#334155] font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004F54] shrink-0 mt-0.5" />
                  <span>Desarrollo completo del portal web Next.js y app móvil multiplataforma.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004F54] shrink-0 mt-0.5" />
                  <span>Integración de conectores bidireccionales con Microsoft Dynamics CRM & SIFI.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#004F54] shrink-0 mt-0.5" />
                  <span>Desarrollo de las 7 Épicas funcionales, Trade Ticket digital y expedientes IA.</span>
                </li>
              </ul>
            </div>

            {/* Bloque 2: Recurrente Mensual */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A]">Recurrente Mensual</h3>
                  <span className="text-sm text-[#006B70] font-mono font-bold">Operación, Mantenimiento & Soporte SLA</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl sm:text-4xl font-black text-[#006B70] font-mono">USD 1,195 / mo</span>
                  <span className="text-xs text-[#64748B] font-mono block font-bold">Licencias + Soporte SIMV</span>
                </div>
              </div>

              <ul className="space-y-3 text-sm sm:text-base text-[#334155] font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#006B70] shrink-0 mt-0.5" />
                  <span>Licenciamiento del motor de autogestión, notificaciones y resúmenes IA.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#006B70] shrink-0 mt-0.5" />
                  <span>Mantenimiento correctivo/evolutivo, parches de seguridad e infraestructura cloud.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#006B70] shrink-0 mt-0.5" />
                  <span>Soporte técnico con SLA prioritario y monitoreo continuo 24/7.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-xl">
            <h4 className="font-extrabold text-base text-[#004F54] uppercase font-mono mb-4">
              CONDICIONES & HITOS DE PAGO (INVERSIÓN ÚNICA)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm sm:text-base">
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 shadow-sm">
                <span className="font-extrabold text-[#004F54] font-mono block text-lg">50% (USD 2,500)</span>
                <span className="text-[#334155] font-medium">Aprobación de la propuesta y firma de contrato.</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 shadow-sm">
                <span className="font-extrabold text-[#004F54] font-mono block text-lg">40% (USD 2,000)</span>
                <span className="text-[#334155] font-medium">Entrega de desarrollo core y pruebas UAT.</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1 shadow-sm">
                <span className="font-extrabold text-[#004F54] font-mono block text-lg">10% (USD 500)</span>
                <span className="text-[#334155] font-medium">Pase a producción y aceptación final.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 10: Sobre ENFOCO S.R.L. & Certificaciones
  // --------------------------------------------------------------------------
  if (secId === "sec-sobre-enfoco-certificaciones" || title.includes("Sobre ENFOCO")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-10"
        >
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec10_badge" defaultText="10. SOBRE ENFOCO S.R.L. · PERFIL CORPORATIVO & CERTIFICACIONES" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec10_h2" defaultText="Más de 10 Años Impulsando la Transformación Digital" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField id="sec10_desc" defaultText="Especialistas en desarrollo de software a la medida, automatización de procesos complejos y gobierno de datos para los sectores financiero, seguros y salud." />
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#004F54]/10 border border-[#004F54]/20 flex items-center justify-center text-[#004F54]">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-[#0F172A]">Perfil & Trayectoria</h3>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                Empresa con sede en República Dominicana y más de 10 años en el mercado. Ejecutamos proyectos presenciales y remotos garantizando el acompañamiento continuo en cada fase.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F08D17]/10 border border-[#F08D17]/20 flex items-center justify-center text-[#F08D17]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-[#0F172A]">Filosofía Empresarial</h3>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                Nuestra misión es ser el mejor aliado tecnológico de nuestros clientes, fundamentados en valores de Innovación, Liderazgo, Integridad, Compromiso y Lealtad.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#004F54]/10 border border-[#004F54]/20 flex items-center justify-center text-[#004F54]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-[#0F172A]">Calidad & Continuidad</h3>
              <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                Equipo multidisciplinario certificado en gestión de proyectos PMI, arquitectura de software, metodologías Ágiles (Scrum), BCP (Continuidad) y DRP (Recuperación).
              </p>
            </div>
          </div>

          {/* Certifications & Frameworks Showcase */}
          <div className="p-8 rounded-3xl bg-white border-2 border-[#004F54] shadow-xl space-y-6">
            <h3 className="font-extrabold text-base sm:text-lg uppercase font-mono text-[#004F54] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F08D17]" />
              <span>Estándares de Calidad & Certificaciones Internacionales</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-1">
                <span className="text-xs font-mono font-bold text-[#004F54] block">ISO 27001 / 27002</span>
                <span className="text-[10px] text-[#64748B]">Seguridad de Información</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-1">
                <span className="text-xs font-mono font-bold text-[#004F54] block">ISO 9001</span>
                <span className="text-[10px] text-[#64748B]">Gestión de Calidad</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-1">
                <span className="text-xs font-mono font-bold text-[#004F54] block">DAMA CDMP</span>
                <span className="text-[10px] text-[#64748B]">Gobierno de Datos</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-1">
                <span className="text-xs font-mono font-bold text-[#004F54] block">CMMI & COBIT</span>
                <span className="text-[10px] text-[#64748B]">Ingeniería de Software</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-1">
                <span className="text-xs font-mono font-bold text-[#004F54] block">ITIL v4</span>
                <span className="text-[10px] text-[#64748B]">Servicios de TI</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-1">
                <span className="text-xs font-mono font-bold text-[#004F54] block">PMI & Agile</span>
                <span className="text-[10px] text-[#64748B]">Metodología Ágil</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 11: Experiencia en Proyectos Similares
  // --------------------------------------------------------------------------
  if (secId === "sec-experiencia-proyectos" || title.includes("Experiencia en Proyectos")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-6xl mx-auto w-full space-y-10"
        >
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec11_badge" defaultText="11. CASOS DE ÉXITO & EXPERIENCIA DEMOSTRADA" />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A]">
              <EditableField id="sec11_h2" defaultText="Experiencia Comprobada en Proyectos Similares" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
              <EditableField id="sec11_desc" defaultText="Casos de éxito desarrollados para grandes corporaciones e instituciones financieras en la República Dominicana." />
            </p>
          </div>

          {/* Featured Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project 1 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg space-y-4 hover:border-[#004F54] transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004F54]/10 text-[#004F54] flex items-center justify-center font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#0F172A]">App Somos Corripio</h3>
                    <span className="text-xs font-mono text-[#004F54]">Distribuidora Corripio</span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] font-bold font-mono">
                  PRODUCCIÓN
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#334155]">
                Aplicación móvil nativa para autogestión de empleados e inversionistas del grupo, catálogo interactivo, notificaciones push transaccionales y consulta de beneficios 24/7.
              </p>
            </div>

            {/* Project 2 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg space-y-4 hover:border-[#004F54] transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004F54]/10 text-[#004F54] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#0F172A]">App de Asegurados</h3>
                    <span className="text-xs font-mono text-[#004F54]">Humano Seguros</span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] font-bold font-mono">
                  PRODUCCIÓN
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#334155]">
                App móvil de alto volumen transaccional con carnet digital cifrado, consulta de pólizas en tiempo real, seguimiento de reclamaciones e integración con core bancario/asegurador.
              </p>
            </div>

            {/* Project 3 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg space-y-4 hover:border-[#004F54] transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004F54]/10 text-[#004F54] flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#0F172A]">App de Intermediarios</h3>
                    <span className="text-xs font-mono text-[#004F54]">Humano Seguros</span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] font-bold font-mono">
                  PRODUCCIÓN
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#334155]">
                Plataforma móvil y portal web para corredores e intermediarios comerciales, cotizaciones rápidas en línea, gestión de comisiones y flujo de aprobación de solicitudes.
              </p>
            </div>

            {/* Project 4 */}
            <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg space-y-4 hover:border-[#004F54] transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004F54]/10 text-[#004F54] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#0F172A]">Oficina Virtual OFV</h3>
                    <span className="text-xs font-mono text-[#004F54]">Humano Seguros</span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] font-bold font-mono">
                  PRODUCCIÓN
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#334155]">
                Modernización del portal web de autogestión corporativa con descarga masiva de estados de cuenta en PDF cifrados, validación fehaciente OTP y firma electrónica.
              </p>
            </div>
          </div>

          {/* Corporate Client Logos Showcase Grid */}
          <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-md space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-mono font-extrabold text-[#004F54] uppercase tracking-widest">
                PORTAFOLIO DE EMPRESAS LÍDERES QUE CONFÍAN EN ENFOCO, S.R.L.
              </span>
              <p className="text-xs text-[#64748B] font-medium">Soluciones empresariales de software a la medida en producción continua</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* 1. ARS Primera */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center space-y-3 hover:border-[#004F54] hover:shadow-lg transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <img src="/logos/ars_primera.png" alt="ARS Primera" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0F172A]">ARS Primera</h4>
                  <span className="text-[10px] text-[#004F54] font-mono font-bold block">Salud & Seguros</span>
                </div>
              </div>

              {/* 2. Humano Seguros */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center space-y-3 hover:border-[#004F54] hover:shadow-lg transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <img src="/logos/humano_seguros.png" alt="Humano Seguros" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0F172A]">Humano Seguros</h4>
                  <span className="text-[10px] text-[#004F54] font-mono font-bold block">Sector Asegurador</span>
                </div>
              </div>

              {/* 3. Distribuidora Corripio */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center space-y-3 hover:border-[#004F54] hover:shadow-lg transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <img src="/logos/corripio.png" alt="Distribuidora Corripio" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0F172A]">Corripio</h4>
                  <span className="text-[10px] text-[#004F54] font-mono font-bold block">Retail & Comercio</span>
                </div>
              </div>

              {/* 4. Grupo BHD */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center space-y-3 hover:border-[#004F54] hover:shadow-lg transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <img src="/logos/grupo_bhd.png" alt="Grupo BHD" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0F172A]">Grupo BHD</h4>
                  <span className="text-[10px] text-[#004F54] font-mono font-bold block">Servicios Financieros</span>
                </div>
              </div>

              {/* 5. CEPM */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center space-y-3 hover:border-[#004F54] hover:shadow-lg transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <img src="/logos/cepm.png" alt="CEPM" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0F172A]">CEPM</h4>
                  <span className="text-[10px] text-[#004F54] font-mono font-bold block">Sector Energía</span>
                </div>
              </div>

              {/* 6. Grupo Ramos */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center text-center space-y-3 hover:border-[#004F54] hover:shadow-lg transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                  <img src="/logos/grupo_ramos.png" alt="Grupo Ramos" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-[#0F172A]">Grupo Ramos</h4>
                  <span className="text-[10px] text-[#004F54] font-mono font-bold block">Supermercados & Retail</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // SECTION 12: Cierre & Firma Digital
  // --------------------------------------------------------------------------
  if (secId === "sec-cierre-acuerdo" || title.includes("Cierre & Firma")) {
    return (
      <section
        id={secId}
        className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 pt-24 pb-12 transition-colors duration-300"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={sectionContainerVariants}
          className="max-w-5xl mx-auto w-full text-center space-y-10 my-auto"
        >
          <div className="space-y-4">
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono px-4 py-1.5 rounded-full bg-[#004F54]/10 border border-[#004F54]/20 inline-block">
              <EditableField id="sec12_badge" defaultText="12. ACEPTACIÓN & CONCLUSIÓN" />
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A]">
              <EditableField id="sec10_h2" defaultText="Cierre & Firma Digital de Aceptación" />
            </h2>
            <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto leading-relaxed font-medium">
              <EditableField
                id="sec10_desc"
                defaultText="Al confirmar esta propuesta, formalizamos el inicio del proyecto de desarrollo web y app móvil para Excel Puesto de Bolsa y ESAFI."
              />
            </p>
          </div>

          <div className="p-10 rounded-3xl bg-[#FFFFFF] border-2 border-[#004F54] shadow-2xl space-y-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              <ShieldCheck className="w-10 h-10 text-[#004F54]" />
              <span className="font-extrabold text-2xl text-[#0F172A] font-display">Garantía de Satisfacción ENFOCO</span>
            </div>

            <p className="text-base text-[#334155] leading-relaxed font-medium">
              Incluye 60 días de garantía total posterior al pase a producción, acompañamiento personalizado y soporte técnico certificado.
            </p>

            <button
              onClick={onOpenAcceptModal}
              className="w-full py-5 px-10 rounded-2xl bg-[#004F54] hover:bg-[#006B70] text-white font-extrabold text-lg shadow-2xl shadow-[#004F54]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-4"
            >
              <CheckCircle2 className="w-6 h-6 text-[#F08D17]" />
              <span>Aceptar & Firmar Propuesta Digital</span>
            </button>
          </div>

          <div className="text-sm font-mono text-[#64748B] pt-6">
            ENFOCO, S.R.L. • RNC 1-31-44504-0 • jmartinez@enfoco.com.do • (809) 481-4035
          </div>
        </motion.div>
      </section>
    );
  }

  // Fallback Custom Section Renderer
  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#E2E8F0]"
    >
      <div className="max-w-5xl mx-auto w-full text-center space-y-4">
        <span className="text-xs sm:text-sm font-bold tracking-widest text-[#004F54] uppercase font-mono">
          SECCIÓN PERSONALIZADA
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0F172A]">
          <EditableField id={`sec_custom_title_${secId}`} defaultText={title} />
        </h2>
        <p className="text-base text-[#334155] max-w-xl mx-auto font-medium">
          Lienzo de sección interactiva.
        </p>
      </div>
    </section>
  );
};
