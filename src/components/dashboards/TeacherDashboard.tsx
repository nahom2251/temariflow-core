import { BookOpen, Users, ClipboardList, Award } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { CLASSES, TIMETABLE } from "@/lib/mock-data";

export function TeacherDashboard() {
  return (
    <div>
      <PageHeader title="Welcome back, Bethel" description="Here's what's on your plate today." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="My classes" value="4" icon={BookOpen} hint="across 3 grades" />
        <StatCard label="Total students" value="142" icon={Users} hint="under your care" />
        <StatCard label="Pending attendance" value="2" icon={ClipboardList} hint="for today" />
        <StatCard label="Marks to enter" value="36" icon={Award} hint="from last quiz" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold">Today's schedule</h3>
          <div className="mt-4 space-y-2">
            {(TIMETABLE[0]?.periods ?? []).map((p: string, i: number) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-border/40 p-3">
                <span className="w-16 text-xs font-semibold text-muted-foreground">P{i + 1}</span>
                <span className="flex-1 font-medium">{p}</span>
                <span className="text-xs text-muted-foreground">Grade {7 + (i % 3)}-A</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">My classes</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {CLASSES.slice(0, 5).map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-lg border border-border/40 px-3 py-2">
                <span className="font-medium">Grade {c.grade}-{c.section}</span>
                <span className="text-xs text-muted-foreground">{c.students} students</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
