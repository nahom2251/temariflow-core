import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { GLOBAL_USERS } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/global-users")({
  head: () => ({ meta: [{ title: "Global Users — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Global users" description="All staff accounts across every school." actions={<Button size="sm" variant="hero"><Plus className="h-4 w-4"/> Invite user</Button>} />
      <DataTable
        data={GLOBAL_USERS}
        searchKeys={["name", "email", "school"]}
        selectable
        bulkActions={[{ label: "Suspend", onClick: () => {} }]}
        filters={[
          { key: "role", label: "Role", accessor: (r) => r.role, options: ["Owner","Principal","Teacher","Accountant","Librarian"].map(r=>({value:r,label:r})) },
          { key: "status", label: "Status", accessor: (r) => r.status, options: [{value:"active",label:"Active"},{value:"invited",label:"Invited"},{value:"suspended",label:"Suspended"}] },
        ]}
        columns={[
          { key: "name", header: "Name", cell: (r) => <span className="font-medium">{r.name}</span> },
          { key: "email", header: "Email", className: "text-muted-foreground" },
          { key: "role", header: "Role" },
          { key: "school", header: "School" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </div>
  ),
});
