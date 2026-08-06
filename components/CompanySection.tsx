"use client";

import React, { useState } from "react";
import { ProposalData } from "@/data/proposalData";
import { Target, Compass, Award, ShieldCheck, CheckCircle2, Sparkles, Monitor, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CompanySectionProps {
  company: ProposalData["company"];
}

type OptionType = "mision" | "vision" | "valores" | "estandares";

export const CompanySection: React.FC<CompanySectionProps> = ({ company }) => {
  const [activeOption, setActiveOption] = useState<OptionType>("mision");

  const options = [
    {
      id: "mision" as OptionType,
      title: "Nuestra Misión",
      subtitle: "Propósito & Compromiso",
      icon: Target,
    },
    {
      id: "vision" as OptionType,
      title: "Nuestra Visión",
      subtitle: "Proyección Futura",
      icon: Compass,
    },
    {
      id: "valores" as OptionType,
      title: "Valores",
      subtitle: "Principios Éticos",
      icon: Award,
    },
    {
      id: "estandares" as OptionType,
      title: "Estándares",
      subtitle: "Normativas & CMMI",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="empresa" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[#FAF9F6] border-t border-[#E4E4E7] px-4 sm:px-6 lg:px-8">
      {/* 💻 Screen Interactive View */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="screen-only max-w-6xl mx-auto w-full my-auto flex flex-col justify-center"
      >
        {/* Standard Executive Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
          <span className="px-3.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#BFDBFE] mb-2 inline-block">
            RESPALDO CORPORATIVO • EXPERIENCIA & CALIDAD
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[#111111] tracking-tight text-center mt-1 mb-2">
            Sobre ENFOCO, S.R.L.
          </h2>
          <p className="text-[#52525B] text-xs sm:text-sm max-w-2xl mx-auto text-center mb-2">
            Conozca nuestro propósito, estándares metodológicos y el compromiso técnico que respalda cada una de nuestras soluciones.
          </p>
        </div>

        {/* Two-Column Asymmetric Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COLUMN: Interactive Controls & Details (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#111111] mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <span>Seleccione una opción para explorar:</span>
              </h3>

              {/* Option Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {options.map((opt) => {
                  const isActive = activeOption === opt.id;
                  const IconComponent = opt.icon;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => setActiveOption(opt.id)}
                      className={`p-4 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                        isActive
                          ? "bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-[#2563EB]/25 scale-[1.02]"
                          : "bg-white text-[#52525B] border-[#E4E4E7] hover:border-[#2563EB]/40 hover:bg-[#F4F4F5] hover:text-[#111111]"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[#EFF6FF] text-[#2563EB]"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`text-xs sm:text-sm font-bold block ${isActive ? "text-white" : "text-[#111111]"}`}>
                        {opt.title}
                      </span>
                      <span className={`text-[11px] font-normal block ${isActive ? "text-white/80" : "text-[#71717A]"}`}>
                        {opt.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-[#F4F4F5] border border-[#E4E4E7] text-xs text-[#52525B] leading-relaxed">
                  <span className="text-[#2563EB] font-bold mr-1.5">•</span>
                  <strong className="text-[#111111] font-semibold">ENFOCO, S.R.L.:</strong> Soluciones tecnológicas integrales especializadas en Desarrollo de Software a la medida, automatización y optimización operativa.
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F4F4F5] border border-[#E4E4E7] text-xs text-[#52525B] leading-relaxed">
                  <span className="text-[#2563EB] font-bold mr-1.5">•</span>
                  <strong className="text-[#111111] font-semibold">Respaldo Internacional:</strong> Equipo multidisciplinario con certificaciones CMMI, ISO 27002 y metodologías ágiles Scrum/PMP.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Mockup Showcase (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="bg-white rounded-3xl border-4 border-[#111111] shadow-2xl overflow-hidden min-h-[400px] max-h-[420px] flex flex-col justify-between relative">
              <div className="bg-[#111111] text-white px-4 py-2.5 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-zinc-300">
                  <Monitor className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>ENFOCO OS • [{activeOption.toUpperCase()}]</span>
                </div>
                <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-mono">
                  v2.5
                </span>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-center bg-[#FAF9F6] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeOption}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="w-full"
                  >
                    {activeOption === "mision" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                              <Target className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold text-[#111111]">Nuestra Misión Corporativa</h4>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                            Objetivo Principal
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-sm">
                          <p className="text-xs sm:text-sm text-[#111111] leading-relaxed italic font-normal">
                            "{company.mission}"
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3.5 rounded-xl bg-white border border-[#E4E4E7] text-left">
                            <span className="text-[10px] text-[#71717A] block font-semibold">Garantía</span>
                            <span className="text-xs font-bold text-[#111111]">100% a la Medida</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-white border border-[#E4E4E7] text-left">
                            <span className="text-[10px] text-[#71717A] block font-semibold">Soporte SLA</span>
                            <span className="text-xs font-bold text-[#2563EB]">60 Días Cobertura</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeOption === "vision" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                              <Compass className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold text-[#111111]">Nuestra Visión de Futuro</h4>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                            Liderazgo
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-sm">
                          <p className="text-xs sm:text-sm text-[#111111] leading-relaxed italic font-normal">
                            "{company.vision}"
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center space-x-3 text-xs text-[#2563EB] font-semibold">
                          <Cpu className="w-4 h-4 shrink-0" />
                          <span>Arquitectura limpia y moderna basada en Next.js, React y Cloud Services.</span>
                        </div>
                      </div>
                    )}

                    {activeOption === "valores" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                              <Award className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold text-[#111111]">Valores Fundamentales</h4>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                            Principios
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          {company.values.map((val, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-white border border-[#E4E4E7] flex items-center space-x-2 text-xs text-[#111111] font-bold shadow-xs"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                              <span>{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeOption === "estandares" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold text-[#111111]">Estándares & Normativas</h4>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                            Certificado
                          </span>
                        </div>

                        <div className="space-y-2">
                          {company.certifications.map((cert, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-white border border-[#E4E4E7] flex items-center justify-between text-xs"
                            >
                              <span className="font-bold text-[#111111]">{cert}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] font-bold">
                                Certificado
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="bg-[#111111] text-zinc-400 px-4 py-2 text-[11px] flex items-center justify-between shrink-0 font-mono">
                <span>ENFOCO S.R.L. • RNC {company.rnc}</span>
                <span className="text-[#2563EB] font-bold">100% Calidad Garantizada</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🖨️ Print-Only Full Unwrapped View (All 4 Tabs Visible in PDF) */}
      <div className="print-only max-w-6xl mx-auto w-full my-auto">
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] bg-[#EFF6FF] px-4 py-1.5 rounded-full border border-[#BFDBFE]">
            RESPALDO CORPORATIVO • EXPERIENCIA & CALIDAD
          </span>
          <h2 className="text-2xl font-extrabold text-[#111111] mt-2 mb-1">
            Sobre ENFOCO, S.R.L.
          </h2>
          <p className="text-[#52525B] text-xs max-w-2xl mx-auto text-center mb-4">
            Conozca nuestro propósito, estándares metodológicos y el compromiso técnico que respalda cada una de nuestras soluciones.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Misión */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-bold text-[#111111]">Nuestra Misión</h3>
            </div>
            <p className="text-xs text-[#52525B] leading-relaxed italic">"{company.mission}"</p>
          </div>

          {/* Visión */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center space-x-2 mb-2">
              <Compass className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-bold text-[#111111]">Nuestra Visión</h3>
            </div>
            <p className="text-xs text-[#52525B] leading-relaxed italic">"{company.vision}"</p>
          </div>

          {/* Valores */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-bold text-[#111111]">Valores Fundamentales</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-[#111111]">
              {company.values.map((v, idx) => (
                <div key={idx} className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estándares */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center space-x-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-bold text-[#111111]">Estándares & Normativas</h3>
            </div>
            <div className="space-y-1.5 text-xs text-[#111111]">
              {company.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 bg-[#FAF9F6] rounded-lg border border-[#E4E4E7]">
                  <span className="font-bold">{cert}</span>
                  <span className="text-[10px] text-[#2563EB] font-bold">Certificado</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
