import Ajv from 'ajv';
import {
  VexDocumentData,
  ValidationResult,
  ValidationError,
  VexStatement,
  VexStatus,
  VexJustification,
} from '../types';

/**
 * VexValidator - Validates VEX documents against schema and business rules
 */
export class VexValidator {
  private ajv: Ajv;
  private schema: any;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    this.schema = this.createSchema();
  }

  /**
   * Validate a VEX document
   */
  validate(data: VexDocumentData): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: string[] = [];

    // Schema validation
    const valid = this.ajv.validate(this.schema, data);
    if (!valid && this.ajv.errors) {
      this.ajv.errors.forEach((err) => {
        errors.push({
          field: err.instancePath || 'root',
          message: err.message || 'Unknown error',
          value: err.params,
        });
      });
    }

    // Business rules validation
    if (data.statements) {
      data.statements.forEach((stmt, index) => {
        this.validateStatement(stmt, index, errors, warnings);
      });
    }

    // Additional checks
    if (data.statements && data.statements.length === 0) {
      warnings.push('Document contains no statements');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate a single statement
   */
  private validateStatement(
    stmt: VexStatement,
    index: number,
    errors: ValidationError[],
    warnings: string[]
  ): void {
    const prefix = `statements[${index}]`;

    // Check CVE format
    if (stmt.vulnerability.name && !this.isValidCVE(stmt.vulnerability.name)) {
      warnings.push(
        `${prefix}: "${stmt.vulnerability.name}" does not match standard CVE format`
      );
    }

    // Check product PURL format
    stmt.products.forEach((product, pIndex) => {
      if (!product['@id'].startsWith('pkg:')) {
        warnings.push(
          `${prefix}.products[${pIndex}]: Product ID should use PURL format (pkg:...)`
        );
      }
    });

    // Validate justification is required for not_affected status
    if (stmt.status === 'not_affected' && !stmt.justification) {
      errors.push({
        field: `${prefix}.justification`,
        message: 'Justification is required when status is "not_affected"',
      });
    }

    // Validate justification should not be present for affected/fixed
    if (
      (stmt.status === 'affected' || stmt.status === 'fixed') &&
      stmt.justification
    ) {
      warnings.push(
        `${prefix}: Justification should only be used with "not_affected" status`
      );
    }

    // Check for action statement on affected items
    if (stmt.status === 'affected' && !stmt.action_statement) {
      warnings.push(
        `${prefix}: Consider adding action_statement for affected vulnerabilities`
      );
    }

    // Check for impact statement on not_affected items
    if (stmt.status === 'not_affected' && !stmt.impact_statement) {
      warnings.push(
        `${prefix}: Consider adding impact_statement explaining why not affected`
      );
    }
  }

  /**
   * Check if string matches CVE format
   */
  private isValidCVE(cve: string): boolean {
    return /^CVE-\d{4}-\d{4,}$/i.test(cve);
  }

  /**
   * Quick validation (just checks schema)
   */
  quickValidate(data: VexDocumentData): boolean {
    return this.ajv.validate(this.schema, data);
  }

  /**
   * Create JSON schema for VEX documents
   */
  private createSchema(): any {
    return {
      type: 'object',
      required: ['author', 'timestamp', 'version', 'statements'],
      properties: {
        '@context': { type: 'string' },
        '@id': { type: 'string' },
        author: { type: 'string' },
        author_role: { type: 'string' },
        timestamp: { type: 'string' },
        version: { type: 'number' },
        tooling: { type: 'string' },
        supplier: { type: 'string' },
        last_updated: { type: 'string' },
        statements: {
          type: 'array',
          items: {
            type: 'object',
            required: ['vulnerability', 'products', 'status'],
            properties: {
              vulnerability: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  aliases: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                },
              },
              products: {
                type: 'array',
                items: {
                  type: 'object',
                  required: ['@id'],
                  properties: {
                    '@id': { type: 'string' },
                  },
                },
              },
              status: {
                type: 'string',
                enum: ['not_affected', 'affected', 'fixed', 'under_investigation'],
              },
              justification: { type: 'string' },
              impact_statement: { type: 'string' },
              action_statement: { type: 'string' },
              action_statement_timestamp: { type: 'string' },
              status_notes: { type: 'string' },
            },
          },
        },
      },
    };
  }
}
