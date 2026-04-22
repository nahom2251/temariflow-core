import { createFileRoute } from "@tanstack/react-router";
import { useRoleStore } from "@/store/role";
import { SuperAdminDashboard } from "@/components/dashboards/SuperAdminDashboard";
import { SchoolAdminDashboard } from "@/components/dashboards/SchoolAdminDashboard";
import { TeacherDashboard } from "@/components/dashboards/TeacherDashboard";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";
import { ParentDashboard } from "@/components/dashboards/ParentDashboard";
import { AccountantDashboard } from "@/components/dashboards/AccountantDashboard";
import { LibrarianDashboard } from "@/components/dashboards/LibrarianDashboard";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — TemariFlow ERP" }] }),
  component: DashboardIndex,
});

function DashboardIndex() {
  const role = useRoleStore((s) => s.role);
  switch (role) {
    case "super_admin": return <SuperAdminDashboard />;
    case "school_owner":
    case "principal": return <SchoolAdminDashboard />;
    case "teacher": return <TeacherDashboard />;
    case "student": return <StudentDashboard />;
    case "parent": return <ParentDashboard />;
    case "accountant": return <AccountantDashboard />;
    case "librarian": return <LibrarianDashboard />;
  }
}
