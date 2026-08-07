"use client";

import React, { useState } from "react";
import { ProposalData } from "@/data/proposalData";
import { useProposal } from "@/context/ProposalContext";
import { EditableText } from "@/components/studio/EditableText";
import { Target, Compass, Award, ShieldCheck, CheckCircle2, Monitor, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CompanySectionProps {
  company: ProposalData["company"];
}

type OptionType = "mision" | "vision" | "valores" | "estandares";

export const CompanySection: React.FC<CompanySectionProps> = ({ company }) => {
  const { updateCompany } = useProposal();
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
    <section id="empresa" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center relative overflow-hidden bg-[var(--bg-main)] border-t border-[var(--border-color)] px-4 sm:px-6 lg:px-8 transition-colors duration-300">
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
          <span className="px-3.5 py-1 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[var(--accent-color)]/30 mb-2 inline-block">
            RESPALDO CORPORATIVO • EXPERIENCIA & CALIDAD
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-[var(--text-primary)] tracking-tight text-center mt-1 mb-2">
            Sobre ENFOCO, S.R.L.
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs sm:text-sm max-w-2xl mx-auto text-center mb-2">
            Conozca nuestro propósito, estándares metodológicos y el compromiso técnico que respalda cada una de nuestras soluciones.
          </p>
        </div>

        {/* Two-Column Asymmetric Grid Container */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto w-full">
          {/* LEFT COLUMN: Interactive Controls & Details (6 Cols) */}
          <div className="xl:col-span-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-color)]"></span>
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
                          ? "bg-[var(--accent-color)] text-white border-[var(--accent-color)] shadow-lg shadow-[var(--accent-color)]/25 scale-[1.02]"
                          : "bg-[var(--card-bg)] text-[var(--text-primary)]/80 border-[var(--border-color)] hover:border-[var(--accent-color)]/40 hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[var(--accent-color)]/10 text-[var(--accent-color)]"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`text-xs sm:text-sm font-bold block ${isActive ? "text-white" : "text-[var(--text-primary)]"}`}>
                        {opt.title}
                      </span>
                      <span className={`text-[11px] font-normal block ${isActive ? "text-white/80" : "text-[var(--text-primary)]/60"}`}>
                        {opt.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]/80 leading-relaxed">
                  <span className="text-[var(--accent-color)] font-bold mr-1.5">•</span>
                  <strong className="text-[var(--text-primary)] font-semibold">ENFOCO, S.R.L.:</strong> Soluciones tecnológicas integrales especializadas en Desarrollo de Software a la medida, automatización y optimización operativa.
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]/80 leading-relaxed">
                  <span className="text-[var(--accent-color)] font-bold mr-1.5">•</span>
                  <strong className="text-[var(--text-primary)] font-semibold">Respaldo Internacional:</strong> Equipo multidisciplinario con certificaciones CMMI, ISO 27002 y metodologías ágiles Scrum/PMP.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Computer Screen Mockup Showcase (6 Cols) */}
          <div className="xl:col-span-6 flex flex-col justify-center">
            <div className="bg-[var(--card-bg)] rounded-3xl border-4 border-[var(--text-primary)] shadow-2xl overflow-hidden min-h-[380px] w-full flex flex-col justify-between relative transition-colors duration-300">
              {/* macOS Window Controls Top Bar */}
              <div className="bg-[var(--text-primary)] text-[var(--card-bg)] px-4 py-2.5 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono opacity-90">
                  <Monitor className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                  <span>ENFOCO OS • [{activeOption.toUpperCase()}]</span>
                </div>
                <span className="text-[10px] bg-[#2563EB]/20 text-[var(--accent-color)] px-2 py-0.5 rounded font-mono font-bold">
                  v2.5
                </span>
              </div>

              {/* Inner Screen Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-center bg-[var(--bg-main)] relative overflow-hidden transition-colors duration-300">
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
                            <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center">
                              <Target className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold text-[var(--text-primary)]">Nuestra Misión Corporativa</h4>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-2.5 py-1 rounded-full border border-[var(--accent-color)]/30">
                            Objetivo Principal
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm">
                          <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed italic font-normal">
                            "
                            <EditableText
                              value={company.mission}
                              onChange={(val) => updateCompany({ mission: val })}
                              multiline
                              tag="span"
                            />
                            "
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] text-left">
                            <span className="text-[10px] text-[var(--text-primary)]/60 block font-semibold">Garantía</span>
                            <span className="text-xs font-bold text-[var(--text-primary)]">100% a la Medida</span>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] text-left">
                            <span className="text-[10px] text-[var(--text-primary)]/60 block font-semibold">Soporte SLA</span>
                            <span className="text-xs font-bold text-[var(--accent-color)]">60 Días Cobertura</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeOption === "vision" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center">
                              <Compass className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold text-[var(--text-primary)]">Nuestra Visión de Futuro</h4>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-2.5 py-1 rounded-full border border-[var(--accent-color)]/30">
                            Liderazgo
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-sm">
                          <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed italic font-normal">
                            "
                            <EditableText
                              value={company.vision}
                              onChange={(val) => updateCompany({ vision: val })}
                              multiline
                              tag="span"
                            />
                            "
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 flex items-center space-x-3 text-xs text-[var(--accent-color)] font-semibold">
                          <Cpu className="w-4 h-4 shrink-0" />
                          <span>Arquitectura limpia y moderna basada en Next.js, React y Cloud Services.</span>
                        </div>
                      </div>
                    )}

                    {activeOption === "valores" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center">
                              <Award className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold text-[var(--text-primary)]">Valores Fundamentales</h4>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-2.5 py-1 rounded-full border border-[var(--accent-color)]/30">
                            Principios
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          {company.values.map((val, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center space-x-2 text-xs text-[var(--text-primary)] font-bold shadow-xs"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
                              <span>
                                <EditableText
                                  value={val}
                                  onChange={(newVal) => {
                                    const updatedValues = [...company.values];
                                    updatedValues[idx] = newVal;
                                    updateCompany({ values: updatedValues });
                                  }}
                                  tag="span"
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeOption === "estandares" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold text-[var(--text-primary)]">Estándares & Normativas</h4>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-2.5 py-1 rounded-full border border-[var(--accent-color)]/30">
                            Certificado
                          </span>
                        </div>

                        <div className="space-y-2">
                          {company.certifications.map((cert, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-between text-xs"
                            >
                              <span className="font-bold text-[var(--text-primary)]">
                                <EditableText
                                  value={cert}
                                  onChange={(newCert) => {
                                    const updatedCerts = [...company.certifications];
                                    updatedCerts[idx] = newCert;
                                    updateCompany({ certifications: updatedCerts });
                                  }}
                                  tag="span"
                                />
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/30 font-bold">
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

              <div className="bg-[var(--text-primary)] text-[var(--card-bg)] opacity-90 px-4 py-2 text-[11px] flex items-center justify-between shrink-0 font-mono">
                <span>
                  ENFOCO S.R.L. • RNC{" "}
                  <EditableText
                    value={company.rnc}
                    onChange={(val) => updateCompany({ rnc: val })}
                    tag="span"
                  />
                </span>
                <span className="text-[var(--accent-color)] font-bold">100% Calidad Garantizada</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🖨️ Print-Only Full Unwrapped View */}
      <div className="print-only max-w-6xl mx-auto w-full my-auto">
        <div className="text-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-4 py-1.5 rounded-full border border-[var(--accent-color)]/30">
            RESPALDO CORPORATIVO • EXPERIENCIA & CALIDAD
          </span>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mt-2 mb-1">
            Sobre ENFOCO, S.R.L.
          </h2>
          <p className="text-[var(--text-primary)]/70 text-xs max-w-2xl mx-auto text-center mb-4">
            Conozca nuestro propósito, estándares metodológicos y el compromiso técnico que respalda cada una de nuestras soluciones.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-[var(--accent-color)]" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Nuestra Misión</h3>
            </div>
            <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed italic">"{company.mission}"</p>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-5 shadow-xs">
            <div className="flex items-center space-x-2 mb-2">
              <Compass className="w-4 h-4 text-[var(--accent-color)]" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Nuestra Visión</h3>
            </div>
            <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed italic">"{company.vision}"</p>
          </div>
        </div>
      </div>
    </section>
  );
};
