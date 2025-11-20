/**
 * VEX Utility Functions
 * Helper functions for working with VEX documents
 */

import { VexDocument, VexStatement, VexStatus } from './types';

export class VexUtils {
  /**
   * Get statistics from a VEX document
   */
  static getStats(doc: VexDocument) {
    const stats = {
      totalStatements: doc.statements.length,
      statuses: {
        not_affected: 0,
        affected: 0,
        fixed: 0,
        under_investigation: 0
      },
      uniqueVulnerabilities: new Set<string>(),
      uniqueProducts: new Set<string>(),
      withJustification: 0,
      withActionStatement: 0,
      withImpactStatement: 0
    };

    doc.statements.forEach(statement => {
      stats.statuses[statement.status]++;
      stats.uniqueVulnerabilities.add(statement.vulnerability.name);
      statement.products.forEach(product => stats.uniqueProducts.add(product['@id']));
      
      if (statement.justification) stats.withJustification++;
      if (statement.action_statement) stats.withActionStatement++;
      if (statement.impact_statement) stats.withImpactStatement++;
    });

    return {
      ...stats,
      uniqueVulnerabilities: stats.uniqueVulnerabilities.size,
      uniqueProducts: stats.uniqueProducts.size
    };
  }

  /**
   * Find statements by vulnerability name
   */
  static findByVulnerability(doc: VexDocument, vulnerabilityName: string): VexStatement[] {
    return doc.statements.filter(s => s.vulnerability.name === vulnerabilityName);
  }

  /**
   * Find statements by product
   */
  static findByProduct(doc: VexDocument, productId: string): VexStatement[] {
    return doc.statements.filter(s => 
      s.products.some(p => p['@id'].includes(productId))
    );
  }

  /**
   * Get all vulnerabilities in the document
   */
  static getVulnerabilities(doc: VexDocument): string[] {
    return [...new Set(doc.statements.map(s => s.vulnerability.name))];
  }

  /**
   * Get all products in the document
   */
  static getProducts(doc: VexDocument): string[] {
    const products = new Set<string>();
    doc.statements.forEach(s => {
      s.products.forEach(p => products.add(p['@id']));
    });
    return [...products];
  }

  /**
   * Check if a vulnerability is present in the document
   */
  static hasVulnerability(doc: VexDocument, vulnerabilityName: string): boolean {
    return doc.statements.some(s => s.vulnerability.name === vulnerabilityName);
  }

  /**
   * Check if a product is present in the document
   */
  static hasProduct(doc: VexDocument, productId: string): boolean {
    return doc.statements.some(s => 
      s.products.some(p => p['@id'].includes(productId))
    );
  }

  /**
   * Get statements by status
   */
  static getByStatus(doc: VexDocument, status: VexStatus): VexStatement[] {
    return doc.statements.filter(s => s.status === status);
  }

  /**
   * Calculate risk score based on statuses
   */
  static calculateRiskScore(doc: VexDocument): number {
    const weights = {
      affected: 10,
      under_investigation: 5,
      not_affected: 0,
      fixed: 1
    };

    let totalScore = 0;
    doc.statements.forEach(statement => {
      totalScore += weights[statement.status];
    });

    return totalScore;
  }

  /**
   * Get document age in days
   */
  static getDocumentAge(doc: VexDocument): number {
    const timestamp = new Date(doc.timestamp);
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  /**
   * Check if document is stale (older than X days)
   */
  static isStale(doc: VexDocument, daysThreshold = 30): boolean {
    return VexUtils.getDocumentAge(doc) > daysThreshold;
  }

  /**
   * Compare two VEX documents
   */
  static compare(doc1: VexDocument, doc2: VexDocument) {
    const stats1 = VexUtils.getStats(doc1);
    const stats2 = VexUtils.getStats(doc2);

    const vulns1 = new Set(VexUtils.getVulnerabilities(doc1));
    const vulns2 = new Set(VexUtils.getVulnerabilities(doc2));

    const addedVulns = [...vulns2].filter(v => !vulns1.has(v));
    const removedVulns = [...vulns1].filter(v => !vulns2.has(v));
    const commonVulns = [...vulns1].filter(v => vulns2.has(v));

    return {
      doc1Stats: stats1,
      doc2Stats: stats2,
      addedVulnerabilities: addedVulns,
      removedVulnerabilities: removedVulns,
      commonVulnerabilities: commonVulns,
      totalChanges: addedVulns.length + removedVulns.length
    };
  }

  /**
   * Create a minimal VEX document for testing
   */
  static createMinimal(author: string, cveId: string, productPurl: string, status: VexStatus): VexDocument {
    return {
      '@context': 'https://openvex.dev/ns',
      '@id': `https://vexaware.com/vex/minimal-${Date.now()}`,
      author,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      statements: [
        {
          vulnerability: {
            name: cveId,
            '@id': `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cveId}`
          },
          products: [
            {
              '@id': productPurl,
              identifiers: { purl: productPurl }
            }
          ],
          status
        }
      ]
    };
  }
}
