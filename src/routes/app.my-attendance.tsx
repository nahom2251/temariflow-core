import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { CalendarCheck, CalendarX, Clock, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/app/my-attendance")({
  head: () => ({ meta: [{ title: "Attendance — TemariFlow" }] }),
  component: MyAttendance,
});

function MyAttendance() {
  const days = Array.from({ length: 35 }).map((_, i) => {
    const r = (i * 17) % 10;
    return r === 0 ? "absent" : r === 1 ? "late" : i % 7 === 5 || i % 7 === 6 ? "weekend" : "present";
  });

  return (
    <div>
      <PageHeader title="My attendance" description="Term overview and daily history." />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Present days" value="58" icon={CalendarCheck} tone="success" />
        <StatCard label="Absent days" value="3" icon={CalendarX} tone="danger" />
        <StatCard label="Late arrivals" value="2" icon={Clock} tone="warning" />
        <StatCard label="Attendance rate" value="94.8%" icon={TrendingUp} tone="primary" />
      </div>

      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold">Last 5 weeks</h3>
        <div className="grid grid-cols-7 gap-2">
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d)=>(
            <div key={d} className="text-center text-xs font-medium text-muted-foreground">{d}</div>
          ))}
          {days.map((s, i) => {
            const cls =
              s === "present" ? "bg-success/20 text-success" :
              s === "absent" ? "bg-destructive/20 text-destructive" :
              s === "late" ? "bg-warning/20 text-warning" :
              "bg-muted text-muted-foreground";
            return (
              <div key={i} className={`flex aspect-square items-center justify-center rounded-md text-xs font-semibold ${cls}`}>
                {(i % 28) + 1}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-success/40" /> Present</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-destructive/40" /> Absent</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-warning/40" /> Late</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-muted" /> Weekend</span>
        </div>
      </Card>
    </div>
  );
}
