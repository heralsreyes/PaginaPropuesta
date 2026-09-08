"use client";

import React, { useRef } from "react";
import { useProposal } from "@/context/ProposalContext";
import { Download, Upload, RefreshCw } from "lucide-react";

export const SidebarJsonTab: React.FC = () => {
  const { proposal, exportJson, importJson, loadProposalByName, resetToDefault } = useProposal();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importJson(content);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-5 text-xs p-4">
      <div>
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-3">
          Respaldar & Cargar Configuración de Studio
        </h4>

        <div className="space-y-2.5">
          <button
            onClick={exportJson}
            className="w-full p-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Descargar JSON de Propuesta</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-3 bg-[#FAF9F6] border border-[#E4E4E7] hover:border-[#2563EB] text-[#111111] rounded-2xl font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all"
          >
            <Upload className="w-4 h-4 text-[#2563EB]" />
            <span>Cargar Archivo JSON</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-2">
          Carga Rápida de Propuestas
        </h4>
        <p className="text-zinc-500 text-[11px] mb-3">
          Cambia al instante a otra propuesta institucional:
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => loadProposalByName("ars-primera")}
            className={`p-2 rounded-xl border text-left font-medium transition-all cursor-pointer ${
              (proposal?.client?.shortName || "") === "ARS Primera" || (proposal?.client?.name || "").includes("Primera")
                ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs"
                : "bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800"
            }`}
          >
            🏥 ARS Primera
          </button>
          <button
            onClick={() => loadProposalByName("excel-puesto-de-bolsa")}
            className={`p-2 rounded-xl border text-left font-medium transition-all cursor-pointer ${
              (proposal?.client?.shortName || "").toUpperCase() === "EXCEL" || (proposal?.client?.name || "").includes("Excel")
                ? "bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-xs"
                : "bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800"
            }`}
          >
            📈 Excel
          </button>
          <button
            onClick={() => loadProposalByName("bhd")}
            className="p-2 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            🏦 Banco BHD
          </button>
          <button
            onClick={() => loadProposalByName("cepm")}
            className="p-2 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            ⚡ CEPM
          </button>
          <button
            onClick={() => loadProposalByName("claro")}
            className="p-2 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            📱 Claro
          </button>
          <button
            onClick={() => loadProposalByName("grupo-ramos")}
            className="p-2 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            🛒 Grupo Ramos
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-3">
          Restaurar Estado Inicial
        </h4>

        <button
          onClick={resetToDefault}
          className="w-full p-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-2xl font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restablecer Todo a Valores Iniciales</span>
        </button>
      </div>
    </div>
  );
};
