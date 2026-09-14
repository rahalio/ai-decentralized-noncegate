/**
 * Fork Report Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/fork-report.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ForkId = components["schemas"]["ForkId"];
export type ForkReport = components["schemas"]["ForkReport"];
export type ForkReportListData = components["schemas"]["ForkReportListData"];
export type ForkStatus = components["schemas"]["ForkStatus"];
export type ForkAcknowledgeRequest = components["schemas"]["ForkAcknowledgeRequest"];
export type ForkReportCreateRequest = components["schemas"]["ForkReportCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateForkReportRequestInput = NonNullable<operations["createForkReport"]["requestBody"]>["content"]["application/json"];
export type AcknowledgeForkReportRequestInput = NonNullable<operations["acknowledgeForkReport"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListForkReportsParams = NonNullable<operations["listForkReports"]["parameters"]["query"]>;
export type GetForkReportParams = operations["getForkReport"]["parameters"]["path"];
export type AcknowledgeForkReportParams = operations["acknowledgeForkReport"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListForkReportsResponse = operations["listForkReports"]["responses"]["200"]["content"]["application/json"];
export type CreateForkReportResponse = operations["createForkReport"]["responses"]["201"]["content"]["application/json"];
export type GetForkReportResponse = operations["getForkReport"]["responses"]["200"]["content"]["application/json"];
export type AcknowledgeForkReportResponse = operations["acknowledgeForkReport"]["responses"]["200"]["content"]["application/json"];


