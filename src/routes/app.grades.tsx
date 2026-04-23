import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Award, TrendingUp, BookOpen, FileText } from "lucide-react";
import { usePromotionStore, decideFor, DECISION_TONE } from "@/store/promotion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/grades")({
  head: () => ({ meta: [{ title: "Grades — TemariFlow" }] }),
  component: Grades,
});

const SUBJECTS = [
  { name: "Mathematics", quiz: 88, mid: 82, final: 90, total: 87 },
  { name: "English", quiz: 92, mid: 88, final: 91, total: 90 },
  { name: "Physics", quiz: 76, mid: 80, final: 78, total: 78 },
  { name: "Biology", quiz: 84, mid: 86, final: 88, total: 86 },
  { name: "Chemistry", quiz: 70, mid: 74, final: 72, total: 72 },
  { name: "Amharic", quiz: 95, mid: 92, final: 94, total: 94 },
  { name: "History", quiz: 80, mid: 78, final: 82, total: 80 },
];

function gradeFor(s: number) {
  if (s >= 90) return "A";
  if (s >= 80) return "B";
  if (s >= 70) return "C";
  if (s >= 60) return "D";
  return "F";
}

function Grades() {
  const avg = Math.round(SUBJECTS.reduce((a, s) => a + s.total, 0) / SUBJECTS.length);
  const rules = usePromotionStore((s) => s.rules);
  const decision = decideFor(avg, rules);
  return (
    <div>
      <PageHeader
        title="Grades & results"
        description="Your academic performance this term."
        actions={
          <Button asChild>
            <Link to="/app/report-card"><FileText className="mr-2 h-4 w-4" /> View report card</Link>
          </Button>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Term average" value={`${avg}%`} icon={Award} tone="primary" />
        <StatCard label="Class rank" value="7 / 42" icon={TrendingUp} tone="success" />
        <StatCard label="Subjects" value={SUBJECTS.length} icon={BookOpen} />
        <div className="rounded-2xl border border-border/60 bg-gradient-card p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Final decision</p>
          <span
            className={cn(
              "mt-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ring-1 ring-inset",
              DECISION_TONE[decision]
            )}
          >
            {decision}
          </span>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Based on threshold ≥ {rules.promotedMin}% promoted
          </p>
        </div>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-right">Quiz</th>
              <th className="px-4 py-3 text-right">Mid-term</th>
              <th className="px-4 py-3 text-right">Final</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-right">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {SUBJECTS.map((s) => (
              <tr key={s.name}>
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 text-right">{s.quiz}</td>
                <td className="px-4 py-3 text-right">{s.mid}</td>
                <td className="px-4 py-3 text-right">{s.final}</td>
                <td className="px-4 py-3 text-right font-semibold">{s.total}</td>
                <td className="px-4 py-3 text-right">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {gradeFor(s.total)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
