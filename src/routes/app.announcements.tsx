import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ANNOUNCEMENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/announcements")({
  head: () => ({ meta: [{ title: "Announcements — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Announcements" description="Network-wide communications." actions={<Button size="sm" variant="hero"><Plus className="h-4 w-4"/> New announcement</Button>} />
      <DataTable
        data={ANNOUNCEMENTS}
        searchKeys={["title", "audience"]}
        columns={[
          { key: "title", header: "Title", cell: (r) => <span className="font-medium">{r.title}</span> },
          { key: "audience", header: "Audience" },
          { key: "date", header: "Date", className: "text-muted-foreground" },
          { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
        ]}
      />
    </div>
  ),
});
