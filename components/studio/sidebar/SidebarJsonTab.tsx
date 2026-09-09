"use client";

import React, { useRef, useState } from "react";
import { useProposal } from "@/context/ProposalContext";
import { Download, Upload, RefreshCw, Printer, ShieldCheck, HelpCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const SidebarJsonTab: React.FC = () => {
  const { proposal, exportJson, importJson, loadProposalByName, resetToDefault } = useProposal();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingTemplate, setPendingTemplate] = useState<{ id: string; label: string } | null>(null);

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

  const handleTemplateClick = (id: string, label: string) => {
    setPendingTemplate({ id, label });
  };

  const confirmTemplateSwitch = () => {
    if (!pendingTemplate) return;
    try {
      // Save emergency backup before switching
      localStorage.setItem("proposal_backup_before_switch", JSON.stringify(proposal));
      localStorage.setItem("proposal_backup_timestamp", new Date().toLocaleString());
    } catch {
      // ignore
    }
    loadProposalByName(pendingTemplate.id);
    toast.success(`Cargada propuesta institucional: ${pendingTemplate.label}`);
    setPendingTemplate(null);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="space-y-5 text-xs p-4">
      {/* Autosafe Status Notice */}
      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1.5">
        <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Autoguardado Local Activo</span>
        </div>
        <p className="text-[11px] text-emerald-700 leading-relaxed font-normal">
          Tus cambios se guardan automáticamente en este navegador. No perderás tu trabajo al recargar la página.
        </p>
      </div>

      {/* Official PDF Export */}
      <div>
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-2">
          Exportar Presentación Final
        </h4>
        <button
          onClick={handlePrintPdf}
          className="w-full p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir o Guardar como PDF Oficial</span>
        </button>
        <p className="text-[10px] text-zinc-500 mt-1.5 text-center">
          Genera un documento listo para presentar o enviar al cliente.
        </p>
      </div>

      {/* Technical Backup & JSON */}
      <div className="pt-4 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-2 flex items-center justify-between">
          <span>Respaldo Técnico (JSON)</span>
          <span className="text-[10px] text-zinc-400 font-normal font-sans">Uso Interno</span>
        </h4>

        <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl mb-3 text-[11px] text-zinc-600 leading-relaxed flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <span>
            El archivo <strong>.json</strong> es una copia de seguridad técnica. No necesitas ninguna aplicación para abrirlo; se carga directamente aquí con el botón &ldquo;Cargar Archivo JSON&rdquo;.
          </span>
        </div>

        <div className="space-y-2">
          <button
            onClick={exportJson}
            className="w-full p-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Copia de Seguridad (.json)</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-2.5 bg-white border border-[#E4E4E7] hover:border-[#2563EB] text-[#111111] rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all"
          >
            <Upload className="w-4 h-4 text-[#2563EB]" />
            <span>Cargar Archivo JSON de Respaldo</span>
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

      {/* Quick Load Proposals with Confirmation */}
      <div className="pt-4 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-1">
          Carga Rápida de Propuestas
        </h4>
        <p className="text-zinc-500 text-[11px] mb-3">
          Selecciona una plantilla institucional prediseñada:
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleTemplateClick("ars-primera", "ARS Primera")}
            className={`p-2 rounded-xl border text-left font-medium transition-all cursor-pointer ${
              (proposal?.client?.shortName || "") === "ARS Primera" || (proposal?.client?.name || "").includes("Primera")
                ? "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs"
                : "bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800"
            }`}
          >
            🏥 ARS Primera
          </button>
          <button
            onClick={() => handleTemplateClick("excel-puesto-de-bolsa", "Excel Puesto de Bolsa")}
            className={`p-2 rounded-xl border text-left font-medium transition-all cursor-pointer ${
              (proposal?.client?.shortName || "").toUpperCase() === "EXCEL" || (proposal?.client?.name || "").includes("Excel")
                ? "bg-amber-50 border-amber-500 text-amber-900 font-bold shadow-xs"
                : "bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800"
            }`}
          >
            📈 Excel
          </button>
          <button
            onClick={() => handleTemplateClick("bhd", "Banco BHD")}
            className="p-2 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            🏦 Banco BHD
          </button>
          <button
            onClick={() => handleTemplateClick("cepm", "CEPM")}
            className="p-2 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            ⚡ CEPM
          </button>
          <button
            onClick={() => handleTemplateClick("claro", "Claro")}
            className="p-2 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            📱 Claro
          </button>
          <button
            onClick={() => handleTemplateClick("grupo-ramos", "Grupo Ramos")}
            className="p-2 rounded-xl border bg-white border-zinc-200 hover:border-zinc-400 text-zinc-800 text-left font-medium transition-all cursor-pointer"
          >
            🛒 Grupo Ramos
          </button>
        </div>
      </div>

      {/* Safety Confirmation Modal for Template Switch */}
      {pendingTemplate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 border border-zinc-200">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-zinc-900">¿Cambiar a {pendingTemplate.label}?</h3>
                <span className="text-[11px] text-zinc-500">Copia de seguridad automática</span>
              </div>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Guardaremos automáticamente un respaldo de tu propuesta actual antes de cargar la plantilla de <strong>{pendingTemplate.label}</strong> para que no pierdas ningún cambio.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setPendingTemplate(null)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 font-bold hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmTemplateSwitch}
                className="flex-1 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold cursor-pointer transition-colors shadow-md"
              >
                Sí, Cargar Plantilla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Section */}
      <div className="pt-4 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-3">
          Restaurar Estado Inicial
        </h4>

        <button
          onClick={() => {
            if (window.confirm("¿Seguro que deseas restablecer todos los valores iniciales de la propuesta?")) {
              resetToDefault();
              toast.info("Valores restablecidos a configuración inicial.");
            }
          }}
          className="w-full p-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restablecer Todo a Valores Iniciales</span>
        </button>
      </div>
    </div>
  );
};
