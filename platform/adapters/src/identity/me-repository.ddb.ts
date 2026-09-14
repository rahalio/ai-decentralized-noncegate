/**
 * MeRepositoryDdb — sandbox operator profile.
 */
import type { MeRepository } from "@noncegate/services/identity";
import { listUsersForTenant, nowIso, responseMeta, toPublicUser } from "../_shared/sandbox-store.js";

export class MeRepositoryDdb implements MeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getOperatorMe(input: Parameters<MeRepository["getOperatorMe"]>[0]) {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? "tnt_demo");
    const user = listUsersForTenant(tenantId)[0];
    if (!user) {
      const err = new Error("Operator not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    return { data: toPublicUser(user), ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async updateOperatorMe(input: Parameters<MeRepository["updateOperatorMe"]>[0]) {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? "tnt_demo");
    const user = listUsersForTenant(tenantId)[0];
    if (!user) {
      const err = new Error("Operator not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    if (raw.displayName) user.displayName = String(raw.displayName);
    user.updatedAt = nowIso();
    return { data: toPublicUser(user), ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
