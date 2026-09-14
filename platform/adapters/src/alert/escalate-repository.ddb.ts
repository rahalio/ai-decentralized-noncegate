/**
 * EscalateRepositoryDdb — sandbox.
 */
import type { EscalateRepository } from "@noncegate/services/alert";
import { alerts, ensureDemoSeed, nowIso, responseMeta } from "../_shared/noncegate-sandbox-store.js";

export class EscalateRepositoryDdb implements EscalateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async escalateAlert(input: Parameters<EscalateRepository["escalateAlert"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const alert = alerts.get(String(raw.alertId ?? ""));
    if (!alert) {
      const err = new Error("Alert not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    alert.status = "escalated";
    alert.updatedAt = nowIso();
    alerts.set(alert.id, alert);
    return { data: alert, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
