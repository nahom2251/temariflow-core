import { UserCog, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_LABELS, useRoleStore, type AppRole } from "@/store/role";

export function RoleSwitcher() {
  const { role, setRole } = useRoleStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserCog className="h-4 w-4" />
          <span className="hidden sm:inline">{ROLE_LABELS[role]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Switch demo role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(ROLE_LABELS) as AppRole[]).map((r) => (
          <DropdownMenuItem key={r} onClick={() => setRole(r)} className="flex items-center justify-between">
            {ROLE_LABELS[r]}
            {role === r && <Check className="h-4 w-4 text-accent" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
