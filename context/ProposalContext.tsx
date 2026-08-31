"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProposalData, sampleProposal, Requirement, PaymentTerm, RoadmapPhase, TeamMember } from "@/data/proposalData";
import { useStudioStore, EXCEL_CUSTOM_SECTIONS } from "@/store/useStudioStore";
import { useThemeStore, PRESET_THEMES } from "@/store/useThemeStore";
import { toast } from "sonner";

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
  resetToDefault: () => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export const ProposalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [proposal, setProposal] = useState<ProposalData>(sampleProposal);
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
        }

        // Apply Default Theme only if not customized
        if (!localStorage.getItem("enfoco-theme-storage")) {
          useThemeStore.getState().applyPreset(PRESET_THEMES[0].theme);
        }

        // 2. Load proposal JSON dynamically if ?proposal=name parameter exists (Takes priority over LocalStorage)
        if (proposalParam) {
          const cleanParam = proposalParam.trim().toLowerCase();
          const candidates = [
            `/proposals/${cleanParam}.json`,
            `/proposals/${cleanParam.replace(/_/g, "-")}.json`,
            `/proposals/${cleanParam.replace(/-/g, "_")}.json`,
            `/proposals/propuesta_${cleanParam.replace(/-/g, "_")}_ENF-PROP-2026-08.json`,
          ];

          for (const candidatePath of candidates) {
            try {
              const res = await fetch(candidatePath);
              if (res.ok) {
                const remoteJson = await res.json();
                setProposal(remoteJson);
                hydrateExtendedState(remoteJson);
                toast.success(`Cargada propuesta de ${remoteJson.client.name}`);
                setIsLoaded(true);
                return;
              }
            } catch (err) {
              // Try next candidate
            }
          }
        }

        // 3. Fallback to LocalStorage if no URL param was provided
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (!proposalParam && parsed.client?.shortName?.toUpperCase() === "EXCEL") {
            setProposal(sampleProposal);
            hydrateExtendedState(sampleProposal);
          } else {
            setProposal(parsed);
            hydrateExtendedState(parsed);
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

  // Keyboard shortcut Ctrl + Shift + E (or Cmd + Shift + E) to toggle Admin Mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setIsAdminState((prev) => {
          const next = !prev;
          localStorage.setItem(ADMIN_MODE_KEY, String(next));
          if (next) {
            toast.success("🔐 Modo Editor Activado (ENFOCO)");
          } else {
            toast.info("👁️ Modo Vista Cliente Final Activado");
          }
          return next;
        });
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
  };

  const toggleAdminMode = () => {
    setIsAdminState((prev) => {
      const next = !prev;
      localStorage.setItem(ADMIN_MODE_KEY, String(next));
      return next;
    });
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
  const hydrateExtendedState = (data: any) => {
    const isExcel =
      data.client?.shortName?.toUpperCase() === "EXCEL" ||
      data.project?.code?.includes("EXCEL") ||
      data.project?.title?.toLowerCase().includes("excel");

    if (data.sections && Array.isArray(data.sections) && data.sections.length > 0) {
      useStudioStore.setState({ sections: data.sections });
    } else if (isExcel) {
      useStudioStore.setState({ sections: EXCEL_CUSTOM_SECTIONS });
    }

    if (data.canvasElements && Array.isArray(data.canvasElements)) {
      useStudioStore.setState({ canvasElements: data.canvasElements });
    }
    if (data.buttonActionsMap && typeof data.buttonActionsMap === "object") {
      useStudioStore.setState({ buttonActionsMap: data.buttonActionsMap });
    }
    if (data.theme) {
      useThemeStore.getState().applyPreset(data.theme);
    } else if (isExcel) {
      useThemeStore.getState().applyPreset(PRESET_THEMES[2].theme);
    }
  };

  // Export JSON File
  const exportJson = () => {
    const studioState = useStudioStore.getState();
    const themeState = useThemeStore.getState();
    const fullProposalData = {
      ...proposal,
      sections: studioState.sections,
      canvasElements: studioState.canvasElements,
      buttonActionsMap: studioState.buttonActionsMap,
      theme: themeState.theme,
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullProposalData, null, 2));
    const downloadAnchor = document.createElement("a");
    const safeClient = (proposal.client.shortName || "cliente").toLowerCase().replace(/[^a-z0-9]/gi, "_");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `propuesta_${safeClient}_${proposal.project.code}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success("Archivo JSON de la propuesta descargado.");
  };

  // Import JSON File
  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.client || !parsed.project || !parsed.requirements) {
        toast.error("El archivo JSON no tiene la estructura válida de propuesta.");
        return false;
      }
      setProposal(parsed);
      hydrateExtendedState(parsed);
      toast.success("Propuesta cargada exitosamente desde el archivo JSON.");
      return true;
    } catch (e) {
      toast.error("Error al procesar el archivo JSON.");
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
