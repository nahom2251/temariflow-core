import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Heart } from "lucide-react";

export function PublicFooter() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-gradient-subtle">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <BrandLogo size="md" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {t("brand.tagline")}
            </p>
          </div>
          <FooterCol title={t("footer.product")} links={[
            { to: "/", label: t("nav.home") },
            { to: "/pricing", label: t("nav.pricing") },
            { to: "/faq", label: t("nav.faq") },
          ]} />
          <FooterCol title={t("footer.company")} links={[
            { to: "/contact", label: t("nav.contact") },
          ]} />
          <FooterCol title={t("footer.support")} links={[
            { to: "/faq", label: t("nav.faq") },
            { to: "/contact", label: t("nav.contact") },
          ]} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} TemariFlow ERP. {t("footer.rights")}</p>
          <p className="inline-flex items-center gap-1.5">
            {t("footer.made")} <Heart className="h-3 w-3 fill-destructive text-destructive" />
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-base">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
