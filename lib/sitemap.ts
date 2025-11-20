import { SitemapEntry } from './seo.js';

/**
 * Generate comprehensive sitemap data for all pages
 */
export function generateSitemapData(): SitemapEntry[] {
  const baseUrl = 'https://vexaware.com';
  
  const staticPages: SitemapEntry[] = [
    // Main pages
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/api-docs`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/use-cases`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];

  // API Documentation pages
  const apiPages: SitemapEntry[] = [
    'authentication',
    'integrations',
    'policies',
    'projects',
    'reports',
    'sbom',
    'users',
    'vex-documents',
    'vulnerabilities',
    'webhooks'
  ].map(page => ({
    url: `${baseUrl}/api-docs/${page}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  // Blog pages
  const blogPages: SitemapEntry[] = [
    'compliance-automation',
    'container-scanning-tools',
    'devsecops-culture',
    'false-positive-problem',
    'kubernetes-security-best-practices',
    'sbom-integration-guide',
    'supply-chain-attacks-2024',
    'threat-intelligence-feeds',
    'understanding-vex-standard',
    'zero-day-vulnerabilities'
  ].map(page => ({
    url: `${baseUrl}/blog/${page}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  // Resource pages
  const resourcePages: SitemapEntry[] = [
    'browser-extensions',
    'cli-tools',
    'dashboards',
    'ide-plugins',
    'integration-scripts',
    'migration-tools',
    'policy-templates',
    'sbom-samples',
    'testing-tools',
    'vex-templates'
  ].map(page => ({
    url: `${baseUrl}/resources/${page}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }));

  // Tutorial pages
  const tutorialPages: SitemapEntry[] = [
    // Getting started
    'getting-started',
    // Advanced tutorials
    'advanced',
    'advanced/advanced-analytics',
    'advanced/automation-orchestration',
    'advanced/bug-bounty',
    'advanced/cost-optimization',
    'advanced/custom-cve-database',
    // Cloud native
    'cloud-native',
    // Compliance
    'compliance',
    // Kubernetes containers
    'kubernetes-containers',
    // Technical implementation
    'technical-implementation'
  ].map(page => ({
    url: `${baseUrl}/tutorials/${page}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }));

  // Use case pages
  const useCasePages: SitemapEntry[] = [
    'ecommerce-platform',
    'education-sector',
    'enterprise-software',
    'financial-services',
    'government-agency',
    'healthcare-provider',
    'manufacturing',
    'saas-provider',
    'startup-success',
    'telecommunications'
  ].map(page => ({
    url: `${baseUrl}/use-cases/${page}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  return [
    ...staticPages,
    ...apiPages,
    ...blogPages,
    ...resourcePages,
    ...tutorialPages,
    ...useCasePages
  ].sort((a, b) => b.priority - a.priority);
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXML(): string {
  const entries = generateSitemapData();
  
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlsetClose = '</urlset>';
  
  const urls = entries.map(entry => {
    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n');
  
  return xmlHeader + urlsetOpen + urls + '\n' + urlsetClose;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  const baseUrl = 'https://vexaware.com';
  
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
Sitemap: ${baseUrl}/sitemap.xml
`;
}