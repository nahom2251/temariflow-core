import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePromotionStore, decideFor, DECISION_TONE, type PromotionRules, DEFAULT_RULES } from "@/store/promotion";
import { toast } from "sonner";
import { Save, RotateCcw, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — TemariFlow" }] }),
  component: SettingsPage,
});

function validate(r: PromotionRules): string | null {
  if ([r.promotedMin, r.probationMin, r.repeatMin].some((n) => isNaN(n) || n < 0 || n > 100))
    return "All thresholds must be between 0 and 100.";
  if (!(r.promotedMin > r.probationMin && r.probationMin > r.repeatMin))
    return "Thresholds must descend: Promoted > Probation > Repeat.";
  return null;
}

function SettingsPage() {
  const stored = usePromotionStore((s) => s.rules);
  const setRules = usePromotionStore((s) => s.setRules);
  const reset = usePromotionStore((s) => s.reset);
  const [draft, setDraft] = useState<PromotionRules>(stored);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const error = validate(draft);
  const sample = [95, 72, 55, 45, 30].map((avg) => ({ avg, decision: decideFor(avg, draft) }));

  const onSave = () => {
    if (error) {
      toast.error(error);
      return;
    }
    setRules(draft);
    setConfirmOpen(false);
    toast.success("Promotion rules saved");
  };

  return (
    <div>
      <PageHeader title="Settings" description="Platform configuration and academic rules." />

      <div className="grid gap-6 lg:grid-cols-2">
        <SettingCard title="Branding">
          <Field label="Platform name" defaultValue="TemariFlow ERP" />
          <Field label="Support email" defaultValue="support@temariflow.com" />
          <Field label="Primary domain" defaultValue="temariflow.com" />
        </SettingCard>

        <SettingCard title="Trial defaults">
          <Field label="Trial length (days)" defaultValue="30" type="number" />
          <Field label="Trial student cap" defaultValue="50" type="number" />
        </SettingCard>

        <SettingCard title="Security">
          <Toggle label="Require 2FA for owners" defaultChecked />
          <Toggle label="Force SSO for admin staff" />
          <Toggle label="Block sign-ins outside Ethiopia" />
        </SettingCard>

        <SettingCard title="Notifications">
          <Toggle label="Daily payment digest" defaultChecked />
          <Toggle label="Slack alerts on outages" defaultChecked />
          <Toggle label="Weekly platform report" />
        </SettingCard>
      </div>

      {/* Promotion Rules */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-semibold">Promotion rules</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Define the percentage thresholds that determine a student's end-of-year status.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Promoted minimum (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  className="mt-1"
                  value={draft.promotedMin}
                  onChange={(e) => setDraft({ ...draft, promotedMin: Number(e.target.value) })}
                />
                <p className="mt-1 text-xs text-muted-foreground">Average ≥ this is promoted to next grade.</p>
              </div>
              <div>
                <Label>Probation minimum (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  className="mt-1"
                  value={draft.probationMin}
                  onChange={(e) => setDraft({ ...draft, probationMin: Number(e.target.value) })}
                />
                <p className="mt-1 text-xs text-muted-foreground">Probation: at risk, will be re-evaluated.</p>
              </div>
              <div>
                <Label>Repeat grade minimum (%)</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  className="mt-1"
                  value={draft.repeatMin}
                  onChange={(e) => setDraft({ ...draft, repeatMin: Number(e.target.value) })}
                />
                <p className="mt-1 text-xs text-muted-foreground">Below probation but ≥ this: repeat current grade.</p>
              </div>
              <div className="rounded-lg bg-destructive/5 p-3 text-xs text-destructive ring-1 ring-destructive/15">
                <p className="font-semibold">Dismissed below {draft.repeatMin}%</p>
                <p className="mt-1 opacity-90">Anything under the repeat threshold results in dismissal.</p>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive ring-1 ring-destructive/20">
                {error}
              </div>
            )}

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setDraft(DEFAULT_RULES);
                  reset();
                  toast.info("Promotion rules reset to defaults");
                }}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
              <Button disabled={!!error} onClick={() => setConfirmOpen(true)}>
                <Save className="mr-2 h-4 w-4" /> Save rules
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-display font-semibold">Live preview</h3>
            <p className="mt-1 text-xs text-muted-foreground">Sample averages mapped to decisions.</p>
            <ul className="mt-4 space-y-2">
              {sample.map(({ avg, decision }) => (
                <li key={avg} className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2">
                  <span className="text-sm font-medium">Average {avg}%</span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
                      DECISION_TONE[decision]
                    )}
                  >
                    {decision}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save promotion rules?</AlertDialogTitle>
            <AlertDialogDescription>
              These thresholds will be applied to all end-of-year decisions across the school.
              Make sure they match your academic policy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onSave}>Confirm & save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}
function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
}
function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <Label className="font-normal">{label}</Label>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
