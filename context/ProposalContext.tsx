"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProposalData, sampleProposal, Requirement, RequirementCategory, PaymentTerm, RoadmapPhase, TeamMember } from "@/data/proposalData";
import { useStudioStore, EXCEL_CUSTOM_SECTIONS, GENERIC_DEFAULT_SECTIONS, PageSection, CanvasElement, ButtonActionConfig } from "@/store/useStudioStore";
import { useThemeStore, PRESET_THEMES, ThemeConfig, applyCssVars } from "@/store/useThemeStore";
import { validateProposalData } from "@/lib/proposalValidation";
import { toast } from "sonner";

export type ExtendedProposalPayload = Partial<ProposalData> & {
  sections?: PageSection[];
  canvasElements?: CanvasElement[];
  buttonActionsMap?: Record<string, ButtonActionConfig>;
  theme?: ThemeConfig;
  colors?: Record<string, any>;
  editableFields?: Record<string, string>;
  editableColors?: Record<string, string>;
};

const LOCAL_STORAGE_KEY = "enfoco_proposal_data_v2";
const ADMIN_MODE_KEY = "enfoco_admin_mode";

interface ProposalContextType {
  proposal: ProposalData;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  toggleAdminMode: () => void;
  updateCompany: (data: Partial<ProposalData["company"]>) => void;
  updateClient: (data: Partial<ProposalData["client"]>) => void;
  updateProject: (data: Partial<ProposalData["project"]>) => void;
  updateBudget: (data: Partial<ProposalData["budget"]>) => void;
  addRequirement: (data?: Partial<Requirement>) => void;
  removeRequirement: (index: number) => void;
  updateRequirement: (index: number, data: Partial<Requirement>) => void;
  updateRequirementCategory: (oldCategory: string, newCategory: string) => void;
  removeRequirementCategory: (category: string) => void;
  addDeliverable: (reqIndex: number, deliverableText: string) => void;
  removeDeliverable: (reqIndex: number, delIndex: number) => void;
  addRoadmapPhase: (data?: Partial<RoadmapPhase>) => void;
  removeRoadmapPhase: (index: number) => void;
  updateRoadmapPhase: (index: number, data: Partial<RoadmapPhase>) => void;
  addMilestone: (phaseIndex: number, milestoneText: string) => void;
  removeMilestone: (phaseIndex: number, milestoneIndex: number) => void;
  addPaymentTerm: (data?: Partial<PaymentTerm>) => void;
  removePaymentTerm: (index: number) => void;
  updatePaymentTerm: (index: number, data: Partial<PaymentTerm>) => void;
  addTeamMember: (data?: Partial<TeamMember>) => void;
  removeTeamMember: (index: number) => void;
  updateTeamMember: (index: number, data: Partial<TeamMember>) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  updateEnfocoResponsibilities: (items: string[]) => void;
  updateClientResponsibilities: (items: string[]) => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
  loadProposalByName: (slug: string) => Promise<boolean>;
  resetToDefault: () => void;
  isSaving: boolean;
  lastSavedTime: string | null;
  currentSlug: string;
  setCurrentSlug: (slug: string) => void;
  saveProposalToServer: (targetSlug?: string) => Promise<{ success: boolean; message: string; filename?: string }>;
}

const clearEditableCache = () => {
  if (typeof window !== "undefined") {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("editable_")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      window.dispatchEvent(new Event("enfoco-reset-all"));
    } catch (e) {
      console.error("Error clearing editable cache:", e);
    }
  }
};

import { getPresetProposal } from "@/data/presetProposals";

/**
 * Normalizes theme and color definitions from any JSON payload (theme, colors, palette, themeConfig)
 * into a complete, valid ThemeConfig object. Falls back gracefully to known brand profiles or defaults.
 */
export function extractThemeFromPayload(data: ExtendedProposalPayload | any): ThemeConfig | null {
  if (!data || typeof data !== "object") return null;

  const defaultTheme = PRESET_THEMES[0].theme;

  const rawTheme = data.theme || data.themeConfig;
  const rawColors = data.colors || data.palette;

  // If neither theme nor colors is supplied, check known client branding
  if (!rawTheme && !rawColors) {
    const clientName = (
      data.client?.shortName ||
      data.client?.name ||
      data.project?.title ||
      data.project?.code ||
      ""
    ).toLowerCase();

    if (clientName.includes("ars") || clientName.includes("primera")) {
      return {
        bgMain: "#004988",
        accentColor: "#003057",
        secondaryAccent: "#FFB600",
        cardBg: "#FFFFFF",
        cardBorder: "#6ECEB2",
        textPrimary: "#FFFFFF",
        textSecondary: "#333333",
        navBg: "#003057",
        h1Color: "#FFFFFF",
        h2Color: "#00B189",
        textColor: "#333333",
        cardBorderRadius: "24px",
        aboutBg: "#D6E5DE",
        aboutCardBg: "#BFDAD1",
        aboutTextColor: "#135A34",
        aboutCardBorder: "#A6C5BB",
      };
    }
    if (clientName.includes("bhd")) {
      return PRESET_THEMES.find((t) => t.id === "emerald-forest")?.theme || defaultTheme;
    }
    if (clientName.includes("claro")) {
      return {
        bgMain: "#7F1D1D",
        accentColor: "#DC2626",
        secondaryAccent: "#F87171",
        cardBg: "#450A0A",
        cardBorder: "#EF4444",
        textPrimary: "#FEF2F2",
        textSecondary: "#FECACA",
        navBg: "#450A0A",
        h1Color: "#FEF2F2",
        h2Color: "#F87171",
        textColor: "#FECACA",
        cardBorderRadius: "24px",
        aboutBg: "#FEE2E2",
        aboutCardBg: "#FECACA",
        aboutTextColor: "#991B1B",
        aboutCardBorder: "#F87171",
      };
    }
    if (clientName.includes("cepm")) {
      return PRESET_THEMES.find((t) => t.id === "midnight-cyan")?.theme || defaultTheme;
    }
    if (clientName.includes("ramos")) {
      return PRESET_THEMES.find((t) => t.id === "royal-indigo")?.theme || defaultTheme;
    }
    if (clientName.includes("puntacana")) {
      return {
        bgMain: "#0B2545",
        accentColor: "#134074",
        secondaryAccent: "#EE6C4D",
        cardBg: "#1D2D44",
        cardBorder: "#EE6C4D",
        textPrimary: "#FFFFFF",
        textSecondary: "#8DA9C4",
        navBg: "#0B2545",
        h1Color: "#FFFFFF",
        h2Color: "#EE6C4D",
        textColor: "#8DA9C4",
        cardBorderRadius: "24px",
        aboutBg: "#EDF2F7",
        aboutCardBg: "#E2E8F0",
        aboutTextColor: "#0B2545",
        aboutCardBorder: "#CBD5E0",
      };
    }
    if (clientName.includes("excel")) {
      return PRESET_THEMES[0].theme;
    }
    return defaultTheme;
  }

  // Combine rawColors and rawTheme with rawTheme taking priority
  const source: Record<string, any> = {
    ...(typeof rawColors === "object" ? rawColors : {}),
    ...(typeof rawTheme === "object" ? rawTheme : {}),
  };

  const bgMain =
    source.bgMain ||
    source.background ||
    source.bg ||
    source.mainBg ||
    defaultTheme.bgMain;

  const accentColor =
    source.accentColor ||
    source.primary ||
    source.accent ||
    source.brand ||
    defaultTheme.accentColor;

  const secondaryAccent =
    source.secondaryAccent ||
    source.secondary ||
    source.accent2 ||
    source.gold ||
    source.highlight ||
    defaultTheme.secondaryAccent;

  const cardBg =
    source.cardBg ||
    source.card ||
    source.cardBackground ||
    defaultTheme.cardBg;

  const cardBorder =
    source.cardBorder ||
    source.border ||
    source.cardBorderColor ||
    secondaryAccent ||
    defaultTheme.cardBorder;

  const textPrimary =
    source.textPrimary ||
    source.text ||
    source.primaryText ||
    source.textColor ||
    defaultTheme.textPrimary;

  const textSecondary =
    source.textSecondary ||
    source.muted ||
    source.secondaryText ||
    defaultTheme.textSecondary;

  const navBg =
    source.navBg ||
    source.nav ||
    source.headerBg ||
    cardBg ||
    defaultTheme.navBg;

  return {
    bgMain,
    accentColor,
    secondaryAccent,
    cardBg,
    cardBorder,
    textPrimary,
    textSecondary,
    navBg,
    h1Color: source.h1Color || textPrimary,
    h2Color: source.h2Color || secondaryAccent,
    textColor: source.textColor || textSecondary,
    cardBorderRadius: source.cardBorderRadius || "24px",
    aboutBg: source.aboutBg || defaultTheme.aboutBg || "#D6E5DE",
    aboutCardBg: source.aboutCardBg || defaultTheme.aboutCardBg || "#BFDAD1",
    aboutTextColor: source.aboutTextColor || defaultTheme.aboutTextColor || "#135A34",
    aboutCardBorder: source.aboutCardBorder || defaultTheme.aboutCardBorder || "#A6C5BB",
  };
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export const ProposalProvider: React.FC<{ children: React.ReactNode; initialProposalSlug?: string }> = ({
  children,
  initialProposalSlug,
}) => {
  const initialPreset = getPresetProposal(initialProposalSlug);
  const [proposal, setProposal] = useState<ProposalData>(initialPreset || sampleProposal);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdmin, setIsAdminState] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [currentSlug, setCurrentSlug] = useState<string>(() => {
    if (initialProposalSlug) {
      return initialProposalSlug
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9_-]+/g, "-");
    }
    return "excel-puesto-de-bolsa";
  });

  // Undo / Redo History Stack (Up to 30 actions)
  const [history, setHistory] = useState<ProposalData[]>([]);
  const [future, setFuture] = useState<ProposalData[]>([]);

  const commitProposalUpdate = (updater: (prev: ProposalData) => ProposalData) => {
    setProposal((prev) => {
      const clonedPrev = JSON.parse(JSON.stringify(prev));
      setTimeout(() => {
        setHistory((prevH) => [...prevH.slice(-29), clonedPrev]);
        setFuture([]);
      }, 0);
      return updater(prev);
    });
  };

  const undo = () => {
    if (history.length === 0) {
      toast.info("No hay más acciones para deshacer.");
      return;
    }
    const previous = history[history.length - 1];
    setHistory((prevH) => prevH.slice(0, -1));
    setFuture((prevF) => [JSON.parse(JSON.stringify(proposal)), ...prevF.slice(0, 29)]);
    setProposal(previous);
    toast.success("↩️ Acción deshecha correctamente.");
  };

  const redo = () => {
    if (future.length === 0) {
      toast.info("No hay más acciones para rehacer.");
      return;
    }
    const next = future[0];
    setFuture((prevF) => prevF.slice(1));
    setHistory((prevH) => [...prevH.slice(-29), JSON.parse(JSON.stringify(proposal))]);
    setProposal(next);
    toast.success("↪️ Acción rehecha correctamente.");
  };

  // Load from LocalStorage & URL Params on mount
  useEffect(() => {
    async function initProposalData() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const proposalParam = urlParams.get("proposal") || urlParams.get("p");
        const adminParam = urlParams.get("admin") || urlParams.get("edit");
        const savedAdmin = localStorage.getItem(ADMIN_MODE_KEY);

        // 1. Check Admin Mode
        if (adminParam === "true" || adminParam === "1" || savedAdmin === "true") {
          setIsAdminState(true);
          localStorage.setItem(ADMIN_MODE_KEY, "true");
          useStudioStore.setState({ isDesignMode: true });
        }

        // Apply Default Theme only if not customized in localStorage
        const savedThemeStorage = localStorage.getItem("enfoco-theme-storage");
        if (!savedThemeStorage) {
          useThemeStore.getState().applyPreset(PRESET_THEMES[0].theme);
        } else {
          try {
            const parsedThemeStore = JSON.parse(savedThemeStorage);
            if (parsedThemeStore?.state?.theme) {
              applyCssVars(parsedThemeStore.state.theme);
            }
          } catch (e) {
            console.error("Error reading saved theme:", e);
          }
        }

        // 2. Load proposal JSON dynamically if ?proposal=name parameter exists
        if (proposalParam) {
          const cleanParam = decodeURIComponent(proposalParam).trim().toLowerCase();
          const dashed = cleanParam.replace(/[\s_]+/g, "-");

          // 2.1 Primero, intentar cargar el archivo guardado real desde /api/proposals
          try {
            const apiRes = await fetch(`/api/proposals?slug=${encodeURIComponent(dashed)}`);
            if (apiRes.ok) {
              const apiData = await apiRes.json();
              if (apiData.success && apiData.data) {
                const validation = validateProposalData(apiData.data);
                if (validation.success && validation.data) {
                  setCurrentSlug(dashed);
                  setProposal(apiData.data);
                  hydrateExtendedState(apiData.data);
                  toast.success(`Cargada propuesta guardada: ${apiData.data.client?.name || dashed}`);
                  setIsLoaded(true);
                  return;
                }
              }
            }
          } catch (apiErr) {
            console.warn("[ProposalContext] Error consultando /api/proposals:", apiErr);
          }

          // 2.2 Segundo, intentar cargar desde localStorage por slug
          const savedCustom =
            localStorage.getItem(`enfoco_proposal_${dashed}`) ||
            localStorage.getItem(`enfoco_proposal_${cleanParam}`);
          if (savedCustom) {
            try {
              const parsedCustom = JSON.parse(savedCustom);
              const valCustom = validateProposalData(parsedCustom);
              if (valCustom.success && valCustom.data) {
                setCurrentSlug(dashed);
                setProposal(parsedCustom);
                hydrateExtendedState(parsedCustom);
                toast.success(`Cargada propuesta de ${parsedCustom.client?.name || dashed}`);
                setIsLoaded(true);
                return;
              }
            } catch (err) {
              console.warn("Error leyendo propuesta desde localStorage:", err);
            }
          }

          // 2.3 Tercero, verificar rutas estáticas en /proposals/*.json
          const underscored = cleanParam.replace(/[\s-]+/g, "_");
          const candidates = [
            `/proposals/${cleanParam}.json`,
            `/proposals/${dashed}.json`,
            `/proposals/${underscored}.json`,
          ];

          for (const candidatePath of candidates) {
            try {
              const res = await fetch(candidatePath);
              if (res.ok) {
                const remoteJson = await res.json();
                const validation = validateProposalData(remoteJson);
                if (validation.success && validation.data) {
                  setCurrentSlug(dashed);
                  setProposal(remoteJson);
                  hydrateExtendedState(remoteJson);
                  toast.success(`Cargada propuesta de ${remoteJson.client.name || dashed}`);
                  setIsLoaded(true);
                  return;
                }
              }
            } catch (err) {
              console.warn(`[ProposalContext] No se pudo cargar desde ${candidatePath}:`, err);
            }
          }

          // 2.4 Cuarto, coincidencia exacta con plantilla institucional
          const presetExact = getPresetProposal(cleanParam, { allowFuzzy: false });
          if (presetExact) {
            setCurrentSlug(cleanParam);
            setProposal(presetExact);
            hydrateExtendedState(presetExact);
            toast.success(`Cargada plantilla: ${presetExact.client.name}`);
            setIsLoaded(true);
            return;
          }

          // 2.5 Quinto, coincidencia aproximada de plantilla (solo si es alias simple como 'ramos' o 'claro')
          const presetLoose = getPresetProposal(cleanParam, { allowFuzzy: true });
          if (presetLoose) {
            setCurrentSlug(cleanParam);
            setProposal(presetLoose);
            hydrateExtendedState(presetLoose);
            toast.success(`Cargada plantilla: ${presetLoose.client.name}`);
            setIsLoaded(true);
            return;
          }
        }

        // 3. Fallback to LocalStorage if no URL param was provided
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const validation = validateProposalData(parsed);
            if (validation.success && validation.data) {
              setProposal(parsed);
              hydrateExtendedState(parsed);
            } else {
              console.warn("[ProposalContext] LocalStorage con esquema inválido, usando sampleProposal:", validation.error);
              setProposal(sampleProposal);
              hydrateExtendedState(sampleProposal);
            }
          } catch (err) {
            console.error("Error reading saved proposal:", err);
            setProposal(sampleProposal);
            hydrateExtendedState(sampleProposal);
          }
        } else {
          setProposal(sampleProposal);
          hydrateExtendedState(sampleProposal);
        }
      } catch (e) {
        console.error("Error loading proposal data:", e);
      } finally {
        setIsLoaded(true);
      }
    }

    initProposalData();
  }, []);

  // Universal keyboard shortcuts to toggle Edit / Design Mode:
  // - Ctrl + Shift + E / Cmd + Shift + E
  // - Ctrl + E / Cmd + E
  // - Alt + E / Alt + D
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Undo: Ctrl+Z / Cmd+Z (without Shift)
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && key === "z") {
        e.preventDefault();
        e.stopPropagation();
        undo();
        return;
      }

      // Redo: Ctrl+Y / Cmd+Y or Ctrl+Shift+Z / Cmd+Shift+Z
      if (
        ((e.ctrlKey || e.metaKey) && key === "y") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && key === "z")
      ) {
        e.preventDefault();
        e.stopPropagation();
        redo();
        return;
      }

      const isEditShortcut =
        ((e.ctrlKey || e.metaKey) && e.shiftKey && key === "e") ||
        (e.altKey && (key === "e" || key === "d")) ||
        ((e.ctrlKey || e.metaKey) && key === "e");

      if (isEditShortcut) {
        e.preventDefault();
        e.stopPropagation();
        toggleAdminMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Save proposal to LocalStorage whenever proposal changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(proposal));
      } catch (e) {
        console.error("Error saving proposal data to localStorage:", e);
      }
    }
  }, [proposal, isLoaded]);

  // Auto-Repair: Detect if requirements contain duplicate corruptions (e.g. all modules sharing the same ID/title)
  useEffect(() => {
    if (!isLoaded || !proposal?.requirements || proposal.requirements.length <= 1) return;
    const reqs = proposal.requirements;
    const allSameId = reqs.every((r) => r.id === reqs[0].id);
    const allSameTitle = reqs.every((r) => r.title === reqs[0].title);

    if (allSameId || allSameTitle) {
      console.warn("[ProposalContext] Módulos duplicados detectados, restaurando requerimientos originales...");
      const clientStr = (proposal.client?.name || proposal.client?.shortName || proposal.project?.title || "").toLowerCase();
      let fallbackReqs = sampleProposal.requirements;
      const preset = getPresetProposal(clientStr);
      if (preset?.requirements && preset.requirements.length > 0) {
        fallbackReqs = preset.requirements;
      }

      const cloned = JSON.parse(JSON.stringify(fallbackReqs));
      setProposal((prev) => ({
        ...prev,
        requirements: cloned,
      }));
      toast.info("Se han reparado y restaurado los módulos de alcance.");
    }
  }, [proposal?.requirements, isLoaded, proposal?.client?.name]);

  const setIsAdmin = (val: boolean) => {
    setIsAdminState(val);
    localStorage.setItem(ADMIN_MODE_KEY, String(val));
    useStudioStore.setState({ isDesignMode: val, isPanelOpen: true });
  };

  const toggleAdminMode = () => {
    useStudioStore.getState().toggleDesignMode();
    const next = useStudioStore.getState().isDesignMode;
    setIsAdminState(next);
    if (next) {
      toast.success("🎨 Modo Edición / Design Studio Activado");
    } else {
      toast.info("👁️ Modo Vista Ejecutiva Cliente Activado");
    }
  };

  // Update Company
  const updateCompany = (data: Partial<ProposalData["company"]>) => {
    commitProposalUpdate((prev) => ({
      ...prev,
      company: { ...prev.company, ...data },
    }));
  };

  // Update Client
  const updateClient = (data: Partial<ProposalData["client"]>) => {
    commitProposalUpdate((prev) => ({
      ...prev,
      client: { ...prev.client, ...data },
    }));
  };

  // Update Project
  const updateProject = (data: Partial<ProposalData["project"]>) => {
    commitProposalUpdate((prev) => ({
      ...prev,
      project: { ...prev.project, ...data },
    }));
  };

  // Update Budget (Recalculate total if subtotal, discount, or tax changes)
  const updateBudget = (data: Partial<ProposalData["budget"]>) => {
    commitProposalUpdate((prev) => {
      const newAmountWithoutTax = data.amountWithoutTax !== undefined ? data.amountWithoutTax : prev.budget.amountWithoutTax;
      const hasTax = data.hasTax !== undefined ? data.hasTax : (prev.budget.hasTax !== undefined ? prev.budget.hasTax : true);
      const taxPercent = data.taxPercent !== undefined ? data.taxPercent : (prev.budget.taxPercent !== undefined ? prev.budget.taxPercent : 18);
      const hasDiscount = data.hasDiscount !== undefined ? data.hasDiscount : (prev.budget.hasDiscount !== undefined ? prev.budget.hasDiscount : false);
      const discountValue = data.discountValue !== undefined ? data.discountValue : (prev.budget.discountValue !== undefined ? prev.budget.discountValue : 0);
      const discountType = data.discountType !== undefined ? data.discountType : (prev.budget.discountType !== undefined ? prev.budget.discountType : "fixed");

      // Descuento
      const isPercent = (discountType as string) === "percent" || (discountType as string) === "percentage";
      const discountAmount = hasDiscount
        ? isPercent
          ? newAmountWithoutTax * (discountValue / 100)
          : discountValue
        : 0;

      const netBase = Math.max(0, newAmountWithoutTax - discountAmount);
      const newTaxAmount = hasTax ? netBase * (taxPercent / 100) : 0;
      const newTotalAmount = netBase + newTaxAmount;

      return {
        ...prev,
        budget: {
          ...prev.budget,
          ...data,
          amountWithoutTax: newAmountWithoutTax,
          hasTax,
          taxPercent,
          hasDiscount,
          discountValue,
          discountType,
          taxAmount: newTaxAmount,
          totalAmount: newTotalAmount,
        },
      };
    });
  };

  // Add Requirement (Unlimited)
  const addRequirement = (data?: Partial<Requirement>) => {
    commitProposalUpdate((prev) => {
      const nextNum = prev.requirements.length + 1;
      const id = data?.id || `REQ-${nextNum < 10 ? "0" + nextNum : nextNum}`;
      const newReq: Requirement = {
        id,
        category: data?.category || "Core",
        title: data?.title || `Nuevo Módulo de Requerimiento ${nextNum}`,
        description: data?.description || "Descripción detallada de la nueva funcionalidad requerida por el cliente.",
        deliverables: data?.deliverables || ["Entregable 1", "Entregable 2"],
      };

      return {
        ...prev,
        requirements: [...prev.requirements, newReq],
      };
    });
    toast.success("Nuevo requerimiento añadido.");
  };

  // Remove Requirement
  const removeRequirement = (index: number) => {
    commitProposalUpdate((prev) => {
      if (prev.requirements.length <= 1) {
        toast.error("Debe existir al menos 1 requerimiento.");
        return prev;
      }
      const newReqs = prev.requirements.filter((_, i) => i !== index);
      const reindexed = newReqs.map((r, idx) => ({
        ...r,
        id: `REQ-${idx + 1 < 10 ? "0" + (idx + 1) : idx + 1}`,
      }));
      return {
        ...prev,
        requirements: reindexed,
      };
    });
    toast.info("Requerimiento eliminado.");
  };

  // Update Requirement
  const updateRequirement = (index: number, data: Partial<Requirement>) => {
    commitProposalUpdate((prev) => {
      const updated = [...prev.requirements];
      updated[index] = { ...updated[index], ...data };
      return { ...prev, requirements: updated };
    });
  };

  // Update all requirements with an old category name to a new category name
  const updateRequirementCategory = (oldCategory: string, newCategory: string) => {
    const trimmed = newCategory.trim();
    if (!trimmed || oldCategory === trimmed) return;
    commitProposalUpdate((prev) => {
      const updated = prev.requirements.map((r) =>
        r.category === oldCategory ? { ...r, category: trimmed as RequirementCategory } : r
      );
      return { ...prev, requirements: updated };
    });
  };

  // Remove all requirements of a category
  const removeRequirementCategory = (catToRemove: string) => {
    commitProposalUpdate((prev) => {
      const updated = prev.requirements.filter((r) => r.category !== catToRemove);
      if (updated.length === 0) {
        toast.error("No se puede eliminar la última categoría con todos los módulos.");
        return prev;
      }
      return { ...prev, requirements: updated };
    });
  };

  // Add Deliverable to a Requirement
  const addDeliverable = (reqIndex: number, deliverableText: string) => {
    if (!deliverableText.trim()) return;
    commitProposalUpdate((prev) => {
      const updated = [...prev.requirements];
      const currentDels = updated[reqIndex].deliverables;
      updated[reqIndex] = {
        ...updated[reqIndex],
        deliverables: [...currentDels, deliverableText.trim()],
      };
      return { ...prev, requirements: updated };
    });
  };

  // Remove Deliverable from a Requirement
  const removeDeliverable = (reqIndex: number, delIndex: number) => {
    commitProposalUpdate((prev) => {
      const updated = [...prev.requirements];
      const currentDels = updated[reqIndex].deliverables;
      if (currentDels.length <= 1) {
        toast.error("Cada módulo debe tener al menos 1 entregable.");
        return prev;
      }
      updated[reqIndex] = {
        ...updated[reqIndex],
        deliverables: currentDels.filter((_, i) => i !== delIndex),
      };
      return { ...prev, requirements: updated };
    });
  };

  // Add Roadmap Phase
  const addRoadmapPhase = (data?: Partial<RoadmapPhase>) => {
    commitProposalUpdate((prev) => {
      const nextNum = prev.roadmap.length + 1;
      const newPhase: RoadmapPhase = {
        phase: data?.phase || `Fase ${nextNum}`,
        title: data?.title || `Nueva Fase EDT ${nextNum}`,
        duration: data?.duration || `Semanas ${nextNum * 2 - 1} - ${nextNum * 2}`,
        description: data?.description || "Descripción de las actividades planificadas para esta fase del proyecto.",
        status: data?.status || "Pendiente",
        milestones: data?.milestones || ["Hito Clave 1", "Hito Clave 2"],
      };
      return {
        ...prev,
        roadmap: [...prev.roadmap, newPhase],
      };
    });
    toast.success("Nueva fase del cronograma añadida.");
  };

  // Remove Roadmap Phase
  const removeRoadmapPhase = (index: number) => {
    commitProposalUpdate((prev) => {
      if (prev.roadmap.length <= 1) {
        toast.error("Debe existir al menos 1 fase en el cronograma.");
        return prev;
      }
      const newRoadmap = prev.roadmap.filter((_, i) => i !== index);
      return {
        ...prev,
        roadmap: newRoadmap,
      };
    });
    toast.info("Fase eliminada del cronograma.");
  };

  // Update Roadmap Phase
  const updateRoadmapPhase = (index: number, data: Partial<RoadmapPhase>) => {
    commitProposalUpdate((prev) => {
      const updated = [...prev.roadmap];
      updated[index] = { ...updated[index], ...data };
      return { ...prev, roadmap: updated };
    });
  };

  // Add Milestone to a Phase
  const addMilestone = (phaseIndex: number, milestoneText: string) => {
    if (!milestoneText.trim()) return;
    commitProposalUpdate((prev) => {
      const updated = [...prev.roadmap];
      const currentMilestones = updated[phaseIndex].milestones;
      updated[phaseIndex] = {
        ...updated[phaseIndex],
        milestones: [...currentMilestones, milestoneText.trim()],
      };
      return { ...prev, roadmap: updated };
    });
  };

  // Remove Milestone from a Phase
  const removeMilestone = (phaseIndex: number, milestoneIndex: number) => {
    commitProposalUpdate((prev) => {
      const updated = [...prev.roadmap];
      const currentMilestones = updated[phaseIndex].milestones;
      if (currentMilestones.length <= 1) {
        toast.error("Cada fase debe tener al menos 1 hito clave.");
        return prev;
      }
      updated[phaseIndex] = {
        ...updated[phaseIndex],
        milestones: currentMilestones.filter((_, i) => i !== milestoneIndex),
      };
      return { ...prev, roadmap: updated };
    });
  };

  // Add Payment Term
  const addPaymentTerm = (data?: Partial<PaymentTerm>) => {
    commitProposalUpdate((prev) => {
      const newTerm: PaymentTerm = {
        milestone: data?.milestone || "Nuevo Hito de Pago",
        percentage: data?.percentage || 10,
        description: data?.description || "Descripción de la entrega de hito.",
      };
      return {
        ...prev,
        budget: {
          ...prev.budget,
          paymentTerms: [...prev.budget.paymentTerms, newTerm],
        },
      };
    });
  };

  // Remove Payment Term
  const removePaymentTerm = (index: number) => {
    commitProposalUpdate((prev) => {
      if (prev.budget.paymentTerms.length <= 1) {
        toast.error("Debe existir al menos 1 hito de pago.");
        return prev;
      }
      const newTerms = prev.budget.paymentTerms.filter((_, i) => i !== index);
      return {
        ...prev,
        budget: { ...prev.budget, paymentTerms: newTerms },
      };
    });
  };

  // Update Payment Term
  const updatePaymentTerm = (index: number, data: Partial<PaymentTerm>) => {
    commitProposalUpdate((prev) => {
      const updated = [...prev.budget.paymentTerms];
      updated[index] = { ...updated[index], ...data };
      return { ...prev, budget: { ...prev.budget, paymentTerms: updated } };
    });
  };

  // Helper to hydrate Design Studio stores from imported JSON
  const hydrateExtendedState = (data: ExtendedProposalPayload) => {
    if (!data || typeof data !== "object") return;

    const clientName = (data.client?.name || "").toUpperCase();
    const clientShortName = (data.client?.shortName || "").toUpperCase();
    const projectCode = (data.project?.code || "").toUpperCase();
    const projectTitle = (data.project?.title || "").toLowerCase();

    const isExcel =
      clientShortName === "EXCEL" ||
      clientName.includes("EXCEL") ||
      projectCode.includes("EXCEL") ||
      projectTitle.includes("excel");

    if (data.sections && Array.isArray(data.sections) && data.sections.length > 0) {
      useStudioStore.setState({ sections: data.sections });
    } else if (isExcel) {
      useStudioStore.setState({ sections: EXCEL_CUSTOM_SECTIONS });
    } else {
      useStudioStore.setState({ sections: GENERIC_DEFAULT_SECTIONS });
    }

    if (data.canvasElements && Array.isArray(data.canvasElements)) {
      useStudioStore.setState({ canvasElements: data.canvasElements });
    } else {
      useStudioStore.setState({ canvasElements: [] });
    }
    if (data.buttonActionsMap && typeof data.buttonActionsMap === "object") {
      useStudioStore.setState({ buttonActionsMap: data.buttonActionsMap });
    } else {
      useStudioStore.setState({ buttonActionsMap: {} });
    }
    // Theme & Colors extraction and application
    const extractedTheme = extractThemeFromPayload(data);
    if (extractedTheme) {
      useThemeStore.getState().applyPreset(extractedTheme);
      applyCssVars(extractedTheme);
      try {
        localStorage.setItem(
          "enfoco-theme-storage",
          JSON.stringify({ state: { theme: extractedTheme }, version: 0 })
        );
      } catch (err) {
        console.warn("Could not save theme to localStorage:", err);
      }
    }

    // Sincronizar campos de texto y colores editables
    if (typeof window !== "undefined") {
      // Clear previous proposal's cached editable texts and colors to prevent cross-proposal bleeding
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith("editable_") || k.startsWith("scope_todos_label"))) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));

      if (data.editableFields && typeof data.editableFields === "object") {
        Object.entries(data.editableFields).forEach(([id, text]) => {
          if (text !== undefined && text !== null) {
            localStorage.setItem(`editable_${id}`, text as string);
          }
        });
      }
      if (data.editableColors && typeof data.editableColors === "object") {
        Object.entries(data.editableColors).forEach(([id, color]) => {
          if (color) {
            localStorage.setItem(`editable_color_${id}`, color as string);
          }
        });
      }
      window.dispatchEvent(new Event("enfoco-sync-editables"));
    }
  };

  // Export JSON File
  const exportJson = () => {
    const studioState = useStudioStore.getState();
    const themeState = useThemeStore.getState();
    const currentTheme = themeState.theme;

    const fullProposalData = {
      ...proposal,
      sections: studioState.sections,
      canvasElements: studioState.canvasElements,
      buttonActionsMap: studioState.buttonActionsMap,
      theme: currentTheme,
      colors: {
        primary: currentTheme.accentColor,
        secondary: currentTheme.secondaryAccent,
        background: currentTheme.bgMain,
        card: currentTheme.cardBg,
        border: currentTheme.cardBorder,
        text: currentTheme.textPrimary,
        textSecondary: currentTheme.textSecondary,
        nav: currentTheme.navBg,
        h1: currentTheme.h1Color || currentTheme.textPrimary,
        h2: currentTheme.h2Color || currentTheme.secondaryAccent,
      },
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullProposalData, null, 2));
    const downloadAnchor = document.createElement("a");
    const safeClient = (proposal.client.shortName || "cliente").toLowerCase().replace(/[^a-z0-9]/gi, "_");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `propuesta_${safeClient}_${proposal.project.code}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Archivo JSON de la propuesta descargado con temas y colores.");
  };

  // Save Proposal Directly to Server / Vercel API without downloading
  const saveProposalToServer = async (
    targetSlug?: string
  ): Promise<{ success: boolean; message: string; filename?: string }> => {
    setIsSaving(true);
    try {
      const studioState = useStudioStore.getState();
      const themeState = useThemeStore.getState();
      const currentTheme = themeState.theme;

      const rawSlug =
        targetSlug ||
        currentSlug ||
        proposal.client?.shortName ||
        proposal.client?.name ||
        proposal.project?.code ||
        "propuesta";

      const slugToUse = rawSlug
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // Recolectar textos y colores editados en vivo
      const editableFields: Record<string, string> = {};
      const editableColors: Record<string, string> = {};
      if (typeof window !== "undefined") {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k?.startsWith("editable_color_")) {
            const fieldId = k.replace("editable_color_", "");
            const val = localStorage.getItem(k);
            if (val) editableColors[fieldId] = val;
          } else if (k?.startsWith("editable_")) {
            const fieldId = k.replace("editable_", "");
            const val = localStorage.getItem(k);
            if (val !== null) editableFields[fieldId] = val;
          }
        }
      }

      const fullProposalData = {
        ...proposal,
        sections: studioState.sections,
        canvasElements: studioState.canvasElements,
        buttonActionsMap: studioState.buttonActionsMap,
        theme: currentTheme,
        colors: {
          primary: currentTheme.accentColor,
          secondary: currentTheme.secondaryAccent,
          background: currentTheme.bgMain,
          card: currentTheme.cardBg,
          border: currentTheme.cardBorder,
          text: currentTheme.textPrimary,
          textSecondary: currentTheme.textSecondary,
          nav: currentTheme.navBg,
          h1: currentTheme.h1Color || currentTheme.textPrimary,
          h2: currentTheme.h2Color || currentTheme.secondaryAccent,
        },
        editableFields,
        editableColors,
      };

      // 1. Guardar en localStorage inmediatamente para persistencia cliente
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fullProposalData));
          localStorage.setItem(`enfoco_proposal_${slugToUse}`, JSON.stringify(fullProposalData));
        } catch (storageErr) {
          console.warn("[ProposalContext] Advertencia de localStorage:", storageErr);
        }
      }

      // 2. Enviar a endpoint de servidor /api/proposals
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: slugToUse,
          proposal,
          theme: currentTheme,
          colors: fullProposalData.colors,
          sections: studioState.sections,
          canvasElements: studioState.canvasElements,
          buttonActionsMap: studioState.buttonActionsMap,
          editableFields,
          editableColors,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || "No se pudo guardar la propuesta en el servidor");
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLastSavedTime(timeStr);
      setCurrentSlug(slugToUse);

      // Actualizar URL sin recargar la página
      if (typeof window !== "undefined") {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("proposal", slugToUse);
        window.history.replaceState({}, "", newUrl.toString());
      }

      toast.success(`💾 Propuesta guardada con éxito en el servidor (${resData.filename || slugToUse + '.json'})`);
      return { success: true, message: resData.message, filename: resData.filename };
    } catch (err: any) {
      console.error("Error guardando propuesta en servidor:", err);
      toast.error(`Error al guardar en el servidor: ${err.message}`);
      return { success: false, message: err.message };
    } finally {
      setIsSaving(false);
    }
  };

  // Import JSON File
  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      const validation = validateProposalData(parsed);
      if (!validation.success) {
        toast.error(`Estructura JSON inválida: ${validation.error || "Campos requeridos faltantes"}`);
        return false;
      }
      clearEditableCache();
      setProposal(parsed);
      hydrateExtendedState(parsed);
      toast.success(`Propuesta de ${parsed.client?.name || "cliente"} cargada con éxito.`);
      return true;
    } catch (e) {
      toast.error("Error al procesar el archivo JSON. Formato no válido.");
      return false;
    }
  };

  // Quick Load Proposal by slug / client name
  const loadProposalByName = async (slug: string): Promise<boolean> => {
    try {
      const cleanParam = decodeURIComponent(slug).trim().toLowerCase();
      const dashed = cleanParam.replace(/[\s_]+/g, "-");

      // 1. Primero intentar cargar el archivo guardado real desde /api/proposals
      try {
        const apiRes = await fetch(`/api/proposals?slug=${encodeURIComponent(dashed)}`);
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (apiData.success && apiData.data) {
            const validation = validateProposalData(apiData.data);
            if (validation.success && validation.data) {
              setCurrentSlug(dashed);
              setProposal(apiData.data);
              hydrateExtendedState(apiData.data);
              if (typeof window !== "undefined") {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("proposal", dashed);
                window.history.pushState({}, "", newUrl.toString());
              }
              toast.success(`Cargada propuesta guardada: ${apiData.data.client?.name || dashed}`);
              return true;
            }
          }
        }
      } catch (err) {
        console.warn("[ProposalContext] Error al consultar API en loadProposalByName:", err);
      }

      // 2. Segundo, intentar cargar desde localStorage por slug
      const savedCustom =
        localStorage.getItem(`enfoco_proposal_${dashed}`) ||
        localStorage.getItem(`enfoco_proposal_${cleanParam}`);
      if (savedCustom) {
        try {
          const parsedCustom = JSON.parse(savedCustom);
          const valCustom = validateProposalData(parsedCustom);
          if (valCustom.success && valCustom.data) {
            setCurrentSlug(dashed);
            setProposal(parsedCustom);
            hydrateExtendedState(parsedCustom);
            if (typeof window !== "undefined") {
              const newUrl = new URL(window.location.href);
              newUrl.searchParams.set("proposal", dashed);
              window.history.pushState({}, "", newUrl.toString());
            }
            toast.success(`Cargada propuesta de ${parsedCustom.client?.name || dashed}`);
            return true;
          }
        } catch (err) {
          console.warn("Error leyendo propuesta desde localStorage:", err);
        }
      }

      // 3. Tercero, coincidencia exacta con plantilla institucional
      const presetExact = getPresetProposal(cleanParam, { allowFuzzy: false });
      if (presetExact) {
        setCurrentSlug(dashed);
        setProposal(presetExact);
        hydrateExtendedState(presetExact);
        if (typeof window !== "undefined") {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("proposal", dashed);
          window.history.pushState({}, "", newUrl.toString());
        }
        toast.success(`Cargada plantilla: ${presetExact.client.name}`);
        return true;
      }

      // 4. Cuarto, rutas estáticas en /proposals/*.json
      const underscored = cleanParam.replace(/[\s-]+/g, "_");
      const candidates = [
        `/proposals/${cleanParam}.json`,
        `/proposals/${dashed}.json`,
        `/proposals/${underscored}.json`,
      ];

      for (const candidatePath of candidates) {
        try {
          const res = await fetch(candidatePath);
          if (res.ok) {
            const remoteJson = await res.json();
            const validation = validateProposalData(remoteJson);
            if (validation.success && validation.data) {
              setCurrentSlug(dashed);
              setProposal(remoteJson);
              hydrateExtendedState(remoteJson);
              if (typeof window !== "undefined") {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("proposal", dashed);
                window.history.pushState({}, "", newUrl.toString());
              }
              toast.success(`Cargada propuesta de ${remoteJson.client.name}`);
              return true;
            }
          }
        } catch (err) {
          console.warn(`[ProposalContext] No se pudo cargar desde ${candidatePath}:`, err);
        }
      }

      // 5. Quinto, fallback con coincidencia aproximada
      const presetLoose = getPresetProposal(cleanParam, { allowFuzzy: true });
      if (presetLoose) {
        setCurrentSlug(dashed);
        setProposal(presetLoose);
        hydrateExtendedState(presetLoose);
        if (typeof window !== "undefined") {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("proposal", dashed);
          window.history.pushState({}, "", newUrl.toString());
        }
        toast.success(`Cargada plantilla: ${presetLoose.client.name}`);
        return true;
      }

      toast.error(`No se encontró la propuesta '${slug}'`);
      return false;
    } catch (e) {
      console.error("Error cargando propuesta:", e);
      return false;
    }
  };

  // Reset to Default Sample Proposal
  const resetToDefault = () => {
    if (typeof window !== "undefined") {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key &&
            (key.startsWith("editable_") ||
              key.startsWith("enfoco_") ||
              key.includes("studio") ||
              key.includes("theme"))
          ) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      } catch (err) {
        console.error("Error clearing localStorage on reset:", err);
      }
    }

    setProposal(sampleProposal);
    useStudioStore.getState().resetSections();
    useStudioStore.getState().clearAllCanvasElements();
    useThemeStore.getState().resetTheme();
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("enfoco-reset-all"));
    }

    toast.success("Propuesta, textos y configuración de diseño restablecidos al estado inicial.");
  };

  // Team Member Mutators
  const addTeamMember = (data?: Partial<TeamMember>) => {
    commitProposalUpdate((prev) => {
      const newMember: TeamMember = {
        role: data?.role || "Especialista Adjunto",
        category: data?.category || "Construcción",
        dedicationPercent: data?.dedicationPercent || 50,
        responsibilities: data?.responsibilities || ["Apoyo en ejecución técnica y entregables."],
        iconName: data?.iconName || "UserCheck",
      };
      return {
        ...prev,
        team: [...prev.team, newMember],
      };
    });
    toast.success("Nuevo miembro del equipo añadido.");
  };

  const removeTeamMember = (index: number) => {
    commitProposalUpdate((prev) => {
      if (prev.team.length <= 1) {
        toast.error("Debe haber al menos 1 miembro del equipo.");
        return prev;
      }
      return {
        ...prev,
        team: prev.team.filter((_, i) => i !== index),
      };
    });
    toast.info("Miembro eliminado del equipo.");
  };

  const updateTeamMember = (index: number, data: Partial<TeamMember>) => {
    commitProposalUpdate((prev) => {
      const updated = [...prev.team];
      updated[index] = { ...updated[index], ...data };
      return { ...prev, team: updated };
    });
  };

  // Update Responsibilities
  const updateEnfocoResponsibilities = (items: string[]) => {
    commitProposalUpdate((prev) => ({
      ...prev,
      enfocoResponsibilities: items,
    }));
  };

  const updateClientResponsibilities = (items: string[]) => {
    commitProposalUpdate((prev) => ({
      ...prev,
      clientResponsibilities: items,
    }));
  };

  return (
    <ProposalContext.Provider
      value={{
        proposal,
        isAdmin,
        setIsAdmin,
        toggleAdminMode,
        updateCompany,
        updateClient,
        updateProject,
        updateBudget,
        addRequirement,
        removeRequirement,
        updateRequirement,
        updateRequirementCategory,
        removeRequirementCategory,
        addDeliverable,
        removeDeliverable,
        addRoadmapPhase,
        removeRoadmapPhase,
        updateRoadmapPhase,
        addMilestone,
        removeMilestone,
        addPaymentTerm,
        removePaymentTerm,
        updatePaymentTerm,
        addTeamMember,
        removeTeamMember,
        updateTeamMember,
        undo,
        redo,
        canUndo: history.length > 0,
        canRedo: future.length > 0,
        updateEnfocoResponsibilities,
        updateClientResponsibilities,
        exportJson,
        importJson,
        loadProposalByName,
        resetToDefault,
        isSaving,
        lastSavedTime,
        currentSlug,
        setCurrentSlug,
        saveProposalToServer,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposal = () => {
  const context = useContext(ProposalContext);
  if (!context) {
    throw new Error("useProposal debe ser utilizado dentro de un ProposalProvider");
  }
  return context;
};
