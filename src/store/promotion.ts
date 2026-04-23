import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PromotionRules {
  promotedMin: number;   // average ≥ this → Promoted
  probationMin: number;  // average ≥ this and < promotedMin → Probation
  repeatMin: number;     // average ≥ this and < probationMin → Repeat
                         // average < repeatMin → Dismissed
}

export const DEFAULT_RULES: PromotionRules = {
  promotedMin: 60,
  probationMin: 50,
  repeatMin: 40,
};

export type Decision = "Promoted" | "Probation" | "Repeat" | "Dismissed";

export function decideFor(avg: number, rules: PromotionRules): Decision {
  if (avg >= rules.promotedMin) return "Promoted";
  if (avg >= rules.probationMin) return "Probation";
  if (avg >= rules.repeatMin) return "Repeat";
  return "Dismissed";
}

export const DECISION_TONE: Record<Decision, string> = {
  Promoted: "bg-success/15 text-success ring-success/30",
  Probation: "bg-warning/20 text-warning-foreground ring-warning/40",
  Repeat: "bg-primary/15 text-primary ring-primary/30",
  Dismissed: "bg-destructive/15 text-destructive ring-destructive/30",
};

interface PromotionStore {
  rules: PromotionRules;
  setRules: (r: PromotionRules) => void;
  reset: () => void;
}

export const usePromotionStore = create<PromotionStore>()(
  persist(
    (set) => ({
      rules: DEFAULT_RULES,
      setRules: (rules) => set({ rules }),
      reset: () => set({ rules: DEFAULT_RULES }),
    }),
    { name: "temariflow-promotion-rules" }
  )
);
