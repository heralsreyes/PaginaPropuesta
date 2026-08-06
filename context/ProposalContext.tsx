"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProposalData, sampleProposal, Requirement, PaymentTerm, RoadmapPhase } from "@/data/proposalData";
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
  addRequirement: () => void;
  removeRequirement: (index: number) => void;
  updateRequirement: (index: number, data: Partial<Requirement>) => void;
  addDeliverable: (reqIndex: number, deliverableText: string) => void;
  removeDeliverable: (reqIndex: number, delIndex: number) => void;
  addRoadmapPhase: () => void;
  removeRoadmapPhase: (index: number) => void;
  updateRoadmapPhase: (index: number, data: Partial<RoadmapPhase>) => void;
  addMilestone: (phaseIndex: number, milestoneText: string) => void;
  removeMilestone: (phaseIndex: number, milestoneIndex: number) => void;
  addPaymentTerm: () => void;
  removePaymentTerm: (index: number) => void;
  updatePaymentTerm: (index: number, data: Partial<PaymentTerm>) => void;
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
          setProposal(parsed);
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

  // Update Budget (Recalculate total if subtotal or tax changes)
  const updateBudget = (data: Partial<ProposalData["budget"]>) => {
    setProposal((prev) => {
      const newAmountWithoutTax = data.amountWithoutTax !== undefined ? data.amountWithoutTax : prev.budget.amountWithoutTax;
      const taxRate = 0.18; // 18% ITBIS
      const newTaxAmount = newAmountWithoutTax * taxRate;
      const newTotalAmount = newAmountWithoutTax + newTaxAmount;

      return {
        ...prev,
        budget: {
          ...prev.budget,
          ...data,
          amountWithoutTax: newAmountWithoutTax,
          taxAmount: newTaxAmount,
          totalAmount: newTotalAmount,
        },
      };
    });
  };

  // Add Requirement (Unlimited)
  const addRequirement = () => {
    setProposal((prev) => {
      const nextNum = prev.requirements.length + 1;
      const id = `REQ-${nextNum < 10 ? "0" + nextNum : nextNum}`;
      const newReq: Requirement = {
        id,
        category: "Core",
        title: `Nuevo Módulo de Requerimiento ${nextNum}`,
        description: "Descripción detallada de la nueva funcionalidad requerida por el cliente.",
        deliverables: ["Entregable 1", "Entregable 2"],
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
  const addRoadmapPhase = () => {
    setProposal((prev) => {
      const nextNum = prev.roadmap.length + 1;
      const newPhase: RoadmapPhase = {
        phase: `Fase ${nextNum}`,
        title: `Nueva Fase EDT ${nextNum}`,
        duration: `Semanas ${nextNum * 2 - 1} - ${nextNum * 2}`,
        description: "Descripción de las actividades planificadas para esta fase del proyecto.",
        status: "Pendiente",
        milestones: ["Hito Clave 1", "Hito Clave 2"],
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
  const addPaymentTerm = () => {
    setProposal((prev) => {
      const newTerm: PaymentTerm = {
        milestone: "Nuevo Hito de Pago",
        percentage: 10,
        description: "Descripción de la entrega de hito.",
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

  // Export JSON File
  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(proposal, null, 2));
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
      toast.success("Propuesta cargada exitosamente desde el archivo JSON.");
      return true;
    } catch (e) {
      toast.error("Error al procesar el archivo JSON.");
      return false;
    }
  };

  // Reset to Default Sample Proposal
  const resetToDefault = () => {
    setProposal(sampleProposal);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    toast.info("Propuesta restablecida a los valores por defecto.");
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
