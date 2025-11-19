import { VexDocument } from '../VexDocument';
import { VexQueryResult, VexStatement, VexStatus } from '../types';

/**
 * VexQuery - Query and search VEX documents
 */
export class VexQuery {
  private document: VexDocument;

  constructor(document: VexDocument) {
    this.document = document;
  }

  /**
   * Query vulnerability status for a specific CVE
   */
  queryVulnerability(cve: string): VexQueryResult {
    const statements = this.document.findByCVE(cve);

    if (statements.length === 0) {
      return { found: false };
    }

    // If multiple statements, prioritize by status
    const priorityOrder: VexStatus[] = [
      'affected',
      'under_investigation',
      'fixed',
      'not_affected',
    ];

    const sortedStatements = statements.sort((a, b) => {
      return priorityOrder.indexOf(a.status) - priorityOrder.indexOf(b.status);
    });

    const primaryStatement = sortedStatements[0];

    return {
      found: true,
      statement: primaryStatement,
      status: primaryStatement.status,
      products: primaryStatement.products,
    };
  }

  /**
   * Query product status
   */
  queryProduct(productId: string): VexStatement[] {
    return this.document.findByProduct(productId);
  }

  /**
   * Check if product is affected by any vulnerabilities
   */
  isProductAffected(productId: string): boolean {
    const statements = this.queryProduct(productId);
    return statements.some((stmt) => stmt.status === 'affected');
  }

  /**
   * Get all affected products
   */
  getAffectedProducts(): string[] {
    const affectedStatements = this.document.findByStatus('affected');
    const products = new Set<string>();

    affectedStatements.forEach((stmt) => {
      stmt.products.forEach((p) => products.add(p['@id']));
    });

    return Array.from(products);
  }

  /**
   * Get all vulnerabilities by status
   */
  getVulnerabilitiesByStatus(status: VexStatus): string[] {
    const statements = this.document.findByStatus(status);
    return statements.map((stmt) => stmt.vulnerability.name);
  }

  /**
   * Search statements by keyword
   */
  search(keyword: string): VexStatement[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.document.getStatements().filter((stmt) => {
      return (
        stmt.vulnerability.name.toLowerCase().includes(lowerKeyword) ||
        stmt.vulnerability.description?.toLowerCase().includes(lowerKeyword) ||
        stmt.impact_statement?.toLowerCase().includes(lowerKeyword) ||
        stmt.action_statement?.toLowerCase().includes(lowerKeyword) ||
        stmt.products.some((p) => p['@id'].toLowerCase().includes(lowerKeyword))
      );
    });
  }

  /**
   * Get summary statistics
   */
  getSummary(): {
    total: number;
    affected: number;
    notAffected: number;
    fixed: number;
    underInvestigation: number;
    riskScore: number;
  } {
    const stats = this.document.getStats();

    const total = stats.totalStatements;
    const affected = stats.byStatus.affected;
    const notAffected = stats.byStatus.not_affected;
    const fixed = stats.byStatus.fixed;
    const underInvestigation = stats.byStatus.under_investigation;

    // Calculate risk score (0-100)
    const riskScore =
      total > 0
        ? Math.round(
            ((affected * 100 + underInvestigation * 50) / (total * 100)) * 100
          )
        : 0;

    return {
      total,
      affected,
      notAffected,
      fixed,
      underInvestigation,
      riskScore,
    };
  }

  /**
   * Get vulnerabilities that need action
   */
  getActionableVulnerabilities(): VexStatement[] {
    return this.document
      .getStatements()
      .filter(
        (stmt) =>
          stmt.status === 'affected' || stmt.status === 'under_investigation'
      );
  }

  /**
   * Compare with another VEX document
   */
  compareWith(other: VexDocument): {
    onlyInThis: VexStatement[];
    onlyInOther: VexStatement[];
    statusChanged: Array<{
      cve: string;
      product: string;
      oldStatus: VexStatus;
      newStatus: VexStatus;
    }>;
  } {
    const thisStatements = this.document.getStatements();
    const otherStatements = other.getStatements();

    const onlyInThis: VexStatement[] = [];
    const onlyInOther: VexStatement[] = [];
    const statusChanged: Array<{
      cve: string;
      product: string;
      oldStatus: VexStatus;
      newStatus: VexStatus;
    }> = [];

    // Check statements only in this document
    thisStatements.forEach((stmt) => {
      const key = `${stmt.vulnerability.name}:${stmt.products[0]?.['@id']}`;
      const found = otherStatements.find(
        (s) =>
          s.vulnerability.name === stmt.vulnerability.name &&
          s.products[0]?.['@id'] === stmt.products[0]?.['@id']
      );

      if (!found) {
        onlyInThis.push(stmt);
      } else if (found.status !== stmt.status) {
        statusChanged.push({
          cve: stmt.vulnerability.name,
          product: stmt.products[0]?.['@id'],
          oldStatus: stmt.status,
          newStatus: found.status,
        });
      }
    });

    // Check statements only in other document
    otherStatements.forEach((stmt) => {
      const found = thisStatements.find(
        (s) =>
          s.vulnerability.name === stmt.vulnerability.name &&
          s.products[0]?.['@id'] === stmt.products[0]?.['@id']
      );

      if (!found) {
        onlyInOther.push(stmt);
      }
    });

    return { onlyInThis, onlyInOther, statusChanged };
  }
}
