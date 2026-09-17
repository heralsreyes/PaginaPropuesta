"use client";

import React, { useState } from "react";
import { ProposalData } from "@/data/proposalData";
import { useProposal } from "@/context/ProposalContext";
import { EditableText } from "@/components/studio/EditableText";
import { EditableField } from "@/components/ui/EditableField";
import { DeletableItem } from "@/components/studio/DeletableItem";
import { useThemeStore, PRESET_THEMES } from "@/store/useThemeStore";
import { replaceAt } from "@/lib/arrayUtils";
import { Target, Compass, Award, ShieldCheck, CheckCircle2, Monitor, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CompanySectionProps {
  company: ProposalData["company"];
}

type OptionType = "mision" | "vision" | "valores" | "estandares";

export const CompanySection: React.FC<CompanySectionProps> = ({ company }) => {
  const { updateCompany } = useProposal();
  const { theme } = useThemeStore();
  const [activeOption, setActiveOption] = useState<OptionType>("mision");

  const safeTheme = theme || PRESET_THEMES[0]?.theme || {};
  const aboutBg = safeTheme.aboutBg || "var(--about-bg, var(--bg-main))";
  const aboutTextColor = safeTheme.aboutTextColor || "var(--about-text, var(--h2-color))";
  const aboutCardBg = safeTheme.aboutCardBg || "var(--about-card-bg, var(--card-bg))";
  const aboutCardBorder = safeTheme.aboutCardBorder || "var(--about-border, var(--border-color))";

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

  const [hiddenOptions, setHiddenOptions] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("company_hidden_options");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [hiddenBullets, setHiddenBullets] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("company_hidden_bullets");
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const handleDeleteOption = (id: string) => {
    setHiddenOptions((prev) => {
      const next = [...prev, id];
      try {
        localStorage.setItem("company_hidden_options", JSON.stringify(next));
      } catch {}
      return next;
    });
    const remaining = options.filter((o) => o.id !== id && !hiddenOptions.includes(o.id));
    if (remaining.length > 0 && activeOption === id) {
      setActiveOption(remaining[0].id);
    }
  };

  const handleDeleteBullet = (id: string) => {
    setHiddenBullets((prev) => {
      const next = [...prev, id];
      try {
        localStorage.setItem("company_hidden_bullets", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <section
      id="empresa"
      style={{ backgroundColor: aboutBg }}
      className="min-h-screen w-full flex flex-col justify-start items-center relative overflow-hidden border-t border-[var(--border-color)] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 transition-colors duration-300"
    >
      {/* 💻 Screen Interactive View */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="screen-only max-w-6xl mx-auto w-full flex flex-col justify-start py-2"
      >
        {/* Standard Executive Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
          <span
            className="px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 inline-block border"
            style={{
              backgroundColor: `${aboutTextColor}15`,
              color: aboutTextColor,
              borderColor: `${aboutTextColor}40`,
            }}
          >
            <EditableField id="company_badge" defaultText="RESPALDO CORPORATIVO • EXPERIENCIA & CALIDAD" />
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-center mt-1 mb-2"
            style={{ color: aboutTextColor }}
          >
            <EditableField id="company_h2" defaultText="Sobre ENFOCO, S.R.L." />
          </h2>
          <p
            className="text-xs sm:text-sm max-w-2xl mx-auto text-center mb-2 opacity-80"
            style={{ color: aboutTextColor }}
          >
            <EditableField id="company_desc" defaultText="Conozca nuestro propósito, estándares metodológicos y el compromiso técnico que respalda cada una de nuestras soluciones." />
          </p>
        </div>

        {/* Two-Column Asymmetric Grid Container */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto w-full">
          {/* LEFT COLUMN: Interactive Controls & Details (6 Cols) */}
          <div className="xl:col-span-6 flex flex-col justify-between">
            <div>
              <h3
                className="text-xs sm:text-sm font-bold mb-3 flex items-center space-x-2"
                style={{ color: aboutTextColor }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: aboutTextColor }}></span>
                <EditableField id="company_select_prompt" defaultText="Seleccione una opción para explorar:" />
              </h3>

              {/* Option Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {options.filter((opt) => !hiddenOptions.includes(opt.id)).map((opt) => {
                  const isActive = activeOption === opt.id;
                  const IconComponent = opt.icon;

                  return (
                    <DeletableItem
                      key={opt.id}
                      onDelete={() => handleDeleteOption(opt.id)}
                      itemTitle="opción"
                    >
                      <button
                        onClick={() => setActiveOption(opt.id)}
                        style={
                          isActive
                            ? {
                                backgroundColor: aboutTextColor,
                                color: "#ffffff",
                                borderColor: aboutTextColor,
                              }
                            : {
                                backgroundColor: aboutCardBg,
                                borderColor: aboutCardBorder,
                                color: aboutTextColor,
                              }
                        }
                        className={`w-full p-4 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                          isActive
                            ? "shadow-lg scale-[1.02]"
                            : "hover:opacity-90"
                        }`}
                      >
                        <div
                          style={
                            isActive
                              ? { backgroundColor: "rgba(255,255,255,0.2)", color: "#ffffff" }
                              : { backgroundColor: `${aboutTextColor}15`, color: aboutTextColor }
                          }
                          className="w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 transition-colors"
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold block" style={{ color: isActive ? "#ffffff" : aboutTextColor }}>
                          {opt.title}
                        </span>
                        <span className="text-[11px] font-normal block opacity-80" style={{ color: isActive ? "#ffffff" : aboutTextColor }}>
                          {opt.subtitle}
                        </span>
                      </button>
                    </DeletableItem>
                  );
                })}
              </div>

              <div className="space-y-2.5">
                {!hiddenBullets.includes("company_bullet_1") && (
                  <DeletableItem
                    onDelete={() => handleDeleteBullet("company_bullet_1")}
                    itemTitle="viñeta"
                  >
                    <div
                      className="p-3.5 rounded-2xl border text-xs leading-relaxed"
                      style={{
                        backgroundColor: aboutCardBg,
                        borderColor: aboutCardBorder,
                        color: aboutTextColor,
                      }}
                    >
                      <span className="font-bold mr-1.5" style={{ color: aboutTextColor }}>•</span>
                      <strong className="font-semibold" style={{ color: aboutTextColor }}>ENFOCO, S.R.L.:</strong>{" "}
                      <EditableField id="company_bullet_1" defaultText="Soluciones tecnológicas integrales especializadas en Desarrollo de Software a la medida, automatización y optimización operativa." />
                    </div>
                  </DeletableItem>
                )}

                {!hiddenBullets.includes("company_bullet_2") && (
                  <DeletableItem
                    onDelete={() => handleDeleteBullet("company_bullet_2")}
                    itemTitle="viñeta"
                  >
                    <div
                      className="p-3.5 rounded-2xl border text-xs leading-relaxed"
                      style={{
                        backgroundColor: aboutCardBg,
                        borderColor: aboutCardBorder,
                        color: aboutTextColor,
                      }}
                    >
                      <span className="font-bold mr-1.5" style={{ color: aboutTextColor }}>•</span>
                      <strong className="font-semibold" style={{ color: aboutTextColor }}>Respaldo Internacional:</strong>{" "}
                      <EditableField id="company_bullet_2" defaultText="Equipo multidisciplinario con certificaciones CMMI, ISO 27002 y metodologías ágiles Scrum/PMP." />
                    </div>
                  </DeletableItem>
                )}

                {(hiddenOptions.length > 0 || hiddenBullets.length > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      setHiddenOptions([]);
                      setHiddenBullets([]);
                      try {
                        localStorage.removeItem("company_hidden_options");
                        localStorage.removeItem("company_hidden_bullets");
                      } catch {}
                    }}
                    className="text-[11px] font-semibold text-amber-500 hover:text-amber-600 hover:underline cursor-pointer block mt-1"
                  >
                    ↺ Restaurar tarjetas y opciones eliminadas
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Visual Computer Screen Mockup Showcase (6 Cols) */}
          <div className="xl:col-span-6 flex flex-col justify-center">
            <div
              className="rounded-3xl border shadow-2xl overflow-hidden min-h-[380px] w-full flex flex-col justify-between relative transition-colors duration-300"
              style={{
                backgroundColor: aboutCardBg,
                borderColor: aboutCardBorder,
              }}
            >
              {/* macOS Window Controls Top Bar */}
              <div
                className="border-b px-4 py-2.5 flex items-center justify-between shrink-0 font-mono"
                style={{
                  backgroundColor: aboutCardBg,
                  borderColor: aboutCardBorder,
                  color: aboutTextColor,
                }}
              >
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono opacity-90">
                  <Monitor className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                  <span>ENFOCO OS • [{activeOption.toUpperCase()}]</span>
                </div>
                <span className="text-[10px] bg-[var(--accent-color)]/15 text-[var(--accent-color)] px-2 py-0.5 rounded font-mono font-bold">
                  v2.5
                </span>
              </div>

              {/* Inner Screen Content */}
              <div
                className="p-6 sm:p-7 flex-1 flex flex-col justify-center relative overflow-hidden transition-colors duration-300"
                style={{ backgroundColor: aboutBg }}
              >
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
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${aboutTextColor}15`, color: aboutTextColor }}
                            >
                              <Target className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold" style={{ color: aboutTextColor }}>
                              <EditableField id="company_mission_title" defaultText="Nuestra Misión Corporativa" />
                            </h4>
                          </div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                            style={{
                              backgroundColor: `${aboutTextColor}15`,
                              color: aboutTextColor,
                              borderColor: `${aboutTextColor}40`,
                            }}
                          >
                            <EditableField id="company_mission_badge" defaultText="Objetivo Principal" />
                          </span>
                        </div>

                        <div
                          className="p-4 rounded-2xl border shadow-sm"
                          style={{
                            backgroundColor: aboutCardBg,
                            borderColor: aboutCardBorder,
                          }}
                        >
                          <p className="text-xs sm:text-sm leading-relaxed italic font-normal" style={{ color: aboutTextColor }}>
                            "
                            <EditableText
                              id="company_mission_text"
                              value={company.mission}
                              onChange={(val) => updateCompany({ mission: val })}
                              multiline
                              tag="span"
                            />
                            "
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div
                            className="p-3.5 rounded-xl border text-left"
                            style={{
                              backgroundColor: aboutCardBg,
                              borderColor: aboutCardBorder,
                            }}
                          >
                            <span className="text-[10px] block font-semibold opacity-70" style={{ color: aboutTextColor }}>
                              <EditableField id="company_warranty_label" defaultText="Garantía" />
                            </span>
                            <span className="text-xs font-bold" style={{ color: aboutTextColor }}>
                              <EditableField id="company_warranty_value" defaultText="100% a la Medida" />
                            </span>
                          </div>
                          <div
                            className="p-3.5 rounded-xl border text-left"
                            style={{
                              backgroundColor: aboutCardBg,
                              borderColor: aboutCardBorder,
                            }}
                          >
                            <span className="text-[10px] block font-semibold opacity-70" style={{ color: aboutTextColor }}>
                              <EditableField id="company_sla_label" defaultText="Soporte SLA" />
                            </span>
                            <span className="text-xs font-bold" style={{ color: aboutTextColor }}>
                              <EditableField id="company_sla_value" defaultText="60 Días Cobertura" />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeOption === "vision" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${aboutTextColor}15`, color: aboutTextColor }}
                            >
                              <Compass className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold" style={{ color: aboutTextColor }}>
                              <EditableField id="company_vision_title" defaultText="Nuestra Visión de Futuro" />
                            </h4>
                          </div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                            style={{
                              backgroundColor: `${aboutTextColor}15`,
                              color: aboutTextColor,
                              borderColor: `${aboutTextColor}40`,
                            }}
                          >
                            <EditableField id="company_vision_badge" defaultText="Liderazgo" />
                          </span>
                        </div>

                        <div
                          className="p-4 rounded-2xl border shadow-sm"
                          style={{
                            backgroundColor: aboutCardBg,
                            borderColor: aboutCardBorder,
                          }}
                        >
                          <p className="text-xs sm:text-sm leading-relaxed italic font-normal" style={{ color: aboutTextColor }}>
                            "
                            <EditableText
                              id="company_vision_text"
                              value={company.vision}
                              onChange={(val) => updateCompany({ vision: val })}
                              multiline
                              tag="span"
                            />
                            "
                          </p>
                        </div>

                        <div
                          className="p-3.5 rounded-xl border flex items-center space-x-3 text-xs font-semibold"
                          style={{
                            backgroundColor: `${aboutTextColor}15`,
                            borderColor: `${aboutTextColor}30`,
                            color: aboutTextColor,
                          }}
                        >
                          <Cpu className="w-4 h-4 shrink-0" style={{ color: aboutTextColor }} />
                          <EditableField id="company_vision_tech_desc" defaultText="Arquitectura limpia y moderna basada en Next.js, React y Cloud Services." />
                        </div>
                      </div>
                    )}

                    {activeOption === "valores" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2.5">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${aboutTextColor}15`, color: aboutTextColor }}
                            >
                              <Award className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold" style={{ color: aboutTextColor }}>
                              <EditableField id="company_values_title" defaultText="Valores Fundamentales" />
                            </h4>
                          </div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                            style={{
                              backgroundColor: `${aboutTextColor}15`,
                              color: aboutTextColor,
                              borderColor: `${aboutTextColor}40`,
                            }}
                          >
                            <EditableField id="company_values_badge" defaultText="Principios" />
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          {company.values.map((val, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl border flex items-center space-x-2 text-xs font-bold shadow-xs"
                              style={{
                                backgroundColor: aboutCardBg,
                                borderColor: aboutCardBorder,
                                color: aboutTextColor,
                              }}
                            >
                              <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: aboutTextColor }} />
                              <span>
                                <EditableText
                                  id={`company_value_${idx}_text`}
                                  value={val}
                                  onChange={(newVal) => {
                                    updateCompany({ values: replaceAt(company.values, idx, newVal) });
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
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${aboutTextColor}15`, color: aboutTextColor }}
                            >
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h4 className="text-base font-bold" style={{ color: aboutTextColor }}>
                              <EditableField id="company_standards_title" defaultText="Estándares & Normativas" />
                            </h4>
                          </div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                            style={{
                              backgroundColor: `${aboutTextColor}15`,
                              color: aboutTextColor,
                              borderColor: `${aboutTextColor}40`,
                            }}
                          >
                            <EditableField id="company_standards_badge" defaultText="Certificado" />
                          </span>
                        </div>

                        <div className="space-y-2">
                          {company.certifications.map((cert, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl border flex items-center justify-between text-xs"
                              style={{
                                backgroundColor: aboutCardBg,
                                borderColor: aboutCardBorder,
                              }}
                            >
                              <span className="font-bold" style={{ color: aboutTextColor }}>
                                <EditableText
                                  id={`company_cert_${idx}_text`}
                                  value={cert}
                                  onChange={(newCert) => {
                                    updateCompany({ certifications: replaceAt(company.certifications, idx, newCert) });
                                  }}
                                  tag="span"
                                />
                              </span>
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full border font-bold"
                                style={{
                                  backgroundColor: `${aboutTextColor}15`,
                                  color: aboutTextColor,
                                  borderColor: `${aboutTextColor}30`,
                                }}
                              >
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

              <div
                className="border-t px-4 py-2 text-[11px] flex items-center justify-between shrink-0 font-mono"
                style={{
                  backgroundColor: aboutCardBg,
                  borderColor: aboutCardBorder,
                  color: aboutTextColor,
                }}
              >
                <span>
                  ENFOCO S.R.L. • RNC{" "}
                  <EditableText
                    id="company_rnc"
                    value={company.rnc}
                    onChange={(val) => updateCompany({ rnc: val })}
                    tag="span"
                  />
                </span>
                <span className="font-bold" style={{ color: aboutTextColor }}>
                  <EditableField id="company_quality_guarantee" defaultText="100% Calidad Garantizada" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 🖨️ Print-Only Full Unwrapped View */}
      <div className="print-only max-w-6xl mx-auto w-full my-auto">
        <div className="text-center mb-4">
          <span
            className="text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border"
            style={{
              backgroundColor: `${aboutTextColor}15`,
              color: aboutTextColor,
              borderColor: `${aboutTextColor}40`,
            }}
          >
            RESPALDO CORPORATIVO • EXPERIENCIA & CALIDAD
          </span>
          <h2 className="text-2xl font-extrabold mt-2 mb-1" style={{ color: aboutTextColor }}>
            Sobre ENFOCO, S.R.L.
          </h2>
          <p className="text-xs max-w-2xl mx-auto text-center mb-4 opacity-80" style={{ color: aboutTextColor }}>
            Conozca nuestro propósito, estándares metodológicos y el compromiso técnico que respalda cada una de nuestras soluciones.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className="border rounded-2xl p-5 shadow-xs"
            style={{
              backgroundColor: aboutCardBg,
              borderColor: aboutCardBorder,
            }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4" style={{ color: aboutTextColor }} />
              <h3 className="text-sm font-bold" style={{ color: aboutTextColor }}>Nuestra Misión</h3>
            </div>
            <p className="text-xs leading-relaxed italic" style={{ color: aboutTextColor }}>"{company.mission}"</p>
          </div>

          <div
            className="border rounded-2xl p-5 shadow-xs"
            style={{
              backgroundColor: aboutCardBg,
              borderColor: aboutCardBorder,
            }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Compass className="w-4 h-4" style={{ color: aboutTextColor }} />
              <h3 className="text-sm font-bold" style={{ color: aboutTextColor }}>Nuestra Visión</h3>
            </div>
            <p className="text-xs leading-relaxed italic" style={{ color: aboutTextColor }}>"{company.vision}"</p>
          </div>
        </div>
      </div>
    </section>
  );
};
