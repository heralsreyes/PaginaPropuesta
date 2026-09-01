import { z } from "zod";

export const proposalClientSchema = z.object({
  name: z.string().min(1, "El nombre del cliente es obligatorio"),
  shortName: z.string().optional().default(""),
  rnc: z.string().optional().default(""),
  industry: z.string().optional().default(""),
  contactName: z.string().optional().default(""),
  contactPerson: z.string().optional().default(""),
  contactRole: z.string().optional().default(""),
  contactEmail: z.string().email("Correo electrónico de contacto inválido").or(z.literal("")).optional().default(""),
  contactPhone: z.string().optional().default(""),
});

export const proposalCompanySchema = z.object({
  name: z.string().min(1, "El nombre de la empresa es obligatorio"),
  rnc: z.string().optional().default(""),
  description: z.string().optional().default(""),
  email: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  website: z.string().optional().default(""),
  address: z.string().optional().default(""),
  mission: z.string().optional().default(""),
  vision: z.string().optional().default(""),
  values: z.array(z.string()).optional().default([]),
  certifications: z.array(z.string()).optional().default([]),
});

export const proposalProjectSchema = z.object({
  code: z.string().optional().default(""),
  title: z.string().optional().default(""),
  heroTitlePrefix: z.string().optional(),
  heroTitleAccent: z.string().optional(),
  heroTitleSuffix: z.string().optional(),
  heroHeadline: z.string().optional(),
  heroSubtitle: z.string().optional(),
  version: z.string().optional().default("1.0"),
  date: z.string().optional().default(""),
  author: z.string().optional().default(""),
  authorRole: z.string().optional().default(""),
  authorPhone: z.string().optional().default(""),
  authorEmail: z.string().optional().default(""),
  description: z.string().optional().default(""),
  objective: z.string().optional().default(""),
  estimatedDuration: z.string().optional().default(""),
  startDate: z.string().optional().default(""),
  validUntil: z.string().optional().default(""),
  guaranteePeriod: z.string().optional().default(""),
  methodology: z.string().optional().default(""),
});

export const paymentTermSchema = z.object({
  milestone: z.string().optional().default("Hito de Pago"),
  percentage: z.number().min(0).max(100),
  description: z.string().default(""),
  amount: z.number().optional(),
});

export const budgetSchema = z.object({
  amountWithoutTax: z.number().nonnegative().default(0),
  taxAmount: z.number().nonnegative().default(0),
  totalAmount: z.number().nonnegative().default(0),
  currency: z.enum(["USD", "DOP"]).default("USD"),
  paymentTerms: z.array(paymentTermSchema).min(1, "Debe existir al menos un término de pago"),
  hasTax: z.boolean().optional().default(true),
  taxPercent: z.number().min(0).max(100).optional().default(18),
  hasDiscount: z.boolean().optional().default(false),
  discountValue: z.number().min(0).optional().default(0),
  discountType: z.enum(["fixed", "percent"]).optional().default("fixed"),
});

export const teamMemberSchema = z.object({
  role: z.string().min(1, "El rol es obligatorio"),
  category: z.string().optional().default("Construcción"),
  dedicationPercent: z.number().min(0).max(100).optional().default(100),
  responsibilities: z.array(z.string()).optional().default([]),
  iconName: z.string().optional().default("UserCheck"),
});

export const requirementCategorySchema = z.enum(["Core", "Automatización", "Integración", "Reportes", "Seguridad"]).or(z.string());

export const requirementSchema = z.object({
  id: z.string().default("REQ-01"),
  category: requirementCategorySchema.default("Core"),
  title: z.string().min(1, "El título del requerimiento es obligatorio"),
  description: z.string().optional().default(""),
  deliverables: z.array(z.string()).optional().default([]),
});

export const roadmapPhaseSchema = z.object({
  phase: z.string().default("Fase 1"),
  title: z.string().min(1, "El título de la fase es obligatorio"),
  duration: z.string().optional().default("Semanas 1-2"),
  description: z.string().optional().default(""),
  status: z.enum(["Completado", "En Proceso", "Pendiente"]).or(z.string()).default("Pendiente"),
  milestones: z.array(z.string()).optional().default([]),
});

export const strategicContactSchema = z.object({
  name: z.string().default(""),
  company: z.string().default(""),
  role: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
});

export const proposalSchema = z
  .object({
    company: proposalCompanySchema,
    client: proposalClientSchema,
    project: proposalProjectSchema,
    contacts: z.array(strategicContactSchema).optional().default([]),
    requirements: z.array(requirementSchema).optional().default([]),
    roadmap: z.array(roadmapPhaseSchema).optional().default([]),
    team: z.array(teamMemberSchema).optional().default([]),
    budget: budgetSchema,
    clientResponsibilities: z.array(z.string()).optional().default([]),
    enfocoResponsibilities: z.array(z.string()).optional().default([]),
  })
  .passthrough();

export type ValidatedProposal = z.infer<typeof proposalSchema>;

/**
 * Validates whether an unknown JSON object matches the proposal schema.
 * @param data Parsed JSON object
 * @returns { success: true, data: ValidatedProposal } | { success: false, error: string }
 */
export function validateProposalData(data: unknown): { success: boolean; data?: ValidatedProposal; error?: string } {
  const result = proposalSchema.safeParse(data);
  if (!result.success) {
    const errorMessages = result.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ");
    return { success: false, error: errorMessages };
  }
  return { success: true, data: result.data };
}

/**
 * Sanitize user input strings (trims, removes dangerous control chars).
 */
export function sanitizeText(val: string): string {
  if (!val) return "";
  return val.trim().replace(/[<>]/g, "");
}
