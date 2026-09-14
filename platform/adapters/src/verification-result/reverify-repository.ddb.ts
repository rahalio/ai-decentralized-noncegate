/**
 * ReverifyRepositoryDdb — sandbox.
 */
import type { ReverifyRepository } from "@noncegate/services/verification-result";
import {
  ensureDemoSeed,
  nowIso,
  responseMeta,
  sandboxId,
  verifications,
  type VerificationResult,
} from "../_shared/noncegate-sandbox-store.js";

export class ReverifyRepositoryDdb implements ReverifyRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async reverifySample(input: Parameters<ReverifyRepository["reverifySample"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const result: VerificationResult = {
      id: sandboxId("vrf"),
      blockId: String(raw.blockId ?? ""),
      policyId: String(raw.policyId ?? "pol_active"),
      valid: true,
      verifyDurationMs: 4,
      headerOnly: true,
      createdAt: nowIso(),
    };
    verifications.set(result.id, result);
    return { data: result, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
