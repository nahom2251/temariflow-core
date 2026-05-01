import { useState } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardTopbar } from "@/components/layout/DashboardTopbar";
import { useAuthStore } from "@/store/auth";

export const Route = createFileRoute("/app")({
  beforeLoad: ({ location }) => {
    // Client-side auth gate. Server-side enforcement still happens via the
    // backend JWT check on every /api/** request — this only prevents the
    // protected UI shell from rendering for unauthenticated visitors.
    if (typeof window === "undefined") return;
    const { token, user } = useAuthStore.getState();
    if (!token || !user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  const [open, setOpen] = useState(false);
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
