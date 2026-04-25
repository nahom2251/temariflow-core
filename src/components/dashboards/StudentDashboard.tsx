import { Award, CalendarCheck, BookOpen, Bell } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { TIMETABLE, ANNOUNCEMENTS_FEED } from "@/lib/mock-data";

export function StudentDashboard() {
  return (
    <div>
      <PageHeader title="Hi, Eden 👋" description="Grade 9-A • Bole International Academy" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Average grade" value="86%" icon={Award} delta={{ value: "+3%", positive: true }} hint="this term" />
        <StatCard label="Attendance" value="97.4%" icon={CalendarCheck} hint="this month" />
        <StatCard label="Subjects" value="9" icon={BookOpen} hint="this term" />
        <StatCard label="New notices" value="3" icon={Bell} hint="unread" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold">Today's classes</h3>
          <div className="mt-4 space-y-2">
            {(TIMETABLE[0]?.periods ?? []).map((p: string, i: number) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-border/40 p-3">
                <span className="w-16 text-xs font-semibold text-muted-foreground">{8 + i}:00</span>
                <span className="flex-1 font-medium">{p}</span>
                <span className="text-xs text-muted-foreground">Room {201 + i}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Latest announcements</h3>
          <ul className="mt-4 space-y-3">
            {ANNOUNCEMENTS_FEED.map((a) => (
              <li key={a.id} className="rounded-lg border border-border/40 p-3">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
