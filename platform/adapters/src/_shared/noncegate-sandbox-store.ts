/**
 * Process-wide in-memory store for Noncegate local / sandbox flows.
 */

import { ulid } from "ulid";

export function nowIso(): string {
  return new Date().toISOString();
}

export function sandboxId(prefix: string): string {
  return `${prefix}_${ulid().toLowerCase()}`;
}

export function responseMeta(correlationId = "") {
  return {
    meta: {
      requestId: sandboxId("req").replace("req_", ""),
      correlationId: correlationId || undefined,
      generatedAt: nowIso(),
    },
  };
}

export type DifficultyPolicy = {
  id: string;
  version: number;
  difficulty: number;
  leadingZeroTarget: number;
  status: "draft" | "pendingApproval" | "approved" | "active" | "superseded" | "rejected";
  effectiveAt: string;
  proposedByUserId?: string;
  changeLogNote?: string;
  liveNetworkDifficulty?: number;
  driftDetected?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BlockObservation = {
  id: string;
  height: number;
  blockHash: string;
  parentHash: string;
  nonce: string;
  difficultyBits?: number;
  observedAt: string;
  headerOnly: boolean;
  clientLabel?: string;
  isHonestTip?: boolean;
};

export type VerificationResult = {
  id: string;
  blockId: string;
  policyId: string;
  policyVersion?: number;
  valid: boolean;
  verifyDurationMs: number;
  failureReason?: string;
  headerOnly?: boolean;
  parentHashMatched?: boolean;
  createdAt: string;
};

export type ForkReport = {
  id: string;
  honestTipHash: string;
  candidateTipHash: string;
  workDifferential: number;
  recomputeCostEstimate?: string;
  affectedHeightStart?: number;
  affectedHeightEnd?: number;
  status: "open" | "acknowledged" | "resolved" | "falsePositive";
  incidentNotes?: string;
  createdAt: string;
  updatedAt: string;
};

export type Alert = {
  id: string;
  alertType: "invalidNonce" | "policyDrift" | "hashRateCliff" | "forkDetected";
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "acked" | "escalated" | "silenced" | "closed";
  message: string;
  relatedBlockId?: string;
  relatedPolicyId?: string;
  relatedForkId?: string;
  resolutionNote?: string;
  silenceExpiresAt?: string;
  webhookEmitted?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AuditPack = {
  id: string;
  periodStart: string;
  periodEnd: string;
  status: "pending" | "ready" | "failed";
  downloadUri?: string;
  contentHash?: string;
  policyCount?: number;
  verificationCount?: number;
  alertResolutionCount?: number;
  coveragePct?: number;
  retentionWarning?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SettlementWebhook = {
  id: string;
  name: string;
  endpointUrl: string;
  status: "active" | "paused" | "disabled";
  pauseOnFail: boolean;
  lastGatedTipHash?: string;
  lastDeliveryStatus?: "pending" | "delivered" | "failed" | "replayed";
  createdAt: string;
  updatedAt: string;
};

export type WebhookDelivery = {
  id: string;
  webhookId: string;
  status: "pending" | "delivered" | "failed" | "replayed";
  eventType: string;
  tipHash?: string;
  httpStatus?: number;
  errorDetail?: string;
  createdAt: string;
};

export type HeaderOnlySettings = {
  enabled: boolean;
  requiredHeaderFields: string[];
  redactionNote?: string;
  updatedAt: string;
};

export type NodeFeedHealth = {
  status: "healthy" | "lagging" | "down" | "paused";
  observationLagMs: number;
  clientLabel?: string;
  headerOnlyMode: boolean;
  lastBlockId?: string;
  updatedAt: string;
  nonReplacementBanner?: string;
};

export const policies = new Map<string, DifficultyPolicy>();
export const blocks = new Map<string, BlockObservation>();
export const verifications = new Map<string, VerificationResult>();
export const forks = new Map<string, ForkReport>();
export const alerts = new Map<string, Alert>();
export const packs = new Map<string, AuditPack>();
export const webhooks = new Map<string, SettlementWebhook>();
export const deliveries = new Map<string, WebhookDelivery>();

let headerOnly: HeaderOnlySettings = {
  enabled: true,
  requiredHeaderFields: ["height", "blockHash", "parentHash", "nonce"],
  redactionNote: "Bodies redacted; PoW verified on headers only.",
  updatedAt: nowIso(),
};

let feedHealth: NodeFeedHealth = {
  status: "healthy",
  observationLagMs: 120,
  clientLabel: "geth-sidecar-1",
  headerOnlyMode: true,
  updatedAt: nowIso(),
  nonReplacementBanner:
    "Assurance plane only — consensus remains on node clients (BR-9).",
};

let seeded = false;

export function ensureDemoSeed() {
  if (seeded) return;
  seeded = true;
  const now = nowIso();
  const polId = sandboxId("pol");
  policies.set(polId, {
    id: polId,
    version: 1,
    difficulty: 24,
    leadingZeroTarget: 4,
    status: "active",
    effectiveAt: now,
    proposedByUserId: "usr_demo_ops",
    liveNetworkDifficulty: 24,
    driftDetected: false,
    createdAt: now,
    updatedAt: now,
  });

  const pendingId = sandboxId("pol");
  policies.set(pendingId, {
    id: pendingId,
    version: 2,
    difficulty: 26,
    leadingZeroTarget: 5,
    status: "pendingApproval",
    effectiveAt: new Date(Date.now() + 3600_000).toISOString(),
    proposedByUserId: "usr_demo_ops",
    createdAt: now,
    updatedAt: now,
  });

  const blkId = sandboxId("blk");
  blocks.set(blkId, {
    id: blkId,
    height: 1042,
    blockHash: "0xabc" + "0".repeat(60),
    parentHash: "0xdef" + "0".repeat(60),
    nonce: "0x42",
    observedAt: now,
    headerOnly: true,
    clientLabel: "geth-sidecar-1",
    isHonestTip: true,
  });
  feedHealth = { ...feedHealth, lastBlockId: blkId, updatedAt: now };

  const vrfId = sandboxId("vrf");
  verifications.set(vrfId, {
    id: vrfId,
    blockId: blkId,
    policyId: polId,
    policyVersion: 1,
    valid: true,
    verifyDurationMs: 3,
    headerOnly: true,
    parentHashMatched: true,
    createdAt: now,
  });

  const frkId = sandboxId("frk");
  forks.set(frkId, {
    id: frkId,
    honestTipHash: "0xabc" + "0".repeat(60),
    candidateTipHash: "0xbad" + "0".repeat(60),
    workDifferential: 2.5,
    recomputeCostEstimate: "~18 hours of honest tip hash-rate to rewrite",
    affectedHeightStart: 1030,
    affectedHeightEnd: 1042,
    status: "open",
    createdAt: now,
    updatedAt: now,
  });

  const altId = sandboxId("alt");
  alerts.set(altId, {
    id: altId,
    alertType: "forkDetected",
    severity: "high",
    status: "open",
    message: "Candidate tip trails honest tip by 2.5 work units",
    relatedForkId: frkId,
    createdAt: now,
    updatedAt: now,
  });
}

export function getHeaderOnlySettings(): HeaderOnlySettings {
  ensureDemoSeed();
  return headerOnly;
}

export function setHeaderOnlySettings(next: Partial<HeaderOnlySettings>): HeaderOnlySettings {
  ensureDemoSeed();
  headerOnly = {
    ...headerOnly,
    ...next,
    updatedAt: nowIso(),
  };
  feedHealth = {
    ...feedHealth,
    headerOnlyMode: headerOnly.enabled,
    updatedAt: nowIso(),
  };
  return headerOnly;
}

export function getFeedHealth(): NodeFeedHealth {
  ensureDemoSeed();
  return feedHealth;
}

export function getHonestTipSummary() {
  ensureDemoSeed();
  const tip = [...blocks.values()].find((b) => b.isHonestTip) ?? [...blocks.values()].at(-1);
  const results = [...verifications.values()];
  const pass = results.filter((r) => r.valid).length;
  const coverage = results.length ? (pass / results.length) * 100 : 0;
  const openFork = [...forks.values()].find((f) => f.status === "open");
  const openAlerts = [...alerts.values()].filter((a) => a.status === "open").length;
  return {
    tip,
    verificationCoveragePct: coverage,
    verifyMineTimeRatio: 0.002,
    openForkDifferential: openFork?.workDifferential ?? 0,
    openAlertCount: openAlerts,
  };
}
