/**
 * ForkReportRepositoryDdb — sandbox.
 */
import type { ForkReportRepository } from "@noncegate/services/fork-report";
import {
  ensureDemoSeed,
  forks,
  nowIso,
  responseMeta,
  sandboxId,
  type ForkReport,
} from "../_shared/noncegate-sandbox-store.js";

export class ForkReportRepositoryDdb implements ForkReportRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listForkReports(input: Parameters<ForkReportRepository["listForkReports"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    let items = [...forks.values()];
    if (raw.status) items = items.filter((f) => f.status === String(raw.status));
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async createForkReport(input: Parameters<ForkReportRepository["createForkReport"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const now = nowIso();
    const fork: ForkReport = {
      id: sandboxId("frk"),
      honestTipHash: String(raw.honestTipHash ?? ""),
      candidateTipHash: String(raw.candidateTipHash ?? ""),
      workDifferential: Number(raw.workDifferential ?? 0),
      recomputeCostEstimate: raw.recomputeCostEstimate ? String(raw.recomputeCostEstimate) : undefined,
      status: "open",
      createdAt: now,
      updatedAt: now,
    };
    forks.set(fork.id, fork);
    return { data: fork, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async getForkReport(input: Parameters<ForkReportRepository["getForkReport"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const fork = forks.get(String(raw.forkId ?? ""));
    if (!fork) {
      const err = new Error("Fork not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    return { data: fork, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
