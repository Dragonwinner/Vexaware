# VEX Tools Platform - Architecture & Design

## Overview

The VEX Tools Platform is a comprehensive TypeScript/JavaScript library and CLI tool for managing VEX (Vulnerability Exploitability eXchange) documents. It provides a complete toolkit for creating, validating, converting, and analyzing VEX documents according to the OpenVEX specification.

## Architecture

### Core Components

```
vex-tools/
├── src/                    # TypeScript source code
│   ├── types.ts           # Type definitions and interfaces
│   ├── parser.ts          # Document parsing and validation
│   ├── builder.ts         # Fluent document builder API
│   ├── exporter.ts        # Format conversion and export
│   ├── converter.ts       # Document transformation utilities
│   ├── utils.ts           # Helper functions and analytics
│   └── index.ts           # Main entry point
├── cli/                   # Command-line interface
│   └── index.js           # CLI implementation
├── lib/                   # Compiled JavaScript (output)
├── templates/             # VEX document templates
├── examples/              # Usage examples
├── config/                # Configuration files
├── tests/                 # Unit tests
└── docs/                  # Documentation
```

### Module Design

#### 1. Types Module (`types.ts`)

Defines all TypeScript interfaces and types for VEX documents:

- `VexDocument`: Complete VEX document structure
- `VexStatement`: Individual vulnerability statement
- `VexVulnerability`: Vulnerability information
- `VexProduct`: Product identification
- `VexStatus`: Status enumeration
- `VexJustification`: Justification types
- `VexValidationResult`: Validation results

**Design Pattern**: Type-driven development with strict TypeScript types

#### 2. Parser Module (`parser.ts`)

Handles parsing and validation of VEX documents:

- **Input**: JSON or YAML string
- **Output**: Validated `VexDocument` object
- **Validation**: Schema validation with detailed error messages
- **Features**:
  - Strict and non-strict validation modes
  - Detailed error reporting with paths
  - Warning system for best practices

**Design Pattern**: Strategy pattern for different formats

#### 3. Builder Module (`builder.ts`)

Provides fluent API for creating VEX documents:

- **VexBuilder**: Main builder for documents
- **StatementBuilder**: Nested builder for statements
- **Features**:
  - Method chaining for readability
  - Type-safe API
  - Default values for optional fields
  - Validation on build

**Design Pattern**: Fluent Builder pattern with method chaining

#### 4. Exporter Module (`exporter.ts`)

Converts VEX documents to various formats:

- JSON (pretty or compact)
- YAML
- Summary text
- Statistics

**Design Pattern**: Strategy pattern for different export formats

#### 5. Converter Module (`converter.ts`)

Transforms and manipulates VEX documents:

- Merge multiple documents
- Filter by status, vulnerability, or product
- Split by status
- Update status
- Deduplicate statements

**Design Pattern**: Transformer pattern with immutable operations

#### 6. Utils Module (`utils.ts`)

Utility functions for analysis and manipulation:

- Statistics calculation
- Risk scoring
- Document comparison
- Age calculation
- Search and filter utilities

**Design Pattern**: Utility functions with pure operations

### Data Flow

```
Input (JSON/YAML)
    ↓
Parser (validate)
    ↓
VexDocument (in-memory)
    ↓
├─→ Builder (create/modify)
├─→ Converter (transform)
├─→ Utils (analyze)
    ↓
Exporter (output)
    ↓
Output (JSON/YAML/Summary)
```

## Design Principles

### 1. Immutability

All transformation operations return new objects rather than modifying existing ones:

```typescript
const filtered = VexConverter.filterByStatus(doc, 'affected');
// 'doc' remains unchanged, 'filtered' is a new object
```

### 2. Type Safety

Full TypeScript support with strict typing:

```typescript
interface VexDocument {
  '@context': string;
  '@id': string;
  // ... all fields typed
}
```

### 3. Fluent API

Method chaining for intuitive document creation:

```typescript
const doc = new VexBuilder({ author: 'me' })
  .createStatement()
    .cve('CVE-2024-1234')
    .addProductByPurl('pkg:npm/app@1.0.0')
    .notAffected('component_not_present')
    .done()
  .build();
```

### 4. Error Handling

Comprehensive error handling with meaningful messages:

```typescript
try {
  const doc = VexParser.parseJson(jsonString);
} catch (error) {
  // Clear error message with context
  console.error(error.message);
}
```

### 5. Extensibility

Easy to extend with new features:

- Add new export formats in `exporter.ts`
- Add new converters in `converter.ts`
- Add new utilities in `utils.ts`

## Integration Points

### As a Library

```typescript
import { VexBuilder, VexParser, VexExporter } from '@vexaware/vex-tools';
```

### As a CLI Tool

```bash
vex-tools validate document.json
vex-tools convert input.json output.yaml
```

### In CI/CD Pipeline

```yaml
- run: npm install -g @vexaware/vex-tools
- run: vex-tools validate vex/*.json
```

## Performance Considerations

### 1. Parsing

- JSON parsing uses native `JSON.parse()` for speed
- YAML parsing uses `js-yaml` library
- Validation is optional and can be disabled for performance

### 2. Memory

- Documents are kept in memory as JavaScript objects
- Large documents may require streaming (future enhancement)

### 3. File I/O

- CLI operations use synchronous file operations for simplicity
- Async operations available in library API

## Security Considerations

### 1. Input Validation

- All inputs are validated before processing
- Schema validation prevents malformed documents
- Type checking prevents injection attacks

### 2. File Operations

- CLI validates file paths to prevent directory traversal
- File permissions are checked before writing

### 3. Dependencies

- Minimal dependencies to reduce attack surface
- Regular dependency updates
- No runtime dependencies on untrusted sources

## Testing Strategy

### Unit Tests

```typescript
describe('VexParser', () => {
  it('should parse valid JSON', () => {
    const doc = VexParser.parseJson(validJson);
    expect(doc).toBeDefined();
  });
  
  it('should reject invalid JSON', () => {
    expect(() => VexParser.parseJson(invalidJson)).toThrow();
  });
});
```

### Integration Tests

- Test complete workflows (parse → transform → export)
- Test CLI commands
- Test file operations

### Test Coverage

- Target: 90%+ code coverage
- Focus on error paths and edge cases

## Future Enhancements

### Planned Features

1. **Streaming Support**: Handle large documents efficiently
2. **Schema Generation**: Generate JSON schemas from TypeScript types
3. **Database Integration**: Store VEX documents in databases
4. **API Client**: Interact with VEX servers/repositories
5. **Diff Tool**: Compare VEX documents and show changes
6. **Merge Strategies**: Configurable merge strategies
7. **Plugin System**: Allow custom validators and exporters

### API Extensions

1. **Async Operations**: Promise-based API for all operations
2. **Event Emitters**: Progress events for long operations
3. **Caching**: Cache parsed documents for performance
4. **Batch Operations**: Process multiple documents efficiently

## Version History

### v1.0.0 (Current)

- Initial release
- Core parsing, building, and exporting
- CLI tool with basic commands
- Documentation and examples

## Contributing

See CONTRIBUTING.md for guidelines on:

- Code style
- Testing requirements
- Documentation standards
- Pull request process

## References

- [OpenVEX Specification](https://openvex.dev)
- [CSAF Standard](https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html)
- [Package URL (PURL)](https://github.com/package-url/purl-spec)
- [Common Platform Enumeration (CPE)](https://nvd.nist.gov/products/cpe)
