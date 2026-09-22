"use client";

import React, { useState, useEffect } from "react";
import { useProposal } from "@/context/ProposalContext";
import { generateShareUrl } from "@/lib/shareUtils";
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  Globe,
  MessageCircle,
  Mail,
  ShieldCheck,
  Sparkles,
  Loader2,
} from "lucide-react";
import { getPresetProposal } from "@/data/presetProposals";
import { toast } from "sonner";

interface ShareProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareProposalModal: React.FC<ShareProposalModalProps> = ({ isOpen, onClose }) => {
  const { proposal, currentSlug, getConsolidatedPayload, saveProposalToServer } = useProposal();
  const [activeTab, setActiveTab] = useState<"short" | "portable">("short");
  const [portableUrl, setPortableUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedMode, setCopiedMode] = useState<"portable" | "short" | null>(null);
  const [isServerVerified, setIsServerVerified] = useState<boolean | null>(null);
  const [isCheckingServer, setIsCheckingServer] = useState<boolean>(false);
  const [isSavingServer, setIsSavingServer] = useState<boolean>(false);

  const clientName = proposal.client?.name || proposal.client?.shortName || "Cliente";
  const projectTitle = proposal.project?.title || "Propuesta Técnica & Económica";

  const checkServerStatus = async (slugToCheck: string) => {
    setIsCheckingServer(true);
    try {
      // 1. Preset institucional siempre verificado
      const preset = getPresetProposal(slugToCheck, { allowFuzzy: true });
      if (preset) {
        setIsServerVerified(true);
        return;
      }

      // 2. Consulta al endpoint del servidor
      const res = await fetch(`/api/proposals?slug=${encodeURIComponent(slugToCheck)}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.success && data?.data) {
          setIsServerVerified(true);
          return;
        }
      }
      setIsServerVerified(false);
    } catch {
      setIsServerVerified(false);
    } finally {
      setIsCheckingServer(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);
    checkServerStatus(currentSlug);

    async function buildUrls() {
      try {
        const payload = getConsolidatedPayload(currentSlug);

        // 1. Generate Clean Short URL (Default for clients & WhatsApp)
        const short = await generateShareUrl({
          slug: currentSlug,
          mode: "short",
        });

        // 2. Generate Portable Universal URL with compressed hash payload (Fallback)
        const portable = await generateShareUrl({
          slug: currentSlug,
          payload,
          mode: "portable",
        });

        if (isMounted) {
          setShortUrl(short);
          setPortableUrl(portable);
        }
      } catch (err) {
        console.error("Error generating share URLs:", err);
      } finally {
        if (isMounted) setIsGenerating(false);
      }
    }

    buildUrls();

    return () => {
      isMounted = false;
    };
  }, [isOpen, currentSlug, getConsolidatedPayload]);

  const handleManualSave = async () => {
    setIsSavingServer(true);
    try {
      const res = await saveProposalToServer(currentSlug);
      if (res && res.success) {
        setIsServerVerified(true);
      } else {
        await checkServerStatus(currentSlug);
      }
    } catch (e: any) {
      console.error(e);
      toast.error(`Error al guardar: ${e?.message || e}`);
    } finally {
      setIsSavingServer(false);
    }
  };

  if (!isOpen) return null;

  const currentUrl = activeTab === "short" ? shortUrl : portableUrl;

  const handleCopy = (mode: "portable" | "short") => {
    const textToCopy = mode === "short" ? shortUrl : portableUrl;
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    setCopiedMode(mode);
    toast.success(
      mode === "short"
        ? "✅ Enlace corto oficial copiado. ¡Listo para enviar a tu cliente!"
        : "✅ Enlace universal de respaldo copiado."
    );

    setTimeout(() => {
      setCopiedMode(null);
    }, 2500);
  };

  const handleOpenPreview = () => {
    if (currentUrl) {
      window.open(currentUrl, "_blank");
    }
  };

  const shareText = `Hola, te comparto la propuesta interactiva de ENFOCO para ${clientName}: ${currentUrl}`;

  const handleWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, "_blank");
  };

  const handleEmail = () => {
    const mailUrl = `mailto:?subject=${encodeURIComponent(
      `Propuesta ENFOCO — ${clientName}`
    )}&body=${encodeURIComponent(shareText)}`;
    window.open(mailUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-[#18181B] border border-zinc-800 text-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-zinc-100 flex items-center gap-1.5">
                <span>Compartir Propuesta</span>
                <span className="text-[10px] font-mono font-normal bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                  {currentSlug}
                </span>
              </h3>
              <p className="text-xs text-zinc-400 truncate max-w-[280px] sm:max-w-xs">{clientName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-4 bg-zinc-900/30 border-b border-zinc-800 flex gap-2">
          <button
            onClick={() => setActiveTab("short")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "short"
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Enlace Corto Oficial</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.5 rounded">
              Recomendado Clientes
            </span>
          </button>

          <button
            onClick={() => setActiveTab("portable")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "portable"
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Enlace Portátil</span>
            <span className="text-[9px] bg-zinc-700 text-zinc-300 font-mono px-1 py-0.5 rounded">
              Sin Servidor
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs">
          {activeTab === "short" ? (
            <div className="space-y-3">
              {isCheckingServer ? (
                <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl flex items-center gap-2 text-zinc-400 text-[11px]">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span>Verificando disponibilidad en el servidor...</span>
                </div>
              ) : isServerVerified ? (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-2xl flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-emerald-200 leading-relaxed">
                    <strong>✅ Verificado y activo en el servidor:</strong>
                    <p className="text-emerald-300/80 mt-0.5">
                      Este enlace corto es limpio, profesional e ideal para WhatsApp o correos. Abrirá directamente la propuesta de <strong>{clientName}</strong> en cualquier dispositivo sin necesidad de abrir enlaces largos previamente.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-blue-950/40 border border-blue-800/50 rounded-2xl flex items-start justify-between gap-3">
                  <div className="text-[11px] text-blue-200 leading-relaxed">
                    <strong>💡 Sincronizar propuesta con el servidor:</strong>
                    <p className="text-blue-300/80 mt-0.5">
                      Haz clic en &apos;Guardar Ahora&apos; para registrar los cambios en el servidor y dejar activo el enlace corto oficial.
                    </p>
                  </div>
                  <button
                    onClick={handleManualSave}
                    disabled={isSavingServer}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shrink-0 cursor-pointer flex items-center gap-1.5 transition-all shadow-md"
                  >
                    {isSavingServer ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Guardando...</span>
                      </>
                    ) : (
                      <span>Guardar Ahora</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-zinc-300 leading-relaxed">
                  <strong>Enlace autónomo de respaldo (Sin Servidor):</strong>
                  <p className="text-zinc-400 mt-0.5">
                    Lleva todos los datos comprimidos dentro de la URL. Al ser extenso (varios KB), se recomienda principalmente para pruebas internas o cuando no se dispone de conexión con el servidor.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* URL Box */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold">
              URL del enlace para compartir:
            </label>
            <div className="flex items-center gap-2 p-2 bg-zinc-950 border border-zinc-800 rounded-xl focus-within:border-blue-500">
              {isGenerating ? (
                <div className="flex items-center gap-2 text-zinc-500 py-1 px-2 font-mono text-[11px] w-full">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span>Generando enlace optimizado...</span>
                </div>
              ) : (
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="w-full bg-transparent text-[11px] font-mono text-zinc-300 focus:outline-none select-all truncate"
                />
              )}

              <button
                onClick={() => handleCopy(activeTab)}
                disabled={isGenerating || !currentUrl}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  copiedMode === activeTab
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                }`}
              >
                {copiedMode === activeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Share Buttons */}
          <div className="pt-2 border-t border-zinc-800 space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold block">
              Enviar directamente a:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleWhatsApp}
                disabled={!currentUrl}
                className="py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleEmail}
                disabled={!currentUrl}
                className="py-2 px-3 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Correo</span>
              </button>

              <button
                onClick={handleOpenPreview}
                disabled={!currentUrl}
                className="py-2 px-3 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                <span>Probar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-zinc-950/60 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400 px-5">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>ENFOCO Executive Web Proposal</span>
          </span>
          <button onClick={onClose} className="hover:text-white cursor-pointer font-medium">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
