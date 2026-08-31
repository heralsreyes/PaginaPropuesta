"use client";

import React, { useState } from "react";
import { CanvasElement } from "@/types/studio";
import {
  Cpu,
  Users,
  Building2,
  MessageSquare,
  BarChart2,
  DollarSign,
  CreditCard,
  Layers,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Award,
  Send,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ModuleCanvasElementProps {
  element: CanvasElement;
}

export const ModuleCanvasElement: React.FC<ModuleCanvasElementProps> = ({ element }) => {
  const templateType = element.templateType || "scope_master";

  // 1. Scope Master (Inspector Maestro-Detalle)
  if (templateType === "scope_master") {
    const [selectedModule, setSelectedModule] = useState(0);
    const modules = [
      {
        name: "Módulo Inversiones",
        epic: "Épica 2",
        items: ["Portafolio Consolidado 360°", "Trade Ticket con OTP", "Detalle de Mutuos & Fondos"],
      },
      {
        name: "Módulo KYC & Registro",
        epic: "Épica 1",
        items: ["Login Biométrico FaceID", "Perfil Inversionista SIMV", "Validación Cédula"],
      },
      {
        name: "Módulo Alertas WhatsApp",
        epic: "Épica 5",
        items: ["Notificaciones de Rendimientos", "Comprobante de Operación", "Atención Oficial 24/7"],
      },
    ];

    return (
      <div className="w-full h-full bg-[#002224] rounded-3xl p-4 sm:p-5 border border-[#F08D17]/40 shadow-2xl text-white flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#F08D17]" />
            <span className="font-extrabold text-xs sm:text-sm">{element.title || "Inspector de Alcance & Épicas"}</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#7C9B8C]/25 text-emerald-300 border border-emerald-500/30">
            SIMV CERTIFIED
          </span>
        </div>

        <div className="grid grid-cols-12 gap-3 my-3 flex-1 min-h-0">
          {/* Left Menu */}
          <div className="col-span-5 space-y-1.5 overflow-y-auto pr-1">
            {modules.map((m, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedModule(idx);
                }}
                className={`w-full p-2 rounded-xl text-left transition-all text-[11px] cursor-pointer ${
                  selectedModule === idx
                    ? "bg-[#004F54] text-white font-bold border border-[#F08D17]/60 shadow-md"
                    : "bg-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                <span className="text-[9px] font-mono text-[#F08D17] block">{m.epic}</span>
                <span className="truncate block">{m.name}</span>
              </button>
            ))}
          </div>

          {/* Right Details Panel */}
          <div className="col-span-7 p-3 rounded-2xl bg-black/30 border border-white/10 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                Entregables Clave
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-200">
                {modules[selectedModule].items.map((item, i) => (
                  <li key={i} className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-emerald-400 flex items-center justify-between">
              <span>● Estado: Especificado</span>
              <span>100% Cobertura</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Team Master (Visor de Equipo)
  if (templateType === "team_master") {
    const team = [
      { name: "Heraldo Reyes", role: "Tech Lead & Arquitecto", exp: "+10 Años", tag: "Frontend & Cloud" },
      { name: "Equipo Backend", role: "Senior .NET & Dynamics", exp: "+8 Años", tag: "Integración SIFI" },
      { name: "QA & Compliance", role: "Especialista SIMV", exp: "+6 Años", tag: "Seguridad ISO" },
    ];

    return (
      <div className="w-full h-full bg-[#002224] rounded-3xl p-5 border border-emerald-500/30 shadow-2xl text-white flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#F08D17]" />
            <span className="font-extrabold text-sm">{element.title || "Equipo Especialista Asignado"}</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
            DEDICACIÓN 100%
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 my-3">
          {team.map((t, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#004F54] text-[#F08D17] font-bold mx-auto flex items-center justify-center text-xs border border-[#F08D17]/40">
                {t.name.charAt(0)}
              </div>
              <h5 className="font-bold text-xs truncate">{t.name}</h5>
              <span className="text-[10px] text-zinc-400 block truncate">{t.role}</span>
              <span className="text-[9px] font-mono text-emerald-400 block">{t.tag}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-2 border-t border-white/10 font-mono">
          <span>Garantía Post-Entrega: 60 Días</span>
          <span className="text-[#F08D17] font-bold">SLA 99.9%</span>
        </div>
      </div>
    );
  }

  // 3. Company Master (Sobre ENFOCO)
  if (templateType === "company_master") {
    return (
      <div className="w-full h-full bg-[#002224] rounded-3xl p-5 border border-[#F08D17]/40 shadow-2xl text-white flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#F08D17]" />
            <div>
              <span className="font-extrabold text-sm block">ENFOCO S.R.L.</span>
              <span className="text-[10px] text-zinc-400 font-mono">Consultoría Tecnológica & FinTech</span>
            </div>
          </div>
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>

        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] text-zinc-400 font-mono uppercase">Estándar de Seguridad</span>
            <h6 className="font-bold text-xs text-white">ISO 27001 / 27002</h6>
            <p className="text-[10px] text-zinc-300">Cifrado AES-256 en reposo y en tránsito.</p>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-[10px] text-zinc-400 font-mono uppercase">Experiencia en Mercado</span>
            <h6 className="font-bold text-xs text-[#F08D17]">+10 Años en FinTech</h6>
            <p className="text-[10px] text-zinc-300">Dominio regulatorio SIMV y banca.</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/10">
          <span>República Dominicana</span>
          <span className="text-emerald-400 font-bold">● Certificación Oficial</span>
        </div>
      </div>
    );
  }

  // 4. WhatsApp Simulator
  if (templateType === "whatsapp_sim") {
    return (
      <div className="w-full h-full bg-[#075E54] rounded-3xl p-4 shadow-2xl text-white flex flex-col justify-between border border-emerald-400/30 overflow-hidden">
        {/* WhatsApp Header */}
        <div className="flex items-center space-x-3 border-b border-white/15 pb-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs border border-white/30">
            E
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="font-bold text-xs truncate">Excel Puesto de Bolsa</h5>
            <span className="text-[10px] text-emerald-200 block truncate">● Cuenta Oficial Verificada</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="my-3 space-y-2 text-xs flex-1 overflow-y-auto">
          <div className="bg-[#128C7E]/40 p-2.5 rounded-2xl rounded-tl-xs max-w-[85%] text-zinc-100 shadow-xs">
            <p className="leading-snug">Hola Juan, tu inversión en Mutuos Excel generó <strong>+RD$ 45,800</strong> este mes.</p>
            <span className="text-[9px] text-zinc-300 float-right mt-1">10:42 AM</span>
          </div>
          <div className="bg-[#25D366]/20 p-2.5 rounded-2xl rounded-tr-xs max-w-[85%] ml-auto text-white shadow-xs border border-[#25D366]/30">
            <p className="leading-snug">Excelente, ¿puedo reinvertir los intereses?</p>
            <span className="text-[9px] text-emerald-200 float-right mt-1">10:43 AM ✓✓</span>
          </div>
        </div>

        {/* Chat Input */}
        <div className="flex items-center space-x-2 bg-black/20 p-1.5 rounded-2xl border border-white/10">
          <input
            type="text"
            readOnly
            placeholder="Escribe un mensaje..."
            className="w-full bg-transparent text-xs text-white placeholder-zinc-400 outline-none px-2"
          />
          <button className="w-7 h-7 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // 5. KPI Card
  if (templateType === "kpi_card") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#004F54] to-[#002224] rounded-3xl p-5 border border-[#F08D17]/40 shadow-2xl text-white flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-zinc-300 font-bold">
            {element.title || "Volumen Transaccionado SIMV"}
          </span>
          <div className="flex items-center space-x-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <TrendingUp className="w-3 h-3" />
            <span>+24.8%</span>
          </div>
        </div>

        <div className="my-2">
          <span className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">$18.4M</span>
          <span className="text-xs font-mono text-zinc-400 pl-2">DOP / Mes</span>
        </div>

        {/* Visual Sparkline Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>Objetivo Q4: 100%</span>
            <span className="text-[#F08D17] font-bold">84% Alcanzado</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#F08D17] to-emerald-400 rounded-full w-[84%]" />
          </div>
        </div>
      </div>
    );
  }

  // 6. Investment Calc
  if (templateType === "investment_calc") {
    return (
      <div className="w-full h-full bg-[#002224] rounded-3xl p-5 border border-[#F08D17]/40 shadow-2xl text-white flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-[#F08D17]" />
            <span className="font-extrabold text-sm">{element.title || "Calculadora de Rendimiento Mutuos"}</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">11.85% Anual</span>
        </div>

        <div className="my-3 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-400">Capital a Invertir:</span>
            <span className="font-extrabold text-white">$1,500,000 DOP</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10">
            <div className="h-full bg-[#F08D17] rounded-full w-[65%]" />
          </div>
          <div className="flex justify-between text-xs font-mono pt-1">
            <span className="text-zinc-400">Ganancia Anual Estimada:</span>
            <span className="font-bold text-emerald-400">+$177,750 DOP</span>
          </div>
        </div>

        <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F08D17] to-[#D97706] text-white font-bold text-xs shadow-md">
          Simular Operación Completa ➔
        </button>
      </div>
    );
  }

  // 7. Pricing Block
  if (templateType === "pricing_block") {
    return (
      <div className="w-full h-full bg-[#002224] rounded-3xl p-5 border border-[#F08D17]/40 shadow-2xl text-white flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h4 className="font-extrabold text-sm text-white">{element.title || "Inversión Única de Implementación"}</h4>
            <span className="text-[10px] text-zinc-400 font-mono">Desarrollo Web & App Móvil iOS/Android</span>
          </div>
          <span className="text-2xl font-black font-mono text-[#F08D17]">USD $5,000</span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2 text-center text-[10px] font-mono">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[#F08D17] font-bold block">30%</span>
            <span className="text-zinc-400">Anticipo</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[#F08D17] font-bold block">40%</span>
            <span className="text-zinc-400">Piloto</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[#F08D17] font-bold block">30%</span>
            <span className="text-zinc-400">Cierre</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/10">
          <span>Garantía: 60 días</span>
          <span className="text-emerald-400 font-bold">100% Satisfacción</span>
        </div>
      </div>
    );
  }

  // 8. Feature Grid (7 Épicas)
  if (templateType === "feature_grid") {
    const epics = [
      "1. Registro KYC",
      "2. Portafolio 360",
      "3. Trade Tickets",
      "4. Extractos SIFI",
      "5. Bot WhatsApp",
      "6. Resúmenes IA",
    ];

    return (
      <div className="w-full h-full bg-[#002224] rounded-3xl p-5 border border-white/15 shadow-2xl text-white flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-[#F08D17]" />
            <span className="font-extrabold text-sm">{element.title || "Grid de Épicas de Desarrollo"}</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400">FASE 1 & 2</span>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2">
          {epics.map((epic, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F08D17] shrink-0" />
              <span className="text-[11px] font-bold truncate">{epic}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/10">
          <span>Entregables Continuos</span>
          <span className="text-[#F08D17] font-bold">8-12 Semanas</span>
        </div>
      </div>
    );
  }

  // Default Fallback
  return (
    <div className="w-full h-full bg-[#002224] rounded-3xl p-5 border border-white/15 shadow-2xl text-white flex flex-col justify-between">
      <h4 className="font-extrabold text-sm">{element.title || "Módulo Preconfigurado"}</h4>
      <p className="text-xs text-zinc-400">{element.subtitle || "Módulo dinámico de la propuesta"}</p>
    </div>
  );
};
