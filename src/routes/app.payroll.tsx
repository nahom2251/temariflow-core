import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { PAYROLL } from "@/lib/mock-data";
import { Banknote } from "lucide-react";

export const Route = createFileRoute("/app/payroll")({
  head: () => ({ meta: [{ title: "Payroll — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader
        title="Payroll"
        description="Monthly staff salaries and disbursements."
        actions={<Button><Banknote className="mr-2 h-4 w-4" /> Run payroll</Button>}
      />
      <DataTable
        data={PAYROLL}
        searchKeys={["name", "id"]}
        columns={[
          { key: "id", header: "ID" },
          { key: "name", header: "Staff", cell: (r) => <span className="font-medium">{r.name}</span> },
          { key: "role", header: "Role" },
          { key: "base", header: "Base", cell: (r) => `ETB ${r.base.toLocaleString()}` },
          { key: "bonus", header: "Bonus", cell: (r) => `ETB ${r.bonus.toLocaleString()}` },
          { key: "deductions", header: "Deductions", cell: (r) => `ETB ${r.deductions.toLocaleString()}` },
          { key: "net", header: "Net pay", cell: (r) => <span className="font-semibold">ETB {r.net.toLocaleString()}</span> },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status as "paid" | "pending"} /> },
        ]}
      />
    </div>
  ),
});
