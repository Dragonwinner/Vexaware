import { VexDocument } from '../VexDocument';
import {
  VexStatement,
  SBOMComponent,
  GeneratorOptions,
  VexStatus,
  VexJustification,
} from '../types';

/**
 * VexGenerator - Generate VEX documents from various sources
 */
export class VexGenerator {
  private options: GeneratorOptions;

  constructor(options: GeneratorOptions) {
    this.options = {
      includeTimestamp: true,
      context: 'https://openvex.dev/ns/v0.2.0',
      ...options,
    };
  }

  /**
   * Generate VEX document from SBOM components
   */
  generateFromSBOM(components: SBOMComponent[]): VexDocument {
    const doc = new VexDocument({
      '@context': this.options.context,
      '@id': this.options.documentId,
      author: this.options.author,
      timestamp: new Date().toISOString(),
      version: 1,
    });

    components.forEach((component) => {
      if (component.vulnerabilities && component.vulnerabilities.length > 0) {
        component.vulnerabilities.forEach((vuln) => {
          const statement = this.createStatementFromSBOM(component, vuln);
          doc.addStatement(statement);
        });
      }
    });

    return doc;
  }

  /**
   * Generate VEX document from CVE list
   */
  generateFromCVEs(
    cves: string[],
    productIds: string[],
    status?: VexStatus,
    justification?: VexJustification
  ): VexDocument {
    const doc = new VexDocument({
      '@context': this.options.context,
      '@id': this.options.documentId,
      author: this.options.author,
      timestamp: new Date().toISOString(),
      version: 1,
    });

    cves.forEach((cve) => {
      const statement: VexStatement = {
        vulnerability: { name: cve },
        products: productIds.map((id) => ({ '@id': id })),
        status: status || this.options.defaultStatus || 'under_investigation',
        justification:
          status === 'not_affected'
            ? justification || this.options.defaultJustification
            : undefined,
      };
      doc.addStatement(statement);
    });

    return doc;
  }

  /**
   * Create a single VEX statement
   */
  createStatement(
    cve: string,
    productId: string,
    status: VexStatus,
    justification?: VexJustification,
    impactStatement?: string,
    actionStatement?: string
  ): VexStatement {
    const statement: VexStatement = {
      vulnerability: { name: cve },
      products: [{ '@id': productId }],
      status,
    };

    if (status === 'not_affected' && justification) {
      statement.justification = justification;
    }

    if (impactStatement) {
      statement.impact_statement = impactStatement;
    }

    if (actionStatement) {
      statement.action_statement = actionStatement;
    }

    return statement;
  }

  /**
   * Generate template VEX document
   */
  generateTemplate(includeExamples: boolean = true): VexDocument {
    const doc = new VexDocument({
      '@context': this.options.context,
      '@id': this.options.documentId || 'https://example.com/vex/2025/001',
      author: this.options.author || 'Security Team',
      timestamp: new Date().toISOString(),
      version: 1,
    });

    if (includeExamples) {
      // Example 1: Not affected
      doc.addStatement({
        vulnerability: {
          name: 'CVE-2024-EXAMPLE-1',
          description: 'Example vulnerability description',
        },
        products: [
          {
            '@id': 'pkg:npm/example-package@1.0.0',
          },
        ],
        status: 'not_affected',
        justification: 'vulnerable_code_not_in_execute_path',
        impact_statement: 'The vulnerable code path is not used in our application.',
      });

      // Example 2: Affected
      doc.addStatement({
        vulnerability: {
          name: 'CVE-2024-EXAMPLE-2',
        },
        products: [
          {
            '@id': 'pkg:npm/another-package@2.0.0',
          },
        ],
        status: 'affected',
        action_statement: 'Upgrade to version 2.1.0 or apply security patch.',
      });

      // Example 3: Fixed
      doc.addStatement({
        vulnerability: {
          name: 'CVE-2024-EXAMPLE-3',
        },
        products: [
          {
            '@id': 'pkg:npm/fixed-package@3.0.0',
          },
        ],
        status: 'fixed',
        status_notes: 'Fixed in version 3.0.0 released on 2025-01-15',
      });
    }

    return doc;
  }

  /**
   * Create statement from SBOM component
   */
  private createStatementFromSBOM(
    component: SBOMComponent,
    vulnerability: { id: string; description?: string; severity?: string }
  ): VexStatement {
    const productId =
      component.purl ||
      `pkg:generic/${component.name}${component.version ? '@' + component.version : ''}`;

    return {
      vulnerability: {
        name: vulnerability.id,
        description: vulnerability.description,
      },
      products: [{ '@id': productId }],
      status: this.options.defaultStatus || 'under_investigation',
      justification:
        this.options.defaultStatus === 'not_affected'
          ? this.options.defaultJustification
          : undefined,
      status_notes: vulnerability.severity
        ? `Severity: ${vulnerability.severity}`
        : undefined,
    };
  }

  /**
   * Merge multiple VEX documents
   */
  static mergeDocuments(documents: VexDocument[]): VexDocument {
    if (documents.length === 0) {
      throw new Error('Cannot merge empty document list');
    }

    const merged = documents[0];
    for (let i = 1; i < documents.length; i++) {
      merged.merge(documents[i]);
    }

    return merged;
  }

  /**
   * Generate diff between two VEX documents
   */
  static generateDiff(
    oldDoc: VexDocument,
    newDoc: VexDocument
  ): {
    added: VexStatement[];
    removed: VexStatement[];
    modified: VexStatement[];
  } {
    const oldStatements = oldDoc.getStatements();
    const newStatements = newDoc.getStatements();

    const added: VexStatement[] = [];
    const removed: VexStatement[] = [];
    const modified: VexStatement[] = [];

    // Find added and modified
    newStatements.forEach((newStmt) => {
      const oldStmt = oldStatements.find(
        (s) =>
          s.vulnerability.name === newStmt.vulnerability.name &&
          s.products[0]?.['@id'] === newStmt.products[0]?.['@id']
      );

      if (!oldStmt) {
        added.push(newStmt);
      } else if (oldStmt.status !== newStmt.status) {
        modified.push(newStmt);
      }
    });

    // Find removed
    oldStatements.forEach((oldStmt) => {
      const exists = newStatements.find(
        (s) =>
          s.vulnerability.name === oldStmt.vulnerability.name &&
          s.products[0]?.['@id'] === oldStmt.products[0]?.['@id']
      );

      if (!exists) {
        removed.push(oldStmt);
      }
    });

    return { added, removed, modified };
  }
}
