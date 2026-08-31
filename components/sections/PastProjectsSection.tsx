"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, Users, FileText, Sparkles } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";

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

export const PastProjectsSection: React.FC<PastProjectsSectionProps> = ({ secId }) => {
  const clientsList = [
    { name: "ARS Primera", sector: "Salud & Seguros", logo: "/logos/ars_primera.png" },
    { name: "Humano Seguros", sector: "Sector Asegurador", logo: "/logos/humano_seguros.png" },
    { name: "Corripio", sector: "Retail & Comercio", logo: "/logos/corripio.png" },
    { name: "Grupo BHD", sector: "Servicios Financieros", logo: "/logos/grupo_bhd.png" },
    { name: "CEPM", sector: "Sector Energía", logo: "/logos/cepm.png" },
    { name: "Grupo Ramos", sector: "Supermercados & Retail", logo: "/logos/grupo_ramos.png" },
  ];

  const marqueeClients = [...clientsList, ...clientsList, ...clientsList];

  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#004F54]/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10"
      >
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec11_badge" defaultText="11. CASOS DE ÉXITO & EXPERIENCIA DEMOSTRADA" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            <EditableField id="sec11_h2" defaultText="Experiencia Comprobada en Proyectos Similares" />
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto font-medium">
            <EditableField
              id="sec11_desc"
              defaultText="Casos de éxito desarrollados para grandes corporaciones e instituciones financieras en la República Dominicana."
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl space-y-4 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-[#F08D17] border border-white/10 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">App Somos Corripio</h3>
                  <span className="text-xs font-mono text-white/60">Distribuidora Corripio</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 font-bold font-mono">
                PRODUCCIÓN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70">
              Aplicación móvil nativa para autogestión de empleados e inversionistas del grupo, catálogo interactivo, notificaciones push transaccionales y consulta de beneficios 24/7.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl space-y-4 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-[#F08D17] border border-white/10 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">App de Asegurados</h3>
                  <span className="text-xs font-mono text-white/60">Humano Seguros</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 font-bold font-mono">
                PRODUCCIÓN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70">
              App móvil de alto volumen transaccional con carnet digital cifrado, consulta de pólizas en tiempo real, seguimiento de reclamaciones e integración con core bancario/asegurador.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl space-y-4 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-[#F08D17] border border-white/10 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">App de Intermediarios</h3>
                  <span className="text-xs font-mono text-white/60">Humano Seguros</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 font-bold font-mono">
                PRODUCCIÓN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70">
              Plataforma móvil y portal web para corredores e intermediarios comerciales, cotizaciones rápidas en línea, gestión de comisiones y flujo de aprobación de solicitudes.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl space-y-4 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 text-[#F08D17] border border-white/10 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">Oficina Virtual OFV</h3>
                  <span className="text-xs font-mono text-white/60">Humano Seguros</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/70 border border-white/10 font-bold font-mono">
                PRODUCCIÓN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70">
              Modernización del portal web de autogestión corporativa con descarga masiva de estados de cuenta en PDF cifrados, validación fehaciente OTP y firma electrónica.
            </p>
          </div>
        </div>

        <div className="w-full space-y-6 pt-4">
          <div className="text-center space-y-2 px-4">
            <span className="text-xs sm:text-sm font-mono font-bold text-[#F08D17] uppercase tracking-widest bg-white/10 px-5 py-2 rounded-full border border-white/20 inline-flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#F08D17]" />
              PORTAFOLIO DE EMPRESAS LÍDERES QUE CONFÍAN EN ENFOCO, S.R.L.
            </span>
            <p className="text-sm sm:text-base text-white/60 font-medium">
              Soluciones empresariales de software a la medida en producción continua 24/7
            </p>
          </div>

          <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden py-6">
            <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#004F54] via-[#004F54]/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#004F54] via-[#004F54]/90 to-transparent z-20 pointer-events-none" />

            <motion.div
              className="flex items-center gap-6 sm:gap-10 w-max px-4"
              animate={{ x: ["0%", "-33.3333%"] }}
              transition={{
                ease: "linear",
                duration: 22,
                repeat: Infinity,
              }}
            >
              {marqueeClients.map((client, idx) => (
                <div
                  key={idx}
                  className="w-72 sm:w-80 md:w-[350px] p-6 sm:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl shadow-2xl border border-white/10 flex flex-col items-center justify-center text-center space-y-4 hover:border-white/25 hover:-translate-y-1 transition-all duration-300 group shrink-0 cursor-pointer relative overflow-hidden"
                >
                  <div className="w-48 h-28 sm:w-56 sm:h-32 flex items-center justify-center overflow-hidden bg-white/10 rounded-2xl p-4">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-contain filter brightness-110 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-[#F08D17] transition-colors">
                      {client.name}
                    </h4>
                    <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10 uppercase inline-block mt-1.5">
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
