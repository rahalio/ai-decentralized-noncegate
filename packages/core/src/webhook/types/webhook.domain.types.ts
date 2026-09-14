/**
 * Webhook Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/webhook.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DeliveryId = components["schemas"]["DeliveryId"];
export type DeliveryStatus = components["schemas"]["DeliveryStatus"];
export type SettlementWebhook = components["schemas"]["SettlementWebhook"];
export type SettlementWebhookListData = components["schemas"]["SettlementWebhookListData"];
export type WebhookDelivery = components["schemas"]["WebhookDelivery"];
export type WebhookDeliveryListData = components["schemas"]["WebhookDeliveryListData"];
export type WebhookId = components["schemas"]["WebhookId"];
export type WebhookStatus = components["schemas"]["WebhookStatus"];
export type SettlementWebhookCreateRequest = components["schemas"]["SettlementWebhookCreateRequest"];
export type WebhookPauseRequest = components["schemas"]["WebhookPauseRequest"];
export type Webhook = operations["listSettlementWebhooks"]["responses"]["200"]["content"]["application/json"]["data"];
export type Delivery = operations["listWebhookDeliveries"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateSettlementWebhookRequestInput = NonNullable<operations["createSettlementWebhook"]["requestBody"]>["content"]["application/json"];
export type PauseSettlementWebhookRequestInput = NonNullable<operations["pauseSettlementWebhook"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSettlementWebhooksParams = NonNullable<operations["listSettlementWebhooks"]["parameters"]["query"]>;
export type GetSettlementWebhookParams = operations["getSettlementWebhook"]["parameters"]["path"];
export type PauseSettlementWebhookParams = operations["pauseSettlementWebhook"]["parameters"]["path"];
export type TestSettlementWebhookParams = operations["testSettlementWebhook"]["parameters"]["path"];
export type ListWebhookDeliveriesParams = NonNullable<operations["listWebhookDeliveries"]["parameters"]["query"]>;
export type ReplayWebhookDeliveryParams = operations["replayWebhookDelivery"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSettlementWebhooksResponse = operations["listSettlementWebhooks"]["responses"]["200"]["content"]["application/json"];
export type CreateSettlementWebhookResponse = operations["createSettlementWebhook"]["responses"]["201"]["content"]["application/json"];
export type GetSettlementWebhookResponse = operations["getSettlementWebhook"]["responses"]["200"]["content"]["application/json"];
export type PauseSettlementWebhookResponse = operations["pauseSettlementWebhook"]["responses"]["200"]["content"]["application/json"];
export type TestSettlementWebhookResponse = operations["testSettlementWebhook"]["responses"]["201"]["content"]["application/json"];
export type ListWebhookDeliveriesResponse = operations["listWebhookDeliveries"]["responses"]["200"]["content"]["application/json"];
export type ReplayWebhookDeliveryResponse = operations["replayWebhookDelivery"]["responses"]["201"]["content"]["application/json"];


