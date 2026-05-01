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
    const rawMessage =
      data && typeof data === "object" && "message" in data && typeof (data as { message: unknown }).message === "string"
        ? (data as { message: string }).message
        : typeof data === "string"
          ? data
          : null;
    // Log full backend detail for developers, but only surface a safe,
    // generic message to end users to avoid leaking stack traces, SQL
    // errors, or internal paths.
    if (import.meta.env.DEV) {
      console.error(`[api] ${res.status} ${path}`, rawMessage ?? data);
    }
    throw new Error(safeUserMessage(res.status, rawMessage));
  }
  return data as T;
}

// HTTP statuses where a short backend message is generally safe to show
// (validation, auth, conflict). Everything else gets a generic message.
const SAFE_STATUSES = new Set([400, 401, 403, 404, 409, 422, 429]);
const MAX_MESSAGE_LEN = 200;

function safeUserMessage(status: number, raw: string | null): string {
  if (raw && SAFE_STATUSES.has(status)) {
    const trimmed = raw.trim().slice(0, MAX_MESSAGE_LEN);
    // Reject anything that looks like a stack trace, SQL fragment, or path.
    if (!/(\bat\s+[\w$.]+\()|(\bSQL\b)|(\bException\b)|(\/[a-z][\w/.-]+:)/i.test(trimmed)) {
      return trimmed;
    }
  }
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You don't have permission to do that.";
  if (status === 404) return "We couldn't find what you were looking for.";
  if (status >= 500) return "Something went wrong on our end. Please try again.";
  return "Something went wrong. Please try again.";
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
