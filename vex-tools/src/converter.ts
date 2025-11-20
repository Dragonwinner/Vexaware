/**
 * VEX Document Converter
 * Convert, merge, and transform VEX documents
 */

import { VexDocument, VexStatement, VexStatus } from './types';
import { v4 as uuidv4 } from 'uuid';

export class VexConverter {
  /**
   * Merge multiple VEX documents into one
   */
  static merge(...docs: VexDocument[]): VexDocument {
    if (docs.length === 0) {
      throw new Error('At least one document is required for merging');
    }

    if (docs.length === 1) {
      return docs[0];
    }

    const mergedStatements: VexStatement[] = [];
    const seenVulnerabilities = new Map<string, VexStatement>();

    // Merge statements, preferring later documents for duplicates
    docs.forEach(doc => {
      doc.statements.forEach(statement => {
        const key = `${statement.vulnerability.name}:${statement.products.map(p => p['@id']).join(',')}`;
        seenVulnerabilities.set(key, statement);
      });
    });

    mergedStatements.push(...seenVulnerabilities.values());

    const firstDoc = docs[0];
    return {
      '@context': firstDoc['@context'],
      '@id': `https://vexaware.com/vex/merged-${uuidv4()}`,
      author: firstDoc.author,
      timestamp: new Date().toISOString(),
      version: firstDoc.version,
      tooling: firstDoc.tooling,
      statements: mergedStatements,
      metadata: {
        ...firstDoc.metadata,
        merged_from: docs.map(d => d['@id']),
        merge_timestamp: new Date().toISOString()
      }
    };
  }

  /**
   * Filter statements by status
   */
  static filterByStatus(doc: VexDocument, status: VexStatus): VexDocument {
    return {
      ...doc,
      '@id': `${doc['@id']}/filtered-${status}`,
      statements: doc.statements.filter(s => s.status === status),
      metadata: {
        ...doc.metadata,
        filtered_by_status: status,
        filter_timestamp: new Date().toISOString()
      }
    };
  }

  /**
   * Filter statements by vulnerability name pattern
   */
  static filterByVulnerability(doc: VexDocument, pattern: string | RegExp): VexDocument {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    
    return {
      ...doc,
      '@id': `${doc['@id']}/filtered-vuln`,
      statements: doc.statements.filter(s => regex.test(s.vulnerability.name)),
      metadata: {
        ...doc.metadata,
        filtered_by_vulnerability: pattern.toString(),
        filter_timestamp: new Date().toISOString()
      }
    };
  }

  /**
   * Filter statements by product
   */
  static filterByProduct(doc: VexDocument, productId: string): VexDocument {
    return {
      ...doc,
      '@id': `${doc['@id']}/filtered-product`,
      statements: doc.statements.filter(s => 
        s.products.some(p => p['@id'].includes(productId))
      ),
      metadata: {
        ...doc.metadata,
        filtered_by_product: productId,
        filter_timestamp: new Date().toISOString()
      }
    };
  }

  /**
   * Split document by status
   */
  static splitByStatus(doc: VexDocument): Record<VexStatus, VexDocument> {
    const statuses: VexStatus[] = ['not_affected', 'affected', 'fixed', 'under_investigation'];
    const result: Record<string, VexDocument> = {};

    statuses.forEach(status => {
      result[status] = this.filterByStatus(doc, status);
    });

    return result as Record<VexStatus, VexDocument>;
  }

  /**
   * Convert statement status
   */
  static updateStatus(doc: VexDocument, vulnerabilityName: string, newStatus: VexStatus): VexDocument {
    return {
      ...doc,
      '@id': `${doc['@id']}/updated`,
      timestamp: new Date().toISOString(),
      statements: doc.statements.map(s => 
        s.vulnerability.name === vulnerabilityName
          ? { ...s, status: newStatus }
          : s
      ),
      metadata: {
        ...doc.metadata,
        status_updated: vulnerabilityName,
        update_timestamp: new Date().toISOString()
      }
    };
  }

  /**
   * Remove duplicate statements
   */
  static deduplicate(doc: VexDocument): VexDocument {
    const seen = new Set<string>();
    const uniqueStatements: VexStatement[] = [];

    doc.statements.forEach(statement => {
      const key = `${statement.vulnerability.name}:${statement.products.map(p => p['@id']).sort().join(',')}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueStatements.push(statement);
      }
    });

    return {
      ...doc,
      statements: uniqueStatements,
      metadata: {
        ...doc.metadata,
        deduplicated: true,
        original_count: doc.statements.length,
        deduplicated_count: uniqueStatements.length
      }
    };
  }
}
