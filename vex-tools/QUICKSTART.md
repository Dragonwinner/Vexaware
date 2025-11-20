# VEX Tools Platform - Quick Start Guide

Get started with VEX Tools in 5 minutes!

## Installation

```bash
cd vex-tools
npm install
npm run build
```

## Quick Test

```bash
# Validate a VEX document
node cli/index.js validate templates/basic-vex-template.json

# Show statistics
node cli/index.js stats templates/advanced-vex-template.json

# Show summary
node cli/index.js summary templates/basic-vex-template.json
```

## Basic Usage

### 1. Create a VEX Document (JavaScript/Node.js)

```javascript
const { VexBuilder } = require('./lib/index.js');

const doc = new VexBuilder({ author: 'security@example.com' })
  .setTooling('VEX Aware', 'VEX Tools', '1.0.0')
  .createStatement()
    .cve('CVE-2024-1234', 'SQL injection vulnerability')
    .addProductByPurl('pkg:npm/my-app@1.0.0')
    .notAffected(
      'component_not_present',
      'The vulnerable component is not present.'
    )
    .done()
  .build();

console.log(JSON.stringify(doc, null, 2));
```

### 2. Validate a VEX Document

```javascript
const { VexParser } = require('./lib/index.js');
const fs = require('fs');

const content = fs.readFileSync('templates/basic-vex-template.json', 'utf8');
const doc = VexParser.parseJson(content);
const validation = VexParser.validate(doc);

console.log('Valid:', validation.valid);
console.log('Errors:', validation.errors.length);
```

### 3. Get Statistics

```javascript
const { VexUtils } = require('./lib/index.js');

const stats = VexUtils.getStats(doc);
console.log('Total statements:', stats.totalStatements);
console.log('Affected:', stats.statuses.affected);
console.log('Risk score:', VexUtils.calculateRiskScore(doc));
```

### 4. Export to Different Formats

```javascript
const { VexExporter } = require('./lib/index.js');

// Export to JSON
const json = VexExporter.toJson(doc, { pretty: true });
fs.writeFileSync('output.json', json);

// Export to YAML
const yaml = VexExporter.toYaml(doc);
fs.writeFileSync('output.yaml', yaml);
```

## Command Line Interface

### Validate

```bash
node cli/index.js validate my-document.json
node cli/index.js validate --strict my-document.yaml
```

### Convert

```bash
# JSON to YAML
node cli/index.js convert input.json output.yaml --format yaml

# YAML to JSON
node cli/index.js convert input.yaml output.json --format json
```

### Statistics

```bash
node cli/index.js stats my-document.json
```

Output:
```
VEX Document Statistics
========================
Total Statements: 5
Unique Vulnerabilities: 4
Unique Products: 3

Status Breakdown:
  Not Affected: 2
  Affected: 2
  Fixed: 1
  Under Investigation: 0
```

### Merge

```bash
node cli/index.js merge output.json doc1.json doc2.json doc3.json
```

### Filter

```bash
# Filter by status
node cli/index.js filter input.json output.json --status affected

# Filter by vulnerability
node cli/index.js filter input.json output.json --vulnerability "CVE-2024-.*"

# Filter by product
node cli/index.js filter input.json output.json --product "pkg:npm/express"
```

### Summary

```bash
node cli/index.js summary my-document.json
```

Output:
```
VEX Document Summary
====================
ID: https://example.com/vex/doc1
Author: security@example.com
Version: 1.0.0
Timestamp: 2024-01-15T10:00:00Z

Statements: 5
  - Not Affected: 2
  - Affected: 2
  - Fixed: 1
  - Under Investigation: 0

Vulnerabilities: 4 unique
Products: 3 unique
```

## Run Tests

```bash
# Run the API test script
node test-api.js
```

## Next Steps

1. Read the [full documentation](./README.md)
2. Check out [examples](./examples/)
3. Review [architecture](./docs/ARCHITECTURE.md)
4. Explore [templates](./templates/)

## Common Use Cases

### Use Case 1: Generate VEX for Your Project

```javascript
const { VexBuilder } = require('./lib/index.js');
const fs = require('fs');

const doc = new VexBuilder({ 
  author: 'security-team@yourcompany.com' 
})
  .setTooling('VEX Aware', 'VEX Tools', '1.0.0')
  .addMetadata('environment', 'production')
  .addMetadata('scan_date', new Date().toISOString())
  .createStatement()
    .cve('CVE-2024-1234')
    .addProductByPurl('pkg:npm/your-app@1.2.3')
    .notAffected('component_not_present')
    .done()
  .build();

fs.writeFileSync('vex-report.json', JSON.stringify(doc, null, 2));
console.log('VEX document generated: vex-report.json');
```

### Use Case 2: Validate Multiple Documents

```bash
# Validate all VEX documents in a directory
for file in vex-documents/*.json; do
  echo "Validating $file..."
  node cli/index.js validate "$file"
done
```

### Use Case 3: Generate Statistics Report

```javascript
const { VexParser, VexUtils, VexExporter } = require('./lib/index.js');
const fs = require('fs');

const files = ['doc1.json', 'doc2.json', 'doc3.json'];
const reports = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const doc = VexParser.parseJson(content);
  const stats = VexUtils.getStats(doc);
  
  reports.push({
    file,
    totalStatements: stats.totalStatements,
    affected: stats.statuses.affected,
    riskScore: VexUtils.calculateRiskScore(doc)
  });
});

console.log('Statistics Report:');
console.table(reports);
```

## Support

- Full documentation: [README.md](./README.md)
- Architecture guide: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- Examples: [examples/](./examples/)
- Issues: https://github.com/Dragonwinner/Vexaware/issues

## License

MIT License - See LICENSE file for details
