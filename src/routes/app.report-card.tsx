import { useMemo, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { usePromotionStore, decideFor, DECISION_TONE } from "@/store/promotion";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/app/report-card")({
  head: () => ({ meta: [{ title: "Report Card — TemariFlow" }] }),
  component: ReportCard,
});

const STUDENT = {
  id: "STU1024",
  name: "Samuel Eshetu",
  grade: 10,
  section: "B",
  rollNo: "10B-14",
  rank: 7,
  totalStudents: 42,
  school: "Bole International Academy",
  term: "Term 3 · 2024/25",
  homeroom: "Bethel Asfaw",
  comment: "Samuel demonstrates strong analytical skills and steady improvement in sciences. Continued focus on Chemistry will help reach top quartile.",
};

const SUBJECTS = [
  { name: "Mathematics", quiz: 88, mid: 82, final: 90 },
  { name: "English", quiz: 92, mid: 88, final: 91 },
  { name: "Physics", quiz: 76, mid: 80, final: 78 },
  { name: "Biology", quiz: 84, mid: 86, final: 88 },
  { name: "Chemistry", quiz: 70, mid: 74, final: 72 },
  { name: "Amharic", quiz: 95, mid: 92, final: 94 },
  { name: "History", quiz: 80, mid: 78, final: 82 },
  { name: "Civics", quiz: 86, mid: 84, final: 88 },
];

function letter(s: number) {
  if (s >= 90) return "A";
  if (s >= 80) return "B";
  if (s >= 70) return "C";
  if (s >= 60) return "D";
  return "F";
}

function ReportCard() {
  const rules = usePromotionStore((s) => s.rules);
  const cardRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(
    () =>
      SUBJECTS.map((s) => {
        const total = Math.round(s.quiz * 0.2 + s.mid * 0.3 + s.final * 0.5);
        return { ...s, total, grade: letter(total) };
      }),
    []
  );
  const avg = Math.round(rows.reduce((a, r) => a + r.total, 0) / rows.length);
  const decision = decideFor(avg, rules);

  const qrPayload = encodeURIComponent(
    `https://temariflow.app/verify/${STUDENT.id}?term=T3-2025&avg=${avg}&dec=${decision}`
  );
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${qrPayload}&size=120x120&margin=0`;

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Report card"
        description={`${STUDENT.name} · ${STUDENT.term}`}
        actions={
          <div className="flex flex-wrap gap-2 print:hidden">
            <Button asChild variant="outline" size="sm">
              <Link to="/app/grades"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button size="sm" onClick={() => { window.print(); toast.success("Report ready to download as PDF"); }}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        }
      />

      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg print:border-none print:shadow-none animate-fade-in"
      >
        {/* Header */}
        <div className="relative bg-gradient-hero px-8 py-6 text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(1_0_0/0.15),transparent_60%)]" />
          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-2 backdrop-blur">
                <BrandLogo size="sm" variant="mark" />
              </div>
              <div>
                <p className="font-display text-xl font-bold">{STUDENT.school}</p>
                <p className="text-sm text-primary-foreground/80">Academic Report Card · {STUDENT.term}</p>
              </div>
            </div>
            <div className="text-right text-xs text-primary-foreground/80">
              <p>Issued: {new Date().toLocaleDateString()}</p>
              <p>Reference: RC-{STUDENT.id}-T3</p>
            </div>
          </div>
        </div>

        {/* Student strip */}
        <div className="grid gap-6 border-b border-border/60 px-8 py-6 sm:grid-cols-[auto,1fr,auto] sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-brand text-2xl font-bold text-primary-foreground shadow-brand">
            {STUDENT.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            <Info label="Student" value={STUDENT.name} strong />
            <Info label="Student ID" value={STUDENT.id} />
            <Info label="Grade" value={`Grade ${STUDENT.grade}`} />
            <Info label="Section" value={STUDENT.section} />
            <Info label="Roll no." value={STUDENT.rollNo} />
            <Info label="Homeroom" value={STUDENT.homeroom} />
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              src={qrSrc}
              alt="Verification QR code"
              width={96}
              height={96}
              className="rounded-md border border-border/60 bg-white p-1"
              loading="lazy"
            />
            <span className="text-[10px] text-muted-foreground">Scan to verify</span>
          </div>
        </div>

        {/* Marks */}
        <div className="px-8 py-6">
          <h3 className="mb-3 font-display font-semibold">Subject performance</h3>
          <div className="overflow-x-auto rounded-lg border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">Subject</th>
                  <th className="px-3 py-2 text-right">Quiz (20%)</th>
                  <th className="px-3 py-2 text-right">Mid-term (30%)</th>
                  <th className="px-3 py-2 text-right">Final (50%)</th>
                  <th className="px-3 py-2 text-right">Total</th>
                  <th className="px-3 py-2 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {rows.map((r) => (
                  <tr key={r.name}>
                    <td className="px-3 py-2 font-medium">{r.name}</td>
                    <td className="px-3 py-2 text-right">{r.quiz}</td>
                    <td className="px-3 py-2 text-right">{r.mid}</td>
                    <td className="px-3 py-2 text-right">{r.final}</td>
                    <td className="px-3 py-2 text-right font-semibold">{r.total}</td>
                    <td className="px-3 py-2 text-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {r.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <SummaryTile label="Term average" value={`${avg}%`} />
            <SummaryTile label="Class rank" value={`${STUDENT.rank} / ${STUDENT.totalStudents}`} />
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Final decision</p>
              <span
                className={cn(
                  "mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ring-1 ring-inset",
                  DECISION_TONE[decision]
                )}
              >
                {decision}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="mt-6 rounded-xl border border-border/60 bg-muted/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Homeroom teacher's comment
            </p>
            <p className="mt-2 text-sm leading-relaxed">{STUDENT.comment}</p>
          </div>

          {/* Signatures */}
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Signature name={STUDENT.homeroom} role="Class teacher" />
            <Signature name="Selamawit Tesfaye" role="Principal" />
            <Signature name="Eshetu Bekele" role="Parent / Guardian" />
          </div>
        </div>

        <div className="border-t border-border/60 bg-muted/20 px-8 py-3 text-center text-[11px] text-muted-foreground">
          Verified by TemariFlow ERP · This document is digitally signed and tamper-evident.
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn("text-sm", strong && "font-semibold")}>{value}</p>
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-gradient-card p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}

function Signature({ name, role }: { name: string; role: string }) {
  return (
    <div className="text-center">
      <div className="mb-1 h-10 border-b border-foreground/40 italic text-foreground/60">
        <span className="font-display text-lg leading-10">{name.split(" ")[0]}</span>
      </div>
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-muted-foreground">{role}</p>
    </div>
  );
}
