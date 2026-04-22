import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, CreditCard, Repeat } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { REVENUE_MONTHLY, SUBSCRIPTIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/revenue")({
  head: () => ({ meta: [{ title: "Revenue Analytics — TemariFlow" }] }),
  component: RevenuePage,
});

function RevenuePage() {
  const max = Math.max(...REVENUE_MONTHLY.map((r) => r.v));
  const total = REVENUE_MONTHLY.reduce((a, r) => a + r.v, 0);
  const planBreakdown = ["Trial", "Starter", "Standard", "Premium"].map((p) => ({
    plan: p,
    count: SUBSCRIPTIONS.filter((s) => s.plan === p).length,
    revenue: SUBSCRIPTIONS.filter((s) => s.plan === p).reduce((a, s) => a + s.amount, 0),
  }));
  return (
    <div>
      <PageHeader title="Revenue analytics" description="MRR, ARR, plan breakdown and growth." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="MRR" value={`${REVENUE_MONTHLY.at(-1)!.v.toLocaleString()} ETB`} icon={TrendingUp} delta={{ value: "+15.7%", positive: true }} />
        <StatCard label="ARR" value={`${(total * 2).toLocaleString()} ETB`} icon={Repeat} delta={{ value: "+22%", positive: true }} />
        <StatCard label="Paying schools" value={SUBSCRIPTIONS.filter(s=>s.status==="active").length} icon={Users} />
        <StatCard label="Avg. revenue / school" value="3,420 ETB" icon={CreditCard} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold">MRR — last 6 months</h3>
          <div className="mt-6 flex h-56 items-end gap-3">
            {REVENUE_MONTHLY.map((r) => (
              <div key={r.m} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end">
                  <div className="w-full rounded-t-lg bg-gradient-brand" style={{ height: `${(r.v / max) * 100}%` }} />
                </div>
                <span className="text-xs text-muted-foreground">{r.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">By plan</h3>
          <ul className="mt-4 space-y-3">
            {planBreakdown.map((p) => (
              <li key={p.plan}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{p.plan}</span>
                  <span className="text-muted-foreground">{p.count} • {p.revenue.toLocaleString()} ETB</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${(p.count / SUBSCRIPTIONS.length) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
