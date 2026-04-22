import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, UserCheck, UserX, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { ATTENDANCE_TREND, CLASSES } from "@/lib/mock-data";

export const Route = createFileRoute("/app/attendance-overview")({
  head: () => ({ meta: [{ title: "Attendance — TemariFlow" }] }),
  component: () => {
    const max = Math.max(...ATTENDANCE_TREND.map(d=>d.v));
    return (
      <div>
        <PageHeader title="Attendance overview" description="Trends and per-class attendance for today." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Today" value="96.3%" icon={CalendarCheck} delta={{value:"+1.2%",positive:true}} />
          <StatCard label="Present" value="1,237" icon={UserCheck} />
          <StatCard label="Absent" value="47" icon={UserX} />
          <StatCard label="Late" value="18" icon={Clock} />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h3 className="font-semibold">This week</h3>
            <div className="mt-6 flex h-48 items-end gap-4">
              {ATTENDANCE_TREND.map(d=>(
                <div key={d.d} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-full w-full items-end"><div className="w-full rounded-t-lg bg-accent/80" style={{height:`${(d.v/max)*100}%`}}/></div>
                  <span className="text-xs text-muted-foreground">{d.d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <h3 className="font-semibold">Lowest attendance today</h3>
            <ul className="mt-4 space-y-2">
              {CLASSES.slice(0,6).map((c,i)=>(
                <li key={c.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">Grade {c.grade}-{c.section}</span>
                  <span className="text-muted-foreground">{88+i}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  },
});
