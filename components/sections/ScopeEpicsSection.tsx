"use client";

import React, { useState, useEffect } from "react";
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
  ChevronDown,
  Play,
  Sparkles,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { EditableText } from "@/components/studio/EditableText";
import { useStudioStore } from "@/store/useStudioStore";
import { useProposal } from "@/context/ProposalContext";
import { toast } from "sonner";

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

export interface RichStory {
  id: string;
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  status: string;
  phase: string;
  demoTab?: "portafolio" | "ticket" | "estados" | "asesor";
  dod: string[];
}

export interface EpicItem {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  coverage: string;
  subtitle?: string;
  deliverables: string[];
  richStories: RichStory[];
}

const epicsData: EpicItem[] = [
  {
    id: 1,
    title: "Épica 1: Registro, Autenticación Segura & Perfil KYC",
    icon: UserCheck,
    badge: "Seguridad SIMV",
      coverage: "100% Cobertura SIMV",
    subtitle: "Login Biométrico & OTP",
      deliverables: ["Login Biométrico & OTP", "Perfilado Inversionista SIMV", "Sesiones Expirables Seguras"],
      richStories: [
        {
          id: "e1_s1",
          title: "Acceso Biométrico Rápido (FaceID / TouchID)",
          asA: "Inversionista de Excel",
          iWant: "Autenticarme en la App Móvil con mi rostro (FaceID) o huella dactilar",
          soThat: "Pueda consultar mi portafolio en 1 segundo con la máxima seguridad sin digitar claves.",
          status: "Sprint 1 (Listo)",
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
          status: "Sprint 1 (Listo)",
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
          status: "UAT Cliente",
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
          status: "Sprint 1 (Listo)",
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
      subtitle: "Dashboard Portafolio 360°",
      deliverables: ["Dashboard Portafolio 360°", "Saldos Diarios Actualizados", "Soporte Titular/Cotitular"],
      richStories: [
        {
          id: "e2_s1",
          title: "Resumen Consolidado 360° de Inversiones",
          asA: "Cliente Titular de Excel",
          iWant: "Ver el valor consolidado de todas mis inversiones en una sola pantalla",
          soThat: "Tenga visibilidad inmediata de mis Mutuos, Fondos Inmobiliarios y ESAFI.",
          status: "Sprint 1 (Listo)",
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
          status: "UAT Cliente",
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
          status: "Sprint 1 (Listo)",
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
          status: "Integración API",
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
      subtitle: "Visor PDF Integrado",
      deliverables: ["Visor PDF Integrado", "Clave Titular Cifrada", "Histórico 12 Meses"],
      richStories: [
        {
          id: "e3_s1",
          title: "Visor PDF Integrado Sin Descargas Externas",
          asA: "Inversionista de Excel",
          iWant: "Abrir mi estado de cuenta directamente dentro de la aplicación móvil o web",
          soThat: "No tenga que recurrir a lectores externos o salir del canal seguro.",
          status: "Sprint 1 (Listo)",
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
          status: "Sprint 1 (Listo)",
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
          status: "UAT Cliente",
          phase: "fase1",
          dod: [
            "Listado filtrable por mes y año fiscal",
            "Depuración automática de períodos sin movimiento",
            "Consolidación por cuenta de corretaje",
          ],
        },
        {
          id: "e3_s4",
          title: "Descarga Consolidada Certificada con Marca de Agua",
          asA: "Auditor Externo / Inversionista",
          iWant: "Exportar el estado de cuenta certificado con código de verificación QR",
          soThat: "Se pueda validar su autenticidad ante instituciones bancarias o de crédito.",
          status: "Sprint 1 (Listo)",
          phase: "fase1",
          dod: [
            "Generación de sello digital inmutable en pie de página PDF",
            "Validación de firma via código QR escaneable",
            "Registro de fecha y hora exacta de descarga",
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
      subtitle: "Motor de Solicitudes Digitales",
      deliverables: ["Motor de Solicitudes Digitales", "Trade Ticket Fehaciente", "Validación KYC en Tiempo Real"],
      richStories: [
        {
          id: "e4_s1",
          title: "Generación Automática del Trade Ticket Digital",
          asA: "Inversionista de Mutuos & Renta Fija",
          iWant: "Generar un Trade Ticket digital al solicitar una inversión o renovación",
          soThat: "Exista un comprobante legal fehaciente de mi instrucción operativa.",
          status: "Sprint 1 (Listo)",
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
          status: "Sprint 1 (Listo)",
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
          status: "Integración API",
          phase: "fase2",
          dod: [
            "Cálculo de valor cuota proyectado y fecha de liquidación",
            "Generación de orden de aporte/rescate con comprobante",
            "Webhook de integración directa con SIFI Fondos",
          ],
        },
        {
          id: "e4_s4",
          title: "Confirmación Biométrica de Firmas Operativas",
          asA: "Oficial de Cumplimiento Regulado",
          iWant: "Solicitar autenticación biométrica obligatoria al autorizar un Trade Ticket",
          soThat: "Se prevenga la suplantación de identidad en transacciones de alto valor.",
          status: "Sprint 1 (Listo)",
          phase: "fase1",
          dod: [
            "Confirmación FaceID/TouchID en el modal de firma de instrucción",
            "Vincular el ID de dispositivo al log de firma fehaciente",
            "Rechazo automático tras 3 intentos fallidos",
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
      subtitle: "Push Notifications Segmentadas",
      deliverables: ["Push Notifications Segmentadas", "Alerta Vencimiento 15 Días", "Bandeja de Mensajes"],
      richStories: [
        {
          id: "e5_s1",
          title: "Alerta Automática de Vencimiento de Mutuos a 15 Días",
          asA: "Inversionista de Mutuos Estructurados",
          iWant: "Recibir una notificación push 15 días antes de que venza mi mutuo",
          soThat: "Pueda instruir su renovación a tasa preferencial en 1 clic.",
          status: "Sprint 1 (Listo)",
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
          status: "Sprint 1 (Listo)",
          phase: "fase1",
          demoTab: "asesor" as const,
          dod: [
            "Enrutamiento directo a número WhatsApp corporativo",
            "Plantillas de mensaje con datos de inversión pre-cargados",
            "Registro del contacto como actividad en Dynamics 365 CRM",
          ],
        },
        {
          id: "e5_s3",
          title: "Bandeja de Notificaciones Push Masivas & Segmentadas",
          asA: "Gerente de Marketing & CRM",
          iWant: "Enviar comunicaciones de mercado segmentadas por tipo de inversionista",
          soThat: "Los clientes reciban alertas relevantes sobre nuevas emisiones de cuotas.",
          status: "Integración API",
          phase: "fase2",
          dod: [
            "Integración con canal Push Apple APNS & Firebase FCM",
            "Segmentación por saldo de cartera y tipo de producto",
            "Bitácora de entrega y tasa de lectura en Dynamics 365 CRM",
          ],
        },
        {
          id: "e5_s4",
          title: "Sincronización Automática de Tareas en Dynamics 365 CRM",
          asA: "Asesor Financiero Comercial",
          iWant: "Que las solicitudes o renovaciones iniciadas en la app creen una Tarea en mi CRM",
          soThat: "Pueda dar seguimiento comercial en menos de 2 horas hábiles.",
          status: "UAT Cliente",
          phase: "fase2",
          dod: [
            "Creación automática de objeto Lead / Task en CRM",
            "Asignación por algoritmo de balanceo a ejecutivos libres",
            "Notificación en Teams / Email corporativo al asesor",
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
      subtitle: "Cotizaciones en Vivo",
      deliverables: ["Cotizaciones en Vivo", "Directorio Productos", "Distintivo EPB vs ESAFI"],
      richStories: [
        {
          id: "e6_s1",
          title: "Precios de Cuotas & Rendimientos en Tiempo Real",
          asA: "Inversionista de Fondos Excel",
          iWant: "Ver el valor cuota actualizado diariamente de los fondos de ESAFI y EPB",
          soThat: "Conozca el desempeño de mercado de mis activos.",
          status: "UAT Cliente",
          phase: "fase1",
          dod: [
            "Actualización diaria de valor cuota tras cierre de mercado",
            "Gráfico de rendimiento histórico a 30, 90 y 365 días",
            "Diferenciación de marca entre EPB (Puesto de Bolsa) y ESAFI",
          ],
        },
        {
          id: "e6_s2",
          title: "Directorio Completo de Productos EPB & ESAFI",
          asA: "Prospecto o Inversionista Existente",
          iWant: "Consultar la ficha de características de cada producto financiero disponible",
          soThat: "Tenga la información necesaria antes de solicitar un nuevo aporte.",
          status: "Sprint 1 (Listo)",
          phase: "fase1",
          dod: [
            "Fichas detalladas con tasa objetivo, plazo mínimo y calificación de riesgo",
            "Enlace a prospecto de colocación aprobado por SIMV",
            "Botón de contacto directo con ejecutivo especialista",
          ],
        },
        {
          id: "e6_s3",
          title: "Comparador de Rendimientos Históricos",
          asA: "Analista de Inversiones",
          iWant: "Comparar la curva de rendimientos de Fondos Inmobiliarios vs Renta Fija",
          soThat: "Evalúe la diversificación de mi portafolio personal.",
          status: "UAT Cliente",
          phase: "fase1",
          dod: [
            "Gráfico interactivo multi-serie con toggle de período",
            "Cálculo de Tasa Interna de Retorno (TIR) proyectada",
            "Exportación de datos tabulares a Excel/CSV",
          ],
        },
        {
          id: "e6_s4",
          title: "Ficha Técnica Descargable de Fondos (Factsheets)",
          asA: "Inversionista Institucional",
          iWant: "Descargar el informe mensual oficial (Factsheet) en formato PDF",
          soThat: "Presente la documentación a mi comité de inversiones.",
          status: "Sprint 1 (Listo)",
          phase: "fase1",
          dod: [
            "Descarga directa de PDF firmado por auditor externo",
            "Desglose de composición sectorial e inmuebles del fondo",
            "Actualización mensual programada tras dictamen de riesgo",
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
      subtitle: "Logs de Auditoría Inmutables",
      deliverables: ["Logs de Auditoría Inmutables", "Cumplimiento ISO 27002 & SIMV", "Indicadores de Uso Gerencial"],
      richStories: [
        {
          id: "e7_s1",
          title: "Bitácora Centralizada Inmutable para Inspecciones SIMV",
          asA: "Oficial de Cumplimiento & Auditor SIMV",
          iWant: "Que todas las interacciones, logins y transacciones queden registradas en una bitácora inmutable",
          soThat: "Se pueda presentar evidencia fehaciente en auditorías de la SIMV.",
          status: "Sprint 1 (Listo)",
          phase: "fase1",
          dod: [
            "Registro inmutable con timestamp UTC y hash SHA-256",
            "Filtros de búsqueda por RNC, fecha y tipo de evento",
            "Exportación directa a formato CSV / Excel oficial",
          ],
        },
        {
          id: "e7_s2",
          title: "Cifrado Extremo a Extremo TLS 1.3 / AES-256",
          asA: "Oficial de Seguridad ISO 27001",
          iWant: "Que todos los datos en tránsito y en reposo estén protegidos con estándares bancarios",
          soThat: "Se elimine el riesgo de fuga o manipulación de información financiera.",
          status: "Sprint 1 (Listo)",
          phase: "fase1",
          dod: [
            "Protocolo TLS 1.3 forzado en todos los endpoints REST API",
            "Cifrado de base de datos AES-256 con llaves rotativas",
            "Escaneo continuo de vulnerabilidades OWASP Top 10",
          ],
        },
        {
          id: "e7_s3",
          title: "Control de Accesos Basado en Roles (RBAC)",
          asA: "Administrador de Sistemas Excel",
          iWant: "Asignar roles y permisos diferenciados a usuarios cliente, ejecutivos y auditores",
          soThat: "Cada rol acceda estrictamente a las funciones autorizadas.",
          status: "Sprint 1 (Listo)",
          phase: "fase1",
          dod: [
            "Matriz de permisos granulares por módulo",
            "Autenticación corporativa SSO / Active Directory para empleados",
            "Revocación inmediata de accesos por baja operativa",
          ],
        },
        {
          id: "e7_s4",
          title: "Dashboard de Monitoreo & SLA Operativo",
          asA: "Director de Tecnología (CTO)",
          iWant: "Monitorear la disponibilidad 99.9% y tiempos de respuesta de la solución",
          soThat: "Se garantice la continuidad del negocio exigida por la SIMV.",
          status: "Sprint 1 (Listo)",
          phase: "fase1",
          dod: [
            "Panel de métricas en tiempo real con latencia de endpoints",
            "Alertas automáticas vía SMS/PagerDuty por caída de servicios",
            "Reporte mensual de disponibilidad acumulada para auditoría",
          ],
        },
      ],
    },
  ];

interface FilterButton {
  id: string;
  label: string;
}

const defaultFilterButtons: FilterButton[] = [
  { id: "todos", label: "Todas (28 Stories)" },
  { id: "fase1", label: "Fase 1: App Inversionista" },
  { id: "fase2", label: "Fase 2: CRM Dynamics & Core" },
];

export const ScopeEpicsSection: React.FC<ScopeEpicsSectionProps> = ({ secId, onNavigateToSimulator }) => {
  const { isDesignMode } = useStudioStore();
  const { currentSlug } = useProposal();
  const [activeEpicTab, setActiveEpicTab] = useState<number>(1);
  const [activeStoryId, setActiveStoryId] = useState<string | null>("e1_s1");
  const [storyPhaseFilter, setStoryPhaseFilter] = useState<string>("todos");

  const [epics, setEpics] = useState<EpicItem[]>(epicsData);
  const [filterButtons, setFilterButtons] = useState<FilterButton[]>(defaultFilterButtons);
  const [filterLabel, setFilterLabel] = useState<string>("Fase de Implementación:");
  const [filterSummary, setFilterSummary] = useState<string>("7 Épicas SIMV • 28 Historias Oficiales Excel");
  const [epicsColTitle, setEpicsColTitle] = useState<string>("ÉPICAS DE LA SOLUCIÓN");
  const [epicsCountBadge, setEpicsCountBadge] = useState<string>("7 Épicas");

  const loadEpicsState = () => {
    if (typeof window === "undefined") return;
    const slug = currentSlug || "excel-puesto-de-bolsa";
    const saved =
      localStorage.getItem(`scope_epics_data_${slug}`) ||
      localStorage.getItem("scope_epics_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const withIcons = parsed.map((p: any) => {
            const match = epicsData.find((orig) => orig.id === p.id);
            return {
              ...p,
              icon: match ? match.icon : UserCheck,
              subtitle:
                p.subtitle !== undefined && p.subtitle !== ""
                  ? p.subtitle
                  : p.deliverables && p.deliverables.length > 0
                  ? p.deliverables[0]
                  : match
                  ? match.subtitle
                  : "",
            };
          });
          setEpics(withIcons);
        }
      } catch (err) {
        console.warn("Error parsing saved epics:", err);
      }
    } else {
      setEpics(epicsData);
    }

    const savedButtons =
      localStorage.getItem(`scope_epics_filter_buttons_${slug}`) ||
      localStorage.getItem("scope_epics_filter_buttons");
    if (savedButtons) {
      try {
        const parsed = JSON.parse(savedButtons);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFilterButtons(parsed);
        }
      } catch (err) {
        console.warn("Error parsing saved filter buttons:", err);
      }
    } else {
      const sTodos = localStorage.getItem(`scope_epics_tab_todos_${slug}`);
      const sF1 = localStorage.getItem(`scope_epics_tab_fase1_${slug}`);
      const sF2 = localStorage.getItem(`scope_epics_tab_fase2_${slug}`);
      if (sTodos || sF1 || sF2) {
        setFilterButtons([
          { id: "todos", label: sTodos || "Todas (28 Stories)" },
          { id: "fase1", label: sF1 || "Fase 1: App Inversionista" },
          { id: "fase2", label: sF2 || "Fase 2: CRM Dynamics & Core" },
        ]);
      } else {
        setFilterButtons(defaultFilterButtons);
      }
    }

    const savedFilterLabel = localStorage.getItem(`scope_epics_filter_label_${slug}`);
    if (savedFilterLabel) setFilterLabel(savedFilterLabel);

    const savedSummary = localStorage.getItem(`scope_epics_summary_${slug}`);
    if (savedSummary) setFilterSummary(savedSummary);

    const savedColTitle = localStorage.getItem(`scope_epics_col_title_${slug}`);
    if (savedColTitle) setEpicsColTitle(savedColTitle);

    const savedCountBadge = localStorage.getItem(`scope_epics_count_badge_${slug}`);
    if (savedCountBadge) setEpicsCountBadge(savedCountBadge);
  };

  useEffect(() => {
    loadEpicsState();

    const handleSync = () => {
      loadEpicsState();
    };

    window.addEventListener("enfoco-epics-sync", handleSync);
    window.addEventListener("enfoco-proposal-switched", handleSync);

    return () => {
      window.removeEventListener("enfoco-epics-sync", handleSync);
      window.removeEventListener("enfoco-proposal-switched", handleSync);
    };
  }, [currentSlug]);

  const saveEpics = (newEpics: EpicItem[]) => {
    setEpics(newEpics);
    if (typeof window !== "undefined") {
      const slug = currentSlug || "excel-puesto-de-bolsa";
      const serializable = newEpics.map(({ icon, ...rest }) => rest);
      localStorage.setItem(`scope_epics_data_${slug}`, JSON.stringify(serializable));
      localStorage.setItem("scope_epics_data", JSON.stringify(serializable));
    }
  };

  const saveFilterButtons = (buttons: FilterButton[]) => {
    setFilterButtons(buttons);
    if (typeof window !== "undefined") {
      const slug = currentSlug || "excel-puesto-de-bolsa";
      localStorage.setItem(`scope_epics_filter_buttons_${slug}`, JSON.stringify(buttons));
    }
  };

  const addFilterButton = () => {
    const nextNum = filterButtons.length;
    const newId = `fase_${Date.now()}`;
    const newButton: FilterButton = {
      id: newId,
      label: `Fase ${nextNum}: Nueva Fase`,
    };
    const updated = [...filterButtons, newButton];
    saveFilterButtons(updated);
    toast.success("Nuevo botón de filtro añadido.");
  };

  const deleteFilterButton = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (filterButtons.length <= 1) {
      toast.error("Debe existir al menos 1 botón de filtro.");
      return;
    }
    const updated = filterButtons.filter((btn) => btn.id !== id);
    saveFilterButtons(updated);
    if (storyPhaseFilter === id) {
      setStoryPhaseFilter(updated[0]?.id || "todos");
    }
    toast.info("Botón de filtro eliminado.");
  };

  const updateFilterButtonLabel = (id: string, newLabel: string) => {
    const updated = filterButtons.map((btn) => (btn.id === id ? { ...btn, label: newLabel } : btn));
    saveFilterButtons(updated);
  };

  const saveFilterLabel = (val: string) => {
    setFilterLabel(val);
    if (typeof window !== "undefined") {
      const slug = currentSlug || "excel-puesto-de-bolsa";
      localStorage.setItem(`scope_epics_filter_label_${slug}`, val);
    }
  };

  const saveFilterSummary = (val: string) => {
    setFilterSummary(val);
    if (typeof window !== "undefined") {
      const slug = currentSlug || "excel-puesto-de-bolsa";
      localStorage.setItem(`scope_epics_summary_${slug}`, val);
    }
  };

  const saveEpicsColTitle = (val: string) => {
    setEpicsColTitle(val);
    if (typeof window !== "undefined") {
      const slug = currentSlug || "excel-puesto-de-bolsa";
      localStorage.setItem(`scope_epics_col_title_${slug}`, val);
    }
  };

  const saveEpicsCountBadge = (val: string) => {
    setEpicsCountBadge(val);
    if (typeof window !== "undefined") {
      const slug = currentSlug || "excel-puesto-de-bolsa";
      localStorage.setItem(`scope_epics_count_badge_${slug}`, val);
    }
  };

  const currentEpic = epics.find((e) => e.id === activeEpicTab) || epics[0] || epicsData[0];

  const filteredStories = currentEpic.richStories.filter((story) => {
    if (storyPhaseFilter === "todos") return true;
    return story.phase === storyPhaseFilter;
  });

  const handleEpicSelect = (epicId: number) => {
    setActiveEpicTab(epicId);
    setStoryPhaseFilter("todos");
    const targetEpic = epics.find((e) => e.id === epicId);
    if (targetEpic && targetEpic.richStories.length > 0) {
      setActiveStoryId(targetEpic.richStories[0].id);
    }
  };

  const handlePhaseFilterChange = (phase: string) => {
    setStoryPhaseFilter(phase);
    const matching = currentEpic.richStories.filter((s) => {
      if (phase === "todos") return true;
      return s.phase === phase;
    });
    if (matching.length > 0) {
      setActiveStoryId(matching[0].id);
    }
  };

  const toggleStoryExpansion = (storyId: string) => {
    setActiveStoryId((prev) => (prev === storyId ? null : storyId));
  };

  // Story mutators
  const updateStory = (epicId: number, storyId: string, updates: any) => {
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      return {
        ...epic,
        richStories: epic.richStories.map((story) => (story.id === storyId ? { ...story, ...updates } : story)),
      };
    });
    saveEpics(updated);
  };

  const deleteStory = (epicId: number, storyId: string) => {
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      if (epic.richStories.length <= 1) {
        toast.error("Debe existir al menos 1 tarjeta en esta épica.");
        return epic;
      }
      return {
        ...epic,
        richStories: epic.richStories.filter((s) => s.id !== storyId),
      };
    });
    saveEpics(updated);
    if (activeStoryId === storyId) {
      const current = updated.find((e) => e.id === epicId);
      setActiveStoryId(current && current.richStories[0] ? current.richStories[0].id : null);
    }
    toast.info("Tarjeta eliminada.");
  };

  const addStory = (epicId: number) => {
    const targetEpic = epics.find((e) => e.id === epicId);
    const nextNum = (targetEpic?.richStories.length || 0) + 1;
    const newId = `e${epicId}_s${Date.now()}`;
    const newStory = {
      id: newId,
      title: `Nueva Historia ${nextNum}: Especificación funcional`,
      asA: "Usuario o Inversionista",
      iWant: "Gestionar esta funcionalidad desde la plataforma",
      soThat: "Pueda operar de forma rápida y segura.",
      status: "Sprint 1 (Listo)",
      phase: storyPhaseFilter !== "todos" ? storyPhaseFilter : "fase1",
      dod: [
        "Criterio de aceptación 1 aprobado",
        "Pruebas de validación ejecutadas",
      ],
    };
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      return {
        ...epic,
        richStories: [...epic.richStories, newStory],
      };
    });
    saveEpics(updated);
    setActiveStoryId(newId);
    toast.success("Nueva tarjeta de historia añadida.");
  };

  const updateDodItem = (epicId: number, storyId: string, dodIdx: number, val: string) => {
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      return {
        ...epic,
        richStories: epic.richStories.map((story) => {
          if (story.id !== storyId) return story;
          const newDod = [...story.dod];
          newDod[dodIdx] = val;
          return { ...story, dod: newDod };
        }),
      };
    });
    saveEpics(updated);
  };

  const addDodItem = (epicId: number, storyId: string) => {
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      return {
        ...epic,
        richStories: epic.richStories.map((story) => {
          if (story.id !== storyId) return story;
          return { ...story, dod: [...story.dod, `Nuevo criterio DoD ${story.dod.length + 1}`] };
        }),
      };
    });
    saveEpics(updated);
    toast.success("Criterio DoD añadido.");
  };

  const deleteDodItem = (epicId: number, storyId: string, dodIdx: number) => {
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      return {
        ...epic,
        richStories: epic.richStories.map((story) => {
          if (story.id !== storyId) return story;
          if (story.dod.length <= 1) return story;
          return { ...story, dod: story.dod.filter((_, i) => i !== dodIdx) };
        }),
      };
    });
    saveEpics(updated);
  };

  // Deliverables mutators
  const updateDeliverable = (epicId: number, idx: number, val: string) => {
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      const newDels = [...epic.deliverables];
      newDels[idx] = val;
      return {
        ...epic,
        deliverables: newDels,
        ...(idx === 0 ? { subtitle: val } : {}),
      };
    });
    saveEpics(updated);
  };

  const addDeliverable = (epicId: number) => {
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      return {
        ...epic,
        deliverables: [...epic.deliverables, `Nuevo Entregable ${epic.deliverables.length + 1}`],
      };
    });
    saveEpics(updated);
    toast.success("Entregable añadido.");
  };

  const deleteDeliverable = (epicId: number, idx: number) => {
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      if (epic.deliverables.length <= 1) {
        toast.error("Debe existir al menos 1 entregable.");
        return epic;
      }
      const newDeliverables = epic.deliverables.filter((_, i) => i !== idx);
      return {
        ...epic,
        deliverables: newDeliverables,
        subtitle: newDeliverables[0] || "",
      };
    });
    saveEpics(updated);
  };

  // Epic mutators
  const updateEpic = (epicId: number, updates: any) => {
    const updated = epics.map((epic) => (epic.id === epicId ? { ...epic, ...updates } : epic));
    saveEpics(updated);
  };

  const updateEpicSubtitle = (epicId: number, val: string) => {
    const updated = epics.map((epic) => {
      if (epic.id !== epicId) return epic;
      const newDeliverables = [...(epic.deliverables || [])];
      if (newDeliverables.length > 0) {
        newDeliverables[0] = val;
      } else {
        newDeliverables.push(val);
      }
      return {
        ...epic,
        subtitle: val,
        deliverables: newDeliverables,
      };
    });
    saveEpics(updated);
  };

  const addEpic = () => {
    const nextId = epics.length + 1;
    const newEpic: EpicItem = {
      id: nextId,
      title: `Épica ${nextId}: Nuevo Módulo Funcional`,
      icon: Sparkles,
      badge: "Módulo Adicional",
      coverage: "100% Especificado",
      subtitle: "Entregable 1",
      deliverables: ["Entregable 1", "Entregable 2"],
      richStories: [
        {
          id: `e${nextId}_s1`,
          title: "Funcionalidad Principal del Módulo",
          asA: "Usuario del Sistema",
          iWant: "Acceder a las funciones de este módulo",
          soThat: "Pueda ejecutar mis operaciones con facilidad.",
          status: "Sprint 1 (Listo)",
          phase: "fase1" as const,
          dod: ["Criterio de aceptación 1"],
        },
      ],
    };
    const updated = [...epics, newEpic];
    saveEpics(updated);
    setActiveEpicTab(nextId);
    setActiveStoryId(`e${nextId}_s1`);
    toast.success("Nueva épica añadida.");
  };

  const deleteEpic = (epicId: number) => {
    if (epics.length <= 1) {
      toast.error("Debe existir al menos 1 épica.");
      return;
    }
    const updated = epics.filter((e) => e.id !== epicId);
    saveEpics(updated);
    if (activeEpicTab === epicId) {
      setActiveEpicTab(updated[0].id);
      if (updated[0].richStories.length > 0) {
        setActiveStoryId(updated[0].richStories[0].id);
      }
    }
    toast.info("Épica eliminada.");
  };

  const toggleExpandAllStories = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (activeStoryId !== null) {
      setActiveStoryId(null);
    } else if (filteredStories.length > 0) {
      setActiveStoryId(filteredStories[0].id);
    }
  };

  const jumpToSimulatorTab = (simTab: "portafolio" | "ticket" | "estados" | "asesor") => {
    try {
      window.dispatchEvent(new CustomEvent("switch-simulator-tab", { detail: simTab }));
    } catch (err) {
      console.warn("Event dispatch warning:", err);
    }
    if (onNavigateToSimulator) {
      onNavigateToSimulator(simTab);
    }
    const el = document.getElementById("sec-simulador-interactivo-app") || document.querySelector('[id*="simulador"]');
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden theme-section-bg bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 py-20 border-b border-[#004F54]/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-8"
      >
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[var(--secondary-accent,#F08D17)] theme-h2-color uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec3_badge" defaultText="03. ALCANCE FUNCIONAL COMPLETO & HISTORIAS ÁGILES" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white theme-h1-color">
            <EditableField id="sec3_h2" defaultText="Detalle Funcional por 7 Épicas SIMV" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 theme-text-color max-w-3xl mx-auto font-medium">
            <EditableField
              id="sec3_desc"
              defaultText="Selecciona una Épica a la izquierda para consultar sus Historias de Usuario oficiales. Toca cualquier historia para desplegar su estructura ágil (Como/Quiero/Para), criterios DoD y probar la acción en vivo."
            />
          </p>
        </div>

        {/* Phase Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl theme-card-glass shadow-xl text-white">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium tracking-widest uppercase text-white/50 flex items-center gap-1.5 font-mono">
              <Filter className="w-3.5 h-3.5 text-[var(--secondary-accent,#F08D17)]" />
              <EditableText
                id={`scope_epics_filter_label_${currentSlug || "default"}`}
                value={filterLabel}
                onChange={saveFilterLabel}
                tag="span"
              />
            </span>
            <div className="flex flex-wrap items-center gap-1.5 pl-1">
              {filterButtons.map((btn) => {
                const isActive = storyPhaseFilter === btn.id;
                return (
                  <div
                    key={btn.id}
                    onClick={() => handlePhaseFilterChange(btn.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all select-none group/filterbtn ${
                      isActive
                        ? "bg-[var(--secondary-accent,#F08D17)] text-white shadow-md shadow-[var(--secondary-accent,#F08D17)]/25 scale-105"
                        : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <EditableText
                      id={`scope_epics_tab_btn_${btn.id}_${currentSlug || "default"}`}
                      value={btn.label}
                      onChange={(newVal) => updateFilterButtonLabel(btn.id, newVal)}
                      tag="span"
                    />

                    {isDesignMode && filterButtons.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => deleteFilterButton(btn.id, e)}
                        className={`p-0.5 rounded transition-all cursor-pointer opacity-50 hover:opacity-100 ${
                          isActive
                            ? "text-white/80 hover:text-white hover:bg-black/20"
                            : "text-white/50 hover:text-red-400 hover:bg-red-500/20"
                        }`}
                        title={`Eliminar botón "${btn.label}"`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}

              {isDesignMode && (
                <button
                  type="button"
                  onClick={addFilterButton}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold border border-dashed border-emerald-400/50 hover:border-emerald-400 text-emerald-300 hover:bg-emerald-500/10 flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                  title="Añadir un nuevo botón a la botonera"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Botón</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium text-white/70 bg-white/5 px-3.5 py-1.5 rounded-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <EditableText
              id={`scope_epics_summary_${currentSlug || "default"}`}
              value={filterSummary}
              onChange={saveFilterSummary}
              tag="span"
            />
          </div>
        </div>

        {/* Master-Detail Split Layout: Left Column = Epics Menu / Right Column = User Stories Cards */}
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          {/* LEFT COLUMN: Vertical Epics Menu (w-full lg:w-1/3) */}
          <div className="w-full lg:w-1/3 space-y-3 shrink-0 z-10 relative">
            <div className="text-[11px] font-mono font-medium tracking-widest text-white/50 uppercase px-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary-accent,#F08D17)]" />
                <EditableText
                  id={`scope_epics_col_title_${currentSlug || "default"}`}
                  value={epicsColTitle}
                  onChange={saveEpicsColTitle}
                  tag="span"
                />
              </span>
              <span className="text-[var(--secondary-accent,#F08D17)]/70 font-bold">
                <EditableText
                  id={`scope_epics_count_badge_${currentSlug || "default"}`}
                  value={epicsCountBadge}
                  onChange={saveEpicsCountBadge}
                  tag="span"
                />
              </span>
            </div>

            <div className="space-y-2">
              {epics.map((epic) => {
                const EpicIcon = epic.icon || UserCheck;
                const isSelected = activeEpicTab === epic.id;
                const matchingStoriesCount = epic.richStories.filter((s) => {
                  if (storyPhaseFilter === "fase1") return s.phase === "fase1";
                  if (storyPhaseFilter === "fase2") return s.phase === "fase2";
                  return true;
                }).length;

                return (
                  <div
                    key={epic.id}
                    onClick={() => handleEpicSelect(epic.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 shadow-sm group relative overflow-hidden select-none z-10 ${
                      isSelected
                        ? "bg-white/[0.08] backdrop-blur-md border-[var(--secondary-accent,#F08D17)]/50 shadow-xl ring-1 ring-[var(--secondary-accent,#F08D17)]/25 text-white scale-[1.01]"
                        : "bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm border-white/10 hover:border-white/20 text-white/80"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                          isSelected
                            ? "bg-[var(--secondary-accent,#F08D17)]/15 border border-[var(--secondary-accent,#F08D17)]/35 text-[var(--secondary-accent,#F08D17)] shadow-sm"
                            : "bg-white/5 border border-white/10 text-white/70 group-hover:text-white"
                        }`}
                      >
                        <EpicIcon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 space-y-1 flex-1">
                        <h3
                          className={`font-bold text-sm sm:text-base leading-snug transition-colors font-display break-words ${
                            isSelected ? "text-white" : "text-white/85 group-hover:text-white"
                          }`}
                        >
                          <EditableText
                            id={`epic_nav_title_${epic.id}`}
                            value={epic.title}
                            onChange={(val) => updateEpic(epic.id, { title: val })}
                            tag="span"
                          />
                        </h3>
                        <div
                          className={`text-xs font-mono break-words leading-relaxed ${
                            isSelected ? "text-[var(--secondary-accent,#F08D17)]/90 font-medium" : "text-white/50 group-hover:text-white/70"
                          }`}
                        >
                          <EditableText
                            id={`epic_nav_subtitle_${epic.id}`}
                            value={
                              epic.subtitle !== undefined && epic.subtitle !== ""
                                ? epic.subtitle
                                : epic.deliverables && epic.deliverables.length > 0
                                ? epic.deliverables[0]
                                : `${matchingStoriesCount} Historias Oficiales`
                            }
                            onChange={(val) => updateEpicSubtitle(epic.id, val)}
                            tag="span"
                            className="max-w-full inline-block"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isDesignMode && epics.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEpic(epic.id);
                          }}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all cursor-pointer opacity-50 group-hover:opacity-100"
                          title="Eliminar esta épica"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? "text-[var(--secondary-accent,#F08D17)] translate-x-0.5" : "text-white/30 group-hover:text-white/70"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}

              {isDesignMode && (
                <button
                  type="button"
                  onClick={addEpic}
                  className="w-full py-2.5 rounded-xl border border-dashed border-emerald-400/40 hover:border-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Nueva Épica</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN CONTAINER: Enclosed Master-Detail User Stories Dropdown Box (Hero-inspired glass card) */}
          <div className="w-full lg:w-2/3 p-5 sm:p-7 rounded-2xl theme-card-glass shadow-2xl space-y-5 relative overflow-hidden text-white">
            {/* Ambient subtle glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[var(--secondary-accent,#F08D17)]/5 blur-3xl rounded-full pointer-events-none" />

            {/* CO-BRANDING INSPIRED EPIC HERO BANNER */}
            <div className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all text-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
                {/* Left side: Epic metadata & title */}
                <div className="flex flex-col items-start text-left">
                  <span className="text-[11px] font-medium tracking-widest uppercase text-white/50 mb-1.5 flex items-center gap-2 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      ÉPICA 0{currentEpic.id} •{" "}
                      <span className="text-[var(--secondary-accent,#F08D17)] font-semibold">
                        <EditableText
                          id={`epic_badge_${currentEpic.id}`}
                          value={currentEpic.badge}
                          onChange={(val) => updateEpic(currentEpic.id, { badge: val })}
                          tag="span"
                        />
                      </span>
                    </span>
                  </span>
                  <div className="flex flex-wrap items-center gap-3 pt-0.5">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
                      <EditableText
                        id={`epic_title_${currentEpic.id}`}
                        value={currentEpic.title}
                        onChange={(val) => updateEpic(currentEpic.id, { title: val })}
                        tag="span"
                      />
                      <span className="text-emerald-400">.</span>
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-[var(--secondary-accent,#F08D17)]/10 border border-[var(--secondary-accent,#F08D17)]/30 text-[var(--secondary-accent,#F08D17)] inline-flex items-center font-mono font-medium">
                      <EditableText
                        id={`epic_coverage_${currentEpic.id}`}
                        value={currentEpic.coverage}
                        onChange={(val) => updateEpic(currentEpic.id, { coverage: val })}
                        tag="span"
                      />
                    </span>
                  </div>
                </div>

                {/* Línea divisoria sutil en Desktop */}
                <div className="hidden md:block w-px h-12 bg-white/10" />

                {/* Right side: Quick stats & collapse action */}
                <div className="flex flex-wrap items-start md:items-end gap-2 md:flex-col shrink-0">
                  <span className="text-[11px] font-medium tracking-widest uppercase text-white/50 mb-0.5 hidden md:flex items-center gap-1.5">
                    <span>HISTORIAS ÁGILES</span>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--secondary-accent,#F08D17)]" />
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleExpandAllStories}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-medium text-white/80 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95 select-none"
                    >
                      <ChevronDown className={`w-3.5 h-3.5 text-[var(--secondary-accent,#F08D17)] transition-transform duration-200 ${activeStoryId !== null ? "rotate-180" : ""}`} />
                      <span>{activeStoryId !== null ? "Colapsar Todo" : "Expandir Primera"}</span>
                    </button>
                    <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-white/5 text-white/70 border border-white/10">
                      {filteredStories.length} Historias
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Deliverables Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5 border-b border-white/10 pb-4">
              <span className="text-[11px] font-medium tracking-widest uppercase text-white/50 mr-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--secondary-accent,#F08D17)]" />
                <span>Entregables Clave:</span>
              </span>
              {currentEpic.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-white/5 hover:bg-white/10 text-white/80 px-3 py-1 rounded-md border border-white/10 font-mono font-medium transition-all inline-flex items-center gap-1.5"
                >
                  <span className="text-[var(--secondary-accent,#F08D17)]">✓</span>
                  <EditableText
                    id={`epic_del_${currentEpic.id}_${idx}`}
                    value={item}
                    onChange={(val) => updateDeliverable(currentEpic.id, idx, val)}
                    tag="span"
                  />
                  {isDesignMode && currentEpic.deliverables.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDeliverable(currentEpic.id, idx);
                      }}
                      className="text-red-400 hover:text-red-300 p-0.5 ml-0.5 cursor-pointer opacity-50 hover:opacity-100"
                      title="Eliminar entregable"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
              {isDesignMode && (
                <button
                  type="button"
                  onClick={() => addDeliverable(currentEpic.id)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 border border-dashed border-emerald-400/40 hover:border-emerald-400 px-2.5 py-1 rounded-md font-mono font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Entregable</span>
                </button>
              )}
            </div>

            {/* Interactive User Story Dropdown Toggle Cards List (Hero Glass Style) */}
            <div className="space-y-3">
              {filteredStories.length === 0 && (
                <div className="p-8 text-center bg-white/[0.02] border border-dashed border-white/15 rounded-xl space-y-2">
                  <p className="text-sm font-medium text-white/70">
                    No hay historias en este filtro para la épica seleccionada.
                  </p>
                  {isDesignMode && (
                    <button
                      type="button"
                      onClick={() => addStory(currentEpic.id)}
                      className="px-4 py-2 rounded-xl bg-[var(--secondary-accent,#F08D17)] text-white text-xs font-mono font-bold shadow-md hover:scale-105 transition-all inline-flex items-center gap-1.5 cursor-pointer mt-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Crear historia en esta fase</span>
                    </button>
                  )}
                </div>
              )}

              {filteredStories.map((story) => {
                const isExpanded = activeStoryId === story.id;
                return (
                  <div
                    key={story.id}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden shadow-md ${
                      isExpanded
                        ? "bg-white/[0.05] border-white/20 shadow-xl ring-1 ring-white/10"
                        : "bg-white/[0.02] hover:bg-white/[0.05] border-white/10 hover:border-white/20"
                    }`}
                  >
                    {/* Story Dropdown Header Bar */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStoryExpansion(story.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleStoryExpansion(story.id);
                        }
                      }}
                      className="p-3.5 sm:p-4 cursor-pointer flex items-center justify-between gap-3 select-none group"
                    >
                      <div className="flex flex-wrap items-center gap-3 min-w-0 flex-1">
                        {/* Status Pill Badge (Hero Glass Pill) */}
                        <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 shrink-0 inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <EditableText
                            id={`epic_story_${currentEpic.id}_${story.id}_status`}
                            value={story.status}
                            onChange={(val) => updateStory(currentEpic.id, story.id, { status: val })}
                            tag="span"
                          />
                        </span>

                        {isDesignMode && filterButtons.filter((b) => b.id !== "todos").length > 0 && (
                          <select
                            value={story.phase || "fase1"}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateStory(currentEpic.id, story.id, { phase: e.target.value });
                            }}
                            className="bg-black/30 text-emerald-300 border border-white/20 rounded px-2 py-0.5 text-[10px] font-mono cursor-pointer outline-none hover:border-[var(--secondary-accent,#F08D17)] shrink-0"
                            title="Asignar a qué botón de fase pertenece esta historia"
                          >
                            {filterButtons
                              .filter((b) => b.id !== "todos")
                              .map((b) => (
                                <option key={b.id} value={b.id} className="bg-zinc-900 text-white font-sans">
                                  {b.label}
                                </option>
                              ))}
                          </select>
                        )}

                        <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors font-display break-words flex-1">
                          <EditableText
                            id={`epic_story_${currentEpic.id}_${story.id}_title`}
                            value={story.title}
                            onChange={(val) => updateStory(currentEpic.id, story.id, { title: val })}
                            tag="span"
                          />
                        </h4>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0 ml-2">
                        {isDesignMode && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteStory(currentEpic.id, story.id);
                            }}
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all cursor-pointer opacity-60 hover:opacity-100"
                            title="Eliminar esta tarjeta"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {"demoTab" in story && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (story.demoTab) jumpToSimulatorTab(story.demoTab);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 font-mono font-medium text-xs flex items-center gap-1.5 active:scale-95 shadow-sm transition-all cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span className="hidden sm:inline">Probar en App</span>
                          </button>
                        )}

                        {/* Dropdown Chevron Indicator */}
                        <div
                          className={`w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/70 flex items-center justify-center transition-transform duration-200 ${
                            isExpanded ? "rotate-180 bg-white/10 text-white" : "group-hover:bg-white/10 group-hover:text-white"
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Dropdown Content Body */}
                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-white/10 space-y-3.5 bg-black/20 text-slate-200 transition-all">
                        {/* Estructura Ágil Box */}
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5">
                          <div className="text-[11px] font-medium font-mono tracking-widest uppercase text-[var(--secondary-accent,#F08D17)] flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-[var(--secondary-accent,#F08D17)]" />
                            <span>Estructura Ágil (User Story)</span>
                          </div>
                          <div className="text-xs sm:text-sm font-normal leading-relaxed text-slate-200">
                            <span className="text-[var(--secondary-accent,#F08D17)] font-bold">Como:</span>{" "}
                            <EditableText
                              id={`epic_story_${currentEpic.id}_${story.id}_asa`}
                              value={story.asA}
                              onChange={(val) => updateStory(currentEpic.id, story.id, { asA: val })}
                              tag="span"
                            />{" "}
                            | <span className="text-[var(--secondary-accent,#F08D17)] font-bold">Quiero:</span>{" "}
                            <EditableText
                              id={`epic_story_${currentEpic.id}_${story.id}_iwant`}
                              value={story.iWant}
                              onChange={(val) => updateStory(currentEpic.id, story.id, { iWant: val })}
                              tag="span"
                            />{" "}
                            | <span className="text-[var(--secondary-accent,#F08D17)] font-bold">Para:</span>{" "}
                            <EditableText
                              id={`epic_story_${currentEpic.id}_${story.id}_sothat`}
                              value={story.soThat}
                              onChange={(val) => updateStory(currentEpic.id, story.id, { soThat: val })}
                              tag="span"
                            />
                          </div>
                        </div>

                        {/* Criterios de Aceptación (DoD) */}
                        <div className="space-y-2">
                          <div className="text-[11px] font-medium font-mono tracking-widest uppercase text-white/50 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Criterios de Aceptación (DoD - Definition of Done)</span>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            {story.dod.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start justify-between gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/10 font-normal text-slate-200"
                              >
                                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--secondary-accent,#F08D17)] shrink-0 mt-0.5" />
                                  <EditableText
                                    id={`epic_story_${currentEpic.id}_${story.id}_dod_${idx}`}
                                    value={item}
                                    onChange={(val) => updateDodItem(currentEpic.id, story.id, idx, val)}
                                    tag="span"
                                    className="flex-1"
                                  />
                                </div>
                                {isDesignMode && story.dod.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteDodItem(currentEpic.id, story.id, idx);
                                    }}
                                    className="text-red-400 hover:text-red-300 opacity-50 hover:opacity-100 p-0.5 cursor-pointer shrink-0"
                                    title="Eliminar criterio"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                )}
                              </li>
                            ))}
                          </ul>
                          {isDesignMode && (
                            <button
                              type="button"
                              onClick={() => addDodItem(currentEpic.id, story.id)}
                              className="text-xs text-emerald-400 hover:text-emerald-300 font-mono font-medium flex items-center gap-1 mt-2 cursor-pointer transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Añadir Criterio DoD</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {isDesignMode && (
                <button
                  type="button"
                  onClick={() => addStory(currentEpic.id)}
                  className="w-full py-3.5 rounded-xl border border-dashed border-emerald-400/40 hover:border-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm mt-3"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Añadir Nueva Tarjeta de Historia</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
