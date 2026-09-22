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
import { toast } from "sonner";

interface ShareProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareProposalModal: React.FC<ShareProposalModalProps> = ({ isOpen, onClose }) => {
  const { proposal, currentSlug, getConsolidatedPayload } = useProposal();
  const [activeTab, setActiveTab] = useState<"portable" | "short">("portable");
  const [portableUrl, setPortableUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedMode, setCopiedMode] = useState<"portable" | "short" | null>(null);

  const clientName = proposal.client?.name || proposal.client?.shortName || "Cliente";
  const projectTitle = proposal.project?.title || "Propuesta Técnica & Económica";

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsGenerating(true);

    async function buildUrls() {
      try {
        const payload = getConsolidatedPayload(currentSlug);

        // 1. Generate Portable Universal URL with compressed hash payload
        const portable = await generateShareUrl({
          slug: currentSlug,
          payload,
          mode: "portable",
        });

        // 2. Generate Clean Short URL
        const short = await generateShareUrl({
          slug: currentSlug,
          mode: "short",
        });

        if (isMounted) {
          setPortableUrl(portable);
          setShortUrl(short);
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

  if (!isOpen) return null;

  const currentUrl = activeTab === "portable" ? portableUrl : shortUrl;

  const handleCopy = (mode: "portable" | "short") => {
    const textToCopy = mode === "portable" ? portableUrl : shortUrl;
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    setCopiedMode(mode);
    toast.success(
      mode === "portable"
        ? "✅ Enlace Universal copiado. ¡Listo para enviar a cualquier dispositivo o incógnito!"
        : "✅ Enlace corto copiado al portapapeles."
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
            onClick={() => setActiveTab("portable")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "portable"
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Enlace Universal</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.5 rounded">
              Recomendado
            </span>
          </button>

          <button
            onClick={() => setActiveTab("short")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "short"
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Enlace Corto (?p=...)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs">
          {activeTab === "portable" ? (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-2xl flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-emerald-200 leading-relaxed">
                  <strong>¡Garantizado para incógnito y cualquier dispositivo!</strong>
                  <p className="text-emerald-300/80 mt-0.5">
                    Este enlace lleva empaquetadas todas tus ediciones en vivo (textos, colores, historias y temas).
                    Cualquier persona que lo abra lo verá al instante sin importar si aún no has desplegado a Vercel.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-blue-950/40 border border-blue-800/50 rounded-2xl flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-blue-200 leading-relaxed">
                  <strong>Enlace limpio oficial para propuestas en servidor:</strong>
                  <p className="text-blue-300/80 mt-0.5">
                    Carga el archivo <code>public/proposals/{currentSlug}.json</code> desde el servidor. Si guardaste
                    localmente, sube a GitHub para que Vercel lo sincronice.
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
