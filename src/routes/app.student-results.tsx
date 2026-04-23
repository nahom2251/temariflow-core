import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { STUDENTS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/student-results")({
  head: () => ({ meta: [{ title: "Student Results — TemariFlow" }] }),
  component: () => (
    <div>
      <PageHeader title="Student results" description="Average performance by student across this term." />
      <DataTable
        data={STUDENTS.slice(0, 32)}
        searchKeys={["name", "id"]}
        columns={[
          { key: "name", header: "Student", cell: (r) => <span className="font-medium">{r.name}</span> },
          { key: "id", header: "ID" },
          { key: "grade", header: "Class", cell: (r) => `Grade ${r.grade}-${r.section}` },
          {
            key: "average",
            header: "Average",
            cell: (r) => {
              const tone = r.average >= 80 ? "text-success" : r.average >= 60 ? "text-warning" : "text-destructive";
              return <span className={`font-semibold ${tone}`}>{r.average}%</span>;
            },
          },
          {
            key: "average",
            header: "Grade",
            cell: (r) => (r.average >= 90 ? "A" : r.average >= 80 ? "B" : r.average >= 70 ? "C" : r.average >= 60 ? "D" : "F"),
          },
        ]}
      />
    </div>
  ),
});
