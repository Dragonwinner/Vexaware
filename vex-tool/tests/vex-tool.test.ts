import { VexDocument } from '../src/VexDocument';
import { VexValidator } from '../src/validators/VexValidator';

describe('VexDocument', () => {
  test('should create a new VEX document', () => {
    const doc = new VexDocument({
      author: 'Test Team',
      timestamp: '2025-01-15T10:00:00Z',
      version: 1,
    });

    expect(doc).toBeDefined();
    expect(doc.getStatements()).toHaveLength(0);
  });

  test('should add a statement to the document', () => {
    const doc = new VexDocument({
      author: 'Test Team',
      timestamp: '2025-01-15T10:00:00Z',
      version: 1,
    });

    doc.addStatement({
      vulnerability: { name: 'CVE-2024-1234' },
      products: [{ '@id': 'pkg:npm/test@1.0.0' }],
      status: 'not_affected',
      justification: 'vulnerable_code_not_in_execute_path',
    });

    expect(doc.getStatements()).toHaveLength(1);
  });

  test('should find statements by CVE', () => {
    const doc = new VexDocument({
      author: 'Test Team',
      timestamp: '2025-01-15T10:00:00Z',
      version: 1,
    });

    doc.addStatement({
      vulnerability: { name: 'CVE-2024-1234' },
      products: [{ '@id': 'pkg:npm/test@1.0.0' }],
      status: 'not_affected',
      justification: 'vulnerable_code_not_in_execute_path',
    });

    const statements = doc.findByCVE('CVE-2024-1234');
    expect(statements).toHaveLength(1);
    expect(statements[0].vulnerability.name).toBe('CVE-2024-1234');
  });

  test('should convert to JSON', () => {
    const doc = new VexDocument({
      author: 'Test Team',
      timestamp: '2025-01-15T10:00:00Z',
      version: 1,
    });

    const json = doc.toJSON();
    expect(json.author).toBe('Test Team');
    expect(json.version).toBe(1);
    expect(json.statements).toEqual([]);
  });

  test('should get statistics', () => {
    const doc = new VexDocument({
      author: 'Test Team',
      timestamp: '2025-01-15T10:00:00Z',
      version: 1,
    });

    doc.addStatement({
      vulnerability: { name: 'CVE-2024-1234' },
      products: [{ '@id': 'pkg:npm/test@1.0.0' }],
      status: 'not_affected',
      justification: 'vulnerable_code_not_in_execute_path',
    });

    doc.addStatement({
      vulnerability: { name: 'CVE-2024-5678' },
      products: [{ '@id': 'pkg:npm/test@1.0.0' }],
      status: 'affected',
    });

    const stats = doc.getStats();
    expect(stats.totalStatements).toBe(2);
    expect(stats.byStatus.not_affected).toBe(1);
    expect(stats.byStatus.affected).toBe(1);
  });
});

describe('VexValidator', () => {
  test('should validate a valid VEX document', () => {
    const validator = new VexValidator();
    const doc = {
      author: 'Test Team',
      timestamp: '2025-01-15T10:00:00Z',
      version: 1,
      statements: [
        {
          vulnerability: { name: 'CVE-2024-1234' },
          products: [{ '@id': 'pkg:npm/test@1.0.0' }],
          status: 'not_affected' as const,
          justification: 'vulnerable_code_not_in_execute_path' as const,
        },
      ],
    };

    const result = validator.validate(doc);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('should detect missing justification for not_affected status', () => {
    const validator = new VexValidator();
    const doc = {
      author: 'Test Team',
      timestamp: '2025-01-15T10:00:00Z',
      version: 1,
      statements: [
        {
          vulnerability: { name: 'CVE-2024-1234' },
          products: [{ '@id': 'pkg:npm/test@1.0.0' }],
          status: 'not_affected' as const,
        },
      ],
    };

    const result = validator.validate(doc);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('should validate required fields', () => {
    const validator = new VexValidator();
    const doc = {
      author: 'Test Team',
      timestamp: '2025-01-15T10:00:00Z',
      version: 1,
      statements: [],
    };

    const result = validator.validate(doc);
    expect(result.valid).toBe(true);
    expect(result.warnings).toBeDefined();
  });
});
