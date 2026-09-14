import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createVerificationResult_Body = z
  .object({
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
  })
  .passthrough();
const reverifySample_Body = z
  .object({
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    policyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const BlockId = z.string();
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
const ResultId = z.string();
const PolicyId = z.string();
const VerificationResult = z
  .object({
    id: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
    policyVersion: z.number().int().optional(),
    valid: z.boolean(),
    verifyDurationMs: z.number().int().gte(0),
    failureReason: z.string().optional(),
    headerOnly: z.boolean().optional(),
    parentHashMatched: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const VerificationResultListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
          blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
          policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
          policyVersion: z.number().int().optional(),
          valid: z.boolean(),
          verifyDurationMs: z.number().int().gte(0),
          failureReason: z.string().optional(),
          headerOnly: z.boolean().optional(),
          parentHashMatched: z.boolean().optional(),
          createdAt: z.string().datetime({ offset: true }),
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
const VerificationResultListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
              blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
              policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
              policyVersion: z.number().int().optional(),
              valid: z.boolean(),
              verifyDurationMs: z.number().int().gte(0),
              failureReason: z.string().optional(),
              headerOnly: z.boolean().optional(),
              parentHashMatched: z.boolean().optional(),
              createdAt: z.string().datetime({ offset: true }),
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
const VerificationResultCreateRequest = z
  .object({
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
  })
  .passthrough();
const VerificationResultResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
        blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
        policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
        policyVersion: z.number().int().optional(),
        valid: z.boolean(),
        verifyDurationMs: z.number().int().gte(0),
        failureReason: z.string().optional(),
        headerOnly: z.boolean().optional(),
        parentHashMatched: z.boolean().optional(),
        createdAt: z.string().datetime({ offset: true }),
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
const ReverifySampleRequest = z
  .object({
    blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
    policyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  createVerificationResult_Body,
  reverifySample_Body,
  BlockId,
  Problem,
  ResultId,
  PolicyId,
  VerificationResult,
  VerificationResultListData,
  ResponseMeta,
  VerificationResultListResponse,
  VerificationResultCreateRequest,
  VerificationResultResponse,
  ReverifySampleRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/verification-results',
    alias: 'listVerificationResults',
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
        name: 'valid',
        type: 'Query',
        schema: z.boolean().optional(),
      },
      {
        name: 'blockId',
        type: 'Query',
        schema: z
          .string()
          .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
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
                  id: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
                  blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
                  policyVersion: z.number().int().optional(),
                  valid: z.boolean(),
                  verifyDurationMs: z.number().int().gte(0),
                  failureReason: z.string().optional(),
                  headerOnly: z.boolean().optional(),
                  parentHashMatched: z.boolean().optional(),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/verification-results',
    alias: 'createVerificationResult',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createVerificationResult_Body,
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
            id: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            policyVersion: z.number().int().optional(),
            valid: z.boolean(),
            verifyDurationMs: z.number().int().gte(0),
            failureReason: z.string().optional(),
            headerOnly: z.boolean().optional(),
            parentHashMatched: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/verification-results/:resultId',
    alias: 'getVerificationResult',
    requestFormat: 'json',
    parameters: [
      {
        name: 'resultId',
        type: 'Path',
        schema: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            policyVersion: z.number().int().optional(),
            valid: z.boolean(),
            verifyDurationMs: z.number().int().gte(0),
            failureReason: z.string().optional(),
            headerOnly: z.boolean().optional(),
            parentHashMatched: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v1/verification-results/reverify',
    alias: 'reverifySample',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: reverifySample_Body,
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
            id: z.string().regex(/^vrf_[0-9A-HJKMNP-TV-Z]{26}$/),
            blockId: z.string().regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/),
            policyId: z.string().regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/),
            policyVersion: z.number().int().optional(),
            valid: z.boolean(),
            verifyDurationMs: z.number().int().gte(0),
            failureReason: z.string().optional(),
            headerOnly: z.boolean().optional(),
            parentHashMatched: z.boolean().optional(),
            createdAt: z.string().datetime({ offset: true }),
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
