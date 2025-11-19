#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import chalk from 'chalk';
import { VexDocument } from './VexDocument';
import { VexValidator } from './validators/VexValidator';
import { VexGenerator } from './generators/VexGenerator';
import { VexQuery } from './utils/VexQuery';
import { VexStatus, VexJustification } from './types';

const program = new Command();

program
  .name('vex-tool')
  .description('VEX-aware tool for managing vulnerability exploitability exchange documents')
  .version('1.0.0');

// Create command
program
  .command('create')
  .description('Create a new VEX document')
  .requiredOption('--cve <cve>', 'CVE identifier (e.g., CVE-2024-1234)')
  .requiredOption('--product <product>', 'Product identifier in PURL format')
  .requiredOption('--status <status>', 'VEX status (not_affected, affected, fixed, under_investigation)')
  .option('--author <author>', 'Document author', 'Security Team')
  .option('--justification <justification>', 'Justification for not_affected status')
  .option('--impact <impact>', 'Impact statement')
  .option('--action <action>', 'Action statement')
  .option('-o, --output <file>', 'Output file', 'vex-document.json')
  .action((options) => {
    try {
      const generator = new VexGenerator({ author: options.author });
      const statement = generator.createStatement(
        options.cve,
        options.product,
        options.status as VexStatus,
        options.justification as VexJustification,
        options.impact,
        options.action
      );

      const doc = new VexDocument({
        author: options.author,
        timestamp: new Date().toISOString(),
        version: 1,
      });
      doc.addStatement(statement);

      doc.save(options.output);
      console.log(chalk.green(`✓ VEX document created: ${options.output}`));
    } catch (error) {
      console.error(chalk.red('Error creating VEX document:'), error);
      process.exit(1);
    }
  });

// Validate command
program
  .command('validate')
  .description('Validate a VEX document')
  .argument('<file>', 'VEX document file to validate')
  .option('--strict', 'Enable strict validation')
  .action((file, options) => {
    try {
      const doc = VexDocument.load(file);
      const validator = new VexValidator();
      const result = validator.validate(doc.toJSON());

      if (result.valid) {
        console.log(chalk.green('✓ VEX document is valid'));
      } else {
        console.log(chalk.red('✗ VEX document has errors:'));
        result.errors.forEach((err) => {
          console.log(chalk.red(`  - ${err.field}: ${err.message}`));
        });
      }

      if (result.warnings && result.warnings.length > 0) {
        console.log(chalk.yellow('\nWarnings:'));
        result.warnings.forEach((warning) => {
          console.log(chalk.yellow(`  - ${warning}`));
        });
      }

      process.exit(result.valid ? 0 : 1);
    } catch (error) {
      console.error(chalk.red('Error validating VEX document:'), error);
      process.exit(1);
    }
  });

// Query command
program
  .command('query')
  .description('Query vulnerability status from a VEX document')
  .argument('<file>', 'VEX document file')
  .argument('<cve>', 'CVE identifier to query')
  .action((file, cve) => {
    try {
      const doc = VexDocument.load(file);
      const query = new VexQuery(doc);
      const result = query.queryVulnerability(cve);

      if (result.found) {
        console.log(chalk.green(`Found ${cve}:`));
        console.log(`  Status: ${chalk.bold(result.status)}`);
        console.log(`  Products: ${result.products?.map((p) => p['@id']).join(', ')}`);
        if (result.statement?.justification) {
          console.log(`  Justification: ${result.statement.justification}`);
        }
        if (result.statement?.impact_statement) {
          console.log(`  Impact: ${result.statement.impact_statement}`);
        }
        if (result.statement?.action_statement) {
          console.log(`  Action: ${result.statement.action_statement}`);
        }
      } else {
        console.log(chalk.yellow(`${cve} not found in VEX document`));
      }
    } catch (error) {
      console.error(chalk.red('Error querying VEX document:'), error);
      process.exit(1);
    }
  });

// Stats command
program
  .command('stats')
  .description('Display statistics for a VEX document')
  .argument('<file>', 'VEX document file')
  .action((file) => {
    try {
      const doc = VexDocument.load(file);
      const stats = doc.getStats();
      const query = new VexQuery(doc);
      const summary = query.getSummary();

      console.log(chalk.bold('\nVEX Document Statistics:'));
      console.log(`  Total Statements: ${stats.totalStatements}`);
      console.log(`  Unique Vulnerabilities: ${stats.uniqueVulnerabilities}`);
      console.log(`  Unique Products: ${stats.uniqueProducts}`);
      console.log(chalk.bold('\nBy Status:'));
      console.log(chalk.green(`  Not Affected: ${stats.byStatus.not_affected}`));
      console.log(chalk.red(`  Affected: ${stats.byStatus.affected}`));
      console.log(chalk.blue(`  Fixed: ${stats.byStatus.fixed}`));
      console.log(chalk.yellow(`  Under Investigation: ${stats.byStatus.under_investigation}`));
      console.log(chalk.bold(`\nRisk Score: ${summary.riskScore}/100`));
    } catch (error) {
      console.error(chalk.red('Error reading VEX document:'), error);
      process.exit(1);
    }
  });

// Generate template command
program
  .command('template')
  .description('Generate a template VEX document')
  .option('--author <author>', 'Document author', 'Security Team')
  .option('--examples', 'Include example statements', true)
  .option('-o, --output <file>', 'Output file', 'vex-template.json')
  .action((options) => {
    try {
      const generator = new VexGenerator({ author: options.author });
      const doc = generator.generateTemplate(options.examples);
      doc.save(options.output);
      console.log(chalk.green(`✓ Template created: ${options.output}`));
    } catch (error) {
      console.error(chalk.red('Error creating template:'), error);
      process.exit(1);
    }
  });

// Merge command
program
  .command('merge')
  .description('Merge multiple VEX documents')
  .argument('<files...>', 'VEX document files to merge')
  .option('-o, --output <file>', 'Output file', 'merged-vex.json')
  .action((files, options) => {
    try {
      const documents = files.map((file: string) => VexDocument.load(file));
      const merged = VexGenerator.mergeDocuments(documents);
      merged.save(options.output);
      console.log(chalk.green(`✓ Merged ${files.length} documents into: ${options.output}`));
    } catch (error) {
      console.error(chalk.red('Error merging documents:'), error);
      process.exit(1);
    }
  });

// Convert command
program
  .command('convert')
  .description('Convert VEX document between formats')
  .argument('<input>', 'Input file')
  .requiredOption('-o, --output <file>', 'Output file')
  .action((input, options) => {
    try {
      const doc = VexDocument.load(input);
      doc.save(options.output);
      console.log(chalk.green(`✓ Converted ${input} to ${options.output}`));
    } catch (error) {
      console.error(chalk.red('Error converting document:'), error);
      process.exit(1);
    }
  });

// Generate from SBOM command
program
  .command('generate-from-sbom')
  .description('Generate VEX document from SBOM')
  .argument('<sbom>', 'SBOM file (JSON)')
  .option('--author <author>', 'Document author', 'Security Team')
  .option('-o, --output <file>', 'Output file', 'vex-from-sbom.json')
  .action((sbom, options) => {
    try {
      const sbomContent = JSON.parse(fs.readFileSync(sbom, 'utf-8'));
      
      // Extract components from SBOM (supports CycloneDX format)
      let components = [];
      if (sbomContent.components) {
        components = sbomContent.components;
      } else if (sbomContent.packages) {
        // SPDX format
        components = sbomContent.packages;
      }

      const generator = new VexGenerator({ author: options.author });
      const doc = generator.generateFromSBOM(components);
      doc.save(options.output);
      
      console.log(chalk.green(`✓ Generated VEX document from SBOM: ${options.output}`));
      console.log(`  Processed ${components.length} components`);
    } catch (error) {
      console.error(chalk.red('Error generating from SBOM:'), error);
      process.exit(1);
    }
  });

program.parse();
