export interface TeamMember {
  role: string;
  category: "Dirección" | "Arquitectura" | "Calidad" | "Construcción";
  dedicationPercent: number;
  responsibilities: string[];
  iconName: string;
}

export interface Requirement {
  id: string;
  category: "Core" | "Automatización" | "Integración" | "Reportes" | "Seguridad";
  title: string;
  description: string;
  deliverables: string[];
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  duration: string;
  description: string;
  status: "Completado" | "En Proceso" | "Pendiente";
  milestones: string[];
}

export interface PaymentTerm {
  milestone: string;
  percentage: number;
  description: string;
}

export interface StrategicContact {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
}

export interface ProposalData {
  company: {
    name: string;
    rnc: string;
    description: string;
    mission: string;
    vision: string;
    values: string[];
    certifications: string[];
    logoUrl?: string;
  };
  client: {
    name: string;
    shortName: string;
    contactName: string;
    contactRole: string;
    logoUrl?: string;
  };
  project: {
    code: string;
    title: string;
    heroTitlePrefix?: string;
    heroTitleAccent?: string;
    heroTitleSuffix?: string;
    heroHeadline?: string;
    heroSubtitle?: string;
    version: string;
    date: string;
    author: string;
    authorRole: string;
    authorPhone: string;
    authorEmail: string;
    estimatedDuration: string;
    guaranteePeriod: string;
  };
  contacts: StrategicContact[];
  team: TeamMember[];
  requirements: Requirement[];
  roadmap: RoadmapPhase[];
  clientResponsibilities: string[];
  enfocoResponsibilities: string[];
  budget: {
    amountWithoutTax: number;
    taxAmount: number;
    totalAmount: number;
    currency: "USD" | "DOP";
    paymentTerms: PaymentTerm[];
    hasTax?: boolean;
    taxPercent?: number;
    hasDiscount?: boolean;
    discountValue?: number;
    discountType?: "fixed" | "percent";
  };
}

export const sampleProposal: ProposalData = {
  company: {
    name: "ENFOCO, S.R.L.",
    rnc: "1-31-44504-0",
    description:
      "Somos una empresa de tecnología especializada en Desarrollo de Software a la medida, automatización y mejoramiento de procesos operativos. Contamos con más de 10 años de experiencia comprobada en soluciones financieras y de salud, respaldada por un equipo multidisciplinario de alto nivel.",
    mission:
      "Brindar servicios de asesoría, desarrollo de nuevos modelos operativos y aplicaciones a la medida, con asistencia empresarial personalizada, garantizando soluciones confiables a cargo de nuestro equipo de profesionales calificados, de la más alta calidad, para satisfacer a nuestros clientes.",
    vision:
      "Ser el mejor aliado de nuestros clientes para apoyar la innovación de sus procesos y soluciones tecnológicas, sostenidos en nuevas ideas, actitud de servicio, calidad operacional y rentabilidad del negocio.",
    values: [
      "Innovación Constante",
      "Liderazgo Técnico",
      "Honestidad e Integridad",
      "Compromiso & Dedicación",
      "Seguridad de la Información",
    ],
    certifications: [
      "Metodología Agile / Scrum",
      "Arquitectura de Software & Microservicios",
      "Calidad de Software (QA)",
      "Mejores Prácticas CMMI & COBIT",
      "ISO 27002 & ITIL Framework",
      "Normativas de Seguridad SIMV",
    ],
  },
  client: {
    name: "Excel Puesto de Bolsa, S.A. & ESAFI",
    shortName: "EXCEL",
    contactName: "Comité Evaluador de Tecnología & Operaciones",
    contactRole: "Dirección de Tecnología e Inversiones",
  },
  project: {
    code: "ENF-PROP-2026-EXCEL",
    title: "Desarrollo Web & App Móvil EXCEL — Portal de Inversionistas & Canales Digitales Autogestionados",
    heroTitlePrefix: "Transformación Digital &",
    heroTitleAccent: "Canal de Inversionistas",
    heroTitleSuffix: "para Excel Puesto de Bolsa",
    heroHeadline: "Transformación Digital & *Canal de Inversionistas* para Excel Puesto de Bolsa",
    heroSubtitle: "Plataforma web modular y aplicación móvil multiplataforma para autogestión de portafolios, solicitudes con aprobación fehaciente, integración nativa con Dynamics CRM (EPB) y SIFI Fondos (ESAFI), y resúmenes con Inteligencia Artificial.",
    version: "2.0",
    date: "10 de Agosto, 2026",
    author: "Jorge Martínez",
    authorRole: "Gerente General & Lead Strategist",
    authorPhone: "809-481-4035",
    authorEmail: "jmartinez@enfoco.com.do",
    estimatedDuration: "8 a 12 Semanas",
    guaranteePeriod: "60 Días Cobertura Total",
  },
  contacts: [
    {
      name: "Jorge Martínez",
      company: "ENFOCO, S.R.L.",
      role: "Gerente General & Lead Strategist",
      email: "jmartinez@enfoco.com.do",
      phone: "809-481-4035",
    },
    {
      name: "Rosa Elba Martínez",
      company: "ENFOCO, S.R.L.",
      role: "Analista de Proyectos & Operaciones",
      email: "rmartinez@enfoco.com.do",
      phone: "809-481-4035",
    },
  ],
  team: [
    {
      role: "Director de Proyecto & Estrategia",
      category: "Dirección",
      dedicationPercent: 50,
      responsibilities: [
        "Responsable de la planificación, coordinación y seguimiento del proyecto.",
        "Alineación estratégica con los objetivos del negocio de Excel Puesto de Bolsa y ESAFI.",
        "Gestión de comunicación de avance y mitigación de riesgos con el comité evaluador.",
      ],
      iconName: "Briefcase",
    },
    {
      role: "Arquitecto de Soluciones, Integraciones & IA",
      category: "Arquitectura",
      dedicationPercent: 100,
      responsibilities: [
        "Definición de arquitectura web/móvil modular, microservicios y conectores RESTful.",
        "Integración bidireccional con Microsoft Dynamics 365 CRM (EPB) y SIFI Fondos (ESAFI).",
        "Diseño e implementación del motor de expedientes e Inteligencia Artificial.",
      ],
      iconName: "Cpu",
    },
    {
      role: "Líder UX/UI & Diseñador de Interfaces",
      category: "Arquitectura",
      dedicationPercent: 100,
      responsibilities: [
        "Diseño de la experiencia de usuario intuitiva para clientes e inversionistas.",
        "Elaboración de prototipos interactivos en Figma para web y app móvil.",
        "Garantizar la consistencia de marca y accesibilidad de la solución.",
      ],
      iconName: "Sparkles",
    },
    {
      role: "Desarrolladores Senior Web & Mobile",
      category: "Construcción",
      dedicationPercent: 100,
      responsibilities: [
        "Construcción del portal web en Next.js/React y aplicación móvil nativa/cross-platform.",
        "Desarrollo de módulos de Portafolio 360°, Trade Ticket digital y consultas en tiempo real.",
        "Implementación del cifrado TLS 1.3/AES-256 y autenticación biométrica (FaceID/TouchID).",
      ],
      iconName: "Code",
    },
    {
      role: "Especialista QA & Seguridad de Información SIMV",
      category: "Calidad",
      dedicationPercent: 100,
      responsibilities: [
        "Ejecución de pruebas funcionales, de integración, rendimiento y UAT con usuarios.",
        "Verificación del cumplimiento con las normas de Seguridad de la Información de la SIMV.",
        "Auditoría de logs, cifrado de datos sensibles y emisión de certificación QA.",
      ],
      iconName: "ShieldCheck",
    },
  ],
  requirements: [
    {
      id: "REQ-01",
      category: "Core",
      title: "Épica 1: Registro, Autenticación Segura & Perfil KYC Inversionista",
      description: "Acceso biométrico (FaceID/TouchID), login seguro OTP por SMS/email, perfilado de riesgo SIMV (Conservador, Moderado, Agresivo) y gestión automatizada de sesiones expirables.",
      deliverables: [
        "Autenticación Biométrica & OTP 2FA",
        "Formulario KYC Digital & Carga Documental",
        "Perfilado de Inversionista Certificado SIMV",
      ],
    },
    {
      id: "REQ-02",
      category: "Core",
      title: "Épica 2: Portafolio Consolidado 360° & Consultas 24/7",
      description: "Visualización unificada de inversiones: Renta Fija, Mutuos Estructurados, Sell/Buy-Backs, Fondos Inmobiliarios Excel I y II, Fondos Abiertos ESAFI, cotitularidad y rendimientos acumulados.",
      deliverables: [
        "Dashboard Portafolio 360° Consolidado",
        "Detalle de Rendimientos, Dividendos y Cupones",
        "Actualización Diaria Automática de Precios",
      ],
    },
    {
      id: "REQ-03",
      category: "Reportes",
      title: "Épica 3: Estados de Cuenta Digitales PDF Protegidos",
      description: "Consulta y descarga directa de estados de cuenta mensuales de los últimos 12 meses, protegidos mediante clave del titular (Cédula/RNC) con visor integrado.",
      deliverables: [
        "Visor & Descargador de PDF en Tiempo Real",
        "Protección con Cifrado y Clave de Titular",
        "Histórico Digital de 12 Meses",
      ],
    },
    {
      id: "REQ-04",
      category: "Automatización",
      title: "Épica 4: Solicitudes Digitales, Trade Ticket & Aprobación Fehaciente",
      description: "Procesamiento de órdenes de compra/venta de cuotas, pactos de Mutuos Estructurados y rescates ESAFI con generación de Trade Ticket digital y validación biométrica/OTP fehaciente.",
      deliverables: [
        "Motor de Solicitudes Digitales & Mutuos",
        "Generación de Trade Ticket Digital Auditable",
        "Mecanismo de Aprobación Fehaciente",
      ],
    },
    {
      id: "REQ-05",
      category: "Integración",
      title: "Épica 4.2: Enrutamiento Inteligente Dynamics 365 CRM & SIFI Fondos",
      description: "Separación automatizada de flujos: operaciones EPB generan Oportunidades comerciales vinculadas al titular en Dynamics CRM; aportes/rescates ESAFI envían orden directa a SIFI Fondos.",
      deliverables: [
        "Conector RESTful Microsoft Dynamics 365 CRM",
        "Integración con SIFI Fondos ESAFI",
        "Trazabilidad Comercial y Operativa",
      ],
    },
    {
      id: "REQ-06",
      category: "Automatización",
      title: "Épica 5: Mensajería Push, Alerta Vencimiento 15 Días & Asesor",
      description: "Bandeja de mensajes globales configurados en Dynamics CRM, notificaciones push masivas/segmentadas, alertas automáticas de vencimiento de Mutuos a 15 días y contacto directo con ejecutivo asignado.",
      deliverables: [
        "Disparadores de Vencimiento a 15 Días",
        "Gestión de Mensajes Masivos Push/Web",
        "Canal de Comunicación con Asesor de Cartera",
      ],
    },
    {
      id: "REQ-07",
      category: "Core",
      title: "Épica 6: Cotizaciones en Tiempo Real & Información de Productos",
      description: "Visualización pública y privada de cotizaciones vigentes de Fondos Abiertos, Fondos Cerrados Inmobiliarios y Fondo Cerrado de Sociedades, con enlaces oficiales y contactos.",
      deliverables: [
        "Tablero de Cotizaciones en Vivo",
        "Directorio de Productos EPB & ESAFI",
        "Diferenciación Clara entre Entidades",
      ],
    },
    {
      id: "REQ-08",
      category: "Seguridad",
      title: "Épica 7: Seguridad ISO 27002, Auditoría & Gobernanza SIMV",
      description: "Cifrado de extremo a extremo TLS 1.3 / AES-256, bitácora auditable de accesos y transacciones, control de roles (RBAC) y cumplimiento estricto con normativas de la SIMV.",
      deliverables: [
        "Bitácora Auditable de Transacciones",
        "Cumplimiento Regulatorio SIMV & ISO 27002",
        "Dashboard de Monitoreo & SLA Operativo",
      ],
    },
  ],
  roadmap: [
    {
      phase: "Fase I",
      title: "Levantamiento, Arquitectura & Prototipos Figma",
      duration: "Semanas 1 - 3",
      description: "Levantamiento detallado de requerimientos con el equipo de Excel, diseño de prototipos interactivos UI/UX en Figma para Web y Móvil, y definición del modelo de integración CRM/SIFI.",
      status: "Completado",
      milestones: [
        "Documento de Arquitectura Aprobado",
        "Prototipos Figma Interactivos Aprobados",
        "Definición de Conectores Dynamics CRM & SIFI",
      ],
    },
    {
      phase: "Fase II",
      title: "Construcción Core Web, App Móvil & Trade Ticket",
      duration: "Semanas 4 - 8",
      description: "Desarrollo del portal web en Next.js, app móvil multiplataforma, motor de autogestión de portafolio 360°, generación de Trade Ticket digital y módulo de Mutuos Estructurados.",
      status: "En Proceso",
      milestones: [
        "Módulo Portafolio 360° & Cotizaciones",
        "Generador de Trade Ticket con Firma Fehaciente",
        "App Móvil Instalable iOS & Android",
      ],
    },
    {
      phase: "Fase III",
      title: "Integración CRM/SIFI, QA & Auditoría SIMV",
      duration: "Semanas 9 - 10",
      description: "Conexión bidireccional con Microsoft Dynamics CRM, integración con SIFI Fondos, pruebas integrales de QA, auditoría de seguridad SIMV y certificación UAT con el cliente.",
      status: "Pendiente",
      milestones: [
        "Conector Dynamics CRM & SIFI Fondos Operativo",
        "Pruebas de Regresión & Seguridad ISO 27002",
        "Certificación UAT por el Comité de Excel",
      ],
    },
    {
      phase: "Fase IV",
      title: "Pase a Producción, Capacitación & Soporte",
      duration: "Semanas 11 - 12",
      description: "Despliegue final en la infraestructura cloud de Excel, publicación de app en Stores, capacitación del equipo operativo e inicio de la garantía de 60 días.",
      status: "Pendiente",
      milestones: [
        "Pase a Producción Exitoso",
        "Publicación en App Store & Google Play",
        "Inicio Garantía 60 Días Cobertura Total",
      ],
    },
  ],
  clientResponsibilities: [
    "Designar un Líder de Proyecto / Contraparte Técnica disponible durante el desarrollo.",
    "Proporcionar credenciales de pruebas y documentación de APIs de Microsoft Dynamics 365 CRM y SIFI Fondos.",
    "Validar y otorgar aprobación formal a los prototipos Figma y documentos de arquitectura.",
    "Participar en las sesiones de pruebas de aceptación (UAT) y coordinar al personal clave.",
    "Gestionar la publicación oficial de la aplicación móvil en la cuenta institucional de Apple/Google.",
  ],
  enfocoResponsibilities: [
    "Desarrollar y entregar una solución web y móvil con los más altos estándares de calidad y diseño vanguardista.",
    "Garantizar el cumplimiento estricto con las Normas de Seguridad de la Información dictadas por la SIMV.",
    "Implementar conectores bidireccionales seguros con Microsoft Dynamics CRM y SIFI Fondos.",
    "Brindar capacitación técnica y operativa al personal de Excel Puesto de Bolsa y ESAFI.",
    "Ofrecer acompañamiento continuo y 60 días de garantía total posterior al pase a producción.",
  ],
  budget: {
    amountWithoutTax: 5000.0,
    taxAmount: 900.0,
    totalAmount: 5900.0,
    currency: "USD",
    hasTax: true,
    taxPercent: 18,
    hasDiscount: false,
    discountValue: 0,
    discountType: "fixed",
    paymentTerms: [
      {
        milestone: "Aprobación de la Propuesta & Firma de Contrato (50%)",
        percentage: 50,
        description: "Inicio de actividades, levantamiento de procesos y diseño de prototipos Figma.",
      },
      {
        milestone: "Entrega de Desarrollo Core & Pruebas UAT (40%)",
        percentage: 40,
        description: "Presentación funcional completa del portal web, app móvil y conectores CRM/SIFI.",
      },
      {
        milestone: "Pase a Producción & Aceptación Final (10%)",
        percentage: 10,
        description: "Despliegue final en tiendas y servidores de Excel, inicio de garantía de 60 días.",
      },
    ],
  },
};
