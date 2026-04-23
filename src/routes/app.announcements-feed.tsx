import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { ANNOUNCEMENTS_FEED } from "@/lib/mock-data";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/app/announcements-feed")({
  head: () => ({ meta: [{ title: "Announcements — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Announcements" description="Latest updates from your school." />
      <div className="space-y-3">
        {ANNOUNCEMENTS_FEED.map((a) => (
          <Card key={a.id} className="p-5">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold">{a.title}</h3>
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
});
