import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { SUBSCRIPTIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/subscriptions")({
  head: () => ({ meta: [{ title: "Subscriptions — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Subscription management" description="All active and lapsed school subscriptions." />
      <DataTable
        data={SUBSCRIPTIONS}
        searchKeys={["school", "plan", "id"]}
        filters={[
          { key: "plan", label: "Plan", accessor: (r) => r.plan, options: ["Trial","Starter","Standard","Premium"].map(p=>({value:p,label:p})) },
          { key: "status", label: "Status", accessor: (r) => r.status, options: [{value:"active",label:"Active"},{value:"trial",label:"Trial"},{value:"past_due",label:"Past due"}] },
        ]}
        columns={[
          { key: "id", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "school", header: "School", cell: (r) => <span className="font-medium">{r.school}</span> },
          { key: "plan", header: "Plan" },
          { key: "amount", header: "Amount", cell: (r) => `${r.amount.toLocaleString()} ETB` },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
          { key: "renewsOn", header: "Renews", className: "text-muted-foreground" },
        ]}
      />
    </div>
  ),
});
