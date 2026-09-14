/**
 * VerificationResultRepositoryDdb — sandbox.
 */
import type { VerificationResultRepository } from "@noncegate/services/verification-result";
import {
  ensureDemoSeed,
  nowIso,
  responseMeta,
  sandboxId,
  verifications,
  type VerificationResult,
} from "../_shared/noncegate-sandbox-store.js";

export class VerificationResultRepositoryDdb implements VerificationResultRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listVerificationResults(input: Parameters<VerificationResultRepository["listVerificationResults"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    let items = [...verifications.values()];
    if (raw.valid != null) items = items.filter((r) => r.valid === Boolean(raw.valid));
    if (raw.blockId) items = items.filter((r) => r.blockId === String(raw.blockId));
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async createVerificationResult(input: Parameters<VerificationResultRepository["createVerificationResult"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const result: VerificationResult = {
      id: sandboxId("vrf"),
      blockId: String(raw.blockId ?? ""),
      policyId: String(raw.policyId ?? ""),
      valid: true,
      verifyDurationMs: 2,
      headerOnly: true,
      parentHashMatched: true,
      createdAt: nowIso(),
    };
    verifications.set(result.id, result);
    return { data: result, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async getVerificationResult(input: Parameters<VerificationResultRepository["getVerificationResult"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const result = verifications.get(String(raw.resultId ?? ""));
    if (!result) {
      const err = new Error("Result not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    return { data: result, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
