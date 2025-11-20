import { generateSitemapXML, generateRobotsTxt } from '../lib/sitemap.js';
import fs from 'fs';
import path from 'path';

/**
 * Generate sitemap.xml and robots.txt files
 */
async function generateSEOFiles() {
  try {
    // Generate sitemap.xml
    const sitemapContent = generateSitemapXML();
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log('✅ Generated sitemap.xml');
    
    // Generate robots.txt
    const robotsContent = generateRobotsTxt();
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    console.log('✅ Updated robots.txt');
    
    console.log('\n🎉 SEO files generated successfully!');
    console.log(`📍 Files created:`);
    console.log(`   - ${sitemapPath}`);
    console.log(`   - ${robotsPath}`);
    
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
}

// Run the generator
generateSEOFiles();