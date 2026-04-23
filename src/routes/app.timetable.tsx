import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { TIMETABLE } from "@/lib/mock-data";

export const Route = createFileRoute("/app/timetable")({
  head: () => ({ meta: [{ title: "Timetable — TemariFlow" }] }),
  component: Timetable,
});

const PERIODS = ["08:00", "09:00", "10:00", "10:30", "11:30", "12:30"];

function Timetable() {
  return (
    <div>
      <PageHeader title="Weekly timetable" description="Your scheduled periods this week." />
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Time</th>
              {TIMETABLE.map((d) => (
                <th key={d.day} className="px-4 py-3 text-left">{d.day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {PERIODS.map((time, idx) => (
              <tr key={time}>
                <td className="px-4 py-3 text-xs font-medium text-muted-foreground">{time}</td>
                {TIMETABLE.map((d) => {
                  const subject = d.periods[idx];
                  const isBreak = subject === "Break";
                  return (
                    <td key={d.day} className="px-4 py-3">
                      <div
                        className={
                          isBreak
                            ? "rounded-md bg-muted px-2 py-1.5 text-center text-xs text-muted-foreground"
                            : "rounded-md bg-primary/10 px-2 py-1.5 text-xs font-medium text-primary"
                        }
                      >
                        {subject}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
