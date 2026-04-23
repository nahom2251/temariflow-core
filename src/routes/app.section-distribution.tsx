import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STUDENTS } from "@/lib/mock-data";
import { Sparkles, Upload, RefreshCw, Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/section-distribution")({
  head: () => ({ meta: [{ title: "Section Distribution — TemariFlow" }] }),
  component: SectionDistribution,
});

type Student = { id: string; name: string; gender: "M" | "F"; section: string };

const ALL_SECTIONS = ["A", "B", "C", "D", "E", "F"] as const;

function SectionDistribution() {
  const [grade, setGrade] = useState("9");
  const [sectionCount, setSectionCount] = useState(4);
  const [assignments, setAssignments] = useState<Student[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const sections = ALL_SECTIONS.slice(0, sectionCount);
  const pool = useMemo(
    () =>
      STUDENTS.filter((s) => String(s.grade) === grade).map((s) => ({
        id: s.id,
        name: s.name,
        gender: s.gender,
        section: "",
      })),
    [grade]
  );

  const importStudents = () => {
    setAssignments(pool.map((s) => ({ ...s, section: "" })));
    toast.success(`Imported ${pool.length} students from Grade ${grade}`);
  };

  const autoDistribute = () => {
    if (assignments.length === 0) {
      toast.error("Import students first");
      return;
    }
    // Snake distribution alternating by gender for balance
    const males = assignments.filter((s) => s.gender === "M");
    const females = assignments.filter((s) => s.gender === "F");
    const result: Student[] = [];
    [males, females].forEach((group) => {
      group.forEach((s, i) => {
        const row = Math.floor(i / sections.length);
        const col = row % 2 === 0 ? i % sections.length : sections.length - 1 - (i % sections.length);
        result.push({ ...s, section: sections[col] });
      });
    });
    setAssignments(result);
    toast.success("Auto-distributed by gender balance");
  };

  const move = (id: string, section: string) => {
    setAssignments((arr) => arr.map((s) => (s.id === id ? { ...s, section } : s)));
  };

  const stats = useMemo(() => {
    const totals = sections.map((sec) => {
      const items = assignments.filter((s) => s.section === sec);
      return {
        section: sec,
        total: items.length,
        m: items.filter((s) => s.gender === "M").length,
        f: items.filter((s) => s.gender === "F").length,
      };
    });
    const unassigned = assignments.filter((s) => !s.section).length;
    return { totals, unassigned };
  }, [assignments, sections]);

  return (
    <div>
      <PageHeader
        title="Smart section distribution"
        description="Balance students across sections by gender and class size."
      />

      <Card className="mb-6 p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-32">
            <Label className="text-xs">Grade</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <SelectItem key={g} value={String(g)}>Grade {g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-32">
            <Label className="text-xs">Sections</Label>
            <Input
              type="number"
              min={2}
              max={6}
              value={sectionCount}
              onChange={(e) => setSectionCount(Math.max(2, Math.min(6, Number(e.target.value) || 2)))}
              className="mt-1"
            />
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <Button variant="outline" onClick={importStudents}>
              <Upload className="mr-2 h-4 w-4" /> Import students
            </Button>
            <Button variant="outline" onClick={autoDistribute}>
              <RefreshCw className="mr-2 h-4 w-4" /> Re-run assignment
            </Button>
            <Button onClick={autoDistribute}>
              <Sparkles className="mr-2 h-4 w-4" /> Auto distribute
            </Button>
          </div>
        </div>
      </Card>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Total students</p>
          <p className="mt-1 font-display text-2xl font-bold">{assignments.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Male</p>
          <p className="mt-1 font-display text-2xl font-bold">
            {assignments.filter((s) => s.gender === "M").length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Female</p>
          <p className="mt-1 font-display text-2xl font-bold">
            {assignments.filter((s) => s.gender === "F").length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Unassigned</p>
          <p className="mt-1 font-display text-2xl font-bold">{stats.unassigned}</p>
        </Card>
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(sections.length, 3)}, minmax(0, 1fr))` }}
      >
        {sections.map((sec) => {
          const stat = stats.totals.find((t) => t.section === sec)!;
          const items = assignments.filter((s) => s.section === sec);
          return (
            <Card
              key={sec}
              className={cn(
                "p-4 transition-base",
                draggingId && "ring-2 ring-primary/30"
              )}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (draggingId) {
                  move(draggingId, sec);
                  setDraggingId(null);
                }
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {sec}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Section {sec}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {stat.total} students · M {stat.m} · F {stat.f}
                    </p>
                  </div>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1.5">
                {items.length === 0 && (
                  <p className="rounded-md border border-dashed py-6 text-center text-xs text-muted-foreground">
                    Drop students here
                  </p>
                )}
                {items.map((s) => (
                  <div
                    key={s.id}
                    draggable
                    onDragStart={() => setDraggingId(s.id)}
                    onDragEnd={() => setDraggingId(null)}
                    className="flex cursor-grab items-center justify-between rounded-md border bg-card px-2.5 py-1.5 text-xs hover:bg-accent active:cursor-grabbing"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          s.gender === "M" ? "bg-primary" : "bg-accent-foreground/60"
                        )}
                      />
                      {s.name}
                    </span>
                    <Select value={s.section} onValueChange={(v) => move(s.id, v)}>
                      <SelectTrigger className="h-6 w-14 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {sections.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {stats.unassigned > 0 && (
        <Card className="mt-4 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Unassigned ({stats.unassigned})</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {assignments.filter((s) => !s.section).map((s) => (
              <div
                key={s.id}
                draggable
                onDragStart={() => setDraggingId(s.id)}
                onDragEnd={() => setDraggingId(null)}
                className="flex cursor-grab items-center gap-2 rounded-md border bg-card px-2.5 py-1 text-xs hover:bg-accent"
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    s.gender === "M" ? "bg-primary" : "bg-accent-foreground/60"
                  )}
                />
                {s.name}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
