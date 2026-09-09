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

export function getPresetProposal(
  slug?: string,
  options?: { allowFuzzy?: boolean }
): ProposalData | null {
  if (!slug) return null;
  const clean = decodeURIComponent(slug).trim().toLowerCase();
  const dashed = clean.replace(/[\s_]+/g, "-");
  const underscored = clean.replace(/[\s-]+/g, "_");

  let match: ProposalData | null = null;
  if (PRESET_PROPOSALS[clean]) match = PRESET_PROPOSALS[clean];
  else if (PRESET_PROPOSALS[dashed]) match = PRESET_PROPOSALS[dashed];
  else if (PRESET_PROPOSALS[underscored]) match = PRESET_PROPOSALS[underscored];

  // Coincidencias difusas SOLO si se permite explícitamente y no es un slug compuesto/versión
  if (!match && options?.allowFuzzy) {
    if (clean === "ars" || clean === "primera" || clean === "ars-primera") match = PRESET_PROPOSALS["ars-primera"];
    else if (clean === "excel" || clean === "excel-puesto-de-bolsa") match = PRESET_PROPOSALS["excel-puesto-de-bolsa"];
    else if (clean === "bhd" || clean === "banco-bhd") match = PRESET_PROPOSALS["bhd"];
    else if (clean === "cepm") match = PRESET_PROPOSALS["cepm"];
    else if (clean === "claro") match = PRESET_PROPOSALS["claro"];
    else if (clean === "ramos" || clean === "grupo-ramos") match = PRESET_PROPOSALS["grupo-ramos"];
    else if (clean === "puntacana" || clean === "grupo-puntacana") match = PRESET_PROPOSALS["grupo-puntacana"];
  }

  return match ? JSON.parse(JSON.stringify(match)) : null;
}
