"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, Users, FileText, Sparkles, Plus, Trash2 } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { EditableBlockWrapper } from "@/components/studio/EditableBlockWrapper";
import { useStudioStore } from "@/store/useStudioStore";

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
  const [projects, setProjects] = useState(DEFAULT_PROJECT_CARDS);

  const clientsList = [
    { name: "ARS Primera", sector: "Salud & Seguros", logo: "/logos/ars_primera.png" },
    { name: "Humano Seguros", sector: "Sector Asegurador", logo: "/logos/humano_seguros.png" },
    { name: "Corripio", sector: "Retail & Comercio", logo: "/logos/corripio.png" },
    { name: "Grupo BHD", sector: "Servicios Financieros", logo: "/logos/grupo_bhd.png" },
    { name: "CEPM", sector: "Sector Energía", logo: "/logos/cepm.png" },
    { name: "Grupo Ramos", sector: "Supermercados & Retail", logo: "/logos/grupo_ramos.png" },
  ];

  const marqueeClients = [...clientsList, ...clientsList, ...clientsList];

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
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#D6E5DE] via-[#D0E0D9] to-[#C8DCD3] text-[#1E3A2F] px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#B2CCC1]"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#135A34]/6 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10 relative z-10"
      >
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#135A34] uppercase font-mono px-4 py-1.5 rounded-full bg-[#7C9B8C]/25 border border-[#7C9B8C]/40 inline-block shadow-xs">
            <EditableField id="sec11_badge" defaultText="11. CASOS DE ÉXITO & EXPERIENCIA DEMOSTRADA" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#135A34] font-display leading-[1.1] pt-2">
            <EditableField id="sec11_h2" defaultText="Experiencia Comprobada en Proyectos Similares" />
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#1E3A2F] max-w-2xl mx-auto font-medium leading-relaxed">
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
                <div className="p-7 rounded-3xl bg-[#BFDAD1] border border-[#A6C5BB] shadow-lg shadow-emerald-950/5 hover:border-[#135A34]/40 hover:shadow-2xl transition-all space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#135A34]/15 text-[#135A34] border border-[#135A34]/30 flex items-center justify-center font-bold shrink-0">
                          {proj.icon === "shield" ? <ShieldCheck className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xl sm:text-2xl text-[#135A34] font-display">
                            <EditableField id={`sec11_${proj.id}_title`} defaultText={proj.title} />
                          </h3>
                          <span className="text-xs sm:text-sm font-mono text-[#135A34] font-bold">
                            <EditableField id={`sec11_${proj.id}_client`} defaultText={proj.client} />
                          </span>
                        </div>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-[#7C9B8C]/25 text-[#135A34] border border-[#7C9B8C]/40 font-bold font-mono">
                        <EditableField id={`sec11_${proj.id}_tag`} defaultText={proj.tag} />
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-[#1E3A2F] leading-relaxed font-medium">
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
                className="px-4 py-2 rounded-xl bg-[#135A34]/10 hover:bg-[#135A34]/20 border border-[#135A34]/30 text-[#135A34] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Caso de Éxito</span>
              </button>
            </div>
          )}
        </div>

        {/* Client Marquee Strip */}
        <div className="pt-4 border-t border-[#A6C5BB]/60">
          <div className="text-center mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#135A34] font-bold">
              CONFIANZA EMPRESARIAL · ALGUNOS DE NUESTROS CLIENTES
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {clientsList.map((client, idx) => (
              <div
                key={idx}
                className="px-4 py-2.5 rounded-2xl bg-[#BFDAD1] border border-[#A6C5BB] text-[#135A34] font-bold text-xs font-mono shadow-2xs hover:scale-105 transition-transform"
              >
                {client.name}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
