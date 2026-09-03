"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, Users, FileText, Sparkles, Plus, Trash2 } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { EditableBlockWrapper } from "@/components/studio/EditableBlockWrapper";
import { useStudioStore } from "@/store/useStudioStore";
import { useThemeStore } from "@/store/useThemeStore";

interface PastProjectsSectionProps {
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

const DEFAULT_PROJECT_CARDS = [
  {
    id: "proj-1",
    title: "App Somos Corripio",
    client: "Distribuidora Corripio",
    tag: "PRODUCCIÓN",
    desc: "Aplicación móvil nativa para autogestión de empleados e inversionistas del grupo, catálogo interactivo, notificaciones push transaccionales y consulta de beneficios 24/7.",
    icon: "phone",
  },
  {
    id: "proj-2",
    title: "App de Asegurados",
    client: "Humano Seguros",
    tag: "PRODUCCIÓN",
    desc: "Plataforma digital para consulta de pólizas de vida y salud, generación de carnets digitales, radicación de reclamaciones y red de prestadores médicos.",
    icon: "shield",
  },
];

export const PastProjectsSection: React.FC<PastProjectsSectionProps> = ({ secId }) => {
  const { isDesignMode } = useStudioStore();
  const { theme } = useThemeStore();
  const [projects, setProjects] = useState(DEFAULT_PROJECT_CARDS);

  const aboutBg = theme.aboutBg || "#D6E5DE";
  const aboutCardBg = theme.aboutCardBg || "#BFDAD1";
  const aboutTextColor = theme.aboutTextColor || "#135A34";
  const aboutCardBorder = theme.aboutCardBorder || "#A6C5BB";

  const clientsList = [
    { name: "ARS Primera", sector: "Salud & Seguros", logo: "/logos/ars_primera.png", fallback: "/logos/ars_primera.jpg" },
    { name: "Humano Seguros", sector: "Sector Asegurador", logo: "/logos/humano_seguros.png", fallback: "/logos/humano_seguros.jpg" },
    { name: "Corripio", sector: "Retail & Comercio", logo: "/logos/corripio.png", fallback: "/logos/corripio.jpg" },
    { name: "Grupo BHD", sector: "Servicios Financieros", logo: "/logos/grupo_bhd.png", fallback: "/logos/grupo_bhd.jpg" },
    { name: "CEPM", sector: "Sector Energía", logo: "/logos/cepm.jpg", fallback: "/logos/cepm.png" },
    { name: "Grupo Ramos", sector: "Supermercados & Retail", logo: "/logos/grupo_ramos.png", fallback: "/logos/grupo_ramos.jpg" },
  ];

  const marqueeClients = [...clientsList, ...clientsList, ...clientsList, ...clientsList];

  const handleDeleteProject = (id: string) => {
    if (projects.length <= 1) return;
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleAddProject = () => {
    const newId = `proj-${Date.now()}`;
    setProjects([
      ...projects,
      {
        id: newId,
        title: "Nuevo Caso de Éxito",
        client: "Cliente Institucional",
        tag: "EN PRODUCCIÓN",
        desc: "Descripción del alcance tecnológico implementado, integraciones realizadas y métricas de impacto alcanzadas.",
        icon: "phone",
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
            className="text-xs sm:text-sm font-bold tracking-widest uppercase font-mono px-4 py-1.5 rounded-full inline-block shadow-xs border"
          >
            <EditableField id="sec11_badge" defaultText="11. CASOS DE ÉXITO & EXPERIENCIA DEMOSTRADA" />
          </span>
          <h2
            style={{ color: aboutTextColor }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-display leading-[1.1] pt-2"
          >
            <EditableField id="sec11_h2" defaultText="Experiencia Comprobada en Proyectos Similares" />
          </h2>
          <p
            style={{ color: `color-mix(in srgb, ${aboutTextColor} 80%, black)` }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            <EditableField
              id="sec11_desc"
              defaultText="Casos de éxito desarrollados para grandes corporaciones e instituciones financieras en la República Dominicana."
            />
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <EditableBlockWrapper
                key={proj.id}
                id={proj.id}
                label="Caso de Éxito"
                onDelete={projects.length > 1 ? () => handleDeleteProject(proj.id) : undefined}
                className="h-full"
              >
                <div
                  style={{
                    backgroundColor: aboutCardBg,
                    borderColor: aboutCardBorder,
                  }}
                  className="p-7 rounded-3xl border shadow-lg hover:shadow-2xl transition-all space-y-4 h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div
                          style={{
                            backgroundColor: `color-mix(in srgb, ${aboutTextColor} 15%, transparent)`,
                            borderColor: `color-mix(in srgb, ${aboutTextColor} 30%, transparent)`,
                            color: aboutTextColor,
                          }}
                          className="w-12 h-12 rounded-2xl border flex items-center justify-center font-bold shrink-0"
                        >
                          {proj.icon === "shield" ? <ShieldCheck className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3
                            style={{ color: aboutTextColor }}
                            className="font-extrabold text-xl sm:text-2xl font-display"
                          >
                            <EditableField id={`sec11_${proj.id}_title`} defaultText={proj.title} />
                          </h3>
                          <span
                            style={{ color: aboutTextColor }}
                            className="text-xs sm:text-sm font-mono font-bold"
                          >
                            <EditableField id={`sec11_${proj.id}_client`} defaultText={proj.client} />
                          </span>
                        </div>
                      </div>
                      <span
                        style={{
                          backgroundColor: `color-mix(in srgb, ${aboutTextColor} 15%, transparent)`,
                          borderColor: `color-mix(in srgb, ${aboutTextColor} 30%, transparent)`,
                          color: aboutTextColor,
                        }}
                        className="text-xs px-3 py-1 rounded-full border font-bold font-mono"
                      >
                        <EditableField id={`sec11_${proj.id}_tag`} defaultText={proj.tag} />
                      </span>
                    </div>
                    <p
                      style={{ color: `color-mix(in srgb, ${aboutTextColor} 80%, black)` }}
                      className="text-sm sm:text-base leading-relaxed font-medium"
                    >
                      <EditableField id={`sec11_${proj.id}_desc`} defaultText={proj.desc} />
                    </p>
                  </div>
                </div>
              </EditableBlockWrapper>
            ))}
          </div>

          {isDesignMode && (
            <div className="flex justify-center pt-2">
              <button
                onClick={handleAddProject}
                style={{
                  color: aboutTextColor,
                  backgroundColor: `color-mix(in srgb, ${aboutTextColor} 10%, transparent)`,
                  borderColor: `color-mix(in srgb, ${aboutTextColor} 30%, transparent)`,
                }}
                className="px-4 py-2 rounded-xl border font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Caso de Éxito</span>
              </button>
            </div>
          )}
        </div>

        {/* Client Marquee Strip (Carrusel Automático con Tarjetas Cuadradas de Logos) */}
        <div className="pt-8 w-full space-y-4">
          <div className="text-center space-y-1">
            <span
              style={{ color: aboutTextColor }}
              className="text-xs sm:text-sm font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CONFIANZA EMPRESARIAL · ALGUNOS DE NUESTROS CLIENTES</span>
            </span>
          </div>

          <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <motion.div
              className="flex items-center gap-4 sm:gap-5 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 26,
                  ease: "linear",
                },
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {marqueeClients.map((client, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-48 h-48 sm:w-52 sm:h-52 p-4 sm:p-4.5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-lg hover:shadow-2xl hover:border-[#135A34]/50 hover:scale-[1.03] transition-all duration-300 flex flex-col items-center justify-between select-none group cursor-pointer"
                >
                  {/* Contenedor Limpio para el Logo / Foto */}
                  <div className="w-full flex-1 flex items-center justify-center p-2 min-h-0 bg-transparent">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-24 sm:max-h-28 max-w-[88%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-108 drop-shadow-sm mix-blend-multiply"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (client.fallback && target.src !== client.fallback) {
                          target.src = client.fallback;
                        } else if (target.src.endsWith(".png")) {
                          target.src = target.src.replace(".png", ".jpg");
                        }
                      }}
                    />
                  </div>

                  {/* Pie de Tarjeta con Nombre y Sector */}
                  <div className="w-full text-center pt-2.5 border-t border-slate-100 shrink-0">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-display truncate">
                      {client.name}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] font-mono text-emerald-800 font-semibold tracking-wide truncate block mt-0.5">
                      {client.sector}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
