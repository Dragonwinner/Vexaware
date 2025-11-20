/**
 * VEX Document Parser
 * Parses and validates VEX documents from various formats
 */

import {
  VexDocument,
  VexParseOptions,
  VexValidationResult,
  VexValidationError,
  VexValidationWarning
} from './types';
import * as yaml from 'js-yaml';

export class VexParser {
  /**
   * Parse a VEX document from JSON string
   */
  static parseJson(jsonString: string, options: VexParseOptions = {}): VexDocument {
    try {
      const doc = JSON.parse(jsonString);
      
      if (options.validate !== false) {
        const validation = this.validate(doc, options.strict);
        if (!validation.valid && options.strict) {
          throw new Error(`VEX validation failed: ${validation.errors[0]?.message}`);
        }
      }
      
      return doc;
    } catch (error) {
      throw new Error(`Failed to parse VEX JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Parse a VEX document from YAML string
   */
  static parseYaml(yamlString: string, options: VexParseOptions = {}): VexDocument {
    try {
      const doc = yaml.load(yamlString) as VexDocument;
      
      if (options.validate !== false) {
        const validation = this.validate(doc, options.strict);
        if (!validation.valid && options.strict) {
          throw new Error(`VEX validation failed: ${validation.errors[0]?.message}`);
        }
      }
      
      return doc;
    } catch (error) {
      throw new Error(`Failed to parse VEX YAML: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Validate a VEX document
   */
  static validate(doc: any, strict = false): VexValidationResult {
    const errors: VexValidationError[] = [];
    const warnings: VexValidationWarning[] = [];

    // Required fields validation
    if (!doc['@context']) {
      errors.push({
        message: 'Missing required field: @context',
        path: '@context',
        code: 'MISSING_FIELD'
      });
    }

    if (!doc['@id']) {
      errors.push({
        message: 'Missing required field: @id',
        path: '@id',
        code: 'MISSING_FIELD'
      });
    }

    if (!doc.author) {
      errors.push({
        message: 'Missing required field: author',
        path: 'author',
        code: 'MISSING_FIELD'
      });
    }

    if (!doc.timestamp) {
      errors.push({
        message: 'Missing required field: timestamp',
        path: 'timestamp',
        code: 'MISSING_FIELD'
      });
    }

    if (!doc.version) {
      errors.push({
        message: 'Missing required field: version',
        path: 'version',
        code: 'MISSING_FIELD'
      });
    }

    if (!doc.statements || !Array.isArray(doc.statements)) {
      errors.push({
        message: 'Missing or invalid field: statements must be an array',
        path: 'statements',
        code: 'INVALID_TYPE'
      });
    } else if (doc.statements.length === 0) {
      warnings.push({
        message: 'VEX document has no statements',
        path: 'statements',
        code: 'EMPTY_ARRAY'
      });
    }

    // Validate statements
    if (doc.statements && Array.isArray(doc.statements)) {
      doc.statements.forEach((statement: any, index: number) => {
        const basePath = `statements[${index}]`;

        if (!statement.vulnerability) {
          errors.push({
            message: 'Statement missing required field: vulnerability',
            path: `${basePath}.vulnerability`,
            code: 'MISSING_FIELD'
          });
        } else {
          if (!statement.vulnerability.name) {
            errors.push({
              message: 'Vulnerability missing required field: name',
              path: `${basePath}.vulnerability.name`,
              code: 'MISSING_FIELD'
            });
          }
          if (!statement.vulnerability['@id']) {
            errors.push({
              message: 'Vulnerability missing required field: @id',
              path: `${basePath}.vulnerability.@id`,
              code: 'MISSING_FIELD'
            });
          }
        }

        if (!statement.products || !Array.isArray(statement.products)) {
          errors.push({
            message: 'Statement missing or invalid field: products must be an array',
            path: `${basePath}.products`,
            code: 'INVALID_TYPE'
          });
        }

        if (!statement.status) {
          errors.push({
            message: 'Statement missing required field: status',
            path: `${basePath}.status`,
            code: 'MISSING_FIELD'
          });
        } else {
          const validStatuses = ['not_affected', 'affected', 'fixed', 'under_investigation'];
          if (!validStatuses.includes(statement.status)) {
            errors.push({
              message: `Invalid status: ${statement.status}. Must be one of: ${validStatuses.join(', ')}`,
              path: `${basePath}.status`,
              code: 'INVALID_VALUE'
            });
          }
        }

        // Check if justification is required for not_affected status
        if (statement.status === 'not_affected' && !statement.justification) {
          warnings.push({
            message: 'Justification recommended for not_affected status',
            path: `${basePath}.justification`,
            code: 'MISSING_RECOMMENDED_FIELD'
          });
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Check if a document is valid
   */
  static isValid(doc: any): boolean {
    const result = this.validate(doc);
    return result.valid;
  }
}
