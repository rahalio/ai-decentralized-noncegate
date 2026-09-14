---
name: codegen-local-only
description: >-
  Enforce that .codegen (zero_codegen tooling) is never committed or pushed.
  Use when committing, creating PRs, syncing gitignore, or restoring local codegen.
---

# Codegen local-only

## Hard rule

**Never commit or push `.codegen/`.** It is local developer tooling restored from the scaffold, not a GitHub artifact.

## Safeguards

- `.gitignore` must include `.codegen/` (and related generated paths).
- Cursor rule `codegen-local-only.mdc` is always applied — do not weaken it.

## Restore after clone

```bash
rsync -a --exclude='.git' /path/to/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
pnpm codegen:paths
```

## Related ignored paths

- `packages/openapi-core/src/.bundled/`
- `platform/tests/postman/generated/`
- `**/integration-events/generated/`
