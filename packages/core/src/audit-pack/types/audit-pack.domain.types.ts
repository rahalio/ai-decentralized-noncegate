/**
 * Audit Pack Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/audit-pack.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AuditPack = components["schemas"]["AuditPack"];
export type AuditPackListData = components["schemas"]["AuditPackListData"];
export type AuditPackStatus = components["schemas"]["AuditPackStatus"];
export type PackId = components["schemas"]["PackId"];
export type AuditPackCreateRequest = components["schemas"]["AuditPackCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateAuditPackRequestInput = NonNullable<operations["createAuditPack"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListAuditPacksParams = NonNullable<operations["listAuditPacks"]["parameters"]["query"]>;
export type GetAuditPackParams = operations["getAuditPack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListAuditPacksResponse = operations["listAuditPacks"]["responses"]["200"]["content"]["application/json"];
export type CreateAuditPackResponse = operations["createAuditPack"]["responses"]["201"]["content"]["application/json"];
export type GetAuditPackResponse = operations["getAuditPack"]["responses"]["200"]["content"]["application/json"];


