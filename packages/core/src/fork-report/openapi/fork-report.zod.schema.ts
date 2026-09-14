import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createForkReport_Body = z
  .object({
    honestTipHash: z.string(),
    candidateTipHash: z.string(),
    workDifferential: z.number(),
    recomputeCostEstimate: z.string().optional(),
    affectedHeightStart: z.number().int().optional(),
    affectedHeightEnd: z.number().int().optional(),
    incidentNotes: z.string().optional(),
  })
  .passthrough();
const ForkStatus = z.enum([
  'open',
  'acknowledged',
  'resolved',
  'falsePositive',
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
const ForkId = z.string();
const UserId = z.string();
const ForkReport = z
  .object({
    id: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
    honestTipHash: z.string(),
    candidateTipHash: z.string(),
    workDifferential: z.number(),
    recomputeCostEstimate: z.string().optional(),
    affectedHeightStart: z.number().int().optional(),
    affectedHeightEnd: z.number().int().optional(),
    status: z.enum(['open', 'acknowledged', 'resolved', 'falsePositive']),
    incidentNotes: z.string().optional(),
    acknowledgedByUserId: z
      .string()
      .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    acknowledgedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ForkReportListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
          honestTipHash: z.string(),
          candidateTipHash: z.string(),
          workDifferential: z.number(),
          recomputeCostEstimate: z.string().optional(),
          affectedHeightStart: z.number().int().optional(),
          affectedHeightEnd: z.number().int().optional(),
          status: z.enum(['open', 'acknowledged', 'resolved', 'falsePositive']),
          incidentNotes: z.string().optional(),
          acknowledgedByUserId: z
            .string()
            .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
const ForkReportListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
              honestTipHash: z.string(),
              candidateTipHash: z.string(),
              workDifferential: z.number(),
              recomputeCostEstimate: z.string().optional(),
              affectedHeightStart: z.number().int().optional(),
              affectedHeightEnd: z.number().int().optional(),
              status: z.enum([
                'open',
                'acknowledged',
                'resolved',
                'falsePositive',
              ]),
              incidentNotes: z.string().optional(),
              acknowledgedByUserId: z
                .string()
                .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
const ForkReportCreateRequest = z
  .object({
    honestTipHash: z.string(),
    candidateTipHash: z.string(),
    workDifferential: z.number(),
    recomputeCostEstimate: z.string().optional(),
    affectedHeightStart: z.number().int().optional(),
    affectedHeightEnd: z.number().int().optional(),
    incidentNotes: z.string().optional(),
  })
  .passthrough();
const ForkReportResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
        honestTipHash: z.string(),
        candidateTipHash: z.string(),
        workDifferential: z.number(),
        recomputeCostEstimate: z.string().optional(),
        affectedHeightStart: z.number().int().optional(),
        affectedHeightEnd: z.number().int().optional(),
        status: z.enum(['open', 'acknowledged', 'resolved', 'falsePositive']),
        incidentNotes: z.string().optional(),
        acknowledgedByUserId: z
          .string()
          .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
const ForkAcknowledgeRequest = z
  .object({ incidentNotes: z.string().max(4000) })
  .partial()
  .passthrough();

export const schemas: any = {
  createForkReport_Body,
  ForkStatus,
  Problem,
  ForkId,
  UserId,
  ForkReport,
  ForkReportListData,
  ResponseMeta,
  ForkReportListResponse,
  ForkReportCreateRequest,
  ForkReportResponse,
  ForkAcknowledgeRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/fork-reports',
    alias: 'listForkReports',
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
          .enum(['open', 'acknowledged', 'resolved', 'falsePositive'])
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
                  id: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  honestTipHash: z.string(),
                  candidateTipHash: z.string(),
                  workDifferential: z.number(),
                  recomputeCostEstimate: z.string().optional(),
                  affectedHeightStart: z.number().int().optional(),
                  affectedHeightEnd: z.number().int().optional(),
                  status: z.enum([
                    'open',
                    'acknowledged',
                    'resolved',
                    'falsePositive',
                  ]),
                  incidentNotes: z.string().optional(),
                  acknowledgedByUserId: z
                    .string()
                    .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  acknowledgedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    path: '/v1/fork-reports',
    alias: 'createForkReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createForkReport_Body,
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
            id: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
            honestTipHash: z.string(),
            candidateTipHash: z.string(),
            workDifferential: z.number(),
            recomputeCostEstimate: z.string().optional(),
            affectedHeightStart: z.number().int().optional(),
            affectedHeightEnd: z.number().int().optional(),
            status: z.enum([
              'open',
              'acknowledged',
              'resolved',
              'falsePositive',
            ]),
            incidentNotes: z.string().optional(),
            acknowledgedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/fork-reports/:forkId',
    alias: 'getForkReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'forkId',
        type: 'Path',
        schema: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
            honestTipHash: z.string(),
            candidateTipHash: z.string(),
            workDifferential: z.number(),
            recomputeCostEstimate: z.string().optional(),
            affectedHeightStart: z.number().int().optional(),
            affectedHeightEnd: z.number().int().optional(),
            status: z.enum([
              'open',
              'acknowledged',
              'resolved',
              'falsePositive',
            ]),
            incidentNotes: z.string().optional(),
            acknowledgedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v1/fork-reports/:forkId/acknowledge',
    alias: 'acknowledgeForkReport',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ incidentNotes: z.string().max(4000) })
          .partial()
          .passthrough()
          .optional(),
      },
      {
        name: 'forkId',
        type: 'Path',
        schema: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/),
            honestTipHash: z.string(),
            candidateTipHash: z.string(),
            workDifferential: z.number(),
            recomputeCostEstimate: z.string().optional(),
            affectedHeightStart: z.number().int().optional(),
            affectedHeightEnd: z.number().int().optional(),
            status: z.enum([
              'open',
              'acknowledged',
              'resolved',
              'falsePositive',
            ]),
            incidentNotes: z.string().optional(),
            acknowledgedByUserId: z
              .string()
              .regex(/^usr_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            acknowledgedAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
