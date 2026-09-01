"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  PieChart,
  FileCode,
  Lock,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  CheckCircle2,
  FileText,
  Download,
} from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { formatAppCurrency, calculateYield } from "@/lib/financial";

interface AppSimulatorSectionProps {
  secId: string;
  initialTab?: "portafolio" | "ticket" | "estados" | "asesor";
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

const sectionItemVariants = {
  hidden: { opacity: 1, y: 0 },
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

export const AppSimulatorSection: React.FC<AppSimulatorSectionProps> = ({
  secId,
  initialTab = "portafolio",
}) => {
  const [appSimTab, setAppSimTab] = useState<"portafolio" | "ticket" | "estados" | "asesor">(initialTab);
  const [currencyMode, setCurrencyMode] = useState<"USD" | "DOP">("USD");
  const [showPushAlert, setShowPushAlert] = useState<boolean>(true);

  React.useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent<"portafolio" | "ticket" | "estados" | "asesor">;
      if (customEvent.detail) {
        setAppSimTab(customEvent.detail);
      }
    };
    window.addEventListener("switch-simulator-tab", handleSwitchTab);
    return () => window.removeEventListener("switch-simulator-tab", handleSwitchTab);
  }, []);

  // Local state for simulators
  const [isFaceIdScanning, setIsFaceIdScanning] = useState<boolean>(false);
  const [faceIdSigned, setFaceIdSigned] = useState<boolean>(false);
  const [faceIdStep, setFaceIdStep] = useState<number>(0);

  const [pdfUnlocked, setPdfUnlocked] = useState<boolean>(false);
  const [pinDigits, setPinDigits] = useState<string>("");

  const [isPlayingVoiceNote, setIsPlayingVoiceNote] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "asesor"; text: string }>>([
    {
      sender: "asesor",
      text: "¡Hola! Soy María Fernández, su ejecutiva en Excel Puesto de Bolsa. ¿En qué le puedo asistir con sus Mutuos o Fondos?",
    },
  ]);

  const calcAmount = 50000;
  const calcTermDays = 180;
  const customRatePercent = 9.5;
  const { calculatedYield } = calculateYield(calcAmount, customRatePercent, calcTermDays, false);

  const mutuoPct = 50;
  const inmoPct = 25;
  const esafiPct = 25;

  const timers = React.useRef<NodeJS.Timeout[]>([]);
  React.useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const triggerFaceIdScan = () => {
    setIsFaceIdScanning(true);
    setFaceIdStep(1);
    timers.current.push(setTimeout(() => setFaceIdStep(2), 700));
    timers.current.push(setTimeout(() => setFaceIdStep(3), 1400));
    timers.current.push(
      setTimeout(() => {
        setIsFaceIdScanning(false);
        setFaceIdSigned(true);
        setFaceIdStep(0);
      }, 2100)
    );
  };

  const handlePinKeyPress = (digit: string) => {
    if (pinDigits.length < 4) {
      const nextPin = pinDigits + digit;
      setPinDigits(nextPin);
      if (nextPin.length === 4) {
        timers.current.push(
          setTimeout(() => {
            setPdfUnlocked(true);
          }, 300)
        );
      }
    }
  };

  const sendChatMessage = (userMsg: string) => {
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setIsTyping(true);
    timers.current.push(
      setTimeout(() => {
        setIsTyping(false);
        let replyText =
          "Perfecto. He registrado su consulta en Dynamics 365 CRM. Le enviaré el documento adjunto de inmediato.";
        if (userMsg.includes("tasa")) {
          replyText = `Su tasa personalizada actual es del ${customRatePercent.toFixed(1)}% p.a. para Mutuos a ${calcTermDays} días.`;
        } else if (userMsg.includes("renovación")) {
          replyText = `Excelente. Su orden de renovación de USD $${calcAmount.toLocaleString()} ha sido pre-aprobada.`;
        }
        setChatMessages((prev) => [...prev, { sender: "asesor", text: replyText }]);
      }, 1400)
    );
  };

  const formatCurr = (val: number) => formatAppCurrency(val, currencyMode);

  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden theme-section-bg bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#004F54]/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10"
      >
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] theme-h2-color uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec4_badge" defaultText="04. DEMOSTRACIÓN 100% INTERACTIVA & TÁCTIL" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white theme-h1-color">
            <EditableField id="sec4_h2" defaultText="Simulador App Móvil & Trade Ticket Digital" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 theme-text-color max-w-3xl mx-auto font-medium">
            <EditableField
              id="sec4_desc"
              defaultText="Toca directamente los botones de la pantalla del iPhone o los controles laterales para experimentar la aplicación en vivo."
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Control Sidebar (Left) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-extrabold text-xs uppercase font-mono text-[#F08D17] tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F08D17]" />
              <span>SELECCIONA O TOCA DIRECTAMENTE EN EL TELÉFONO:</span>
            </h3>

            <button
              onClick={() => setAppSimTab("portafolio")}
              className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                appSimTab === "portafolio"
                  ? "bg-white border-2 border-[#F08D17] shadow-2xl ring-4 ring-[#F08D17]/30 text-[#004F54] scale-[1.02]"
                  : "bg-[#EAF5F2]/90 hover:bg-white border border-emerald-200/80 text-[#004F54] shadow-md hover:border-[#F08D17]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    appSimTab === "portafolio" ? "bg-[#F08D17]/15 text-[#F08D17]" : "bg-[#004F54]/10 text-[#004F54]"
                  }`}
                >
                  <PieChart className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-extrabold text-base sm:text-lg block text-[#004F54]">1. Portafolio Consolidado 360°</span>
                  <span className="text-xs text-[#334155] font-medium">Saldos diarios en tiempo real</span>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${appSimTab === "portafolio" ? "text-[#F08D17]" : "text-[#004F54]"}`} />
            </button>

            <button
              onClick={() => setAppSimTab("ticket")}
              className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                appSimTab === "ticket"
                  ? "bg-white border-2 border-[#F08D17] shadow-2xl ring-4 ring-[#F08D17]/30 text-[#004F54] scale-[1.02]"
                  : "bg-[#EAF5F2]/90 hover:bg-white border border-emerald-200/80 text-[#004F54] shadow-md hover:border-[#F08D17]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    appSimTab === "ticket" ? "bg-[#F08D17]/15 text-[#F08D17]" : "bg-[#004F54]/10 text-[#004F54]"
                  }`}
                >
                  <FileCode className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-extrabold text-base sm:text-lg block text-[#004F54]">2. Trade Ticket & FaceID</span>
                  <span className="text-xs text-[#334155] font-medium">Firmar con biometría animada</span>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${appSimTab === "ticket" ? "text-[#F08D17]" : "text-[#004F54]"}`} />
            </button>

            <button
              onClick={() => setAppSimTab("estados")}
              className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                appSimTab === "estados"
                  ? "bg-white border-2 border-[#F08D17] shadow-2xl ring-4 ring-[#F08D17]/30 text-[#004F54] scale-[1.02]"
                  : "bg-[#EAF5F2]/90 hover:bg-white border border-emerald-200/80 text-[#004F54] shadow-md hover:border-[#F08D17]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    appSimTab === "estados" ? "bg-[#F08D17]/15 text-[#F08D17]" : "bg-[#004F54]/10 text-[#004F54]"
                  }`}
                >
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-extrabold text-base sm:text-lg block text-[#004F54]">3. Estados PDF con Teclado PIN</span>
                  <span className="text-xs text-[#334155] font-medium">Desbloqueo por clave del titular</span>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${appSimTab === "estados" ? "text-[#F08D17]" : "text-[#004F54]"}`} />
            </button>

            <button
              onClick={() => setAppSimTab("asesor")}
              className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                appSimTab === "asesor"
                  ? "bg-white border-2 border-[#F08D17] shadow-2xl ring-4 ring-[#F08D17]/30 text-[#004F54] scale-[1.02]"
                  : "bg-[#EAF5F2]/90 hover:bg-white border border-emerald-200/80 text-[#004F54] shadow-md hover:border-[#F08D17]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    appSimTab === "asesor" ? "bg-[#F08D17]/15 text-[#F08D17]" : "bg-[#004F54]/10 text-[#004F54]"
                  }`}
                >
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-extrabold text-base sm:text-lg block text-[#004F54]">4. Atención & Nota de Voz</span>
                  <span className="text-xs text-[#334155] font-medium font-sans">Chat & Asesoría Ejecutiva</span>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${appSimTab === "asesor" ? "text-[#F08D17]" : "text-[#004F54]"}`} />
            </button>
          </div>

          {/* iPhone 15 Pro Titanium Mockup Screen */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative mx-auto select-none">
              <div className="absolute -left-[4px] top-[95px] w-[4px] h-6 bg-[#C85A00] rounded-l-sm shadow-md z-10 border-y border-l border-[#EA580C]" />
              <div className="absolute -left-[4px] top-[140px] w-[4px] h-12 bg-[#C85A00] rounded-l-sm shadow-md z-10 border-y border-l border-[#EA580C]" />
              <div className="absolute -left-[4px] top-[200px] w-[4px] h-12 bg-[#C85A00] rounded-l-sm shadow-md z-10 border-y border-l border-[#EA580C]" />
              <div className="absolute -right-[4px] top-[150px] w-[4px] h-16 bg-[#C85A00] rounded-r-sm shadow-md z-10 border-y border-r border-[#EA580C]" />

              <div className="w-[355px] sm:w-[375px] h-[710px] p-[6px] rounded-[58px] bg-gradient-to-b from-[#E36414] via-[#D95F12] to-[#B34A00] shadow-[0_30px_90px_rgba(217,95,18,0.35),0_20px_60px_rgba(0,0,0,0.85)] border border-[#FF9E5E]/40 relative flex flex-col">
                <div className="w-full h-full bg-black rounded-[52px] p-2.5 flex flex-col justify-between relative overflow-hidden shadow-2xl border border-black">
                  <div className="w-20 h-[3px] bg-[#1F1F1F] rounded-full mx-auto -mt-0.5 mb-1.5 opacity-80 shrink-0 border border-zinc-900" />

                  {/* FaceID Overlay */}
                  <AnimatePresence>
                    {isFaceIdScanning && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 bg-[#0A1628]/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6 z-50 text-white space-y-4"
                      >
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className={`absolute inset-0 rounded-3xl border-4 ${
                              faceIdStep === 3
                                ? "border-emerald-400"
                                : faceIdStep === 2
                                ? "border-[#F08D17]"
                                : "border-[#38BDF8]"
                            } border-t-transparent shadow-2xl`}
                          />
                          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm shadow-inner">
                            {faceIdStep === 3 ? (
                              <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
                            ) : faceIdStep === 2 ? (
                              <ShieldCheck className="w-10 h-10 text-[#F08D17] animate-pulse" />
                            ) : (
                              <UserCheck className="w-10 h-10 text-[#38BDF8] animate-pulse" />
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="font-extrabold text-base">
                            {faceIdStep === 1 && "Alineando Rostro (TrueDepth)..."}
                            {faceIdStep === 2 && "Validando Sello con SIMV Trust..."}
                            {faceIdStep === 3 && "¡Firma Biométrica Aprobada!"}
                          </p>
                          <span className="text-[11px] text-slate-300 font-mono block mt-1">
                            {faceIdStep === 3 ? "Certificado Cifrado #SIMV-9982" : "Cumplimiento Ley 126-02 de Comercio Electrónico"}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* iOS Viewport */}
                  <div className="w-full h-full bg-[#0A1628] rounded-[44px] flex flex-col justify-between overflow-hidden relative shadow-2xl font-sans text-white border border-[#1E293B]">
                    {/* Header */}
                    <div className="px-3 pt-1.5 pb-1 flex items-center justify-between shrink-0 z-40 bg-[#0A1628]/90 backdrop-blur-md border-b border-white/5">
                      <span className="text-[11px] font-black font-mono text-slate-200">9:41 AM</span>
                      <div className="w-26 h-5.5 bg-black rounded-full flex items-center justify-end px-2 shadow-inner border border-zinc-800">
                        <div className="w-3 h-3 rounded-full bg-[#090A0F] ring-1 ring-zinc-700/70 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_4px_#3B82F6]" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setCurrencyMode(currencyMode === "USD" ? "DOP" : "USD")}
                          className="px-1.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F08D17] text-[8px] font-mono font-extrabold cursor-pointer border border-[#F08D17]/40 shadow-sm transition-all"
                        >
                          {currencyMode === "USD" ? "USD $" : "DOP $"}
                        </button>
                        <span className="text-[9px] font-extrabold text-emerald-400">5G</span>
                        <span className="text-[9px] font-mono text-emerald-400">98% 🔋</span>
                      </div>
                    </div>

                    {/* Dynamic Push Banner */}
                    {showPushAlert && (
                      <motion.button
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        onClick={() => {
                          setAppSimTab("ticket");
                          setShowPushAlert(false);
                        }}
                        className="mx-3 mt-1.5 bg-[#112240]/95 border border-[#F08D17]/60 p-2.5 rounded-2xl shadow-2xl flex items-center justify-between text-white text-left cursor-pointer hover:border-[#F08D17] transition-all shrink-0 z-30 backdrop-blur-xl"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F08D17] animate-ping shrink-0" />
                          <div>
                            <p className="text-[11px] font-extrabold text-white leading-tight">🔔 Excel Alerta Vencimiento (15 Días)</p>
                            <span className="text-[10px] text-slate-300">Mutuo USD $50k vence. Toca para renovar &rr;</span>
                          </div>
                        </div>
                      </motion.button>
                    )}

                    {/* Interactive Content */}
                    <div className="flex-1 overflow-y-auto px-3.5 py-2 space-y-3">
                      <AnimatePresence mode="wait">
                        {appSimTab === "portafolio" && (
                          <motion.div
                            key="portafolio"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <div>
                                <span className="text-[11px] font-mono font-bold text-slate-400 block">EXCEL PORTAFOLIO</span>
                                <h4 className="text-xs font-extrabold text-white">Resumen Consolidado 360°</h4>
                              </div>
                              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                                ● En Vivo
                              </span>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002D30] border border-emerald-500/30 rounded-3xl text-white space-y-1 shadow-2xl">
                              <span className="text-[10px] text-slate-300 block font-mono font-bold uppercase tracking-wider">
                                VALOR TOTAL INVERSIONES ({currencyMode})
                              </span>
                              <p className="text-2xl font-black text-white font-mono">{formatCurr(calcAmount)}</p>
                              <span className="text-[11px] text-[#F08D17] font-mono font-bold block">
                                +{formatCurr(calculatedYield)} Ganancia Est.
                              </span>
                            </div>

                            <div className="space-y-2 text-xs">
                              <div className="p-3 bg-[#112240]/90 rounded-2xl flex items-center justify-between border border-white/10 hover:border-[#F08D17] cursor-pointer transition-all shadow-md">
                                <div>
                                  <p className="font-extrabold text-xs text-white">Mutuo Estructurado ({mutuoPct}%)</p>
                                  <span className="text-[10px] text-[#F08D17] font-bold block mt-0.5">
                                    Tasa: {customRatePercent.toFixed(1)}% • Vence 15d
                                  </span>
                                </div>
                                <span className="font-mono text-[#F08D17] font-extrabold text-xs">
                                  {formatCurr(calcAmount * (mutuoPct / 100))}
                                </span>
                              </div>

                              <div className="p-3 bg-[#112240]/90 rounded-2xl flex items-center justify-between border border-white/10 hover:border-white/20 cursor-pointer transition-all shadow-md">
                                <div>
                                  <p className="font-extrabold text-xs text-white">Fondo Inmobiliario II ({inmoPct}%)</p>
                                  <span className="text-[10px] text-emerald-300 block mt-0.5">
                                    Cuotas • Div: {formatCurr(1250)}
                                  </span>
                                </div>
                                <span className="font-mono text-emerald-300 font-extrabold text-xs">
                                  {formatCurr(calcAmount * (inmoPct / 100))}
                                </span>
                              </div>

                              <div className="p-3 bg-[#112240]/90 rounded-2xl flex items-center justify-between border border-white/10 hover:border-white/20 cursor-pointer transition-all shadow-md">
                                <div>
                                  <p className="font-extrabold text-xs text-white">Fondo Liquidez ESAFI ({esafiPct}%)</p>
                                  <span className="text-[10px] text-slate-400 block mt-0.5">Encargo #4092</span>
                                </div>
                                <span className="font-mono text-slate-200 font-extrabold text-xs">
                                  {formatCurr(calcAmount * (esafiPct / 100))}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {appSimTab === "ticket" && (
                          <motion.div
                            key="ticket"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <div>
                                <span className="text-[11px] font-mono font-bold text-slate-400 block">ORDEN DE TRADING</span>
                                <h4 className="text-xs font-extrabold text-white">Trade Ticket Digital</h4>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono">#TT-2026-8841</span>
                            </div>

                            <div className="p-3.5 bg-[#112240]/90 border border-[#F08D17]/40 rounded-2xl space-y-1.5 shadow-lg">
                              <span className="text-[10px] font-mono font-bold text-[#F08D17] block uppercase">
                                Aprobación Fehaciente Requerida
                              </span>
                              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                                Solicitud: <span className="font-bold text-white">Renovación Mutuo {formatCurr(calcAmount)}</span> a{" "}
                                {calcTermDays} Días ({customRatePercent.toFixed(1)}%).
                              </p>
                            </div>

                            <div className="p-4 bg-[#112240]/90 rounded-2xl border border-white/10 space-y-3 text-center shadow-xl">
                              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#F08D17] flex items-center justify-center mx-auto shadow-inner border border-white/15">
                                <ShieldCheck className="w-6 h-6 text-[#F08D17]" />
                              </div>
                              <span className="text-xs font-extrabold text-white block">
                                {faceIdSigned ? "✅ Aprobado & Transmitido a CRM" : "Biometría FaceID Requerida"}
                              </span>
                              <button
                                onClick={triggerFaceIdScan}
                                disabled={faceIdSigned}
                                className={`w-full py-3 rounded-xl text-xs font-extrabold shadow-lg cursor-pointer transition-all ${
                                  faceIdSigned ? "bg-emerald-600 text-white" : "bg-[#F08D17] hover:bg-[#d87c0f] text-white"
                                }`}
                              >
                                {faceIdSigned ? "✔ Orden Transmitida a Dynamics CRM" : "Touch / Escanear FaceID"}
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {appSimTab === "estados" && (
                          <motion.div
                            key="estados"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                              <div>
                                <span className="text-[11px] font-mono font-bold text-slate-400 block">DOCUMENTACIÓN SIMV</span>
                                <h4 className="text-xs font-extrabold text-white">Estados de Cuenta PDF</h4>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono">12 Meses</span>
                            </div>

                            {!pdfUnlocked ? (
                              <div className="p-3 bg-white border border-[#E2E8F0] rounded-2xl space-y-3 text-center shadow-sm">
                                <Lock className="w-6 h-6 text-[#F08D17] mx-auto" />
                                <div>
                                  <p className="text-xs font-extrabold text-[#0F172A]">PDF Cifrado por Seguridad</p>
                                  <span className="text-[10px] text-[#64748B]">Ingresa PIN del Titular (Ej: 1234)</span>
                                </div>
                                <div className="flex justify-center gap-2">
                                  {[0, 1, 2, 3].map((i) => (
                                    <span
                                      key={i}
                                      className={`w-3.5 h-3.5 rounded-full border transition-all ${
                                        i < pinDigits.length ? "bg-[#004F54] border-[#004F54] scale-110" : "bg-slate-100 border-slate-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <div className="grid grid-cols-3 gap-1.5 max-w-[190px] mx-auto pt-1 font-mono">
                                  {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
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
                              <div className="space-y-3">
                                <div className="p-3.5 bg-white border border-[#CBD5E1] rounded-2xl space-y-2.5 shadow-sm text-left relative overflow-hidden">
                                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                                    <div className="flex items-center gap-2">
                                      <FileText className="w-5 h-5 text-[#004F54]" />
                                      <span className="font-bold text-xs text-[#0F172A]">Estado_Consolidado_Jul2026.pdf</span>
                                    </div>
                                    <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                                      ISO 27001
                                    </span>
                                  </div>

                                  <div className="space-y-1 font-mono text-[10px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                                    <div className="flex justify-between font-bold text-[#0F172A]">
                                      <span>Titular: Juan Pérez</span>
                                      <span>RNC: 001-XXXX-X</span>
                                    </div>
                                    <div className="flex justify-between text-[#004F54] font-extrabold">
                                      <span>Total Portafolio:</span>
                                      <span>{formatCurr(calcAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-[#F08D17]">
                                      <span>Rendimiento Est.:</span>
                                      <span>{formatCurr(calculatedYield)}</span>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => alert("Descarga PDF iniciada")}
                                    className="w-full py-2 bg-[#004F54] hover:bg-[#006B70] text-white rounded-xl text-xs font-bold font-mono shadow-md cursor-pointer flex items-center justify-center gap-2"
                                  >
                                    <Download className="w-4 h-4 text-[#F08D17]" />
                                    <span>Descargar PDF Cifrado SIMV</span>
                                  </button>
                                </div>

                                <button
                                  onClick={() => {
                                    setPdfUnlocked(false);
                                    setPinDigits("");
                                  }}
                                  className="w-full py-1.5 bg-slate-200 hover:bg-slate-300 text-[#0F172A] rounded-xl text-[11px] font-bold cursor-pointer font-mono"
                                >
                                  🔒 Volver a Bloquear PDF
                                </button>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {appSimTab === "asesor" && (
                          <motion.div
                            key="asesor"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex flex-col justify-between h-full bg-[#efeae2] relative"
                          >
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

                            <div className="p-3 space-y-2.5 flex-1 overflow-y-auto text-xs font-sans">
                              <div className="flex justify-start">
                                <div className="p-2.5 bg-white rounded-2xl rounded-tl-none border border-slate-200 shadow-sm w-[88%] space-y-1.5">
                                  <div className="flex items-center gap-2.5">
                                    <button
                                      onClick={() => setIsPlayingVoiceNote(!isPlayingVoiceNote)}
                                      className="w-8 h-8 rounded-full bg-[#008069] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-md active:scale-95 transition-all text-xs font-bold"
                                    >
                                      {isPlayingVoiceNote ? "⏸" : "▶"}
                                    </button>
                                    <div className="flex-1 space-y-1">
                                      <div className="flex items-center gap-0.5 h-4">
                                        {[40, 70, 30, 90, 50, 80, 100, 60, 40, 70, 50, 90, 60, 30].map((h, idx) => (
                                          <span
                                            key={idx}
                                            className={`w-1 rounded-full transition-all ${
                                              isPlayingVoiceNote ? "bg-[#008069] animate-pulse" : "bg-slate-300"
                                            }`}
                                            style={{ height: `${isPlayingVoiceNote ? (h % 70) + 30 : 40}%` }}
                                          />
                                        ))}
                                      </div>
                                      <div className="flex justify-between text-[9px] font-mono text-slate-500 font-bold">
                                        <span>{isPlayingVoiceNote ? "0:07 / 0:14" : "0:14"}</span>
                                        <span className="text-[#008069]">🎙️ Nota de Voz María</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
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

                    {/* Navigation Tab Bar */}
                    <div className="pt-2 pb-1 border-t border-white/10 grid grid-cols-4 gap-1 text-center font-mono text-[9px] shrink-0 bg-[#0B172B] text-slate-400">
                      <button
                        onClick={() => setAppSimTab("portafolio")}
                        className={`py-1 flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                          appSimTab === "portafolio" ? "text-[#F08D17] font-black scale-105" : "hover:text-white"
                        }`}
                      >
                        <PieChart className="w-4 h-4" />
                        <span>Inicio</span>
                      </button>
                      <button
                        onClick={() => setAppSimTab("ticket")}
                        className={`py-1 flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                          appSimTab === "ticket" ? "text-[#F08D17] font-black scale-105" : "hover:text-white"
                        }`}
                      >
                        <FileCode className="w-4 h-4" />
                        <span>Ticket</span>
                      </button>
                      <button
                        onClick={() => setAppSimTab("estados")}
                        className={`py-1 flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                          appSimTab === "estados" ? "text-[#F08D17] font-black scale-105" : "hover:text-white"
                        }`}
                      >
                        <Lock className="w-4 h-4" />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={() => setAppSimTab("asesor")}
                        className={`py-1 flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                          appSimTab === "asesor" ? "text-[#F08D17] font-black scale-105" : "hover:text-white"
                        }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Asesor</span>
                      </button>
                    </div>
                    <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-1 shrink-0 z-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
