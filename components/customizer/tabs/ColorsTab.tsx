"use client";

import React from "react";
import { useThemeStore, PRESET_THEMES } from "@/store/useThemeStore";
import { RefreshCw, Palette, Check } from "lucide-react";

export const ColorsTab: React.FC = () => {
  const { theme, setTheme, applyPreset, resetTheme } = useThemeStore();

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

  const colorFields = [
    { key: "bgMain", label: "Fondo Principal de Página", defaultVal: "#004F54" },
    { key: "accentColor", label: "Acento Primario", defaultVal: "#004F54" },
    { key: "secondaryAccent", label: "Acento Secundario (Oro / Destacados)", defaultVal: "#F08D17" },
    { key: "cardBg", label: "Fondo de Tarjetas & Contenedores", defaultVal: "#002224" },
    { key: "cardBorder", label: "Bordes & Resplandores", defaultVal: "#F08D17" },
    { key: "textPrimary", label: "Texto Principal (Títulos & Encabezados)", defaultVal: "#FFFFFF" },
    { key: "textSecondary", label: "Texto Secundario (Descripciones)", defaultVal: "#D5E4E2" },
    { key: "navBg", label: "Fondo de Navegación & Header", defaultVal: "#002224" },
  ] as const;

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

      {/* Advanced Custom Color Controls */}
      <div className="pt-4 border-t border-[#E4E4E7] space-y-4">
        <div>
          <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
            Ajustes Personalizados de Paleta
          </h4>
          <p className="text-zinc-500 font-medium text-[11px] mt-0.5">
            Personaliza independientemente cada capa cromática de la propuesta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {colorFields.map((field) => {
            const currentValue = theme[field.key] || field.defaultVal;

            return (
              <div key={field.key} className="p-3 bg-[#FAF9F6] border border-[#E4E4E7] rounded-2xl space-y-2">
                <label className="block text-zinc-700 font-bold text-[11px] leading-tight">
                  {field.label}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={currentValue}
                    onChange={(e) => setTheme({ [field.key]: e.target.value })}
                    className="w-8 h-8 rounded-xl cursor-pointer border border-[#E4E4E7] shrink-0 p-0.5"
                  />
                  <input
                    type="text"
                    value={currentValue}
                    onChange={(e) => setTheme({ [field.key]: e.target.value })}
                    className="w-full px-2.5 py-1 bg-white border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs font-semibold"
                  />
                </div>

                {/* Quick Swatches bar for rapid color pick */}
                <div className="flex items-center space-x-1 pt-1 overflow-x-auto">
                  {QUICK_SWATCHES.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => setTheme({ [field.key]: hex })}
                      className="w-3.5 h-3.5 rounded-full border border-black/10 transition-transform hover:scale-125 cursor-pointer shrink-0"
                      style={{ backgroundColor: hex }}
                      title={`Aplicar ${hex}`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
