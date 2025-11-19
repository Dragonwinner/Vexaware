import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import { Link } from "react-router-dom";


export default function ResourcePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Resources", url: "/resources" },
            { name: "Monitoring Dashboards", url: "/resources/dashboards" },
          ]}
        />

        <article className="mt-8">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Monitoring Dashboards
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ready-to-use monitoring dashboards to accelerate your VEX Aware implementation.
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Overview</h2>
            <p>
              These monitoring dashboards are designed to help you quickly implement 
              and configure VEX Aware in your environment. All resources are tested and maintained 
              by the VEX Aware team.
            </p>

            <h2>Available Resources</h2>
            <div className="grid gap-4 my-6">
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Basic Monitoring Dashboards
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Essential configuration for getting started quickly.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Download
                </button>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Advanced Monitoring Dashboards
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive configuration with advanced features.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Download
                </button>
              </div>
            </div>

            <h2>Usage Instructions</h2>
            <ol>
              <li>Download the resource package</li>
              <li>Extract files to your project directory</li>
              <li>Customize configuration for your environment</li>
              <li>Follow the included README for setup</li>
              <li>Deploy and validate</li>
            </ol>

            <h2>Support</h2>
            <p>
              If you encounter any issues or have questions about these resources, 
              please reach out via:
            </p>
            <ul>
              <li>Community Discord</li>
              <li>GitHub Issues</li>
              <li>Support Email</li>
            </ul>
          </div>

          <div className="mt-12 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              More Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/resources" className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📦 All Resources</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Browse all available resources</p>
              </Link>
              <Link to="/tutorials/getting-started" className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📖 Tutorials</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn with step-by-step guides</p>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
