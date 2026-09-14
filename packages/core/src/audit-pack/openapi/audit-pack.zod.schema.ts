import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createAuditPack_Body = z
  .object({
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
  })
  .passthrough();
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
const PackId = z.string();
const AuditPackStatus = z.enum(['pending', 'ready', 'failed']);
const AuditPack = z
  .object({
    id: z.string().regex(/^apk_[0-9A-HJKMNP-TV-Z]{26}$/),
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
    status: z.enum(['pending', 'ready', 'failed']),
    downloadUri: z.string().url().optional(),
    contentHash: z.string().optional(),
    policyCount: z.number().int().gte(0).optional(),
    verificationCount: z.number().int().gte(0).optional(),
    alertResolutionCount: z.number().int().gte(0).optional(),
    coveragePct: z.number().gte(0).lte(100).optional(),
    retentionWarning: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AuditPackListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^apk_[0-9A-HJKMNP-TV-Z]{26}$/),
          periodStart: z.string().datetime({ offset: true }),
          periodEnd: z.string().datetime({ offset: true }),
          status: z.enum(['pending', 'ready', 'failed']),
          downloadUri: z.string().url().optional(),
          contentHash: z.string().optional(),
          policyCount: z.number().int().gte(0).optional(),
          verificationCount: z.number().int().gte(0).optional(),
          alertResolutionCount: z.number().int().gte(0).optional(),
          coveragePct: z.number().gte(0).lte(100).optional(),
          retentionWarning: z.boolean().optional(),
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
const AuditPackListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^apk_[0-9A-HJKMNP-TV-Z]{26}$/),
              periodStart: z.string().datetime({ offset: true }),
              periodEnd: z.string().datetime({ offset: true }),
              status: z.enum(['pending', 'ready', 'failed']),
              downloadUri: z.string().url().optional(),
              contentHash: z.string().optional(),
              policyCount: z.number().int().gte(0).optional(),
              verificationCount: z.number().int().gte(0).optional(),
              alertResolutionCount: z.number().int().gte(0).optional(),
              coveragePct: z.number().gte(0).lte(100).optional(),
              retentionWarning: z.boolean().optional(),
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
const AuditPackCreateRequest = z
  .object({
    periodStart: z.string().datetime({ offset: true }),
    periodEnd: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AuditPackResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^apk_[0-9A-HJKMNP-TV-Z]{26}$/),
        periodStart: z.string().datetime({ offset: true }),
        periodEnd: z.string().datetime({ offset: true }),
        status: z.enum(['pending', 'ready', 'failed']),
        downloadUri: z.string().url().optional(),
        contentHash: z.string().optional(),
        policyCount: z.number().int().gte(0).optional(),
        verificationCount: z.number().int().gte(0).optional(),
        alertResolutionCount: z.number().int().gte(0).optional(),
        coveragePct: z.number().gte(0).lte(100).optional(),
        retentionWarning: z.boolean().optional(),
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

export const schemas: any = {
  createAuditPack_Body,
  Problem,
  PackId,
  AuditPackStatus,
  AuditPack,
  AuditPackListData,
  ResponseMeta,
  AuditPackListResponse,
  AuditPackCreateRequest,
  AuditPackResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/audit-packs',
    alias: 'listAuditPacks',
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
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^apk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  periodStart: z.string().datetime({ offset: true }),
                  periodEnd: z.string().datetime({ offset: true }),
                  status: z.enum(['pending', 'ready', 'failed']),
                  downloadUri: z.string().url().optional(),
                  contentHash: z.string().optional(),
                  policyCount: z.number().int().gte(0).optional(),
                  verificationCount: z.number().int().gte(0).optional(),
                  alertResolutionCount: z.number().int().gte(0).optional(),
                  coveragePct: z.number().gte(0).lte(100).optional(),
                  retentionWarning: z.boolean().optional(),
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
    path: '/v1/audit-packs',
    alias: 'createAuditPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAuditPack_Body,
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
            id: z.string().regex(/^apk_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            status: z.enum(['pending', 'ready', 'failed']),
            downloadUri: z.string().url().optional(),
            contentHash: z.string().optional(),
            policyCount: z.number().int().gte(0).optional(),
            verificationCount: z.number().int().gte(0).optional(),
            alertResolutionCount: z.number().int().gte(0).optional(),
            coveragePct: z.number().gte(0).lte(100).optional(),
            retentionWarning: z.boolean().optional(),
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
    path: '/v1/audit-packs/:packId',
    alias: 'getAuditPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'packId',
        type: 'Path',
        schema: z.string().regex(/^apk_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^apk_[0-9A-HJKMNP-TV-Z]{26}$/),
            periodStart: z.string().datetime({ offset: true }),
            periodEnd: z.string().datetime({ offset: true }),
            status: z.enum(['pending', 'ready', 'failed']),
            downloadUri: z.string().url().optional(),
            contentHash: z.string().optional(),
            policyCount: z.number().int().gte(0).optional(),
            verificationCount: z.number().int().gte(0).optional(),
            alertResolutionCount: z.number().int().gte(0).optional(),
            coveragePct: z.number().gte(0).lte(100).optional(),
            retentionWarning: z.boolean().optional(),
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
