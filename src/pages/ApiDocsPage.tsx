import { Helmet } from 'react-helmet-async'
import Navigation from '../components/Navigation'

export default function ApiDocsPage() {
  return (
    <>
      <Helmet>
        <title>API Documentation - VEX Aware</title>
        <meta name="description" content="Complete REST API reference for VEX Aware" />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete REST API reference
          </p>
        </div>
      </div>
    </>
  );
}
