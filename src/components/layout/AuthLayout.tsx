import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AuthLayout({
  children,
  title,
  subtitle,
  footer,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col bg-background">
        <header className="flex items-center justify-between px-6 py-5 sm:px-10">
          <BrandLogo size="md" />
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
        {footer && (
          <div className="px-6 pb-6 text-center text-sm text-muted-foreground sm:px-10">{footer}</div>
        )}
      </div>

      {/* Right: brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-hero lg:block">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_35%)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="inline-flex w-fit items-center text-sm opacity-80 hover:opacity-100">
            ← Back to website
          </Link>
          <div>
            <BrandLogo size="xl" asLink={false} className="[&_span:not(:first-child)]:text-primary-foreground [&_span_span]:!text-primary-foreground/80" />
            <h2 className="mt-8 max-w-md font-display text-3xl font-bold leading-tight">
              The calm, modern ERP built for Ethiopian schools.
            </h2>
            <p className="mt-4 max-w-md text-lg opacity-90">
              Admissions, academics, finance, and parent communication — unified in one workspace, in your language.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-md">
            {[
              { k: "4", v: "Languages" },
              { k: "30d", v: "Free trial" },
              { k: "24/7", v: "Support" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-display text-2xl font-bold">{s.k}</p>
                <p className="text-xs uppercase tracking-wider opacity-80">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
