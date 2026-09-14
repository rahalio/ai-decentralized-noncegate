/**
 * IdGeneratorService Port — Noncegate domain prefixes.
 */

import type { DomainCode } from '@noncegate/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  /** difficulty-policy (x-domain dpol → prefix pol) */
  dpolId(): string;
  /** block-observation (x-domain bob → prefix blk) */
  bobId(): string;
  vrfId(): string;
  frkId(): string;
  altId(): string;
  apkId(): string;
  whkId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
