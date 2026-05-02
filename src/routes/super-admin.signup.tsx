import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSuperAdminEmail, SUPER_ADMIN_DOMAIN } from "@/lib/api";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/auth";

export const Route = createFileRoute("/super-admin/signup")({
  head: () => ({
    meta: [
      { title: "Super Admin Signup — TemariFlow" },
      { name: "description", content: "Restricted signup for TemariFlow platform super administrators." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuperAdminSignup,
});

function SuperAdminSignup() {
  const navigate = useNavigate();
  const refreshProfile = useAuthStore((s) => s.refreshProfile);
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    if (!isSuperAdminEmail(email)) {
      toast.error(`Email must end with ${SUPER_ADMIN_DOMAIN}`);
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setSubmitting(true);
    try {
      const redirectUrl = `${window.location.origin}/login`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { full_name: fullName },
        },
      });
      if (error) throw error;

      // If email confirmation is OFF, the user is already signed in.
      // The DB trigger will have either auto-promoted them (first super admin)
      // or left them pending for approval.
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        await refreshProfile();
        const { roles, profile } = useAuthStore.getState();
        if (roles.includes("super_admin") && profile?.status === "active") {
          toast.success("You are the first super admin. Welcome.");
          navigate({ to: "/app" });
          return;
        }
        toast.success("Account created. Awaiting approval from an existing super admin.");
        navigate({ to: "/super-admin/pending", search: { email } });
      } else {
        toast.success("Account created. Check your email to confirm, then sign in.");
        navigate({ to: "/super-admin/pending", search: { email } });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Super Admin Signup"
      subtitle={`Restricted to ${SUPER_ADMIN_DOMAIN} accounts. The first signup becomes the bootstrap super admin; later signups await approval.`}
      footer={
        <span>
          Already approved?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </span>
      }
    >
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
        <ShieldCheck className="h-5 w-5 shrink-0" />
        <p>This page is for platform administrators only. School staff should use the standard login.</p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="fullName" name="fullName" required className="pl-9" placeholder="Jane Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Admin email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="pl-9"
              placeholder={`name${SUPER_ADMIN_DOMAIN}`}
            />
          </div>
          <p className="text-xs text-muted-foreground">Must end with {SUPER_ADMIN_DOMAIN}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              required
              minLength={8}
              className="pl-9 pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">At least 8 characters</p>
        </div>

        <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full">
          {submitting ? "Creating account…" : "Request super admin access"}
        </Button>
      </form>
    </AuthLayout>
  );
}
