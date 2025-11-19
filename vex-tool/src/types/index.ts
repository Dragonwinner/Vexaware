/**
 * VEX Document Types based on OpenVEX v0.2.0 specification
 */

export type VexStatus = 'not_affected' | 'affected' | 'fixed' | 'under_investigation';

export type VexJustification =
  | 'component_not_present'
  | 'vulnerable_code_not_present'
  | 'vulnerable_code_not_in_execute_path'
  | 'vulnerable_code_cannot_be_controlled_by_adversary'
  | 'inline_mitigations_already_exist';

export type VexActionStatus = 'not_required' | 'recommended' | 'required';

export interface VexVulnerability {
  name: string;
  description?: string;
  aliases?: string[];
}

export interface VexProduct {
  '@id': string;
  identifiers?: Record<string, string>;
  subcomponents?: VexProduct[];
}

export interface VexStatement {
  vulnerability: VexVulnerability;
  products: VexProduct[];
  status: VexStatus;
  justification?: VexJustification;
  impact_statement?: string;
  action_statement?: string;
  action_statement_timestamp?: string;
  status_notes?: string;
}

export interface VexDocumentMetadata {
  '@context'?: string;
  '@id'?: string;
  author: string;
  author_role?: string;
  timestamp: string;
  version: number;
  tooling?: string;
  supplier?: string;
  last_updated?: string;
}

export interface VexDocumentData extends VexDocumentMetadata {
  statements: VexStatement[];
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: string[];
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface VexQueryResult {
  found: boolean;
  statement?: VexStatement;
  status?: VexStatus;
  products?: VexProduct[];
}

export interface SBOMComponent {
  name: string;
  version?: string;
  purl?: string;
  vulnerabilities?: Array<{
    id: string;
    description?: string;
    severity?: string;
  }>;
}

export interface GeneratorOptions {
  author: string;
  defaultStatus?: VexStatus;
  defaultJustification?: VexJustification;
  includeTimestamp?: boolean;
  context?: string;
  documentId?: string;
}
