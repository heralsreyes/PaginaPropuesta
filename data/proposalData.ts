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
  };
  client: {
    name: string;
    shortName: string;
    contactName: string;
    contactRole: string;
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
  };
}

export const sampleProposal: ProposalData = {
  company: {
    name: "ENFOCO, S.R.L.",
    rnc: "1-31-44504-0",
    description:
      "Somos una empresa de tecnología especializada en Desarrollo de Software a la medida, automatización y mejoramiento de procesos operativos. Contamos con amplia experiencia empresarial y comercial, respaldada por un equipo de profesionales de alto nivel.",
    mission:
      "Brindar servicios de asesoría, desarrollo de nuevos modelos operativos y aplicaciones a la medida, con asistencia empresarial personalizada, garantizando soluciones confiables a cargo de nuestro equipo de profesionales calificados, de la más alta calidad, para satisfacer a nuestros clientes.",
    vision:
      "Ser el mejor aliado de nuestros clientes, para apoyar la innovación de los procesos y soluciones tecnológicas, sostenidos en nuevas ideas, actitud de servicios, calidad de los procesos y rentabilidad del negocio.",
    values: [
      "Innovación Constante",
      "Liderazgo Técnico",
      "Honestidad e Integridad",
      "Compromiso & Dedicación",
    ],
    certifications: [
      "Metodología Agile / Scrum",
      "Diplomado en Arquitectura de Software",
      "Calidad de Software (QA)",
      "Mejores Prácticas CMMI & COBIT",
      "ISO 27002 & ITIL Framework",
    ],
  },
  client: {
    name: "Empresa X Corporativa",
    shortName: "EMPRESA X",
    contactName: "Dirección de Tecnología",
    contactRole: "Comité Evaluador de Proyectos",
  },
  project: {
    code: "ENF-PROP-2026-08",
    title: "Plataforma Web Empresarial de Automatización de Procesos & Gestión Operativa",
    heroTitlePrefix: "Transformación Digital &",
    heroTitleAccent: "Gestión Operativa",
    heroTitleSuffix: "para EMPRESA X",
    heroHeadline: "Transformación Digital & *Gestión Operativa* para EMPRESA X",
    heroSubtitle: "Elevando la eficiencia operacional de EMPRESA X a través de una plataforma web modular, escalable y desarrollada a la medida.",
    version: "1.0",
    date: "6 de Agosto, 2026",
    author: "Rosa Elba Martínez",
    authorRole: "Analista de Proyectos & Operaciones",
    authorPhone: "809-481-4035",
    authorEmail: "rmartinez@enfoco.com.do",
    estimatedDuration: "12 a 16 Semanas",
    guaranteePeriod: "60 Días Calendario",
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
      role: "Gerente de Tecnología & Negocio",
      category: "Dirección",
      dedicationPercent: 50,
      responsibilities: [
        "Representante de las partes interesadas en los resultados.",
        "Dirigir la alineación estratégica del proyecto.",
        "Colaborar en planificar, revisar y dar detalle a objetivos.",
      ],
      iconName: "Briefcase",
    },
    {
      role: "Arquitecto de Procesos & Software",
      category: "Arquitectura",
      dedicationPercent: 100,
      responsibilities: [
        "Evaluar y definir soluciones técnicas avanzadas.",
        "Establecer la arquitectura de software y base de datos.",
        "Diseñar patrones de integración y seguridad enterprise.",
      ],
      iconName: "Cpu",
    },
    {
      role: "Analista de Proyectos & QA",
      category: "Calidad",
      dedicationPercent: 100,
      responsibilities: [
        "Asegurar la calidad del desarrollo y su funcionamiento.",
        "Gestionar levantamientos y pruebas UAT de aceptación.",
        "Supervisar el cumplimiento de cronograma y entregables.",
      ],
      iconName: "ShieldCheck",
    },
    {
      role: "Ingeniero de Software Web Lead",
      category: "Construcción",
      dedicationPercent: 100,
      responsibilities: [
        "Construcción completa de la plataforma web frontend/backend.",
        "Desarrollo de interfaces UI/UX interactivas y accesibles.",
        "Implementación de lógica de negocio y automatizaciones.",
      ],
      iconName: "Code",
    },
    {
      role: "Ingeniero de Software Base de Datos",
      category: "Construcción",
      dedicationPercent: 100,
      responsibilities: [
        "Construcción de conectores y APIs de integraciones.",
        "Optimización de modelos relacionales y procedimientos.",
        "Garantizar la integridad de datos y modelos de consulta.",
      ],
      iconName: "Database",
    },
  ],
  requirements: [
    {
      id: "REQ-01",
      category: "Core",
      title: "Módulo de Registro & Solicitud Operativa",
      description: "Captura digital de formularios de registro con validaciones de campos en tiempo real y soporte para adjuntar documentación.",
      deliverables: ["Formularios dinámicos web", "Carga de archivos PDF/JPG", "Validaciones de datos empresarial"],
    },
    {
      id: "REQ-02",
      category: "Automatización",
      title: "Motor de Reglas de Negocio & Flujo de Aprobaciones",
      description: "Automatización del enrutamiento de solicitudes según criterios configurables, notificaciones y estados de aprobación.",
      deliverables: ["Tablero de seguimiento de estados", "Notificaciones por Email/SMS", "Matriz de aprobación por roles"],
    },
    {
      id: "REQ-03",
      category: "Integración",
      title: "Conector API con Sistemas Empresariales Legacy",
      description: "Integración segura mediante web services REST/SOAP para consultar y sincronizar datos operativos con la base central.",
      deliverables: ["API RESTful documentada", "Encriptación SSL/TLS", "Logs auditables de transacción"],
    },
    {
      id: "REQ-04",
      category: "Reportes",
      title: "Dashboard de Indicadores Operativos & Métricas",
      description: "Visualización en tiempo real de volúmenes de solicitudes, tiempos promedio de respuesta y cuellos de botella.",
      deliverables: ["Gráficos interactivos", "Exportación de datos a Excel/PDF", "Filtros por periodo y estatus"],
    },
    {
      id: "REQ-05",
      category: "Seguridad",
      title: "Gestión de Accesos & Perfiles por Roles (RBAC)",
      description: "Control estricto de autenticación con cifrado de contraseñas, sesiones expirables y permisos específicos.",
      deliverables: ["Autenticación segura JWT", "Auditoría de acciones de usuario", "Cumplimiento ISO 27002"],
    },
  ],
  roadmap: [
    {
      phase: "Fase I",
      title: "Levantamiento, Análisis & Diseño",
      duration: "Semanas 1 - 3",
      description: "Definición detallada de requerimientos, diseño de prototipos UI/UX y arquitectura del sistema.",
      status: "Completado",
      milestones: ["Documento de Alcance", "Prototipos Figma", "Arquitectura Aprobada"],
    },
    {
      phase: "Fase II",
      title: "Desarrollo Core & Integraciones",
      duration: "Semanas 4 - 10",
      description: "Construcción de componentes web, motor de reglas, base de datos y APIs de integración.",
      status: "En Proceso",
      milestones: ["Módulo Principal", "APIs de Integración", "Panel de Administración"],
    },
    {
      phase: "Fase III",
      title: "Pruebas UAT, QA & Ajustes",
      duration: "Semanas 11 - 13",
      description: "Pruebas integrales de calidad con usuarios clave, corrección de hallazgos y optimización.",
      status: "Pendiente",
      milestones: ["Certificación QA", "Pruebas UAT Cliente", "Aceptación Formal"],
    },
    {
      phase: "Fase IV",
      title: "Pase a Producción & Capacitación",
      duration: "Semanas 14 - 16",
      description: "Despliegue en servidor de producción, capacitación del personal y soporte en vivo.",
      status: "Pendiente",
      milestones: ["Despliegue Exitoso", "Manuales de Usuario", "Inicio Periodo Garantía"],
    },
  ],
  clientResponsibilities: [
    "Disponer de espacios y horarios para realizar levantamientos de información con el personal involucrado.",
    "Designar un Líder o Encargado de Proceso disponible durante la ejecución.",
    "Gestionar la documentación y entregas de información en los tiempos acordados en el cronograma.",
    "Acceder a reuniones periódicas para recibir informes de estatus y avances del proyecto.",
    "Firmar documento de aceptación para cada entregable recibido una vez certificado.",
  ],
  enfocoResponsibilities: [
    "Entregar un producto de calidad que cumpla con las especificaciones técnicas definidas.",
    "Pautar reuniones periódicas para informar sobre los avances y estatus del proyecto.",
    "Dar acompañamiento continuo durante la fase de pruebas UAT y periodo de garantía.",
    "Acompañar a la empresa cliente durante la implementación del proyecto en producción.",
    "Documentar formalmente todas las mejoras y requerimientos aceptados.",
  ],
  budget: {
    amountWithoutTax: 12500.0,
    taxAmount: 2250.0,
    totalAmount: 14750.0,
    currency: "USD",
    paymentTerms: [
      {
        milestone: "Aprobación de la Propuesta & Firma de Contrato",
        percentage: 50,
        description: "Inicio de actividades y levantamiento formal.",
      },
      {
        milestone: "Entrega del Desarrollo & Pruebas UAT",
        percentage: 40,
        description: "Demostración funcional del software completo.",
      },
      {
        milestone: "Pase a Producción & Aceptación Final",
        percentage: 10,
        description: "Despliegue final e inicio de la garantía de 60 días.",
      },
    ],
  },
};
