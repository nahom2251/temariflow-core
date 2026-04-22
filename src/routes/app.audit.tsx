import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { AUDIT_LOGS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/audit")({
  head: () => ({ meta: [{ title: "Audit Logs — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Audit logs" description="Track every privileged action across the platform." />
      <DataTable
        data={AUDIT_LOGS}
        searchKeys={["actor", "action", "target"]}
        columns={[
          { key: "time", header: "Time", className: "font-mono text-xs text-muted-foreground" },
          { key: "actor", header: "Actor", cell: (r) => <span className="font-medium">{r.actor}</span> },
          { key: "action", header: "Action" },
          { key: "target", header: "Target", className: "font-mono text-xs" },
          { key: "ip", header: "IP", className: "font-mono text-xs text-muted-foreground" },
        ]}
      />
    </div>
  ),
});
