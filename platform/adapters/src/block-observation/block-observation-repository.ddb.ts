/**
 * BlockObservationRepositoryDdb — sandbox in-memory implementation.
 */
import type { BlockObservationRepository } from "@noncegate/services/block-observation";
import {
  blocks,
  ensureDemoSeed,
  nowIso,
  responseMeta,
  sandboxId,
  type BlockObservation,
} from "../_shared/noncegate-sandbox-store.js";

export class BlockObservationRepositoryDdb implements BlockObservationRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listBlockObservations(input: Parameters<BlockObservationRepository["listBlockObservations"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    return { data: { items: [...blocks.values()] }, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async ingestBlockObservation(input: Parameters<BlockObservationRepository["ingestBlockObservation"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const now = nowIso();
    const obs: BlockObservation = {
      id: sandboxId("blk"),
      height: Number(raw.height ?? 0),
      blockHash: String(raw.blockHash ?? ""),
      parentHash: String(raw.parentHash ?? ""),
      nonce: String(raw.nonce ?? ""),
      difficultyBits: raw.difficultyBits != null ? Number(raw.difficultyBits) : undefined,
      observedAt: String(raw.observedAt ?? now),
      headerOnly: raw.headerOnly !== false,
      clientLabel: raw.clientLabel ? String(raw.clientLabel) : undefined,
      isHonestTip: true,
    };
    for (const b of blocks.values()) b.isHonestTip = false;
    blocks.set(obs.id, obs);
    return { data: obs, ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async getBlockObservation(input: Parameters<BlockObservationRepository["getBlockObservation"]>[0]) {
    ensureDemoSeed();
    const raw = input as Record<string, unknown>;
    const id = String(raw.blockId ?? "");
    const obs = blocks.get(id);
    if (!obs) {
      const err = new Error("Block not found") as Error & { statusCode?: number };
      err.statusCode = 404;
      throw err;
    }
    return { data: obs, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
