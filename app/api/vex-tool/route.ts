import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route for VEX Tool operations
 * Provides REST endpoints to create, validate, and query VEX documents
 */

// Mock implementation for now - would integrate with actual vex-tool library
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'create':
        return createVexDocument(data);
      case 'validate':
        return validateVexDocument(data);
      case 'query':
        return queryVexDocument(data);
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

function createVexDocument(data: any) {
  const { cve, product, status, justification, impact, action } = data;

  const vexDoc = {
    '@context': 'https://openvex.dev/ns/v0.2.0',
    '@id': `https://example.com/vex/${new Date().getFullYear()}/${Date.now()}`,
    author: 'VEX Aware Tool',
    timestamp: new Date().toISOString(),
    version: 1,
    tooling: '@vexaware/vex-tool',
    statements: [
      {
        vulnerability: { name: cve },
        products: [{ '@id': product }],
        status,
        ...(justification && { justification }),
        ...(impact && { impact_statement: impact }),
        ...(action && { action_statement: action }),
      },
    ],
  };

  return NextResponse.json({ success: true, document: vexDoc });
}

function validateVexDocument(data: any) {
  const { document } = data;

  // Basic validation
  const errors = [];
  const warnings = [];

  if (!document.author) {
    errors.push({ field: 'author', message: 'Author is required' });
  }
  if (!document.timestamp) {
    errors.push({ field: 'timestamp', message: 'Timestamp is required' });
  }
  if (!document.statements || document.statements.length === 0) {
    warnings.push('Document contains no statements');
  }

  // Validate statements
  document.statements?.forEach((stmt: any, index: number) => {
    if (stmt.status === 'not_affected' && !stmt.justification) {
      errors.push({
        field: `statements[${index}].justification`,
        message: 'Justification is required when status is "not_affected"',
      });
    }
  });

  const valid = errors.length === 0;

  return NextResponse.json({
    success: true,
    validation: { valid, errors, warnings },
  });
}

function queryVexDocument(data: any) {
  const { document, cve } = data;

  const statements = document.statements?.filter(
    (stmt: any) => stmt.vulnerability.name === cve
  );

  if (statements && statements.length > 0) {
    const stmt = statements[0];
    return NextResponse.json({
      success: true,
      result: {
        found: true,
        statement: stmt,
        status: stmt.status,
        products: stmt.products,
      },
    });
  }

  return NextResponse.json({
    success: true,
    result: { found: false },
  });
}
