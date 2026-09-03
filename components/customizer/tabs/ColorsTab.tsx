"use client";

import React, { useState, useEffect, useRef } from "react";
import { useThemeStore, PRESET_THEMES, applyCssVarDirect, ThemeConfig } from "@/store/useThemeStore";
import { RefreshCw, Palette, Check } from "lucide-react";

const QUICK_SWATCHES = [
  "#004F54",
  "#F08D17",
  "#002224",
  "#D5E4E2",
  "#FFFFFF",
  "#0F172A",
  "#0284C7",
  "#D97706",
  "#059669",
  "#4338CA",
];

interface FastColorCardProps {
  label: string;
  fieldKey: keyof ThemeConfig;
  value: string;
  swatches?: string[];
  bgClass?: string;
  borderClass?: string;
  onChange: (val: string) => void;
}

const FastColorCard: React.FC<FastColorCardProps> = React.memo(
  ({ label, fieldKey, value, swatches = QUICK_SWATCHES, bgClass = "bg-[#FAF9F6]", borderClass = "border-[#E4E4E7]", onChange }) => {
    const [localVal, setLocalVal] = useState(value || "#FFFFFF");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      setLocalVal(value || "#FFFFFF");
    }, [value]);

    const handleDrag = (newVal: string) => {
      setLocalVal(newVal);
      applyCssVarDirect(fieldKey, newVal);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange(newVal);
      }, 80);
    };

    const handleCommit = (newVal: string) => {
      setLocalVal(newVal);
      applyCssVarDirect(fieldKey, newVal);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      onChange(newVal);
    };

    return (
      <div className={`p-3 ${bgClass} border ${borderClass} rounded-2xl space-y-2`}>
        <label className="block text-zinc-700 font-bold text-[11px] leading-tight">{label}</label>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={localVal || "#FFFFFF"}
            onInput={(e) => handleDrag((e.target as HTMLInputElement).value)}
            onChange={(e) => handleDrag(e.target.value)}
            className="w-8 h-8 rounded-xl cursor-pointer border border-[#E4E4E7] shrink-0 p-0.5"
          />
          <input
            type="text"
            value={localVal || "#FFFFFF"}
            onChange={(e) => {
              setLocalVal(e.target.value);
              applyCssVarDirect(fieldKey, e.target.value);
            }}
            onBlur={(e) => handleCommit(e.target.value)}
            className="w-full px-2.5 py-1 bg-white border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs font-semibold"
          />
        </div>

        {/* Quick Swatches */}
        <div className="flex items-center space-x-1 pt-1 overflow-x-auto">
          {swatches.map((hex) => (
            <button
              key={hex}
              type="button"
              onClick={() => handleCommit(hex)}
              className="w-3.5 h-3.5 rounded-full border border-black/10 transition-transform hover:scale-125 cursor-pointer shrink-0"
              style={{ backgroundColor: hex }}
              title={`Aplicar ${hex}`}
            />
          ))}
        </div>
      </div>
    );
  }
);

FastColorCard.displayName = "FastColorCard";

export const ColorsTab: React.FC = () => {
  const { theme, setTheme, applyPreset, resetTheme } = useThemeStore();

  const globalColorFields = [
    { key: "bgMain" as keyof ThemeConfig, label: "Fondo Principal de Página", defaultVal: "#004F54" },
    { key: "accentColor" as keyof ThemeConfig, label: "Acento Primario", defaultVal: "#004F54" },
    { key: "secondaryAccent" as keyof ThemeConfig, label: "Acento Secundario (Oro / Destacados)", defaultVal: "#F08D17" },
    { key: "cardBg" as keyof ThemeConfig, label: "Fondo de Tarjetas & Contenedores", defaultVal: "#002224" },
    { key: "cardBorder" as keyof ThemeConfig, label: "Bordes & Resplandores", defaultVal: "#F08D17" },
    { key: "textPrimary" as keyof ThemeConfig, label: "Texto Principal (Títulos & Encabezados)", defaultVal: "#FFFFFF" },
    { key: "textSecondary" as keyof ThemeConfig, label: "Texto Secundario (Descripciones)", defaultVal: "#D5E4E2" },
    { key: "navBg" as keyof ThemeConfig, label: "Fondo de Navegación & Header", defaultVal: "#002224" },
  ];

  const aboutColorFields = [
    { key: "aboutBg" as keyof ThemeConfig, label: "Fondo Sección Sobre ENFOCO", defaultVal: "#D6E5DE" },
    { key: "aboutCardBg" as keyof ThemeConfig, label: "Fondo Tarjetas Sobre ENFOCO", defaultVal: "#BFDAD1" },
    { key: "aboutTextColor" as keyof ThemeConfig, label: "Color de Texto & Acento Sobre ENFOCO", defaultVal: "#135A34" },
    { key: "aboutCardBorder" as keyof ThemeConfig, label: "Bordes & Resaltados Sobre ENFOCO", defaultVal: "#A6C5BB" },
  ];

  const aboutSwatches = ["#D6E5DE", "#BFDAD1", "#135A34", "#004F54", "#002224", "#F08D17", "#FFFFFF", "#F8FAFC", "#0F172A"];

  return (
    <div className="space-y-6 text-xs">
      {/* Header & Presets */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-[#2563EB]" />
            <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
              Temas Predefinidos de Marca B2B
            </h4>
          </div>
          <button
            onClick={resetTheme}
            className="text-[#2563EB] hover:underline flex items-center space-x-1 font-semibold cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restablecer Tema Base</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PRESET_THEMES.map((preset) => {
            const isActive =
              theme.accentColor === preset.theme.accentColor &&
              theme.bgMain === preset.theme.bgMain &&
              theme.secondaryAccent === preset.theme.secondaryAccent;

            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.theme)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-2 relative overflow-hidden ${
                  isActive
                    ? "border-[#2563EB] bg-[#EFF6FF] shadow-sm ring-2 ring-[#2563EB]/20"
                    : "border-[#E4E4E7] bg-[#FAF9F6] hover:border-[#A1A1AA] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#111111] text-xs truncate pr-1">{preset.name}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />}
                </div>

                {/* Color Swatch Dots */}
                <div className="flex items-center space-x-1.5 pt-1">
                  <span
                    className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                    style={{ backgroundColor: preset.theme.bgMain }}
                    title={`Fondo: ${preset.theme.bgMain}`}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                    style={{ backgroundColor: preset.theme.accentColor }}
                    title={`Acento Primario: ${preset.theme.accentColor}`}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                    style={{ backgroundColor: preset.theme.secondaryAccent }}
                    title={`Acento Secundario: ${preset.theme.secondaryAccent}`}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                    style={{ backgroundColor: preset.theme.cardBg }}
                    title={`Tarjetas: ${preset.theme.cardBg}`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION: Custom Palette for Sobre ENFOCO */}
      <div className="pt-4 border-t border-[#E4E4E7] space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
              Sección Sobre ENFOCO & Credenciales
            </h4>
          </div>
          <p className="text-zinc-500 font-medium text-[11px] mt-0.5">
            Modifica el color de fondo, las tarjetas y los acentos del apartado institucional Sobre ENFOCO.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {aboutColorFields.map((field) => (
            <FastColorCard
              key={field.key}
              label={field.label}
              fieldKey={field.key}
              value={theme[field.key] || field.defaultVal}
              swatches={aboutSwatches}
              bgClass="bg-emerald-50/40"
              borderClass="border-emerald-200/60"
              onChange={(val) => setTheme({ [field.key]: val })}
            />
          ))}
        </div>
      </div>

      {/* Advanced Custom Color Controls (Global) */}
      <div className="pt-4 border-t border-[#E4E4E7] space-y-4">
        <div>
          <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
            Ajustes Globales de Paleta
          </h4>
          <p className="text-zinc-500 font-medium text-[11px] mt-0.5">
            Personaliza independientemente cada capa cromática global de la propuesta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {globalColorFields.map((field) => (
            <FastColorCard
              key={field.key}
              label={field.label}
              fieldKey={field.key}
              value={theme[field.key] || field.defaultVal}
              onChange={(val) => setTheme({ [field.key]: val })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
