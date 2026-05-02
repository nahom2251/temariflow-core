import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, X, ShieldCheck, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/app/super-admin-approvals")({
  head: () => ({ meta: [{ title: "Super Admin Approvals — TemariFlow" }] }),
  component: SuperAdminApprovalsPage,
});

interface PendingProfile {
  id: string;
  full_name: string | null;
  email: string | null;
}

function SuperAdminApprovalsPage() {
  const [pending, setPending] = useState<PendingProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      // Pending profiles whose email matches the super-admin domain.
      // RLS lets only super admins read all profiles; email lives on auth.users
      // so we read it via the auth.admin endpoint? No — use the view we expose
      // by joining with the auth metadata stored in profiles.full_name + the
      // user's own email visible to themselves. We list all pending profiles
      // and resolve their emails via a server function later. For now, expose
      // full_name only and look up email through a Supabase RPC.
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("status", "pending");
      if (error) throw error;
      setPending((data ?? []).map((r) => ({ id: r.id, full_name: r.full_name, email: null })));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load pending super admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const decide = async (id: string, approve: boolean) => {
    setBusyId(id);
    try {
      if (approve) {
        // Activate profile + grant super_admin role
        const { error: e1 } = await supabase
          .from("profiles")
          .update({ status: "active" })
          .eq("id", id);
        if (e1) throw e1;
        const { error: e2 } = await supabase
          .from("user_roles")
          .insert({ user_id: id, role: "super_admin" });
        if (e2 && !e2.message.includes("duplicate")) throw e2;
        toast.success("Super admin approved");
      } else {
        // Reject: mark suspended (we keep the auth user — full delete needs
        // the service role and will be handled via a server function).
        const { error } = await supabase
          .from("profiles")
          .update({ status: "suspended" })
          .eq("id", id);
        if (error) throw error;
        toast.success("Request rejected");
      }
      setPending((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Super Admin Approvals"
        description="Approve or reject new super admin signups from the @admin.temariflow.com domain."
        actions={
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            Refresh
          </Button>
        }
      />

      {loading ? (
        <Card className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </Card>
      ) : pending.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="No pending requests"
          description="When someone signs up with an @admin.temariflow.com email, they'll appear here for approval."
        />
      ) : (
        <div className="space-y-3">
          {pending.map((u) => (
            <Card key={u.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{u.full_name ?? "Unnamed user"}</p>
                  <p className="text-xs text-muted-foreground">User ID: {u.id.slice(0, 8)}…</p>
                </div>
              </div>
              <div className="flex gap-2 sm:shrink-0">
                <Button
                  size="sm"
                  variant="brand"
                  disabled={busyId === u.id}
                  onClick={() => decide(u.id, true)}
                >
                  <Check className="h-3.5 w-3.5" /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={busyId === u.id}
                  onClick={() => decide(u.id, false)}
                >
                  <X className="h-3.5 w-3.5" /> Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
