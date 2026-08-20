import { ProposalData, PaymentTerm, Requirement, RoadmapPhase } from "@/types/proposal";

export type ProposalAction =
  | { type: "UPDATE_CLIENT"; payload: Partial<ProposalData["client"]> }
  | { type: "UPDATE_PROJECT"; payload: Partial<ProposalData["project"]> }
  | { type: "UPDATE_BUDGET"; payload: Partial<ProposalData["budget"]> }
  | { type: "ADD_PAYMENT_TERM"; payload: PaymentTerm }
  | { type: "REMOVE_PAYMENT_TERM"; payload: number }
  | { type: "UPDATE_PAYMENT_TERM"; payload: { index: number; data: Partial<PaymentTerm> } }
  | { type: "ADD_REQUIREMENT"; payload: Requirement }
  | { type: "REMOVE_REQUIREMENT"; payload: number }
  | { type: "UPDATE_REQUIREMENT"; payload: { index: number; data: Partial<Requirement> } }
  | { type: "ADD_DELIVERABLE"; payload: { reqIndex: number; text: string } }
  | { type: "REMOVE_DELIVERABLE"; payload: { reqIndex: number; delIndex: number } }
  | { type: "ADD_ROADMAP_PHASE"; payload: RoadmapPhase }
  | { type: "REMOVE_ROADMAP_PHASE"; payload: number }
  | { type: "UPDATE_ROADMAP_PHASE"; payload: { index: number; data: Partial<RoadmapPhase> } }
  | { type: "ADD_MILESTONE"; payload: { phaseIndex: number; text: string } }
  | { type: "REMOVE_MILESTONE"; payload: { phaseIndex: number; msIndex: number } }
  | { type: "SET_PROPOSAL"; payload: ProposalData };

export function proposalReducer(state: ProposalData, action: ProposalAction): ProposalData {
  switch (action.type) {
    case "UPDATE_CLIENT":
      return { ...state, client: { ...state.client, ...action.payload } };

    case "UPDATE_PROJECT":
      return { ...state, project: { ...state.project, ...action.payload } };

    case "UPDATE_BUDGET":
      return { ...state, budget: { ...state.budget, ...action.payload } };

    case "ADD_PAYMENT_TERM":
      return {
        ...state,
        budget: { ...state.budget, paymentTerms: [...state.budget.paymentTerms, action.payload] },
      };

    case "REMOVE_PAYMENT_TERM":
      return {
        ...state,
        budget: {
          ...state.budget,
          paymentTerms: state.budget.paymentTerms.filter((_, i) => i !== action.payload),
        },
      };

    case "UPDATE_PAYMENT_TERM": {
      const updatedTerms = [...state.budget.paymentTerms];
      updatedTerms[action.payload.index] = {
        ...updatedTerms[action.payload.index],
        ...action.payload.data,
      };
      return { ...state, budget: { ...state.budget, paymentTerms: updatedTerms } };
    }

    case "ADD_REQUIREMENT":
      return { ...state, requirements: [...state.requirements, action.payload] };

    case "REMOVE_REQUIREMENT":
      return {
        ...state,
        requirements: state.requirements.filter((_, i) => i !== action.payload),
      };

    case "UPDATE_REQUIREMENT": {
      const updatedReqs = [...state.requirements];
      updatedReqs[action.payload.index] = {
        ...updatedReqs[action.payload.index],
        ...action.payload.data,
      };
      return { ...state, requirements: updatedReqs };
    }

    case "ADD_DELIVERABLE": {
      const updatedReqs = [...state.requirements];
      const target = updatedReqs[action.payload.reqIndex];
      if (target) {
        updatedReqs[action.payload.reqIndex] = {
          ...target,
          deliverables: [...target.deliverables, action.payload.text],
        };
      }
      return { ...state, requirements: updatedReqs };
    }

    case "REMOVE_DELIVERABLE": {
      const updatedReqs = [...state.requirements];
      const target = updatedReqs[action.payload.reqIndex];
      if (target) {
        updatedReqs[action.payload.reqIndex] = {
          ...target,
          deliverables: target.deliverables.filter((_, i) => i !== action.payload.delIndex),
        };
      }
      return { ...state, requirements: updatedReqs };
    }

    case "ADD_ROADMAP_PHASE":
      return { ...state, roadmap: [...state.roadmap, action.payload] };

    case "REMOVE_ROADMAP_PHASE":
      return { ...state, roadmap: state.roadmap.filter((_, i) => i !== action.payload) };

    case "UPDATE_ROADMAP_PHASE": {
      const updatedRoadmap = [...state.roadmap];
      updatedRoadmap[action.payload.index] = {
        ...updatedRoadmap[action.payload.index],
        ...action.payload.data,
      };
      return { ...state, roadmap: updatedRoadmap };
    }

    case "ADD_MILESTONE": {
      const updatedRoadmap = [...state.roadmap];
      const target = updatedRoadmap[action.payload.phaseIndex];
      if (target) {
        updatedRoadmap[action.payload.phaseIndex] = {
          ...target,
          milestones: [...target.milestones, action.payload.text],
        };
      }
      return { ...state, roadmap: updatedRoadmap };
    }

    case "REMOVE_MILESTONE": {
      const updatedRoadmap = [...state.roadmap];
      const target = updatedRoadmap[action.payload.phaseIndex];
      if (target) {
        updatedRoadmap[action.payload.phaseIndex] = {
          ...target,
          milestones: target.milestones.filter((_, i) => i !== action.payload.msIndex),
        };
      }
      return { ...state, roadmap: updatedRoadmap };
    }

    case "SET_PROPOSAL":
      return action.payload;

    default:
      return state;
  }
}
