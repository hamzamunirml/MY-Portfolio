// Base URL of the FastAPI backend.
// Set VITE_API_URL in a .env file (frontend) to point at your deployed backend,
// e.g. VITE_API_URL=https://your-backend.onrender.com
export const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const DEFAULT_TIMEOUT_MS = 6000;

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetchWithTimeout(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`GET ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  email_sent: boolean;
  message: string;
}

export async function submitContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }, 10000);

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody?.detail || `Contact submission failed (${response.status})`);
  }

  return response.json() as Promise<ContactResponse>;
}

/**
 * Merge live API items with the bundled fallback (by id).
 * - API version wins when the same id exists in both.
 * - Items that exist only in the bundled JSON are still shown, so newly added
 *   projects/experience appear even before the database is re-seeded.
 */
export function mergeById<T extends { id: string }>(fallback: T[], live: T[]): T[] {
  const liveMap = new Map(live.map((item) => [item.id, item]));
  const merged = fallback.map((item) => liveMap.get(item.id) ?? item);
  const fallbackIds = new Set(fallback.map((item) => item.id));
  live.forEach((item) => {
    if (!fallbackIds.has(item.id)) merged.push(item);
  });
  return merged;
}
