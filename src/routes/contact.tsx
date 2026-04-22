import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TemariFlow ERP" },
      { name: "description", content: "Get in touch with the TemariFlow team. We reply within one business day." },
      { property: "og:title", content: "Contact TemariFlow" },
      { property: "og:description", content: "Talk to our team about your school's needs." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);

  const handle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
    toast.success(t("contact.success"));
  };

  return (
    <PublicLayout>
      <section className="border-b border-border/60 bg-gradient-subtle">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t("contact.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="space-y-5 lg:col-span-1">
            {[
              { Icon: Mail, label: "Email", value: "hello@temariflow.com" },
              { Icon: Phone, label: "Phone", value: "+251 911 000 000" },
              { Icon: MapPin, label: "Office", value: "Bole, Addis Ababa, Ethiopia" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1 font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handle}
            className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8 lg:col-span-2"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label={t("contact.name")} required />
              <Field id="email" label={t("contact.email")} type="email" required />
            </div>
            <Field id="school" label={t("contact.school")} required />
            <div className="space-y-2">
              <Label htmlFor="message">{t("contact.message")}</Label>
              <Textarea id="message" name="message" rows={5} required />
            </div>
            <Button type="submit" variant="hero" size="lg" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? "Sending…" : (
                <>
                  {t("contact.send")} <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </section>
    </PublicLayout>
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
