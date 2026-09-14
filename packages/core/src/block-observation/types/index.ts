/**
 * Block Observation Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/block-observation.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BlockId = components["schemas"]["BlockId"];
export type BlockObservation = components["schemas"]["BlockObservation"];
export type BlockObservationListData = components["schemas"]["BlockObservationListData"];
export type FeedStatus = components["schemas"]["FeedStatus"];
export type HonestTipSummary = components["schemas"]["HonestTipSummary"];
export type NodeFeedHealth = components["schemas"]["NodeFeedHealth"];
export type BlockObservationCreateRequest = components["schemas"]["BlockObservationCreateRequest"];
export type HeaderOnlySettingsUpdateRequest = components["schemas"]["HeaderOnlySettingsUpdateRequest"];
export type HonestTip = components["schemas"]["HonestTipResponse"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type IngestBlockObservationRequestInput = NonNullable<operations["ingestBlockObservation"]["requestBody"]>["content"]["application/json"];
export type UpdateHeaderOnlySettingsRequestInput = NonNullable<operations["updateHeaderOnlySettings"]["requestBody"]>["content"]["application/json"];
export type UpdateHeaderOnlySettingsRequest = UpdateHeaderOnlySettingsRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListBlockObservationsParams = NonNullable<operations["listBlockObservations"]["parameters"]["query"]>;
export type GetBlockObservationParams = operations["getBlockObservation"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListBlockObservationsResponse = operations["listBlockObservations"]["responses"]["200"]["content"]["application/json"];
export type IngestBlockObservationResponse = operations["ingestBlockObservation"]["responses"]["201"]["content"]["application/json"];
export type GetBlockObservationResponse = operations["getBlockObservation"]["responses"]["200"]["content"]["application/json"];
export type GetHonestTipResponse = operations["getHonestTip"]["responses"]["200"]["content"]["application/json"];
export type GetNodeFeedHealthResponse = operations["getNodeFeedHealth"]["responses"]["200"]["content"]["application/json"];
export type GetHeaderOnlySettingsResponse = operations["getHeaderOnlySettings"]["responses"]["200"]["content"]["application/json"];
export type UpdateHeaderOnlySettingsResponse = operations["updateHeaderOnlySettings"]["responses"]["200"]["content"]["application/json"];


