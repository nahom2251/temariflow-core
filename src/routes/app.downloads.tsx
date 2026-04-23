import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/EmptyState";
import {
  FileText, Award, ClipboardList, ScrollText, CalendarDays, Receipt, Download,
  Search, FolderOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/downloads")({
  head: () => ({ meta: [{ title: "Download Center — TemariFlow" }] }),
  component: Downloads,
});

type Category = "report-cards" | "notes" | "assignments" | "certificates" | "timetables" | "receipts";

interface DownloadItem {
  id: string;
  name: string;
  size: string;
  date: string;
  category: Category;
  meta?: string;
}

const CATEGORIES: { id: Category | "all"; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All", icon: FolderOpen },
  { id: "report-cards", label: "Report cards", icon: Award },
  { id: "notes", label: "Notes", icon: FileText },
  { id: "assignments", label: "Assignments", icon: ClipboardList },
  { id: "certificates", label: "Certificates", icon: ScrollText },
  { id: "timetables", label: "Timetables", icon: CalendarDays },
  { id: "receipts", label: "Receipts", icon: Receipt },
];

const ITEMS: DownloadItem[] = [
  { id: "rc1", name: "Term 3 Report Card.pdf", size: "180 KB", date: "2025-04-22", category: "report-cards", meta: "Grade 10-B" },
  { id: "rc2", name: "Term 2 Report Card.pdf", size: "175 KB", date: "2025-01-18", category: "report-cards", meta: "Grade 10-B" },
  { id: "n1", name: "Math · Quadratic Equations.pdf", size: "420 KB", date: "2025-04-19", category: "notes", meta: "Mathematics" },
  { id: "n2", name: "Physics · Newton's Laws.pdf", size: "1.2 MB", date: "2025-04-15", category: "notes", meta: "Physics" },
  { id: "n3", name: "Biology · Cell Division.pdf", size: "890 KB", date: "2025-04-12", category: "notes", meta: "Biology" },
  { id: "a1", name: "English Essay – Climate.pdf", size: "240 KB", date: "2025-04-20", category: "assignments", meta: "Due May 2" },
  { id: "a2", name: "Chemistry Lab Report.pdf", size: "560 KB", date: "2025-04-17", category: "assignments", meta: "Due Apr 28" },
  { id: "c1", name: "Honor Roll Certificate.pdf", size: "120 KB", date: "2025-01-30", category: "certificates", meta: "Term 2" },
  { id: "c2", name: "Science Fair Participation.pdf", size: "98 KB", date: "2024-11-12", category: "certificates" },
  { id: "tt1", name: "Class Timetable Term 3.pdf", size: "76 KB", date: "2025-04-01", category: "timetables", meta: "Grade 10-B" },
  { id: "tt2", name: "Exam Schedule.pdf", size: "82 KB", date: "2025-04-18", category: "timetables", meta: "Final exams" },
  { id: "r1", name: "Receipt INV-T3.pdf", size: "45 KB", date: "2025-04-05", category: "receipts", meta: "ETB 800" },
  { id: "r2", name: "Receipt INV-T2.pdf", size: "44 KB", date: "2025-01-10", category: "receipts", meta: "ETB 1,500" },
];

const CAT_ICON: Record<Category, LucideIcon> = {
  "report-cards": Award,
  notes: FileText,
  assignments: ClipboardList,
  certificates: ScrollText,
  timetables: CalendarDays,
  receipts: Receipt,
};

function Downloads() {
  const [active, setActive] = useState<Category | "all">("all");
  const [q, setQ] = useState("");

  const filtered = ITEMS.filter((i) => active === "all" || i.category === active).filter((i) =>
    q ? i.name.toLowerCase().includes(q.toLowerCase()) : true
  );

  const counts = CATEGORIES.reduce(
    (acc, c) => ({
      ...acc,
      [c.id]: c.id === "all" ? ITEMS.length : ITEMS.filter((i) => i.category === c.id).length,
    }),
    {} as Record<string, number>
  );

  return (
    <div>
      <PageHeader
        title="Download center"
        description="All your documents in one place — report cards, notes, certificates, and more."
      />

      <div className="grid gap-6 lg:grid-cols-[16rem,1fr]">
        {/* Sidebar */}
        <Card className="h-fit p-3">
          <nav className="space-y-0.5">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-base",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground/80 hover:bg-accent/50"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    {c.label}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      isActive ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {counts[c.id]}
                  </span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* List */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search files…" className="pl-9" />
            </div>
            <Button
              variant="outline"
              onClick={() => toast.success(`Bundle of ${filtered.length} files queued`)}
              disabled={filtered.length === 0}
            >
              <Download className="mr-2 h-4 w-4" /> Download all
            </Button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title="No files found"
              description="Try a different category or clear your search."
            />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map((f) => {
                const Icon = CAT_ICON[f.category];
                return (
                  <Card key={f.id} className="group flex items-start gap-3 p-4 transition-base hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-base group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{f.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {f.meta ? `${f.meta} · ` : ""}{f.size} · {f.date}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="shrink-0"
                      onClick={() => toast.success(`Downloading ${f.name}`)}
                      aria-label={`Download ${f.name}`}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
