"use client";

import React, { useRef } from "react";
import { useProposal } from "@/context/ProposalContext";
import { Download, Upload, RefreshCw } from "lucide-react";

export const JsonTab: React.FC = () => {
  const { proposal, exportJson, importJson, resetToDefault } = useProposal();
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
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-2">
          Visor de Estado JSON Actual
        </h4>
        <pre className="p-4 bg-[#18181B] text-emerald-400 rounded-2xl font-mono text-[10px] max-h-60 overflow-y-auto leading-relaxed scrollbar-thin">
          {JSON.stringify(proposal, null, 2)}
        </pre>
      </div>
    </div>
  );
};
