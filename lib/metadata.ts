import { Metadata } from 'next';
import { 
  optimizePageTitle, 
  optimizeMetaDescription, 
  generateKeywords,
  SEO_CONSTANTS 
} from './seo';

/**
 * Generate comprehensive metadata for pages
 */
export function generatePageMetadata(config: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
}): Metadata {
  const optimizedTitle = optimizePageTitle(config.title);
  const optimizedDescription = optimizeMetaDescription(config.description);
  const canonicalUrl = config.path ? `${SEO_CONSTANTS.SITE_URL}${config.path}` : SEO_CONSTANTS.SITE_URL;
  
  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: config.keywords?.join(', '),
    
    // Open Graph
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: canonicalUrl,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [
        {
          url: config.image || SEO_CONSTANTS.DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: optimizedTitle,
        },
      ],
      locale: 'en_US',
      type: config.type || 'website',
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
      ...(config.authors && { authors: config.authors }),
      ...(config.section && { section: config.section }),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: optimizedTitle,
      description: optimizedDescription,
      images: [config.image || SEO_CONSTANTS.DEFAULT_IMAGE],
      creator: SEO_CONSTANTS.TWITTER_HANDLE,
      site: SEO_CONSTANTS.TWITTER_HANDLE,
    },
    
    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Canonical URL
    alternates: {
      canonical: canonicalUrl,
    },
    
    // Other metadata
    category: 'Cybersecurity',
    classification: 'Business',
  };
}

/**
 * Home page metadata
 */
export const homeMetadata = generatePageMetadata({
  title: 'Advanced VEX Document Management & Vulnerability Intelligence Platform',
  description: 'Transform your cybersecurity posture with VEX Aware - the comprehensive platform for VEX document management, vulnerability analysis, SBOM integration, and automated security workflows.',
  keywords: generateKeywords('CORE', 'TECHNICAL', 'TOOLS'),
  path: '/',
  image: `${SEO_CONSTANTS.SITE_URL}/images/vex-aware-hero.png`
});

/**
 * API Documentation metadata
 */
export const apiDocsMetadata = generatePageMetadata({
  title: 'VEX Aware API Documentation - Complete Developer Guide',
  description: 'Comprehensive API documentation for VEX Aware platform. Integrate vulnerability management, SBOM processing, and security automation into your applications.',
  keywords: generateKeywords('TECHNICAL', 'TOOLS'),
  path: '/api-docs',
  type: 'article',
  section: 'Documentation'
});

/**
 * Blog metadata
 */
export const blogMetadata = generatePageMetadata({
  title: 'Cybersecurity Blog - VEX Documents, SBOM & Vulnerability Intelligence',
  description: 'Expert insights on VEX documents, SBOM integration, vulnerability management, DevSecOps, and cybersecurity best practices from industry professionals.',
  keywords: generateKeywords('CORE', 'COMPLIANCE', 'INDUSTRY'),
  path: '/blog',
  type: 'website',
  section: 'Blog'
});

/**
 * FAQ metadata
 */
export const faqMetadata = generatePageMetadata({
  title: 'Frequently Asked Questions - VEX Aware Platform Guide',
  description: 'Get answers to common questions about VEX documents, vulnerability management, SBOM integration, API usage, and platform features.',
  keywords: generateKeywords('CORE', 'TECHNICAL'),
  path: '/faq',
  section: 'Support'
});

/**
 * Resources metadata
 */
export const resourcesMetadata = generatePageMetadata({
  title: 'Developer Resources - Tools, Templates & Integration Guides',
  description: 'Free tools, templates, and resources for vulnerability management, VEX document creation, SBOM analysis, and security automation.',
  keywords: generateKeywords('TOOLS', 'TECHNICAL'),
  path: '/resources',
  section: 'Resources'
});

/**
 * Tutorials metadata
 */
export const tutorialsMetadata = generatePageMetadata({
  title: 'VEX Aware Tutorials - Learn Security Best Practices',
  description: 'Step-by-step tutorials for vulnerability management, VEX document creation, SBOM integration, compliance automation, and advanced security workflows.',
  keywords: generateKeywords('CORE', 'TECHNICAL', 'COMPLIANCE'),
  path: '/tutorials',
  type: 'website',
  section: 'Education'
});

/**
 * Use Cases metadata
 */
export const useCasesMetadata = generatePageMetadata({
  title: 'Industry Use Cases - VEX Aware Success Stories & Applications',
  description: 'Discover how organizations across industries use VEX Aware for vulnerability management, compliance, and security automation in real-world scenarios.',
  keywords: generateKeywords('INDUSTRY', 'COMPLIANCE'),
  path: '/use-cases',
  section: 'Case Studies'
});

/**
 * Generate metadata for blog posts
 */
export function generateBlogPostMetadata(config: {
  title: string;
  description: string;
  slug: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
}): Metadata {
  return generatePageMetadata({
    title: config.title,
    description: config.description,
    keywords: generateKeywords('CORE', 'TECHNICAL', 'COMPLIANCE'),
    path: `/blog/${config.slug}`,
    type: 'article',
    publishedTime: config.publishedTime,
    modifiedTime: config.modifiedTime,
    authors: config.author ? [config.author] : undefined,
    section: 'Blog',
    image: `${SEO_CONSTANTS.SITE_URL}/images/blog/${config.slug}-hero.png`
  });
}

/**
 * Generate metadata for tutorial pages
 */
export function generateTutorialMetadata(config: {
  title: string;
  description: string;
  slug: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
}): Metadata {
  return generatePageMetadata({
    title: `${config.title} - ${config.difficulty ? config.difficulty.charAt(0).toUpperCase() + config.difficulty.slice(1) : 'Tutorial'}`,
    description: config.description,
    keywords: generateKeywords('CORE', 'TECHNICAL'),
    path: `/tutorials/${config.slug}`,
    type: 'article',
    section: 'Tutorial',
    image: `${SEO_CONSTANTS.SITE_URL}/images/tutorials/${config.slug}-hero.png`
  });
}

/**
 * Generate metadata for use case pages
 */
export function generateUseCaseMetadata(config: {
  title: string;
  description: string;
  slug: string;
  industry: string;
}): Metadata {
  return generatePageMetadata({
    title: `${config.title} - ${config.industry} Use Case`,
    description: config.description,
    keywords: generateKeywords('INDUSTRY', 'COMPLIANCE'),
    path: `/use-cases/${config.slug}`,
    type: 'article',
    section: 'Use Case',
    image: `${SEO_CONSTANTS.SITE_URL}/images/use-cases/${config.slug}-hero.png`
  });
}