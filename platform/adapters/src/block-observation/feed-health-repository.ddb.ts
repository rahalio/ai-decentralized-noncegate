/**
 * FeedHealthRepositoryDdb — sandbox.
 */
import type { FeedHealthRepository } from "@noncegate/services/block-observation";
import { getFeedHealth, responseMeta } from "../_shared/noncegate-sandbox-store.js";

export class FeedHealthRepositoryDdb implements FeedHealthRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getNodeFeedHealth(input: Parameters<FeedHealthRepository["getNodeFeedHealth"]>[0]) {
    const raw = input as Record<string, unknown>;
    return { data: getFeedHealth(), ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
