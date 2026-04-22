import { cn } from "@/lib/utils";

const TONES = {
  success: "bg-success/10 text-success ring-success/20",
  warning: "bg-warning/15 text-foreground ring-warning/30",
  destructive: "bg-destructive/10 text-destructive ring-destructive/20",
  info: "bg-primary/10 text-primary ring-primary/20",
  neutral: "bg-muted text-muted-foreground ring-border",
} as const;

type Tone = keyof typeof TONES;

const STATUS_TONES: Record<string, Tone> = {
  active: "success",
  paid: "success",
  verified: "success",
  approved: "success",
  resolved: "success",
  published: "success",
  trial: "info",
  invited: "info",
  in_progress: "info",
  sent: "info",
  draft: "neutral",
  pending: "warning",
  partial: "warning",
  borrowed: "info",
  unpaid: "destructive",
  overdue: "destructive",
  rejected: "destructive",
  suspended: "destructive",
  past_due: "destructive",
  open: "warning",
  on_leave: "warning",
  high: "destructive",
  medium: "warning",
  low: "neutral",
};

export function StatusBadge({ status, tone }: { status: string; tone?: Tone }) {
  const t = tone ?? STATUS_TONES[status] ?? "neutral";
  const label = status.replace(/_/g, " ");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset",
        TONES[t]
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-success": t === "success",
        "bg-warning": t === "warning",
        "bg-destructive": t === "destructive",
        "bg-primary": t === "info",
        "bg-muted-foreground": t === "neutral",
      })} />
      {label}
    </span>
  );
}
