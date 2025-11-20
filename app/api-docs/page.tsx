import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import { apiDocsMetadata } from "../../lib/metadata";

export const metadata = apiDocsMetadata;

export default function Page() {
  const apiSections = [
    {
      title: "Authentication",
      description: "API keys, OAuth flows, and authentication methods",
      icon: "🔐",
      path: "/api-docs/authentication",
      methods: ["POST", "GET"],
      endpoints: 5
    },
    {
      title: "VEX Documents",
      description: "Create, retrieve, update, and manage VEX documents",
      icon: "📋",
      path: "/api-docs/vex-documents",
      methods: ["GET", "POST", "PUT", "DELETE"],
      endpoints: 12
    },
    {
      title: "Vulnerabilities",
      description: "Vulnerability data management and querying",
      icon: "🛡️",
      path: "/api-docs/vulnerabilities",
      methods: ["GET", "POST", "PUT"],
      endpoints: 8
    },
    {
      title: "SBOM Management",
      description: "Software Bill of Materials upload and processing",
      icon: "📦",
      path: "/api-docs/sbom",
      methods: ["POST", "GET", "PUT"],
      endpoints: 6
    },
    {
      title: "Projects",
      description: "Project management and organization endpoints",
      icon: "🗂️",
      path: "/api-docs/projects",
      methods: ["GET", "POST", "PUT", "DELETE"],
      endpoints: 10
    },
    {
      title: "Users & Teams",
      description: "User management, teams, and permissions",
      icon: "👥",
      path: "/api-docs/users",
      methods: ["GET", "POST", "PUT", "DELETE"],
      endpoints: 15
    },
    {
      title: "Policies",
      description: "Security policies and compliance rules management",
      icon: "📏",
      path: "/api-docs/policies",
      methods: ["GET", "POST", "PUT", "DELETE"],
      endpoints: 7
    },
    {
      title: "Reports",
      description: "Generate and retrieve security reports",
      icon: "📊",
      path: "/api-docs/reports",
      methods: ["GET", "POST"],
      endpoints: 9
    },
    {
      title: "Integrations",
      description: "Third-party tool integrations and connectors",
      icon: "🔗",
      path: "/api-docs/integrations",
      methods: ["GET", "POST", "PUT"],
      endpoints: 11
    },
    {
      title: "Webhooks",
      description: "Event notifications and webhook management",
      icon: "🪝",
      path: "/api-docs/webhooks",
      methods: ["GET", "POST", "PUT", "DELETE"],
      endpoints: 8
    }
  ];

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'POST': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'PUT': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'DELETE': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>API Documentation - VEX Aware</title>
        <meta name="description" content="Complete REST API reference for VEX Aware platform" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Complete REST API reference for the VEX Aware platform. Build powerful integrations 
            with our comprehensive vulnerability management APIs.
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Get API Key</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Generate your API key in the dashboard settings</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Make Request</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use your API key in the Authorization header</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Process Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive JSON responses for all endpoints</p>
            </div>
          </div>
        </div>

        {/* API Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {apiSections.map((section) => (
            <a
              key={section.path}
              href={section.path}
              className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{section.icon}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {section.endpoints} endpoints
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {section.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {section.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {section.methods.map((method) => (
                  <span
                    key={method}
                    className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(method)}`}
                  >
                    {method}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                View Documentation
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Base URL and Authentication */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Base URL</h3>
            <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
              https://api.vexaware.com/v1
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              All API endpoints are relative to this base URL. Use HTTPS for all requests.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Authentication</h3>
            <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
              Authorization: Bearer YOUR_API_KEY
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Include your API key in the Authorization header for all requests.
            </p>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Check out our tutorials, SDKs, and code examples to quickly integrate 
            VEX Aware into your development workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tutorials/getting-started"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Tutorials
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/resources"
              className="inline-flex items-center bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors font-medium"
            >
              Browse Resources
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
