/**
 * HeaderOnlySettingRepositoryDdb — sandbox.
 */
import type { HeaderOnlySettingRepository } from "@noncegate/services/block-observation";
import {
  getHeaderOnlySettings,
  responseMeta,
  setHeaderOnlySettings,
} from "../_shared/noncegate-sandbox-store.js";

export class HeaderOnlySettingRepositoryDdb implements HeaderOnlySettingRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getHeaderOnlySettings(input: Parameters<HeaderOnlySettingRepository["getHeaderOnlySettings"]>[0]) {
    const raw = input as Record<string, unknown>;
    return { data: getHeaderOnlySettings(), ...responseMeta(String(raw.correlationId ?? "")) };
  }

  async updateHeaderOnlySettings(input: Parameters<HeaderOnlySettingRepository["updateHeaderOnlySettings"]>[0]) {
    const raw = input as Record<string, unknown>;
    const data = setHeaderOnlySettings({
      enabled: Boolean(raw.enabled),
      requiredHeaderFields: Array.isArray(raw.requiredHeaderFields)
        ? (raw.requiredHeaderFields as string[])
        : undefined,
      redactionNote: raw.redactionNote ? String(raw.redactionNote) : undefined,
    });
    return { data, ...responseMeta(String(raw.correlationId ?? "")) };
  }
}
