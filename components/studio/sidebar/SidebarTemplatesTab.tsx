"use client";

import React, { useState, useEffect, useRef } from "react";
import { useThemeStore, PRESET_THEMES, applyCssVarDirect, ThemeConfig } from "@/store/useThemeStore";
import { useProposal } from "@/context/ProposalContext";
import { RefreshCw, Building2 } from "lucide-react";

interface ColorFieldRowProps {
  label: string;
  fieldKey: keyof ThemeConfig;
  value: string;
  onChange: (val: string) => void;
}

const ColorFieldRow: React.FC<ColorFieldRowProps> = React.memo(({ label, fieldKey, value, onChange }) => {
  const [localVal, setLocalVal] = useState(value || "#FFFFFF");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalVal(value || "#FFFFFF");
  }, [value]);

  const handleDrag = (newVal: string) => {
    setLocalVal(newVal);
    // Instant CSS Variable Update (0ms, 120fps smooth)
    applyCssVarDirect(fieldKey, newVal);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(newVal);
    }, 80);
  };

  const handleBlurOrCommit = (newVal: string) => {
    setLocalVal(newVal);
    applyCssVarDirect(fieldKey, newVal);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onChange(newVal);
  };

  return (
    <div>
      <label className="block text-zinc-600 font-semibold mb-1 text-[11px]">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={localVal || "#FFFFFF"}
          onInput={(e) => handleDrag((e.target as HTMLInputElement).value)}
          onChange={(e) => handleDrag(e.target.value)}
          className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7] shrink-0 p-0"
        />
        <input
          type="text"
          value={localVal || "#FFFFFF"}
          onChange={(e) => {
            setLocalVal(e.target.value);
            applyCssVarDirect(fieldKey, e.target.value);
          }}
          onBlur={(e) => handleBlurOrCommit(e.target.value)}
          className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
        />
      </div>
    </div>
  );
});

ColorFieldRow.displayName = "ColorFieldRow";

export const SidebarTemplatesTab: React.FC = () => {
  const { theme, applyPreset, resetTheme, setTheme } = useThemeStore();
  const { proposal, updateCompany, updateClient } = useProposal();

  return (
    <div className="space-y-6 text-xs p-4">
      {/* Brand & Header Identifiers */}
      <div className="p-3.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-3">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Identidad de Marca (Cabecera)</span>
        </h4>
        <div className="space-y-2.5">
          <div>
            <label className="block text-[10px] font-bold text-zinc-600 mb-1">Nombre Proveedor (Header Izq)</label>
            <input
              type="text"
              value={proposal?.company?.name || ""}
              onChange={(e) => updateCompany({ name: e.target.value })}
              placeholder="Ej. Enfoco"
              className="w-full px-2.5 py-1.5 bg-white border border-[#E4E4E7] rounded-xl text-[#111111] font-semibold text-xs focus:ring-2 focus:ring-[#2563EB]/30 outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-zinc-600 mb-1">Nombre Cliente (Header Der)</label>
            <input
              type="text"
              value={proposal?.client?.name || ""}
              onChange={(e) => updateClient({ name: e.target.value })}
              placeholder="Ej. Excel Puesto de Bolsa, S.A. & ESAFI"
              className="w-full px-2.5 py-1.5 bg-white border border-[#E4E4E7] rounded-xl text-[#111111] font-semibold text-xs focus:ring-2 focus:ring-[#2563EB]/30 outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-zinc-600 mb-1">Nombre Corto Cliente (Siglas)</label>
            <input
              type="text"
              value={proposal?.client?.shortName || ""}
              onChange={(e) => updateClient({ shortName: e.target.value })}
              placeholder="Ej. Excel"
              className="w-full px-2.5 py-1.5 bg-white border border-[#E4E4E7] rounded-xl text-[#111111] font-semibold text-xs focus:ring-2 focus:ring-[#2563EB]/30 outline-none"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
            Temas Predefinidos de Marca
          </h4>
          <button
            onClick={resetTheme}
            className="text-[#2563EB] hover:underline flex items-center space-x-1 font-semibold cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restablecer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {PRESET_THEMES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.theme)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-2 ${
                theme.accentColor === preset.theme.accentColor && theme.bgMain === preset.theme.bgMain
                  ? "border-[#2563EB] bg-[#EFF6FF] shadow-xs ring-2 ring-[#2563EB]/20"
                  : "border-[#E4E4E7] bg-[#FAF9F6] hover:border-[#A1A1AA]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111111]">{preset.name}</span>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: preset.theme.accentColor }} />
                  <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: preset.theme.cardBg }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#E4E4E7] space-y-4">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
          Ajustes Personalizados de Estilo & Color
        </h4>

        <div className="space-y-3.5">
          <ColorFieldRow
            label="Color Principal (Fondo)"
            fieldKey="bgMain"
            value={theme.bgMain || "#004F54"}
            onChange={(val) => setTheme({ bgMain: val })}
          />

          <ColorFieldRow
            label="Titulares Principales (H1)"
            fieldKey="h1Color"
            value={theme.h1Color || theme.textPrimary || "#FFFFFF"}
            onChange={(val) => setTheme({ h1Color: val })}
          />

          <ColorFieldRow
            label="Subtítulos & Secciones (H2)"
            fieldKey="h2Color"
            value={theme.h2Color || theme.secondaryAccent || "#F08D17"}
            onChange={(val) => setTheme({ h2Color: val })}
          />

          <ColorFieldRow
            label="Cuerpo de Párrafo & Textos"
            fieldKey="textColor"
            value={theme.textColor || theme.textSecondary || "#D5E4E2"}
            onChange={(val) => setTheme({ textColor: val })}
          />

          <ColorFieldRow
            label="Color de Acento Principal"
            fieldKey="accentColor"
            value={theme.accentColor || "#004F54"}
            onChange={(val) => setTheme({ accentColor: val })}
          />

          <ColorFieldRow
            label="Color de Acento Secundario (Oro/Detalles)"
            fieldKey="secondaryAccent"
            value={theme.secondaryAccent || "#F08D17"}
            onChange={(val) => setTheme({ secondaryAccent: val })}
          />

          <ColorFieldRow
            label="Fondo de Tarjeta"
            fieldKey="cardBg"
            value={theme.cardBg || "#002224"}
            onChange={(val) => setTheme({ cardBg: val })}
          />

          <ColorFieldRow
            label="Borde de Tarjeta"
            fieldKey="cardBorder"
            value={theme.cardBorder || "#F08D17"}
            onChange={(val) => setTheme({ cardBorder: val })}
          />

          {/* Radio de Redondeo */}
          <div>
            <label className="block text-zinc-600 font-semibold mb-1">Redondeo de Tarjeta</label>
            <select
              value={theme.cardBorderRadius || "24px"}
              onChange={(e) => setTheme({ cardBorderRadius: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-medium text-xs cursor-pointer"
            >
              <option value="8px">Pequeño (8px - Rounded-lg)</option>
              <option value="16px">Medio (16px - Rounded-2xl)</option>
              <option value="24px">Grande (24px - Rounded-3xl)</option>
              <option value="36px">Extra Grande (36px - Rounded-4xl)</option>
              <option value="9999px">Píldora Completa (Pill)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sección Sobre ENFOCO & Credenciales */}
      <div className="pt-4 border-t border-[#E4E4E7] space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
            Sección Sobre ENFOCO & Credenciales
          </h4>
        </div>
        <p className="text-zinc-500 text-[10px] leading-tight">
          Personaliza el color de fondo, textos y tarjetas del apartado institucional Sobre ENFOCO.
        </p>

        <div className="space-y-3">
          <ColorFieldRow
            label="Color Fondo (Sobre ENFOCO)"
            fieldKey="aboutBg"
            value={theme.aboutBg || "#D6E5DE"}
            onChange={(val) => setTheme({ aboutBg: val })}
          />

          <ColorFieldRow
            label="Títulos & Acentos (Sobre ENFOCO)"
            fieldKey="aboutTextColor"
            value={theme.aboutTextColor || "#135A34"}
            onChange={(val) => setTheme({ aboutTextColor: val })}
          />

          <ColorFieldRow
            label="Fondo de Tarjetas (Sobre ENFOCO)"
            fieldKey="aboutCardBg"
            value={theme.aboutCardBg || "#BFDAD1"}
            onChange={(val) => setTheme({ aboutCardBg: val })}
          />

          <ColorFieldRow
            label="Bordes de Tarjetas (Sobre ENFOCO)"
            fieldKey="aboutCardBorder"
            value={theme.aboutCardBorder || "#A6C5BB"}
            onChange={(val) => setTheme({ aboutCardBorder: val })}
          />
        </div>
      </div>
    </div>
  );
};
