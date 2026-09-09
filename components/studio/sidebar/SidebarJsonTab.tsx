"use client";

import React, { useRef, useState, useEffect } from "react";
import { useProposal } from "@/context/ProposalContext";
import { useStudioStore } from "@/store/useStudioStore";
import { useThemeStore } from "@/store/useThemeStore";
import {
  Download,
  Upload,
  RefreshCw,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Save,
  Loader2,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

export const SidebarJsonTab: React.FC = () => {
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingTemplate, setPendingTemplate] = useState<{ id: string; label: string } | null>(null);
  const [targetSlug, setTargetSlug] = useState(currentSlug || "propuesta");
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [editableJson, setEditableJson] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (currentSlug) {
      setTargetSlug(currentSlug);
    }
  }, [currentSlug]);

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

  const handleOpenJsonEditor = () => {
    const studioState = useStudioStore.getState();
    const themeState = useThemeStore.getState();
    const currentTheme = themeState.theme;

    const fullProposalData = {
      ...proposal,
      sections: studioState.sections,
      canvasElements: studioState.canvasElements,
      buttonActionsMap: studioState.buttonActionsMap,
      theme: currentTheme,
      colors: {
        primary: currentTheme.accentColor,
        secondary: currentTheme.secondaryAccent,
        background: currentTheme.bgMain,
        card: currentTheme.cardBg,
        border: currentTheme.cardBorder,
        text: currentTheme.textPrimary,
        textSecondary: currentTheme.textSecondary,
        nav: currentTheme.navBg,
        h1: currentTheme.h1Color || currentTheme.textPrimary,
        h2: currentTheme.h2Color || currentTheme.secondaryAccent,
      },
    };

    setEditableJson(JSON.stringify(fullProposalData, null, 2));
    setShowJsonEditor((prev) => !prev);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(editableJson);
    setIsCopied(true);
    toast.success("JSON copiado al portapapeles.");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApplyAndSaveJson = async () => {
    try {
      JSON.parse(editableJson);
      const success = importJson(editableJson);
      if (success) {
        await saveProposalToServer(targetSlug);
      }
    } catch (err: any) {
      toast.error(`Error de formato JSON: ${err.message}`);
    }
  };

  return (
    <div className="space-y-4 text-xs p-4">
      {/* Autosafe Status Notice */}
      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
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
          className="w-full p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir o Guardar como PDF Oficial</span>
        </button>
        <p className="text-[10px] text-zinc-500 mt-1 text-center">
          Genera un documento listo para presentar o enviar al cliente.
        </p>
      </div>

      {/* Direct Save to Server Section */}
      <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-blue-950 font-extrabold text-xs">
            <Save className="w-4 h-4 text-[#2563EB] shrink-0" />
            <span>Guardar en Servidor / Vercel</span>
          </div>
          {lastSavedTime && (
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded-full font-bold">
              {lastSavedTime}
            </span>
          )}
        </div>

        <p className="text-[11px] text-blue-900/90 leading-relaxed font-normal">
          Guarda tus cambios directamente en el servidor sin tener que descargar el archivo JSON a tu computadora.
        </p>

        {/* Slug input */}
        <div>
          <label className="block text-[10px] font-bold text-blue-950 mb-1 uppercase tracking-wider font-mono">
            Nombre del archivo (.json)
          </label>
          <div className="flex items-center bg-white border border-blue-200 rounded-xl px-2.5 py-1.5 focus-within:ring-2 focus-within:ring-[#2563EB] shadow-2xs">
            <input
              type="text"
              value={targetSlug}
              onChange={(e) => setTargetSlug(e.target.value)}
              placeholder="nombre-de-propuesta"
              className="w-full bg-transparent text-xs font-mono text-zinc-900 focus:outline-none"
            />
            <span className="text-[11px] font-mono text-zinc-400 select-none">.json</span>
          </div>
        </div>

        {/* Big Save Button */}
        <button
          onClick={() => saveProposalToServer(targetSlug)}
          disabled={isSaving}
          className="w-full p-3 bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-blue-800 disabled:bg-zinc-400 text-white rounded-xl font-extrabold flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-all active:scale-[0.98]"
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
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Última versión guardada en servidor a las {lastSavedTime}</span>
          </div>
        )}
      </div>

      {/* Interactive JSON Editor */}
      <div className="pt-3 border-t border-[#E4E4E7]">
        <button
          onClick={handleOpenJsonEditor}
          className="w-full py-2 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl font-bold flex items-center justify-between cursor-pointer transition-all text-[11px]"
        >
          <span className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-zinc-600" />
            <span>Ver o Editar Código JSON</span>
          </span>
          {showJsonEditor ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showJsonEditor && (
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] text-zinc-500">
              <span>Modifica las propiedades JSON y presiona Guardar:</span>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1 px-2 py-1 bg-white border border-zinc-300 rounded hover:bg-zinc-50 cursor-pointer"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{isCopied ? "Copiado" : "Copiar"}</span>
              </button>
            </div>
            <textarea
              value={editableJson}
              onChange={(e) => setEditableJson(e.target.value)}
              rows={10}
              className="w-full p-2.5 bg-zinc-900 text-emerald-400 font-mono text-[10px] rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#2563EB] leading-relaxed scrollbar-thin"
              spellCheck={false}
            />
            <button
              onClick={handleApplyAndSaveJson}
              disabled={isSaving}
              className="w-full p-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-bold flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm transition-all text-[11px]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Aplicar y Guardar JSON en Servidor</span>
            </button>
          </div>
        )}
      </div>

      {/* Offline Backup (Optional Download / Upload) */}
      <div className="pt-3 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-zinc-700 uppercase tracking-wider text-[10px] font-mono mb-2 flex items-center justify-between">
          <span>Respaldo en Computadora (Opcional)</span>
          <span className="text-[9px] text-zinc-400 font-normal font-sans">Uso Offline</span>
        </h4>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={exportJson}
            className="p-2 bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-700 rounded-xl font-bold flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs transition-all text-[10px]"
            title="Descargar archivo físico .json a la computadora"
          >
            <Download className="w-3.5 h-3.5 text-zinc-600" />
            <span>Descargar .json</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-white border border-zinc-300 hover:border-zinc-500 text-zinc-700 rounded-xl font-bold flex items-center justify-center space-x-1.5 cursor-pointer shadow-2xs transition-all text-[10px]"
            title="Cargar un archivo .json desde la computadora"
          >
            <Upload className="w-3.5 h-3.5 text-zinc-600" />
            <span>Cargar .json</span>
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
      <div className="pt-3 border-t border-[#E4E4E7]">
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
      <div className="pt-3 border-t border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-2">
          Restaurar Estado Inicial
        </h4>

        <button
          onClick={() => {
            if (window.confirm("¿Seguro que deseas restablecer todos los valores iniciales de la propuesta?")) {
              resetToDefault();
              toast.info("Valores restablecidos a configuración inicial.");
            }
          }}
          className="w-full p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all text-xs"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restablecer Todo a Valores Iniciales</span>
        </button>
      </div>
    </div>
  );
};
