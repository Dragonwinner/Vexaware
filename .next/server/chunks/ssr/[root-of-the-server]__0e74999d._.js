module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},70864,a=>{a.n(a.i(33290))},43619,a=>{a.n(a.i(79962))},13718,a=>{a.n(a.i(85523))},18198,a=>{a.n(a.i(45518))},62212,a=>{a.n(a.i(66114))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},790,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js <module evaluation>"))},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";a.i(790);var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},50222,a=>{"use strict";var b=a.i(7997),c=a.i(95936);function d({items:a}){return(0,b.jsx)("nav",{"aria-label":"Breadcrumb",className:"mb-4",children:(0,b.jsxs)("ol",{className:"flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400",children:[(0,b.jsx)("li",{children:(0,b.jsx)(c.default,{href:"/",className:"hover:text-blue-600 dark:hover:text-blue-400",children:"Home"})}),a.map((d,e)=>(0,b.jsxs)("li",{className:"flex items-center space-x-2",children:[(0,b.jsx)("span",{children:"/"}),e===a.length-1?(0,b.jsx)("span",{className:"text-gray-900 dark:text-white font-medium",children:d.name}):(0,b.jsx)(c.default,{href:d.url,className:"hover:text-blue-600 dark:hover:text-blue-400",children:d.name})]},e))]})})}a.s(["default",()=>d])},96353,a=>{"use strict";var b=a.i(7997),c=a.i(95936),d=a.i(50222);function e(){return(0,b.jsx)("div",{className:"min-h-screen bg-white dark:bg-gray-950",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,b.jsx)(d.default,{items:[{name:"API Docs",url:"/api-docs"},{name:"Integration Examples",url:"/api-docs/examples"}]}),(0,b.jsxs)("div",{className:"mt-8",children:[(0,b.jsx)("h1",{className:"text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4",children:"API Integration Examples"}),(0,b.jsx)("p",{className:"text-xl text-gray-600 dark:text-gray-400 mb-8",children:"Learn how to integrate with the VEX Aware REST API using practical examples"}),(0,b.jsxs)("section",{className:"mb-12",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-6",children:"JavaScript / TypeScript Examples"}),(0,b.jsxs)("div",{className:"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50",children:[(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-900 dark:text-white mb-4",children:"1. Fetch All Tutorials"}),(0,b.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mb-4",children:"Get a list of all published tutorials from the database."}),(0,b.jsx)("pre",{className:"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800",children:(0,b.jsx)("code",{className:"text-sm text-gray-800 dark:text-gray-200",children:`// Using fetch API
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
});`})})]}),(0,b.jsxs)("div",{className:"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50",children:[(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-900 dark:text-white mb-4",children:"2. Filter Tutorials by Category"}),(0,b.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mb-4",children:"Get tutorials filtered by specific category."}),(0,b.jsx)("pre",{className:"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800",children:(0,b.jsx)("code",{className:"text-sm text-gray-800 dark:text-gray-200",children:`// Fetch only "getting-started" tutorials
async function getTutorialsByCategory(category) {
  const response = await fetch(\`/api/tutorials?category=\${category}\`);
  const data = await response.json();
  return data.data;
}

// Usage
const beginnerTutorials = await getTutorialsByCategory('getting-started');
console.log(\`Beginner tutorials: \${beginnerTutorials.length}\`);`})})]}),(0,b.jsxs)("div",{className:"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50",children:[(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-900 dark:text-white mb-4",children:"3. Get Single Tutorial by Slug"}),(0,b.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mb-4",children:"Fetch detailed information about a specific tutorial."}),(0,b.jsx)("pre",{className:"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800",children:(0,b.jsx)("code",{className:"text-sm text-gray-800 dark:text-gray-200",children:`async function getTutorial(slug) {
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
console.log(tutorial.difficulty);`})})]}),(0,b.jsxs)("div",{className:"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50",children:[(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-900 dark:text-white mb-4",children:"4. Create New Tutorial"}),(0,b.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mb-4",children:"Add a new tutorial to the database via POST request."}),(0,b.jsx)("pre",{className:"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800",children:(0,b.jsx)("code",{className:"text-sm text-gray-800 dark:text-gray-200",children:`async function createTutorial(tutorialData) {
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

console.log('Created:', newTutorial.title);`})})]})]}),(0,b.jsxs)("section",{className:"mb-12",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-6",children:"React Component Example"}),(0,b.jsxs)("div",{className:"border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50",children:[(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-900 dark:text-white mb-4",children:"Tutorial List Component"}),(0,b.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mb-4",children:"A complete React component that fetches and displays tutorials."}),(0,b.jsx)("pre",{className:"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800",children:(0,b.jsx)("code",{className:"text-sm text-gray-800 dark:text-gray-200",children:`'use client';

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
}`})})]})]}),(0,b.jsxs)("section",{className:"mb-12",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-6",children:"cURL Examples"}),(0,b.jsxs)("div",{className:"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50",children:[(0,b.jsx)("h3",{className:"text-2xl font-semibold text-gray-900 dark:text-white mb-4",children:"Testing API with cURL"}),(0,b.jsx)("pre",{className:"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800",children:(0,b.jsx)("code",{className:"text-sm text-gray-800 dark:text-gray-200",children:`# Get all tutorials
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
curl -X DELETE http://localhost:3000/api/tutorials/new-tutorial`})})]})]}),(0,b.jsxs)("section",{className:"mb-12",children:[(0,b.jsx)("h2",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-6",children:"Error Handling"}),(0,b.jsxs)("div",{className:"border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50",children:[(0,b.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mb-4",children:"All API responses follow a consistent format:"}),(0,b.jsx)("pre",{className:"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-200 dark:border-gray-800",children:(0,b.jsx)("code",{className:"text-sm text-gray-800 dark:text-gray-200",children:`// Success Response
{
  "success": true,
  "count": 10,  // for list endpoints
  "data": {...} // or [...]
}

// Error Response
{
  "success": false,
  "error": "Error message here"
}`})}),(0,b.jsx)("h3",{className:"text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6",children:"Best Practice Error Handling"}),(0,b.jsx)("pre",{className:"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800",children:(0,b.jsx)("code",{className:"text-sm text-gray-800 dark:text-gray-200",children:`async function safeFetch(url, options = {}) {
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
}`})})]})]}),(0,b.jsxs)("section",{className:"bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-8",children:[(0,b.jsxs)("h2",{className:"text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center",children:[(0,b.jsx)("span",{className:"text-3xl mr-3",children:"📚"}),"Related Resources"]}),(0,b.jsxs)("ul",{className:"space-y-3",children:[(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"text-blue-600 dark:text-blue-400 mr-2",children:"→"}),(0,b.jsx)(c.default,{href:"/api-docs",className:"text-blue-600 dark:text-blue-400 hover:underline font-semibold",children:"Complete API Documentation"})]}),(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"text-blue-600 dark:text-blue-400 mr-2",children:"→"}),(0,b.jsx)(c.default,{href:"/api-docs/authentication",className:"text-blue-600 dark:text-blue-400 hover:underline font-semibold",children:"API Authentication Guide"})]}),(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"text-blue-600 dark:text-blue-400 mr-2",children:"→"}),(0,b.jsx)(c.default,{href:"/tutorials/technical-implementation/api-integration",className:"text-blue-600 dark:text-blue-400 hover:underline font-semibold",children:"API Integration Tutorial"})]}),(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"text-blue-600 dark:text-blue-400 mr-2",children:"→"}),(0,b.jsx)("a",{href:"https://github.com/Dragonwinner/Vexaware",className:"text-blue-600 dark:text-blue-400 hover:underline font-semibold",target:"_blank",rel:"noopener noreferrer",children:"View Source Code on GitHub"})]})]})]})]})]})})}a.s(["default",()=>e,"metadata",0,{title:"API Integration Examples - VEX Aware Tutorial",description:"Learn how to integrate with the VEX Aware REST API. Complete examples for fetching tutorials, blog posts, and resources.",keywords:["API","REST","integration","examples","tutorial"]}])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0e74999d._.js.map