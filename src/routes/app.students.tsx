import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { STUDENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/students")({
  head: () => ({ meta: [{ title: "Students — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Students" description="Search, filter, and manage all enrolled students." actions={<Button size="sm" variant="hero"><Plus className="h-4 w-4"/> Add student</Button>} />
      <DataTable
        data={STUDENTS}
        searchKeys={["name","id","guardian"]}
        selectable
        bulkActions={[{label:"Promote",onClick:()=>{}},{label:"Export IDs",onClick:()=>{}}]}
        filters={[
          { key:"grade", label:"Grade", accessor:r=>String(r.grade), options:[5,6,7,8,9,10,11,12].map(g=>({value:String(g),label:`Grade ${g}`})) },
          { key:"section", label:"Section", accessor:r=>r.section, options:["A","B","C","D"].map(s=>({value:s,label:s})) },
          { key:"gender", label:"Gender", accessor:r=>r.gender, options:[{value:"M",label:"Male"},{value:"F",label:"Female"}] },
          { key:"feeStatus", label:"Fees", accessor:r=>r.feeStatus, options:[{value:"paid",label:"Paid"},{value:"partial",label:"Partial"},{value:"overdue",label:"Overdue"}] },
        ]}
        columns={[
          { key:"id", header:"ID", className:"font-mono text-xs text-muted-foreground" },
          { key:"name", header:"Student", cell:r=><span className="font-medium">{r.name}</span> },
          { key:"grade", header:"Class", cell:r=>`Grade ${r.grade}-${r.section}` },
          { key:"gender", header:"Gender" },
          { key:"guardian", header:"Guardian" },
          { key:"phone", header:"Phone", className:"font-mono text-xs" },
          { key:"attendance", header:"Att%", cell:r=>`${r.attendance}%` },
          { key:"feeStatus", header:"Fees", cell:r=><StatusBadge status={r.feeStatus}/> },
        ]}
      />
    </div>
  ),
});
