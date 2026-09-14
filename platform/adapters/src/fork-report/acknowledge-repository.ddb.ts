/**
 * AcknowledgeRepositoryDdb — sandbox.
 */
import type { AcknowledgeRepository } from "@noncegate/services/fork-report";
import { ensureDemoSeed, forks, nowIso, responseMeta } from "../_shared/noncegate-sandbox-store.js";

export class AcknowledgeRepositoryDdb implements AcknowledgeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async acknowledgeForkReport(input: Parameters<AcknowledgeRepository["acknowledgeForkReport"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const fork = forks.get(String(raw.forkId ?? ""));
    if (!fork) {
      const err = new Error("Fork not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    fork.status = "acknowledged";
    if (raw.incidentNotes) fork.incidentNotes = String(raw.incidentNotes);
    fork.updatedAt = nowIso();
    forks.set(fork.id, fork);
    return { data: fork, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
