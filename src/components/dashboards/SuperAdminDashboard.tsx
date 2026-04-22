import { Building2, Users, TrendingUp, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { REVENUE_MONTHLY, SCHOOLS, APPROVALS, TICKETS } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";

export function SuperAdminDashboard() {
  const max = Math.max(...REVENUE_MONTHLY.map((r) => r.v));
  return (
    <div>
      <PageHeader title="Platform overview" description="Cross-school metrics for the TemariFlow network." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active schools" value="142" icon={Building2} delta={{ value: "+6", positive: true }} hint="this month" />
        <StatCard label="Total users" value="38,420" icon={Users} delta={{ value: "+4.1%", positive: true }} hint="vs last month" />
        <StatCard label="MRR" value="287,000 ETB" icon={TrendingUp} delta={{ value: "+15.7%", positive: true }} hint="vs last month" />
        <StatCard label="Open tickets" value="12" icon={AlertCircle} delta={{ value: "-3", positive: true }} hint="vs last week" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Revenue (ETB, last 6 months)</h3>
            <span className="text-xs text-muted-foreground">Monthly recurring</span>
          </div>
          <div className="mt-6 flex h-56 items-end gap-3">
            {REVENUE_MONTHLY.map((r) => (
              <div key={r.m} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-brand transition-smooth hover:opacity-90"
                    style={{ height: `${(r.v / max) * 100}%` }}
                    title={`${r.v.toLocaleString()} ETB`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{r.m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Pending approvals</h3>
          <ul className="mt-4 divide-y divide-border/60">
            {APPROVALS.slice(0, 4).map((a) => (
              <li key={a.id} className="py-3">
                <p className="text-sm font-medium">{a.school}</p>
                <p className="text-xs text-muted-foreground">{a.type} • {a.submitted}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Top schools by enrollment</h3>
          <ul className="mt-4 space-y-3">
            {[...SCHOOLS].sort((a, b) => b.students - a.students).slice(0, 5).map((s) => (
              <li key={s.id} className="flex items-center justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="text-muted-foreground">{s.students.toLocaleString()} students</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Recent tickets</h3>
          <ul className="mt-4 space-y-3">
            {TICKETS.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.school} • {t.updated}</p>
                </div>
                <StatusBadge status={t.priority} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
