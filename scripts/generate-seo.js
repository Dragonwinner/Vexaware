const fs = require('fs');
const path = require('path');

// Generate sitemap data
function generateSitemapData() {
  const baseUrl = 'https://vexaware.com';
  
  const staticPages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'daily' },
    { url: baseUrl + '/api-docs', priority: 0.9, changeFrequency: 'weekly' },
    { url: baseUrl + '/blog', priority: 0.9, changeFrequency: 'daily' },
    { url: baseUrl + '/faq', priority: 0.8, changeFrequency: 'monthly' },
    { url: baseUrl + '/resources', priority: 0.8, changeFrequency: 'weekly' },
    { url: baseUrl + '/tutorials', priority: 0.9, changeFrequency: 'weekly' },
    { url: baseUrl + '/use-cases', priority: 0.8, changeFrequency: 'monthly' }
  ];

  const apiPages = [
    'authentication', 'integrations', 'policies', 'projects', 'reports', 
    'sbom', 'users', 'vex-documents', 'vulnerabilities', 'webhooks'
  ].map(page => ({
    url: baseUrl + '/api-docs/' + page,
    priority: 0.7,
    changeFrequency: 'weekly'
  }));

  const blogPages = [
    'compliance-automation', 'container-scanning-tools', 'devsecops-culture',
    'false-positive-problem', 'kubernetes-security-best-practices',
    'sbom-integration-guide', 'supply-chain-attacks-2024',
    'threat-intelligence-feeds', 'understanding-vex-standard', 'zero-day-vulnerabilities'
  ].map(page => ({
    url: baseUrl + '/blog/' + page,
    priority: 0.6,
    changeFrequency: 'monthly'
  }));

  const resourcePages = [
    'browser-extensions', 'cli-tools', 'dashboards', 'ide-plugins',
    'integration-scripts', 'migration-tools', 'policy-templates',
    'sbom-samples', 'testing-tools', 'vex-templates'
  ].map(page => ({
    url: baseUrl + '/resources/' + page,
    priority: 0.6,
    changeFrequency: 'weekly'
  }));

  const tutorialPages = [
    'getting-started', 'advanced', 'advanced/advanced-analytics',
    'advanced/automation-orchestration', 'advanced/bug-bounty',
    'advanced/cost-optimization', 'advanced/custom-cve-database',
    'cloud-native', 'compliance', 'kubernetes-containers', 'technical-implementation'
  ].map(page => ({
    url: baseUrl + '/tutorials/' + page,
    priority: 0.7,
    changeFrequency: 'weekly'
  }));

  const useCasePages = [
    'ecommerce-platform', 'education-sector', 'enterprise-software',
    'financial-services', 'government-agency', 'healthcare-provider',
    'manufacturing', 'saas-provider', 'startup-success', 'telecommunications'
  ].map(page => ({
    url: baseUrl + '/use-cases/' + page,
    priority: 0.6,
    changeFrequency: 'monthly'
  }));

  return [...staticPages, ...apiPages, ...blogPages, ...resourcePages, ...tutorialPages, ...useCasePages];
}

// Generate XML sitemap
function generateSitemapXML() {
  const entries = generateSitemapData();
  const today = new Date().toISOString().split('T')[0];
  
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>';
  
  const urls = entries.map(entry => {
    return '  <url>\n' +
           '    <loc>' + entry.url + '</loc>\n' +
           '    <lastmod>' + today + '</lastmod>\n' +
           '    <changefreq>' + entry.changeFrequency + '</changefreq>\n' +
           '    <priority>' + entry.priority.toFixed(1) + '</priority>\n' +
           '  </url>';
  }).join('\n');
  
  return xmlHeader + urlsetOpen + urls + '\n' + urlsetClose;
}

// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Block admin areas
Disallow: /admin/
Disallow: /server/
Disallow: /*.json$
Disallow: /api/

# Allow important resources
Allow: /assets/
Allow: /images/
Allow: /css/
Allow: /js/

# Crawl delay
Crawl-delay: 1

# Sitemap location
Sitemap: https://vexaware.com/sitemap.xml
`;
}

// Create files
try {
  const sitemapContent = generateSitemapXML();
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('✅ Generated sitemap.xml with', generateSitemapData().length, 'URLs');
  
  const robotsContent = generateRobotsTxt();
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log('✅ Updated robots.txt');
  
  console.log('\n🎉 SEO files generated successfully!');
  console.log('📍 Files created:');
  console.log('   -', sitemapPath);
  console.log('   -', robotsPath);
  
} catch (error) {
  console.error('❌ Error:', error.message);
}