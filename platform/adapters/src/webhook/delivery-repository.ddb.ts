/**
 * DeliveryRepositoryDdb — sandbox.
 */
import type { DeliveryRepository } from "@noncegate/services/webhook";
import { deliveries, ensureDemoSeed, responseMeta } from "../_shared/noncegate-sandbox-store.js";

export class DeliveryRepositoryDdb implements DeliveryRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listWebhookDeliveries(input: Parameters<DeliveryRepository["listWebhookDeliveries"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const webhookId = String(raw.webhookId ?? "");
    const items = [...deliveries.values()].filter((d) => d.webhookId === webhookId);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
