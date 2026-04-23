import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { EXPENSES } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/expenses")({
  head: () => ({ meta: [{ title: "Expenses — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader
        title="Expenses"
        description="School operational expenses."
        actions={<Button><Plus className="mr-2 h-4 w-4" /> New expense</Button>}
      />
      <DataTable
        data={EXPENSES}
        searchKeys={["vendor", "category"]}
        filters={[{
          key: "category",
          label: "Category",
          accessor: (r) => r.category,
          options: [...new Set(EXPENSES.map((e) => e.category))].map((c) => ({ value: c, label: c })),
        }]}
        columns={[
          { key: "id", header: "ID" },
          { key: "category", header: "Category", cell: (r) => <span className="font-medium">{r.category}</span> },
          { key: "vendor", header: "Vendor" },
          { key: "amount", header: "Amount", cell: (r) => `ETB ${r.amount.toLocaleString()}` },
          { key: "date", header: "Date" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status as "approved" | "pending"} /> },
        ]}
      />
    </div>
  ),
});
