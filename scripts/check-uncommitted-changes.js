#!/usr/bin/env node

/**
 * Script to check for uncommitted git changes
 * Exits with code 1 if there are uncommitted changes
 * Exits with code 0 if working tree is clean
 */

const { execSync } = require('child_process');

try {
  // Check if we're in a git repository
  execSync('git rev-parse --git-dir', { stdio: 'ignore' });
} catch (error) {
  console.log('⚠️  Not a git repository. Skipping uncommitted changes check.');
  process.exit(0);
}

try {
  // Get git status in porcelain format for easy parsing
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  
  if (status.trim().length > 0) {
    console.error('❌ Uncommitted changes detected:');
    console.error('');
    console.error(status);
    console.error('');
    console.error('Please commit or stash your changes before proceeding.');
    console.error('');
    console.error('To commit changes:');
    console.error('  git add .');
    console.error('  git commit -m "Your commit message"');
    console.error('');
    console.error('To stash changes:');
    console.error('  git stash');
    console.error('');
    
    // Exit with error code to fail the build
    process.exit(1);
  }
  
  console.log('✅ No uncommitted changes detected. Proceeding...');
  process.exit(0);
  
} catch (error) {
  console.error('Error checking git status:', error.message);
  // Don't fail the build if git command fails
  console.log('⚠️  Could not check git status. Proceeding anyway...');
  process.exit(0);
}
