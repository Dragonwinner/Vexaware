/**
 * VEX Document Types and Interfaces
 * Based on OpenVEX specification
 */

export interface VexDocument {
  '@context': string;
  '@id': string;
  author: string;
  timestamp: string;
  version: string;
  tooling?: VexTooling;
  statements: VexStatement[];
  metadata?: VexMetadata;
}

export interface VexTooling {
  vendor: string;
  name: string;
  version: string;
}

export interface VexStatement {
  vulnerability: VexVulnerability;
  products: VexProduct[];
  status: VexStatus;
  justification?: VexJustification;
  impact_statement?: string;
  action_statement?: string;
  action_statement_timestamp?: string;
  supplier?: VexSupplier;
}

export interface VexVulnerability {
  name: string;
  '@id': string;
  aliases?: string[];
  description?: string;
}

export interface VexProduct {
  '@id': string;
  identifiers: {
    purl?: string;
    cpe?: string;
    [key: string]: string | undefined;
  };
  hashes?: {
    [algorithm: string]: string;
  };
  subcomponents?: VexProduct[];
}

export type VexStatus = 
  | 'not_affected' 
  | 'affected' 
  | 'fixed' 
  | 'under_investigation';

export type VexJustification = 
  | 'component_not_present'
  | 'vulnerable_code_not_present'
  | 'vulnerable_code_not_in_execute_path'
  | 'vulnerable_code_cannot_be_controlled_by_adversary'
  | 'inline_mitigations_already_exist';

export interface VexSupplier {
  name: string;
  email?: string;
  url?: string;
}

export interface VexMetadata {
  scan_tools?: string[];
  scan_timestamp?: string;
  environment?: string;
  compliance_frameworks?: string[];
  [key: string]: any;
}

export interface VexValidationResult {
  valid: boolean;
  errors: VexValidationError[];
  warnings: VexValidationWarning[];
}

export interface VexValidationError {
  message: string;
  path: string;
  code: string;
}

export interface VexValidationWarning {
  message: string;
  path: string;
  code: string;
}

export interface VexBuilderOptions {
  author: string;
  context?: string;
  id?: string;
  version?: string;
  tooling?: VexTooling;
  metadata?: VexMetadata;
}

export interface VexParseOptions {
  strict?: boolean;
  validate?: boolean;
}

export interface VexExportOptions {
  format?: 'json' | 'yaml';
  pretty?: boolean;
  indent?: number;
}
