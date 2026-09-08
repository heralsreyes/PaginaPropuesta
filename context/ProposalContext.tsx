"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProposalData, sampleProposal, Requirement, PaymentTerm, RoadmapPhase, TeamMember } from "@/data/proposalData";
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
  updateEnfocoResponsibilities: (items: string[]) => void;
  updateClientResponsibilities: (items: string[]) => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
  loadProposalByName: (slug: string) => Promise<boolean>;
  resetToDefault: () => void;
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
        bgMain: "#002B2E",
        accentColor: "#004F54",
        secondaryAccent: "#059669",
        cardBg: "#001E20",
        cardBorder: "#10B981",
        textPrimary: "#FFFFFF",
        textSecondary: "#D1FAE5",
        navBg: "#001E20",
        h1Color: "#FFFFFF",
        h2Color: "#34D399",
        textColor: "#D1FAE5",
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
    return null;
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

        // 2. Load proposal JSON dynamically if ?proposal=name parameter exists (Takes priority over LocalStorage)
        if (proposalParam) {
          const cleanParam = decodeURIComponent(proposalParam).trim().toLowerCase();
          const presetMatch = getPresetProposal(cleanParam);
          if (presetMatch) {
            clearEditableCache();
            setProposal(presetMatch);
            hydrateExtendedState(presetMatch);
            toast.success(`Cargada propuesta de ${presetMatch.client.name}`);
            setIsLoaded(true);
            return;
          }

          const dashed = cleanParam.replace(/[\s_]+/g, "-");
          const underscored = cleanParam.replace(/[\s-]+/g, "_");
          const candidates = [
            `/proposals/${cleanParam}.json`,
            `/proposals/${dashed}.json`,
            `/proposals/${underscored}.json`,
            `/proposals/propuesta_${underscored}_ENF-PROP-2026-08.json`,
          ];

          if (cleanParam.includes("ars") || cleanParam.includes("primera")) {
            candidates.unshift("/proposals/ars-primera.json");
          }
          if (cleanParam.includes("excel")) {
            candidates.unshift("/proposals/excel-puesto-de-bolsa.json");
          }

          for (const candidatePath of candidates) {
            try {
              const res = await fetch(candidatePath);
              if (res.ok) {
                const remoteJson = await res.json();
                const validation = validateProposalData(remoteJson);
                if (validation.success && validation.data) {
                  clearEditableCache();
                  setProposal(remoteJson);
                  hydrateExtendedState(remoteJson);
                  toast.success(`Cargada propuesta de ${remoteJson.client.name}`);
                  setIsLoaded(true);
                  return;
                } else {
                  console.warn(`[ProposalContext] Formato JSON inválido en ${candidatePath}:`, validation.error);
                }
              }
            } catch (err) {
              console.warn(`[ProposalContext] No se pudo cargar desde ${candidatePath}:`, err);
            }
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
    setProposal((prev) => ({
      ...prev,
      company: { ...prev.company, ...data },
    }));
  };

  // Update Client
  const updateClient = (data: Partial<ProposalData["client"]>) => {
    setProposal((prev) => ({
      ...prev,
      client: { ...prev.client, ...data },
    }));
  };

  // Update Project
  const updateProject = (data: Partial<ProposalData["project"]>) => {
    setProposal((prev) => ({
      ...prev,
      project: { ...prev.project, ...data },
    }));
  };

  // Update Budget (Recalculate total if subtotal, discount, or tax changes)
  const updateBudget = (data: Partial<ProposalData["budget"]>) => {
    setProposal((prev) => {
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
    setProposal((prev) => {
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
    setProposal((prev) => {
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
    setProposal((prev) => {
      const updated = [...prev.requirements];
      updated[index] = { ...updated[index], ...data };
      return { ...prev, requirements: updated };
    });
  };

  // Add Deliverable to a Requirement
  const addDeliverable = (reqIndex: number, deliverableText: string) => {
    if (!deliverableText.trim()) return;
    setProposal((prev) => {
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
    setProposal((prev) => {
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
    setProposal((prev) => {
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
    setProposal((prev) => {
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
    setProposal((prev) => {
      const updated = [...prev.roadmap];
      updated[index] = { ...updated[index], ...data };
      return { ...prev, roadmap: updated };
    });
  };

  // Add Milestone to a Phase
  const addMilestone = (phaseIndex: number, milestoneText: string) => {
    if (!milestoneText.trim()) return;
    setProposal((prev) => {
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
    setProposal((prev) => {
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
    setProposal((prev) => {
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
    setProposal((prev) => {
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
    setProposal((prev) => {
      const updated = [...prev.budget.paymentTerms];
      updated[index] = { ...updated[index], ...data };
      return {
        ...prev,
        budget: { ...prev.budget, paymentTerms: updated },
      };
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

      // Check preset proposals first (instant in-memory switch with brand colors)
      const presetMatch = getPresetProposal(cleanParam);
      if (presetMatch) {
        clearEditableCache();
        setProposal(presetMatch);
        hydrateExtendedState(presetMatch);
        if (typeof window !== "undefined") {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("proposal", dashed);
          window.history.pushState({}, "", newUrl.toString());
        }
        toast.success(`Cargada propuesta de ${presetMatch.client.name}`);
        return true;
      }

      const underscored = cleanParam.replace(/[\s-]+/g, "_");
      const candidates = [
        `/proposals/${cleanParam}.json`,
        `/proposals/${dashed}.json`,
        `/proposals/${underscored}.json`,
        `/proposals/propuesta_${underscored}_ENF-PROP-2026-08.json`,
      ];

      if (cleanParam.includes("ars") || cleanParam.includes("primera")) {
        candidates.unshift("/proposals/ars-primera.json");
      }
      if (cleanParam.includes("excel")) {
        candidates.unshift("/proposals/excel-puesto-de-bolsa.json");
      }

      for (const candidatePath of candidates) {
        try {
          const res = await fetch(candidatePath);
          if (res.ok) {
            const remoteJson = await res.json();
            const validation = validateProposalData(remoteJson);
            if (validation.success && validation.data) {
              clearEditableCache();
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
    setProposal((prev) => {
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
    setProposal((prev) => {
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

  // Update Responsibilities
  const updateEnfocoResponsibilities = (items: string[]) => {
    setProposal((prev) => ({
      ...prev,
      enfocoResponsibilities: items,
    }));
  };

  const updateClientResponsibilities = (items: string[]) => {
    setProposal((prev) => ({
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
        updateEnfocoResponsibilities,
        updateClientResponsibilities,
        exportJson,
        importJson,
        loadProposalByName,
        resetToDefault,
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
