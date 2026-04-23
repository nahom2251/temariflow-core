import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CLASSES } from "@/lib/mock-data";
import { BookOpen, Users, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/app/my-classes")({
  head: () => ({ meta: [{ title: "My Classes — TemariFlow" }] }),
  component: MyClasses,
});

function MyClasses() {
  const myClasses = CLASSES.slice(0, 6);
  return (
    <div>
      <PageHeader title="My classes" description="Classes assigned to you for the current term." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myClasses.map((c) => (
          <Card key={c.id} className="p-5 transition-base hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                Term 3
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold">Grade {c.grade}-{c.section}</h3>
            <p className="text-sm text-muted-foreground">{c.teacher === "you" ? "Class teacher" : "Subject class"}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{c.students} students</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{c.room}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link to="/app/attendance-entry">Attendance</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link to="/app/marks-entry">
                  Marks <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
