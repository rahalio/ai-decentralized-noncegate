/**
 * TestRepositoryDdb — sandbox.
 */
import type { TestRepository } from "@noncegate/services/webhook";
import {
  deliveries,
  ensureDemoSeed,
  nowIso,
  responseMeta,
  sandboxId,
  webhooks,
  type WebhookDelivery,
} from "../_shared/noncegate-sandbox-store.js";

export class TestRepositoryDdb implements TestRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async testSettlementWebhook(input: Parameters<TestRepository["testSettlementWebhook"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const hook = webhooks.get(String(raw.webhookId ?? ""));
    if (!hook) {
      const err = new Error("Webhook not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    const delivery: WebhookDelivery = {
      id: sandboxId("whd"),
      webhookId: hook.id,
      status: "delivered",
      eventType: "verification.test",
      httpStatus: 200,
      createdAt: nowIso(),
    };
    deliveries.set(delivery.id, delivery);
    return { data: delivery, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
