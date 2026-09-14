import { apiClient } from "@/services/shared/infrastructure/api-client";

export async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await apiClient.get<T>(path);
    return (res.data as T) ?? null;
  } catch {
    return null;
  }
}

export async function postJson<T>(
  path: string,
  body?: unknown,
): Promise<T | null> {
  try {
    const res = await apiClient.post<T>(path, { body });
    return (res.data as T) ?? null;
  } catch {
    return null;
  }
}

export function unwrapData<T>(
  envelope: { data?: T } | T | null | undefined,
): T | null {
  if (envelope == null) return null;
  if (typeof envelope === "object" && "data" in (envelope as object)) {
    return (envelope as { data?: T }).data ?? null;
  }
  return envelope as T;
}
