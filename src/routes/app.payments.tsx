import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { PAYMENTS } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/payments")({
  head: () => ({ meta: [{ title: "Payment Verification — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Payment verification" description="Confirm school payments via Telebirr, CBE Birr, and bank transfer." />
      <DataTable
        data={PAYMENTS}
        searchKeys={["school", "ref", "method"]}
        filters={[
          { key: "method", label: "Method", accessor: (r) => r.method, options: ["Telebirr","CBE Birr","Bank Transfer"].map(m=>({value:m,label:m})) },
          { key: "status", label: "Status", accessor: (r) => r.status, options: [{value:"pending",label:"Pending"},{value:"verified",label:"Verified"},{value:"rejected",label:"Rejected"}] },
        ]}
        columns={[
          { key: "id", header: "ID", className: "font-mono text-xs text-muted-foreground" },
          { key: "school", header: "School", cell: (r) => <span className="font-medium">{r.school}</span> },
          { key: "amount", header: "Amount", cell: (r) => `${r.amount.toLocaleString()} ETB` },
          { key: "method", header: "Method" },
          { key: "ref", header: "Reference", className: "font-mono text-xs" },
          { key: "date", header: "Date", className: "text-muted-foreground" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
          { key: "actions", header: "", cell: (r) => r.status === "pending" ? (
            <div className="flex gap-1.5">
              <Button size="sm" variant="brand" onClick={() => toast.success("Verified")}><Check className="h-3.5 w-3.5" /></Button>
              <Button size="sm" variant="outline" onClick={() => toast.error("Rejected")}><X className="h-3.5 w-3.5" /></Button>
            </div>
          ) : null },
        ]}
      />
    </div>
  ),
});
