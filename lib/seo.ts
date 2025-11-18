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
