import { VexDocument, VexValidator, VexGenerator } from '../src';

/**
 * Example 1: Creating a simple VEX document
 */
function example1CreateSimpleDocument() {
  console.log('\n=== Example 1: Creating a Simple VEX Document ===\n');

  const doc = new VexDocument({
    author: 'Security Team',
    timestamp: new Date().toISOString(),
    version: 1,
  });

  doc.addStatement({
    vulnerability: { name: 'CVE-2024-1234' },
    products: [{ '@id': 'pkg:npm/example@1.0.0' }],
    status: 'not_affected',
    justification: 'vulnerable_code_not_in_execute_path',
    impact_statement: 'The vulnerable code is not used in our application.',
  });

  console.log(doc.toString());
  doc.save('examples/output/simple-vex.json');
  console.log('\n✓ Saved to examples/output/simple-vex.json');
}

/**
 * Example 2: Validating a VEX document
 */
function example2ValidateDocument() {
  console.log('\n=== Example 2: Validating a VEX Document ===\n');

  const doc = VexDocument.load('examples/sample-vex-document.json');
  const validator = new VexValidator();
  const result = validator.validate(doc.toJSON());

  console.log(`Valid: ${result.valid}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings?.length || 0}`);

  if (result.warnings) {
    result.warnings.forEach((w) => console.log(`  Warning: ${w}`));
  }
}

/**
 * Example 3: Querying vulnerability status
 */
function example3QueryVulnerability() {
  console.log('\n=== Example 3: Querying Vulnerability Status ===\n');

  const doc = VexDocument.load('examples/sample-vex-document.json');
  const cve = 'CVE-2024-1234';
  const statements = doc.findByCVE(cve);

  if (statements.length > 0) {
    const stmt = statements[0];
    console.log(`CVE: ${cve}`);
    console.log(`Status: ${stmt.status}`);
    console.log(`Justification: ${stmt.justification || 'N/A'}`);
    console.log(`Impact: ${stmt.impact_statement || 'N/A'}`);
  }
}

/**
 * Example 4: Generating VEX from SBOM
 */
function example4GenerateFromSBOM() {
  console.log('\n=== Example 4: Generating VEX from SBOM ===\n');

  const generator = new VexGenerator({ author: 'Automated Security Scanner' });
  
  // Simulate SBOM data
  const sbomComponents = [
    {
      name: 'vulnerable-lib',
      version: '1.0.0',
      purl: 'pkg:npm/vulnerable-lib@1.0.0',
      vulnerabilities: [
        {
          id: 'CVE-2024-9999',
          description: 'Example vulnerability',
          severity: 'high',
        },
      ],
    },
  ];

  const doc = generator.generateFromSBOM(sbomComponents);
  console.log(doc.toString());
}

/**
 * Example 5: Getting document statistics
 */
function example5GetStatistics() {
  console.log('\n=== Example 5: Document Statistics ===\n');

  const doc = VexDocument.load('examples/sample-vex-document.json');
  const stats = doc.getStats();

  console.log(`Total Statements: ${stats.totalStatements}`);
  console.log(`Unique Vulnerabilities: ${stats.uniqueVulnerabilities}`);
  console.log(`Unique Products: ${stats.uniqueProducts}`);
  console.log('\nBy Status:');
  console.log(`  Not Affected: ${stats.byStatus.not_affected}`);
  console.log(`  Affected: ${stats.byStatus.affected}`);
  console.log(`  Fixed: ${stats.byStatus.fixed}`);
  console.log(`  Under Investigation: ${stats.byStatus.under_investigation}`);
}

// Run examples
if (require.main === module) {
  // Create output directory
  const fs = require('fs');
  if (!fs.existsSync('examples/output')) {
    fs.mkdirSync('examples/output', { recursive: true });
  }

  example1CreateSimpleDocument();
  example2ValidateDocument();
  example3QueryVulnerability();
  example4GenerateFromSBOM();
  example5GetStatistics();

  console.log('\n✓ All examples completed!\n');
}
