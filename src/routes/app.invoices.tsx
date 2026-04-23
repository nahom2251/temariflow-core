import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { INVOICES } from "@/lib/mock-data";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/app/invoices")({
  head: () => ({ meta: [{ title: "Invoices — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader
        title="Invoices"
        description="Issued invoices and payment status."
        actions={<Button><FileText className="mr-2 h-4 w-4" /> New invoice</Button>}
      />
      <DataTable
        data={INVOICES}
        searchKeys={["id", "to"]}
        filters={[{
          key: "status",
          label: "Status",
          accessor: (r) => r.status,
          options: [
            { value: "paid", label: "Paid" },
            { value: "sent", label: "Sent" },
            { value: "overdue", label: "Overdue" },
            { value: "draft", label: "Draft" },
          ],
        }]}
        columns={[
          { key: "id", header: "Invoice", cell: (r) => <span className="font-medium">{r.id}</span> },
          { key: "to", header: "Billed to" },
          { key: "amount", header: "Amount", cell: (r) => `ETB ${r.amount.toLocaleString()}` },
          { key: "issued", header: "Issued" },
          { key: "due", header: "Due" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status as "paid" | "sent" | "overdue" | "draft"} /> },
        ]}
      />
    </div>
  ),
});
