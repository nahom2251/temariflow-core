import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/temariflow-logo.png";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "full" | "mark" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  asLink?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { mark: "h-7 w-7", text: "text-base", gap: "gap-2", initials: "text-xs" },
  md: { mark: "h-9 w-9", text: "text-lg", gap: "gap-2.5", initials: "text-sm" },
  lg: { mark: "h-12 w-12", text: "text-2xl", gap: "gap-3", initials: "text-base" },
  xl: { mark: "h-20 w-20", text: "text-4xl", gap: "gap-4", initials: "text-2xl" },
};

export function BrandLogo({
  variant = "full",
  size = "md",
  asLink = true,
  className,
}: BrandLogoProps) {
  const s = sizeMap[size];
  const [failed, setFailed] = useState(false);

  const content = (
    <span className={cn("inline-flex items-center", s.gap, className)}>
      {variant !== "wordmark" && (
        <span
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center rounded-xl overflow-hidden",
            "bg-gradient-card ring-1 ring-border/60 shadow-sm",
            "transition-base group-hover:shadow-md",
            failed ? "p-0" : "p-1.5",
            s.mark
          )}
          aria-hidden="true"
        >
          {failed ? (
            // Fallback: branded "TF" monogram on a gradient — always visible,
            // theme-safe, and works even if the asset fails to load.
            <span
              className={cn(
                "flex h-full w-full items-center justify-center rounded-xl",
                "bg-gradient-to-br from-primary to-accent",
                "font-display font-extrabold tracking-tight text-primary-foreground",
                s.initials
              )}
            >
              TF
            </span>
          ) : (
            <img
              src={logo}
              alt=""
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
              draggable={false}
              onError={() => setFailed(true)}
            />
          )}
        </span>
      )}
      {variant !== "mark" && (
        <span className={cn("font-display font-bold leading-none tracking-tight", s.text)}>
          <span className="text-primary">Temari</span>
          <span className="text-accent">Flow</span>
          <span className="ml-1 text-[0.55em] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            ERP
          </span>
        </span>
      )}
    </span>
  );

  if (asLink) {
    return (
      <Link to="/" className="group inline-flex items-center" aria-label="TemariFlow ERP — Home">
        {content}
      </Link>
    );
  }
  return content;
}
