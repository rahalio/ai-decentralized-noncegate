/**
 * PauseRepositoryDdb — sandbox.
 */
import type { PauseRepository } from "@noncegate/services/webhook";
import { ensureDemoSeed, nowIso, responseMeta, webhooks } from "../_shared/noncegate-sandbox-store.js";

export class PauseRepositoryDdb implements PauseRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async pauseSettlementWebhook(input: Parameters<PauseRepository["pauseSettlementWebhook"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const hook = webhooks.get(String(raw.webhookId ?? ""));
    if (!hook) {
      const err = new Error("Webhook not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    hook.status = raw.paused ? "paused" : "active";
    hook.updatedAt = nowIso();
    webhooks.set(hook.id, hook);
    return { data: hook, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
