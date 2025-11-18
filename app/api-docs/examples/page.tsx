import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "API Integration Examples - VEX Aware Tutorial",
  description: "Learn how to integrate with the VEX Aware REST API. Complete examples for fetching tutorials, blog posts, and resources.",
  keywords: ["API", "REST", "integration", "examples", "tutorial"],
};

export default function APIExamplesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "API Docs", url: "/api-docs" },
            { name: "Integration Examples", url: "/api-docs/examples" },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            API Integration Examples
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Learn how to integrate with the VEX Aware REST API using practical examples
          </p>

          {/* JavaScript/TypeScript Examples */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              JavaScript / TypeScript Examples
            </h2>

            {/* Fetch all tutorials */}
            <div className="mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Fetch All Tutorials
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get a list of all published tutorials from the database.
              </p>
              <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <code className="text-sm text-gray-800 dark:text-gray-200">{`// Using fetch API
async function getAllTutorials() {
  const response = await fetch('/api/tutorials');
  const data = await response.json();
  
  if (data.success) {
    console.log(\`Found \${data.count} tutorials\`);
    return data.data;
  } else {
    throw new Error(data.error);
  }
}

// Usage
const tutorials = await getAllTutorials();
tutorials.forEach(tutorial => {
  console.log(tutorial.title, tutorial.category);
});`}</code>
              </pre>
            </div>

            {/* Fetch tutorials by category */}
            <div className="mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Filter Tutorials by Category
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get tutorials filtered by specific category.
              </p>
              <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <code className="text-sm text-gray-800 dark:text-gray-200">{`// Fetch only "getting-started" tutorials
async function getTutorialsByCategory(category) {
  const response = await fetch(\`/api/tutorials?category=\${category}\`);
  const data = await response.json();
  return data.data;
}

// Usage
const beginnerTutorials = await getTutorialsByCategory('getting-started');
console.log(\`Beginner tutorials: \${beginnerTutorials.length}\`);`}</code>
              </pre>
            </div>

            {/* Fetch single tutorial */}
            <div className="mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Get Single Tutorial by Slug
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Fetch detailed information about a specific tutorial.
              </p>
              <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <code className="text-sm text-gray-800 dark:text-gray-200">{`async function getTutorial(slug) {
  const response = await fetch(\`/api/tutorials/\${slug}\`);
  const data = await response.json();
  
  if (data.success) {
    return data.data;
  } else {
    throw new Error('Tutorial not found');
  }
}

// Usage
const tutorial = await getTutorial('what-is-vex-and-why-it-matters');
console.log(tutorial.title);
console.log(tutorial.content);
console.log(tutorial.difficulty);`}</code>
              </pre>
            </div>

            {/* Create new tutorial */}
            <div className="mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Create New Tutorial
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Add a new tutorial to the database via POST request.
              </p>
              <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <code className="text-sm text-gray-800 dark:text-gray-200">{`async function createTutorial(tutorialData) {
  const response = await fetch('/api/tutorials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tutorialData),
  });
  
  const data = await response.json();
  return data.data;
}

// Usage
const newTutorial = await createTutorial({
  title: 'Advanced VEX Techniques',
  slug: 'advanced-vex-techniques',
  category: 'advanced',
  description: 'Learn advanced VEX document creation',
  content: '# Advanced VEX Techniques\\n\\nContent here...',
  difficulty: 'Advanced',
  duration: '30 min',
  tags: ['advanced', 'vex'],
  keywords: ['VEX', 'advanced', 'techniques'],
  published: true,
});

console.log('Created:', newTutorial.title);`}</code>
              </pre>
            </div>
          </section>

          {/* React Component Example */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              React Component Example
            </h2>
            
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Tutorial List Component
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A complete React component that fetches and displays tutorials.
              </p>
              <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <code className="text-sm text-gray-800 dark:text-gray-200">{`'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TutorialList({ category }) {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTutorials() {
      try {
        const url = category 
          ? \`/api/tutorials?category=\${category}\`
          : '/api/tutorials';
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
          setTutorials(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch tutorials');
      } finally {
        setLoading(false);
      }
    }

    fetchTutorials();
  }, [category]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 
                       border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading tutorials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border 
                     border-red-200 dark:border-red-800 
                     rounded-lg p-4 text-red-600 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutorials.map((tutorial) => (
        <Link
          key={tutorial._id}
          href={\`/tutorials/\${tutorial.category}/\${tutorial.slug}\`}
          className="block p-6 border border-gray-200 dark:border-gray-800 
                   rounded-lg hover:shadow-lg hover:border-blue-500 
                   dark:hover:border-blue-400 transition-all 
                   bg-white dark:bg-gray-900"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-blue-600 
                           dark:text-blue-400 bg-blue-100 
                           dark:bg-blue-900/30 px-3 py-1 rounded-full">
              {tutorial.difficulty}
            </span>
            <span className="text-sm text-gray-500">
              ⏱ {tutorial.duration}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {tutorial.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
            {tutorial.description}
          </p>
          <div className="mt-4 text-blue-600 dark:text-blue-400 
                       text-sm font-semibold">
            Read Tutorial →
          </div>
        </Link>
      ))}
    </div>
  );
}`}</code>
              </pre>
            </div>
          </section>

          {/* cURL Examples */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              cURL Examples
            </h2>

            <div className="mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Testing API with cURL
              </h3>
              <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <code className="text-sm text-gray-800 dark:text-gray-200">{`# Get all tutorials
curl http://localhost:3000/api/tutorials

# Get tutorials by category
curl http://localhost:3000/api/tutorials?category=getting-started

# Get single tutorial
curl http://localhost:3000/api/tutorials/what-is-vex-and-why-it-matters

# Create new tutorial
curl -X POST http://localhost:3000/api/tutorials \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "New Tutorial",
    "slug": "new-tutorial",
    "category": "getting-started",
    "description": "Description here",
    "content": "Content here",
    "difficulty": "Beginner",
    "duration": "10 min",
    "tags": ["tutorial"],
    "keywords": ["keyword"]
  }'

# Update tutorial
curl -X PUT http://localhost:3000/api/tutorials/new-tutorial \\
  -H "Content-Type": application/json" \\
  -d '{"duration": "15 min"}'

# Delete tutorial
curl -X DELETE http://localhost:3000/api/tutorials/new-tutorial`}</code>
              </pre>
            </div>
          </section>

          {/* Error Handling */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Error Handling
            </h2>

            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All API responses follow a consistent format:
              </p>
              <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-200 dark:border-gray-800">
                <code className="text-sm text-gray-800 dark:text-gray-200">{`// Success Response
{
  "success": true,
  "count": 10,  // for list endpoints
  "data": {...} // or [...]
}

// Error Response
{
  "success": false,
  "error": "Error message here"
}`}</code>
              </pre>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
                Best Practice Error Handling
              </h3>
              <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <code className="text-sm text-gray-800 dark:text-gray-200">{`async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    if (!data.success) {
      throw new Error(data.error || 'Unknown error');
    }
    
    return data.data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

// Usage with error handling
try {
  const tutorial = await safeFetch('/api/tutorials/some-slug');
  console.log('Success:', tutorial);
} catch (error) {
  console.error('Failed to fetch tutorial:', error.message);
}`}</code>
              </pre>
            </div>
          </section>

          {/* Related Resources */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">📚</span>
              Related Resources
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-2">→</span>
                <Link href="/api-docs" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  Complete API Documentation
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-2">→</span>
                <Link href="/api-docs/authentication" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  API Authentication Guide
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-2">→</span>
                <Link href="/tutorials/technical-implementation/api-integration" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  API Integration Tutorial
                </Link>
              </li>
              <li className="flex items-center">
                <span className="text-blue-600 dark:text-blue-400 mr-2">→</span>
                <a href="https://github.com/Dragonwinner/Vexaware" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold" target="_blank" rel="noopener noreferrer">
                  View Source Code on GitHub
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
