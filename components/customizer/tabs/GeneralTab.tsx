"use client";

import React, { useRef } from "react";
import { useProposal } from "@/context/ProposalContext";
import { Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export const GeneralTab: React.FC = () => {
  const { proposal, updateClient, updateProject } = useProposal();
  const clientLogoRef = useRef<HTMLInputElement>(null);

  const handleClientLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona un archivo de imagen válido (PNG, JPG, SVG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateClient({ logoUrl: dataUrl });
        toast.success("Logo del cliente actualizado.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5 text-xs">
      <div className="pb-2 border-b border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-3">
          Información del Cliente
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Nombre Completo Cliente</label>
            <input
              type="text"
              value={proposal.client.name}
              onChange={(e) => updateClient({ name: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
            />
          </div>
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Sigla / Nombre Corto</label>
            <input
              type="text"
              value={proposal.client.shortName}
              onChange={(e) => updateClient({ shortName: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
            />
          </div>
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Contacto Principal</label>
            <input
              type="text"
              value={proposal.client.contactName}
              onChange={(e) => updateClient({ contactName: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
            />
          </div>
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Cargo Contacto</label>
            <input
              type="text"
              value={proposal.client.contactRole}
              onChange={(e) => updateClient({ contactRole: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
            />
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-2">
          <label className="block text-zinc-700 font-bold text-[11px]">
            Logo Oficial del Cliente
          </label>
          <input
            type="file"
            ref={clientLogoRef}
            onChange={handleClientLogoUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="flex items-center space-x-3">
            {proposal.client.logoUrl ? (
              <div className="w-14 h-14 rounded-xl bg-white border border-[#E4E4E7] p-1 flex items-center justify-center shrink-0">
                <img src={proposal.client.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-xl bg-zinc-100 border border-[#E4E4E7] flex items-center justify-center text-zinc-400 shrink-0">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
            <button
              type="button"
              onClick={() => clientLogoRef.current?.click()}
              className="px-3 py-2 bg-white hover:bg-[#EFF6FF] border border-[#E4E4E7] hover:border-[#2563EB] text-[#111111] font-bold rounded-xl flex items-center space-x-1.5 cursor-pointer transition-all"
            >
              <Upload className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Subir Imagen de Logo</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-3">
          Metadatos del Proyecto & Emisión
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Código de Propuesta</label>
            <input
              type="text"
              value={proposal.project.code}
              onChange={(e) => updateProject({ code: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono"
            />
          </div>
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Fecha de Emisión</label>
            <input
              type="text"
              value={proposal.project.date}
              onChange={(e) => updateProject({ date: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
            />
          </div>
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Duración Estimada</label>
            <input
              type="text"
              value={proposal.project.estimatedDuration}
              onChange={(e) => updateProject({ estimatedDuration: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
            />
          </div>
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Garantía Post-Entrega</label>
            <input
              type="text"
              value={proposal.project.guaranteePeriod}
              onChange={(e) => updateProject({ guaranteePeriod: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
            />
          </div>
        </div>
        <div>
          <label className="block text-zinc-600 font-medium mb-1">Título del Proyecto</label>
          <input
            type="text"
            value={proposal.project.title}
            onChange={(e) => updateProject({ title: e.target.value })}
            className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
          />
        </div>
      </div>
    </div>
  );
};
