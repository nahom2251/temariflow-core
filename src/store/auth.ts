import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Role = "super_admin" | "admin" | "teacher" | "parent" | "student";

export interface AuthProfile {
  id: string;
  email: string | null;
  fullName: string | null;
  phone: string | null;
  schoolId: string | null;
  status: "pending" | "active" | "suspended";
}

interface AuthStore {
  user: User | null;
  session: Session | null;
  profile: AuthProfile | null;
  roles: Role[];
  loading: boolean;
  initialized: boolean;

  /** Returns the access token for bridging to the Spring ERP backend. */
  token: () => string | null;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;

  init: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

async function loadProfileAndRoles(userId: string): Promise<{
  profile: AuthProfile | null;
  roles: Role[];
}> {
  const [{ data: profileRow }, { data: roleRows }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, phone, school_id, status")
      .eq("id", userId)
      .maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", userId),
  ]);

  const { data: userData } = await supabase.auth.getUser();

  const profile: AuthProfile | null = profileRow
    ? {
        id: profileRow.id,
        email: userData.user?.email ?? null,
        fullName: profileRow.full_name,
        phone: profileRow.phone,
        schoolId: profileRow.school_id,
        status: (profileRow.status ?? "pending") as AuthProfile["status"],
      }
    : null;

  const roles = (roleRows ?? []).map((r) => r.role as Role);
  return { profile, roles };
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  roles: [],
  loading: true,
  initialized: false,

  token: () => get().session?.access_token ?? null,
  hasRole: (role) => get().roles.includes(role),
  hasAnyRole: (roles) => roles.some((r) => get().roles.includes(r)),

  init: async () => {
    if (get().initialized) return;
    set({ initialized: true });

    // 1. Set up listener BEFORE reading the session (avoids race conditions)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
      if (session?.user) {
        // Defer DB call to avoid deadlocking the auth callback
        setTimeout(() => {
          loadProfileAndRoles(session.user.id).then(({ profile, roles }) => {
            set({ profile, roles, loading: false });
          });
        }, 0);
      } else {
        set({ profile: null, roles: [], loading: false });
      }
    });

    // 2. Read existing session from storage
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null });
    if (session?.user) {
      const { profile, roles } = await loadProfileAndRoles(session.user.id);
      set({ profile, roles, loading: false });
    } else {
      set({ loading: false });
    }
  },

  refreshProfile: async () => {
    const user = get().user;
    if (!user) return;
    const { profile, roles } = await loadProfileAndRoles(user.id);
    set({ profile, roles });
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null, profile: null, roles: [] });
  },
}));
