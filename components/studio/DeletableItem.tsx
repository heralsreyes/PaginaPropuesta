"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Trash2 } from "lucide-react";

interface DeletableItemProps {
  onDelete: () => void;
  children: React.ReactNode;
  className?: string;
  itemTitle?: string;
  position?: "top-left" | "top-right";
}

export const DeletableItem: React.FC<DeletableItemProps> = ({
  onDelete,
  children,
  className = "",
  itemTitle = "elemento",
  position = "top-left",
}) => {
  const { isDesignMode } = useStudioStore();

  if (!isDesignMode) {
    return <div className={className}>{children}</div>;
  }

  const posClass =
    position === "top-left"
      ? "top-1.5 left-1.5"
      : "top-1.5 right-1.5";

  return (
    <div className={`relative group/deletable ${className}`}>
      {children}

      {/* Trash Delete Overlay Button in Design Mode */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className={`opacity-0 group-hover/deletable:opacity-100 absolute ${posClass} z-30 p-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all cursor-pointer hover:scale-110 flex items-center justify-center`}
        title={`Eliminar este ${itemTitle}`}
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
};
