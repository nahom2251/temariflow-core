import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/books")({
  head: () => ({ meta: [{ title: "Books — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader
        title="Library catalog"
        description="All titles in the library collection."
        actions={
          <Button asChild>
            <Link to="/app/add-book"><Plus className="mr-2 h-4 w-4" /> Add book</Link>
          </Button>
        }
      />
      <DataTable
        data={BOOKS}
        searchKeys={["title", "author", "id"]}
        filters={[{
          key: "category",
          label: "Category",
          accessor: (r) => r.category,
          options: [...new Set(BOOKS.map((b) => b.category))].map((c) => ({ value: c, label: c })),
        }]}
        columns={[
          { key: "id", header: "ID" },
          { key: "title", header: "Title", cell: (r) => <span className="font-medium">{r.title}</span> },
          { key: "author", header: "Author" },
          { key: "category", header: "Category" },
          { key: "copies", header: "Copies" },
          {
            key: "available",
            header: "Available",
            cell: (r) => {
              const tone = r.available === 0 ? "text-destructive" : r.available < r.copies / 3 ? "text-warning" : "text-success";
              return <span className={`font-semibold ${tone}`}>{r.available} / {r.copies}</span>;
            },
          },
        ]}
      />
    </div>
  ),
});
