import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reports & Analytics API - VEX Aware API Documentation",
  description: "Complete API reference for reports & analytics api in VEX Aware.",
};

export default function ApiDocPage() {
  const exampleRequest = `curl -X GET "https://api.vexaware.com/v1/reports" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"`;

  const exampleResponse = `{
  "status": "success",
  "data": {
    "id": "123",
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-15T10:00:00Z"
  }
}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "API Docs", url: "/api-docs" },
            { name: "Reports & Analytics API", url: "/api-docs/reports" },
          ]}
        />

        <article className="mt-8">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Reports & Analytics API
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Complete API reference and examples for reports & analytics api.
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Overview</h2>
            <p>
              The Reports & Analytics API provides programmatic access to manage and query data 
              in VEX Aware. All endpoints require authentication via API key.
            </p>

            <h2>Authentication</h2>
            <p>
              Include your API key in the Authorization header:
            </p>
            <CodeBlock code='Authorization: Bearer YOUR_API_KEY' language="http" />

            <h2>Endpoints</h2>
            
            <h3>GET /reports</h3>
            <p>Retrieve a list of resources.</p>
            
            <h4>Request</h4>
            <CodeBlock code={exampleRequest} language="bash" />

            <h4>Query Parameters</h4>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>page</code></td>
                  <td>integer</td>
                  <td>Page number (default: 1)</td>
                </tr>
                <tr>
                  <td><code>per_page</code></td>
                  <td>integer</td>
                  <td>Items per page (default: 20, max: 100)</td>
                </tr>
                <tr>
                  <td><code>sort</code></td>
                  <td>string</td>
                  <td>Sort field (default: created_at)</td>
                </tr>
              </tbody>
            </table>

            <h4>Response</h4>
            <CodeBlock code={exampleResponse} language="json" />

            <h3>POST /reports</h3>
            <p>Create a new resource.</p>

            <h3>GET /reports/:id</h3>
            <p>Retrieve a specific resource by ID.</p>

            <h3>PUT /reports/:id</h3>
            <p>Update an existing resource.</p>

            <h3>DELETE /reports/:id</h3>
            <p>Delete a resource.</p>

            <h2>Rate Limiting</h2>
            <p>
              API requests are limited to 1000 requests per hour per API key. 
              Rate limit information is included in response headers:
            </p>
            <ul>
              <li><code>X-RateLimit-Limit</code>: Maximum requests per hour</li>
              <li><code>X-RateLimit-Remaining</code>: Remaining requests</li>
              <li><code>X-RateLimit-Reset</code>: Unix timestamp when limit resets</li>
            </ul>

            <h2>Error Handling</h2>
            <p>
              The API uses standard HTTP status codes:
            </p>
            <ul>
              <li><code>200</code>: Success</li>
              <li><code>400</code>: Bad Request</li>
              <li><code>401</code>: Unauthorized</li>
              <li><code>404</code>: Not Found</li>
              <li><code>429</code>: Rate Limit Exceeded</li>
              <li><code>500</code>: Internal Server Error</li>
            </ul>
          </div>

          <div className="mt-12 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Need Help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/api-docs" className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📖 API Overview</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Return to API documentation home</p>
              </Link>
              <a href="https://github.com/vexaware/examples" className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💻 Code Examples</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">View example implementations</p>
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
