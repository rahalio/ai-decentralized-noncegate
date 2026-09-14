/**
 * Postman-collection 1:1 Vitest tests for webhook (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  deliveryId: "",
  limit: "",
  webhookId: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / webhook (1:1 generated)", () => {

  it("listSettlementWebhooks", async () => {
    const url = sub("{{baseUrl}}/v1/webhooks?cursor={{cursor}}&limit={{limit}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createSettlementWebhook", async () => {
    const url = sub("{{baseUrl}}/v1/webhooks");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"name\": \"Newman Test\",\n  \"endpointUrl\": \"\",\n  \"pauseOnFail\": true\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['settlementWebhookId'] = j.data.id;
  });

  it("getSettlementWebhook", async () => {
    const url = sub("{{baseUrl}}/v1/webhooks/{{webhookId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("pauseSettlementWebhook", async () => {
    const url = sub("{{baseUrl}}/v1/webhooks/{{webhookId}}/pause");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"paused\": false\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("testSettlementWebhook", async () => {
    const url = sub("{{baseUrl}}/v1/webhooks/{{webhookId}}/test");
    const res = await fetch(url, {
      method: "POST",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("listWebhookDeliveries", async () => {
    const url = sub("{{baseUrl}}/v1/webhooks/{{webhookId}}/deliveries?cursor={{cursor}}&limit={{limit}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("replayWebhookDelivery", async () => {
    const url = sub("{{baseUrl}}/v1/webhooks/{{webhookId}}/deliveries/{{deliveryId}}/replay");
    const res = await fetch(url, {
      method: "POST",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
