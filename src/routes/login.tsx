import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — TemariFlow ERP" },
      { name: "description", content: "Sign in to your TemariFlow workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const refreshProfile = useAuthStore((s) => s.refreshProfile);
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Hydrate profile + roles before redirecting so the dashboard sees them
      await refreshProfile();
      const { profile, roles } = useAuthStore.getState();

      if (profile?.status === "pending") {
        toast.info("Your account is awaiting approval.");
        navigate({ to: "/super-admin/pending", search: { email } });
        return;
      }
      if (profile?.status === "suspended") {
        await supabase.auth.signOut();
        toast.error("Your account has been suspended. Contact your administrator.");
        return;
      }

      toast.success("Signed in");
      // Super admins land on the platform console; everyone else on /app
      if (roles.includes("super_admin")) navigate({ to: "/app" });
      else navigate({ to: "/app" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={t("auth.login.title")}
      subtitle={t("auth.login.subtitle")}
      footer={
        <span>
          {t("auth.login.no_account")}{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            {t("auth.login.register")}
          </Link>
        </span>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">{t("auth.login.email")}</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" name="email" type="email" required className="pl-9" placeholder="you@school.edu" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("auth.login.password")}</Label>
            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
              {t("auth.login.forgot")}
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPw ? "text" : "password"}
              required
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
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            {t("auth.login.remember")}
          </Label>
        </div>
        <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full">
          {submitting ? t("common.loading") : t("auth.login.submit")}
        </Button>
      </form>
    </AuthLayout>
  );
}
