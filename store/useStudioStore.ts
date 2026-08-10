import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type StudioTab =
  | "plantillas"
  | "secciones"
  | "texto"
  | "elementos"
  | "mockups"
  | "presupuesto"
  | "json";

export interface PageSection {
  id: string;
  label: string;
  componentType:
    | "hero"
    | "alcance"
    | "cronograma"
    | "equipo"
    | "responsabilidades"
    | "inversion"
    | "empresa"
    | "contacto"
    | "custom";
  enabled: boolean;
  title?: string;
  subtitle?: string;
}

export const DEFAULT_PAGE_SECTIONS: PageSection[] = [
  { id: "hero", label: "Portada / Inicio", componentType: "hero", enabled: true },
  { id: "alcance", label: "Alcance & Módulos", componentType: "alcance", enabled: true },
  { id: "cronograma", label: "Cronograma & EDT", componentType: "cronograma", enabled: true },
  { id: "equipo", label: "Equipo Especialista", componentType: "equipo", enabled: true },
  { id: "responsabilidades", label: "Garantía & Matriz", componentType: "responsabilidades", enabled: true },
  { id: "inversion", label: "Presupuesto & Pagos", componentType: "inversion", enabled: true },
  { id: "empresa", label: "Sobre ENFOCO S.R.L.", componentType: "empresa", enabled: true },
  { id: "contacto", label: "Cierre & Firma", componentType: "contacto", enabled: true },
];

export interface ButtonActionConfig {
  targetId: string;
  type: "CHANGE_TAB" | "TOGGLE_VISIBILITY" | "NAVIGATE_SECTION" | "SYSTEM_TRIGGER" | "NEXT_TAB";
  payload?: string; // targetTabId, sectionId, or systemTriggerName
}

export interface PlainCardTab {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  customBg?: string;
  customBorder?: string;
  customText?: string;
  deliverables?: string[];
}

export interface CanvasElement {
  id: string;
  type: "button" | "card" | "shape" | "line" | "graphic" | "text" | "module_template" | "mockup";
  templateType?: "scope_master" | "team_master" | "company_master" | "clean_multitab";
  mockupType?: "macbook" | "iphone" | "ipad";
  sectionId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  title: string;
  subtitle?: string;
  content?: string;

  // Multi-Tab & Visibility Controls
  isMultiTab?: boolean;
  hideTabPills?: boolean;
  activeTabId?: string;
  tabs?: PlainCardTab[];
  tabStyle?: "pills" | "underline" | "folders";
  isHidden?: boolean;

  // Individual Color Overrides
  customBg?: string;
  customBorder?: string;
  customText?: string;
  customAccent?: string;

  // Style variant / icon
  variant?: string;
  iconName?: string;

  // Button action binding
  actionConfig?: ButtonActionConfig;
}

interface StudioState {
  isDesignMode: boolean;
  activeToolTab: StudioTab;
  isPanelOpen: boolean;
  selectedCanvasElementId: string | null;
  canvasElements: CanvasElement[];
  buttonActionsMap: Record<string, ButtonActionConfig>;
  sections: PageSection[];

  // Canvas Interaction Mode (Select vs Draw/Drag)
  canvasMode: "select" | "draw";
  setCanvasMode: (mode: "select" | "draw") => void;

  // Active Drawing Tool (PPTX Online Drawing Mode)
  activeDrawingTool: Omit<CanvasElement, "id" | "x" | "y" | "width" | "height" | "zIndex"> | null;
  setActiveDrawingTool: (tool: Omit<CanvasElement, "id" | "x" | "y" | "width" | "height" | "zIndex"> | null) => void;

  // Actions
  toggleDesignMode: () => void;
  setActiveToolTab: (tab: StudioTab) => void;
  togglePanel: () => void;
  setSelectedCanvasElementId: (id: string | null) => void;
  setZoomLevel: (level: number) => void;

  // Section Mutators
  toggleSectionVisibility: (id: string) => void;
  removeSection: (id: string) => void;
  addSection: (componentType: PageSection["componentType"], label?: string) => string;
  moveSectionUp: (id: string) => void;
  moveSectionDown: (id: string) => void;
  resetSections: () => void;

  // Canvas Element Mutators
  addCanvasElement: (element: Omit<CanvasElement, "id" | "x" | "y" | "width" | "height" | "zIndex">) => string;
  addCanvasElementAtPosition: (element: Omit<CanvasElement, "id" | "width" | "height" | "zIndex">) => string;
  updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeCanvasElement: (id: string) => void;
  duplicateCanvasElement: (id: string) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  toggleElementVisibility: (id: string) => void;
  clearAllCanvasElements: () => void;

  // Multi-Tab Mutators
  convertCardToMultiTab: (cardId: string) => void;
  toggleHideTabPills: (cardId: string) => void;
  addTabToCard: (cardId: string, tabLabel?: string) => void;
  removeTabFromCard: (cardId: string, tabId: string) => void;
  setActiveTabForCard: (cardId: string, tabId: string) => void;
  updateCardTabContent: (cardId: string, tabId: string, updates: Partial<PlainCardTab>) => void;

  // Color Override & Action Binding
  setElementColorOverride: (id: string, colors: { bg?: string; border?: string; text?: string; accent?: string }) => void;
  bindButtonAction: (buttonId: string, config: ButtonActionConfig) => void;
}

// Debounced Storage Engine to avoid main thread disk I/O lag during rapid color dragging
let saveTimeout: ReturnType<typeof setTimeout> | null = null;

const debouncedStorageEngine = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: any) => {
    if (typeof window === "undefined") return;
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(name, JSON.stringify(value));
      } catch (err) {
        console.error("Storage save error:", err);
      }
    }, 300);
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};

export const useStudioStore = create<StudioState>()(
  persist(
    (set, get) => ({
      isDesignMode: false,
      activeToolTab: "elementos",
      isPanelOpen: true,
      selectedCanvasElementId: null,
      zoomLevel: 100,
      canvasElements: [],
      buttonActionsMap: {},
      sections: DEFAULT_PAGE_SECTIONS,
      canvasMode: "select",
      activeDrawingTool: null,

      setCanvasMode: (mode) =>
        set({
          canvasMode: mode,
          activeDrawingTool:
            mode === "select"
              ? null
              : get().activeDrawingTool || {
                  type: "text",
                  textType: "p",
                  title: "Nuevo Recuadro de Texto",
                  customBg: "transparent",
                  customBorder: "transparent",
                  customText: "#18181B",
                },
        }),

      setActiveDrawingTool: (tool) =>
        set({
          activeDrawingTool: tool,
          canvasMode: tool ? "draw" : "select",
        }),

      toggleDesignMode: () =>
        set((state) => ({ isDesignMode: !state.isDesignMode })),

      setActiveToolTab: (tab) =>
        set({ activeToolTab: tab, isPanelOpen: true }),

      togglePanel: () =>
        set((state) => ({ isPanelOpen: !state.isPanelOpen })),

      setSelectedCanvasElementId: (id) =>
        set({ selectedCanvasElementId: id }),

      setZoomLevel: (level) =>
        set({ zoomLevel: Math.min(140, Math.max(60, level)) }),

      // Section Mutators Implementation
      toggleSectionVisibility: (id) => {
        set((state) => ({
          sections: state.sections.map((sec) =>
            sec.id === id ? { ...sec, enabled: !sec.enabled } : sec
          ),
        }));
      },

      removeSection: (id) => {
        set((state) => ({
          sections: state.sections.filter((sec) => sec.id !== id),
        }));
      },

      addSection: (componentType, label) => {
        const uniqueId = `sec-${componentType}-${Date.now().toString().slice(-4)}`;
        const typeLabels: Record<string, string> = {
          hero: "Nueva Portada",
          alcance: "Nuevo Alcance & Módulos",
          cronograma: "Nuevo Cronograma",
          equipo: "Nuevo Equipo Especialista",
          responsabilidades: "Nueva Matriz de Garantía",
          inversion: "Nuevo Presupuesto",
          empresa: "Sobre ENFOCO Adicional",
          contacto: "Nuevo Cierre & Contacto",
          custom: "Sección Personalizada",
        };

        const newSec: PageSection = {
          id: uniqueId,
          label: label || typeLabels[componentType] || "Nueva Sección",
          componentType,
          enabled: true,
          title: label || typeLabels[componentType] || "Nueva Sección",
        };

        set((state) => ({
          sections: [...state.sections, newSec],
        }));

        return uniqueId;
      },

      moveSectionUp: (id) => {
        set((state) => {
          const index = state.sections.findIndex((sec) => sec.id === id);
          if (index <= 0) return state;
          const updated = [...state.sections];
          const temp = updated[index - 1];
          updated[index - 1] = updated[index];
          updated[index] = temp;
          return { sections: updated };
        });
      },

      moveSectionDown: (id) => {
        set((state) => {
          const index = state.sections.findIndex((sec) => sec.id === id);
          if (index < 0 || index >= state.sections.length - 1) return state;
          const updated = [...state.sections];
          const temp = updated[index + 1];
          updated[index + 1] = updated[index];
          updated[index] = temp;
          return { sections: updated };
        });
      },

      resetSections: () => {
        set({ sections: DEFAULT_PAGE_SECTIONS });
      },

      addCanvasElement: (element) => {
        const uniqueId = `${element.type}-${Date.now().toString().slice(-4)}`;
        const currentElements = get().canvasElements;
        const maxZ = currentElements.reduce((max, el) => Math.max(max, el.zIndex || 0), 0);

        const defaultW =
          element.type === "button"
            ? 160
            : element.type === "shape"
            ? 80
            : element.type === "mockup"
            ? element.mockupType === "macbook"
              ? 420
              : element.mockupType === "iphone"
              ? 220
              : 360
            : 300;

        const defaultH =
          element.type === "button"
            ? 44
            : element.type === "shape"
            ? 80
            : element.type === "mockup"
            ? element.mockupType === "macbook"
              ? 260
              : element.mockupType === "iphone"
              ? 380
              : 280
            : 180;

        const newElement: CanvasElement = {
          ...element,
          id: uniqueId,
          x: 60 + (currentElements.length * 20) % 200,
          y: 80 + (currentElements.length * 20) % 150,
          width: defaultW,
          height: defaultH,
          zIndex: maxZ + 1,
        };

        set((state) => ({
          canvasElements: [...state.canvasElements, newElement],
          selectedCanvasElementId: uniqueId,
        }));

        return uniqueId;
      },

      addCanvasElementAtPosition: (element) => {
        const uniqueId = `${element.type}-${Date.now().toString().slice(-4)}`;
        const currentElements = get().canvasElements;
        const maxZ = currentElements.reduce((max, el) => Math.max(max, el.zIndex || 0), 0);

        const defaultW =
          element.type === "button"
            ? 160
            : element.type === "shape"
            ? 80
            : element.type === "mockup"
            ? element.mockupType === "macbook"
              ? 420
              : element.mockupType === "iphone"
              ? 220
              : 360
            : 300;

        const defaultH =
          element.type === "button"
            ? 44
            : element.type === "shape"
            ? 80
            : element.type === "mockup"
            ? element.mockupType === "macbook"
              ? 260
              : element.mockupType === "iphone"
              ? 380
              : 280
            : 180;

        const newElement: CanvasElement = {
          ...element,
          id: uniqueId,
          width: defaultW,
          height: defaultH,
          zIndex: maxZ + 1,
        };

        set((state) => ({
          canvasElements: [...state.canvasElements, newElement],
          selectedCanvasElementId: uniqueId,
        }));

        return uniqueId;
      },

      updateCanvasElement: (id, updates) => {
        set((state) => ({
          canvasElements: state.canvasElements.map((el) =>
            el.id === id ? { ...el, ...updates } : el
          ),
        }));
      },

      removeCanvasElement: (id) => {
        set((state) => ({
          canvasElements: state.canvasElements.filter((el) => el.id !== id),
          selectedCanvasElementId:
            state.selectedCanvasElementId === id ? null : state.selectedCanvasElementId,
        }));
      },

      duplicateCanvasElement: (id) => {
        const el = get().canvasElements.find((e) => e.id === id);
        if (!el) return;
        const newId = `${el.type}-${Date.now().toString().slice(-4)}`;
        const maxZ = get().canvasElements.reduce((max, item) => Math.max(max, item.zIndex || 0), 0);

        const duplicated: CanvasElement = {
          ...el,
          id: newId,
          x: el.x + 30,
          y: el.y + 30,
          zIndex: maxZ + 1,
        };

        set((state) => ({
          canvasElements: [...state.canvasElements, duplicated],
          selectedCanvasElementId: newId,
        }));
      },

      bringToFront: (id) => {
        const currentElements = get().canvasElements;
        const maxZ = currentElements.reduce((max, el) => Math.max(max, el.zIndex || 0), 0);
        set((state) => ({
          canvasElements: state.canvasElements.map((el) =>
            el.id === id ? { ...el, zIndex: maxZ + 1 } : el
          ),
        }));
      },

      sendToBack: (id) => {
        const currentElements = get().canvasElements;
        const minZ = currentElements.reduce((min, el) => Math.min(min, el.zIndex || 0), 1);
        set((state) => ({
          canvasElements: state.canvasElements.map((el) =>
            el.id === id ? { ...el, zIndex: Math.max(1, minZ - 1) } : el
          ),
        }));
      },

      toggleElementVisibility: (id) => {
        set((state) => ({
          canvasElements: state.canvasElements.map((el) =>
            el.id === id ? { ...el, isHidden: !el.isHidden } : el
          ),
        }));
      },

      clearAllCanvasElements: () => {
        set({ canvasElements: [], selectedCanvasElementId: null });
      },

      // Multi-Tab Mutators
      convertCardToMultiTab: (cardId) => {
        set((state) => ({
          canvasElements: state.canvasElements.map((el) => {
            if (el.id === cardId) {
              const initialTabs: PlainCardTab[] = [
                {
                  id: "tab-1",
                  label: "Vista 1",
                  title: el.title || "Título Pestaña 1",
                  subtitle: el.subtitle || "Descripción de la vista 1.",
                },
                {
                  id: "tab-2",
                  label: "Vista 2",
                  title: "Título Pestaña 2",
                  subtitle: "Especificaciones o detalles alternativos.",
                },
              ];
              return {
                ...el,
                isMultiTab: true,
                hideTabPills: false,
                activeTabId: "tab-1",
                tabStyle: "pills",
                tabs: initialTabs,
              };
            }
            return el;
          }),
        }));
      },

      toggleHideTabPills: (cardId) => {
        set((state) => ({
          canvasElements: state.canvasElements.map((el) =>
            el.id === cardId ? { ...el, hideTabPills: !el.hideTabPills } : el
          ),
        }));
      },

      addTabToCard: (cardId, tabLabel) => {
        set((state) => ({
          canvasElements: state.canvasElements.map((el) => {
            if (el.id === cardId) {
              const currentTabs = el.tabs || [];
              const newTabId = `tab-${currentTabs.length + 1}`;
              const newTab: PlainCardTab = {
                id: newTabId,
                label: tabLabel || `Vista ${currentTabs.length + 1}`,
                title: `Título Pestaña ${currentTabs.length + 1}`,
                subtitle: "Contenido personalizable de esta vista.",
              };
              return {
                ...el,
                isMultiTab: true,
                tabs: [...currentTabs, newTab],
                activeTabId: newTabId,
              };
            }
            return el;
          }),
        }));
      },

      removeTabFromCard: (cardId, tabId) => {
        set((state) => ({
          canvasElements: state.canvasElements.map((el) => {
            if (el.id === cardId && el.tabs) {
              const remainingTabs = el.tabs.filter((t) => t.id !== tabId);
              return {
                ...el,
                tabs: remainingTabs,
                activeTabId:
                  el.activeTabId === tabId
                    ? remainingTabs[0]?.id || undefined
                    : el.activeTabId,
              };
            }
            return el;
          }),
        }));
      },

      setActiveTabForCard: (cardId, tabId) => {
        set((state) => ({
          canvasElements: state.canvasElements.map((el) =>
            el.id === cardId ? { ...el, activeTabId: tabId } : el
          ),
        }));
      },

      updateCardTabContent: (cardId, tabId, updates) => {
        set((state) => ({
          canvasElements: state.canvasElements.map((el) => {
            if (el.id === cardId && el.tabs) {
              return {
                ...el,
                tabs: el.tabs.map((t) => (t.id === tabId ? { ...t, ...updates } : t)),
              };
            }
            return el;
          }),
        }));
      },

      setElementColorOverride: (id, colors) => {
        set((state) => ({
          canvasElements: state.canvasElements.map((el) =>
            el.id === id
              ? {
                  ...el,
                  customBg: colors.bg !== undefined ? colors.bg : el.customBg,
                  customBorder: colors.border !== undefined ? colors.border : el.customBorder,
                  customText: colors.text !== undefined ? colors.text : el.customText,
                  customAccent: colors.accent !== undefined ? colors.accent : el.customAccent,
                }
              : el
          ),
        }));
      },

      bindButtonAction: (buttonId, config) => {
        set((state) => ({
          buttonActionsMap: {
            ...state.buttonActionsMap,
            [buttonId]: config,
          },
          canvasElements: state.canvasElements.map((el) =>
            el.id === buttonId ? { ...el, actionConfig: config } : el
          ),
        }));
      },
    }),
    {
      name: "enfoco-studio-canvas-storage",
      storage: createJSONStorage(() => debouncedStorageEngine as any),
      partialize: (state) => ({
        canvasElements: state.canvasElements,
        buttonActionsMap: state.buttonActionsMap,
        zoomLevel: state.zoomLevel,
      }),
    }
  )
);
