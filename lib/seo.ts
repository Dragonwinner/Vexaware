export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  robots?: string;
  twitterCard?: string;
  priority?: number;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

// SEO Configuration Constants
export const SEO_CONSTANTS = {
  SITE_NAME: 'VEX Aware',
  SITE_URL: 'https://vexaware.com',
  DEFAULT_IMAGE: '/images/vex-aware-og-image.jpg',
  DEFAULT_TWITTER_HANDLE: '@vexaware',
  DEFAULT_AUTHOR: 'VEX Aware Team',
  ORGANIZATION_NAME: 'VEX Aware',
  ORGANIZATION_URL: 'https://vexaware.com',
  LOGO_URL: 'https://vexaware.com/images/logo.png',
  CONTACT_EMAIL: 'support@vexaware.com',
  SOCIAL_PROFILES: [
    'https://twitter.com/vexaware',
    'https://github.com/vexaware',
    'https://linkedin.com/company/vexaware'
  ]
};

// Comprehensive keyword categories
export const KEYWORD_SETS = {
  CORE: [
    'VEX', 'vulnerability management', 'security compliance', 'SBOM', 'DevSecOps',
    'vulnerability assessment', 'security automation', 'threat intelligence',
    'vulnerability exploitability', 'VEX documents', 'security posture'
  ],
  TECHNICAL: [
    'container security', 'Kubernetes security', 'cloud security', 'API security',
    'CI/CD security', 'infrastructure security', 'application security',
    'Docker security', 'microservices security', 'serverless security'
  ],
  COMPLIANCE: [
    'SOC 2', 'PCI DSS', 'HIPAA', 'ISO 27001', 'GDPR', 'compliance automation',
    'security audit', 'risk assessment', 'governance', 'regulatory compliance',
    'third-party risk', 'security controls'
  ],
  INDUSTRY: [
    'enterprise security', 'fintech security', 'healthcare security',
    'e-commerce security', 'SaaS security', 'government security',
    'financial services security', 'manufacturing security'
  ],
  TOOLS: [
    'security scanner', 'vulnerability scanner', 'SAST', 'DAST', 'IAST',
    'penetration testing', 'security testing', 'code analysis',
    'dependency scanning', 'license compliance'
  ]
};

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateMetadata(config: SEOConfig) {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      type: config.ogType || "website",
      url: config.canonical,
      images: config.ogImage ? [{ url: config.ogImage }] : undefined,
      publishedTime: config.publishedTime,
      modifiedTime: config.modifiedTime,
      authors: config.authors,
      section: config.section,
      tags: config.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : undefined,
    },
  };
}

export function generateArticleSchema(config: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
  imageUrl?: string;
  skillLevel?: "Beginner" | "Intermediate" | "Advanced";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: config.headline,
    description: config.description,
    author: {
      "@type": "Organization",
      name: config.authorName,
    },
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    url: config.url,
    image: config.imageUrl,
    articleSection: "Cybersecurity",
    skillLevel: config.skillLevel || "Beginner",
  };
}

export function generateHowToSchema(config: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; url?: string }>;
  totalTime?: string;
  estimatedCost?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: config.name,
    description: config.description,
    totalTime: config.totalTime,
    estimatedCost: config.estimatedCost,
    step: config.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  };
}

export function generateFAQSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate comprehensive keywords for a page
 */
export function generateKeywords(...categories: (keyof typeof KEYWORD_SETS)[]): string[] {
  const keywords = new Set<string>();
  
  categories.forEach(category => {
    if (KEYWORD_SETS[category]) {
      KEYWORD_SETS[category].forEach(keyword => keywords.add(keyword));
    }
  });
  
  return Array.from(keywords);
}

/**
 * Generate optimized page title
 */
export function optimizePageTitle(title: string, includeBrand: boolean = true): string {
  const maxLength = 60;
  let optimizedTitle = title;
  
  if (includeBrand && !title.includes(SEO_CONSTANTS.SITE_NAME)) {
    optimizedTitle = `${title} | ${SEO_CONSTANTS.SITE_NAME}`;
  }
  
  if (optimizedTitle.length > maxLength) {
    const withoutBrand = title.substring(0, maxLength - SEO_CONSTANTS.SITE_NAME.length - 3);
    optimizedTitle = `${withoutBrand}... | ${SEO_CONSTANTS.SITE_NAME}`;
  }
  
  return optimizedTitle;
}

/**
 * Generate optimized meta description
 */
export function optimizeMetaDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) {
    return description;
  }
  
  const truncated = description.substring(0, maxLength - 3);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

/**
 * Generate organization structured data
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SEO_CONSTANTS.ORGANIZATION_NAME,
    "url": SEO_CONSTANTS.ORGANIZATION_URL,
    "logo": SEO_CONSTANTS.LOGO_URL,
    "contactPoint": {
      "@type": "ContactPoint",
      "email": SEO_CONSTANTS.CONTACT_EMAIL,
      "contactType": "customer service"
    },
    "sameAs": SEO_CONSTANTS.SOCIAL_PROFILES
  };
}

/**
 * Generate website structured data
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SEO_CONSTANTS.SITE_NAME,
    "url": SEO_CONSTANTS.SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SEO_CONSTANTS.SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate software application structured data
 */
export function generateSoftwareSchema(config: {
  name: string;
  description: string;
  category?: string;
  features?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": config.name,
    "description": config.description,
    "applicationCategory": config.category || "SecurityApplication",
    "operatingSystem": "Web, Windows, macOS, Linux",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "@priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": config.features,
    "publisher": {
      "@type": "Organization",
      "name": SEO_CONSTANTS.ORGANIZATION_NAME
    }
  };
}

/**
 * Create sitemap entry
 */
export function createSitemapEntry(
  url: string,
  changeFreq: SitemapEntry['changeFrequency'] = 'weekly',
  priority: number = 0.8,
  lastModified?: string
): SitemapEntry {
  return {
    url: url.startsWith('http') ? url : `${SEO_CONSTANTS.SITE_URL}${url}`,
    lastModified: lastModified || new Date().toISOString().split('T')[0],
    changeFrequency: changeFreq,
    priority
  };
}
