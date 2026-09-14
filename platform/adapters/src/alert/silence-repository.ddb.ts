/**
 * SilenceRepositoryDdb — sandbox.
 */
import type { SilenceRepository } from "@noncegate/services/alert";
import { alerts, ensureDemoSeed, nowIso, responseMeta } from "../_shared/noncegate-sandbox-store.js";

export class SilenceRepositoryDdb implements SilenceRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async silenceAlert(input: Parameters<SilenceRepository["silenceAlert"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const alert = alerts.get(String(raw.alertId ?? ""));
    if (!alert) {
      const err = new Error("Alert not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    alert.status = "silenced";
    alert.silenceExpiresAt = String(raw.silenceExpiresAt ?? nowIso());
    alert.updatedAt = nowIso();
    alerts.set(alert.id, alert);
    return { data: alert, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
