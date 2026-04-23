import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FILES } from "@/lib/mock-data";
import { FileText, Download } from "lucide-react";

export const Route = createFileRoute("/app/files")({
  head: () => ({ meta: [{ title: "Files — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Files & resources" description="Downloadable documents shared by your teachers." />
      <Card className="divide-y">
        {FILES.map((f) => (
          <div key={f.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.subject} · {f.size} · {f.date}</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        ))}
      </Card>
    </div>
  ),
});
