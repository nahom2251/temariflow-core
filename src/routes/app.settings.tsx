import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — TemariFlow" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Platform-wide configuration." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Branding">
          <Field label="Platform name" defaultValue="TemariFlow ERP" />
          <Field label="Support email" defaultValue="support@temariflow.com" />
          <Field label="Primary domain" defaultValue="temariflow.com" />
        </Card>
        <Card title="Trial defaults">
          <Field label="Trial length (days)" defaultValue="30" type="number" />
          <Field label="Trial student cap" defaultValue="50" type="number" />
        </Card>
        <Card title="Security">
          <Toggle label="Require 2FA for owners" defaultChecked />
          <Toggle label="Force SSO for admin staff" />
          <Toggle label="Block sign-ins outside Ethiopia" />
        </Card>
        <Card title="Notifications">
          <Toggle label="Daily payment digest" defaultChecked />
          <Toggle label="Slack alerts on outages" defaultChecked />
          <Toggle label="Weekly platform report" />
        </Card>
      </div>
      <div className="mt-6 flex justify-end">
        <Button variant="hero">Save changes</Button>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
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
