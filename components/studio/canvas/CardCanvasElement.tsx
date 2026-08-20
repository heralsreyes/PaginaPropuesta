"use client";

import React from "react";
import { CanvasElement } from "@/types/studio";
import { useStudioStore } from "@/store/useStudioStore";

interface CardCanvasElementProps {
  element: CanvasElement;
}

export const CardCanvasElement: React.FC<CardCanvasElementProps> = ({ element }) => {
  const { setActiveTabForCard } = useStudioStore();

  const activeTabId = element.activeTabId || element.tabs?.[0]?.id || "tab-1";
  const activeTab = element.tabs?.find((t) => t.id === activeTabId) || element.tabs?.[0];

  return (
    <div
      style={{
        backgroundColor: element.customBg || "#FFFFFF",
        borderColor: element.customBorder || "#E4E4E7",
        color: element.customText || "#18181B",
      }}
      className="w-full h-full p-5 rounded-2xl border shadow-md flex flex-col justify-between overflow-hidden"
    >
      <div>
        <h4 className="font-extrabold text-sm sm:text-base mb-1">{element.title}</h4>
        {element.subtitle && <p className="text-xs text-zinc-500">{element.subtitle}</p>}
      </div>

      {element.isMultiTab && element.tabs && !element.hideTabPills && (
        <div className="flex items-center space-x-1 pt-2 border-t border-zinc-200 mt-2">
          {element.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTabForCard(element.id, tab.id);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                activeTabId === tab.id
                  ? "bg-[#2563EB] text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {element.isMultiTab && activeTab && (
        <div className="pt-2 text-xs">
          <span className="font-bold block">{activeTab.title}</span>
          <span className="text-[11px] text-zinc-500">{activeTab.subtitle}</span>
        </div>
      )}
    </div>
  );
};
