"use client";

import React, { useState, useRef } from "react";
import { useProposal } from "@/context/ProposalContext";
import { X, Settings, Plus, Trash2, Download, Upload, RefreshCw, Layers, DollarSign, Building2, Calendar, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "general" | "presupuesto" | "alcance" | "cronograma" | "json";

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({ isOpen, onClose }) => {
  const {
    proposal,
    updateClient,
    updateProject,
    updateBudget,
    addRequirement,
    removeRequirement,
    updateRequirement,
    addDeliverable,
    removeDeliverable,
    addRoadmapPhase,
    removeRoadmapPhase,
    updateRoadmapPhase,
    addMilestone,
    removeMilestone,
    addPaymentTerm,
    removePaymentTerm,
    updatePaymentTerm,
    exportJson,
    importJson,
    resetToDefault,
  } = useProposal();

  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [newDeliverableInput, setNewDeliverableInput] = useState<{ [key: number]: string }>({});
  const [newMilestoneInput, setNewMilestoneInput] = useState<{ [key: number]: string }>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

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
  };

  const handleAddDeliverableSubmit = (reqIdx: number) => {
    const text = newDeliverableInput[reqIdx] || "";
    if (text.trim()) {
      addDeliverable(reqIdx, text);
      setNewDeliverableInput({ ...newDeliverableInput, [reqIdx]: "" });
    }
  };

  const handleAddMilestoneSubmit = (phaseIdx: number) => {
    const text = newMilestoneInput[phaseIdx] || "";
    if (text.trim()) {
      addMilestone(phaseIdx, text);
      setNewMilestoneInput({ ...newMilestoneInput, [phaseIdx]: "" });
    }
  };

  const categoriesList = ["Core", "Automatización", "Integración", "Reportes", "Seguridad"] as const;
  const statusList = ["Completado", "En Proceso", "Pendiente"] as const;

  return (
    <div className="no-print fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fadeIn">
      {/* Slide-Over Container */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-2xl bg-white border-l border-[#E4E4E7] h-full shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E4E4E7] bg-[#FAF9F6] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shadow-md">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#111111]">Personalizar Propuesta B2B</h3>
              <p className="text-xs text-[#71717A]">Edición en vivo • Modifica datos conservando el diseño base</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#71717A] hover:text-[#111111] bg-white rounded-xl border border-[#E4E4E7] transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 p-2 bg-[#F4F4F5] border-b border-[#E4E4E7] overflow-x-auto text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
              activeTab === "general" ? "bg-white text-[#2563EB] shadow-xs border border-[#E4E4E7]" : "text-[#71717A] hover:text-[#111111]"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Cliente & Proyecto</span>
          </button>

          <button
            onClick={() => setActiveTab("presupuesto")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
              activeTab === "presupuesto" ? "bg-white text-[#2563EB] shadow-xs border border-[#E4E4E7]" : "text-[#71717A] hover:text-[#111111]"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Presupuesto</span>
          </button>

          <button
            onClick={() => setActiveTab("alcance")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
              activeTab === "alcance" ? "bg-white text-[#2563EB] shadow-xs border border-[#E4E4E7]" : "text-[#71717A] hover:text-[#111111]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Alcance ({proposal.requirements.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("cronograma")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
              activeTab === "cronograma" ? "bg-white text-[#2563EB] shadow-xs border border-[#E4E4E7]" : "text-[#71717A] hover:text-[#111111]"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Cronograma ({proposal.roadmap.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("json")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
              activeTab === "json" ? "bg-white text-[#2563EB] shadow-xs border border-[#E4E4E7]" : "text-[#71717A] hover:text-[#111111]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>JSON & Guardar</span>
          </button>
        </div>

        {/* Tab Content Body (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: CLIENTE & PROYECTO */}
          {activeTab === "general" && (
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
                </div>

                <div className="mb-3">
                  <label className="block text-zinc-600 font-medium mb-1">Título del Proyecto</label>
                  <input
                    type="text"
                    value={proposal.project.title}
                    onChange={(e) => updateProject({ title: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
                  />
                </div>

                {/* Titular Hero con Acento de Color Azul */}
                <div className="pt-2 pb-2 border-t border-b border-[#E4E4E7] my-3 space-y-2">
                  <span className="font-extrabold text-[#2563EB] uppercase tracking-wider text-[10px] font-mono block">
                    Estructura del Titular con Acento de Color (#2563EB)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[#71717A] text-[10px] font-medium mb-0.5">Texto Inicial</label>
                      <input
                        type="text"
                        placeholder="Ej: Originación Digital &"
                        value={proposal.project.heroTitlePrefix || ""}
                        onChange={(e) => updateProject({ heroTitlePrefix: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-lg text-[#111111] text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#2563EB] text-[10px] font-bold mb-0.5">Texto Resaltado (Azul)</label>
                      <input
                        type="text"
                        placeholder="Ej: Scoring de Crédito"
                        value={proposal.project.heroTitleAccent || ""}
                        onChange={(e) => updateProject({ heroTitleAccent: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-blue-50/50 border border-[#BFDBFE] rounded-lg text-[#2563EB] font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#71717A] text-[10px] font-medium mb-0.5">Texto Final</label>
                      <input
                        type="text"
                        placeholder="Ej: para Banco BHD"
                        value={proposal.project.heroTitleSuffix || ""}
                        onChange={(e) => updateProject({ heroTitleSuffix: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-lg text-[#111111] text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">Preparado Por (Autor)</label>
                    <input
                      type="text"
                      value={proposal.project.author}
                      onChange={(e) => updateProject({ author: e.target.value })}
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
                    <label className="block text-zinc-600 font-medium mb-1">Garantía Incluida</label>
                    <input
                      type="text"
                      value={proposal.project.guaranteePeriod}
                      onChange={(e) => updateProject({ guaranteePeriod: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRESUPUESTO & ITBIS */}
          {activeTab === "presupuesto" && (
            <div className="space-y-5 text-xs">
              <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]">
                <h4 className="font-bold text-[#2563EB] mb-3 flex items-center space-x-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span>Configuración Financiera</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#111111] font-bold mb-1">Monto Sin Impuestos (Subtotal)</label>
                    <input
                      type="number"
                      step="100"
                      value={proposal.budget.amountWithoutTax}
                      onChange={(e) => updateBudget({ amountWithoutTax: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#BFDBFE] rounded-xl text-[#111111] font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[#111111] font-bold mb-1">Moneda</label>
                    <select
                      value={proposal.budget.currency}
                      onChange={(e) => updateBudget({ currency: e.target.value as "USD" | "DOP" })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#BFDBFE] rounded-xl text-[#111111] font-bold"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="DOP">DOP (RD$)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-[#BFDBFE] flex items-center justify-between text-xs font-mono font-bold text-[#2563EB]">
                  <span>ITBIS Calculado (18%): US$ {proposal.budget.taxAmount.toLocaleString()}</span>
                  <span>Total Con Impuestos: US$ {proposal.budget.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Hitos de Pago */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
                    Hitos de Pago ({proposal.budget.paymentTerms.length})
                  </h4>
                  <button
                    onClick={addPaymentTerm}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#BFDBFE] hover:bg-[#2563EB] hover:text-white transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Hito</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {proposal.budget.paymentTerms.map((term, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E4E4E7] space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={term.milestone}
                          onChange={(e) => updatePaymentTerm(idx, { milestone: e.target.value })}
                          className="flex-1 px-3 py-1.5 bg-white border border-[#E4E4E7] rounded-lg text-xs font-bold text-[#111111]"
                        />
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            value={term.percentage}
                            onChange={(e) => updatePaymentTerm(idx, { percentage: parseInt(e.target.value) || 0 })}
                            className="w-16 px-2 py-1.5 bg-white border border-[#E4E4E7] rounded-lg text-xs font-mono font-bold text-center text-[#2563EB]"
                          />
                          <span className="font-bold text-[#111111]">%</span>
                        </div>
                        <button
                          onClick={() => removePaymentTerm(idx)}
                          className="p-1.5 text-red-500 hover:text-red-700 bg-white rounded-lg border border-red-200 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={term.description}
                        onChange={(e) => updatePaymentTerm(idx, { description: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-[#E4E4E7] rounded-lg text-xs text-[#52525B]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ALCANCE & REQUERIMIENTOS ILIMITADOS */}
          {activeTab === "alcance" && (
            <div className="space-y-5 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]">
                <div>
                  <h4 className="font-bold text-[#2563EB]">Módulos de Alcance Dinámicos</h4>
                  <p className="text-[11px] text-[#52525B]">Puedes agregar requerimientos ilimitados (REQ-01 ... REQ-N).</p>
                </div>
                <button
                  onClick={addRequirement}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Requerimiento</span>
                </button>
              </div>

              {/* Requirements List */}
              <div className="space-y-4">
                {proposal.requirements.map((req, reqIdx) => (
                  <div key={req.id} className="p-4 rounded-2xl bg-white border-2 border-[#E4E4E7] space-y-3 shadow-xs">
                    <div className="flex items-center justify-between gap-2 border-b border-[#E4E4E7] pb-2">
                      <span className="font-mono font-bold px-2.5 py-0.5 rounded bg-[#F4F4F5] text-[#111111] border border-[#E4E4E7]">
                        {req.id}
                      </span>
                      <select
                        value={req.category}
                        onChange={(e) => updateRequirement(reqIdx, { category: e.target.value as any })}
                        className="px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] font-bold rounded-lg border border-[#BFDBFE]"
                      >
                        {categoriesList.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeRequirement(reqIdx)}
                        className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 rounded-lg border border-red-200 cursor-pointer"
                        title="Eliminar requerimiento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-zinc-600 font-semibold mb-1">Título del Módulo</label>
                      <input
                        type="text"
                        value={req.title}
                        onChange={(e) => updateRequirement(reqIdx, { title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-600 font-medium mb-1">Descripción Técnica</label>
                      <textarea
                        rows={2}
                        value={req.description}
                        onChange={(e) => updateRequirement(reqIdx, { description: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#52525B]"
                      />
                    </div>

                    {/* Deliverables List */}
                    <div className="pt-2 border-t border-[#E4E4E7]">
                      <span className="text-[11px] font-bold text-[#111111] font-mono block mb-2">
                        Entregables Específicos ({req.deliverables.length}):
                      </span>

                      <div className="space-y-1.5 mb-2">
                        {req.deliverables.map((del, delIdx) => (
                          <div key={delIdx} className="flex items-center justify-between p-2 rounded-lg bg-[#FAF9F6] border border-[#E4E4E7]">
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                              <span className="text-xs text-[#111111]">{del}</span>
                            </div>
                            <button
                              onClick={() => removeDeliverable(reqIdx, delIdx)}
                              className="text-red-500 hover:text-red-700 text-[11px] font-bold cursor-pointer"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Nuevo entregable..."
                          value={newDeliverableInput[reqIdx] || ""}
                          onChange={(e) => setNewDeliverableInput({ ...newDeliverableInput, [reqIdx]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddDeliverableSubmit(reqIdx);
                            }
                          }}
                          className="flex-1 px-3 py-1.5 bg-white border border-[#E4E4E7] rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddDeliverableSubmit(reqIdx)}
                          className="px-3 py-1.5 bg-[#EFF6FF] text-[#2563EB] font-bold rounded-lg border border-[#BFDBFE] hover:bg-[#2563EB] hover:text-white transition-all cursor-pointer"
                        >
                          + Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CRONOGRAMA & FASES EDT */}
          {activeTab === "cronograma" && (
            <div className="space-y-5 text-xs">
              <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#2563EB] flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Duración Estimada Global del Proyecto</span>
                  </h4>
                </div>
                <input
                  type="text"
                  placeholder="Ej: 12 a 16 Semanas"
                  value={proposal.project.estimatedDuration}
                  onChange={(e) => updateProject({ estimatedDuration: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#BFDBFE] rounded-xl font-bold text-[#2563EB] text-xs"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#E4E4E7]">
                <div>
                  <h4 className="font-bold text-[#111111]">Fases EDT del Cronograma ({proposal.roadmap.length})</h4>
                  <p className="text-[11px] text-[#52525B]">Modifica duraciones individuales, títulos, estatus e hitos.</p>
                </div>
                <button
                  onClick={addRoadmapPhase}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Añadir Fase EDT</span>
                </button>
              </div>

              {/* Roadmap Phases List */}
              <div className="space-y-4">
                {proposal.roadmap.map((phaseItem, phaseIdx) => (
                  <div key={phaseIdx} className="p-4 rounded-2xl bg-white border-2 border-[#E4E4E7] space-y-3 shadow-xs">
                    <div className="flex items-center justify-between gap-2 border-b border-[#E4E4E7] pb-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={phaseItem.phase}
                          onChange={(e) => updateRoadmapPhase(phaseIdx, { phase: e.target.value })}
                          className="w-20 px-2 py-1 bg-[#F4F4F5] font-mono font-bold text-[#111111] rounded border border-[#E4E4E7]"
                        />
                        <input
                          type="text"
                          value={phaseItem.duration}
                          onChange={(e) => updateRoadmapPhase(phaseIdx, { duration: e.target.value })}
                          className="w-32 px-2 py-1 bg-[#FAF9F6] text-[#52525B] rounded border border-[#E4E4E7]"
                        />
                      </div>

                      <select
                        value={phaseItem.status}
                        onChange={(e) => updateRoadmapPhase(phaseIdx, { status: e.target.value as any })}
                        className="px-2.5 py-1 bg-[#EFF6FF] text-[#2563EB] font-bold rounded-lg border border-[#BFDBFE]"
                      >
                        {statusList.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => removeRoadmapPhase(phaseIdx)}
                        className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 rounded-lg border border-red-200 cursor-pointer"
                        title="Eliminar fase"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-zinc-600 font-semibold mb-1">Título de la Fase</label>
                      <input
                        type="text"
                        value={phaseItem.title}
                        onChange={(e) => updateRoadmapPhase(phaseIdx, { title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-600 font-medium mb-1">Descripción de la Fase</label>
                      <textarea
                        rows={2}
                        value={phaseItem.description}
                        onChange={(e) => updateRoadmapPhase(phaseIdx, { description: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#52525B]"
                      />
                    </div>

                    {/* Milestones List */}
                    <div className="pt-2 border-t border-[#E4E4E7]">
                      <span className="text-[11px] font-bold text-[#111111] font-mono block mb-2">
                        Hitos Clave ({phaseItem.milestones ? phaseItem.milestones.length : 0}):
                      </span>

                      <div className="space-y-1.5 mb-2">
                        {phaseItem.milestones &&
                          phaseItem.milestones.map((m, mIdx) => (
                            <div key={mIdx} className="flex items-center justify-between p-2 rounded-lg bg-[#FAF9F6] border border-[#E4E4E7]">
                              <div className="flex items-center space-x-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                                <span className="text-xs text-[#111111]">{m}</span>
                              </div>
                              <button
                                onClick={() => removeMilestone(phaseIdx, mIdx)}
                                className="text-red-500 hover:text-red-700 text-[11px] font-bold cursor-pointer"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Nuevo hito clave..."
                          value={newMilestoneInput[phaseIdx] || ""}
                          onChange={(e) => setNewMilestoneInput({ ...newMilestoneInput, [phaseIdx]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddMilestoneSubmit(phaseIdx);
                            }
                          }}
                          className="flex-1 px-3 py-1.5 bg-white border border-[#E4E4E7] rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddMilestoneSubmit(phaseIdx)}
                          className="px-3 py-1.5 bg-[#EFF6FF] text-[#2563EB] font-bold rounded-lg border border-[#BFDBFE] hover:bg-[#2563EB] hover:text-white transition-all cursor-pointer"
                        >
                          + Agregar Hito
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: JSON & PLANTILLAS */}
          {activeTab === "json" && (
            <div className="space-y-6 text-xs">
              <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E4E4E7] space-y-4">
                <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
                  Gestión de Archivos JSON por Cliente
                </h4>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Puedes descargar la configuración actual en un archivo <strong>.json</strong> para guardarla en tu computadora o subir una propuesta previa para cargarla en vivo.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={exportJson}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exportar Propuesta (.json)</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-3 px-4 text-xs font-bold text-[#111111] bg-white hover:bg-[#F4F4F5] border border-[#E4E4E7] rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Importar Archivo JSON</span>
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

              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 space-y-3">
                <h4 className="font-bold flex items-center space-x-2 text-amber-800">
                  <RefreshCw className="w-4 h-4" />
                  <span>Restablecer Propuesta Base</span>
                </h4>
                <p className="text-xs leading-relaxed text-amber-800/90">
                  Si deseas volver a los valores originales de la propuesta base de ENFOCO S.R.L. para Empresa X, puedes borrar los cambios locales.
                </p>
                <button
                  onClick={resetToDefault}
                  className="px-4 py-2 text-xs font-bold text-amber-800 bg-white hover:bg-amber-100 rounded-xl border border-amber-300 transition-all cursor-pointer"
                >
                  Restablecer a Valores por Defecto
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E4E4E7] bg-[#FAF9F6] flex items-center justify-between text-xs shrink-0">
          <span className="font-mono text-[#71717A]">Diseño Base 100% Preservado</span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl shadow-sm cursor-pointer"
          >
            Listo / Aplicar Cambios
          </button>
        </div>
      </motion.div>
    </div>
  );
};
