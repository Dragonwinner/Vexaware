import * as fs from 'fs';
import * as yaml from 'js-yaml';
import {
  VexDocumentData,
  VexDocumentMetadata,
  VexStatement,
  VexStatus,
} from './types';

/**
 * VexDocument - Main class for creating and managing VEX documents
 */
export class VexDocument {
  private metadata: VexDocumentMetadata;
  private statements: VexStatement[];

  constructor(metadata: VexDocumentMetadata) {
    this.metadata = {
      '@context': metadata['@context'] || 'https://openvex.dev/ns/v0.2.0',
      '@id': metadata['@id'],
      author: metadata.author,
      author_role: metadata.author_role,
      timestamp: metadata.timestamp || new Date().toISOString(),
      version: metadata.version || 1,
      tooling: metadata.tooling || '@vexaware/vex-tool',
      supplier: metadata.supplier,
      last_updated: metadata.last_updated,
    };
    this.statements = [];
  }

  /**
   * Add a VEX statement to the document
   */
  addStatement(statement: VexStatement): void {
    this.statements.push(statement);
  }

  /**
   * Add multiple statements at once
   */
  addStatements(statements: VexStatement[]): void {
    this.statements.push(...statements);
  }

  /**
   * Get all statements
   */
  getStatements(): VexStatement[] {
    return this.statements;
  }

  /**
   * Find statements for a specific CVE
   */
  findByCVE(cve: string): VexStatement[] {
    return this.statements.filter(
      (stmt) =>
        stmt.vulnerability.name === cve ||
        stmt.vulnerability.aliases?.includes(cve)
    );
  }

  /**
   * Find statements for a specific product
   */
  findByProduct(productId: string): VexStatement[] {
    return this.statements.filter((stmt) =>
      stmt.products.some((p) => p['@id'] === productId)
    );
  }

  /**
   * Find statements by status
   */
  findByStatus(status: VexStatus): VexStatement[] {
    return this.statements.filter((stmt) => stmt.status === status);
  }

  /**
   * Update document metadata
   */
  updateMetadata(updates: Partial<VexDocumentMetadata>): void {
    this.metadata = { ...this.metadata, ...updates };
    this.metadata.last_updated = new Date().toISOString();
  }

  /**
   * Merge another VEX document into this one
   */
  merge(other: VexDocument): void {
    const otherData = other.toJSON();
    this.statements.push(...otherData.statements);
    this.metadata.last_updated = new Date().toISOString();
  }

  /**
   * Convert to JSON object
   */
  toJSON(): VexDocumentData {
    return {
      ...this.metadata,
      statements: this.statements,
    };
  }

  /**
   * Convert to JSON string
   */
  toString(pretty: boolean = true): string {
    return JSON.stringify(this.toJSON(), null, pretty ? 2 : 0);
  }

  /**
   * Convert to YAML string
   */
  toYAML(): string {
    return yaml.dump(this.toJSON(), { indent: 2 });
  }

  /**
   * Save to file (JSON or YAML based on extension)
   */
  save(filename: string, format?: 'json' | 'yaml'): void {
    const ext = format || filename.split('.').pop()?.toLowerCase();
    let content: string;

    if (ext === 'yaml' || ext === 'yml') {
      content = this.toYAML();
    } else {
      content = this.toString();
    }

    fs.writeFileSync(filename, content, 'utf-8');
  }

  /**
   * Load VEX document from file
   */
  static load(filename: string): VexDocument {
    const content = fs.readFileSync(filename, 'utf-8');
    const ext = filename.split('.').pop()?.toLowerCase();

    let data: VexDocumentData;
    if (ext === 'yaml' || ext === 'yml') {
      data = yaml.load(content) as VexDocumentData;
    } else {
      data = JSON.parse(content) as VexDocumentData;
    }

    return VexDocument.fromJSON(data);
  }

  /**
   * Create VexDocument from JSON data
   */
  static fromJSON(data: VexDocumentData): VexDocument {
    const doc = new VexDocument({
      '@context': data['@context'],
      '@id': data['@id'],
      author: data.author,
      author_role: data.author_role,
      timestamp: data.timestamp,
      version: data.version,
      tooling: data.tooling,
      supplier: data.supplier,
      last_updated: data.last_updated,
    });

    doc.addStatements(data.statements || []);
    return doc;
  }

  /**
   * Get document statistics
   */
  getStats(): {
    totalStatements: number;
    byStatus: Record<VexStatus, number>;
    uniqueVulnerabilities: number;
    uniqueProducts: number;
  } {
    const byStatus: Record<VexStatus, number> = {
      not_affected: 0,
      affected: 0,
      fixed: 0,
      under_investigation: 0,
    };

    const vulnerabilities = new Set<string>();
    const products = new Set<string>();

    this.statements.forEach((stmt) => {
      byStatus[stmt.status]++;
      vulnerabilities.add(stmt.vulnerability.name);
      stmt.products.forEach((p) => products.add(p['@id']));
    });

    return {
      totalStatements: this.statements.length,
      byStatus,
      uniqueVulnerabilities: vulnerabilities.size,
      uniqueProducts: products.size,
    };
  }
}
