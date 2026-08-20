"use client";

import React from "react";
import { CanvasElement } from "@/types/studio";
import { Monitor, Smartphone, Tablet, Wifi, Battery } from "lucide-react";

interface MockupCanvasElementProps {
  element: CanvasElement;
}

export const MockupCanvasElement: React.FC<MockupCanvasElementProps> = ({ element }) => {
  if (element.mockupType === "iphone") {
    return (
      <div className="w-full h-full bg-[#18181B] rounded-[40px] p-3 border-4 border-zinc-700 shadow-2xl flex flex-col justify-between text-white relative overflow-hidden">
        {/* Dynamic Island */}
        <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-between px-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
        </div>

        <div className="flex-1 bg-[#090D16] rounded-[28px] p-3 flex flex-col justify-between border border-zinc-800">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span>9:41</span>
            <div className="flex items-center space-x-1">
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="text-center my-auto space-y-1">
            <Smartphone className="w-8 h-8 text-[#2563EB] mx-auto" />
            <h5 className="font-extrabold text-xs text-white">{element.title}</h5>
            <span className="text-[10px] text-zinc-400 block">App Móvil Excel</span>
          </div>

          <div className="w-16 h-1 bg-white/40 rounded-full mx-auto mt-2" />
        </div>
      </div>
    );
  }

  if (element.mockupType === "ipad") {
    return (
      <div className="w-full h-full bg-[#18181B] rounded-[24px] p-3 border-4 border-zinc-700 shadow-2xl flex flex-col justify-between text-white relative">
        <div className="flex-1 bg-[#0F172A] rounded-xl p-4 flex flex-col justify-between border border-zinc-800">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-bold text-white">Excel Tablet Dashboard</span>
            <Tablet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-center my-auto">
            <h5 className="font-extrabold text-sm text-white">{element.title}</h5>
          </div>
        </div>
      </div>
    );
  }

  // Macbook Default Mockup
  return (
    <div className="w-full h-full bg-[#18181B] rounded-2xl p-2 border-2 border-zinc-700 shadow-2xl flex flex-col justify-between text-white">
      <div className="flex items-center space-x-1.5 px-2 py-1 bg-zinc-900 rounded-t-lg border-b border-zinc-800">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-[10px] text-zinc-400 font-mono pl-2">macOS • portal.excel.com.do</span>
      </div>
      <div className="flex-1 bg-[#002F32] p-4 flex items-center justify-center text-center">
        <div>
          <Monitor className="w-8 h-8 text-[#F08D17] mx-auto mb-1" />
          <h5 className="font-extrabold text-sm text-white">{element.title}</h5>
        </div>
      </div>
    </div>
  );
};
