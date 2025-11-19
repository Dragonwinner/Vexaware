# VEX Tool

A comprehensive VEX-aware tool for creating, validating, and managing VEX (Vulnerability Exploitability eXchange) documents.

## Features

- ✅ **Create VEX Documents**: Generate VEX documents from vulnerability data
- ✅ **Validate VEX Documents**: Validate against OpenVEX and CSAF VEX standards
- ✅ **Query VEX Status**: Look up vulnerability status from VEX documents
- ✅ **SBOM Integration**: Extract vulnerabilities from SBOM documents
- ✅ **Multiple Formats**: Support for JSON, YAML, and XML
- ✅ **CLI & Library**: Use as command-line tool or programmatic library
- ✅ **CVE Lookup**: Enrich VEX documents with CVE data
- ✅ **Merge Documents**: Combine multiple VEX documents

## Installation

```bash
cd vex-tool
npm install
npm run build
```

## Quick Start

### Command Line Usage

```bash
# Create a new VEX document
./dist/cli.js create --cve CVE-2024-1234 --product "pkg:npm/example@1.0.0" --status not_affected

# Validate a VEX document
./dist/cli.js validate document.json

# Query vulnerability status
./dist/cli.js query document.json CVE-2024-1234

# Generate from SBOM
./dist/cli.js generate-from-sbom sbom.json --output vex-output.json
```

### Programmatic Usage

```typescript
import { VexDocument, VexValidator, VexGenerator } from '@vexaware/vex-tool';

// Create a VEX document
const doc = new VexDocument({
  author: 'Security Team',
  timestamp: new Date().toISOString(),
  version: 1
});

doc.addStatement({
  vulnerability: { name: 'CVE-2024-1234' },
  products: [{ '@id': 'pkg:npm/example@1.0.0' }],
  status: 'not_affected',
  justification: 'vulnerable_code_not_in_execute_path'
});

// Validate
const validator = new VexValidator();
const isValid = validator.validate(doc.toJSON());

// Save
doc.save('my-vex-document.json');
```

## VEX Document Structure

VEX documents follow the OpenVEX standard:

```json
{
  "@context": "https://openvex.dev/ns/v0.2.0",
  "@id": "https://example.com/vex/2025/001",
  "author": "Security Team",
  "timestamp": "2025-01-15T10:00:00Z",
  "version": 1,
  "statements": [
    {
      "vulnerability": {
        "name": "CVE-2024-1234"
      },
      "products": [
        {
          "@id": "pkg:npm/example-package@1.2.3"
        }
      ],
      "status": "not_affected",
      "justification": "vulnerable_code_not_in_execute_path",
      "impact_statement": "The vulnerable code path is not used in our application."
    }
  ]
}
```

## VEX Status Values

- `not_affected`: Product not affected by the vulnerability
- `affected`: Product is affected and needs remediation
- `fixed`: Vulnerability has been fixed
- `under_investigation`: Status is being investigated

## Justifications

When status is `not_affected`:
- `component_not_present`: Vulnerable component is not included
- `vulnerable_code_not_present`: Vulnerable code is not present
- `vulnerable_code_not_in_execute_path`: Code exists but is not executed
- `vulnerable_code_cannot_be_controlled_by_adversary`: Code cannot be exploited
- `inline_mitigations_already_exist`: Mitigations are in place

## License

MIT
