"use client";

import React, { useState } from "react";
import { useStudioStore, PageSection } from "@/store/useStudioStore";
import { ArrowUp, ArrowDown, Eye, EyeOff, Trash2, RefreshCw, GripVertical, Plus, Copy, Layout, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const SidebarSectionsTab: React.FC = () => {
  const {
    sections,
    toggleSectionVisibility,
    removeSection,
    moveSectionUp,
    moveSectionDown,
    reorderSections,
    resetSections,
    addSection,
  } = useStudioStore();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionType, setNewSectionType] = useState<PageSection["componentType"]>("custom");

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...sections];
    const [removed] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, removed);

    reorderSections(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newSectionTitle.trim() || `Sección ${sections.length + 1}`;
    const newId = addSection(newSectionType, title);
    toast.success(`Sección '${title}' creada exitosamente.`);
    setNewSectionTitle("");
    setIsAddingSection(false);

    // Scroll to the new section if possible
    setTimeout(() => {
      const el = document.getElementById(newId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  const handleDuplicateSection = (sec: PageSection) => {
    const newTitle = `${sec.label} (Copia)`;
    const newId = addSection(sec.componentType, newTitle);
    toast.success(`Sección duplicada: '${newTitle}'`);
  };

  return (
    <div className="space-y-4 text-xs p-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7]">
        <span className="font-extrabold text-[#111111] uppercase font-mono text-[11px]">
          Secciones de la Propuesta ({sections.length})
        </span>
        <button
          onClick={resetSections}
          className="text-[#2563EB] hover:underline flex items-center space-x-1 font-semibold cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Restablecer</span>
        </button>
      </div>

      {/* Button to add new section */}
      {!isAddingSection ? (
        <button
          onClick={() => setIsAddingSection(true)}
          className="w-full py-2.5 px-4 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Añadir Nueva Sección</span>
        </button>
      ) : (
        <form onSubmit={handleCreateSection} className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#1E40AF] font-mono text-[11px] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Nueva Sección
            </span>
            <button
              type="button"
              onClick={() => setIsAddingSection(false)}
              className="text-xs text-zinc-500 hover:text-zinc-800 cursor-pointer font-bold"
            >
              ✕
            </button>
          </div>

          <div>
            <label className="block text-zinc-700 font-semibold mb-1 text-[11px]">Nombre de la Sección</label>
            <input
              type="text"
              required
              placeholder="Ej. 13. Especificaciones Técnicas"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#BFDBFE] rounded-xl text-[#111111] font-medium text-xs focus:ring-2 focus:ring-[#2563EB]/30 outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-zinc-700 font-semibold mb-1 text-[11px]">Tipo de Plantilla Base</label>
            <select
              value={newSectionType}
              onChange={(e) => setNewSectionType(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-[#BFDBFE] rounded-xl text-[#111111] font-medium text-xs cursor-pointer"
            >
              <option value="custom">Lienzo en Blanco (Diseño Libre)</option>
              <option value="alcance">Módulo de Alcance / Entregables</option>
              <option value="cronograma">Cronograma / Fases Roadmap</option>
              <option value="equipo">Equipo Especialista & Roles</option>
              <option value="responsabilidades">Matriz de Responsabilidades</option>
              <option value="inversion">Presupuesto & Términos de Pago</option>
              <option value="empresa">Perfil de Empresa / Proveedor</option>
              <option value="contacto">Cierre & Contacto</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <button
              type="submit"
              className="flex-1 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl transition-all shadow-xs cursor-pointer text-center"
            >
              Crear Sección
            </button>
            <button
              type="button"
              onClick={() => setIsAddingSection(false)}
              className="px-3 py-2 bg-white border border-zinc-300 text-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <p className="text-[11px] text-zinc-500 font-medium italic">
        💡 Arrastra cualquier sección para reordenar la propuesta en vivo.
      </p>

      <div className="space-y-2">
        {sections.map((sec, idx) => {
          const isDraggingThis = draggedIndex === idx;
          const isOverThis = dragOverIndex === idx;

          return (
            <div
              key={sec.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all cursor-grab active:cursor-grabbing ${
                isDraggingThis ? "opacity-40 scale-95 border-dashed border-[#2563EB]" : ""
              } ${
                isOverThis ? "border-2 border-[#2563EB] bg-[#EFF6FF] shadow-md" : ""
              } ${
                sec.enabled && !isOverThis
                  ? "bg-white border-[#E4E4E7] shadow-xs hover:border-[#2563EB]/40"
                  : !isOverThis
                  ? "bg-[#F4F4F5] border-[#E4E4E7] opacity-60"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-2 truncate pr-2">
                <GripVertical className="w-4 h-4 text-zinc-400 shrink-0 cursor-grab" />
                <span className="font-mono text-[10px] text-zinc-400 font-bold">{idx + 1}</span>
                <span className="font-bold text-[#111111] truncate">{sec.label}</span>
              </div>

              <div className="flex items-center space-x-1 shrink-0">
                <button
                  onClick={() => handleDuplicateSection(sec)}
                  className="p-1 text-zinc-500 hover:text-[#2563EB] cursor-pointer"
                  title="Duplicar sección"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => moveSectionUp(sec.id)}
                  disabled={idx === 0}
                  className="p-1 text-zinc-500 hover:text-[#2563EB] disabled:opacity-30 cursor-pointer"
                  title="Mover arriba"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => moveSectionDown(sec.id)}
                  disabled={idx === sections.length - 1}
                  className="p-1 text-zinc-500 hover:text-[#2563EB] disabled:opacity-30 cursor-pointer"
                  title="Mover abajo"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => toggleSectionVisibility(sec.id)}
                  className={`p-1 cursor-pointer ${sec.enabled ? "text-emerald-600" : "text-zinc-400"}`}
                  title={sec.enabled ? "Ocultar sección" : "Mostrar sección"}
                >
                  {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => removeSection(sec.id)}
                  className="p-1 text-red-400 hover:text-red-600 cursor-pointer"
                  title="Eliminar sección"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
