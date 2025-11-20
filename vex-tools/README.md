# VEX Tools Platform

A comprehensive toolkit for creating, validating, converting, and managing VEX (Vulnerability Exploitability eXchange) documents. Part of the VEX Aware ecosystem.

## 🚀 Features

- **Document Building**: Fluent API for creating VEX documents programmatically
- **Parsing & Validation**: Parse and validate VEX documents from JSON/YAML
- **Format Conversion**: Convert between JSON and YAML formats
- **Document Operations**: Merge, filter, and transform VEX documents
- **Statistics & Analytics**: Extract insights from VEX documents
- **CLI Tool**: Command-line interface for common operations
- **TypeScript Support**: Full TypeScript type definitions included

## 📦 Installation

### As a standalone package

```bash
cd vex-tools
npm install
npm run build
```

### Using the CLI tool globally

```bash
cd vex-tools
npm install
npm run build
npm link  # Makes vex-tools command available globally
```

## 🔧 Usage

### Programmatic API

#### Creating a VEX Document

```typescript
import { VexBuilder } from '@vexaware/vex-tools';

const vexDoc = new VexBuilder({ author: 'security-team@example.com' })
  .setTooling('VEX Aware', 'VEX Tools', '1.0.0')
  .createStatement()
    .cve('CVE-2024-1234', 'SQL injection vulnerability')
    .addProductByPurl('pkg:npm/my-app@1.0.0')
    .notAffected(
      'component_not_present',
      'The vulnerable component is not included in this deployment.'
    )
    .done()
  .build();

console.log(JSON.stringify(vexDoc, null, 2));
```

#### Parsing and Validating

```typescript
import { VexParser } from '@vexaware/vex-tools';

const jsonString = '{ "@context": "https://openvex.dev/ns", ... }';
const doc = VexParser.parseJson(jsonString);

const validation = VexParser.validate(doc);
if (validation.valid) {
  console.log('✓ Document is valid');
} else {
  console.log('✗ Validation errors:', validation.errors);
}
```

#### Working with Statistics

```typescript
import { VexUtils } from '@vexaware/vex-tools';

const stats = VexUtils.getStats(doc);
console.log(`Total statements: ${stats.totalStatements}`);
console.log(`Affected: ${stats.statuses.affected}`);
console.log(`Not affected: ${stats.statuses.not_affected}`);

const riskScore = VexUtils.calculateRiskScore(doc);
console.log(`Risk score: ${riskScore}`);
```

#### Converting and Exporting

```typescript
import { VexExporter } from '@vexaware/vex-tools';

// Export to JSON
const json = VexExporter.toJson(doc, { pretty: true, indent: 2 });

// Export to YAML
const yaml = VexExporter.toYaml(doc);

// Get summary
const summary = VexExporter.toSummary(doc);
console.log(summary);
```

#### Merging Documents

```typescript
import { VexConverter } from '@vexaware/vex-tools';

const merged = VexConverter.merge(doc1, doc2, doc3);
console.log(`Merged ${merged.statements.length} statements`);
```

#### Filtering Documents

```typescript
import { VexConverter } from '@vexaware/vex-tools';

// Filter by status
const affected = VexConverter.filterByStatus(doc, 'affected');

// Filter by vulnerability
const filtered = VexConverter.filterByVulnerability(doc, /CVE-2024-.*/);

// Filter by product
const productFiltered = VexConverter.filterByProduct(doc, 'pkg:npm/express');
```

### Command Line Interface

#### Validate a VEX Document

```bash
vex-tools validate my-document.json
vex-tools validate --strict my-document.yaml
```

#### Convert Between Formats

```bash
# JSON to YAML
vex-tools convert input.json output.yaml --format yaml

# YAML to JSON
vex-tools convert input.yaml output.json --format json
```

#### Show Statistics

```bash
vex-tools stats my-document.json
```

Output:
```
VEX Document Statistics
========================
Total Statements: 15
Unique Vulnerabilities: 12
Unique Products: 8

Status Breakdown:
  Not Affected: 8
  Affected: 3
  Fixed: 3
  Under Investigation: 1
```

#### Merge Documents

```bash
vex-tools merge merged.json doc1.json doc2.json doc3.json
```

#### Filter Documents

```bash
# Filter by status
vex-tools filter input.json output.json --status affected

# Filter by vulnerability pattern
vex-tools filter input.json output.json --vulnerability "CVE-2024-.*"

# Filter by product
vex-tools filter input.json output.json --product "pkg:npm/express"
```

#### Show Summary

```bash
vex-tools summary my-document.json
```

## 📚 API Reference

### VexBuilder

Fluent API for building VEX documents.

**Methods:**
- `constructor(options: VexBuilderOptions)`
- `setTooling(vendor, name, version): this`
- `setMetadata(metadata): this`
- `addMetadata(key, value): this`
- `createStatement(): StatementBuilder`
- `addStatement(statement): this`
- `build(): VexDocument`

### StatementBuilder

Fluent API for building VEX statements.

**Methods:**
- `vulnerability(name, id, description?, aliases?): this`
- `cve(cveId, description?): this`
- `addProduct(product): this`
- `addProductByPurl(purl, hashes?): this`
- `status(status): this`
- `notAffected(justification, impactStatement?): this`
- `affected(actionStatement, impactStatement?): this`
- `fixed(actionStatement): this`
- `underInvestigation(impactStatement?): this`
- `supplier(name, email?, url?): this`
- `done(): VexBuilder`

### VexParser

Parse and validate VEX documents.

**Methods:**
- `parseJson(jsonString, options?): VexDocument`
- `parseYaml(yamlString, options?): VexDocument`
- `validate(doc, strict?): VexValidationResult`
- `isValid(doc): boolean`

### VexExporter

Export VEX documents to various formats.

**Methods:**
- `toJson(doc, options?): string`
- `toYaml(doc, options?): string`
- `export(doc, options?): string`
- `toJsonArray(docs, options?): string`
- `toSummary(doc): string`

### VexConverter

Convert, merge, and transform VEX documents.

**Methods:**
- `merge(...docs): VexDocument`
- `filterByStatus(doc, status): VexDocument`
- `filterByVulnerability(doc, pattern): VexDocument`
- `filterByProduct(doc, productId): VexDocument`
- `splitByStatus(doc): Record<VexStatus, VexDocument>`
- `updateStatus(doc, vulnerabilityName, newStatus): VexDocument`
- `deduplicate(doc): VexDocument`

### VexUtils

Utility functions for working with VEX documents.

**Methods:**
- `getStats(doc): Statistics`
- `findByVulnerability(doc, name): VexStatement[]`
- `findByProduct(doc, productId): VexStatement[]`
- `getVulnerabilities(doc): string[]`
- `getProducts(doc): string[]`
- `hasVulnerability(doc, name): boolean`
- `hasProduct(doc, productId): boolean`
- `getByStatus(doc, status): VexStatement[]`
- `calculateRiskScore(doc): number`
- `getDocumentAge(doc): number`
- `isStale(doc, daysThreshold?): boolean`
- `compare(doc1, doc2): ComparisonResult`
- `createMinimal(author, cveId, productPurl, status): VexDocument`

## 🔍 VEX Document Structure

A VEX document follows the OpenVEX specification:

```json
{
  "@context": "https://openvex.dev/ns",
  "@id": "https://example.com/vex/doc1",
  "author": "security@example.com",
  "timestamp": "2024-01-15T10:00:00Z",
  "version": "1.0.0",
  "tooling": {
    "vendor": "VEX Aware",
    "name": "VEX Tools",
    "version": "1.0.0"
  },
  "statements": [
    {
      "vulnerability": {
        "name": "CVE-2024-1234",
        "@id": "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-1234"
      },
      "products": [
        {
          "@id": "pkg:npm/my-app@1.0.0",
          "identifiers": {
            "purl": "pkg:npm/my-app@1.0.0"
          }
        }
      ],
      "status": "not_affected",
      "justification": "component_not_present",
      "impact_statement": "The vulnerable component is not included."
    }
  ]
}
```

### Status Values

- `not_affected` - Product is not affected by the vulnerability
- `affected` - Product is affected and needs attention
- `fixed` - Vulnerability has been fixed
- `under_investigation` - Status is being investigated

### Justifications (for not_affected status)

- `component_not_present` - Vulnerable component is not in the product
- `vulnerable_code_not_present` - Code is present but not the vulnerable code
- `vulnerable_code_not_in_execute_path` - Code exists but is not reachable
- `vulnerable_code_cannot_be_controlled_by_adversary` - Code exists but cannot be exploited
- `inline_mitigations_already_exist` - Mitigations are already in place

## 📖 Examples

See the `examples/` directory for complete usage examples:

- `basic-usage.ts` - Basic document creation and manipulation
- `advanced-usage.ts` - Advanced filtering and conversion
- `cli-examples.sh` - Command-line usage examples

## 🧪 Testing

```bash
npm test
```

## 🔗 Integration

VEX Tools can be integrated into your CI/CD pipeline:

```yaml
# .github/workflows/vex-validation.yml
name: Validate VEX Documents

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install -g @vexaware/vex-tools
      - run: vex-tools validate vex-documents/*.json
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [VEX Aware Website](https://vexaware.com)
- [OpenVEX Specification](https://openvex.dev)
- [GitHub Repository](https://github.com/Dragonwinner/Vexaware)

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@vexaware.com
- Documentation: https://vexaware.com/vex-tools
