import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { SCHOOLS } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/schools")({
  head: () => ({ meta: [{ title: "All Schools — TemariFlow" }] }),
  component: SchoolsPage,
});

function SchoolsPage() {
  return (
    <div>
      <PageHeader
        title="All schools"
        description="Every institution running on the TemariFlow network."
        actions={<Button size="sm" variant="hero"><Plus className="h-4 w-4" /> Add school</Button>}
      />
      <DataTable
        data={SCHOOLS}
        searchPlaceholder="Search by name or city…"
        searchKeys={["name", "city", "id"]}
        selectable
        bulkActions={[
          { label: "Suspend", onClick: (ids) => toast.success(`Suspended ${ids.length}`) },
          { label: "Email", onClick: (ids) => toast.success(`Emailed ${ids.length}`) },
        ]}
        filters={[
          { key: "plan", label: "Plan", accessor: (r) => r.plan, options: ["Trial","Starter","Standard","Premium"].map(p=>({value:p,label:p})) },
          { key: "status", label: "Status", accessor: (r) => r.status, options: [{value:"active",label:"Active"},{value:"trial",label:"Trial"},{value:"suspended",label:"Suspended"}] },
        ]}
        columns={[
          { key: "id", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "name", header: "School", cell: (r) => <span className="font-medium">{r.name}</span> },
          { key: "city", header: "City" },
          { key: "students", header: "Students", cell: (r) => r.students.toLocaleString() },
          { key: "plan", header: "Plan", cell: (r) => <span className="font-medium">{r.plan}</span> },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
          { key: "joined", header: "Joined", className: "text-muted-foreground" },
        ]}
      />
    </div>
  );
}
