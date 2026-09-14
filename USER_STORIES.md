# Noncegate — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Chain operator

- As a chain operator, I want dual-control difficulty changes, so that one rogue admin cannot inflate issuance.
- As a chain operator, I want every block re-checked by Noncegate, so that a buggy client cannot silently accept invalid work.

### Security auditor

- As a security auditor, I want a period pack of verification results, so that I can attest append resistance to the board.
- As a security auditor, I want rewrite-cost estimates on forks, so that “51% risk” is quantitative, not rhetorical.

### Compliance officer

- As a compliance officer, I want alerts when difficulty policy drifts from the approved version, so that we catch unauthorised changes.

### Downstream settlement owner

- As a settlement owner, I want invalid-block webhooks, so that my clearing system does not move money on unverified tips.
- As a settlement owner, I want header-only mode, so that I do not ingest confidential transaction bodies.
