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
  const [showActiveBubble, setShowActiveBubble] = React.useState<boolean>(true);

  React.useEffect(() => {
    setShowActiveBubble(true);
    const timer = setTimeout(() => {
      setShowActiveBubble(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [activeSection]);

  return (
    <div className="no-print fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end space-y-4 pointer-events-auto select-none">
      {slides.map((s, idx) => {
        const isActive = activeSection === s.id;
        const isBubbleAutoVisible = isActive && showActiveBubble;

        return (
          <div key={s.id} className="group relative flex items-center">
            {/* Tooltip Label Bubble (Larger & Auto Pop-Up on Section Change) */}
            <div
              className={`mr-4 px-4 py-2 rounded-2xl bg-[#002224]/95 backdrop-blur-xl text-white font-extrabold text-xs sm:text-sm border transition-all duration-300 pointer-events-none whitespace-nowrap shadow-2xl flex items-center gap-2.5 ${
                isActive
                  ? isBubbleAutoVisible
                    ? "opacity-100 translate-x-0 scale-105 border-[#F08D17] ring-2 ring-[#F08D17]/40 text-white"
                    : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 border-[#F08D17]/80"
                  : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 border-white/20"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#F08D17] shrink-0 shadow-sm" />
              <span>
                {idx + 1}. {s.label}
              </span>
            </div>

            {/* Dot Indicator Button (Larger & Glowing) */}
            <button
              type="button"
              onClick={() => onSelectSection(s.id)}
              className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer shadow-md ${
                isActive
                  ? "bg-[#F08D17] scale-125 ring-4 ring-[#F08D17]/30 shadow-[#F08D17]/50 shadow-lg"
                  : "bg-slate-300/80 hover:bg-white hover:scale-125"
              }`}
              title={`${idx + 1}. ${s.label}`}
            />
          </div>
        );
      })}
    </div>
  );
};
