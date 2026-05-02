// Bridge client for the legacy Spring ERP backend.
// Auth is handled by Lovable Cloud (Supabase). This client just attaches the
// Supabase JWT as a Bearer token so the Spring side can verify the user.
import { supabase } from "@/integrations/supabase/client";

const BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api";

export const SUPER_ADMIN_DOMAIN = "@admin.temariflow.com";

export function isSuperAdminEmail(email: string): boolean {
  return email.trim().toLowerCase().endsWith(SUPER_ADMIN_DOMAIN);
}

type FetchOpts = Omit<RequestInit, "body"> & { body?: unknown; auth?: boolean };

export async function api<T = unknown>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { body, auth = true, headers, ...rest } = opts;
  let token: string | null = null;
  if (auth) {
    const { data } = await supabase.auth.getSession();
    token = data.session?.access_token ?? null;
  }
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
  const looksLikeHtml = /^\s*<(!doctype|html|head|body)/i.test(text);
  const data = text && !looksLikeHtml ? safeJson(text) : null;

  if (looksLikeHtml) {
    if (import.meta.env.DEV) {
      console.error(`[api] ${res.status} ${path} returned HTML, not JSON. Is the ERP backend reachable at VITE_API_BASE_URL?`);
    }
    throw new Error("Can't reach the server. Please try again in a moment.");
  }

  if (!res.ok) {
    const rawMessage =
      data && typeof data === "object" && "message" in data && typeof (data as { message: unknown }).message === "string"
        ? (data as { message: string }).message
        : typeof data === "string"
          ? data
          : null;
    if (import.meta.env.DEV) {
      console.error(`[api] ${res.status} ${path}`, rawMessage ?? data);
    }
    throw new Error(safeUserMessage(res.status, rawMessage));
  }
  return data as T;
}

const SAFE_STATUSES = new Set([400, 401, 403, 404, 409, 422, 429]);
const MAX_MESSAGE_LEN = 200;

function safeUserMessage(status: number, raw: string | null): string {
  if (raw && SAFE_STATUSES.has(status)) {
    const trimmed = raw.trim().slice(0, MAX_MESSAGE_LEN);
    if (!/^</.test(trimmed) && !/(\bat\s+[\w$.]+\()|(\bSQL\b)|(\bException\b)|(\/[a-z][\w/.-]+:)/i.test(trimmed)) {
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
