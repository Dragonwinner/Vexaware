/**
 * VEX Document Exporter
 * Export VEX documents to various formats
 */

import { VexDocument, VexExportOptions } from './types';
import * as yaml from 'js-yaml';

export class VexExporter {
  /**
   * Export VEX document to JSON string
   */
  static toJson(doc: VexDocument, options: VexExportOptions = {}): string {
    const pretty = options.pretty !== false;
    const indent = options.indent || 2;
    
    if (pretty) {
      return JSON.stringify(doc, null, indent);
    }
    return JSON.stringify(doc);
  }

  /**
   * Export VEX document to YAML string
   */
  static toYaml(doc: VexDocument, options: VexExportOptions = {}): string {
    const indent = options.indent || 2;
    return yaml.dump(doc, {
      indent,
      lineWidth: -1,
      noRefs: true
    });
  }

  /**
   * Export VEX document to specified format
   */
  static export(doc: VexDocument, options: VexExportOptions = {}): string {
    const format = options.format || 'json';
    
    switch (format) {
      case 'json':
        return this.toJson(doc, options);
      case 'yaml':
        return this.toYaml(doc, options);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Export multiple VEX documents to JSON array
   */
  static toJsonArray(docs: VexDocument[], options: VexExportOptions = {}): string {
    const pretty = options.pretty !== false;
    const indent = options.indent || 2;
    
    if (pretty) {
      return JSON.stringify(docs, null, indent);
    }
    return JSON.stringify(docs);
  }

  /**
   * Export VEX document statistics summary
   */
  static toSummary(doc: VexDocument): string {
    const stats = {
      id: doc['@id'],
      author: doc.author,
      version: doc.version,
      timestamp: doc.timestamp,
      totalStatements: doc.statements.length,
      statuses: {
        not_affected: 0,
        affected: 0,
        fixed: 0,
        under_investigation: 0
      },
      vulnerabilities: [] as string[],
      products: new Set<string>()
    };

    doc.statements.forEach(statement => {
      stats.statuses[statement.status]++;
      stats.vulnerabilities.push(statement.vulnerability.name);
      statement.products.forEach(product => {
        stats.products.add(product['@id']);
      });
    });

    return `
VEX Document Summary
====================
ID: ${stats.id}
Author: ${stats.author}
Version: ${stats.version}
Timestamp: ${stats.timestamp}

Statements: ${stats.totalStatements}
  - Not Affected: ${stats.statuses.not_affected}
  - Affected: ${stats.statuses.affected}
  - Fixed: ${stats.statuses.fixed}
  - Under Investigation: ${stats.statuses.under_investigation}

Vulnerabilities: ${stats.vulnerabilities.length} unique
Products: ${stats.products.size} unique
`.trim();
  }
}
