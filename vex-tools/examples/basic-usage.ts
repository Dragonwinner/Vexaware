/**
 * VEX Tools - Basic Usage Examples
 */

import { VexBuilder, VexParser, VexExporter, VexUtils } from '../src/index';

// Example 1: Create a simple VEX document
function example1_createSimpleDocument() {
  console.log('Example 1: Creating a simple VEX document\n');
  
  const vexDoc = new VexBuilder({ author: 'security-team@example.com' })
    .setTooling('VEX Aware', 'VEX Tools', '1.0.0')
    .createStatement()
      .cve('CVE-2024-1234', 'SQL injection vulnerability in user authentication module')
      .addProductByPurl('pkg:npm/my-app@1.0.0')
      .notAffected(
        'component_not_present',
        'The vulnerable authentication module is not included in this deployment.'
      )
      .done()
    .build();
  
  console.log(VexExporter.toJson(vexDoc, { pretty: true }));
  console.log('\n---\n');
}

// Example 2: Create a document with multiple statements
function example2_multipleStatements() {
  console.log('Example 2: Creating a document with multiple statements\n');
  
  const builder = new VexBuilder({ 
    author: 'VEX Aware Security Team',
    metadata: {
      environment: 'production',
      scan_tools: ['trivy', 'grype']
    }
  });
  
  builder
    .createStatement()
      .cve('CVE-2024-1001')
      .addProductByPurl('pkg:npm/express@4.18.0')
      .affected(
        'Upgrade to express@4.18.2 or later',
        'This vulnerability may allow denial of service attacks'
      )
      .done()
    .createStatement()
      .cve('CVE-2024-1002')
      .addProductByPurl('pkg:npm/lodash@4.17.20')
      .fixed('Fixed in version 4.17.21 which is now deployed')
      .done()
    .createStatement()
      .cve('CVE-2024-1003')
      .addProductByPurl('pkg:npm/moment@2.29.1')
      .notAffected(
        'vulnerable_code_not_in_execute_path',
        'The vulnerable code path is not accessible in our configuration'
      )
      .done();
  
  const vexDoc = builder.build();
  console.log(VexExporter.toJson(vexDoc, { pretty: true }));
  console.log('\n---\n');
}

// Example 3: Parse and validate a VEX document
function example3_parseAndValidate() {
  console.log('Example 3: Parsing and validating a VEX document\n');
  
  const jsonString = `{
    "@context": "https://openvex.dev/ns",
    "@id": "https://example.com/vex/doc1",
    "author": "security@example.com",
    "timestamp": "2024-01-15T10:00:00Z",
    "version": "1.0.0",
    "statements": [
      {
        "vulnerability": {
          "name": "CVE-2024-5678",
          "@id": "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-5678"
        },
        "products": [
          {
            "@id": "pkg:npm/test-package@1.0.0",
            "identifiers": { "purl": "pkg:npm/test-package@1.0.0" }
          }
        ],
        "status": "not_affected",
        "justification": "component_not_present"
      }
    ]
  }`;
  
  try {
    const doc = VexParser.parseJson(jsonString);
    console.log('✓ Document parsed successfully');
    
    const validation = VexParser.validate(doc);
    console.log(`✓ Validation result: ${validation.valid ? 'VALID' : 'INVALID'}`);
    console.log(`  Errors: ${validation.errors.length}`);
    console.log(`  Warnings: ${validation.warnings.length}`);
    
    const stats = VexUtils.getStats(doc);
    console.log(`\n✓ Statistics:`);
    console.log(`  Total statements: ${stats.totalStatements}`);
    console.log(`  Unique vulnerabilities: ${stats.uniqueVulnerabilities}`);
    console.log(`  Unique products: ${stats.uniqueProducts}`);
  } catch (error) {
    console.error('✗ Error:', error.message);
  }
  
  console.log('\n---\n');
}

// Example 4: Working with document statistics
function example4_statistics() {
  console.log('Example 4: Working with document statistics\n');
  
  const doc = new VexBuilder({ author: 'security-team@example.com' })
    .createStatement()
      .cve('CVE-2024-1001')
      .addProductByPurl('pkg:npm/package1@1.0.0')
      .affected('Update required')
      .done()
    .createStatement()
      .cve('CVE-2024-1002')
      .addProductByPurl('pkg:npm/package2@2.0.0')
      .notAffected('component_not_present')
      .done()
    .createStatement()
      .cve('CVE-2024-1003')
      .addProductByPurl('pkg:npm/package3@3.0.0')
      .fixed('Already patched')
      .done()
    .build();
  
  const stats = VexUtils.getStats(doc);
  console.log('Document Statistics:');
  console.log(`  Total Statements: ${stats.totalStatements}`);
  console.log(`  Status Breakdown:`);
  console.log(`    - Not Affected: ${stats.statuses.not_affected}`);
  console.log(`    - Affected: ${stats.statuses.affected}`);
  console.log(`    - Fixed: ${stats.statuses.fixed}`);
  console.log(`    - Under Investigation: ${stats.statuses.under_investigation}`);
  
  const riskScore = VexUtils.calculateRiskScore(doc);
  console.log(`\n  Risk Score: ${riskScore}`);
  
  const summary = VexExporter.toSummary(doc);
  console.log('\n' + summary);
  
  console.log('\n---\n');
}

// Example 5: Exporting to different formats
function example5_exportFormats() {
  console.log('Example 5: Exporting to different formats\n');
  
  const doc = new VexBuilder({ author: 'security@example.com' })
    .createStatement()
      .cve('CVE-2024-9999')
      .addProductByPurl('pkg:npm/example@1.0.0')
      .notAffected('component_not_present')
      .done()
    .build();
  
  console.log('JSON (pretty):');
  console.log(VexExporter.toJson(doc, { pretty: true, indent: 2 }));
  
  console.log('\n\nYAML:');
  console.log(VexExporter.toYaml(doc));
  
  console.log('\n---\n');
}

// Run all examples
console.log('='.repeat(60));
console.log('VEX TOOLS - USAGE EXAMPLES');
console.log('='.repeat(60));
console.log('\n');

example1_createSimpleDocument();
example2_multipleStatements();
example3_parseAndValidate();
example4_statistics();
example5_exportFormats();

console.log('='.repeat(60));
console.log('All examples completed successfully!');
console.log('='.repeat(60));
