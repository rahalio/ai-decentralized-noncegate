/**
 * Difficulty Policy Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/difficulty-policy.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ApprovalDecision = components["schemas"]["ApprovalDecision"];
export type DifficultyPolicy = components["schemas"]["DifficultyPolicy"];
export type DifficultyPolicyListData = components["schemas"]["DifficultyPolicyListData"];
export type OperatorApproval = components["schemas"]["OperatorApproval"];
export type PolicyId = components["schemas"]["PolicyId"];
export type PolicyStatus = components["schemas"]["PolicyStatus"];
export type DifficultyPolicyApprovalRequest = components["schemas"]["DifficultyPolicyApprovalRequest"];
export type DifficultyPolicyCreateRequest = components["schemas"]["DifficultyPolicyCreateRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateDifficultyPolicyRequestInput = NonNullable<operations["createDifficultyPolicy"]["requestBody"]>["content"]["application/json"];
export type ApproveDifficultyPolicyRequestInput = NonNullable<operations["approveDifficultyPolicy"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDifficultyPoliciesParams = NonNullable<operations["listDifficultyPolicies"]["parameters"]["query"]>;
export type GetDifficultyPolicyParams = operations["getDifficultyPolicy"]["parameters"]["path"];
export type ApproveDifficultyPolicyParams = operations["approveDifficultyPolicy"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDifficultyPoliciesResponse = operations["listDifficultyPolicies"]["responses"]["200"]["content"]["application/json"];
export type CreateDifficultyPolicyResponse = operations["createDifficultyPolicy"]["responses"]["201"]["content"]["application/json"];
export type GetDifficultyPolicyResponse = operations["getDifficultyPolicy"]["responses"]["200"]["content"]["application/json"];
export type ApproveDifficultyPolicyResponse = operations["approveDifficultyPolicy"]["responses"]["200"]["content"]["application/json"];
export type GetActiveDifficultyPolicyResponse = operations["getActiveDifficultyPolicy"]["responses"]["200"]["content"]["application/json"];


