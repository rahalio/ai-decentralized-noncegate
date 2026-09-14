/**
 * WebhookRepositoryDdb — sandbox.
 */
import type { WebhookRepository } from "@noncegate/services/webhook";
import {
  ensureDemoSeed,
  nowIso,
  responseMeta,
  sandboxId,
  webhooks,
  type SettlementWebhook,
} from "../_shared/noncegate-sandbox-store.js";

export class WebhookRepositoryDdb implements WebhookRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listSettlementWebhooks(input: Parameters<WebhookRepository["listSettlementWebhooks"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    return { data: { items: [...webhooks.values()] }, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async createSettlementWebhook(input: Parameters<WebhookRepository["createSettlementWebhook"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const now = nowIso();
    const hook: SettlementWebhook = {
      id: sandboxId("whk"),
      name: String(raw.name ?? "consumer"),
      endpointUrl: String(raw.endpointUrl ?? ""),
      status: "active",
      pauseOnFail: raw.pauseOnFail !== false,
      createdAt: now,
      updatedAt: now,
    };
    webhooks.set(hook.id, hook);
    return { data: hook, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async getSettlementWebhook(input: Parameters<WebhookRepository["getSettlementWebhook"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const hook = webhooks.get(String(raw.webhookId ?? ""));
    if (!hook) {
      const err = new Error("Webhook not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    return { data: hook, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
