/**
 * ActiveRepositoryDdb — sandbox in-memory implementation (hand-maintained).
 */

import type { ActiveRepository } from "@noncegate/services/difficulty-policy";
import {
  ensureDemoSeed,
  policies,
  responseMeta,
} from "../_shared/noncegate-sandbox-store.js";

export class ActiveRepositoryDdb {
  constructor(private readonly _dynamoClient: unknown) {}

  async getActiveDifficultyPolicy(input: Parameters<ActiveRepository["getActiveDifficultyPolicy"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const policy = [...policies.values()].find((p) => p.status === "active");
    if (!policy) {
      const err = new Error("No active policy") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    return { data: policy, ...responseMeta(String(raw.correlationId ?? "")) };
  }

}
