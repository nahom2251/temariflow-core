import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

/** Hydrates the local auth session from localStorage once on mount. */
export function AuthInit() {
  const init = useAuthStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);
  return null;
}
