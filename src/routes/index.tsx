import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Wallet,
  MessagesSquare,
  BookOpen,
  BarChart3,
  UserCheck,
  Check,
  Shield,
  Globe2,
  Zap,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/BrandLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TemariFlow ERP — School management for Ethiopian schools" },
      {
        name: "description",
        content:
          "Run your school with one calm, powerful system. Admissions, academics, finance, and parent communication — in four Ethiopian languages.",
      },
    ],
  }),
  component: LandingPage,
});

const featureIcons = {
  admissions: UserCheck,
  academics: GraduationCap,
  finance: Wallet,
  comms: MessagesSquare,
  library: BookOpen,
  analytics: BarChart3,
};

function LandingPage() {
  const { t } = useTranslation();

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-subtle" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.45_0.13_260/0.18),transparent_70%)]" />

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              {t("hero.badge")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title").split(" ").slice(0, -3).join(" ")}{" "}
              <span className="text-gradient-brand">{t("hero.title").split(" ").slice(-3).join(" ")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/register">
                  {t("hero.cta_primary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/pricing">{t("hero.cta_secondary")}</Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">{t("hero.trust")}</p>
          </div>

          {/* Visual mock */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute -inset-x-8 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-hero opacity-20 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-card shadow-brand">
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                <div className="ml-3 flex-1">
                  <div className="mx-auto h-5 w-64 rounded-md bg-muted" />
                </div>
                <BrandLogo size="sm" asLink={false} variant="mark" />
              </div>
              <div className="grid gap-4 p-6 md:grid-cols-3">
                {[
                  { label: "Total Students", value: "1,284", trend: "+8%" },
                  { label: "Outstanding Fees", value: "342,500 ETB", trend: "-12%" },
                  { label: "Attendance Today", value: "96.3%", trend: "+1.2%" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-border/60 bg-background/60 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
                    <p className="mt-1 text-xs text-success">{s.trend} this month</p>
                  </div>
                ))}
                <div className="md:col-span-3 grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md"
                      style={{
                        background: `oklch(${0.85 - (i % 7) * 0.04} 0.05 ${260 + (i % 4) * 30})`,
                        opacity: 0.4 + ((i * 7) % 10) / 16,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              {t("features.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t("features.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("features.subtitle")}</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.keys(featureIcons) as (keyof typeof featureIcons)[]).map((key) => {
              const Icon = featureIcons[key];
              return (
                <div
                  key={key}
                  className="group rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-sm transition-smooth hover:-translate-y-1 hover:shadow-brand"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{t(`features.items.${key}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`features.items.${key}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="border-t border-border/60 bg-gradient-subtle py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              {t("pricing.eyebrow")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t("pricing.title")}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(["trial", "starter", "standard"] as const).map((plan) => {
              const isPopular = plan === "starter";
              return (
                <div
                  key={plan}
                  className={`relative rounded-2xl border bg-card p-6 shadow-sm ${
                    isPopular ? "border-accent ring-2 ring-accent/30" : "border-border/60"
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
                  <p className="mt-4 font-display text-3xl font-bold">
                    {t(`pricing.plans.${plan}.price`)}
                    {plan !== "trial" && (
                      <span className="text-sm font-medium text-muted-foreground">
                        {t("pricing.per_month")}
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="brand" size="lg">
              <Link to="/pricing">
                See all plans <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { Icon: Shield, title: "Bank-grade security", desc: "End-to-end encryption with role-based access." },
            { Icon: Globe2, title: "Four languages", desc: "Native support for EN, AM, OR, TI." },
            { Icon: Zap, title: "Built for speed", desc: "PWA-powered for offline-first reliability." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-hero p-10 text-center text-primary-foreground shadow-brand sm:p-16">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">{t("cta.subtitle")}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="xl" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/register">
                {t("cta.primary")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20"
            >
              <Link to="/contact">{t("cta.secondary")}</Link>
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm opacity-80">
            {["30-day free trial", "No credit card", "Cancel anytime"].map((x) => (
              <li key={x} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4" /> {x}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PublicLayout>
  );
}
