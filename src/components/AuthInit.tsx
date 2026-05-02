import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

/**
 * Mounts once at the app root to hydrate the Supabase auth session
 * (sets up the onAuthStateChange listener and reads the existing session).
 */
export function AuthInit() {
  const init = useAuthStore((s) => s.init);
  useEffect(() => {
    init();
  }, [init]);
  return null;
}
