#!/usr/bin/env node

/**
 * Database Seed Script
 * 
 * This script populates the MongoDB database with tutorial content
 * from the existing static pages.
 * 
 * Usage: node scripts/seed-database.js
 */

const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vexaware';

// Sample tutorial data (extract from existing pages)
const tutorials = [
  {
    title: "What is VEX and Why It Matters",
    slug: "what-is-vex-and-why-it-matters",
    category: "getting-started",
    description: "Learn about VEX (Vulnerability Exploitability eXchange) and understand why it's revolutionizing vulnerability management in modern DevSecOps.",
    content: `# What is VEX and Why It Matters

## Introduction

In today's software development landscape, security vulnerabilities are discovered at an unprecedented rate. Traditional vulnerability scanners flag thousands of potential issues, overwhelming security teams with alerts. **85% of these alerts are false positives** - vulnerabilities that exist in code but aren't actually exploitable in the production environment.

This is where **VEX (Vulnerability Exploitability eXchange)** comes in.

## What is VEX?

VEX is a machine-readable security advisory format that allows software vendors and developers to communicate the **exploitability status** of vulnerabilities in their products. Instead of just saying "this CVE exists in your software," VEX provides context about whether the vulnerability is actually exploitable in your specific use case.

## The Problem VEX Solves

Traditional vulnerability scanning has a fundamental problem: it reports every CVE found in dependencies without considering whether the vulnerable code path is actually used. This leads to:

- **Alert Fatigue**: Security teams spend 80% of their time investigating false positives
- **Wasted Resources**: Engineering time spent on non-exploitable vulnerabilities
- **Compliance Overhead**: Unnecessary reports and documentation
- **Delayed Deployments**: Production releases blocked by irrelevant CVEs

## How VEX Works

VEX documents contain statements about vulnerabilities with four possible statuses:

1. **not_affected**: The vulnerability exists but is not exploitable
2. **affected**: The vulnerability is exploitable and requires action
3. **fixed**: The vulnerability has been remediated
4. **under_investigation**: Analysis is ongoing

Each status includes justification and impact statements to provide context.`,
    difficulty: "Beginner",
    duration: "15 min",
    readingTime: 15,
    tags: ["VEX", "security", "fundamentals", "introduction"],
    keywords: ["VEX", "Vulnerability Exploitability eXchange", "SBOM", "vulnerability management"],
    published: true,
    featured: true,
    order: 1,
    metaTitle: "What is VEX and Why It Matters - VEX Aware Tutorial",
    metaDescription: "Learn about VEX (Vulnerability Exploitability eXchange) and understand why it's revolutionizing vulnerability management in modern DevSecOps.",
  },
  {
    title: "Understanding the Vulnerability Management Crisis",
    slug: "vulnerability-management-crisis",
    category: "getting-started",
    description: "Learn about the challenges of traditional vulnerability scanning and why 85% of alerts are false positives",
    content: `# Understanding the Vulnerability Management Crisis

## The Scale of the Problem

Modern software applications depend on hundreds or thousands of open-source libraries and dependencies. Each dependency can have multiple vulnerabilities, leading to an overwhelming number of security alerts.

**Key Statistics:**
- 85% of vulnerability alerts are false positives
- Security teams spend 80% of their time investigating non-exploitable issues
- Average time to remediate: 200+ days
- Average cost per false positive: $1,500+

## Why Traditional Scanning Fails

Traditional vulnerability scanners operate on a simple principle: if a CVE exists anywhere in your dependency tree, report it. This approach has several critical flaws:

### 1. No Context Awareness
Scanners don't understand if the vulnerable code path is actually used in your application.

### 2. Dependency Depth Confusion
A vulnerability in a transitive dependency (dependency of a dependency) may not be relevant if the vulnerable function is never called.

### 3. Version Matching Issues
Scanners match versions without considering patches, backports, or vendor-specific fixes.

## The Real-World Impact

The false positive crisis has serious consequences:

- **Developer Burnout**: Constant alerts that turn out to be non-issues
- **Compliance Theater**: Time spent documenting why vulnerabilities don't apply
- **Missed Real Threats**: Critical vulnerabilities buried in noise
- **Delayed Releases**: Production deployments blocked by irrelevant CVEs`,
    difficulty: "Beginner",
    duration: "12 min",
    readingTime: 12,
    tags: ["vulnerability management", "false positives", "security challenges"],
    keywords: ["vulnerability scanning", "false positives", "security alerts", "alert fatigue"],
    published: true,
    featured: true,
    order: 2,
  },
  {
    title: "Introduction to VEX Aware Platform",
    slug: "introduction-to-vex-aware",
    category: "getting-started",
    description: "Get an overview of VEX Aware's features, architecture, and how it solves vulnerability management challenges",
    content: `# Introduction to VEX Aware Platform

## What is VEX Aware?

VEX Aware is a comprehensive vulnerability management platform that automates the generation and management of VEX documents. It helps organizations cut through the noise of vulnerability scanning by providing accurate, context-aware security intelligence.

## Core Features

### 1. Automated VEX Generation
- Automatically analyzes your codebase and dependencies
- Determines exploitability of detected vulnerabilities
- Generates machine-readable VEX documents

### 2. Multi-Vendor Aggregation
- Integrates with multiple vulnerability scanners
- Consolidates data from different sources
- Provides unified vulnerability view

### 3. SBOM Integration
- Works seamlessly with Software Bill of Materials
- Supports CycloneDX and SPDX formats
- Tracks dependencies across projects

### 4. Intelligent Analysis Engine
- Machine learning-based exploitability detection
- Code path analysis
- Runtime behavior monitoring

### 5. Compliance Automation
- Automated compliance reporting
- SOC 2, PCI DSS, HIPAA support
- Audit trail management

## Platform Architecture

VEX Aware is built on a modern, scalable architecture with five key layers:

1. **Data Ingestion Layer**: Collects vulnerability data from scanners and SBOMs
2. **Analysis Engine**: Determines exploitability using ML and static analysis
3. **VEX Generation**: Creates standardized VEX documents
4. **API Layer**: RESTful API for integration
5. **User Interface**: Web dashboard for visualization and management`,
    difficulty: "Beginner",
    duration: "20 min",
    readingTime: 20,
    tags: ["VEX Aware", "platform overview", "features", "architecture"],
    keywords: ["VEX Aware platform", "vulnerability management", "automation", "features"],
    published: true,
    featured: true,
    order: 3,
  }
];

const blogPosts = [
  {
    title: "Understanding the VEX Standard",
    slug: "understanding-vex-standard",
    description: "Deep dive into the VEX specification and its role in modern vulnerability management",
    content: "Content for VEX standard blog post...",
    author: "VEX Aware Team",
    tags: ["VEX", "standards", "specification"],
    keywords: ["VEX standard", "CSAF", "OpenVEX"],
    published: true,
    featured: true,
    readingTime: 10,
  },
  {
    title: "The False Positive Problem in Vulnerability Management",
    slug: "false-positive-problem",
    description: "Why 85% of vulnerability alerts are false positives and what we can do about it",
    content: "Content for false positive problem blog post...",
    author: "VEX Aware Team",
    tags: ["vulnerability management", "false positives", "security"],
    keywords: ["false positives", "vulnerability scanning", "alert fatigue"],
    published: true,
    featured: true,
    readingTime: 12,
  }
];

const useCases = [
  {
    title: "Enterprise Software Company Reduces Alert Fatigue by 85%",
    slug: "enterprise-software",
    industry: "Software",
    description: "How a Fortune 500 software company eliminated false positives",
    content: "Full use case content...",
    challenge: "Managing 10,000+ vulnerability alerts monthly with 85% false positive rate",
    solution: "Implemented VEX Aware automated analysis and VEX document generation",
    results: [
      { metric: "False Positive Reduction", value: "85%" },
      { metric: "Time Saved", value: "200 hours/month" },
      { metric: "Compliance Cost", value: "60% reduction" },
      { metric: "MTTM (Mean Time to Mitigate)", value: "40 days to 8 days" }
    ],
    tags: ["enterprise", "software", "case study"],
    published: true,
    featured: true,
  },
  {
    title: "Healthcare Provider Achieves HIPAA Compliance",
    slug: "healthcare-provider",
    industry: "Healthcare",
    description: "Healthcare organization streamlines compliance with VEX Aware",
    content: "Full use case content...",
    challenge: "Meeting HIPAA security requirements while managing rapid development",
    solution: "Automated vulnerability assessment and compliance reporting",
    results: [
      { metric: "Compliance Time", value: "75% reduction" },
      { metric: "Audit Preparation", value: "2 weeks to 2 days" },
      { metric: "Documentation", value: "Fully automated" },
      { metric: "Risk Score", value: "Improved by 60%" }
    ],
    tags: ["healthcare", "HIPAA", "compliance"],
    published: true,
    featured: true,
  }
];

const resources = [
  {
    title: "VEX Document Template",
    slug: "vex-templates",
    category: "templates",
    description: "Ready-to-use VEX document templates for common scenarios",
    content: "Template content and examples...",
    resourceType: "Template",
    tags: ["VEX", "templates", "documentation"],
    published: true,
    featured: true,
  },
  {
    title: "SBOM Samples",
    slug: "sbom-samples",
    category: "samples",
    description: "Sample SBOM files in CycloneDX and SPDX formats",
    content: "Sample SBOM files and documentation...",
    resourceType: "Sample",
    tags: ["SBOM", "CycloneDX", "SPDX"],
    published: true,
    featured: true,
  }
];

// Define schemas inline for seeding
const tutorialSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  category: String,
  subcategory: String,
  description: String,
  content: String,
  difficulty: String,
  duration: String,
  readingTime: Number,
  author: { type: String, default: 'VEX Aware Team' },
  tags: [String],
  keywords: [String],
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true });

const blogPostSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  content: String,
  author: String,
  tags: [String],
  keywords: [String],
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  readingTime: Number,
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true });

const useCaseSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  industry: String,
  description: String,
  content: String,
  challenge: String,
  solution: String,
  results: [{
    metric: String,
    value: String
  }],
  tags: [String],
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true });

const resourceSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  category: String,
  description: String,
  content: String,
  resourceType: String,
  downloadUrl: String,
  tags: [String],
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true });

// Seed function
async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Get or create models
    const Tutorial = mongoose.models.Tutorial || mongoose.model('Tutorial', tutorialSchema);
    const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
    const UseCase = mongoose.models.UseCase || mongoose.model('UseCase', useCaseSchema);
    const Resource = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);

    // Clear existing data
    console.log('\nClearing existing data...');
    await Tutorial.deleteMany({});
    await BlogPost.deleteMany({});
    await UseCase.deleteMany({});
    await Resource.deleteMany({});
    console.log('Existing data cleared');

    // Insert tutorials
    console.log('\nInserting tutorials...');
    const insertedTutorials = await Tutorial.insertMany(tutorials);
    console.log(`✓ Inserted ${insertedTutorials.length} tutorials`);

    // Insert blog posts
    console.log('Inserting blog posts...');
    const insertedBlogPosts = await BlogPost.insertMany(blogPosts);
    console.log(`✓ Inserted ${insertedBlogPosts.length} blog posts`);

    // Insert use cases
    console.log('Inserting use cases...');
    const insertedUseCases = await UseCase.insertMany(useCases);
    console.log(`✓ Inserted ${insertedUseCases.length} use cases`);

    // Insert resources
    console.log('Inserting resources...');
    const insertedResources = await Resource.insertMany(resources);
    console.log(`✓ Inserted ${insertedResources.length} resources`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nSummary:');
    console.log(`  - Tutorials: ${insertedTutorials.length}`);
    console.log(`  - Blog Posts: ${insertedBlogPosts.length}`);
    console.log(`  - Use Cases: ${insertedUseCases.length}`);
    console.log(`  - Resources: ${insertedResources.length}`);
    console.log(`  - Total: ${insertedTutorials.length + insertedBlogPosts.length + insertedUseCases.length + insertedResources.length} documents\n`);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run seed function
seedDatabase();
