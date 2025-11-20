/**
 * VEX Document Builder
 * Fluent API for building VEX documents programmatically
 */

import { v4 as uuidv4 } from 'uuid';
import {
  VexDocument,
  VexStatement,
  VexProduct,
  VexStatus,
  VexJustification,
  VexBuilderOptions,
  VexTooling,
  VexMetadata
} from './types';

export class VexBuilder {
  private document: Partial<VexDocument>;

  constructor(options: VexBuilderOptions) {
    const timestamp = new Date().toISOString();
    
    this.document = {
      '@context': options.context || 'https://openvex.dev/ns',
      '@id': options.id || `https://vexaware.com/vex/${uuidv4()}`,
      author: options.author,
      timestamp: timestamp,
      version: options.version || '1.0.0',
      statements: []
    };

    if (options.tooling) {
      this.document.tooling = options.tooling;
    }

    if (options.metadata) {
      this.document.metadata = options.metadata;
    }
  }

  /**
   * Set document tooling information
   */
  setTooling(vendor: string, name: string, version: string): this {
    this.document.tooling = { vendor, name, version };
    return this;
  }

  /**
   * Set document metadata
   */
  setMetadata(metadata: VexMetadata): this {
    this.document.metadata = metadata;
    return this;
  }

  /**
   * Add metadata field
   */
  addMetadata(key: string, value: any): this {
    if (!this.document.metadata) {
      this.document.metadata = {};
    }
    this.document.metadata[key] = value;
    return this;
  }

  /**
   * Add a VEX statement
   */
  addStatement(statement: VexStatement): this {
    if (!this.document.statements) {
      this.document.statements = [];
    }
    this.document.statements.push(statement);
    return this;
  }

  /**
   * Create and add a statement using a fluent builder
   */
  createStatement(): StatementBuilder {
    return new StatementBuilder(this);
  }

  /**
   * Build the final VEX document
   */
  build(): VexDocument {
    if (!this.document.statements || this.document.statements.length === 0) {
      throw new Error('VEX document must contain at least one statement');
    }

    return this.document as VexDocument;
  }

  /**
   * Get the current document state
   */
  getDocument(): Partial<VexDocument> {
    return this.document;
  }
}

/**
 * Statement builder for fluent API
 */
export class StatementBuilder {
  private statement: Partial<VexStatement>;
  private parentBuilder: VexBuilder;

  constructor(parentBuilder: VexBuilder) {
    this.parentBuilder = parentBuilder;
    this.statement = {
      products: []
    };
  }

  /**
   * Set vulnerability information
   */
  vulnerability(name: string, id: string, description?: string, aliases?: string[]): this {
    this.statement.vulnerability = {
      name,
      '@id': id,
      description,
      aliases
    };
    return this;
  }

  /**
   * Set CVE vulnerability
   */
  cve(cveId: string, description?: string): this {
    return this.vulnerability(
      cveId,
      `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cveId}`,
      description
    );
  }

  /**
   * Add a product
   */
  addProduct(product: VexProduct): this {
    if (!this.statement.products) {
      this.statement.products = [];
    }
    this.statement.products.push(product);
    return this;
  }

  /**
   * Add a product using PURL
   */
  addProductByPurl(purl: string, hashes?: { [algorithm: string]: string }): this {
    const product: VexProduct = {
      '@id': purl,
      identifiers: { purl }
    };
    
    if (hashes) {
      product.hashes = hashes;
    }

    return this.addProduct(product);
  }

  /**
   * Set the status
   */
  status(status: VexStatus): this {
    this.statement.status = status;
    return this;
  }

  /**
   * Set as not affected with justification
   */
  notAffected(justification: VexJustification, impactStatement?: string): this {
    this.statement.status = 'not_affected';
    this.statement.justification = justification;
    if (impactStatement) {
      this.statement.impact_statement = impactStatement;
    }
    return this;
  }

  /**
   * Set as affected with action statement
   */
  affected(actionStatement: string, impactStatement?: string): this {
    this.statement.status = 'affected';
    this.statement.action_statement = actionStatement;
    if (impactStatement) {
      this.statement.impact_statement = impactStatement;
    }
    return this;
  }

  /**
   * Set as fixed with action statement
   */
  fixed(actionStatement: string): this {
    this.statement.status = 'fixed';
    this.statement.action_statement = actionStatement;
    return this;
  }

  /**
   * Set as under investigation
   */
  underInvestigation(impactStatement?: string): this {
    this.statement.status = 'under_investigation';
    if (impactStatement) {
      this.statement.impact_statement = impactStatement;
    }
    return this;
  }

  /**
   * Set impact statement
   */
  impactStatement(statement: string): this {
    this.statement.impact_statement = statement;
    return this;
  }

  /**
   * Set action statement
   */
  actionStatement(statement: string, timestamp?: string): this {
    this.statement.action_statement = statement;
    if (timestamp) {
      this.statement.action_statement_timestamp = timestamp;
    }
    return this;
  }

  /**
   * Set supplier information
   */
  supplier(name: string, email?: string, url?: string): this {
    this.statement.supplier = { name, email, url };
    return this;
  }

  /**
   * Complete the statement and return to parent builder
   */
  done(): VexBuilder {
    if (!this.statement.vulnerability) {
      throw new Error('Statement must have vulnerability information');
    }
    if (!this.statement.products || this.statement.products.length === 0) {
      throw new Error('Statement must have at least one product');
    }
    if (!this.statement.status) {
      throw new Error('Statement must have a status');
    }

    this.parentBuilder.addStatement(this.statement as VexStatement);
    return this.parentBuilder;
  }
}
