"use client";

import React, { useState } from "react";
import { SignatureCanvas } from "./SignatureCanvas";
import { ShieldCheck, CheckCircle2, Building, User, Mail, FileText } from "lucide-react";
import { toast } from "sonner";

interface AcceptModalContentProps {
  onClose: () => void;
}

export const AcceptModalContent: React.FC<AcceptModalContentProps> = ({ onClose }) => {
  const [signerName, setSignerName] = useState("");
  const [signerRole, setSignerRole] = useState("");
  const [companyRnc, setCompanyRnc] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName.trim() || !signerEmail.trim()) {
      toast.error("Por favor complete los campos obligatorios del firmante.");
      return;
    }
    if (!signatureData) {
      toast.error("Por favor dibuje su firma manuscrita digital antes de confirmar.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("¡Propuesta Aceptada & Firmada Digitalmente! Notificación enviada a ENFOCO, S.R.L.");
      onClose();
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-slate-800">
      <div className="text-center space-y-2 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 rounded-2xl bg-[#004F54]/10 text-[#004F54] flex items-center justify-center mx-auto mb-2">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          Aceptación & Firma Digital de Propuesta
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Formalice la aprobación del proyecto de desarrollo web y app móvil para Excel Puesto de Bolsa & ESAFI.
        </p>
      </div>

      <div className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Nombre Completo del Firmante *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="Ej. Pedro Martínez"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">Cargo / Posición *</label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={signerRole}
                onChange={(e) => setSignerRole(e.target.value)}
                placeholder="Ej. VP de Tecnología & Operaciones"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-600 font-bold mb-1">Correo Electrónico Corporativo *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                placeholder="pmartinez@excel.com.do"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 font-bold mb-1">RNC / Identificación Institucional</label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={companyRnc}
                onChange={(e) => setCompanyRnc(e.target.value)}
                placeholder="1-30-12345-6"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Signature Box Component (Draw or Type) */}
        <SignatureCanvas onSignatureChange={setSignatureData} signerName={signerName} />
      </div>

      <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-[#004F54] hover:bg-[#006B70] text-white font-extrabold text-xs shadow-lg shadow-[#004F54]/30 cursor-pointer flex items-center gap-2 disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4 text-[#F08D17]" />
          <span>{isSubmitting ? "Procesando Firma..." : "Confirmar & Firmar Propuesta"}</span>
        </button>
      </div>
    </form>
  );
};
