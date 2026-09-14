import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createSettlementWebhook_Body = z
  .object({
    name: z.string().min(1).max(100),
    endpointUrl: z.string().url(),
    pauseOnFail: z.boolean().optional().default(true),
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
const WebhookId = z.string();
const WebhookStatus = z.enum(['active', 'paused', 'disabled']);
const DeliveryStatus = z.enum(['pending', 'delivered', 'failed', 'replayed']);
const SettlementWebhook = z
  .object({
    id: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string().min(1).max(100),
    endpointUrl: z.string().url(),
    status: z.enum(['active', 'paused', 'disabled']),
    pauseOnFail: z.boolean(),
    lastGatedTipHash: z.string().optional(),
    lastDeliveryStatus: z
      .enum(['pending', 'delivered', 'failed', 'replayed'])
      .optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const SettlementWebhookListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string().min(1).max(100),
          endpointUrl: z.string().url(),
          status: z.enum(['active', 'paused', 'disabled']),
          pauseOnFail: z.boolean(),
          lastGatedTipHash: z.string().optional(),
          lastDeliveryStatus: z
            .enum(['pending', 'delivered', 'failed', 'replayed'])
            .optional(),
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
const SettlementWebhookListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string().min(1).max(100),
              endpointUrl: z.string().url(),
              status: z.enum(['active', 'paused', 'disabled']),
              pauseOnFail: z.boolean(),
              lastGatedTipHash: z.string().optional(),
              lastDeliveryStatus: z
                .enum(['pending', 'delivered', 'failed', 'replayed'])
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
  .passthrough();
const SettlementWebhookCreateRequest = z
  .object({
    name: z.string().min(1).max(100),
    endpointUrl: z.string().url(),
    pauseOnFail: z.boolean().optional().default(true),
  })
  .passthrough();
const SettlementWebhookResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string().min(1).max(100),
        endpointUrl: z.string().url(),
        status: z.enum(['active', 'paused', 'disabled']),
        pauseOnFail: z.boolean(),
        lastGatedTipHash: z.string().optional(),
        lastDeliveryStatus: z
          .enum(['pending', 'delivered', 'failed', 'replayed'])
          .optional(),
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
const WebhookPauseRequest = z.object({ paused: z.boolean() }).passthrough();
const DeliveryId = z.string();
const WebhookDelivery = z
  .object({
    id: z.string().regex(/^whd_[0-9A-HJKMNP-TV-Z]{26}$/),
    webhookId: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
    status: z.enum(['pending', 'delivered', 'failed', 'replayed']),
    eventType: z.string(),
    tipHash: z.string().optional(),
    httpStatus: z.number().int().optional(),
    errorDetail: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const WebhookDeliveryResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^whd_[0-9A-HJKMNP-TV-Z]{26}$/),
        webhookId: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
        status: z.enum(['pending', 'delivered', 'failed', 'replayed']),
        eventType: z.string(),
        tipHash: z.string().optional(),
        httpStatus: z.number().int().optional(),
        errorDetail: z.string().optional(),
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
const WebhookDeliveryListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^whd_[0-9A-HJKMNP-TV-Z]{26}$/),
          webhookId: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
          status: z.enum(['pending', 'delivered', 'failed', 'replayed']),
          eventType: z.string(),
          tipHash: z.string().optional(),
          httpStatus: z.number().int().optional(),
          errorDetail: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const WebhookDeliveryListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^whd_[0-9A-HJKMNP-TV-Z]{26}$/),
              webhookId: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
              status: z.enum(['pending', 'delivered', 'failed', 'replayed']),
              eventType: z.string(),
              tipHash: z.string().optional(),
              httpStatus: z.number().int().optional(),
              errorDetail: z.string().optional(),
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

export const schemas: any = {
  createSettlementWebhook_Body,
  Problem,
  WebhookId,
  WebhookStatus,
  DeliveryStatus,
  SettlementWebhook,
  SettlementWebhookListData,
  ResponseMeta,
  SettlementWebhookListResponse,
  SettlementWebhookCreateRequest,
  SettlementWebhookResponse,
  WebhookPauseRequest,
  DeliveryId,
  WebhookDelivery,
  WebhookDeliveryResponse,
  WebhookDeliveryListData,
  WebhookDeliveryListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/webhooks',
    alias: 'listSettlementWebhooks',
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
                  id: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string().min(1).max(100),
                  endpointUrl: z.string().url(),
                  status: z.enum(['active', 'paused', 'disabled']),
                  pauseOnFail: z.boolean(),
                  lastGatedTipHash: z.string().optional(),
                  lastDeliveryStatus: z
                    .enum(['pending', 'delivered', 'failed', 'replayed'])
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
    path: '/v1/webhooks',
    alias: 'createSettlementWebhook',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createSettlementWebhook_Body,
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
            id: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(100),
            endpointUrl: z.string().url(),
            status: z.enum(['active', 'paused', 'disabled']),
            pauseOnFail: z.boolean(),
            lastGatedTipHash: z.string().optional(),
            lastDeliveryStatus: z
              .enum(['pending', 'delivered', 'failed', 'replayed'])
              .optional(),
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
    path: '/v1/webhooks/:webhookId',
    alias: 'getSettlementWebhook',
    requestFormat: 'json',
    parameters: [
      {
        name: 'webhookId',
        type: 'Path',
        schema: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(100),
            endpointUrl: z.string().url(),
            status: z.enum(['active', 'paused', 'disabled']),
            pauseOnFail: z.boolean(),
            lastGatedTipHash: z.string().optional(),
            lastDeliveryStatus: z
              .enum(['pending', 'delivered', 'failed', 'replayed'])
              .optional(),
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
    method: 'get',
    path: '/v1/webhooks/:webhookId/deliveries',
    alias: 'listWebhookDeliveries',
    requestFormat: 'json',
    parameters: [
      {
        name: 'webhookId',
        type: 'Path',
        schema: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
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
                  id: z.string().regex(/^whd_[0-9A-HJKMNP-TV-Z]{26}$/),
                  webhookId: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
                  status: z.enum([
                    'pending',
                    'delivered',
                    'failed',
                    'replayed',
                  ]),
                  eventType: z.string(),
                  tipHash: z.string().optional(),
                  httpStatus: z.number().int().optional(),
                  errorDetail: z.string().optional(),
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
    path: '/v1/webhooks/:webhookId/deliveries/:deliveryId/replay',
    alias: 'replayWebhookDelivery',
    requestFormat: 'json',
    parameters: [
      {
        name: 'webhookId',
        type: 'Path',
        schema: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
      {
        name: 'deliveryId',
        type: 'Path',
        schema: z.string().regex(/^whd_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^whd_[0-9A-HJKMNP-TV-Z]{26}$/),
            webhookId: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['pending', 'delivered', 'failed', 'replayed']),
            eventType: z.string(),
            tipHash: z.string().optional(),
            httpStatus: z.number().int().optional(),
            errorDetail: z.string().optional(),
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
    path: '/v1/webhooks/:webhookId/pause',
    alias: 'pauseSettlementWebhook',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({ paused: z.boolean() }).passthrough(),
      },
      {
        name: 'webhookId',
        type: 'Path',
        schema: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string().min(1).max(100),
            endpointUrl: z.string().url(),
            status: z.enum(['active', 'paused', 'disabled']),
            pauseOnFail: z.boolean(),
            lastGatedTipHash: z.string().optional(),
            lastDeliveryStatus: z
              .enum(['pending', 'delivered', 'failed', 'replayed'])
              .optional(),
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
    path: '/v1/webhooks/:webhookId/test',
    alias: 'testSettlementWebhook',
    requestFormat: 'json',
    parameters: [
      {
        name: 'webhookId',
        type: 'Path',
        schema: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^whd_[0-9A-HJKMNP-TV-Z]{26}$/),
            webhookId: z.string().regex(/^whk_[0-9A-HJKMNP-TV-Z]{26}$/),
            status: z.enum(['pending', 'delivered', 'failed', 'replayed']),
            eventType: z.string(),
            tipHash: z.string().optional(),
            httpStatus: z.number().int().optional(),
            errorDetail: z.string().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
