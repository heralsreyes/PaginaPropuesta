"use client";

import React from "react";
import { useThemeStore, PRESET_THEMES } from "@/store/useThemeStore";
import { RefreshCw } from "lucide-react";

export const SidebarTemplatesTab: React.FC = () => {
  const { theme, applyPreset, resetTheme, setTheme } = useThemeStore();

  return (
    <div className="space-y-6 text-xs p-4">
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
          {/* Fondo Principal */}
          <div>
            <label className="block text-zinc-600 font-semibold mb-1">Color Principal (Fondo)</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.bgMain || "#FFFFFF"}
                onChange={(e) => setTheme({ bgMain: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7] shrink-0"
              />
              <input
                type="text"
                value={theme.bgMain || "#FFFFFF"}
                onChange={(e) => setTheme({ bgMain: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          {/* Titulares H1 */}
          <div>
            <label className="block text-zinc-600 font-semibold mb-1">Titulares Principales (H1)</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.h1Color || theme.textPrimary || "#FFFFFF"}
                onChange={(e) => setTheme({ h1Color: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7] shrink-0"
              />
              <input
                type="text"
                value={theme.h1Color || theme.textPrimary || "#FFFFFF"}
                onChange={(e) => setTheme({ h1Color: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          {/* Subtítulos H2 */}
          <div>
            <label className="block text-zinc-600 font-semibold mb-1">Subtítulos & Secciones (H2)</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.h2Color || theme.secondaryAccent || "#F08D17"}
                onChange={(e) => setTheme({ h2Color: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7] shrink-0"
              />
              <input
                type="text"
                value={theme.h2Color || theme.secondaryAccent || "#F08D17"}
                onChange={(e) => setTheme({ h2Color: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          {/* Párrafos & Textos Generales */}
          <div>
            <label className="block text-zinc-600 font-semibold mb-1">Cuerpo de Párrafo & Textos</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.textColor || theme.textSecondary || "#D5E4E2"}
                onChange={(e) => setTheme({ textColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7] shrink-0"
              />
              <input
                type="text"
                value={theme.textColor || theme.textSecondary || "#D5E4E2"}
                onChange={(e) => setTheme({ textColor: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          {/* Acento Principal */}
          <div>
            <label className="block text-zinc-600 font-semibold mb-1">Color de Acento Principal</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.accentColor || "#004F54"}
                onChange={(e) => setTheme({ accentColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7] shrink-0"
              />
              <input
                type="text"
                value={theme.accentColor || "#004F54"}
                onChange={(e) => setTheme({ accentColor: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          {/* Acento Secundario */}
          <div>
            <label className="block text-zinc-600 font-semibold mb-1">Color de Acento Secundario (Oro/Detalles)</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.secondaryAccent || "#F08D17"}
                onChange={(e) => setTheme({ secondaryAccent: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7] shrink-0"
              />
              <input
                type="text"
                value={theme.secondaryAccent || "#F08D17"}
                onChange={(e) => setTheme({ secondaryAccent: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          {/* Fondo de Tarjeta */}
          <div>
            <label className="block text-zinc-600 font-semibold mb-1">Fondo de Tarjeta</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.cardBg || "#002224"}
                onChange={(e) => setTheme({ cardBg: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7] shrink-0"
              />
              <input
                type="text"
                value={theme.cardBg || "#002224"}
                onChange={(e) => setTheme({ cardBg: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          {/* Borde de Tarjeta */}
          <div>
            <label className="block text-zinc-600 font-semibold mb-1">Borde de Tarjeta</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.cardBorder || "#F08D17"}
                onChange={(e) => setTheme({ cardBorder: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7] shrink-0"
              />
              <input
                type="text"
                value={theme.cardBorder || "#F08D17"}
                onChange={(e) => setTheme({ cardBorder: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>

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
    </div>
  );
};
