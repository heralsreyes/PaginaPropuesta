import { ButtonActionConfig } from "@/types/studio";
import { toast } from "sonner";

interface ActionDispatcherOptions {
  setActiveTabForCard: (elementId: string, tabId: string) => void;
  toggleElementVisibility: (elementId: string) => void;
}

export function executeButtonAction(
  config: ButtonActionConfig,
  options: ActionDispatcherOptions
): void {
  if (!config || !config.type) return;

  switch (config.type) {
    case "CHANGE_TAB":
      if (config.targetId && config.payload) {
        options.setActiveTabForCard(config.targetId, config.payload);
        toast.success(`Cambiadó a vista '${config.payload}'`);
      }
      break;

    case "TOGGLE_VISIBILITY":
      if (config.targetId) {
        options.toggleElementVisibility(config.targetId);
        toast.info("Visibilidad conmutada.");
      }
      break;

    case "NAVIGATE_SECTION":
      if (config.targetId) {
        const el = document.getElementById(config.targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
      break;

    case "SYSTEM_TRIGGER":
      toast.info(`Acción del sistema ejecutada: ${config.payload || "Trigger"}`);
      break;

    default:
      break;
  }
}
