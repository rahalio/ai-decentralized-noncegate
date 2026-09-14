/**
 * LogoutRepositoryDdb — sandbox no-op logout.
 */
import type { LogoutRepository } from "@noncegate/services/identity";
import { responseMeta } from "../_shared/sandbox-store.js";

export class LogoutRepositoryDdb implements LogoutRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async operatorLogout(
    input: Parameters<LogoutRepository["operatorLogout"]>[0],
  ): Promise<Awaited<ReturnType<LogoutRepository["operatorLogout"]>>> {
    const raw = input as Record<string, unknown>;
    return {
      data: { ok: true },
      ...responseMeta(String(raw.correlationId ?? "")),
    } as Awaited<ReturnType<LogoutRepository["operatorLogout"]>>;
  }
}
