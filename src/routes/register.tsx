import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register your school — TemariFlow ERP" },
      { name: "description", content: "Create your TemariFlow workspace in minutes." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success("Workspace created. Verify your email to continue.");
    navigate({ to: "/verify-otp" });
  };

  return (
    <AuthLayout
      title={t("auth.register.title")}
      subtitle={t("auth.register.subtitle")}
      footer={
        <span>
          {t("auth.register.have_account")}{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            {t("auth.register.login")}
          </Link>
        </span>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <Field id="school_name" label={t("auth.register.school_name")} required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="admin_name" label={t("auth.register.admin_name")} required />
          <Field id="phone" label={t("auth.register.phone")} type="tel" required />
        </div>
        <Field id="email" label={t("auth.register.email")} type="email" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="password" label={t("auth.register.password")} type="password" required />
          <Field id="confirm" label={t("auth.register.confirm")} type="password" required />
        </div>
        <div className="flex items-start gap-2">
          <Checkbox id="terms" required className="mt-0.5" />
          <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
            {t("auth.register.terms")}
          </Label>
        </div>
        <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full">
          {submitting ? t("common.loading") : t("auth.register.submit")}
        </Button>
      </form>
    </AuthLayout>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} required={required} />
    </div>
  );
}
