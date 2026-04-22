import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { CLASSES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/classes")({
  head: () => ({ meta: [{ title: "Classes — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Classes & sections" description="All grades and sections for the current academic year." />
      <DataTable
        data={CLASSES}
        searchKeys={["id","teacher","room"]}
        filters={[{key:"grade",label:"Grade",accessor:r=>String(r.grade),options:[5,6,7,8,9,10,11,12].map(g=>({value:String(g),label:`Grade ${g}`}))}]}
        columns={[
          { key:"id", header:"Class", cell:r=><span className="font-medium">Grade {r.grade}-{r.section}</span> },
          { key:"teacher", header:"Class teacher" },
          { key:"students", header:"Students" },
          { key:"room", header:"Room" },
        ]}
      />
    </div>
  ),
});
