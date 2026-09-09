"use client";

import React, { useRef, useState, useEffect } from "react";
import { useProposal } from "@/context/ProposalContext";
import { useThemeStore } from "@/store/useThemeStore";
import {
  Download,
  Upload,
  RefreshCw,
  Save,
  Loader2,
  Check,
  CheckCircle2,
  Copy,
  Code2,
} from "lucide-react";
import { toast } from "sonner";

export const JsonTab: React.FC = () => {
  const {
    proposal,
    exportJson,
    importJson,
    loadProposalByName,
    resetToDefault,
    saveProposalToServer,
    isSaving,
    lastSavedTime,
    currentSlug,
  } = useProposal();
  const { theme } = useThemeStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [targetSlug, setTargetSlug] = useState(currentSlug || "propuesta");
  const [jsonContent, setJsonContent] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (currentSlug) {
      setTargetSlug(currentSlug);
    }
  }, [currentSlug]);

  useEffect(() => {
    const full = {
      ...proposal,
      theme,
      colors: {
        primary: theme.accentColor,
        secondary: theme.secondaryAccent,
        background: theme.bgMain,
        card: theme.cardBg,
        border: theme.cardBorder,
        text: theme.textPrimary,
        textSecondary: theme.textSecondary,
        nav: theme.navBg,
      },
    };
    setJsonContent(JSON.stringify(full, null, 2));
  }, [proposal, theme]);

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

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonContent);
    setIsCopied(true);
    toast.success("JSON copiado al portapapeles.");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApplyAndSaveDirectJson = async () => {
    try {
      JSON.parse(jsonContent);
      const success = importJson(jsonContent);
      if (success) {
        await saveProposalToServer(targetSlug);
      }
    } catch (err: any) {
      toast.error(`Error de formato JSON: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* 1. Direct Save to Server Section */}
      <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-950 font-extrabold text-sm">
            <Save className="w-4 h-4 text-[#2563EB]" />
            <span>Guardar Propuesta en Servidor / Vercel</span>
          </div>
          {lastSavedTime && (
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono px-2.5 py-0.5 rounded-full font-bold">
              {lastSavedTime}
            </span>
          )}
        </div>

        <p className="text-zinc-600 text-[11px] leading-relaxed">
          Guarda tus cambios directamente en el servidor sin tener que descargar el archivo JSON a tu computadora.
        </p>

        {/* Slug input */}
        <div>
          <label className="block text-[10px] font-bold text-blue-950 mb-1 uppercase tracking-wider font-mono">
            Nombre del Archivo en Servidor
          </label>
          <div className="flex items-center bg-white border border-blue-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#2563EB] shadow-2xs">
            <input
              type="text"
              value={targetSlug}
              onChange={(e) => setTargetSlug(e.target.value)}
              placeholder="nombre-de-propuesta"
              className="w-full bg-transparent text-xs font-mono text-zinc-900 focus:outline-none"
            />
            <span className="text-xs font-mono text-zinc-400 select-none">.json</span>
          </div>
        </div>

        {/* Big Save Button */}
        <button
          onClick={() => saveProposalToServer(targetSlug)}
          disabled={isSaving}
          className="w-full p-3 bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-blue-800 disabled:bg-zinc-400 text-white rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-all active:scale-[0.98]"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : lastSavedTime ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{isSaving ? "Guardando en Servidor..." : "💾 Guardar Propuesta en Servidor"}</span>
        </button>

        {lastSavedTime && (
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Última versión guardada en servidor a las {lastSavedTime}</span>
          </div>
        )}
      </div>

      {/* 2. Quick Load Preset Proposals */}
      <div className="pt-2 border-t border-[#E4E4E7]">
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

      {/* 3. Offline Backup Options */}
      <div className="pt-2 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-1">
          Respaldo Físico en Computadora (Opcional)
        </h4>
        <p className="text-zinc-600 mb-3">
          Descarga una copia local o importa un archivo JSON desde tu disco:
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={exportJson}
            className="p-2.5 bg-white border border-[#E4E4E7] hover:border-[#2563EB] text-zinc-800 rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-xs transition-all"
          >
            <Download className="w-4 h-4 text-zinc-600" />
            <span>Descargar JSON</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 bg-white border border-[#E4E4E7] hover:border-[#2563EB] text-[#111111] rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-xs transition-all"
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

      {/* 4. Interactive JSON Editor & Live Viewer */}
      <div className="pt-2 border-t border-[#E4E4E7]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
            <Code2 className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Editor & Visor de Estado JSON</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJson}
              className="flex items-center gap-1 text-[10px] font-semibold text-zinc-600 hover:text-zinc-900 px-2 py-1 bg-zinc-100 rounded-lg border border-zinc-200 cursor-pointer"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? "Copiado" : "Copiar"}</span>
            </button>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
              Editable
            </span>
          </div>
        </div>
        <textarea
          value={jsonContent}
          onChange={(e) => setJsonContent(e.target.value)}
          rows={10}
          className="w-full p-3 bg-[#18181B] text-emerald-400 rounded-2xl font-mono text-[10px] leading-relaxed border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB] scrollbar-thin"
          spellCheck={false}
        />
        <button
          onClick={handleApplyAndSaveDirectJson}
          disabled={isSaving}
          className="mt-2 w-full p-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-sm transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Aplicar Cambios y Guardar en Servidor</span>
        </button>
      </div>

      {/* 5. Factory Reset Section */}
      <div className="pt-2 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-2">
          Restablecer Valores Predeterminados
        </h4>
        <button
          onClick={() => {
            if (window.confirm("¿Seguro que deseas restablecer todos los valores a los iniciales de fábrica?")) {
              resetToDefault();
              toast.info("Valores restablecidos.");
            }
          }}
          className="w-full p-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restablecer Todo a Valores de Fábrica</span>
        </button>
      </div>
    </div>
  );
};
