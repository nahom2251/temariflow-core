import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ROLE_NAV } from "@/lib/nav";
import { ROLE_LABELS, useRoleStore } from "@/store/role";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DashboardSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const role = useRoleStore((s) => s.role);
  const sections = ROLE_NAV[role];
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-30 bg-foreground/40 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar transition-all lg:static lg:translate-x-0",
          collapsed ? "w-16" : "w-64",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className={cn("flex h-16 items-center border-b border-sidebar-border px-4", collapsed && "justify-center")}>
          {collapsed ? <BrandLogo size="sm" variant="mark" /> : <BrandLogo size="sm" />}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="mb-5">
              {section.title && !collapsed && (
                <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    location.pathname === item.to ||
                    (item.to !== "/app" && location.pathname.startsWith(item.to));
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-base",
                          active
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          collapsed && "justify-center"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className={cn("border-t border-sidebar-border p-3", collapsed && "px-2")}>
          {!collapsed && (
            <div className="mb-3 rounded-lg bg-sidebar-accent/60 p-3 text-xs">
              <p className="font-semibold text-sidebar-accent-foreground">{ROLE_LABELS[role]}</p>
              <p className="text-sidebar-foreground/60">Demo workspace</p>
            </div>
          )}
          <div className={cn("flex items-center gap-1", collapsed && "flex-col")}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hidden lg:inline-flex"
              onClick={() => setCollapsed((v) => !v)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
            <Button asChild variant="ghost" size="sm" className={cn("flex-1 justify-start gap-2 text-sm", collapsed && "h-8 w-8 p-0 justify-center")}>
              <Link to="/login">
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Sign out</span>}
              </Link>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
