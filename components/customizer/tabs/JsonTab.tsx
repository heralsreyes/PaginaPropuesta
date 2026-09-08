"use client";

import React, { useRef } from "react";
import { useProposal } from "@/context/ProposalContext";
import { useThemeStore } from "@/store/useThemeStore";
import { Download, Upload, RefreshCw } from "lucide-react";

export const JsonTab: React.FC = () => {
  const { proposal, exportJson, importJson, loadProposalByName, resetToDefault } = useProposal();
  const { theme } = useThemeStore();
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
    <div className="space-y-6 text-xs">
      <div>
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-2">
          Respaldar & Cargar Propuesta en JSON
        </h4>
        <p className="text-zinc-600 mb-4">
          Exporta todo el estado de la propuesta a un archivo .JSON local para guardarlo o cargarlo posteriormente en otra sesión.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={exportJson}
            className="p-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Descargar JSON</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-white border border-[#E4E4E7] hover:border-[#2563EB] text-[#111111] rounded-2xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-xs transition-all"
          >
            <Upload className="w-4 h-4 text-[#2563EB]" />
            <span>Importar JSON</span>
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
          Carga Rápida de Propuestas Predefinidas
        </h4>
        <p className="text-zinc-600 mb-3">
          Cambia al instante entre las propuestas institucionales disponibles en el repositorio:
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => loadProposalByName("ars-primera")}
            className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
              (proposal?.client?.shortName || "") === "ARS Primera" || (proposal?.client?.name || "").includes("Primera")
                ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs"
                : "bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800"
            }`}
          >
            🏥 ARS Primera
          </button>
          <button
            onClick={() => loadProposalByName("excel-puesto-de-bolsa")}
            className={`p-2.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
              (proposal?.client?.shortName || "").toUpperCase() === "EXCEL" || (proposal?.client?.name || "").includes("Excel")
                ? "bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-xs"
                : "bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800"
            }`}
          >
            📈 Excel Puesto de Bolsa
          </button>
          <button
            onClick={() => loadProposalByName("bhd")}
            className="p-2.5 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            🏦 Banco BHD
          </button>
          <button
            onClick={() => loadProposalByName("cepm")}
            className="p-2.5 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            ⚡ CEPM
          </button>
          <button
            onClick={() => loadProposalByName("claro")}
            className="p-2.5 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            📱 Claro Dominicana
          </button>
          <button
            onClick={() => loadProposalByName("grupo-ramos")}
            className="p-2.5 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            🛒 Grupo Ramos
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-2">
          Restablecer Valores Predeterminados
        </h4>
        <p className="text-zinc-600 mb-4">
          Si deseas descartar todos los cambios personalizados y restaurar los datos iniciales de la propuesta comercial:
        </p>

        <button
          onClick={resetToDefault}
          className="w-full p-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-2xl font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restablecer Todo a Valores de Fábrica</span>
        </button>
      </div>

      <div className="pt-4 border-t border-[#E4E4E7]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
            Visor de Estado JSON Actual
          </h4>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
            Paleta de color integrada
          </span>
        </div>
        <pre className="p-4 bg-[#18181B] text-emerald-400 rounded-2xl font-mono text-[10px] max-h-60 overflow-y-auto leading-relaxed scrollbar-thin">
          {JSON.stringify({ ...proposal, theme, colors: { primary: theme.accentColor, secondary: theme.secondaryAccent, background: theme.bgMain, card: theme.cardBg, border: theme.cardBorder, text: theme.textPrimary, textSecondary: theme.textSecondary, nav: theme.navBg } }, null, 2)}
        </pre>
      </div>
    </div>
  );
};
