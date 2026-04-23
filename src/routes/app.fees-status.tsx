import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Wallet, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/app/fees-status")({
  head: () => ({ meta: [{ title: "Fees Status — TemariFlow" }] }),
  component: FeesStatus,
});

const HISTORY = [
  { id: "INV-T1", term: "Term 1", amount: 1500, paid: 1500, date: "2024-09-15", status: "paid" as const },
  { id: "INV-T2", term: "Term 2", amount: 1500, paid: 1500, date: "2025-01-10", status: "paid" as const },
  { id: "INV-T3", term: "Term 3", amount: 1500, paid: 800, date: "2025-04-05", status: "partial" as const },
];

function FeesStatus() {
  const totalDue = HISTORY.reduce((a, h) => a + (h.amount - h.paid), 0);
  return (
    <div>
      <PageHeader title="Fees status" description="Payment overview for your child." />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total paid" value="ETB 3,800" icon={CheckCircle2} tone="success" />
        <StatCard label="Outstanding" value={`ETB ${totalDue.toLocaleString()}`} icon={AlertCircle} tone="warning" />
        <StatCard label="Next due" value="May 1" icon={Wallet} tone="primary" />
      </div>

      <Card className="overflow-x-auto p-0">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-display font-semibold">Payment history</h3>
          <Button>Pay outstanding</Button>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Invoice</th>
              <th className="px-4 py-3 text-left">Term</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-right">Paid</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {HISTORY.map((h) => (
              <tr key={h.id}>
                <td className="px-4 py-3 font-medium">{h.id}</td>
                <td className="px-4 py-3">{h.term}</td>
                <td className="px-4 py-3 text-right">ETB {h.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">ETB {h.paid.toLocaleString()}</td>
                <td className="px-4 py-3 text-muted-foreground">{h.date}</td>
                <td className="px-4 py-3"><StatusBadge status={h.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
