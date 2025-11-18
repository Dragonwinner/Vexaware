import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vexaware.com';
  const currentDate = new Date();

  // Tutorial categories
  const categories = [
    'getting-started',
    'technical-implementation', 
    'kubernetes-containers',
    'cloud-native',
    'compliance',
    'advanced'
  ];

  // Main routes
  const mainRoutes = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/tutorials/getting-started`, priority: 0.9 },
    { url: `${baseUrl}/api-docs`, priority: 0.8 },
    { url: `${baseUrl}/use-cases`, priority: 0.7 },
    { url: `${baseUrl}/resources`, priority: 0.7 },
    { url: `${baseUrl}/blog`, priority: 0.7 },
    { url: `${baseUrl}/faq`, priority: 0.7 },
  ];

  // Tutorial category pages
  const categoryRoutes = categories.map(cat => ({
    url: `${baseUrl}/tutorials/${cat}`,
    priority: 0.8,
  }));

  const routes = [...mainRoutes, ...categoryRoutes].map(route => ({
    url: route.url,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: route.priority,
  }));

  return routes;
}
