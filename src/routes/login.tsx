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
import { useAuthStore } from "@/store/auth";
import { authApi, isSuperAdminEmail } from "@/lib/api";

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
  const setSession = useAuthStore((s) => s.setSession);
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    try {
      if (isSuperAdminEmail(email)) {
        const token = await authApi.login(email, password);
        setSession(
          { id: "super", name: email.split("@")[0], email, role: "super_admin" },
          token.accessToken,
        );
        toast.success("Signed in as super admin");
        navigate({ to: "/app" });
      } else {
        // Existing mock flow for school users (kept until backend wiring lands).
        await new Promise((r) => setTimeout(r, 500));
        setSession(
          { id: "demo", name: "Demo User", email, role: "school_admin" },
          "demo-token",
        );
        toast.success("Signed in");
        navigate({ to: "/" });
      }
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
