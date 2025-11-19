import { Helmet } from "react-helmet-async";

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Blog</title>
        <meta name="description" content="Latest news and insights about vulnerability management" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Latest news and insights about vulnerability management
        </p>
      </div>
    </div>
  );
}
