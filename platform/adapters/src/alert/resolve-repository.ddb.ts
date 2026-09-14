/**
 * ResolveRepositoryDdb — sandbox.
 */
import type { ResolveRepository } from "@noncegate/services/alert";
import { alerts, ensureDemoSeed, nowIso, responseMeta } from "../_shared/noncegate-sandbox-store.js";

export class ResolveRepositoryDdb implements ResolveRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async resolveAlert(input: Parameters<ResolveRepository["resolveAlert"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const alert = alerts.get(String(raw.alertId ?? ""));
    if (!alert) {
      const err = new Error("Alert not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    alert.status = "closed";
    alert.resolutionNote = String(raw.resolutionNote ?? "");
    alert.updatedAt = nowIso();
    alerts.set(alert.id, alert);
    return { data: alert, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
