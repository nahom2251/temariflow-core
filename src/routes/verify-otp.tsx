import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({ meta: [{ title: "Verify code — TemariFlow ERP" }] }),
  component: OtpPage,
});

function OtpPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return toast.error("Enter the 6-digit code");
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Verified");
    navigate({ to: "/reset-password" });
  };

  return (
    <AuthLayout title={t("auth.otp.title")} subtitle={t("auth.otp.subtitle")}>
      <form onSubmit={submit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, i) => (
                <InputOTPSlot key={i} index={i} className="h-12 w-12 text-lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full">
          {submitting ? t("common.loading") : t("auth.otp.submit")}
        </Button>
        <button
          type="button"
          onClick={() => toast.success("Code resent")}
          className="block w-full text-center text-sm font-medium text-primary hover:underline"
        >
          {t("auth.otp.resend")}
        </button>
      </form>
    </AuthLayout>
  );
}
