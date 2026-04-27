// Minimal API client for the TemariFlow Spring backend.
// Configure VITE_API_BASE_URL in env (defaults to "/api" for same-origin proxy).
import { useAuthStore } from "@/store/auth";

const BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api";

export const SUPER_ADMIN_DOMAIN = "@admin.temariflow.com";

export function isSuperAdminEmail(email: string): boolean {
  return email.trim().toLowerCase().endsWith(SUPER_ADMIN_DOMAIN);
}

type FetchOpts = Omit<RequestInit, "body"> & { body?: unknown; auth?: boolean };

export async function api<T = unknown>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { body, auth = true, headers, ...rest } = opts;
  const token = auth ? useAuthStore.getState().token : null;
  const res = await fetch(`${BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? safeJson(text) : null;
  if (!res.ok) {
    const message =
      (data && typeof data === "object" && "message" in data && (data as { message: string }).message) ||
      (typeof data === "string" ? data : null) ||
      `Request failed (${res.status})`;
    throw new Error(message as string);
  }
  return data as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// ----- Auth -----
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}
export interface SuperAdminSignupResponse {
  autoApproved: boolean;
  message: string;
  token: TokenResponse | null;
}

export const authApi = {
  login: (email: string, password: string) =>
    api<TokenResponse>("/auth/login", { method: "POST", auth: false, body: { email, password } }),
  registerSuperAdmin: (fullName: string, email: string, password: string) =>
    api<SuperAdminSignupResponse>("/auth/register-super-admin", {
      method: "POST",
      auth: false,
      body: { fullName, email, password },
    }),
};

// ----- Super-admin approvals -----
export interface PendingSuperAdmin {
  id: string;
  schoolId: string | null;
  fullName: string;
  email: string;
  roles: string[];
  enabled: boolean;
}

export const adminApi = {
  pendingSuperAdmins: () => api<PendingSuperAdmin[]>("/admin/super-admins/pending"),
  decideSuperAdmin: (id: string, approve: boolean) =>
    api<PendingSuperAdmin>(`/admin/super-admins/${id}/decision?approve=${approve}`, { method: "PATCH" }),
};
