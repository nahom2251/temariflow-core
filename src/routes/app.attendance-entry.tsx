import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STUDENTS } from "@/lib/mock-data";
import { Check, X, Clock, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/attendance-entry")({
  head: () => ({ meta: [{ title: "Attendance Entry — TemariFlow" }] }),
  component: AttendanceEntry,
});

type Status = "present" | "absent" | "late";

function AttendanceEntry() {
  const [grade, setGrade] = useState("9");
  const [section, setSection] = useState("A");
  const list = STUDENTS.filter((s) => String(s.grade) === grade && s.section === section);
  const [marks, setMarks] = useState<Record<string, Status>>(
    Object.fromEntries(list.map((s) => [s.id, "present" as Status]))
  );

  const set = (id: string, v: Status) => setMarks((m) => ({ ...m, [id]: v }));
  const counts = Object.values(marks).reduce(
    (a, v) => ({ ...a, [v]: (a[v] || 0) + 1 }),
    {} as Record<string, number>
  );

  return (
    <div>
      <PageHeader
        title="Attendance entry"
        description={`Today · ${new Date().toLocaleDateString()}`}
        actions={
          <Button onClick={() => toast.success("Attendance saved")}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        }
      />

      <Card className="mb-4 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                <SelectItem key={g} value={String(g)}>Grade {g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["A", "B", "C", "D"].map((s) => (
                <SelectItem key={s} value={s}>Section {s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="ml-auto flex gap-4 text-sm">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Present {counts.present || 0}</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" />Late {counts.late || 0}</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Absent {counts.absent || 0}</span>
          </div>
        </div>
      </Card>

      <Card className="divide-y">
        {list.length === 0 && <p className="p-6 text-center text-sm text-muted-foreground">No students in this section.</p>}
        {list.map((s) => {
          const v = marks[s.id];
          return (
            <div key={s.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.id}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant={v === "present" ? "default" : "outline"} onClick={() => set(s.id, "present")}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant={v === "late" ? "default" : "outline"} onClick={() => set(s.id, "late")}>
                  <Clock className="h-4 w-4" />
                </Button>
                <Button size="sm" variant={v === "absent" ? "destructive" : "outline"} onClick={() => set(s.id, "absent")}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
