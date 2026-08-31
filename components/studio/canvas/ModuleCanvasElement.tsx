"use client";

import React, { useState } from "react";
import { CanvasElement } from "@/types/studio";
import { useStudioStore } from "@/store/useStudioStore";
import { EditableText } from "@/components/studio/EditableText";
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
  Plus,
  Trash2,
} from "lucide-react";

interface ModuleCanvasElementProps {
  element: CanvasElement;
}

export const ModuleCanvasElement: React.FC<ModuleCanvasElementProps> = ({ element }) => {
  const { updateCanvasElement } = useStudioStore();
  const templateType = element.templateType || "scope_master";

  const customBg = element.customBg || "#002224";
  const customBorder = element.customBorder || "#F08D17";
  const customText = element.customText || "#FFFFFF";

  // 1. Scope Master (Inspector Maestro-Detalle)
  if (templateType === "scope_master") {
    const [selectedModule, setSelectedModule] = useState(0);
    const [modules, setModules] = useState([
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
    ]);

    const handleAddDeliverable = () => {
      const updated = [...modules];
      updated[selectedModule].items.push("Nuevo Entregable Técnico");
      setModules(updated);
    };

    const handleUpdateDeliverable = (itemIdx: number, newVal: string) => {
      const updated = [...modules];
      updated[selectedModule].items[itemIdx] = newVal;
      setModules(updated);
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
            <Cpu className="w-5 h-5" style={{ color: customBorder }} />
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
            {modules.map((m, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedModule(idx);
                }}
                className={`w-full p-2 rounded-xl text-left transition-all text-[11px] cursor-pointer ${
                  selectedModule === idx
                    ? "bg-[#004F54] text-white font-bold border border-[#F08D17]/80 shadow-md"
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
            <div className="space-y-2 overflow-y-auto max-h-[140px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                  Entregables Clave ({modules[selectedModule].items.length})
                </span>
                <button
                  onClick={handleAddDeliverable}
                  className="text-[9px] font-mono text-[#F08D17] hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Añadir
                </button>
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-200">
                {modules[selectedModule].items.map((item, i) => (
                  <li key={i} className="flex items-center space-x-1.5 group">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <EditableText
                      value={item}
                      onChange={(newVal) => handleUpdateDeliverable(i, newVal)}
                      className="flex-1 truncate"
                    />
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
  }

  // 2. Team Master (Visor de Equipo)
  if (templateType === "team_master") {
    const [team, setTeam] = useState([
      { name: "Heraldo Reyes", role: "Tech Lead & Arquitecto", tag: "Frontend & Cloud" },
      { name: "Equipo Backend", role: "Senior .NET & Dynamics", tag: "Integración SIFI" },
      { name: "QA & Compliance", role: "Especialista SIMV", tag: "Seguridad ISO" },
    ]);

    const handleAddMember = () => {
      setTeam([...team, { name: "Nuevo Especialista", role: "Ingeniero de Software", tag: "Fullstack" }]);
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
            <Users className="w-5 h-5" style={{ color: customBorder }} />
            <EditableText
              value={element.title || "Equipo Especialista Asignado"}
              onChange={(val) => updateCanvasElement(element.id, { title: val })}
              className="font-extrabold text-sm text-white"
            />
          </div>
          <button
            onClick={handleAddMember}
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F08D17] border border-[#F08D17]/40 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Miembro
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 my-3">
          {team.map((t, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center space-y-1">
              <div
                style={{ borderColor: customBorder, color: customBorder }}
                className="w-8 h-8 rounded-full bg-black/40 font-bold mx-auto flex items-center justify-center text-xs border"
              >
                {t.name.charAt(0)}
              </div>
              <EditableText
                value={t.name}
                onChange={(val) => {
                  const copy = [...team];
                  copy[idx].name = val;
                  setTeam(copy);
                }}
                className="font-bold text-xs truncate block"
              />
              <EditableText
                value={t.role}
                onChange={(val) => {
                  const copy = [...team];
                  copy[idx].role = val;
                  setTeam(copy);
                }}
                className="text-[10px] text-zinc-400 block truncate"
              />
              <span className="text-[9px] font-mono text-emerald-400 block">{t.tag}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-[10px] text-zinc-400 pt-2 border-t border-white/10 font-mono">
          <span>Garantía: 60 Días</span>
          <span style={{ color: customBorder }} className="font-bold">SLA 99.9%</span>
        </div>
      </div>
    );
  }

  // 3. Company Master (Sobre ENFOCO)
  if (templateType === "company_master") {
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
            <Building2 className="w-5 h-5" style={{ color: customBorder }} />
            <div>
              <EditableText
                value={element.title || "ENFOCO S.R.L."}
                onChange={(val) => updateCanvasElement(element.id, { title: val })}
                className="font-extrabold text-sm block text-white"
              />
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
            <h6 style={{ color: customBorder }} className="font-bold text-xs">+10 Años en FinTech</h6>
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
    const [messages, setMessages] = useState([
      { text: "Hola Juan, tu inversión en Mutuos Excel generó +RD$ 45,800 este mes.", isBot: true, time: "10:42 AM" },
      { text: "Excelente, ¿puedo reinvertir los intereses?", isBot: false, time: "10:43 AM" },
    ]);
    const [inputText, setInputText] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim()) return;
      setMessages([
        ...messages,
        { text: inputText, isBot: false, time: "10:45 AM" },
        { text: "¡Recibido! Tu orden ha sido registrada con OTP en el CRM.", isBot: true, time: "10:45 AM" },
      ]);
      setInputText("");
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
              className={`p-2.5 rounded-2xl max-w-[85%] text-zinc-100 shadow-xs ${
                msg.isBot ? "bg-[#128C7E]/50 rounded-tl-xs" : "bg-[#25D366]/30 rounded-tr-xs ml-auto border border-[#25D366]/40"
              }`}
            >
              <EditableText
                value={msg.text}
                onChange={(newVal) => {
                  const copy = [...messages];
                  copy[i].text = newVal;
                  setMessages(copy);
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
            placeholder="Escribe y presiona Enter..."
            className="w-full bg-transparent text-xs text-white placeholder-zinc-400 outline-none px-2"
          />
          <button type="submit" className="w-7 h-7 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer">
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    );
  }

  // 5. KPI Card
  if (templateType === "kpi_card") {
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
            <span>+24.8%</span>
          </div>
        </div>

        <div className="my-2">
          <EditableText
            value={element.subtitle || "$18.4M"}
            onChange={(val) => updateCanvasElement(element.id, { subtitle: val })}
            className="text-3xl sm:text-4xl font-black font-mono tracking-tight"
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
  }

  // 6. Investment Calc
  if (templateType === "investment_calc") {
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
            <DollarSign className="w-5 h-5" style={{ color: customBorder }} />
            <EditableText
              value={element.title || "Calculadora de Rendimiento Mutuos"}
              onChange={(val) => updateCanvasElement(element.id, { title: val })}
              className="font-extrabold text-sm text-white"
            />
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">11.85% Anual</span>
        </div>

        <div className="my-3 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-400">Capital a Invertir:</span>
            <EditableText
              value="$1,500,000 DOP"
              onChange={() => {}}
              className="font-extrabold text-white"
            />
          </div>
          <div className="w-full h-2 rounded-full bg-white/10">
            <div style={{ backgroundColor: customBorder }} className="h-full rounded-full w-[65%]" />
          </div>
          <div className="flex justify-between text-xs font-mono pt-1">
            <span className="text-zinc-400">Ganancia Anual Estimada:</span>
            <span className="font-bold text-emerald-400">+$177,750 DOP</span>
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
  }

  // 7. Pricing Block
  if (templateType === "pricing_block") {
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
            <span className="text-[10px] text-zinc-400 font-mono">Desarrollo Web & App Móvil iOS/Android</span>
          </div>
          <EditableText
            value="USD $5,000"
            onChange={() => {}}
            style={{ color: customBorder }}
            className="text-2xl font-black font-mono"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 my-2 text-center text-[10px] font-mono">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span style={{ color: customBorder }} className="font-bold block">30%</span>
            <span className="text-zinc-400">Anticipo</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span style={{ color: customBorder }} className="font-bold block">40%</span>
            <span className="text-zinc-400">Piloto</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span style={{ color: customBorder }} className="font-bold block">30%</span>
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
    const [epics, setEpics] = useState([
      "1. Registro KYC",
      "2. Portafolio 360",
      "3. Trade Tickets",
      "4. Extractos SIFI",
      "5. Bot WhatsApp",
      "6. Resúmenes IA",
    ]);

    const handleAddEpic = () => {
      setEpics([...epics, `${epics.length + 1}. Nueva Épica SIMV`]);
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
            <Layers className="w-5 h-5" style={{ color: customBorder }} />
            <EditableText
              value={element.title || "Grid de Épicas de Desarrollo"}
              onChange={(val) => updateCanvasElement(element.id, { title: val })}
              className="font-extrabold text-sm text-white"
            />
          </div>
          <button
            onClick={handleAddEpic}
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F08D17] border border-[#F08D17]/40 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Épica
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 my-2 overflow-y-auto max-h-[140px]">
          {epics.map((epic, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: customBorder }} />
              <EditableText
                value={epic}
                onChange={(newVal) => {
                  const copy = [...epics];
                  copy[i] = newVal;
                  setEpics(copy);
                }}
                className="text-[11px] font-bold truncate"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/10">
          <span>Entregables Continuos</span>
          <span style={{ color: customBorder }} className="font-bold">8-12 Semanas</span>
        </div>
      </div>
    );
  }

  // Default Fallback
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
      <p className="text-xs text-zinc-400">{element.subtitle || "Módulo dinámico de la propuesta"}</p>
    </div>
  );
};
