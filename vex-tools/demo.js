/**
 * VEX Tools Platform - Comprehensive Demo
 */

const { VexBuilder, VexParser, VexExporter, VexConverter, VexUtils } = require('./lib/index.js');
const fs = require('fs');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║       VEX TOOLS PLATFORM - COMPREHENSIVE DEMO             ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');

// Demo 1: Create a comprehensive VEX document
console.log('📝 Demo 1: Creating a VEX document with multiple statements');
console.log('─'.repeat(60));

const doc1 = new VexBuilder({ 
  author: 'security-team@example.com',
  metadata: {
    environment: 'production',
    scan_date: new Date().toISOString(),
    scan_tools: ['trivy', 'grype', 'snyk']
  }
})
  .setTooling('VEX Aware', 'VEX Tools Platform', '1.0.0')
  .createStatement()
    .cve('CVE-2024-1234', 'Remote code execution vulnerability')
    .addProductByPurl('pkg:npm/express@4.18.0', { sha256: 'abc123...' })
    .affected(
      'Upgrade to express@4.18.2 or later immediately',
      'Critical vulnerability allowing remote code execution through malformed HTTP headers'
    )
    .supplier('Express Team', 'security@expressjs.com')
    .done()
  .createStatement()
    .cve('CVE-2024-5678', 'SQL injection in authentication module')
    .addProductByPurl('pkg:npm/sequelize@6.30.0')
    .notAffected(
      'vulnerable_code_not_in_execute_path',
      'We do not use the vulnerable authentication flow in our implementation'
    )
    .done()
  .createStatement()
    .cve('CVE-2024-9999', 'Denial of service vulnerability')
    .addProductByPurl('pkg:npm/lodash@4.17.20')
    .fixed('Fixed in lodash@4.17.21 which has been deployed')
    .done()
  .build();

console.log('✅ Created document with', doc1.statements.length, 'statements');
console.log('   Document ID:', doc1['@id']);
console.log('');

// Demo 2: Validate and get statistics
console.log('📊 Demo 2: Validating and analyzing the document');
console.log('─'.repeat(60));

const validation = VexParser.validate(doc1);
console.log('Validation:', validation.valid ? '✅ VALID' : '❌ INVALID');
console.log('  Errors:', validation.errors.length);
console.log('  Warnings:', validation.warnings.length);
console.log('');

const stats = VexUtils.getStats(doc1);
console.log('Statistics:');
console.log('  Total Statements:', stats.totalStatements);
console.log('  Not Affected:', stats.statuses.not_affected);
console.log('  Affected:', stats.statuses.affected);
console.log('  Fixed:', stats.statuses.fixed);
console.log('  Under Investigation:', stats.statuses.under_investigation);
console.log('  Unique Vulnerabilities:', stats.uniqueVulnerabilities);
console.log('  Unique Products:', stats.uniqueProducts);

const riskScore = VexUtils.calculateRiskScore(doc1);
console.log('  Risk Score:', riskScore);
console.log('');

// Demo 3: Export to different formats
console.log('💾 Demo 3: Exporting to different formats');
console.log('─'.repeat(60));

const jsonOutput = VexExporter.toJson(doc1, { pretty: true, indent: 2 });
const yamlOutput = VexExporter.toYaml(doc1);
const summary = VexExporter.toSummary(doc1);

console.log('JSON output:', jsonOutput.length, 'bytes');
console.log('YAML output:', yamlOutput.length, 'bytes');
console.log('');
console.log('Summary:');
console.log(summary);
console.log('');

// Demo 4: Filter operations
console.log('🔍 Demo 4: Filtering documents');
console.log('─'.repeat(60));

const affectedOnly = VexConverter.filterByStatus(doc1, 'affected');
console.log('Filtered to affected vulnerabilities:', affectedOnly.statements.length, 'statements');

const fixedOnly = VexConverter.filterByStatus(doc1, 'fixed');
console.log('Filtered to fixed vulnerabilities:', fixedOnly.statements.length, 'statements');
console.log('');

// Demo 5: Create another document and merge
console.log('🔀 Demo 5: Merging multiple documents');
console.log('─'.repeat(60));

const doc2 = new VexBuilder({ author: 'security-team@example.com' })
  .createStatement()
    .cve('CVE-2024-1111')
    .addProductByPurl('pkg:npm/axios@0.27.0')
    .affected('Update to axios@1.6.0 or later')
    .done()
  .build();

const merged = VexConverter.merge(doc1, doc2);
console.log('Document 1 statements:', doc1.statements.length);
console.log('Document 2 statements:', doc2.statements.length);
console.log('Merged document statements:', merged.statements.length);
console.log('');

// Demo 6: Search and query
console.log('🔎 Demo 6: Searching documents');
console.log('─'.repeat(60));

const vulns = VexUtils.getVulnerabilities(doc1);
console.log('All vulnerabilities:', vulns.join(', '));

const products = VexUtils.getProducts(doc1);
console.log('All products:', products.join(', '));

const hasExpress = VexUtils.hasProduct(doc1, 'express');
console.log('Contains express package?', hasExpress ? 'Yes' : 'No');
console.log('');

// Demo 7: Compare documents
console.log('⚖️  Demo 7: Comparing documents');
console.log('─'.repeat(60));

const comparison = VexUtils.compare(doc1, merged);
console.log('Document 1 total statements:', comparison.doc1Stats.totalStatements);
console.log('Document 2 total statements:', comparison.doc2Stats.totalStatements);
console.log('Added vulnerabilities:', comparison.addedVulnerabilities.length);
console.log('Removed vulnerabilities:', comparison.removedVulnerabilities.length);
console.log('Common vulnerabilities:', comparison.commonVulnerabilities.length);
console.log('Total changes:', comparison.totalChanges);
console.log('');

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║           DEMO COMPLETED SUCCESSFULLY! ✅                 ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');
console.log('📚 For more information:');
console.log('   - README.md: Complete documentation');
console.log('   - QUICKSTART.md: Quick start guide');
console.log('   - docs/ARCHITECTURE.md: Architecture details');
console.log('   - examples/: More usage examples');
