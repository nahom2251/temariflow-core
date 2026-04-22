import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/school-profile")({
  head: () => ({ meta: [{ title: "School Profile — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="School profile" description="Your institution's public identity." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
          <h3 className="font-semibold">General</h3>
          {[["School name","Bole International Academy"],["Motto","Learn. Lead. Inspire."],["Established","2008"],["Phone","+251 911 000 000"],["Email","info@bole.edu"],["Address","Bole, Addis Ababa"]].map(([l,v])=>(
            <div key={l} className="space-y-1.5"><Label>{l}</Label><Input defaultValue={v as string}/></div>
          ))}
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
          <h3 className="font-semibold">Academic year</h3>
          <div className="space-y-1.5"><Label>Current year</Label><Input defaultValue="2024 / 2025"/></div>
          <div className="space-y-1.5"><Label>Current term</Label><Input defaultValue="Term 3"/></div>
          <div className="space-y-1.5"><Label>Term start</Label><Input type="date" defaultValue="2025-02-15"/></div>
          <div className="space-y-1.5"><Label>Term end</Label><Input type="date" defaultValue="2025-06-10"/></div>
        </div>
      </div>
      <div className="mt-6 flex justify-end"><Button variant="hero">Save profile</Button></div>
    </div>
  ),
});
