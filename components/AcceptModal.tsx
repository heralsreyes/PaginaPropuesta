"use client";

import React, { useState, useRef } from "react";
import { ProposalData } from "@/data/proposalData";
import { X, CheckCircle2, Send, Sparkles, PenTool, Type, FileCheck, ShieldCheck, Download, Printer } from "lucide-react";
import confetti from "canvas-confetti";
import { toast } from "sonner";

interface AcceptModalProps {
  proposal: ProposalData;
  isOpen: boolean;
  onClose: () => void;
}

export const AcceptModal: React.FC<AcceptModalProps> = ({ proposal, isOpen, onClose }) => {
  const [signatureMode, setSignatureMode] = useState<"draw" | "type">("type");
  const [typedSignature, setTypedSignature] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rnc: "",
    email: "",
    comments: "",
    acceptedTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [acceptanceHash, setAcceptanceHash] = useState("");
  const [acceptanceTimestamp, setAcceptanceTimestamp] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  if (!isOpen) return null;

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#2563EB";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.email || !formData.acceptedTerms) {
      toast.error("Por favor completa los campos obligatorios y acepta los términos.");
      return;
    }

    if (signatureMode === "type" && !typedSignature) {
      toast.error("Por favor escribe tu firma tipografiada.");
      return;
    }

    if (signatureMode === "draw" && !hasDrawn) {
      toast.error("Por favor dibuja tu firma manuscrita en el recuadro.");
      return;
    }

    // Generate SHA-256 style mock transaction hash & timestamp
    const now = new Date();
    const timestampStr = now.toLocaleDateString("es-DO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const mockHash = `0x${Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("")}`;

    setAcceptanceTimestamp(timestampStr);
    setAcceptanceHash(mockHash.toUpperCase());

    // Trigger Confetti Celebration
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#2563EB", "#3B82F6", "#EFF6FF", "#18181B"],
    });

    setSubmitted(true);
    toast.success("¡Propuesta Aceptada y Certificada Digitalmente!");
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#E4E4E7] p-6 sm:p-9 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2563EB]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="no-print absolute top-5 right-5 p-2 text-[#71717A] hover:text-[#111111] bg-[#FAF9F6] rounded-xl border border-[#E4E4E7] transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-[#111111]">
                  Aceptar Propuesta Formal & Firma Digital
                </h3>
                <p className="text-xs font-mono text-[#71717A]">
                  Código de Propuesta: {proposal.project.code} • {proposal.client.name}
                </p>
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E4E4E7] mb-6 flex flex-col sm:flex-row justify-between gap-3 text-xs">
              <div>
                <span className="text-[#71717A] block font-semibold">Proyecto:</span>
                <strong className="text-[#111111] font-bold">{proposal.project.title}</strong>
              </div>
              <div>
                <span className="text-[#71717A] block font-semibold">Inversión Con ITBIS:</span>
                <strong className="text-[#2563EB] font-bold font-mono text-sm">
                  US$ {proposal.budget.totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </strong>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Signatory Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1">
                    Nombre del Representante Autorizado *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Lic. Carlos Ramírez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#E4E4E7] rounded-xl text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1">
                    Cargo / Posición Ejecutiva *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Vicepresidente de Tecnología"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#E4E4E7] rounded-xl text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              {/* RNC & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1">
                    Cédula / RNC de la Empresa (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 1-31-00000-0"
                    value={formData.rnc}
                    onChange={(e) => setFormData({ ...formData, rnc: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#E4E4E7] rounded-xl text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111111] mb-1">
                    Correo Corporativo de Confirmación *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@empresax.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-[#E4E4E7] rounded-xl text-[#111111] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              </div>

              {/* Digital Signature Mode Switcher */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#111111]">
                    Firma Digital de Conformidad *
                  </label>
                  <div className="inline-flex p-1 rounded-xl bg-[#FAF9F6] border border-[#E4E4E7] text-[11px]">
                    <button
                      type="button"
                      onClick={() => setSignatureMode("type")}
                      className={`px-3 py-1 font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                        signatureMode === "type" ? "bg-[#2563EB] text-white" : "text-[#71717A] hover:text-[#111111]"
                      }`}
                    >
                      <Type className="w-3 h-3" />
                      <span>Tipografiada</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignatureMode("draw")}
                      className={`px-3 py-1 font-bold rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                        signatureMode === "draw" ? "bg-[#2563EB] text-white" : "text-[#71717A] hover:text-[#111111]"
                      }`}
                    >
                      <PenTool className="w-3 h-3" />
                      <span>Manuscrita</span>
                    </button>
                  </div>
                </div>

                {signatureMode === "type" ? (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Escribe tu nombre completo para firmar formalmente..."
                      value={typedSignature}
                      onChange={(e) => setTypedSignature(e.target.value)}
                      className="w-full px-4 py-3 text-sm font-serif italic bg-[#FAF9F6] border-2 border-[#BFDBFE] rounded-2xl text-[#2563EB] placeholder-[#A1A1AA] focus:outline-none focus:border-[#2563EB]"
                    />
                    {typedSignature && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                        Firma Válida
                      </span>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="relative border-2 border-dashed border-[#BFDBFE] rounded-2xl bg-[#FAF9F6] overflow-hidden">
                      <canvas
                        ref={canvasRef}
                        width={500}
                        height={120}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="w-full h-[120px] cursor-crosshair touch-none"
                      />
                      {!hasDrawn && (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-[#A1A1AA] pointer-events-none">
                          Dibuja tu firma con el mouse o pantalla táctil aquí
                        </div>
                      )}
                    </div>
                    {hasDrawn && (
                      <button
                        type="button"
                        onClick={clearCanvas}
                        className="text-[11px] font-bold text-red-600 hover:text-red-700 mt-1 cursor-pointer"
                      >
                        Borrar y volver a firmar
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Checkbox Terms */}
              <div className="flex items-start space-x-2.5 pt-2">
                <input
                  type="checkbox"
                  id="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                  className="mt-0.5 rounded border-[#E4E4E7] bg-[#FAF9F6] text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                />
                <label htmlFor="acceptedTerms" className="text-xs text-[#52525B] leading-relaxed cursor-pointer font-normal">
                  Confirmo la aceptación formal del alcance técnico, entregables, cronograma y esquema de inversión de US$ 14,750.00 estipulados por ENFOCO S.R.L.
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center space-x-2.5 py-4 px-6 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-2xl transition-all shadow-lg shadow-[#2563EB]/30 cursor-pointer mt-4 transform hover:scale-[1.01] active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Firmar Digitalmente & Enviar Aceptación</span>
              </button>
            </form>
          </div>
        ) : (
          /* Post-Submission Formal Digital Certificate */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#2563EB] mx-auto mb-4 shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#EFF6FF] px-3.5 py-1 rounded-full border border-[#BFDBFE] inline-block mb-2">
              CERTIFICADO DIGITAL DE ACEPTACIÓN
            </span>

            <h3 className="text-2xl font-black font-display text-[#111111] mb-1">
              ¡Aceptación Formal Certificada!
            </h3>
            <p className="text-xs text-[#52525B] mb-6 max-w-lg mx-auto leading-relaxed">
              El recibo digital ha sido generado y notificado al equipo gerencial de ENFOCO S.R.L. para dar inicio inmediato al proyecto.
            </p>

            {/* Certificate Details Card */}
            <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-[#E4E4E7] text-left text-xs space-y-3 mb-6 shadow-xs font-mono">
              <div className="flex justify-between border-b border-[#E4E4E7] pb-2">
                <span className="text-[#71717A]">Cliente / Entidad:</span>
                <strong className="text-[#111111]">{proposal.client.name}</strong>
              </div>

              <div className="flex justify-between border-b border-[#E4E4E7] pb-2">
                <span className="text-[#71717A]">Representante Autorizado:</span>
                <strong className="text-[#111111]">{formData.name} ({formData.role})</strong>
              </div>

              <div className="flex justify-between border-b border-[#E4E4E7] pb-2">
                <span className="text-[#71717A]">Fecha & Hora de Firma:</span>
                <strong className="text-[#111111]">{acceptanceTimestamp}</strong>
              </div>

              <div className="flex justify-between border-b border-[#E4E4E7] pb-2">
                <span className="text-[#71717A]">Código de Validación Hash:</span>
                <strong className="text-[#2563EB]">{acceptanceHash}</strong>
              </div>

              <div className="flex justify-between pt-1">
                <span className="text-[#71717A]">Firma Registrada:</span>
                <strong className="text-[#2563EB] font-serif italic text-sm">
                  {signatureMode === "type" ? typedSignature : `[Firma Manuscrita Registrada]`}
                </strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handlePrintCertificate}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-bold text-[#111111] bg-white hover:bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Guardar Certificado</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
