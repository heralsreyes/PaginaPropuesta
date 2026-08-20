"use client";

import React, { useState } from "react";
import { useProposal } from "@/context/ProposalContext";
import { Plus, Trash2 } from "lucide-react";

export const ScheduleTab: React.FC = () => {
  const { proposal, addRoadmapPhase, removeRoadmapPhase, updateRoadmapPhase, addMilestone, removeMilestone } = useProposal();
  const [newMilestoneInput, setNewMilestoneInput] = useState<{ [key: number]: string }>({});

  const handleAddMilestoneSubmit = (phaseIdx: number) => {
    const text = newMilestoneInput[phaseIdx] || "";
    if (text.trim()) {
      addMilestone(phaseIdx, text);
      setNewMilestoneInput({ ...newMilestoneInput, [phaseIdx]: "" });
    }
  };

  return (
    <div className="space-y-6 text-xs">
      <div className="flex items-center justify-between">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
          Fases del Cronograma ({proposal.roadmap.length})
        </h4>
        <button
          onClick={() =>
            addRoadmapPhase({
              phase: `Fase ${proposal.roadmap.length + 1}`,
              title: "Nueva Fase del Proyecto",
              duration: "2 Semanas",
              milestones: ["Entregable 1"],
            })
          }
          className="px-3 py-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold flex items-center space-x-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Agregar Fase</span>
        </button>
      </div>

      <div className="space-y-4">
        {proposal.roadmap.map((item, phaseIdx) => (
          <div key={phaseIdx} className="p-4 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-3">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={item.phase}
                onChange={(e) => updateRoadmapPhase(phaseIdx, { phase: e.target.value })}
                className="w-28 px-2 py-1 bg-white border border-[#E4E4E7] rounded-lg font-mono font-bold text-[#111111]"
              />
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateRoadmapPhase(phaseIdx, { title: e.target.value })}
                className="w-full px-3 py-1 bg-white border border-[#E4E4E7] rounded-lg font-bold text-[#111111]"
              />
              <input
                type="text"
                value={item.duration}
                onChange={(e) => updateRoadmapPhase(phaseIdx, { duration: e.target.value })}
                className="w-28 px-2 py-1 bg-white border border-[#E4E4E7] rounded-lg font-mono text-[#F08D17] font-bold text-right"
              />
              <button
                onClick={() => removeRoadmapPhase(phaseIdx)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-hitos de la fase */}
            <div className="space-y-2 pt-2 border-t border-[#E4E4E7]">
              <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase block">Hitos & Entregables de la Fase:</span>
              <div className="space-y-1.5">
                {item.milestones.map((ms, msIdx) => (
                  <div key={msIdx} className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-[#E4E4E7]">
                    <span className="text-zinc-700 font-medium">• {ms}</span>
                    <button
                      onClick={() => removeMilestone(phaseIdx, msIdx)}
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
                  placeholder="Nuevo hito..."
                  value={newMilestoneInput[phaseIdx] || ""}
                  onChange={(e) => setNewMilestoneInput({ ...newMilestoneInput, [phaseIdx]: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleAddMilestoneSubmit(phaseIdx)}
                  className="w-full px-3 py-1 bg-white border border-[#E4E4E7] rounded-lg text-xs"
                />
                <button
                  onClick={() => handleAddMilestoneSubmit(phaseIdx)}
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
