import { create } from "zustand";

// Frontend-only auth store. No backend, no persistence beyond localStorage.
// Any credentials work; the role is derived from the email domain so the
// super-admin surfaces stay reachable for demo purposes.

export type Role = "super_admin" | "admin" | "teacher" | "parent" | "student";

export const SUPER_ADMIN_DOMAIN = "@admin.temariflow.com";

export function isSuperAdminEmail(email: string): boolean {
  return email.trim().toLowerCase().endsWith(SUPER_ADMIN_DOMAIN);
}

export interface AuthProfile {
  id: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  schoolId: string | null;
  status: "pending" | "active" | "suspended";
}

interface StoredUser {
  profile: AuthProfile;
  roles: Role[];
}

const STORAGE_KEY = "temariflow.auth.v1";

function readStorage(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

function writeStorage(v: StoredUser | null) {
  if (typeof window === "undefined") return;
  if (v) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
  else window.localStorage.removeItem(STORAGE_KEY);
}

interface AuthStore {
  user: AuthProfile | null;
  profile: AuthProfile | null;
  roles: Role[];
  loading: boolean;
  initialized: boolean;

  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;

  init: () => Promise<void>;
  signIn: (email: string, _password: string) => Promise<StoredUser>;
  signUpSuperAdmin: (fullName: string, email: string) => Promise<StoredUser>;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  profile: null,
  roles: [],
  loading: true,
  initialized: false,

  hasRole: (role) => get().roles.includes(role),
  hasAnyRole: (roles) => roles.some((r) => get().roles.includes(r)),

  init: async () => {
    if (get().initialized) return;
    const stored = readStorage();
    set({
      initialized: true,
      loading: false,
      user: stored?.profile ?? null,
      profile: stored?.profile ?? null,
      roles: stored?.roles ?? [],
    });
  },

  signIn: async (email) => {
    const clean = email.trim().toLowerCase();
    const role: Role = isSuperAdminEmail(clean) ? "super_admin" : "admin";
    const profile: AuthProfile = {
      id: cryptoRandomId(),
      email: clean,
      fullName: clean.split("@")[0],
      phone: null,
      schoolId: null,
      status: "active",
    };
    const stored: StoredUser = { profile, roles: [role] };
    writeStorage(stored);
    set({ user: profile, profile, roles: stored.roles, loading: false });
    return stored;
  },

  signUpSuperAdmin: async (fullName, email) => {
    const clean = email.trim().toLowerCase();
    const profile: AuthProfile = {
      id: cryptoRandomId(),
      email: clean,
      fullName: fullName || clean.split("@")[0],
      phone: null,
      schoolId: null,
      status: "active",
    };
    const stored: StoredUser = { profile, roles: ["super_admin"] };
    writeStorage(stored);
    set({ user: profile, profile, roles: stored.roles, loading: false });
    return stored;
  },

  refreshProfile: async () => {
    const stored = readStorage();
    set({
      user: stored?.profile ?? null,
      profile: stored?.profile ?? null,
      roles: stored?.roles ?? [],
    });
  },

  signOut: async () => {
    writeStorage(null);
    set({ user: null, profile: null, roles: [] });
  },
}));

function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}
