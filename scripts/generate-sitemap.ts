import fs from 'fs';
import path from 'path';

const siteUrl = 'https://vexaware.com';

// Define all site URLs with their priorities and change frequencies
const siteUrls = [
  // Main pages (highest priority)
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/about/', changefreq: 'monthly', priority: '0.9' },
  { url: '/contact/', changefreq: 'monthly', priority: '0.8' },
  { url: '/faq/', changefreq: 'weekly', priority: '0.8' },
  
  // Legal pages (important for AdSense)
  { url: '/privacy/', changefreq: 'monthly', priority: '0.7' },
  { url: '/terms/', changefreq: 'monthly', priority: '0.7' },
  { url: '/disclaimer/', changefreq: 'monthly', priority: '0.6' },
  { url: '/cookies/', changefreq: 'monthly', priority: '0.6' },
  { url: '/sitemap/', changefreq: 'monthly', priority: '0.5' },
  
  // Main category pages
  { url: '/tutorials/', changefreq: 'weekly', priority: '0.9' },
  { url: '/api-docs/', changefreq: 'weekly', priority: '0.9' },
  { url: '/use-cases/', changefreq: 'weekly', priority: '0.8' },
  { url: '/resources/', changefreq: 'weekly', priority: '0.8' },
  { url: '/blog/', changefreq: 'daily', priority: '0.9' },
  
  // Tutorial categories
  { url: '/tutorials/getting-started/', changefreq: 'weekly', priority: '0.8' },
  { url: '/tutorials/technical-implementation/', changefreq: 'weekly', priority: '0.8' },
  { url: '/tutorials/advanced/', changefreq: 'weekly', priority: '0.8' },
  { url: '/tutorials/cloud-native/', changefreq: 'weekly', priority: '0.7' },
  { url: '/tutorials/compliance/', changefreq: 'weekly', priority: '0.7' },
  { url: '/tutorials/kubernetes-containers/', changefreq: 'weekly', priority: '0.7' },
  
  // API Documentation pages
  { url: '/api-docs/authentication/', changefreq: 'monthly', priority: '0.7' },
  { url: '/api-docs/projects/', changefreq: 'monthly', priority: '0.7' },
  { url: '/api-docs/vulnerabilities/', changefreq: 'monthly', priority: '0.7' },
  { url: '/api-docs/sbom/', changefreq: 'monthly', priority: '0.7' },
  { url: '/api-docs/vex-documents/', changefreq: 'monthly', priority: '0.7' },
  { url: '/api-docs/reports/', changefreq: 'monthly', priority: '0.6' },
  { url: '/api-docs/users/', changefreq: 'monthly', priority: '0.6' },
  { url: '/api-docs/webhooks/', changefreq: 'monthly', priority: '0.6' },
  { url: '/api-docs/integrations/', changefreq: 'monthly', priority: '0.6' },
  { url: '/api-docs/policies/', changefreq: 'monthly', priority: '0.6' },
  
  // Use Cases
  { url: '/use-cases/enterprise-software/', changefreq: 'monthly', priority: '0.7' },
  { url: '/use-cases/financial-services/', changefreq: 'monthly', priority: '0.7' },
  { url: '/use-cases/healthcare-provider/', changefreq: 'monthly', priority: '0.7' },
  { url: '/use-cases/ecommerce-platform/', changefreq: 'monthly', priority: '0.7' },
  { url: '/use-cases/government-agency/', changefreq: 'monthly', priority: '0.7' },
  { url: '/use-cases/saas-provider/', changefreq: 'monthly', priority: '0.7' },
  { url: '/use-cases/manufacturing/', changefreq: 'monthly', priority: '0.6' },
  { url: '/use-cases/education-sector/', changefreq: 'monthly', priority: '0.6' },
  { url: '/use-cases/telecommunications/', changefreq: 'monthly', priority: '0.6' },
  { url: '/use-cases/startup-success/', changefreq: 'monthly', priority: '0.6' },
  
  // Blog posts
  { url: '/blog/understanding-vex-standard/', changefreq: 'monthly', priority: '0.6' },
  { url: '/blog/sbom-integration-guide/', changefreq: 'monthly', priority: '0.6' },
  { url: '/blog/container-scanning-tools/', changefreq: 'monthly', priority: '0.6' },
  { url: '/blog/devsecops-culture/', changefreq: 'monthly', priority: '0.6' },
  { url: '/blog/false-positive-problem/', changefreq: 'monthly', priority: '0.6' },
  { url: '/blog/kubernetes-security-best-practices/', changefreq: 'monthly', priority: '0.6' },
  { url: '/blog/supply-chain-attacks-2024/', changefreq: 'monthly', priority: '0.6' },
  { url: '/blog/threat-intelligence-feeds/', changefreq: 'monthly', priority: '0.6' },
  { url: '/blog/zero-day-vulnerabilities/', changefreq: 'monthly', priority: '0.6' },
  { url: '/blog/compliance-automation/', changefreq: 'monthly', priority: '0.6' },
  
  // Resources
  { url: '/resources/browser-extensions/', changefreq: 'monthly', priority: '0.5' },
  { url: '/resources/cli-tools/', changefreq: 'monthly', priority: '0.5' },
  { url: '/resources/ide-plugins/', changefreq: 'monthly', priority: '0.5' },
  { url: '/resources/integration-scripts/', changefreq: 'monthly', priority: '0.5' },
  { url: '/resources/testing-tools/', changefreq: 'monthly', priority: '0.5' },
  { url: '/resources/migration-tools/', changefreq: 'monthly', priority: '0.5' },
  { url: '/resources/policy-templates/', changefreq: 'monthly', priority: '0.5' },
  { url: '/resources/sbom-samples/', changefreq: 'monthly', priority: '0.5' },
  { url: '/resources/vex-templates/', changefreq: 'monthly', priority: '0.5' },
  { url: '/resources/dashboards/', changefreq: 'monthly', priority: '0.5' },
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  sitemap += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
  sitemap += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
  
  siteUrls.forEach(({ url, changefreq, priority }) => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${siteUrl}${url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
    sitemap += `    <priority>${priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
}

function saveSitemap() {
  const sitemap = generateSitemap();
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  
  fs.writeFileSync(outputPath, sitemap, 'utf8');
  console.log(`✅ Sitemap generated successfully: ${outputPath}`);
  console.log(`📊 Total URLs: ${siteUrls.length}`);
  console.log(`🔗 Sitemap URL: ${siteUrl}/sitemap.xml`);
}

// Generate sitemap if script is run directly
saveSitemap();

export { generateSitemap, saveSitemap, siteUrls };