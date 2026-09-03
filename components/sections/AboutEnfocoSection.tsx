"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Building2, Award, ShieldCheck, Plus, Trash2 } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { EditableBlockWrapper } from "@/components/studio/EditableBlockWrapper";
import { useStudioStore } from "@/store/useStudioStore";
import { useThemeStore } from "@/store/useThemeStore";

interface AboutEnfocoSectionProps {
  secId: string;
}

const sectionContainerVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const DEFAULT_CARDS = [
  {
    id: "about-card-1",
    title: "Perfil & Trayectoria",
    desc: "Empresa con sede en República Dominicana y más de 10 años en el mercado. Ejecutamos proyectos presenciales y remotos garantizando el acompañamiento continuo en cada fase.",
    icon: "building",
  },
  {
    id: "about-card-2",
    title: "Filosofía Empresarial",
    desc: "Nuestra misión es ser el mejor aliado tecnológico de nuestros clientes, fundamentados en valores de Innovación, Liderazgo, Integridad, Compromiso y Lealtad.",
    icon: "award",
  },
  {
    id: "about-card-3",
    title: "Seguridad ISO 27001",
    desc: "Desarrollo alineado a los estándares internacionales de confidencialidad, integridad y disponibilidad, asegurando la protección total de datos financieros.",
    icon: "shield",
  },
];

export const AboutEnfocoSection: React.FC<AboutEnfocoSectionProps> = ({ secId }) => {
  const { isDesignMode } = useStudioStore();
  const { theme } = useThemeStore();
  const [cards, setCards] = useState(DEFAULT_CARDS);

  const aboutBg = theme.aboutBg || "#D6E5DE";
  const aboutCardBg = theme.aboutCardBg || "#BFDAD1";
  const aboutTextColor = theme.aboutTextColor || "#135A34";
  const aboutCardBorder = theme.aboutCardBorder || "#A6C5BB";

  const handleDeleteCard = (id: string) => {
    if (cards.length <= 1) return;
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleAddCard = () => {
    const newId = `about-card-${Date.now()}`;
    setCards([
      ...cards,
      {
        id: newId,
        title: "Nueva Credencial ENFOCO",
        desc: "Descripción de capacidades técnicas, certificaciones y valor diferencial para el cliente.",
        icon: "award",
      },
    ]);
  };

  return (
    <section
      id={secId}
      style={{
        background: aboutBg.includes("gradient")
          ? aboutBg
          : `linear-gradient(to bottom, ${aboutBg}, color-mix(in srgb, ${aboutBg} 92%, black), color-mix(in srgb, ${aboutBg} 84%, black))`,
      }}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden px-4 sm:px-8 lg:px-12 py-20"
    >
      <div
        style={{
          backgroundColor: aboutTextColor,
          opacity: 0.08,
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] blur-[160px] rounded-full pointer-events-none"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10 relative z-10"
      >
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span
            style={{
              color: aboutTextColor,
              backgroundColor: `color-mix(in srgb, ${aboutTextColor} 12%, transparent)`,
              borderColor: `color-mix(in srgb, ${aboutTextColor} 25%, transparent)`,
            }}
            className="text-xs sm:text-sm font-bold tracking-widest uppercase font-mono px-4 py-1.5 rounded-full inline-flex items-center gap-2 shadow-xs border"
          >
            <Sparkles className="w-4 h-4" />
            <EditableField id="sec10_badge" defaultText="10. SOBRE ENFOCO S.R.L. · PERFIL CORPORATIVO & CERTIFICACIONES" />
          </span>

          <h2
            style={{ color: aboutTextColor }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] pt-2 font-display"
          >
            <EditableField id="sec10_h2" defaultText="Más de 10 Años Impulsando la Transformación Digital" />
          </h2>

          <p
            style={{ color: `color-mix(in srgb, ${aboutTextColor} 80%, black)` }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            <EditableField
              id="sec10_desc"
              defaultText="Especialistas en desarrollo de software a la medida, automatización de procesos complejos y gobierno de datos para los sectores financiero, seguros y salud."
            />
          </p>
        </div>

        {/* Corporate Cards Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((c) => (
              <EditableBlockWrapper
                key={c.id}
                id={c.id}
                label="Ficha Empresa"
                onDelete={cards.length > 1 ? () => handleDeleteCard(c.id) : undefined}
                className="h-full"
              >
                <div
                  style={{
                    backgroundColor: aboutCardBg,
                    borderColor: aboutCardBorder,
                  }}
                  className="p-7 rounded-3xl border shadow-lg hover:shadow-2xl transition-all space-y-3.5 h-full flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div
                      style={{
                        backgroundColor: `color-mix(in srgb, ${aboutTextColor} 15%, transparent)`,
                        borderColor: `color-mix(in srgb, ${aboutTextColor} 30%, transparent)`,
                        color: aboutTextColor,
                      }}
                      className="w-12 h-12 rounded-2xl border flex items-center justify-center"
                    >
                      {c.icon === "building" ? (
                        <Building2 className="w-6 h-6" />
                      ) : c.icon === "shield" ? (
                        <ShieldCheck className="w-6 h-6" />
                      ) : (
                        <Award className="w-6 h-6" />
                      )}
                    </div>
                    <h3
                      style={{ color: aboutTextColor }}
                      className="font-extrabold text-xl sm:text-2xl font-display"
                    >
                      <EditableField id={`sec10_${c.id}_title`} defaultText={c.title} />
                    </h3>
                    <p
                      style={{ color: `color-mix(in srgb, ${aboutTextColor} 80%, black)` }}
                      className="text-sm sm:text-base leading-relaxed font-medium"
                    >
                      <EditableField id={`sec10_${c.id}_desc`} defaultText={c.desc} />
                    </p>
                  </div>
                </div>
              </EditableBlockWrapper>
            ))}
          </div>

          {isDesignMode && (
            <div className="flex justify-center pt-2">
              <button
                onClick={handleAddCard}
                style={{
                  color: aboutTextColor,
                  backgroundColor: `color-mix(in srgb, ${aboutTextColor} 10%, transparent)`,
                  borderColor: `color-mix(in srgb, ${aboutTextColor} 30%, transparent)`,
                }}
                className="px-4 py-2 rounded-xl border font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Tarjeta Corporativa</span>
              </button>
            </div>
          )}
        </div>

        {/* Security Box */}
        <EditableBlockWrapper id="sec10_iso_box" label="Caja de Seguridad">
          <div
            style={{
              backgroundColor: aboutCardBg,
              borderColor: aboutCardBorder,
            }}
            className="p-8 rounded-3xl border shadow-lg flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <span
                style={{ color: aboutTextColor }}
                className="text-xs font-mono uppercase tracking-widest font-bold"
              >
                ESTÁNDAR DE SEGURIDAD & COMPLIANCE
              </span>
              <h3
                style={{ color: aboutTextColor }}
                className="text-xl sm:text-2xl font-black font-display"
              >
                <EditableField id="sec10_iso_title" defaultText="Certificaciones ISO 27001 / ISO 27002" />
              </h3>
              <p
                style={{ color: `color-mix(in srgb, ${aboutTextColor} 80%, black)` }}
                className="text-sm sm:text-base max-w-2xl font-medium"
              >
                <EditableField
                  id="sec10_iso_desc"
                  defaultText="Todos nuestros procesos de desarrollo siguen lineamientos rigurosos de seguridad de la información, auditoría de código y cifrado bancario AES-256."
                />
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                style={{
                  backgroundColor: `color-mix(in srgb, ${aboutTextColor} 15%, transparent)`,
                  color: aboutTextColor,
                  borderColor: `color-mix(in srgb, ${aboutTextColor} 35%, transparent)`,
                }}
                className="text-xs font-mono font-bold px-4 py-2 rounded-2xl shadow-md border"
              >
                <EditableField id="sec10_iso_badge" defaultText="100% REGULADO SIMV" />
              </span>
            </div>
          </div>
        </EditableBlockWrapper>
      </motion.div>
    </section>
  );
};
