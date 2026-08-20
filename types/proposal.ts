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
    hasTax?: boolean;
    taxPercent?: number;
    hasDiscount?: boolean;
    discountValue?: number;
    discountType?: "fixed" | "percent";
  };
}
