import { Library, ArrowRightLeft, AlertCircle, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { BOOKS, BORROWS, FINES } from "@/lib/mock-data";

export function LibrarianDashboard() {
  const totalCopies = BOOKS.reduce((a, b) => a + b.copies, 0);
  const available = BOOKS.reduce((a, b) => a + b.available, 0);
  return (
    <div>
      <PageHeader title="Library overview" description="Catalog, lending, and overdue items at a glance." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Titles" value={BOOKS.length} icon={BookOpen} hint="in catalog" />
        <StatCard label="Copies" value={totalCopies} icon={Library} hint={`${available} available`} />
        <StatCard label="Currently borrowed" value={BORROWS.length} icon={ArrowRightLeft} hint="across all grades" />
        <StatCard label="Overdue" value={FINES.length} icon={AlertCircle} hint="unpaid fines" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Most popular categories</h3>
          <ul className="mt-4 space-y-3">
            {Array.from(new Set(BOOKS.map((b) => b.category))).map((c) => {
              const count = BOOKS.filter((b) => b.category === c).reduce((a, b) => a + (b.copies - b.available), 0);
              return (
                <li key={c} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{c}</span>
                  <span className="text-muted-foreground">{count} on loan</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <h3 className="font-semibold">Recent activity</h3>
          <ul className="mt-4 space-y-3">
            {BORROWS.slice(0, 5).map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{b.book}</p>
                  <p className="text-xs text-muted-foreground">{b.student} • due {b.due}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
