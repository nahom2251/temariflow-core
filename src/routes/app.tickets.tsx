import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { TICKETS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/tickets")({
  head: () => ({ meta: [{ title: "Support Tickets — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Support tickets" description="Issues raised by schools and users." />
      <DataTable
        data={TICKETS}
        searchKeys={["subject", "school"]}
        filters={[
          { key: "priority", label: "Priority", accessor: (r) => r.priority, options: [{value:"high",label:"High"},{value:"medium",label:"Medium"},{value:"low",label:"Low"}] },
          { key: "status", label: "Status", accessor: (r) => r.status, options: [{value:"open",label:"Open"},{value:"in_progress",label:"In progress"},{value:"resolved",label:"Resolved"}] },
        ]}
        columns={[
          { key: "id", header: "Ticket", className: "font-mono text-xs" },
          { key: "subject", header: "Subject", cell: (r) => <span className="font-medium">{r.subject}</span> },
          { key: "school", header: "School" },
          { key: "priority", header: "Priority", cell: (r) => <StatusBadge status={r.priority} /> },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
          { key: "updated", header: "Updated", className: "text-muted-foreground" },
        ]}
      />
    </div>
  ),
});
