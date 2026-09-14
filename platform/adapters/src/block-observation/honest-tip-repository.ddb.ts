/**
 * HonestTipRepositoryDdb — sandbox.
 */
import type { HonestTipRepository } from "@noncegate/services/block-observation";
import {
  getHonestTipSummary,
  responseMeta,
} from "../_shared/noncegate-sandbox-store.js";

export class HonestTipRepositoryDdb implements HonestTipRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getHonestTip(input: Parameters<HonestTipRepository["getHonestTip"]>[0]) {
    const raw = input as Record<string, unknown>;
    return { data: getHonestTipSummary(), ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
