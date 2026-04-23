import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { FEE_COLLECTIONS } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/fee-collection")({
  head: () => ({ meta: [{ title: "Fee Collection — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader
        title="Fee collection"
        description="Record and track student payments."
        actions={<Button><Plus className="mr-2 h-4 w-4" /> Record payment</Button>}
      />
      <DataTable
        data={FEE_COLLECTIONS}
        searchKeys={["student", "id"]}
        filters={[
          {
            key: "status",
            label: "Status",
            accessor: (r) => r.status,
            options: [
              { value: "paid", label: "Paid" },
              { value: "partial", label: "Partial" },
              { value: "overdue", label: "Overdue" },
            ],
          },
        ]}
        columns={[
          { key: "id", header: "Receipt" },
          { key: "student", header: "Student", cell: (r) => <span className="font-medium">{r.student}</span> },
          { key: "grade", header: "Class" },
          { key: "term", header: "Term" },
          { key: "amount", header: "Amount", cell: (r) => `ETB ${r.amount.toLocaleString()}` },
          { key: "paid", header: "Paid", cell: (r) => `ETB ${r.paid.toLocaleString()}` },
          { key: "method", header: "Method" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status as "paid" | "partial" | "overdue"} /> },
        ]}
      />
    </div>
  ),
});
