import { Users, GraduationCap, Wallet, CalendarCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { ATTENDANCE_TREND, STUDENTS, TEACHERS, FEE_COLLECTIONS } from "@/lib/mock-data";

export function SchoolAdminDashboard() {
  const max = Math.max(...ATTENDANCE_TREND.map((d) => d.v));
  const collected = FEE_COLLECTIONS.reduce((a, c) => a + c.paid, 0);
  const due = FEE_COLLECTIONS.reduce((a, c) => a + c.amount, 0);
  return (
    <div>
      <PageHeader title="School dashboard" description="Daily snapshot of your school's operations." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total students" value={STUDENTS.length.toLocaleString()} icon={Users} delta={{ value: "+12", positive: true }} hint="this term" />
        <StatCard label="Teachers" value={TEACHERS.length} icon={GraduationCap} hint="active staff" />
        <StatCard label="Attendance today" value="96.3%" icon={CalendarCheck} delta={{ value: "+1.2%", positive: true }} hint="vs yesterday" />
        <StatCard label="Fees collected" value={`${(collected / 1000).toFixed(0)}k ETB`} icon={Wallet} delta={{ value: `${Math.round((collected / due) * 100)}%`, positive: true }} hint="of total due" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:col-span-2">
          <h3 className="font-semibold">Attendance this week</h3>
          <div className="mt-6 flex h-48 items-end gap-4">
            {ATTENDANCE_TREND.map((d) => (
              <div key={d.d} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end">
                  <div className="w-full rounded-t-lg bg-accent/80" style={{ height: `${(d.v / max) * 100}%` }} title={`${d.v}%`} />
                </div>
                <span className="text-xs text-muted-foreground">{d.d}</span>
                <span className="text-xs font-semibold">{d.v}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              "Add new student",
              "Mark teacher attendance",
              "Issue an invoice",
              "Publish announcement",
              "Run section distribution",
            ].map((q) => (
              <li key={q} className="rounded-lg border border-border/40 px-3 py-2 hover:bg-secondary cursor-pointer transition-base">
                {q}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
