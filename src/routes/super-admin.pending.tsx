import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ShieldCheck } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/super-admin/pending")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),
  head: () => ({
    meta: [
      { title: "Awaiting Approval — TemariFlow" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PendingPage,
});

function PendingPage() {
  const { email } = Route.useSearch();
  return (
    <AuthLayout title="Awaiting approval" subtitle="Your super admin account has been created.">
      <div className="space-y-6">
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          <Clock className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Pending review</p>
            <p className="mt-1 opacity-90">
              An existing super admin must approve {email ? <strong>{email}</strong> : "your account"} before you can sign in.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <p>You'll receive an email once approved. Then sign in normally.</p>
        </div>

        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex-1">
            <Link to="/login">Go to sign in</Link>
          </Button>
          <Button asChild variant="hero" className="flex-1">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
