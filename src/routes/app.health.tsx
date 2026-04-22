import { createFileRoute } from "@tanstack/react-router";
import { Cpu, HardDrive, Wifi, Activity } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";

export const Route = createFileRoute("/app/health")({
  head: () => ({ meta: [{ title: "Server Health — TemariFlow" }] }),
  component: HealthPage,
});

function HealthPage() {
  const services = [
    { name: "API Gateway", status: "operational", latency: 42 },
    { name: "Database (Primary)", status: "operational", latency: 12 },
    { name: "Database (Replica)", status: "operational", latency: 18 },
    { name: "Object Storage", status: "operational", latency: 89 },
    { name: "Background Workers", status: "degraded", latency: 320 },
    { name: "SMS Gateway", status: "operational", latency: 510 },
  ];
  return (
    <div>
      <PageHeader title="Server health" description="Realtime infrastructure status." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Uptime (30d)" value="99.94%" icon={Activity} hint="rolling window" />
        <StatCard label="CPU avg" value="38%" icon={Cpu} hint="all nodes" />
        <StatCard label="Storage" value="62%" icon={HardDrive} hint="of 2 TB used" />
        <StatCard label="Bandwidth" value="412 Mbps" icon={Wifi} hint="current" />
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <h3 className="font-semibold">Services</h3>
        <ul className="mt-4 divide-y divide-border/60">
          {services.map((s) => (
            <li key={s.name} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${s.status === "operational" ? "bg-success" : "bg-warning"}`} />
                <span className="font-medium text-sm">{s.name}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="capitalize">{s.status}</span>
                <span className="font-mono">{s.latency} ms</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
