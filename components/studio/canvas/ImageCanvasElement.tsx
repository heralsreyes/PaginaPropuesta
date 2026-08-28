"use client";

import React, { useRef } from "react";
import { CanvasElement } from "@/store/useStudioStore";
import { useStudioStore } from "@/store/useStudioStore";
import { Upload, Image as ImageIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ImageCanvasElementProps {
  element: CanvasElement;
}

export const ImageCanvasElement: React.FC<ImageCanvasElementProps> = ({ element }) => {
  const { isDesignMode, updateCanvasElement } = useStudioStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecciona un archivo de imagen válido (PNG, JPG, SVG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        updateCanvasElement(element.id, { imageUrl: dataUrl });
        toast.success("Imagen actualizada en el lienzo.");
      }
    };
    reader.readAsDataURL(file);
  };

  const hasImage = Boolean(element.imageUrl);

  return (
    <div className="w-full h-full relative group/img select-none overflow-hidden rounded-2xl border border-white/20 shadow-lg bg-[#001D20]/80 backdrop-blur-md flex flex-col items-center justify-center">
      {hasImage ? (
        <img
          src={element.imageUrl}
          alt={element.title || "Imagen subida"}
          className={`w-full h-full object-${element.objectFit || "contain"} pointer-events-none rounded-2xl`}
        />
      ) : (
        <div
          onClick={() => isDesignMode && fileInputRef.current?.click()}
          className="w-full h-full p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-white/5 transition-all text-slate-300"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#2563EB]">
            <ImageIcon className="w-5 h-5" />
          </div>
          <span className="font-bold text-xs">Subir Imagen Personalizada</span>
          <span className="text-[10px] text-slate-400 font-mono">PNG, JPG, SVG o WebP</span>
        </div>
      )}

      {/* Design Mode Overlay Actions */}
      {isDesignMode && (
        <div className="absolute top-2 right-2 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1.5 z-40 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/20 shadow-xl">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="p-1.5 text-xs text-white hover:text-[#2563EB] bg-white/10 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
            title="Cambiar / Reemplazar Imagen"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px]">Cambiar</span>
          </button>
        </div>
      )}
    </div>
  );
};
