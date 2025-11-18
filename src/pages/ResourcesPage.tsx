import { Helmet } from 'react-helmet-async'
import Navigation from '../components/Navigation'

export default function ResourcesPage() {
  return (
    <>
      <Helmet>
        <title>Resources - VEX Aware</title>
        <meta name="description" content="Templates, code samples, and tools" />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Templates, code samples, and tools
          </p>
        </div>
      </div>
    </>
  );
}
