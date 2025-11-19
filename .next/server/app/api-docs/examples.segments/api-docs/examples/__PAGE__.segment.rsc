1:"$Sreact.fragment"
2:I[22016,["/_next/static/chunks/796e69ae18b2784c.js"],""]
d:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/64c0a5e3a0354479.js"],"OutletBoundary"]
e:"$Sreact.suspense"
0:{"buildId":"xiT-dlrwuBhsIBnVsgLtJ","rsc":["$","$1","c",{"children":[["$","div",null,{"className":"min-h-screen bg-white dark:bg-gray-950","children":["$","div",null,{"className":"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8","children":[["$","nav",null,{"aria-label":"Breadcrumb","className":"mb-4","children":["$","ol",null,{"className":"flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400","children":[["$","li",null,{"children":["$","$L2",null,{"href":"/","className":"hover:text-blue-600 dark:hover:text-blue-400","children":"Home"}]}],[["$","li","0",{"className":"flex items-center space-x-2","children":[["$","span",null,{"children":"/"}],["$","$L2",null,{"href":"/api-docs","className":"hover:text-blue-600 dark:hover:text-blue-400","children":"API Docs"}]]}],["$","li","1",{"className":"flex items-center space-x-2","children":[["$","span",null,{"children":"/"}],["$","span",null,{"className":"text-gray-900 dark:text-white font-medium","children":"Integration Examples"}]]}]]]}]}],["$","div",null,{"className":"mt-8","children":[["$","h1",null,{"className":"text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4","children":"API Integration Examples"}],["$","p",null,{"className":"text-xl text-gray-600 dark:text-gray-400 mb-8","children":"Learn how to integrate with the VEX Aware REST API using practical examples"}],["$","section",null,{"className":"mb-12","children":[["$","h2",null,{"className":"text-3xl font-bold text-gray-900 dark:text-white mb-6","children":"JavaScript / TypeScript Examples"}],["$","div",null,{"className":"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50","children":[["$","h3",null,{"className":"text-2xl font-semibold text-gray-900 dark:text-white mb-4","children":"1. Fetch All Tutorials"}],["$","p",null,{"className":"text-gray-600 dark:text-gray-400 mb-4","children":"Get a list of all published tutorials from the database."}],["$","pre",null,{"className":"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800","children":["$","code",null,{"className":"text-sm text-gray-800 dark:text-gray-200","children":"// Using fetch API\nasync function getAllTutorials() {\n  const response = await fetch('/api/tutorials');\n  const data = await response.json();\n  \n  if (data.success) {\n    console.log(`Found ${data.count} tutorials`);\n    return data.data;\n  } else {\n    throw new Error(data.error);\n  }\n}\n\n// Usage\nconst tutorials = await getAllTutorials();\ntutorials.forEach(tutorial => {\n  console.log(tutorial.title, tutorial.category);\n});"}]}]]}],["$","div",null,{"className":"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50","children":[["$","h3",null,{"className":"text-2xl font-semibold text-gray-900 dark:text-white mb-4","children":"2. Filter Tutorials by Category"}],["$","p",null,{"className":"text-gray-600 dark:text-gray-400 mb-4","children":"Get tutorials filtered by specific category."}],["$","pre",null,{"className":"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800","children":["$","code",null,{"className":"text-sm text-gray-800 dark:text-gray-200","children":"// Fetch only \"getting-started\" tutorials\nasync function getTutorialsByCategory(category) {\n  const response = await fetch(`/api/tutorials?category=${category}`);\n  const data = await response.json();\n  return data.data;\n}\n\n// Usage\nconst beginnerTutorials = await getTutorialsByCategory('getting-started');\nconsole.log(`Beginner tutorials: ${beginnerTutorials.length}`);"}]}]]}],["$","div",null,{"className":"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50","children":[["$","h3",null,{"className":"text-2xl font-semibold text-gray-900 dark:text-white mb-4","children":"3. Get Single Tutorial by Slug"}],"$L3","$L4"]}],"$L5"]}],"$L6","$L7","$L8","$L9"]}]]}]}],["$La"],"$Lb"]}],"loading":null,"isPartial":false}
3:["$","p",null,{"className":"text-gray-600 dark:text-gray-400 mb-4","children":"Fetch detailed information about a specific tutorial."}]
4:["$","pre",null,{"className":"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800","children":["$","code",null,{"className":"text-sm text-gray-800 dark:text-gray-200","children":"async function getTutorial(slug) {\n  const response = await fetch(`/api/tutorials/${slug}`);\n  const data = await response.json();\n  \n  if (data.success) {\n    return data.data;\n  } else {\n    throw new Error('Tutorial not found');\n  }\n}\n\n// Usage\nconst tutorial = await getTutorial('what-is-vex-and-why-it-matters');\nconsole.log(tutorial.title);\nconsole.log(tutorial.content);\nconsole.log(tutorial.difficulty);"}]}]
5:["$","div",null,{"className":"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50","children":[["$","h3",null,{"className":"text-2xl font-semibold text-gray-900 dark:text-white mb-4","children":"4. Create New Tutorial"}],["$","p",null,{"className":"text-gray-600 dark:text-gray-400 mb-4","children":"Add a new tutorial to the database via POST request."}],["$","pre",null,{"className":"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800","children":["$","code",null,{"className":"text-sm text-gray-800 dark:text-gray-200","children":"async function createTutorial(tutorialData) {\n  const response = await fetch('/api/tutorials', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify(tutorialData),\n  });\n  \n  const data = await response.json();\n  return data.data;\n}\n\n// Usage\nconst newTutorial = await createTutorial({\n  title: 'Advanced VEX Techniques',\n  slug: 'advanced-vex-techniques',\n  category: 'advanced',\n  description: 'Learn advanced VEX document creation',\n  content: '# Advanced VEX Techniques\\n\\nContent here...',\n  difficulty: 'Advanced',\n  duration: '30 min',\n  tags: ['advanced', 'vex'],\n  keywords: ['VEX', 'advanced', 'techniques'],\n  published: true,\n});\n\nconsole.log('Created:', newTutorial.title);"}]}]]}]
c:Taef,'use client';

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
          ? `/api/tutorials?category=${category}`
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
          href={`/tutorials/${tutorial.category}/${tutorial.slug}`}
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
}6:["$","section",null,{"className":"mb-12","children":[["$","h2",null,{"className":"text-3xl font-bold text-gray-900 dark:text-white mb-6","children":"React Component Example"}],["$","div",null,{"className":"border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50","children":[["$","h3",null,{"className":"text-2xl font-semibold text-gray-900 dark:text-white mb-4","children":"Tutorial List Component"}],["$","p",null,{"className":"text-gray-600 dark:text-gray-400 mb-4","children":"A complete React component that fetches and displays tutorials."}],["$","pre",null,{"className":"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800","children":["$","code",null,{"className":"text-sm text-gray-800 dark:text-gray-200","children":"$c"}]}]]}]]}]
7:["$","section",null,{"className":"mb-12","children":[["$","h2",null,{"className":"text-3xl font-bold text-gray-900 dark:text-white mb-6","children":"cURL Examples"}],["$","div",null,{"className":"mb-8 border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50","children":[["$","h3",null,{"className":"text-2xl font-semibold text-gray-900 dark:text-white mb-4","children":"Testing API with cURL"}],["$","pre",null,{"className":"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800","children":["$","code",null,{"className":"text-sm text-gray-800 dark:text-gray-200","children":"# Get all tutorials\ncurl http://localhost:3000/api/tutorials\n\n# Get tutorials by category\ncurl http://localhost:3000/api/tutorials?category=getting-started\n\n# Get single tutorial\ncurl http://localhost:3000/api/tutorials/what-is-vex-and-why-it-matters\n\n# Create new tutorial\ncurl -X POST http://localhost:3000/api/tutorials \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"title\": \"New Tutorial\",\n    \"slug\": \"new-tutorial\",\n    \"category\": \"getting-started\",\n    \"description\": \"Description here\",\n    \"content\": \"Content here\",\n    \"difficulty\": \"Beginner\",\n    \"duration\": \"10 min\",\n    \"tags\": [\"tutorial\"],\n    \"keywords\": [\"keyword\"]\n  }'\n\n# Update tutorial\ncurl -X PUT http://localhost:3000/api/tutorials/new-tutorial \\\n  -H \"Content-Type\": application/json\" \\\n  -d '{\"duration\": \"15 min\"}'\n\n# Delete tutorial\ncurl -X DELETE http://localhost:3000/api/tutorials/new-tutorial"}]}]]}]]}]
8:["$","section",null,{"className":"mb-12","children":[["$","h2",null,{"className":"text-3xl font-bold text-gray-900 dark:text-white mb-6","children":"Error Handling"}],["$","div",null,{"className":"border border-gray-200 dark:border-gray-800 rounded-lg p-6 bg-white dark:bg-gray-900/50","children":[["$","p",null,{"className":"text-gray-600 dark:text-gray-400 mb-4","children":"All API responses follow a consistent format:"}],["$","pre",null,{"className":"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-200 dark:border-gray-800","children":["$","code",null,{"className":"text-sm text-gray-800 dark:text-gray-200","children":"// Success Response\n{\n  \"success\": true,\n  \"count\": 10,  // for list endpoints\n  \"data\": {...} // or [...]\n}\n\n// Error Response\n{\n  \"success\": false,\n  \"error\": \"Error message here\"\n}"}]}],["$","h3",null,{"className":"text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6","children":"Best Practice Error Handling"}],["$","pre",null,{"className":"bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800","children":["$","code",null,{"className":"text-sm text-gray-800 dark:text-gray-200","children":"async function safeFetch(url, options = {}) {\n  try {\n    const response = await fetch(url, options);\n    const data = await response.json();\n    \n    if (!response.ok) {\n      throw new Error(data.error || 'Request failed');\n    }\n    \n    if (!data.success) {\n      throw new Error(data.error || 'Unknown error');\n    }\n    \n    return data.data;\n  } catch (error) {\n    console.error('API Error:', error.message);\n    throw error;\n  }\n}\n\n// Usage with error handling\ntry {\n  const tutorial = await safeFetch('/api/tutorials/some-slug');\n  console.log('Success:', tutorial);\n} catch (error) {\n  console.error('Failed to fetch tutorial:', error.message);\n}"}]}]]}]]}]
9:["$","section",null,{"className":"bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-8","children":[["$","h2",null,{"className":"text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center","children":[["$","span",null,{"className":"text-3xl mr-3","children":"📚"}],"Related Resources"]}],["$","ul",null,{"className":"space-y-3","children":[["$","li",null,{"className":"flex items-center","children":[["$","span",null,{"className":"text-blue-600 dark:text-blue-400 mr-2","children":"→"}],["$","$L2",null,{"href":"/api-docs","className":"text-blue-600 dark:text-blue-400 hover:underline font-semibold","children":"Complete API Documentation"}]]}],["$","li",null,{"className":"flex items-center","children":[["$","span",null,{"className":"text-blue-600 dark:text-blue-400 mr-2","children":"→"}],["$","$L2",null,{"href":"/api-docs/authentication","className":"text-blue-600 dark:text-blue-400 hover:underline font-semibold","children":"API Authentication Guide"}]]}],["$","li",null,{"className":"flex items-center","children":[["$","span",null,{"className":"text-blue-600 dark:text-blue-400 mr-2","children":"→"}],["$","$L2",null,{"href":"/tutorials/technical-implementation/api-integration","className":"text-blue-600 dark:text-blue-400 hover:underline font-semibold","children":"API Integration Tutorial"}]]}],["$","li",null,{"className":"flex items-center","children":[["$","span",null,{"className":"text-blue-600 dark:text-blue-400 mr-2","children":"→"}],["$","a",null,{"href":"https://github.com/Dragonwinner/Vexaware","className":"text-blue-600 dark:text-blue-400 hover:underline font-semibold","target":"_blank","rel":"noopener noreferrer","children":"View Source Code on GitHub"}]]}]]}]]}]
a:["$","script","script-0",{"src":"/_next/static/chunks/796e69ae18b2784c.js","async":true}]
b:["$","$Ld",null,{"children":["$","$e",null,{"name":"Next.MetadataOutlet","children":"$@f"}]}]
f:null
