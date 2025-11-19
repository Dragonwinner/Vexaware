/**
 * VEX Tool - A comprehensive VEX-aware library and CLI tool
 * 
 * This module provides functionality for creating, validating, and managing
 * VEX (Vulnerability Exploitability eXchange) documents.
 */

// Main classes
export { VexDocument } from './VexDocument';
export { VexValidator } from './validators/VexValidator';
export { VexGenerator } from './generators/VexGenerator';
export { VexQuery } from './utils/VexQuery';

// Types
export * from './types';

// Version
export const VERSION = '1.0.0';
