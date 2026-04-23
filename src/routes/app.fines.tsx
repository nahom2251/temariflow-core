import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { FINES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/fines")({
  head: () => ({ meta: [{ title: "Fines — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Library fines" description="Outstanding charges for late returns." />
      <DataTable
        data={FINES}
        searchKeys={["student", "book"]}
        columns={[
          { key: "id", header: "ID" },
          { key: "student", header: "Student", cell: (r) => <span className="font-medium">{r.student}</span> },
          { key: "book", header: "Book" },
          { key: "daysLate", header: "Days late" },
          { key: "amount", header: "Amount", cell: (r) => `ETB ${r.amount}` },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status as "paid" | "unpaid"} /> },
          {
            key: "id",
            header: "",
            cell: (r) =>
              r.status === "unpaid" ? (
                <Button size="sm" variant="outline">Collect</Button>
              ) : null,
          },
        ]}
      />
    </div>
  ),
});
