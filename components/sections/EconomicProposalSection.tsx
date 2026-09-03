"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { EditableField } from "@/components/ui/EditableField";
import { EditableBlockWrapper } from "@/components/studio/EditableBlockWrapper";
import { useProposal } from "@/context/ProposalContext";

interface EconomicProposalSectionProps {
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

export const EconomicProposalSection: React.FC<EconomicProposalSectionProps> = ({ secId }) => {
  const { proposal } = useProposal();
  const budget = proposal?.budget;

  const baseSubtotal = budget?.amountWithoutTax || 5000;
  const currency = budget?.currency || "USD";
  const hasTax = budget?.hasTax ?? true;
  const taxPercent = budget?.taxPercent || 18;
  const hasDiscount = budget?.hasDiscount ?? false;
  const discountValue = budget?.discountValue || 0;

  const discountAmount = hasDiscount ? discountValue : 0;
  const taxableAmount = Math.max(0, baseSubtotal - discountAmount);
  const taxAmount = hasTax ? (taxableAmount * taxPercent) / 100 : 0;
  const grandTotal = taxableAmount + taxAmount;

  const currSymbol = currency === "USD" ? "USD" : "RD$";

  const paymentTerms = budget?.paymentTerms && budget.paymentTerms.length > 0 ? budget.paymentTerms : [
    { percentage: 50, description: "Aprobación de la propuesta y firma de contrato.", amount: (grandTotal * 50) / 100 },
    { percentage: 40, description: "Entrega de desarrollo core y pruebas UAT.", amount: (grandTotal * 40) / 100 },
    { percentage: 10, description: "Pase a producción y aceptación final.", amount: (grandTotal * 10) / 100 },
  ];

  return (
    <section
      id={secId}
      className="min-h-screen w-full snap-start scroll-mt-16 flex flex-col justify-center items-center relative overflow-hidden theme-section-bg bg-gradient-to-br from-[#004F54] via-[#003B3F] to-[#002B2E] text-white px-4 sm:px-8 lg:px-12 py-20 border-b border-[#004F54]/50"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        variants={sectionContainerVariants}
        className="max-w-6xl mx-auto w-full space-y-10"
      >
        <div className="text-center space-y-3">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F08D17] theme-h2-color uppercase font-mono px-4 py-1.5 rounded-full bg-white/10 border border-white/20 inline-block shadow-md">
            <EditableField id="sec9_badge" defaultText="09. ESQUEMA DE INVERSIÓN" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white theme-h1-color">
            <EditableField id="sec9_h2" defaultText="Propuesta Económica & Desglose de Costos" />
          </h2>
          <p className="text-base sm:text-lg text-slate-200/90 theme-text-color max-w-3xl mx-auto font-medium">
            <EditableField id="sec9_desc" defaultText="Esquema transparente configurado en USD según las especificaciones del requerimiento." />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bloque 1: Inversión Única */}
          <EditableBlockWrapper id="sec9_card_single" label="Inversión Única" className="h-full">
            <div className="p-8 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 text-white h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <h3 className="font-extrabold text-xl sm:text-2xl text-white">
                      <EditableField id="sec9_c1_title" defaultText="Inversión Única de Implementación" />
                    </h3>
                    <span className="text-sm text-[#F08D17] font-mono font-bold">
                      <EditableField id="sec9_c1_sub" defaultText="Desarrollo Web, App & Integración Dynamics/SIFI" />
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">{currSymbol} {baseSubtotal.toLocaleString()}</span>
                    <span className="text-xs text-slate-300 font-mono block font-bold">
                      {hasTax ? `+ ${taxPercent}% ITBIS (${currSymbol} ${Math.round(taxAmount).toLocaleString()})` : "Exento de ITBIS"}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-amber-400 font-mono block font-bold">
                        Descuento: -{currSymbol} {discountAmount.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 text-sm sm:text-base text-slate-200 font-medium pt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                    <EditableField id="sec9_c1_b1" defaultText="Desarrollo completo del portal web Next.js y app móvil multiplataforma." />
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                    <EditableField id="sec9_c1_b2" defaultText="Integración de conectores bidireccionales con Microsoft Dynamics CRM & SIFI." />
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F08D17] shrink-0 mt-0.5" />
                    <EditableField id="sec9_c1_b3" defaultText="Desarrollo de las 7 Épicas funcionales, Trade Ticket digital y expedientes IA." />
                  </li>
                </ul>
              </div>
            </div>
          </EditableBlockWrapper>

          {/* Bloque 2: Recurrente Mensual */}
          <EditableBlockWrapper id="sec9_card_recurring" label="Recurrente Mensual" className="h-full">
            <div className="p-8 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 text-white h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <h3 className="font-extrabold text-xl sm:text-2xl text-white">
                      <EditableField id="sec9_c2_title" defaultText="Recurrente Mensual" />
                    </h3>
                    <span className="text-sm text-emerald-300 font-mono font-bold">
                      <EditableField id="sec9_c2_sub" defaultText="Operación, Mantenimiento & Soporte SLA" />
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-black text-[#F08D17] font-mono">
                      <EditableField id="sec9_c2_price" defaultText={`${currSymbol} 1,195 / mo`} />
                    </span>
                    <span className="text-xs text-slate-300 font-mono block font-bold">
                      <EditableField id="sec9_c2_lic" defaultText="Licencias + Soporte SIMV" />
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm sm:text-base text-slate-200 font-medium pt-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <EditableField id="sec9_c2_b1" defaultText="Licenciamiento del motor de autogestión, notificaciones y resúmenes IA." />
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <EditableField id="sec9_c2_b2" defaultText="Mantenimiento correctivo/evolutivo, parches de seguridad e infraestructura cloud." />
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <EditableField id="sec9_c2_b3" defaultText="Soporte técnico con SLA prioritario y monitoreo continuo 24/7." />
                  </li>
                </ul>
              </div>
            </div>
          </EditableBlockWrapper>
        </div>

        {/* Payment Terms */}
        <div className="p-8 rounded-3xl bg-[#003B3F]/90 backdrop-blur-xl border border-white/15 shadow-2xl text-white space-y-4">
          <h4 className="font-extrabold text-base text-[#F08D17] uppercase font-mono mb-4">
            CONDICIONES & HITOS DE PAGO (INVERSIÓN ÚNICA)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm sm:text-base">
            {paymentTerms.map((term, idx) => {
              const termAmount = Math.round(term.amount || (grandTotal * (term.percentage || 33.33)) / 100);
              return (
                <div key={idx} className="p-5 rounded-2xl bg-[#002D30] border border-white/10 space-y-1 shadow-sm">
                  <span className="font-extrabold text-[#F08D17] font-mono block text-lg">
                    {term.percentage}% ({currSymbol} {termAmount.toLocaleString()})
                  </span>
                  <span className="text-slate-200 font-medium">{term.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
