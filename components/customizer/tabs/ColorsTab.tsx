"use client";

import React from "react";
import { useThemeStore, PRESET_THEMES } from "@/store/useThemeStore";
import { RefreshCw } from "lucide-react";

export const ColorsTab: React.FC = () => {
  const { theme, setTheme, applyPreset, resetTheme } = useThemeStore();

  return (
    <div className="space-y-6 text-xs">
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
            <span>Restablecer Tema Base</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
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

      <div className="pt-2 border-t border-[#E4E4E7] space-y-3">
        <h4 className="font-extrabold text-[#111111] uppercase tracking-wider text-[11px] font-mono">
          Ajustes Personalizados de Color Hexadecimal
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-600 font-medium mb-1">Color Principal (Fondo)</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.bgMain || "#FFFFFF"}
                onChange={(e) => setTheme({ bgMain: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7]"
              />
              <input
                type="text"
                value={theme.bgMain || "#FFFFFF"}
                onChange={(e) => setTheme({ bgMain: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-600 font-medium mb-1">Color de Acento</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={theme.accentColor || "#004F54"}
                onChange={(e) => setTheme({ accentColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border border-[#E4E4E7]"
              />
              <input
                type="text"
                value={theme.accentColor || "#004F54"}
                onChange={(e) => setTheme({ accentColor: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#FAF9F6] border border-[#E4E4E7] rounded-xl text-[#111111] font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
