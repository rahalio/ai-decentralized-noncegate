/**
 * DifficultyPolicyRepositoryDdb — sandbox in-memory implementation (hand-maintained).
 */

import type { DifficultyPolicyRepository } from "@noncegate/services/difficulty-policy";
import {
  ensureDemoSeed,
  nowIso,
  policies,
  responseMeta,
  sandboxId,
  type DifficultyPolicy,
} from "../_shared/noncegate-sandbox-store.js";

export class DifficultyPolicyRepositoryDdb {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDifficultyPolicies(input: Parameters<DifficultyPolicyRepository["listDifficultyPolicies"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const status = raw.status as string | undefined;
    let items = [...policies.values()];
    if (status) items = items.filter((p) => p.status === status);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async createDifficultyPolicy(input: Parameters<DifficultyPolicyRepository["createDifficultyPolicy"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const now = nowIso();
    const versions = [...policies.values()].map((p) => p.version);
    const policy: DifficultyPolicy = {
      id: sandboxId("pol"),
      version: (versions.length ? Math.max(...versions) : 0) + 1,
      difficulty: Number(raw.difficulty ?? 1),
      leadingZeroTarget: Number(raw.leadingZeroTarget ?? 0),
      status: "pendingApproval",
      effectiveAt: String(raw.effectiveAt ?? now),
      proposedByUserId: String(raw.userId ?? raw.orgId ?? "usr_demo_ops"),
      changeLogNote: raw.changeLogNote ? String(raw.changeLogNote) : undefined,
      createdAt: now,
      updatedAt: now,
    };
    policies.set(policy.id, policy);
    return { data: policy, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async getDifficultyPolicy(input: Parameters<DifficultyPolicyRepository["getDifficultyPolicy"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const id = String(raw.policyId ?? raw.id ?? "");
    const policy = policies.get(id);
    if (!policy) {
      const err = new Error("Policy not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    return { data: policy, ...responseMeta(String(raw.correlationId ?? "")) };
  }

}
