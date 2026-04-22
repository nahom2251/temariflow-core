import { Award, CalendarCheck, Wallet, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { ANNOUNCEMENTS_FEED } from "@/lib/mock-data";

export function ParentDashboard() {
  return (
    <div>
      <PageHeader title="Eden's progress" description="Grade 9-A • Bole International Academy" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current average" value="86%" icon={Award} delta={{ value: "+3%", positive: true }} hint="this term" />
        <StatCard label="Attendance" value="97.4%" icon={CalendarCheck} hint="this month" />
        <StatCard label="Fees status" value="Paid" icon={Wallet} hint="next due May 15" />
        <StatCard label="Teacher messages" value="2" icon={MessageSquare} hint="unread" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Recent grades</h3>
          <div className="mt-4 space-y-3">
            {[
              { subject: "Mathematics", score: 92, total: 100 },
              { subject: "English", score: 84, total: 100 },
              { subject: "Physics", score: 78, total: 100 },
              { subject: "Amharic", score: 90, total: 100 },
            ].map((g) => (
              <div key={g.subject}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{g.subject}</span>
                  <span className="text-muted-foreground">{g.score} / {g.total}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${g.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Announcements</h3>
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
