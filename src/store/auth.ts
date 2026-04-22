import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "super_admin" | "school_admin" | "teacher" | "parent" | "student";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  schoolId?: string;
}

interface AuthStore {
  user: AuthUser | null;
  token: string | null;
  setSession: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setSession: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "temariflow-auth" }
  )
);
