/**
 * ApproveRepositoryDdb — sandbox in-memory implementation (hand-maintained).
 */

import type { ApproveRepository } from "@noncegate/services/difficulty-policy";
import {
  ensureDemoSeed,
  nowIso,
  policies,
  responseMeta,
} from "../_shared/noncegate-sandbox-store.js";

export class ApproveRepositoryDdb {
  constructor(private readonly _dynamoClient: unknown) {}

  async approveDifficultyPolicy(input: Parameters<ApproveRepository["approveDifficultyPolicy"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const id = String(raw.policyId ?? "");
    const decision = String(raw.decision ?? "approve");
    const policy = policies.get(id);
    if (!policy) {
      const err = new Error("Policy not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    if (policy.proposedByUserId && policy.proposedByUserId === String(raw.userId ?? "")) {
      const err = new Error("Second identity required") as Error & { statusCode?: number };
      err.statusCode = 409;
      throw err;
    }
    policy.status = decision === "reject" ? "rejected" : "approved";
    if (decision === "approve") policy.status = "active";
    policy.updatedAt = nowIso();
    policies.set(id, policy);
    return { data: policy, ...responseMeta(String(raw.correlationId ?? "")) };
  }

}
