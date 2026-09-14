import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createDifficultyPolicy_Body = z
  .object({
    difficulty: z.number().int().gte(1),
    leadingZeroTarget: z.number().int().gte(0),
    effectiveAt: z.string().datetime({ offset: true }),
    changeLogNote: z.string().max(2000).optional(),
  })
  .passthrough();
const approveDifficultyPolicy_Body = z
  .object({
    decision: z.enum(['approve', 'reject']),
    reason: z.string().max(2000).optional(),
  })
  .passthrough();
const PolicyStatus = z.enum([
  'draft',
  'pendingApproval',
  'approved',
  'active',
  'superseded',
  'rejected',
]);
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const PolicyId = z.string();
const UserId = z.string();
const ApprovalDecision = z.enum(['approve', 'reject']);
const OperatorApproval = z
  .object({
    approverUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
    decision: z.enum(['approve', 'reject']),
    reason: z.string().max(2000).optional(),
    decidedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DifficultyPolicy = z
  .object({
    id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
    version: z.number().int().gte(1),
    difficulty: z.number().int().gte(1),
    leadingZeroTarget: z.number().int().gte(0),
    status: z.enum([
      'draft',
      'pendingApproval',
      'approved',
      'active',
      'superseded',
      'rejected',
    ]),
    effectiveAt: z.string().datetime({ offset: true }),
    proposedByUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    approvals: z
      .array(
        z
          .object({
            approverUserId: z.string().regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
            decision: z.enum(['approve', 'reject']),
            reason: z.string().max(2000).optional(),
            decidedAt: z.string().datetime({ offset: true }),
          })
          .passthrough()
      )
      .optional(),
    changeLogNote: z.string().max(2000).optional(),
    liveNetworkDifficulty: z.number().int().optional(),
    driftDetected: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DifficultyPolicyListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
          version: z.number().int().gte(1),
          difficulty: z.number().int().gte(1),
          leadingZeroTarget: z.number().int().gte(0),
          status: z.enum([
            'draft',
            'pendingApproval',
            'approved',
            'active',
            'superseded',
            'rejected',
          ]),
          effectiveAt: z.string().datetime({ offset: true }),
          proposedByUserId: z
            .string()
            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          approvals: z
            .array(
              z
                .object({
                  approverUserId: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                  decision: z.enum(['approve', 'reject']),
                  reason: z.string().max(2000).optional(),
                  decidedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            )
            .optional(),
          changeLogNote: z.string().max(2000).optional(),
          liveNetworkDifficulty: z.number().int().optional(),
          driftDetected: z.boolean().optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const DifficultyPolicyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
              version: z.number().int().gte(1),
              difficulty: z.number().int().gte(1),
              leadingZeroTarget: z.number().int().gte(0),
              status: z.enum([
                'draft',
                'pendingApproval',
                'approved',
                'active',
                'superseded',
                'rejected',
              ]),
              effectiveAt: z.string().datetime({ offset: true }),
              proposedByUserId: z
                .string()
                .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              approvals: z
                .array(
                  z
                    .object({
                      approverUserId: z
                        .string()
                        .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                      decision: z.enum(['approve', 'reject']),
                      reason: z.string().max(2000).optional(),
                      decidedAt: z.string().datetime({ offset: true }),
                    })
                    .passthrough()
                )
                .optional(),
              changeLogNote: z.string().max(2000).optional(),
              liveNetworkDifficulty: z.number().int().optional(),
              driftDetected: z.boolean().optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DifficultyPolicyCreateRequest = z
  .object({
    difficulty: z.number().int().gte(1),
    leadingZeroTarget: z.number().int().gte(0),
    effectiveAt: z.string().datetime({ offset: true }),
    changeLogNote: z.string().max(2000).optional(),
  })
  .passthrough();
const DifficultyPolicyResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
        version: z.number().int().gte(1),
        difficulty: z.number().int().gte(1),
        leadingZeroTarget: z.number().int().gte(0),
        status: z.enum([
          'draft',
          'pendingApproval',
          'approved',
          'active',
          'superseded',
          'rejected',
        ]),
        effectiveAt: z.string().datetime({ offset: true }),
        proposedByUserId: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        approvals: z
          .array(
            z
              .object({
                approverUserId: z
                  .string()
                  .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                decision: z.enum(['approve', 'reject']),
                reason: z.string().max(2000).optional(),
                decidedAt: z.string().datetime({ offset: true }),
              })
              .passthrough()
          )
          .optional(),
        changeLogNote: z.string().max(2000).optional(),
        liveNetworkDifficulty: z.number().int().optional(),
        driftDetected: z.boolean().optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const DifficultyPolicyApprovalRequest = z
  .object({
    decision: z.enum(['approve', 'reject']),
    reason: z.string().max(2000).optional(),
  })
  .passthrough();

export const schemas: any = {
  createDifficultyPolicy_Body,
  approveDifficultyPolicy_Body,
  PolicyStatus,
  Problem,
  PolicyId,
  UserId,
  ApprovalDecision,
  OperatorApproval,
  DifficultyPolicy,
  DifficultyPolicyListData,
  ResponseMeta,
  DifficultyPolicyListResponse,
  DifficultyPolicyCreateRequest,
  DifficultyPolicyResponse,
  DifficultyPolicyApprovalRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/difficulty-policies',
    alias: 'listDifficultyPolicies',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(100).optional().default(25),
      },
      {
        name: 'status',
        type: 'Query',
        schema: z
          .enum([
            'draft',
            'pendingApproval',
            'approved',
            'active',
            'superseded',
            'rejected',
          ])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
                  version: z.number().int().gte(1),
                  difficulty: z.number().int().gte(1),
                  leadingZeroTarget: z.number().int().gte(0),
                  status: z.enum([
                    'draft',
                    'pendingApproval',
                    'approved',
                    'active',
                    'superseded',
                    'rejected',
                  ]),
                  effectiveAt: z.string().datetime({ offset: true }),
                  proposedByUserId: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  approvals: z
                    .array(
                      z
                        .object({
                          approverUserId: z
                            .string()
                            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                          decision: z.enum(['approve', 'reject']),
                          reason: z.string().max(2000).optional(),
                          decidedAt: z.string().datetime({ offset: true }),
                        })
                        .passthrough()
                    )
                    .optional(),
                  changeLogNote: z.string().max(2000).optional(),
                  liveNetworkDifficulty: z.number().int().optional(),
                  driftDetected: z.boolean().optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/difficulty-policies',
    alias: 'createDifficultyPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createDifficultyPolicy_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.number().int().gte(1),
            difficulty: z.number().int().gte(1),
            leadingZeroTarget: z.number().int().gte(0),
            status: z.enum([
              'draft',
              'pendingApproval',
              'approved',
              'active',
              'superseded',
              'rejected',
            ]),
            effectiveAt: z.string().datetime({ offset: true }),
            proposedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            approvals: z
              .array(
                z
                  .object({
                    approverUserId: z
                      .string()
                      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                    decision: z.enum(['approve', 'reject']),
                    reason: z.string().max(2000).optional(),
                    decidedAt: z.string().datetime({ offset: true }),
                  })
                  .passthrough()
              )
              .optional(),
            changeLogNote: z.string().max(2000).optional(),
            liveNetworkDifficulty: z.number().int().optional(),
            driftDetected: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/difficulty-policies/:policyId',
    alias: 'getDifficultyPolicy',
    requestFormat: 'json',
    parameters: [
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.number().int().gte(1),
            difficulty: z.number().int().gte(1),
            leadingZeroTarget: z.number().int().gte(0),
            status: z.enum([
              'draft',
              'pendingApproval',
              'approved',
              'active',
              'superseded',
              'rejected',
            ]),
            effectiveAt: z.string().datetime({ offset: true }),
            proposedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            approvals: z
              .array(
                z
                  .object({
                    approverUserId: z
                      .string()
                      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                    decision: z.enum(['approve', 'reject']),
                    reason: z.string().max(2000).optional(),
                    decidedAt: z.string().datetime({ offset: true }),
                  })
                  .passthrough()
              )
              .optional(),
            changeLogNote: z.string().max(2000).optional(),
            liveNetworkDifficulty: z.number().int().optional(),
            driftDetected: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/difficulty-policies/:policyId/approve',
    alias: 'approveDifficultyPolicy',
    description: `Requires a different operator identity than the proposer (BR-8).
Approve moves draft → approved/active at effectiveAt; reject closes the proposal.
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: approveDifficultyPolicy_Body,
      },
      {
        name: 'policyId',
        type: 'Path',
        schema: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.number().int().gte(1),
            difficulty: z.number().int().gte(1),
            leadingZeroTarget: z.number().int().gte(0),
            status: z.enum([
              'draft',
              'pendingApproval',
              'approved',
              'active',
              'superseded',
              'rejected',
            ]),
            effectiveAt: z.string().datetime({ offset: true }),
            proposedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            approvals: z
              .array(
                z
                  .object({
                    approverUserId: z
                      .string()
                      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                    decision: z.enum(['approve', 'reject']),
                    reason: z.string().max(2000).optional(),
                    decidedAt: z.string().datetime({ offset: true }),
                  })
                  .passthrough()
              )
              .optional(),
            changeLogNote: z.string().max(2000).optional(),
            liveNetworkDifficulty: z.number().int().optional(),
            driftDetected: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v1/difficulty-policies/active',
    alias: 'getActiveDifficultyPolicy',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            version: z.number().int().gte(1),
            difficulty: z.number().int().gte(1),
            leadingZeroTarget: z.number().int().gte(0),
            status: z.enum([
              'draft',
              'pendingApproval',
              'approved',
              'active',
              'superseded',
              'rejected',
            ]),
            effectiveAt: z.string().datetime({ offset: true }),
            proposedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            approvals: z
              .array(
                z
                  .object({
                    approverUserId: z
                      .string()
                      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/),
                    decision: z.enum(['approve', 'reject']),
                    reason: z.string().max(2000).optional(),
                    decidedAt: z.string().datetime({ offset: true }),
                  })
                  .passthrough()
              )
              .optional(),
            changeLogNote: z.string().max(2000).optional(),
            liveNetworkDifficulty: z.number().int().optional(),
            driftDetected: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
