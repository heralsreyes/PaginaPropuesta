import { ProposalData } from "./proposalData";
import arsPrimeraJson from "@/public/proposals/ars-primera.json";
import excelJson from "@/public/proposals/excel-puesto-de-bolsa.json";
import bhdJson from "@/public/proposals/bhd.json";
import cepmJson from "@/public/proposals/cepm.json";
import claroJson from "@/public/proposals/claro.json";
import grupoRamosJson from "@/public/proposals/grupo-ramos.json";
import puntacanaJson from "@/public/proposals/grupo-puntacana.json";
import empresaXJson from "@/public/proposals/empresa-x.json";

export const PRESET_PROPOSALS: Record<string, ProposalData> = {
  "ars-primera": arsPrimeraJson as unknown as ProposalData,
  "ars_primera": arsPrimeraJson as unknown as ProposalData,
  "ars": arsPrimeraJson as unknown as ProposalData,
  "excel-puesto-de-bolsa": excelJson as unknown as ProposalData,
  "excel": excelJson as unknown as ProposalData,
  "bhd": bhdJson as unknown as ProposalData,
  "cepm": cepmJson as unknown as ProposalData,
  "claro": claroJson as unknown as ProposalData,
  "grupo-ramos": grupoRamosJson as unknown as ProposalData,
  "grupo-puntacana": puntacanaJson as unknown as ProposalData,
  "empresa-x": empresaXJson as unknown as ProposalData,
};

export function getPresetProposal(slug?: string): ProposalData | null {
  if (!slug) return null;
  const clean = decodeURIComponent(slug).trim().toLowerCase();
  const dashed = clean.replace(/[\s_]+/g, "-");
  const underscored = clean.replace(/[\s-]+/g, "_");

  if (PRESET_PROPOSALS[clean]) return PRESET_PROPOSALS[clean];
  if (PRESET_PROPOSALS[dashed]) return PRESET_PROPOSALS[dashed];
  if (PRESET_PROPOSALS[underscored]) return PRESET_PROPOSALS[underscored];

  if (clean.includes("ars") || clean.includes("primera")) return PRESET_PROPOSALS["ars-primera"];
  if (clean.includes("excel")) return PRESET_PROPOSALS["excel-puesto-de-bolsa"];
  if (clean.includes("bhd")) return PRESET_PROPOSALS["bhd"];
  if (clean.includes("cepm")) return PRESET_PROPOSALS["cepm"];
  if (clean.includes("claro")) return PRESET_PROPOSALS["claro"];
  if (clean.includes("ramos")) return PRESET_PROPOSALS["grupo-ramos"];
  if (clean.includes("puntacana")) return PRESET_PROPOSALS["grupo-puntacana"];

  return null;
}
