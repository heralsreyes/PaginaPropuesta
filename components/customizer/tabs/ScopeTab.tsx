"use client";

import React, { useState } from "react";
import { useProposal } from "@/context/ProposalContext";
import { RequirementCategory } from "@/types/proposal";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";

export const ScopeTab: React.FC = () => {
  const { proposal, addRequirement, removeRequirement, updateRequirement, addDeliverable, removeDeliverable } = useProposal();
  const [newDeliverableInput, setNewDeliverableInput] = useState<{ [key: number]: string }>({});

  const handleAddDeliverableSubmit = (reqIdx: number) => {
    const text = newDeliverableInput[reqIdx] || "";
    if (text.trim()) {
      addDeliverable(reqIdx, text);
      setNewDeliverableInput({ ...newDeliverableInput, [reqIdx]: "" });
    }
  };

  const categoriesList = ["Core", "Automatización", "Integración", "Reportes", "Seguridad"] as const;

  return (
    <div className="space-y-6 text-xs">
      <div className="flex items-center justify-between">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
          Requerimientos de Alcance ({proposal.requirements.length})
        </h4>
        <button
          onClick={() =>
            addRequirement({
              id: `REQ-${proposal.requirements.length + 1}`,
              title: "Nuevo Módulo de Alcance",
              category: "Core",
              description: "Descripción breve del nuevo entregable o característica.",
              deliverables: ["Entregable inicial 1"],
            })
          }
          className="px-3 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold flex items-center space-x-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Agregar Módulo</span>
        </button>
      </div>

      <div className="space-y-4">
        {proposal.requirements.map((req, reqIdx) => (
          <div key={req.id || reqIdx} className="p-4 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={req.title}
                onChange={(e) => updateRequirement(reqIdx, { title: e.target.value })}
                className="w-full px-3 py-1.5 bg-white border border-[#E4E4E7] rounded-xl font-bold text-[#111111]"
              />
              <select
                value={req.category}
                onChange={(e) => updateRequirement(reqIdx, { category: e.target.value as RequirementCategory })}
                className="px-2 py-1.5 bg-white border border-[#E4E4E7] rounded-xl font-mono text-xs"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeRequirement(reqIdx)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <textarea
              value={req.description}
              onChange={(e) => updateRequirement(reqIdx, { description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-white border border-[#E4E4E7] rounded-xl text-zinc-600 font-medium"
            />

            {/* Sub-entregables List */}
            <div className="space-y-2 pt-2 border-t border-[#E4E4E7]">
              <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase block">Entregables Específicos:</span>
              <div className="space-y-1.5">
                {req.deliverables.map((del, delIdx) => (
                  <div key={delIdx} className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#E4E4E7]">
                    <div className="flex items-center space-x-2 w-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                      <span className="text-zinc-700 font-medium">{del}</span>
                    </div>
                    <button
                      onClick={() => removeDeliverable(reqIdx, delIdx)}
                      className="text-red-400 hover:text-red-600 cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  placeholder="Nuevo entregable..."
                  value={newDeliverableInput[reqIdx] || ""}
                  onChange={(e) => setNewDeliverableInput({ ...newDeliverableInput, [reqIdx]: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleAddDeliverableSubmit(reqIdx)}
                  className="w-full px-3 py-1 bg-white border border-[#E4E4E7] rounded-lg text-xs"
                />
                <button
                  onClick={() => handleAddDeliverableSubmit(reqIdx)}
                  className="px-2.5 py-1 bg-zinc-800 text-white rounded-lg font-bold shrink-0 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
