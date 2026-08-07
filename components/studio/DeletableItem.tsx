"use client";

import React from "react";
import { useStudioStore } from "@/store/useStudioStore";
import { Trash2 } from "lucide-react";

interface DeletableItemProps {
  onDelete: () => void;
  children: React.ReactNode;
  className?: string;
  itemTitle?: string;
}

export const DeletableItem: React.FC<DeletableItemProps> = ({
  onDelete,
  children,
  className = "",
  itemTitle = "elemento",
}) => {
  const { isDesignMode } = useStudioStore();

  if (!isDesignMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative group/deletable ${className}`}>
      {children}

      {/* Trash Delete Overlay Button in Design Mode */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="opacity-0 group-hover/deletable:opacity-100 absolute -top-2 -right-2 z-30 p-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all cursor-pointer transform hover:scale-110"
        title={`Eliminar este ${itemTitle}`}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
