"use client";

import React, { useState } from "react";
import { useProposal } from "@/context/ProposalContext";
import { X, Settings, Layers, DollarSign, Building2, Calendar, FileText, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { GeneralTab } from "./customizer/tabs/GeneralTab";
import { ColorsTab } from "./customizer/tabs/ColorsTab";
import { BudgetTab } from "./customizer/tabs/BudgetTab";
import { ScopeTab } from "./customizer/tabs/ScopeTab";
import { ScheduleTab } from "./customizer/tabs/ScheduleTab";
import { JsonTab } from "./customizer/tabs/JsonTab";

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "general" | "colores" | "presupuesto" | "alcance" | "cronograma" | "json";

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({ isOpen, onClose }) => {
  const { proposal } = useProposal();
  const [activeTab, setActiveTab] = useState<TabType>("general");

  if (!isOpen) return null;

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
            onClick={() => setActiveTab("colores")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer shrink-0 flex items-center space-x-1.5 ${
              activeTab === "colores" ? "bg-white text-[#2563EB] shadow-xs border border-[#E4E4E7]" : "text-[#71717A] hover:text-[#111111]"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Paleta & Estilo</span>
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
          {activeTab === "general" && <GeneralTab />}
          {activeTab === "colores" && <ColorsTab />}
          {activeTab === "presupuesto" && <BudgetTab />}
          {activeTab === "alcance" && <ScopeTab />}
          {activeTab === "cronograma" && <ScheduleTab />}
          {activeTab === "json" && <JsonTab />}
        </div>
      </motion.div>
    </div>
  );
};
