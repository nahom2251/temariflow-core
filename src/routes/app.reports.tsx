import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart, FileText, Download } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Reports" description="Generate and download school reports." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title:"Term report card", desc:"Per-student academic results for the current term." },
          { title:"Attendance summary", desc:"Daily and monthly attendance per class." },
          { title:"Fee collection", desc:"Outstanding balances and payments by family." },
          { title:"Teacher workload", desc:"Hours, classes, and student counts per teacher." },
          { title:"Enrollment trends", desc:"Yearly enrollment growth across grades." },
          { title:"Discipline log", desc:"Incidents and follow-up actions." },
        ].map((r)=>(
          <div key={r.title} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground"><FileBarChart className="h-5 w-5"/></div>
              <h3 className="font-semibold">{r.title}</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{r.desc}</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline"><FileText className="h-3.5 w-3.5"/> Generate</Button>
              <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5"/> Last PDF</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
