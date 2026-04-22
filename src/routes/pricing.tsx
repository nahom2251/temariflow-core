import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Check, ArrowRight } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — TemariFlow ERP" },
      {
        name: "description",
        content: "Simple, transparent plans for schools of every size. Start free for 30 days.",
      },
      { property: "og:title", content: "Pricing — TemariFlow ERP" },
      { property: "og:description", content: "Free trial, Starter, Standard, and Premium plans." },
    ],
  }),
  component: PricingPage,
});

const PLANS = ["trial", "starter", "standard", "premium"] as const;

function PricingPage() {
  const { t } = useTranslation();

  return (
    <PublicLayout>
      <section className="border-b border-border/60 bg-gradient-subtle">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {t("pricing.eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {t("pricing.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {PLANS.map((plan) => {
              const isPopular = plan === "standard";
              const features = t(`pricing.plans.${plan}.features`, { returnObjects: true }) as string[];
              return (
                <div
                  key={plan}
                  className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-smooth hover:shadow-md ${
                    isPopular
                      ? "border-accent ring-2 ring-accent/30 shadow-brand"
                      : "border-border/60"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {t("pricing.popular")}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold">{t(`pricing.plans.${plan}.name`)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`pricing.plans.${plan}.desc`)}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold">
                      {t(`pricing.plans.${plan}.price`)}
                    </span>
                    {plan !== "trial" && plan !== "premium" && (
                      <span className="text-sm text-muted-foreground">{t("pricing.per_month")}</span>
                    )}
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-8"
                    variant={isPopular ? "hero" : plan === "trial" ? "brand" : "outline"}
                  >
                    <Link to="/register">
                      {plan === "trial" ? t("pricing.trial_cta") : t("pricing.cta")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
