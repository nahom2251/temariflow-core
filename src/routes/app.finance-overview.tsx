import { createFileRoute } from "@tanstack/react-router";
import { HandCoins, Receipt, Banknote, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { FEE_COLLECTIONS, EXPENSES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/finance-overview")({
  head: () => ({ meta: [{ title: "Finance — TemariFlow" }] }),
  component: () => {
    const collected = FEE_COLLECTIONS.reduce((a,c)=>a+c.paid,0);
    const due = FEE_COLLECTIONS.reduce((a,c)=>a+c.amount,0);
    const exp = EXPENSES.reduce((a,e)=>a+e.amount,0);
    return (
      <div>
        <PageHeader title="Finance overview" description="High-level numbers for the current term." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Collected" value={`${collected.toLocaleString()} ETB`} icon={HandCoins} delta={{value:`${Math.round((collected/due)*100)}%`,positive:true}} hint="of total"/>
          <StatCard label="Outstanding" value={`${(due-collected).toLocaleString()} ETB`} icon={Receipt} />
          <StatCard label="Expenses" value={`${exp.toLocaleString()} ETB`} icon={Banknote} />
          <StatCard label="Net" value={`${(collected-exp).toLocaleString()} ETB`} icon={TrendingUp} delta={{value:"healthy",positive:true}} />
        </div>
      </div>
    );
  },
});
