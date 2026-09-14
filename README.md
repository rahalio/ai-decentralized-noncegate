# Noncegate

PoW difficulty policy and independent nonce verification control plane for consortium ledgers.

## Quick start

```bash
# Restore local codegen tooling (never committed)
rsync -a --exclude='.git' /path/to/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build
pnpm dev:api   # http://127.0.0.1:4000/health
pnpm dev:web   # http://127.0.0.1:5173
```

Demo API key: `X-API-Key: ddd_demo_local_dev_key`

## Domains

OpenAPI (one YAML each) under `packages/openapi-core/src/`:

identity · difficulty-policy · block-observation · verification-result · fork-report · alert · audit-pack · webhook

## Package scope

`@noncegate/*`

## Product docs

- [PRODUCT.md](./PRODUCT.md)
- [USER_STORIES.md](./USER_STORIES.md)
- [WEBAPP.md](./WEBAPP.md)
