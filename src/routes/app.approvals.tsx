import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { APPROVALS } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/approvals")({
  head: () => ({ meta: [{ title: "Approvals — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Pending approvals" description="Review and approve new schools and plan changes." />
      <DataTable
        data={APPROVALS}
        searchKeys={["school", "type", "contact"]}
        columns={[
          { key: "id", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "school", header: "School", cell: (r) => <span className="font-medium">{r.school}</span> },
          { key: "type", header: "Type" },
          { key: "contact", header: "Contact", className: "text-muted-foreground" },
          { key: "submitted", header: "Submitted", className: "text-muted-foreground" },
          { key: "actions", header: "", cell: () => (
            <div className="flex gap-1.5">
              <Button size="sm" variant="brand" onClick={() => toast.success("Approved")}><Check className="h-3.5 w-3.5" /> Approve</Button>
              <Button size="sm" variant="outline" onClick={() => toast.error("Rejected")}><X className="h-3.5 w-3.5" /> Reject</Button>
            </div>
          )},
        ]}
      />
    </div>
  ),
});
