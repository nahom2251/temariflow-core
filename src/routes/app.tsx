import { useEffect, useState } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { useAuthStore } from "@/store/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading, profile } = useAuthStore();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    if (profile?.status === "pending") {
      navigate({ to: "/super-admin/pending", search: { email: user.email ?? "" } });
      return;
    }
    if (profile?.status === "suspended") {
      supabase.auth.signOut().then(() => navigate({ to: "/login" }));
    }
  }, [user, loading, profile, navigate]);

  if (loading || !user || profile?.status !== "active") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
        <div className="text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-subtle">
      <DashboardSidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar onMenu={() => setOpen(true)} />
        <main key={typeof window !== "undefined" ? window.location.pathname : "ssr"} className="flex-1 px-4 py-6 sm:px-6 lg:px-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
