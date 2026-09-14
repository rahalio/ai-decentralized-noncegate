/**
 * ReplayRepositoryDdb — sandbox.
 */
import type { ReplayRepository } from "@noncegate/services/webhook";
import {
  deliveries,
  ensureDemoSeed,
  nowIso,
  responseMeta,
  sandboxId,
  type WebhookDelivery,
} from "../_shared/noncegate-sandbox-store.js";

export class ReplayRepositoryDdb implements ReplayRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async replayWebhookDelivery(input: Parameters<ReplayRepository["replayWebhookDelivery"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const prior = deliveries.get(String(raw.deliveryId ?? ""));
    if (!prior) {
      const err = new Error("Delivery not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    const delivery: WebhookDelivery = {
      ...prior,
      id: sandboxId("whd"),
      status: "replayed",
      createdAt: nowIso(),
    };
    deliveries.set(delivery.id, delivery);
    return { data: delivery, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
