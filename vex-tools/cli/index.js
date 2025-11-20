#!/usr/bin/env node

/**
 * VEX Tools CLI
 * Command-line interface for VEX document management
 */

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Import VEX tools (will be available after build)
let VexTools, VexParser, VexBuilder, VexExporter, VexConverter, VexUtils;
try {
  const tools = require('../lib/index.js');
  VexTools = tools.VexTools;
  VexParser = tools.VexParser;
  VexBuilder = tools.VexBuilder;
  VexExporter = tools.VexExporter;
  VexConverter = tools.VexConverter;
  VexUtils = tools.VexUtils;
} catch (error) {
  console.error(chalk.red('Error: VEX Tools library not built. Run "npm run build" first.'));
  process.exit(1);
}

const program = new Command();

program
  .name('vex-tools')
  .description('VEX Aware Tool Platform - Comprehensive VEX document management')
  .version('1.0.0');

// Validate command
program
  .command('validate <file>')
  .description('Validate a VEX document')
  .option('-s, --strict', 'Enable strict validation')
  .action((file, options) => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const doc = file.endsWith('.yaml') || file.endsWith('.yml')
        ? VexParser.parseYaml(content)
        : VexParser.parseJson(content);
      
      const result = VexParser.validate(doc, options.strict);
      
      if (result.valid) {
        console.log(chalk.green('✓ VEX document is valid'));
      } else {
        console.log(chalk.red('✗ VEX document has errors:'));
        result.errors.forEach(error => {
          console.log(chalk.red(`  - ${error.path}: ${error.message}`));
        });
      }
      
      if (result.warnings.length > 0) {
        console.log(chalk.yellow('\nWarnings:'));
        result.warnings.forEach(warning => {
          console.log(chalk.yellow(`  - ${warning.path}: ${warning.message}`));
        });
      }
      
      process.exit(result.valid ? 0 : 1);
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// Convert command
program
  .command('convert <input> <output>')
  .description('Convert VEX document between formats')
  .option('-f, --format <format>', 'Output format (json|yaml)', 'json')
  .action((input, output, options) => {
    try {
      const content = fs.readFileSync(input, 'utf8');
      const doc = input.endsWith('.yaml') || input.endsWith('.yml')
        ? VexParser.parseYaml(content)
        : VexParser.parseJson(content);
      
      const converted = VexExporter.export(doc, { format: options.format, pretty: true });
      fs.writeFileSync(output, converted, 'utf8');
      
      console.log(chalk.green(`✓ Converted ${input} to ${output}`));
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// Stats command
program
  .command('stats <file>')
  .description('Show statistics for a VEX document')
  .action((file) => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const doc = file.endsWith('.yaml') || file.endsWith('.yml')
        ? VexParser.parseYaml(content)
        : VexParser.parseJson(content);
      
      const stats = VexUtils.getStats(doc);
      
      console.log(chalk.cyan('\nVEX Document Statistics'));
      console.log(chalk.cyan('========================'));
      console.log(`Total Statements: ${chalk.bold(stats.totalStatements)}`);
      console.log(`Unique Vulnerabilities: ${chalk.bold(stats.uniqueVulnerabilities)}`);
      console.log(`Unique Products: ${chalk.bold(stats.uniqueProducts)}`);
      console.log('\nStatus Breakdown:');
      console.log(`  ${chalk.green('Not Affected')}: ${stats.statuses.not_affected}`);
      console.log(`  ${chalk.red('Affected')}: ${stats.statuses.affected}`);
      console.log(`  ${chalk.blue('Fixed')}: ${stats.statuses.fixed}`);
      console.log(`  ${chalk.yellow('Under Investigation')}: ${stats.statuses.under_investigation}`);
      console.log('\nDetails:');
      console.log(`  With Justification: ${stats.withJustification}`);
      console.log(`  With Action Statement: ${stats.withActionStatement}`);
      console.log(`  With Impact Statement: ${stats.withImpactStatement}`);
      console.log('');
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// Merge command
program
  .command('merge <output> <files...>')
  .description('Merge multiple VEX documents')
  .action((output, files) => {
    try {
      const docs = files.map(file => {
        const content = fs.readFileSync(file, 'utf8');
        return file.endsWith('.yaml') || file.endsWith('.yml')
          ? VexParser.parseYaml(content)
          : VexParser.parseJson(content);
      });
      
      const merged = VexConverter.merge(...docs);
      const result = VexExporter.toJson(merged, { pretty: true });
      fs.writeFileSync(output, result, 'utf8');
      
      console.log(chalk.green(`✓ Merged ${files.length} documents into ${output}`));
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// Filter command
program
  .command('filter <input> <output>')
  .description('Filter VEX document')
  .option('-s, --status <status>', 'Filter by status (not_affected|affected|fixed|under_investigation)')
  .option('-v, --vulnerability <pattern>', 'Filter by vulnerability name pattern')
  .option('-p, --product <id>', 'Filter by product ID')
  .action((input, output, options) => {
    try {
      const content = fs.readFileSync(input, 'utf8');
      const doc = input.endsWith('.yaml') || input.endsWith('.yml')
        ? VexParser.parseYaml(content)
        : VexParser.parseJson(content);
      
      let filtered = doc;
      
      if (options.status) {
        filtered = VexConverter.filterByStatus(filtered, options.status);
      }
      
      if (options.vulnerability) {
        filtered = VexConverter.filterByVulnerability(filtered, options.vulnerability);
      }
      
      if (options.product) {
        filtered = VexConverter.filterByProduct(filtered, options.product);
      }
      
      const result = VexExporter.toJson(filtered, { pretty: true });
      fs.writeFileSync(output, result, 'utf8');
      
      console.log(chalk.green(`✓ Filtered document saved to ${output}`));
      console.log(chalk.gray(`  Original statements: ${doc.statements.length}`));
      console.log(chalk.gray(`  Filtered statements: ${filtered.statements.length}`));
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

// Summary command
program
  .command('summary <file>')
  .description('Show a summary of the VEX document')
  .action((file) => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const doc = file.endsWith('.yaml') || file.endsWith('.yml')
        ? VexParser.parseYaml(content)
        : VexParser.parseJson(content);
      
      const summary = VexExporter.toSummary(doc);
      console.log(summary);
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();
