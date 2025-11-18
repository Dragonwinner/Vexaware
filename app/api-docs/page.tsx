import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "API Documentation - VEX Aware",
  description: "Complete API reference for VEX Aware. Learn how to integrate VEX Aware into your applications with our REST API.",
  keywords: ["VEX API", "API documentation", "REST API", "integration", "developer guide"],
};

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ name: "API Documentation", url: "/api-docs" }]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            API Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete REST API reference for integrating VEX Aware into your applications
          </p>
        </div>

        <div className="grid gap-8">
          <section className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All API requests require authentication using API keys. Include your API key in the Authorization header:
            </p>
            <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
            </pre>
          </section>

          <section className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Base URL
            </h2>
            <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">https://api.vexaware.com/v1</code>
            </pre>
          </section>

          <section className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Endpoints
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  GET /vex-documents
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  List all VEX documents
                </p>
                <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded">
                  <p className="text-sm font-semibold mb-2">Response:</p>
                  <pre className="text-xs overflow-x-auto">
{`{
  "documents": [
    {
      "id": "vex-001",
      "created": "2025-01-15T10:00:00Z",
      "statements": 15
    }
  ]
}`}
                  </pre>
                </div>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  POST /vex-documents
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Create a new VEX document
                </p>
                <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded">
                  <p className="text-sm font-semibold mb-2">Request Body:</p>
                  <pre className="text-xs overflow-x-auto">
{`{
  "statements": [
    {
      "vulnerability": "CVE-2024-1234",
      "status": "not_affected",
      "justification": "vulnerable_code_not_in_execute_path"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section className="p-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Rate Limits
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>1,000 requests per hour for standard accounts</li>
              <li>10,000 requests per hour for enterprise accounts</li>
              <li>Rate limit headers included in all responses</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
