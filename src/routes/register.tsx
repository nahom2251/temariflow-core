import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — TemariFlow ERP" },
      { name: "description", content: "Account creation for TemariFlow is by invitation only." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <AuthLayout
      title="Accounts are created by invitation"
      subtitle="TemariFlow accounts are provisioned by your school administrator. There is no public sign-up."
      footer={
        <span>
          Already have an invite?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </span>
      }
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
          <Mail className="h-5 w-5 shrink-0 text-primary" />
          <div className="space-y-1 text-muted-foreground">
            <p className="font-medium text-foreground">How to get access</p>
            <p>
              Ask your school admin (or, for a new school, the TemariFlow super admin) to send you
              an invitation. You'll receive an email with a link to set your password.
            </p>
          </div>
        </div>

        <Button asChild variant="hero" size="lg" className="w-full">
          <Link to="/login">Go to sign in</Link>
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Platform administrators can{" "}
          <Link to="/super-admin/signup" className="font-medium text-primary hover:underline">
            request super admin access
          </Link>
          .
        </p>
      </div>
    </AuthLayout>
  );
}
