const fs = require('fs');
const path = require('path');

/**
 * Validate SEO implementation across the site
 */
function validateSEO() {
  console.log('🔍 Validating SEO Implementation...\n');
  
  let totalIssues = 0;
  const results = [];
  
  // Check if sitemap.xml exists
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    results.push(`✅ Sitemap exists with ${urlCount} URLs`);
  } else {
    results.push('❌ Sitemap.xml not found');
    totalIssues++;
  }
  
  // Check if robots.txt exists
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    if (robotsContent.includes('Sitemap:')) {
      results.push('✅ Robots.txt exists with sitemap reference');
    } else {
      results.push('⚠️  Robots.txt exists but no sitemap reference');
      totalIssues++;
    }
  } else {
    results.push('❌ Robots.txt not found');
    totalIssues++;
  }
  
  // Check key pages for metadata imports
  const pagesWithMetadata = [
    { path: 'app/page.tsx', name: 'Homepage' },
    { path: 'app/api-docs/page.tsx', name: 'API Docs' },
    { path: 'app/blog/page.tsx', name: 'Blog' },
    { path: 'app/faq/page.tsx', name: 'FAQ' },
    { path: 'app/resources/page.tsx', name: 'Resources' },
    { path: 'app/use-cases/page.tsx', name: 'Use Cases' }
  ];
  
  pagesWithMetadata.forEach(page => {
    const pagePath = path.join(process.cwd(), page.path);
    if (fs.existsSync(pagePath)) {
      const content = fs.readFileSync(pagePath, 'utf8');
      if (content.includes('metadata') && content.includes('lib/metadata')) {
        results.push(`✅ ${page.name} has SEO metadata`);
      } else {
        results.push(`⚠️  ${page.name} missing SEO metadata`);
        totalIssues++;
      }
    } else {
      results.push(`❌ ${page.name} file not found`);
      totalIssues++;
    }
  });
  
  // Check if SEO library exists
  const seoLibPath = path.join(process.cwd(), 'lib', 'seo.ts');
  if (fs.existsSync(seoLibPath)) {
    results.push('✅ SEO library exists');
  } else {
    results.push('❌ SEO library not found');
    totalIssues++;
  }
  
  // Check if metadata library exists
  const metadataLibPath = path.join(process.cwd(), 'lib', 'metadata.ts');
  if (fs.existsSync(metadataLibPath)) {
    results.push('✅ Metadata library exists');
  } else {
    results.push('❌ Metadata library not found');
    totalIssues++;
  }
  
  // Print results
  results.forEach(result => console.log(result));
  
  console.log('\n📊 SEO Validation Summary:');
  console.log(`✅ Checks passed: ${results.filter(r => r.startsWith('✅')).length}`);
  console.log(`⚠️  Warnings: ${results.filter(r => r.startsWith('⚠️')).length}`);
  console.log(`❌ Issues found: ${results.filter(r => r.startsWith('❌')).length}`);
  
  if (totalIssues === 0) {
    console.log('\n🎉 SEO validation completed successfully!');
    console.log('🚀 Your site is optimized for search engines');
  } else {
    console.log(`\n⚠️  Found ${totalIssues} issues that need attention`);
  }
  
  // SEO recommendations
  console.log('\n💡 SEO Recommendations:');
  console.log('   • Ensure all pages have unique, descriptive titles (50-60 chars)');
  console.log('   • Meta descriptions should be 150-160 characters');
  console.log('   • Include relevant keywords in page content');
  console.log('   • Add structured data (JSON-LD) for rich snippets');
  console.log('   • Optimize images with alt text and proper sizing');
  console.log('   • Submit sitemap to Google Search Console');
  console.log('   • Monitor Core Web Vitals for page performance');
}

// Run validation
validateSEO();