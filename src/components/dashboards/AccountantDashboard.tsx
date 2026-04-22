import { HandCoins, Receipt, Banknote, FileText } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { FEE_COLLECTIONS, EXPENSES, INVOICES, REVENUE_MONTHLY } from "@/lib/mock-data";

export function AccountantDashboard() {
  const collected = FEE_COLLECTIONS.reduce((a, c) => a + c.paid, 0);
  const expenses = EXPENSES.reduce((a, e) => a + e.amount, 0);
  const max = Math.max(...REVENUE_MONTHLY.map((r) => r.v));
  return (
    <div>
      <PageHeader title="Finance overview" description="Today's collections, expenses, and outstanding invoices." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Fees collected" value={`${collected.toLocaleString()} ETB`} icon={HandCoins} delta={{ value: "+12%", positive: true }} hint="this month" />
        <StatCard label="Expenses" value={`${expenses.toLocaleString()} ETB`} icon={Receipt} delta={{ value: "+4%", positive: false }} hint="this month" />
        <StatCard label="Payroll due" value="142,500 ETB" icon={Banknote} hint="end of month" />
        <StatCard label="Open invoices" value={String(INVOICES.filter((i) => i.status !== "paid").length)} icon={FileText} hint="awaiting payment" />
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
        <h3 className="font-semibold">Cash inflow trend</h3>
        <div className="mt-6 flex h-48 items-end gap-3">
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
    </div>
  );
}
