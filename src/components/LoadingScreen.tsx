import { BrandLogo } from "@/components/brand/BrandLogo";

export function LoadingScreen({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-gradient-subtle">
      <div className="animate-pulse">
        <BrandLogo size="xl" asLink={false} />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-accent [animation-delay:120ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-warning [animation-delay:240ms]" />
        {label && <span className="ml-2">{label}</span>}
      </div>
    </div>
  );
}
