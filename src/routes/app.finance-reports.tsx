import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { TrendingUp, TrendingDown, Wallet, FileText, Download } from "lucide-react";
import { REVENUE_MONTHLY } from "@/lib/mock-data";

export const Route = createFileRoute("/app/finance-reports")({
  head: () => ({ meta: [{ title: "Finance Reports — TemariFlow" }] }),
  component: FinanceReports,
});

function FinanceReports() {
  const max = Math.max(...REVENUE_MONTHLY.map((r) => r.v));
  return (
    <div>
      <PageHeader
        title="Finance reports"
        description="Income, expenses, and net position over time."
        actions={<Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export PDF</Button>}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Income (Apr)" value="ETB 287K" icon={TrendingUp} tone="success" trend="+15.7%" />
        <StatCard label="Expenses (Apr)" value="ETB 75.7K" icon={TrendingDown} tone="warning" />
        <StatCard label="Net" value="ETB 211.3K" icon={Wallet} tone="primary" trend="+18.2%" />
        <StatCard label="Outstanding" value="ETB 42.5K" icon={FileText} />
      </div>

      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Monthly income</h3>
        <div className="flex h-64 items-end gap-3">
          {REVENUE_MONTHLY.map((r) => (
            <div key={r.m} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gradient-primary transition-all hover:opacity-80"
                style={{ height: `${(r.v / max) * 100}%` }}
              />
              <span className="text-xs font-medium text-muted-foreground">{r.m}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
