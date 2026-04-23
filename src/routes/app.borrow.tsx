import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { BORROWS } from "@/lib/mock-data";
import { ArrowRightLeft } from "lucide-react";

export const Route = createFileRoute("/app/borrow")({
  head: () => ({ meta: [{ title: "Borrow — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader
        title="Borrowed books"
        description="Currently checked-out titles."
        actions={<Button><ArrowRightLeft className="mr-2 h-4 w-4" /> New checkout</Button>}
      />
      <DataTable
        data={BORROWS}
        searchKeys={["student", "book"]}
        columns={[
          { key: "id", header: "ID" },
          { key: "student", header: "Student", cell: (r) => <span className="font-medium">{r.student}</span> },
          { key: "grade", header: "Class" },
          { key: "book", header: "Book" },
          { key: "borrowed", header: "Borrowed" },
          { key: "due", header: "Due" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status as "overdue" | "borrowed"} /> },
        ]}
      />
    </div>
  ),
});
