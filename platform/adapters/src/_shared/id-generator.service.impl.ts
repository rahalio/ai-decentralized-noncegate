/**
 * ID Generator Service Implementation — Noncegate prefixes.
 */

import type { DomainCode } from '@noncegate/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@noncegate/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@noncegate/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  dpolId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.difficultyPolicy);
  }
  bobId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.blockObservation);
  }
  vrfId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.verificationResult);
  }
  frkId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.forkReport);
  }
  altId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.alert);
  }
  apkId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auditPack);
  }
  whkId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.webhook);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
