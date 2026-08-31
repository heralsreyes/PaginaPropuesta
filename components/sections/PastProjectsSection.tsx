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
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#EAECEF] via-[#E2E5EA] to-[#D8DCE2] text-[#1E293B] px-4 sm:px-8 lg:px-12 py-20 transition-colors duration-300 border-b border-[#CCD2DC]"
    >
      {/* Sutil halo ambiental suave en verde Enfoco */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#1B7A38]/5 blur-[160px] rounded-full pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10 relative z-10"
      >
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#1B7A38] uppercase font-mono px-4 py-1.5 rounded-full bg-[#1B7A38]/10 border border-[#1B7A38]/25 inline-block shadow-xs">
            <EditableField id="sec11_badge" defaultText="11. CASOS DE ÉXITO & EXPERIENCIA DEMOSTRADA" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1B7A38] font-display">
            <EditableField id="sec11_h2" defaultText="Experiencia Comprobada en Proyectos Similares" />
          </h2>
          <p className="text-base sm:text-lg text-[#334155] max-w-3xl mx-auto font-medium">
            <EditableField
              id="sec11_desc"
              defaultText="Casos de éxito desarrollados para grandes corporaciones e instituciones financieras en la República Dominicana."
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-3xl bg-[#DADFE6] border border-[#CBD1DC] shadow-md shadow-slate-900/5 hover:border-[#1B7A38]/40 hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#1B7A38]/10 text-[#1B7A38] border border-[#1B7A38]/20 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-[#1B7A38] font-display">App Somos Corripio</h3>
                  <span className="text-xs font-mono text-[#1B7A38] font-bold">Distribuidora Corripio</span>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#1B7A38]/10 text-[#1B7A38] border border-[#1B7A38]/25 font-bold font-mono">
                PRODUCCIÓN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
              Aplicación móvil nativa para autogestión de empleados e inversionistas del grupo, catálogo interactivo, notificaciones push transaccionales y consulta de beneficios 24/7.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#DADFE6] border border-[#CBD1DC] shadow-md shadow-slate-900/5 hover:border-[#1B7A38]/40 hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#1B7A38]/10 text-[#1B7A38] border border-[#1B7A38]/20 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-[#1B7A38] font-display">App de Asegurados</h3>
                  <span className="text-xs font-mono text-[#1B7A38] font-bold">Humano Seguros</span>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#1B7A38]/10 text-[#1B7A38] border border-[#1B7A38]/25 font-bold font-mono">
                PRODUCCIÓN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
              App móvil de alto volumen transaccional con carnet digital cifrado, consulta de pólizas en tiempo real, seguimiento de reclamaciones e integración con core bancario/asegurador.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#DADFE6] border border-[#CBD1DC] shadow-md shadow-slate-900/5 hover:border-[#1B7A38]/40 hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#1B7A38]/10 text-[#1B7A38] border border-[#1B7A38]/20 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-[#1B7A38] font-display">App de Intermediarios</h3>
                  <span className="text-xs font-mono text-[#1B7A38] font-bold">Humano Seguros</span>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#1B7A38]/10 text-[#1B7A38] border border-[#1B7A38]/25 font-bold font-mono">
                PRODUCCIÓN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
              Plataforma móvil y portal web para corredores e intermediarios comerciales, cotizaciones rápidas en línea, gestión de comisiones y flujo de aprobación de solicitudes.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#DADFE6] border border-[#CBD1DC] shadow-md shadow-slate-900/5 hover:border-[#1B7A38]/40 hover:shadow-xl transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#1B7A38]/10 text-[#1B7A38] border border-[#1B7A38]/20 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-[#1B7A38] font-display">Oficina Virtual OFV</h3>
                  <span className="text-xs font-mono text-[#1B7A38] font-bold">Humano Seguros</span>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#1B7A38]/10 text-[#1B7A38] border border-[#1B7A38]/25 font-bold font-mono">
                PRODUCCIÓN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed font-medium">
              Modernización del portal web de autogestión corporativa con descarga masiva de estados de cuenta en PDF cifrados, validación fehaciente OTP y firma electrónica.
            </p>
          </div>
        </div>

        <div className="w-full space-y-6 pt-4">
          <div className="text-center space-y-2 px-4">
            <span className="text-xs sm:text-sm font-mono font-bold text-[#1B7A38] uppercase tracking-widest bg-[#1B7A38]/10 px-5 py-2 rounded-full border border-[#1B7A38]/25 inline-flex items-center gap-2 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#1B7A38]" />
              PORTAFOLIO DE EMPRESAS LÍDERES QUE CONFÍAN EN ENFOCO, S.R.L.
            </span>
            <p className="text-sm sm:text-base text-[#475569] font-medium">
              Soluciones empresariales de software a la medida en producción continua 24/7
            </p>
          </div>

          <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden py-6">
            <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#EAECEF] via-[#EAECEF]/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#EAECEF] via-[#EAECEF]/90 to-transparent z-20 pointer-events-none" />

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
                  className="w-72 sm:w-80 md:w-[350px] p-6 sm:p-8 rounded-3xl bg-[#DADFE6] shadow-md shadow-slate-900/5 border border-[#CBD1DC] flex flex-col items-center justify-center text-center space-y-4 hover:border-[#1B7A38]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group shrink-0 cursor-pointer relative overflow-hidden"
                >
                  <div className="w-48 h-28 sm:w-56 sm:h-32 flex items-center justify-center overflow-hidden bg-[#EAECEF] border border-[#CBD1DC] rounded-2xl p-4">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg sm:text-xl text-[#1B7A38] tracking-tight group-hover:text-[#135728] transition-colors font-display">
                      {client.name}
                    </h4>
                    <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#1B7A38]/10 text-[#1B7A38] border border-[#1B7A38]/25 uppercase inline-block mt-1.5">
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

