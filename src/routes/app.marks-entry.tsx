import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STUDENTS } from "@/lib/mock-data";
import { Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/marks-entry")({
  head: () => ({ meta: [{ title: "Marks Entry — TemariFlow" }] }),
  component: MarksEntry,
});

function MarksEntry() {
  const [subject, setSubject] = useState("Mathematics");
  const [exam, setExam] = useState("Mid-term");
  const [grade, setGrade] = useState("9");
  const list = STUDENTS.filter((s) => String(s.grade) === grade).slice(0, 12);
  const [marks, setMarks] = useState<Record<string, string>>({});

  return (
    <div>
      <PageHeader
        title="Marks entry"
        description="Record exam scores by subject and class."
        actions={
          <Button onClick={() => toast.success("Marks saved successfully")}>
            <Save className="mr-2 h-4 w-4" /> Submit
          </Button>
        }
      />

      <Card className="mb-4 p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Mathematics", "Physics", "English", "Biology", "Chemistry", "History"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={exam} onValueChange={setExam}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Quiz 1", "Quiz 2", "Mid-term", "Final"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={grade} onValueChange={setGrade}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                <SelectItem key={g} value={String(g)}>Grade {g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Score (out of 100)</th>
                <th className="px-4 py-3 text-left">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {list.map((s) => {
                const score = Number(marks[s.id] || 0);
                const letter = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : score > 0 ? "F" : "—";
                return (
                  <tr key={s.id}>
                    <td className="px-4 py-2.5 font-medium">{s.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{s.id}</td>
                    <td className="px-4 py-2.5">
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        className="h-9 w-24"
                        value={marks[s.id] || ""}
                        onChange={(e) => setMarks((m) => ({ ...m, [s.id]: e.target.value }))}
                      />
                    </td>
                    <td className="px-4 py-2.5 font-semibold">{letter}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
