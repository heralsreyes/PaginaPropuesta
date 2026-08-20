"use client";

import React from "react";

interface SlideItem {
  id: string;
  label: string;
}

interface NavDotIndicatorsProps {
  slides: SlideItem[];
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export const NavDotIndicators: React.FC<NavDotIndicatorsProps> = ({
  slides,
  activeSection,
  onSelectSection,
}) => {
  return (
    <div className="no-print fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end space-y-3 pointer-events-auto">
      {slides.map((s, idx) => {
        const isActive = activeSection === s.id;
        return (
          <div key={s.id} className="group relative flex items-center">
            {/* Tooltip Hover Label */}
            <span className="mr-3 px-3 py-1 rounded-xl bg-slate-900/90 text-white font-extrabold text-[11px] opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-lg">
              {idx + 1}. {s.label}
            </span>

            {/* Dot Indicator */}
            <button
              onClick={() => onSelectSection(s.id)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#004F54] scale-125 ring-4 ring-[#004F54]/20 shadow-md"
                  : "bg-slate-300 hover:bg-slate-400 hover:scale-110"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};
