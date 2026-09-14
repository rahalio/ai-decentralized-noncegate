/**
 * Integration event type definitions (handwritten companion to generated registry).
 */

export type IntegrationEventDeliveryMode = "sync" | "async";

export interface IntegrationEventTypeDefinition {
  type: string;
  domain: string;
  aggregateType: string;
  description?: string;
  defaultDeliveryMode?: IntegrationEventDeliveryMode;
}
