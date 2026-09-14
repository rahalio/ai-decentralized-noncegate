/**
 * AlertRepositoryDdb — sandbox.
 */
import type { AlertRepository } from "@noncegate/services/alert";
import {
  alerts,
  ensureDemoSeed,
  nowIso,
  responseMeta,
  sandboxId,
  type Alert,
} from "../_shared/noncegate-sandbox-store.js";

export class AlertRepositoryDdb implements AlertRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listAlerts(input: Parameters<AlertRepository["listAlerts"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    let items = [...alerts.values()];
    if (raw.status) items = items.filter((a) => a.status === String(raw.status));
    if (raw.severity) items = items.filter((a) => a.severity === String(raw.severity));
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async createAlert(input: Parameters<AlertRepository["createAlert"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const now = nowIso();
    const alert: Alert = {
      id: sandboxId("alt"),
      alertType: String(raw.alertType ?? "invalidNonce") as Alert["alertType"],
      severity: String(raw.severity ?? "medium") as Alert["severity"],
      status: "open",
      message: String(raw.message ?? ""),
      createdAt: now,
      updatedAt: now,
    };
    alerts.set(alert.id, alert);
    return { data: alert, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async getAlert(input: Parameters<AlertRepository["getAlert"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const alert = alerts.get(String(raw.alertId ?? ""));
    if (!alert) {
      const err = new Error("Alert not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    return { data: alert, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
