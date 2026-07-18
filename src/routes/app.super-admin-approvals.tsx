import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";

export const Route = createFileRoute("/app/super-admin-approvals")({
  head: () => ({ meta: [{ title: "Super Admin Approvals — TemariFlow" }] }),
  component: SuperAdminApprovalsPage,
});

function SuperAdminApprovalsPage() {
  return (
    <div>
      <PageHeader
        title="Super Admin Approvals"
        description="Approve or reject new super admin signups."
      />
      <EmptyState
        icon={ShieldCheck}
        title="No pending requests"
        description="Connect a backend to manage super admin approvals. This is a frontend-only preview."
      />
    </div>
  );
}
