/**
 * AuditPackRepositoryDdb — sandbox.
 */
import type { AuditPackRepository } from "@noncegate/services/audit-pack";
import {
  ensureDemoSeed,
  nowIso,
  packs,
  policies,
  responseMeta,
  sandboxId,
  verifications,
  alerts,
  type AuditPack,
} from "../_shared/noncegate-sandbox-store.js";

export class AuditPackRepositoryDdb implements AuditPackRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listAuditPacks(input: Parameters<AuditPackRepository["listAuditPacks"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    return { data: { items: [...packs.values()] }, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async createAuditPack(input: Parameters<AuditPackRepository["createAuditPack"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const now = nowIso();
    const pack: AuditPack = {
      id: sandboxId("apk"),
      periodStart: String(raw.periodStart ?? now),
      periodEnd: String(raw.periodEnd ?? now),
      status: "ready",
      downloadUri: "https://noncegate.local/packs/demo.json",
      contentHash: "sha256:" + sandboxId("hsh").slice(4),
      policyCount: policies.size,
      verificationCount: verifications.size,
      alertResolutionCount: [...alerts.values()].filter((a) => a.status === "closed").length,
      coveragePct: 100,
      retentionWarning: false,
      createdAt: now,
      updatedAt: now,
    };
    packs.set(pack.id, pack);
    return { data: pack, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async getAuditPack(input: Parameters<AuditPackRepository["getAuditPack"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const pack = packs.get(String(raw.packId ?? ""));
    if (!pack) {
      const err = new Error("Pack not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    return { data: pack, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
