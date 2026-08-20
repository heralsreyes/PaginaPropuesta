"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCheck,
  PieChart,
  FileText,
  FileCode,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Filter,
  CheckCircle2,
  ChevronRight,
  Play,
  Sparkles,
} from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";

interface ScopeEpicsSectionProps {
  secId: string;
  onNavigateToSimulator?: (tab: "portafolio" | "ticket" | "estados" | "asesor") => void;
}

const sectionContainerVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const sectionItemVariants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export const ScopeEpicsSection: React.FC<ScopeEpicsSectionProps> = ({ secId, onNavigateToSimulator }) => {
  const [activeEpicTab, setActiveEpicTab] = useState<number>(1);
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>("e1_s1");
  const [storyPhaseFilter, setStoryPhaseFilter] = useState<"todos" | "fase1" | "fase2">("todos");

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
            "Fallback automático a PIN de 4 dígitos o clave titular",
          ],
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
            "Auditoría inmutable de IP, dispositivo y geolocalización",
          ],
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
            "Sincronización de expediente con Dynamics 365 CRM",
          ],
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
            "Limpieza de almacenamiento sensible en caché",
          ],
        },
      ],
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
            "Cálculo automático de ganancia acumulada estimada",
          ],
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
            "Descarga de comprobantes de dividendos en PDF",
          ],
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
            "Acceso al botón de solicitud de renovación digital",
          ],
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
            "Filtro de privacidad en descarga de estados de cuenta",
          ],
        },
      ],
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
            "Botón seguro de descarga cifrada a carpeta local",
          ],
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
            "Auditoría de eventos de desbloqueo exitosos e intentos fallidos",
          ],
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
            "Consolidación por cuenta de corretaje",
          ],
        },
      ],
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
            "Envío automático de copia en PDF a correo registrado",
          ],
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
            "Notificación de orden pendiente para el siguiente día hábil",
          ],
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
            "Webhook de integración directa con SIFI Fondos",
          ],
        },
      ],
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
            "Opción de pre-aprobación de tasa de renovación",
          ],
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
            "Registro del contacto como actividad en Dynamics 365 CRM",
          ],
        },
      ],
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
            "Diferenciación de marca entre EPB (Puesto de Bolsa) y ESAFI",
          ],
        },
      ],
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
            "Exportación directa a formato CSV / Excel oficial",
          ],
        },
      ],
    },
  ];

  const currentEpic = epicsData.find((e) => e.id === activeEpicTab) || epicsData[0];

  const filteredStories = currentEpic.richStories.filter((story) => {
    if (storyPhaseFilter === "fase1") return story.phase === "fase1";
    if (storyPhaseFilter === "fase2") return story.phase === "fase2";
    return true;
  });

  const jumpToSimulatorTab = (simTab: "portafolio" | "ticket" | "estados" | "asesor") => {
    if (onNavigateToSimulator) {
      onNavigateToSimulator(simTab);
    } else {
      const el = document.getElementById("sec-simulador-interactivo-app");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
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
        className="max-w-6xl mx-auto w-full space-y-8"
      >
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec3_badge" defaultText="03. ALCANCE FUNCIONAL COMPLETO & HISTORIAS ÁGILES" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            <EditableField id="sec3_h2" defaultText="Detalle Funcional por 7 Épicas SIMV" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 max-w-3xl mx-auto font-medium">
            <EditableField
              id="sec3_desc"
              defaultText="Toca cualquier historia de usuario para desplegar su estructura ágil (Como/Quiero/Para), criterios de aceptación (DoD) y probar la acción en vivo en el simulador."
            />
          </p>
        </div>

        {/* Phase Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#003B3F]/90 backdrop-blur-md border border-white/15 shadow-lg text-white">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#F08D17]" />
            <span className="text-xs font-mono font-bold text-slate-200">Fase de Implementación:</span>
            <div className="flex items-center gap-1.5 pl-2">
              <button
                onClick={() => setStoryPhaseFilter("todos")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                  storyPhaseFilter === "todos"
                    ? "bg-[#F08D17] text-white shadow-md scale-105"
                    : "bg-white/10 text-slate-200 border border-white/20 hover:bg-white/20"
                }`}
              >
                Todas (28 Stories)
              </button>
              <button
                onClick={() => setStoryPhaseFilter("fase1")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                  storyPhaseFilter === "fase1"
                    ? "bg-[#F08D17] text-white shadow-md scale-105"
                    : "bg-white/10 text-slate-200 border border-white/20 hover:bg-white/20"
                }`}
              >
                Fase 1: App Inversionista
              </button>
              <button
                onClick={() => setStoryPhaseFilter("fase2")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                  storyPhaseFilter === "fase2"
                    ? "bg-[#F08D17] text-white shadow-md scale-105"
                    : "bg-white/10 text-slate-200 border border-white/20 hover:bg-white/20"
                }`}
              >
                Fase 2: CRM Dynamics & Core
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/20">
            <CheckCircle2 className="w-4 h-4 text-[#F08D17]" />
            <span>7 Épicas SIMV • 100% Cobertura</span>
          </div>
        </div>

        {/* Corporate Epic Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {epicsData.map((epic) => {
            const EpicIcon = epic.icon;
            const isSelected = activeEpicTab === epic.id;
            const matchingStoriesCount = epic.richStories.filter((s) => {
              if (storyPhaseFilter === "fase1") return s.phase === "fase1";
              if (storyPhaseFilter === "fase2") return s.phase === "fase2";
              return true;
            }).length;

            return (
              <motion.div
                key={epic.id}
                variants={sectionItemVariants}
                onClick={() => {
                  setActiveEpicTab(epic.id);
                  setExpandedStoryId(epic.richStories[0]?.id || null);
                }}
                className={`p-6 rounded-3xl backdrop-blur-xl border transition-all cursor-pointer flex flex-col justify-between space-y-5 shadow-xl relative overflow-hidden group ${
                  isSelected
                    ? "bg-[#002224] border-2 border-[#F08D17] shadow-2xl ring-4 ring-[#F08D17]/20 scale-[1.02]"
                    : "bg-[#003B3F]/80 border-white/15 hover:border-white/40 hover:bg-[#003B3F]"
                }`}
              >
                {/* Header: Epic Number & Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-[#F08D17]/20 text-[#F08D17] border border-[#F08D17]/40">
                    ÉPICA 0{epic.id}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                    {epic.badge}
                  </span>
                </div>

                {/* Body: Icon & Title */}
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F08D17]/10 text-[#F08D17] border border-[#F08D17]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <EpicIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-white group-hover:text-[#F08D17] transition-colors leading-snug">
                    {epic.title.replace(/^Épica \d+: /, "")}
                  </h3>
                  <div className="text-xs font-mono text-emerald-300 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F08D17]" />
                    <span>{epic.coverage}</span>
                  </div>
                </div>

                {/* Key Deliverables Chips */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block font-bold">Entregables Clave:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {epic.deliverables.map((item, idx) => (
                      <span key={idx} className="text-[11px] bg-white/10 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10 font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Stories Count & Expand Trigger */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300">
                    {matchingStoriesCount} Historias de Usuario
                  </span>
                  <button className={`text-xs font-mono font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-[#F08D17] text-white shadow-md"
                      : "bg-white/10 text-slate-200 border border-white/20 group-hover:bg-[#F08D17] group-hover:text-white"
                  }`}>
                    <span>Ver Historias</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Epic Detailed Stories Panel */}
        <div className="p-8 rounded-3xl bg-[#002224] border-2 border-[#F08D17]/80 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F08D17]/20 text-[#F08D17] border border-[#F08D17]/40 flex items-center justify-center font-bold">
                {React.createElement(currentEpic.icon, { className: "w-5 h-5" })}
              </div>
              <div>
                <span className="text-xs font-mono text-[#F08D17] font-bold uppercase tracking-wider block">
                  DESGLOSE DE HISTORIAS · ÉPICA 0{currentEpic.id}
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  {currentEpic.title}
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/20">
              {filteredStories.length} Historias Disponibles
            </span>
          </div>

          {/* Stories List inside Selected Epic */}
          <div className="space-y-4">
            {filteredStories.map((story) => {
              const isExpanded = expandedStoryId === story.id;
              return (
                <div
                  key={story.id}
                  className="rounded-2xl bg-[#001618] border border-white/15 overflow-hidden transition-all shadow-lg hover:border-white/30"
                >
                  <div
                    onClick={() => setExpandedStoryId(isExpanded ? null : story.id)}
                    className="p-5 cursor-pointer flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-[#F08D17] px-3 py-1 rounded-xl bg-white/10 border border-white/15">
                        {story.status}
                      </span>
                      <h4 className="font-extrabold text-base text-white">{story.title}</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      {"demoTab" in story && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (story.demoTab) jumpToSimulatorTab(story.demoTab);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#F08D17] text-white font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-[#EA580C] shadow-md transition-all cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Probar en App</span>
                        </button>
                      )}
                      <ChevronRight className={`w-5 h-5 text-white transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 pt-2 border-t border-white/10 space-y-4 text-slate-200"
                      >
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                          <div className="text-xs font-mono font-bold text-[#F08D17] uppercase">Estructura Ágil</div>
                          <div className="text-sm font-medium">
                            <strong>Como:</strong> {story.asA} | <strong>Quiero:</strong> {story.iWant} | <strong>Para:</strong>{" "}
                            {story.soThat}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs font-mono font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Criterios de Aceptación (DoD)</span>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {story.dod.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10">
                                <CheckCircle2 className="w-4 h-4 text-[#F08D17] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
