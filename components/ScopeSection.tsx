"use client";

import React, { useState } from "react";
import { Requirement } from "@/data/proposalData";
import { Layers, CheckCircle2, Cpu, Shield, FileText, Database, BarChart3, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ScopeSectionProps {
  requirements: Requirement[];
}

export const ScopeSection: React.FC<ScopeSectionProps> = ({ requirements }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedRequirementId, setSelectedRequirementId] = useState<string>(requirements[0]?.id || "REQ-01");

  const categories = ["Todos", "Core", "Automatización", "Integración", "Reportes", "Seguridad"];

  const filtered = selectedCategory === "Todos"
    ? requirements
    : requirements.filter((r) => r.category === selectedCategory);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const newFiltered = cat === "Todos" ? requirements : requirements.filter((r) => r.category === cat);
    if (newFiltered.length > 0) {
      setSelectedRequirementId(newFiltered[0].id);
    }
  };

  const activeRequirement = requirements.find((r) => r.id === selectedRequirementId) || filtered[0] || requirements[0];

  const getCategoryIcon = (cat: string, dark = false) => {
    const iconClass = dark ? "w-4 h-4 text-white" : "w-4 h-4 text-[#2563EB]";
    switch (cat) {
      case "Core":
        return <Cpu className={iconClass} />;
      case "Automatización":
        return <Layers className={iconClass} />;
      case "Integración":
        return <Database className={iconClass} />;
      case "Reportes":
        return <BarChart3 className={iconClass} />;
      case "Seguridad":
        return <Shield className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  return (
    <section id="alcance" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[#FAF9F6] border-t border-[#E4E4E7] px-4 sm:px-6 lg:px-8">
      {/* 💻 Screen Interactive View */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="screen-only max-w-7xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 shrink-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-4 py-1.5 rounded-full border border-[#BFDBFE] inline-flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARQUITECTURA DE ALCANCE • INSPECTOR MAESTRO-DETALLE</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#111111] mt-2 mb-1">
            Alcance & Funcionalidades Requeridas
          </h2>
          <p className="text-[#52525B] text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Seleccione un módulo a la izquierda para inspeccionar sus especificaciones técnicas y entregables en el panel derecho.
          </p>
        </div>

        {/* Filter Pills Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-5 shrink-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/20 scale-105"
                    : "bg-white text-[#52525B] border-[#E4E4E7] hover:border-[#D4D4D8] hover:text-[#111111]"
                }`}
              >
                {isActive && (
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Master-Detail Architecture Inspector Split Layout (max-w-7xl) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch max-w-7xl mx-auto w-full">
          {/* Left Navigation Column (col-span-12 lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-xs font-bold text-[#71717A] uppercase tracking-wider font-mono">
                Módulos del Sistema ({filtered.length})
              </span>
              <span className="text-[11px] font-semibold text-[#2563EB]">🖱️ Seleccionar</span>
            </div>

            <div className="space-y-2.5">
              {filtered.map((req) => {
                const isSelected = activeRequirement.id === req.id;
                return (
                  <div
                    key={req.id}
                    onClick={() => setSelectedRequirementId(req.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between shadow-xs ${
                      isSelected
                        ? "bg-[#18181B] text-white border-[#18181B] shadow-xl scale-[1.02]"
                        : "bg-white text-[#52525B] border-[#E4E4E7] hover:border-[#2563EB]/40 hover:bg-[#FAF9F6]"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {isSelected ? (
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]" />
                        </span>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-[#D4D4D8]" />
                      )}

                      <div>
                        <span className={`text-[10px] font-mono font-bold block ${isSelected ? "text-zinc-400" : "text-[#71717A]"}`}>
                          {req.id} • {req.category}
                        </span>
                        <h4 className={`text-xs sm:text-sm font-extrabold block leading-snug ${isSelected ? "text-white" : "text-[#111111]"}`}>
                          {req.title}
                        </h4>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? "text-[#2563EB] translate-x-1" : "text-[#A1A1AA]"}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Detail Panel (col-span-12 lg:col-span-8) */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-[#E4E4E7] rounded-3xl p-7 md:p-10 shadow-xl flex flex-col justify-between min-h-[440px] max-h-[480px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/5 blur-3xl rounded-full pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRequirement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="w-full flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Header Zone */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center">
                          {getCategoryIcon(activeRequirement.category)}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-3.5 py-1 rounded-full border border-[#BFDBFE]">
                          Módulo de {activeRequirement.category}
                        </span>
                      </div>

                      <span className="text-xs font-mono font-bold text-[#52525B] px-3 py-1 rounded-md bg-[#F4F4F5] border border-[#E4E4E7]">
                        {activeRequirement.id}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl md:text-3xl font-extrabold font-display text-[#111111] mb-3 leading-tight">
                      {activeRequirement.title}
                    </h3>
                    <p className="text-[#52525B] text-sm md:text-base leading-relaxed font-normal max-w-2xl">
                      {activeRequirement.description}
                    </p>
                  </div>

                  {/* Deliverables Grid Zone */}
                  <div className="pt-5 border-t border-[#E4E4E7] mt-6">
                    <span className="text-xs font-bold text-[#111111] uppercase tracking-wider block mb-3 font-mono">
                      ENTREGABLES Y CAPACIDADES CLAVE:
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeRequirement.deliverables.map((del, dIdx) => (
                        <div
                          key={dIdx}
                          className="bg-[#EFF6FF] text-[#2563EB] text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-[#BFDBFE] flex items-center gap-2.5 shadow-xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[#111111] font-medium leading-snug">{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Tag */}
                  <div className="pt-4 border-t border-[#E4E4E7] mt-4 flex items-center justify-between text-xs text-[#71717A] font-mono">
                    <span>ENFOCO S.R.L. • Arquitectura Verificada</span>
                    <span className="text-[#2563EB] font-bold">100% Garantizado</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🖨️ Print-Only Full Expanded View (All 5 Requirements Visible in PDF) */}
      <div className="print-only max-w-7xl mx-auto w-full my-auto">
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-4 py-1.5 rounded-full border border-[#BFDBFE]">
            MATRIZ COMPLETA DE ALCANCE & ENTREGABLES
          </span>
          <h2 className="text-2xl font-extrabold text-[#111111] mt-2 mb-1">
            Alcance & Funcionalidades Requeridas (100% Desplegado)
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {requirements.map((req) => (
            <div key={req.id} className="bg-white border border-[#E4E4E7] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#52525B] px-2 py-0.5 rounded bg-[#F4F4F5] border border-[#E4E4E7]">
                    {req.id}
                  </span>
                  <span className="text-[10px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                    {req.category}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#111111] mb-1">{req.title}</h3>
                <p className="text-[10px] text-[#52525B] leading-snug mb-2">{req.description}</p>
              </div>

              <div className="pt-2 border-t border-[#E4E4E7] space-y-1">
                <span className="text-[9px] font-bold text-[#111111] font-mono uppercase block">Entregables:</span>
                {req.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center space-x-1 text-[9px] text-[#111111]">
                    <CheckCircle2 className="w-3 h-3 text-[#2563EB] shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
