import { proposalReducer } from "../lib/proposalReducer";
import { sampleProposal } from "../data/proposalData";

export function runProposalReducerTests(): void {
  // Test 1: Update Client Name
  const updatedClient = proposalReducer(sampleProposal, {
    type: "UPDATE_CLIENT",
    payload: { name: "EXCEL VALORES PUESTO DE BOLSA" },
  });
  console.assert(
    updatedClient.client.name === "EXCEL VALORES PUESTO DE BOLSA",
    "Client name should be updated"
  );

  // Test 2: Add Requirement
  const initialReqCount = sampleProposal.requirements.length;
  const updatedReqs = proposalReducer(sampleProposal, {
    type: "ADD_REQUIREMENT",
    payload: {
      id: "REQ-TEST",
      category: "Core",
      title: "Test Feature",
      description: "Test description",
      deliverables: ["Deliv 1"],
    },
  });
  console.assert(
    updatedReqs.requirements.length === initialReqCount + 1,
    "Requirement count should increase by 1"
  );

  // Test 3: Remove Requirement
  const updatedRemoved = proposalReducer(sampleProposal, {
    type: "REMOVE_REQUIREMENT",
    payload: 0,
  });
  console.assert(
    updatedRemoved.requirements.length === initialReqCount - 1,
    "Requirement count should decrease by 1"
  );
}

// Execute assertions on import
runProposalReducerTests();
