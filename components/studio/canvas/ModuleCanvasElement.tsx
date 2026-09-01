"use client";

import React, { useState } from "react";
import { CanvasElement } from "@/types/studio";
import { useStudioStore } from "@/store/useStudioStore";
import { EditableText } from "@/components/studio/EditableText";
import { replaceAt } from "@/lib/arrayUtils";
import {
  Cpu,
  Users,
  Building2,
  DollarSign,
  Layers,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Send,
  Plus,
  Trash2,
} from "lucide-react";

interface TemplateProps {
  element: CanvasElement;
  customBg: string;
  customBorder: string;
  customText: string;
}

// ---------------------------------------------------------
// 1. Scope Master Template
// ---------------------------------------------------------
export interface ScopeModuleItem {
  name: string;
  epic: string;
  items: string[];
}

const DEFAULT_SCOPE_MODULES: ScopeModuleItem[] = [
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

const ScopeMasterTemplate: React.FC<TemplateProps> = ({ element, customBg, customBorder, customText }) => {
  const { updateCanvasElement, isDesignMode } = useStudioStore();
  const [selectedModule, setSelectedModule] = useState(0);

  const modules = (element.customData?.modules as ScopeModuleItem[]) ?? DEFAULT_SCOPE_MODULES;
  const activeMod = modules[selectedModule] || modules[0] || { name: "", epic: "", items: [] };

  const handleAddEpic = () => {
    const nextNum = modules.length + 1;
    const newEpic: ScopeModuleItem = {
      name: `Nuevo Módulo ${nextNum}`,
      epic: `Épica ${nextNum}`,
      items: ["Nuevo Entregable Técnico", "Criterio de Aceptación SIMV"],
    };
    const updatedModules = [...modules, newEpic];
    updateCanvasElement(element.id, { customData: { ...element.customData, modules: updatedModules } });
    setSelectedModule(modules.length);
  };

  const handleDeleteEpic = (idxToDelete: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (modules.length <= 1) return;
    const updatedModules = modules.filter((_, i) => i !== idxToDelete);
    updateCanvasElement(element.id, { customData: { ...element.customData, modules: updatedModules } });
    setSelectedModule(Math.max(0, idxToDelete - 1));
  };

  const handleAddDeliverable = () => {
    const currentMod = modules[selectedModule];
    if (!currentMod) return;
    const updatedModules = replaceAt(modules, selectedModule, {
      ...currentMod,
      items: [...currentMod.items, "Nuevo Entregable Técnico"],
    });
    updateCanvasElement(element.id, { customData: { ...element.customData, modules: updatedModules } });
  };

  const handleRemoveDeliverable = (itemIdx: number) => {
    const currentMod = modules[selectedModule];
    if (!currentMod) return;
    const updatedModules = replaceAt(modules, selectedModule, {
      ...currentMod,
      items: currentMod.items.filter((_, i) => i !== itemIdx),
    });
    updateCanvasElement(element.id, { customData: { ...element.customData, modules: updatedModules } });
  };

  const handleUpdateDeliverable = (itemIdx: number, newVal: string) => {
    const currentMod = modules[selectedModule];
    if (!currentMod) return;
    const updatedItems = replaceAt(currentMod.items, itemIdx, newVal);
    const updatedModules = replaceAt(modules, selectedModule, {
      ...currentMod,
      items: updatedItems,
    });
    updateCanvasElement(element.id, { customData: { ...element.customData, modules: updatedModules } });
  };

  return (
    <div
      style={{
        backgroundColor: customBg,
        borderColor: customBorder,
        color: customText,
      }}
      className="w-full h-full rounded-3xl p-4 sm:p-5 border shadow-2xl flex flex-col justify-between overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-3">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 shrink-0" style={{ color: customBorder }} />
          <EditableText
            value={element.title || "Inspector de Alcance & Épicas"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-xs sm:text-sm text-white"
          />
        </div>
        <span
          style={{ borderColor: customBorder, color: customBorder }}
          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 border"
        >
          SIMV CERTIFIED
        </span>
      </div>

      <div className="grid grid-cols-12 gap-3 my-3 flex-1 min-h-0">
        {/* Left Menu */}
        <div className="col-span-5 space-y-1.5 overflow-y-auto pr-1">
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
              Épicas ({modules.length})
            </span>
            {isDesignMode && (
              <button
                onClick={handleAddEpic}
                className="text-[9px] font-mono font-bold text-[#F08D17] hover:underline flex items-center gap-0.5 cursor-pointer bg-white/10 px-1.5 py-0.5 rounded-md"
                title="Añadir nueva épica"
              >
                <Plus className="w-3 h-3" /> Añadir
              </button>
            )}
          </div>

          {modules.map((m, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedModule(idx)}
              className={`w-full p-2 rounded-xl text-left transition-all text-[11px] cursor-pointer relative group ${
                selectedModule === idx
                  ? "bg-[#004F54] text-white font-bold border border-[#F08D17]/80 shadow-md"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <EditableText
                  value={m.epic}
                  onChange={(val) => {
                    const updatedModules = replaceAt(modules, idx, {
                      ...m,
                      epic: val,
                    });
                    updateCanvasElement(element.id, { customData: { ...element.customData, modules: updatedModules } });
                  }}
                  className="text-[9px] font-mono text-[#F08D17] block font-bold"
                />
                {isDesignMode && modules.length > 1 && (
                  <button
                    onClick={(e) => handleDeleteEpic(idx, e)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity p-0.5 cursor-pointer"
                    title="Eliminar épica"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <EditableText
                value={m.name}
                onChange={(val) => {
                  const updatedModules = replaceAt(modules, idx, {
                    ...m,
                    name: val,
                  });
                  updateCanvasElement(element.id, { customData: { ...element.customData, modules: updatedModules } });
                }}
                className="truncate block font-semibold text-xs"
              />
            </div>
          ))}
        </div>

        {/* Right Details Panel */}
        <div className="col-span-7 p-3 rounded-2xl bg-black/30 border border-white/10 flex flex-col justify-between">
          <div className="space-y-2 overflow-y-auto max-h-[140px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div>
                <span className="text-[10px] font-mono text-[#F08D17] block font-bold">{activeMod.epic}</span>
                <h6 className="font-extrabold text-xs text-white">{activeMod.name}</h6>
              </div>
              {isDesignMode && (
                <button
                  onClick={handleAddDeliverable}
                  className="text-[9px] font-mono text-[#F08D17] hover:underline flex items-center gap-0.5 cursor-pointer bg-white/10 px-1.5 py-0.5 rounded-md"
                >
                  <Plus className="w-3 h-3" /> Entregable
                </button>
              )}
            </div>

            <ul className="space-y-1.5 text-xs text-zinc-200">
              {activeMod.items.map((item, i) => (
                <li key={i} className="flex items-center justify-between space-x-1.5 group p-1 rounded-lg hover:bg-white/5">
                  <div className="flex items-center space-x-1.5 min-w-0 flex-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <EditableText
                      value={item}
                      onChange={(newVal) => handleUpdateDeliverable(i, newVal)}
                      className="flex-1 truncate"
                    />
                  </div>
                  {isDesignMode && activeMod.items.length > 1 && (
                    <button
                      onClick={() => handleRemoveDeliverable(i)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-0.5 cursor-pointer"
                      title="Eliminar entregable"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-emerald-400 flex items-center justify-between">
            <span>● Estado: En Desarrollo</span>
            <span>100% Cobertura</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 2. Team Master Template
// ---------------------------------------------------------
export interface TeamMemberItem {
  name: string;
  role: string;
  tag: string;
}

const DEFAULT_TEAM_MEMBERS: TeamMemberItem[] = [
  { name: "Heraldo Reyes", role: "Tech Lead & Arquitecto", tag: "Frontend & Cloud" },
  { name: "Equipo Backend", role: "Senior .NET & Dynamics", tag: "Integración SIFI" },
  { name: "QA & Compliance", role: "Especialista SIMV", tag: "Seguridad ISO" },
];

const TeamMasterTemplate: React.FC<TemplateProps> = ({ element, customBg, customBorder, customText }) => {
  const { updateCanvasElement, isDesignMode } = useStudioStore();
  const team = (element.customData?.team as TeamMemberItem[]) ?? DEFAULT_TEAM_MEMBERS;

  const handleAddMember = () => {
    const updatedTeam = [...team, { name: "Nuevo Especialista", role: "Ingeniero de Software", tag: "Fullstack" }];
    updateCanvasElement(element.id, { customData: { ...element.customData, team: updatedTeam } });
  };

  const handleRemoveMember = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (team.length <= 1) return;
    const updatedTeam = team.filter((_, i) => i !== idx);
    updateCanvasElement(element.id, { customData: { ...element.customData, team: updatedTeam } });
  };

  return (
    <div
      style={{
        backgroundColor: customBg,
        borderColor: customBorder,
        color: customText,
      }}
      className="w-full h-full rounded-3xl p-5 border shadow-2xl flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-3">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 shrink-0" style={{ color: customBorder }} />
          <EditableText
            value={element.title || "Equipo Especialista Asignado"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-sm text-white"
          />
        </div>
        {isDesignMode && (
          <button
            onClick={handleAddMember}
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F08D17] border border-[#F08D17]/40 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Miembro
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2.5 my-3 overflow-y-auto max-h-[160px]">
        {team.map((t, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1 relative group">
            {isDesignMode && team.length > 1 && (
              <button
                onClick={(e) => handleRemoveMember(idx, e)}
                className="opacity-0 group-hover:opacity-100 absolute top-1.5 right-1.5 text-red-400 hover:text-red-300 p-0.5 cursor-pointer"
                title="Eliminar miembro"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
            <div
              style={{ borderColor: customBorder, color: customBorder }}
              className="w-8 h-8 rounded-full bg-black/40 font-bold mx-auto flex items-center justify-center text-xs border"
            >
              {t.name.charAt(0)}
            </div>
            <EditableText
              value={t.name}
              onChange={(val) => {
                const updatedTeam = replaceAt(team, idx, { ...t, name: val });
                updateCanvasElement(element.id, { customData: { ...element.customData, team: updatedTeam } });
              }}
              className="font-bold text-xs truncate block text-white"
            />
            <EditableText
              value={t.role}
              onChange={(val) => {
                const updatedTeam = replaceAt(team, idx, { ...t, role: val });
                updateCanvasElement(element.id, { customData: { ...element.customData, team: updatedTeam } });
              }}
              className="text-[10px] text-zinc-400 block truncate"
            />
            <EditableText
              value={t.tag}
              onChange={(val) => {
                const updatedTeam = replaceAt(team, idx, { ...t, tag: val });
                updateCanvasElement(element.id, { customData: { ...element.customData, team: updatedTeam } });
              }}
              className="text-[9px] font-mono text-emerald-400 block truncate"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-2 border-t border-white/10 font-mono">
        <span>Garantía: 60 Días</span>
        <span style={{ color: customBorder }} className="font-bold">SLA 99.9%</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 3. Company Master Template
// ---------------------------------------------------------
export interface CompanyMetricItem {
  title: string;
  sub: string;
  desc: string;
}

const DEFAULT_COMPANY_METRICS: CompanyMetricItem[] = [
  { title: "ISO 27001 / 27002", sub: "Estándar de Seguridad", desc: "Cifrado AES-256 en reposo y en tránsito." },
  { title: "+10 Años en FinTech", sub: "Experiencia en Mercado", desc: "Dominio regulatorio SIMV y banca." },
];

const CompanyMasterTemplate: React.FC<TemplateProps> = ({ element, customBg, customBorder, customText }) => {
  const { updateCanvasElement, isDesignMode } = useStudioStore();
  const metrics = (element.customData?.metrics as CompanyMetricItem[]) ?? DEFAULT_COMPANY_METRICS;

  const handleAddMetric = () => {
    const updatedMetrics = [...metrics, { title: "Certificación Oficial", sub: "Nueva Garantía", desc: "Cumplimiento normativo 100%." }];
    updateCanvasElement(element.id, { customData: { ...element.customData, metrics: updatedMetrics } });
  };

  const handleRemoveMetric = (idx: number) => {
    if (metrics.length <= 1) return;
    const updatedMetrics = metrics.filter((_, i) => i !== idx);
    updateCanvasElement(element.id, { customData: { ...element.customData, metrics: updatedMetrics } });
  };

  return (
    <div
      style={{
        backgroundColor: customBg,
        borderColor: customBorder,
        color: customText,
      }}
      className="w-full h-full rounded-3xl p-5 border shadow-2xl flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-3">
        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 shrink-0" style={{ color: customBorder }} />
          <div>
            <EditableText
              value={element.title || "ENFOCO S.R.L."}
              onChange={(val) => updateCanvasElement(element.id, { title: val })}
              className="font-extrabold text-sm block text-white"
            />
            <EditableText
              value={element.subtitle || "Consultoría Tecnológica & FinTech"}
              onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
              className="text-[10px] text-zinc-400 font-mono block"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isDesignMode && (
            <button
              onClick={handleAddMetric}
              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-[#F08D17] border border-[#F08D17]/40 flex items-center gap-0.5 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Ficha
            </button>
          )}
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 my-3 overflow-y-auto max-h-[140px]">
        {metrics.map((m, i) => (
          <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1 relative group">
            {isDesignMode && metrics.length > 1 && (
              <button
                onClick={() => handleRemoveMetric(i)}
                className="opacity-0 group-hover:opacity-100 absolute top-1.5 right-1.5 text-red-400 hover:text-red-300 p-0.5 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
            <EditableText
              value={m.sub}
              onChange={(val) => {
                const updatedMetrics = replaceAt(metrics, i, { ...m, sub: val });
                updateCanvasElement(element.id, { customData: { ...element.customData, metrics: updatedMetrics } });
              }}
              className="text-[10px] text-zinc-400 font-mono uppercase block"
            />
            <EditableText
              value={m.title}
              onChange={(val) => {
                const updatedMetrics = replaceAt(metrics, i, { ...m, title: val });
                updateCanvasElement(element.id, { customData: { ...element.customData, metrics: updatedMetrics } });
              }}
              className="font-bold text-xs text-white block"
            />
            <EditableText
              value={m.desc}
              onChange={(val) => {
                const updatedMetrics = replaceAt(metrics, i, { ...m, desc: val });
                updateCanvasElement(element.id, { customData: { ...element.customData, metrics: updatedMetrics } });
              }}
              className="text-[10px] text-zinc-300 block"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/10">
        <span>República Dominicana</span>
        <span className="text-emerald-400 font-bold">● Certificación Oficial</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 4. WhatsApp Simulator Template
// ---------------------------------------------------------
export interface WhatsAppMessageItem {
  text: string;
  isBot: boolean;
  time: string;
}

const DEFAULT_WHATSAPP_MESSAGES: WhatsAppMessageItem[] = [
  { text: "Hola Juan, tu inversión en Mutuos Excel generó +RD$ 45,800 este mes.", isBot: true, time: "10:42 AM" },
  { text: "Excelente, ¿puedo reinvertir los intereses?", isBot: false, time: "10:43 AM" },
];

const WhatsAppSimTemplate: React.FC<TemplateProps> = ({ element, customBorder }) => {
  const { updateCanvasElement, isDesignMode } = useStudioStore();
  const messages = (element.customData?.messages as WhatsAppMessageItem[]) ?? DEFAULT_WHATSAPP_MESSAGES;
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const updatedMessages = [
      ...messages,
      { text: inputText, isBot: false, time: "10:45 AM" },
      { text: "¡Recibido! Tu orden ha sido registrada con OTP en el CRM.", isBot: true, time: "10:45 AM" },
    ];
    updateCanvasElement(element.id, { customData: { ...element.customData, messages: updatedMessages } });
    setInputText("");
  };

  const handleRemoveMessage = (idx: number) => {
    if (messages.length <= 1) return;
    const updatedMessages = messages.filter((_, i) => i !== idx);
    updateCanvasElement(element.id, { customData: { ...element.customData, messages: updatedMessages } });
  };

  return (
    <div
      style={{
        borderColor: customBorder,
      }}
      className="w-full h-full bg-[#075E54] rounded-3xl p-4 shadow-2xl text-white flex flex-col justify-between border overflow-hidden"
    >
      {/* WhatsApp Header */}
      <div className="flex items-center space-x-3 border-b border-white/15 pb-2.5">
        <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs border border-white/30">
          E
        </div>
        <div className="flex-1 min-w-0">
          <EditableText
            value={element.title || "Excel Puesto de Bolsa"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-bold text-xs truncate block"
          />
          <span className="text-[10px] text-emerald-200 block truncate">● Cuenta Oficial Verificada</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="my-3 space-y-2 text-xs flex-1 overflow-y-auto max-h-[180px]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2.5 rounded-2xl max-w-[85%] text-zinc-100 shadow-xs relative group ${
              msg.isBot ? "bg-[#128C7E]/50 rounded-tl-xs" : "bg-[#25D366]/30 rounded-tr-xs ml-auto border border-[#25D366]/40"
            }`}
          >
            {isDesignMode && messages.length > 1 && (
              <button
                onClick={() => handleRemoveMessage(i)}
                className="opacity-0 group-hover:opacity-100 absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5 cursor-pointer shadow"
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            )}
            <EditableText
              value={msg.text}
              onChange={(newVal) => {
                const updatedMessages = replaceAt(messages, i, { ...msg, text: newVal });
                updateCanvasElement(element.id, { customData: { ...element.customData, messages: updatedMessages } });
              }}
              className="leading-snug block"
            />
            <span className="text-[9px] text-zinc-300 float-right mt-0.5">{msg.time} {msg.isBot ? "" : "✓✓"}</span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="flex items-center space-x-2 bg-black/30 p-1.5 rounded-2xl border border-white/10">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe un mensaje interactivo..."
          className="w-full bg-transparent text-xs text-white placeholder-zinc-400 outline-none px-2"
        />
        <button type="submit" className="w-7 h-7 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer">
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

// ---------------------------------------------------------
// 5. KPI Card Template
// ---------------------------------------------------------
const KpiCardTemplate: React.FC<TemplateProps> = ({ element, customBg, customBorder, customText }) => {
  const { updateCanvasElement } = useStudioStore();
  return (
    <div
      style={{
        backgroundColor: customBg,
        borderColor: customBorder,
        color: customText,
      }}
      className="w-full h-full rounded-3xl p-5 border shadow-2xl flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <EditableText
          value={element.title || "Volumen Transaccionado SIMV"}
          onChange={(val) => updateCanvasElement(element.id, { title: val })}
          className="text-[11px] font-mono uppercase text-zinc-300 font-bold truncate max-w-[180px]"
        />
        <div className="flex items-center space-x-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          <TrendingUp className="w-3 h-3" />
          <EditableText
            value={element.badgeText || "+24.8%"}
            onChange={(val) => updateCanvasElement(element.id, { badgeText: val })}
            className="inline-block"
          />
        </div>
      </div>

      <div className="my-2">
        <EditableText
          value={element.subtitle || "$18.4M"}
          onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
          className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white"
        />
        <span className="text-xs font-mono text-zinc-400 pl-2">DOP / Mes</span>
      </div>

      {/* Visual Sparkline Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
          <span>Objetivo Q4: 100%</span>
          <span style={{ color: customBorder }} className="font-bold">84% Alcanzado</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            style={{ background: `linear-gradient(to right, ${customBorder}, #10B981)` }}
            className="h-full rounded-full w-[84%]"
          />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 6. Investment Calc Template
// ---------------------------------------------------------
const InvestmentCalcTemplate: React.FC<TemplateProps> = ({ element, customBg, customBorder, customText }) => {
  const { updateCanvasElement } = useStudioStore();
  return (
    <div
      style={{
        backgroundColor: customBg,
        borderColor: customBorder,
        color: customText,
      }}
      className="w-full h-full rounded-3xl p-5 border shadow-2xl flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-3">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 shrink-0" style={{ color: customBorder }} />
          <EditableText
            value={element.title || "Calculadora de Rendimiento Mutuos"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-sm text-white"
          />
        </div>
        <EditableText
          value={element.badgeText || "11.85% Anual"}
          onChange={(val) => updateCanvasElement(element.id, { badgeText: val })}
          className="text-xs font-mono font-bold text-emerald-400"
        />
      </div>

      <div className="my-3 space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-zinc-400">Capital a Invertir:</span>
          <EditableText
            value={element.subtitle || "$1,500,000 DOP"}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            className="font-extrabold text-white"
          />
        </div>
        <div className="w-full h-2 rounded-full bg-white/10">
          <div style={{ backgroundColor: customBorder }} className="h-full rounded-full w-[65%]" />
        </div>
        <div className="flex justify-between text-xs font-mono pt-1">
          <span className="text-zinc-400">Ganancia Anual Estimada:</span>
          <EditableText
            value={element.content || "+$177,750 DOP"}
            onChange={(val) => updateCanvasElement(element.id, { content: val })}
            className="font-bold text-emerald-400"
          />
        </div>
      </div>

      <button
        style={{ backgroundColor: customBorder }}
        className="w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-md hover:brightness-110 cursor-pointer transition-all"
      >
        Simular Operación Completa ➔
      </button>
    </div>
  );
};

// ---------------------------------------------------------
// 7. Pricing Block Template
// ---------------------------------------------------------
export interface PricingTermItem {
  pct: string;
  label: string;
}

const DEFAULT_PRICING_TERMS: PricingTermItem[] = [
  { pct: "30%", label: "Anticipo" },
  { pct: "40%", label: "Piloto" },
  { pct: "30%", label: "Cierre" },
];

const PricingBlockTemplate: React.FC<TemplateProps> = ({ element, customBg, customBorder, customText }) => {
  const { updateCanvasElement, isDesignMode } = useStudioStore();
  const terms = (element.customData?.terms as PricingTermItem[]) ?? DEFAULT_PRICING_TERMS;

  const handleAddTerm = () => {
    const updatedTerms = [...terms, { pct: "20%", label: "Nuevo Hito" }];
    updateCanvasElement(element.id, { customData: { ...element.customData, terms: updatedTerms } });
  };

  const handleRemoveTerm = (idx: number) => {
    if (terms.length <= 1) return;
    const updatedTerms = terms.filter((_, i) => i !== idx);
    updateCanvasElement(element.id, { customData: { ...element.customData, terms: updatedTerms } });
  };

  return (
    <div
      style={{
        backgroundColor: customBg,
        borderColor: customBorder,
        color: customText,
      }}
      className="w-full h-full rounded-3xl p-5 border shadow-2xl flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-3">
        <div>
          <EditableText
            value={element.title || "Inversión Única de Implementación"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-sm text-white block"
          />
          <EditableText
            value={element.subtitle || "Desarrollo Web & App Móvil iOS/Android"}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            className="text-[10px] text-zinc-400 font-mono block"
          />
        </div>
        <EditableText
          value={element.content || "USD $5,000"}
          onChange={(val) => updateCanvasElement(element.id, { content: val })}
          style={{ color: customBorder }}
          className="text-2xl font-black font-mono"
        />
      </div>

      <div className="flex items-center justify-between py-1">
        <span className="text-[10px] font-mono text-zinc-400 uppercase">Hitos de Pago</span>
        {isDesignMode && (
          <button
            onClick={handleAddTerm}
            className="text-[9px] font-mono text-[#F08D17] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Hito
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 my-1 text-center text-[10px] font-mono overflow-y-auto max-h-[120px]">
        {terms.map((t, idx) => (
          <div key={idx} className="p-2 rounded-xl bg-white/5 border border-white/10 relative group">
            {isDesignMode && terms.length > 1 && (
              <button
                onClick={() => handleRemoveTerm(idx)}
                className="opacity-0 group-hover:opacity-100 absolute top-1 right-1 text-red-400 hover:text-red-300 p-0.5 cursor-pointer"
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            )}
            <EditableText
              value={t.pct}
              onChange={(val) => {
                const updatedTerms = replaceAt(terms, idx, { ...t, pct: val });
                updateCanvasElement(element.id, { customData: { ...element.customData, terms: updatedTerms } });
              }}
              style={{ color: customBorder }}
              className="font-bold block text-xs"
            />
            <EditableText
              value={t.label}
              onChange={(val) => {
                const updatedTerms = replaceAt(terms, idx, { ...t, label: val });
                updateCanvasElement(element.id, { customData: { ...element.customData, terms: updatedTerms } });
              }}
              className="text-zinc-400 block truncate"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/10">
        <span>Garantía: 60 días</span>
        <span className="text-emerald-400 font-bold">100% Satisfacción</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 8. Feature Grid Template
// ---------------------------------------------------------
const DEFAULT_FEATURE_EPICS: string[] = [
  "1. Registro KYC",
  "2. Portafolio 360",
  "3. Trade Tickets",
  "4. Extractos SIFI",
  "5. Bot WhatsApp",
  "6. Resúmenes IA",
];

const FeatureGridTemplate: React.FC<TemplateProps> = ({ element, customBg, customBorder, customText }) => {
  const { updateCanvasElement, isDesignMode } = useStudioStore();
  const epics = (element.customData?.epics as string[]) ?? DEFAULT_FEATURE_EPICS;

  const handleAddEpic = () => {
    const updatedEpics = [...epics, `${epics.length + 1}. Nueva Épica SIMV`];
    updateCanvasElement(element.id, { customData: { ...element.customData, epics: updatedEpics } });
  };

  const handleRemoveEpic = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (epics.length <= 1) return;
    const updatedEpics = epics.filter((_, i) => i !== idx);
    updateCanvasElement(element.id, { customData: { ...element.customData, epics: updatedEpics } });
  };

  return (
    <div
      style={{
        backgroundColor: customBg,
        borderColor: customBorder,
        color: customText,
      }}
      className="w-full h-full rounded-3xl p-5 border shadow-2xl flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-white/15 pb-3">
        <div className="flex items-center space-x-2">
          <Layers className="w-5 h-5 shrink-0" style={{ color: customBorder }} />
          <EditableText
            value={element.title || "Grid de Épicas de Desarrollo"}
            onChange={(val) => updateCanvasElement(element.id, { title: val })}
            className="font-extrabold text-sm text-white"
          />
        </div>
        {isDesignMode && (
          <button
            onClick={handleAddEpic}
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F08D17] border border-[#F08D17]/40 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Épica
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 my-2 overflow-y-auto max-h-[140px]">
        {epics.map((epic, i) => (
          <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between space-x-1.5 relative group">
            <div className="flex items-center space-x-1.5 min-w-0 flex-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: customBorder }} />
              <EditableText
                value={epic}
                onChange={(newVal) => {
                  const updatedEpics = replaceAt(epics, i, newVal);
                  updateCanvasElement(element.id, { customData: { ...element.customData, epics: updatedEpics } });
                }}
                className="text-[11px] font-bold truncate flex-1"
              />
            </div>
            {isDesignMode && epics.length > 1 && (
              <button
                onClick={(e) => handleRemoveEpic(i, e)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 p-0.5 cursor-pointer shrink-0"
                title="Eliminar épica"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/10">
        <span>Entregables Continuos</span>
        <span style={{ color: customBorder }} className="font-bold">8-12 Semanas</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------
// 9. Default Template
// ---------------------------------------------------------
const DefaultTemplate: React.FC<TemplateProps> = ({ element, customBg, customBorder, customText }) => {
  const { updateCanvasElement } = useStudioStore();
  return (
    <div
      style={{
        backgroundColor: customBg,
        borderColor: customBorder,
        color: customText,
      }}
      className="w-full h-full rounded-3xl p-5 border shadow-2xl flex flex-col justify-between"
    >
      <EditableText
        value={element.title || "Módulo Preconfigurado"}
        onChange={(val) => updateCanvasElement(element.id, { title: val })}
        className="font-extrabold text-sm"
      />
      <EditableText
        value={element.subtitle || "Módulo dinámico de la propuesta"}
        onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
        className="text-xs text-zinc-400"
      />
    </div>
  );
};

// ---------------------------------------------------------
// Main Switch Component
// ---------------------------------------------------------
interface ModuleCanvasElementProps {
  element: CanvasElement;
}

export const ModuleCanvasElement: React.FC<ModuleCanvasElementProps> = ({ element }) => {
  const templateType = element.templateType || "scope_master";
  const customBg = element.customBg || "#002224";
  const customBorder = element.customBorder || "#F08D17";
  const customText = element.customText || "#FFFFFF";

  const templateProps: TemplateProps = {
    element,
    customBg,
    customBorder,
    customText,
  };

  switch (templateType) {
    case "scope_master":
      return <ScopeMasterTemplate {...templateProps} />;
    case "team_master":
      return <TeamMasterTemplate {...templateProps} />;
    case "company_master":
      return <CompanyMasterTemplate {...templateProps} />;
    case "whatsapp_sim":
      return <WhatsAppSimTemplate {...templateProps} />;
    case "kpi_card":
      return <KpiCardTemplate {...templateProps} />;
    case "investment_calc":
      return <InvestmentCalcTemplate {...templateProps} />;
    case "pricing_block":
      return <PricingBlockTemplate {...templateProps} />;
    case "feature_grid":
      return <FeatureGridTemplate {...templateProps} />;
    default:
      return <DefaultTemplate {...templateProps} />;
  }
};
