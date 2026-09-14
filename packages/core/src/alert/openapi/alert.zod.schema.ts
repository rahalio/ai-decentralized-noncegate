import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createAlert_Body = z
  .object({
    alertType: z.enum([
      'invalidNonce',
      'policyDrift',
      'hashRateCliff',
      'forkDetected',
    ]),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    message: z.string(),
    relatedBlockId: z
      .string()
      .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    relatedPolicyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    relatedForkId: z
      .string()
      .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const silenceAlert_Body = z
  .object({
    silenceExpiresAt: z.string().datetime({ offset: true }),
    reason: z.string().max(2000).optional(),
  })
  .passthrough();
const AlertStatus = z.enum([
  'open',
  'acked',
  'escalated',
  'silenced',
  'closed',
]);
const AlertSeverity = z.enum(['low', 'medium', 'high', 'critical']);
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
const AlertId = z.string();
const AlertType = z.enum([
  'invalidNonce',
  'policyDrift',
  'hashRateCliff',
  'forkDetected',
]);
const BlockId = z.string();
const PolicyId = z.string();
const ForkId = z.string();
const Alert = z
  .object({
    id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
    alertType: z.enum([
      'invalidNonce',
      'policyDrift',
      'hashRateCliff',
      'forkDetected',
    ]),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    status: z.enum(['open', 'acked', 'escalated', 'silenced', 'closed']),
    message: z.string(),
    relatedBlockId: z
      .string()
      .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    relatedPolicyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    relatedForkId: z
      .string()
      .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    resolutionNote: z.string().optional(),
    silenceExpiresAt: z.string().datetime({ offset: true }).optional(),
    webhookEmitted: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const AlertListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
          alertType: z.enum([
            'invalidNonce',
            'policyDrift',
            'hashRateCliff',
            'forkDetected',
          ]),
          severity: z.enum(['low', 'medium', 'high', 'critical']),
          status: z.enum(['open', 'acked', 'escalated', 'silenced', 'closed']),
          message: z.string(),
          relatedBlockId: z
            .string()
            .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          relatedPolicyId: z
            .string()
            .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          relatedForkId: z
            .string()
            .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
            .optional(),
          resolutionNote: z.string().optional(),
          silenceExpiresAt: z.string().datetime({ offset: true }).optional(),
          webhookEmitted: z.boolean().optional(),
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
const AlertListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
              alertType: z.enum([
                'invalidNonce',
                'policyDrift',
                'hashRateCliff',
                'forkDetected',
              ]),
              severity: z.enum(['low', 'medium', 'high', 'critical']),
              status: z.enum([
                'open',
                'acked',
                'escalated',
                'silenced',
                'closed',
              ]),
              message: z.string(),
              relatedBlockId: z
                .string()
                .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              relatedPolicyId: z
                .string()
                .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              relatedForkId: z
                .string()
                .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
                .optional(),
              resolutionNote: z.string().optional(),
              silenceExpiresAt: z
                .string()
                .datetime({ offset: true })
                .optional(),
              webhookEmitted: z.boolean().optional(),
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
const AlertCreateRequest = z
  .object({
    alertType: z.enum([
      'invalidNonce',
      'policyDrift',
      'hashRateCliff',
      'forkDetected',
    ]),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    message: z.string(),
    relatedBlockId: z
      .string()
      .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    relatedPolicyId: z
      .string()
      .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    relatedForkId: z
      .string()
      .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
  })
  .passthrough();
const AlertResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
        alertType: z.enum([
          'invalidNonce',
          'policyDrift',
          'hashRateCliff',
          'forkDetected',
        ]),
        severity: z.enum(['low', 'medium', 'high', 'critical']),
        status: z.enum(['open', 'acked', 'escalated', 'silenced', 'closed']),
        message: z.string(),
        relatedBlockId: z
          .string()
          .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        relatedPolicyId: z
          .string()
          .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        relatedForkId: z
          .string()
          .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        resolutionNote: z.string().optional(),
        silenceExpiresAt: z.string().datetime({ offset: true }).optional(),
        webhookEmitted: z.boolean().optional(),
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
const AlertResolveRequest = z
  .object({ resolutionNote: z.string().max(4000) })
  .passthrough();
const AlertSilenceRequest = z
  .object({
    silenceExpiresAt: z.string().datetime({ offset: true }),
    reason: z.string().max(2000).optional(),
  })
  .passthrough();

export const schemas: any = {
  createAlert_Body,
  silenceAlert_Body,
  AlertStatus,
  AlertSeverity,
  Problem,
  AlertId,
  AlertType,
  BlockId,
  PolicyId,
  ForkId,
  Alert,
  AlertListData,
  ResponseMeta,
  AlertListResponse,
  AlertCreateRequest,
  AlertResponse,
  AlertResolveRequest,
  AlertSilenceRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/alerts',
    alias: 'listAlerts',
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
          .enum(['open', 'acked', 'escalated', 'silenced', 'closed'])
          .optional(),
      },
      {
        name: 'severity',
        type: 'Query',
        schema: z.enum(['low', 'medium', 'high', 'critical']).optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
                  alertType: z.enum([
                    'invalidNonce',
                    'policyDrift',
                    'hashRateCliff',
                    'forkDetected',
                  ]),
                  severity: z.enum(['low', 'medium', 'high', 'critical']),
                  status: z.enum([
                    'open',
                    'acked',
                    'escalated',
                    'silenced',
                    'closed',
                  ]),
                  message: z.string(),
                  relatedBlockId: z
                    .string()
                    .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  relatedPolicyId: z
                    .string()
                    .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  relatedForkId: z
                    .string()
                    .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
                    .optional(),
                  resolutionNote: z.string().optional(),
                  silenceExpiresAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                  webhookEmitted: z.boolean().optional(),
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
    path: '/v1/alerts',
    alias: 'createAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createAlert_Body,
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
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            alertType: z.enum([
              'invalidNonce',
              'policyDrift',
              'hashRateCliff',
              'forkDetected',
            ]),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum([
              'open',
              'acked',
              'escalated',
              'silenced',
              'closed',
            ]),
            message: z.string(),
            relatedBlockId: z
              .string()
              .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedPolicyId: z
              .string()
              .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedForkId: z
              .string()
              .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            resolutionNote: z.string().optional(),
            silenceExpiresAt: z.string().datetime({ offset: true }).optional(),
            webhookEmitted: z.boolean().optional(),
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
    path: '/v1/alerts/:alertId',
    alias: 'getAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            alertType: z.enum([
              'invalidNonce',
              'policyDrift',
              'hashRateCliff',
              'forkDetected',
            ]),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum([
              'open',
              'acked',
              'escalated',
              'silenced',
              'closed',
            ]),
            message: z.string(),
            relatedBlockId: z
              .string()
              .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedPolicyId: z
              .string()
              .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedForkId: z
              .string()
              .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            resolutionNote: z.string().optional(),
            silenceExpiresAt: z.string().datetime({ offset: true }).optional(),
            webhookEmitted: z.boolean().optional(),
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
    path: '/v1/alerts/:alertId/ack',
    alias: 'ackAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            alertType: z.enum([
              'invalidNonce',
              'policyDrift',
              'hashRateCliff',
              'forkDetected',
            ]),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum([
              'open',
              'acked',
              'escalated',
              'silenced',
              'closed',
            ]),
            message: z.string(),
            relatedBlockId: z
              .string()
              .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedPolicyId: z
              .string()
              .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedForkId: z
              .string()
              .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            resolutionNote: z.string().optional(),
            silenceExpiresAt: z.string().datetime({ offset: true }).optional(),
            webhookEmitted: z.boolean().optional(),
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
    path: '/v1/alerts/:alertId/escalate',
    alias: 'escalateAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            alertType: z.enum([
              'invalidNonce',
              'policyDrift',
              'hashRateCliff',
              'forkDetected',
            ]),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum([
              'open',
              'acked',
              'escalated',
              'silenced',
              'closed',
            ]),
            message: z.string(),
            relatedBlockId: z
              .string()
              .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedPolicyId: z
              .string()
              .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedForkId: z
              .string()
              .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            resolutionNote: z.string().optional(),
            silenceExpiresAt: z.string().datetime({ offset: true }).optional(),
            webhookEmitted: z.boolean().optional(),
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
    path: '/v1/alerts/:alertId/resolve',
    alias: 'resolveAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ resolutionNote: z.string().max(4000) })
          .passthrough(),
      },
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            alertType: z.enum([
              'invalidNonce',
              'policyDrift',
              'hashRateCliff',
              'forkDetected',
            ]),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum([
              'open',
              'acked',
              'escalated',
              'silenced',
              'closed',
            ]),
            message: z.string(),
            relatedBlockId: z
              .string()
              .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedPolicyId: z
              .string()
              .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedForkId: z
              .string()
              .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            resolutionNote: z.string().optional(),
            silenceExpiresAt: z.string().datetime({ offset: true }).optional(),
            webhookEmitted: z.boolean().optional(),
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
    path: '/v1/alerts/:alertId/silence',
    alias: 'silenceAlert',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: silenceAlert_Body,
      },
      {
        name: 'alertId',
        type: 'Path',
        schema: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^alt_[0-9A-HJKMNP-TV-Z]{26}$/),
            alertType: z.enum([
              'invalidNonce',
              'policyDrift',
              'hashRateCliff',
              'forkDetected',
            ]),
            severity: z.enum(['low', 'medium', 'high', 'critical']),
            status: z.enum([
              'open',
              'acked',
              'escalated',
              'silenced',
              'closed',
            ]),
            message: z.string(),
            relatedBlockId: z
              .string()
              .regex(/^blk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedPolicyId: z
              .string()
              .regex(/^pol_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            relatedForkId: z
              .string()
              .regex(/^frk_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            resolutionNote: z.string().optional(),
            silenceExpiresAt: z.string().datetime({ offset: true }).optional(),
            webhookEmitted: z.boolean().optional(),
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
