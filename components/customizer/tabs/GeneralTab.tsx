"use client";

import React from "react";
import { useProposal } from "@/context/ProposalContext";

export const GeneralTab: React.FC = () => {
  const { proposal, updateClient, updateProject } = useProposal();

  return (
    <div className="space-y-5 text-xs">
      <div className="pb-2 border-b border-[#E4E4E7]">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono mb-3">
          Información del Cliente
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
