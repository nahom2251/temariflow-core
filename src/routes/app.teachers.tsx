import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { TEACHERS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/teachers")({
  head: () => ({ meta: [{ title: "Teachers — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Teachers" description="Manage your teaching staff." actions={<Button size="sm" variant="hero"><Plus className="h-4 w-4"/> Add teacher</Button>} />
      <DataTable
        data={TEACHERS}
        searchKeys={["name","subject","email"]}
        selectable
        bulkActions={[{label:"Email",onClick:()=>{}},{label:"Suspend",onClick:()=>{}}]}
        filters={[{key:"status",label:"Status",accessor:r=>r.status,options:[{value:"active",label:"Active"},{value:"on_leave",label:"On leave"}]}]}
        columns={[
          { key:"id", header:"ID", className:"font-mono text-xs text-muted-foreground" },
          { key:"name", header:"Name", cell:r=><span className="font-medium">{r.name}</span> },
          { key:"subject", header:"Subject" },
          { key:"classes", header:"Classes" },
          { key:"email", header:"Email", className:"text-muted-foreground" },
          { key:"phone", header:"Phone", className:"font-mono text-xs" },
          { key:"status", header:"Status", cell:r=><StatusBadge status={r.status}/> },
        ]}
      />
    </div>
  ),
});
