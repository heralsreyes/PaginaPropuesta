"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Trash2, Plus, Move } from "lucide-react";

interface EditableBlockWrapperProps {
  id: string;
  onDelete?: () => void;
  onDuplicate?: () => void;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export const EditableBlockWrapper: React.FC<EditableBlockWrapperProps> = ({
  id,
  onDelete,
  onDuplicate,
  children,
  className = "",
  label,
}) => {
  const { isDesignMode } = useStudioStore();

  if (!isDesignMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`relative group rounded-3xl transition-all hover:ring-2 hover:ring-[#2563EB]/50 ${className}`}
    >
      {/* Design Mode Overlay Controls */}
      <div className="opacity-0 group-hover:opacity-100 absolute -top-3.5 right-3 z-30 flex items-center space-x-1.5 bg-[#18181B] text-white px-2 py-1 rounded-xl shadow-xl border border-zinc-700 transition-opacity">
        {label && (
          <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase mr-1">
            {label}
          </span>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-zinc-400 hover:text-red-400 p-0.5 rounded transition-colors cursor-pointer"
            title="Borrar este bloque"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {children}
    </div>
  );
};
