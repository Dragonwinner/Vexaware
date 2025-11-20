/**
 * VEX Tools - Main Entry Point
 * Comprehensive VEX document management utilities
 */

import { VexParser } from './parser';
import { VexBuilder } from './builder';
import { VexExporter } from './exporter';
import { VexConverter } from './converter';
import { VexStatus } from './types';

export { VexParser } from './parser';
export { VexBuilder, StatementBuilder } from './builder';
export { VexExporter } from './exporter';
export { VexConverter } from './converter';
export { VexUtils } from './utils';

export {
  VexDocument,
  VexStatement,
  VexVulnerability,
  VexProduct,
  VexStatus,
  VexJustification,
  VexSupplier,
  VexTooling,
  VexMetadata,
  VexValidationResult,
  VexValidationError,
  VexValidationWarning,
  VexBuilderOptions,
  VexParseOptions,
  VexExportOptions
} from './types';

/**
 * VEX Tools API
 * Simplified high-level API for common operations
 */
export class VexTools {
  /**
   * Parse a VEX document from JSON
   */
  static parseJson(jsonString: string) {
    return VexParser.parseJson(jsonString);
  }

  /**
   * Parse a VEX document from YAML
   */
  static parseYaml(yamlString: string) {
    return VexParser.parseYaml(yamlString);
  }

  /**
   * Create a new VEX document builder
   */
  static createBuilder(author: string) {
    return new VexBuilder({ author });
  }

  /**
   * Validate a VEX document
   */
  static validate(doc: any) {
    return VexParser.validate(doc);
  }

  /**
   * Export VEX document to JSON
   */
  static toJson(doc: any, pretty = true) {
    return VexExporter.toJson(doc, { pretty });
  }

  /**
   * Export VEX document to YAML
   */
  static toYaml(doc: any) {
    return VexExporter.toYaml(doc);
  }

  /**
   * Get document summary
   */
  static getSummary(doc: any) {
    return VexExporter.toSummary(doc);
  }

  /**
   * Merge multiple VEX documents
   */
  static merge(...docs: any[]) {
    return VexConverter.merge(...docs);
  }

  /**
   * Filter statements by status
   */
  static filterByStatus(doc: any, status: VexStatus) {
    return VexConverter.filterByStatus(doc, status);
  }
}
