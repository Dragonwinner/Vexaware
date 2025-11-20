import React from 'react';
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema, 
  generateSoftwareSchema,
  generateBreadcrumbSchema 
} from '../lib/seo';

interface StructuredDataProps {
  type?: 'website' | 'organization' | 'software' | 'article' | 'breadcrumb';
  data?: any;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function StructuredData({ type = 'website', data, breadcrumbs }: StructuredDataProps) {
  let schema = {};
  
  switch (type) {
    case 'organization':
      schema = generateOrganizationSchema();
      break;
    case 'website':
      schema = generateWebsiteSchema();
      break;
    case 'software':
      schema = generateSoftwareSchema(data || {
        name: 'VEX Aware Platform',
        description: 'Advanced vulnerability intelligence and VEX document management platform',
        category: 'SecurityApplication',
        features: [
          'VEX Document Generation',
          'Vulnerability Analysis',
          'SBOM Integration',
          'Compliance Automation',
          'Security Reporting'
        ]
      });
      break;
    case 'article':
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        ...data
      };
      break;
    case 'breadcrumb':
      schema = generateBreadcrumbSchema(breadcrumbs || []);
      break;
    default:
      schema = generateWebsiteSchema();
  }
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

/**
 * Multiple structured data component for complex pages
 */
export function MultipleStructuredData({ schemas }: { schemas: any[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script 
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
        />
      ))}
    </>
  );
}

/**
 * FAQ Page structured data
 */
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

/**
 * How-to structured data for tutorials
 */
export function HowToStructuredData({ 
  name, 
  description, 
  steps, 
  totalTime,
  difficulty 
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; image?: string }>;
  totalTime?: string;
  difficulty?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime,
    "difficulty": difficulty,
    "supply": [
      "VEX Aware account",
      "API access",
      "Basic security knowledge"
    ],
    "tool": [
      "VEX Aware Platform",
      "API Documentation",
      "Code examples"
    ],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    }))
  };
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

/**
 * Blog post structured data
 */
export function BlogPostStructuredData({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url
}: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "image": image,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "VEX Aware",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vexaware.com/images/logo.png"
      }
    }
  };
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}