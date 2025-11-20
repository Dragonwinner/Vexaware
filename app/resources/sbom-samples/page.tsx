import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import { Link } from "react-router-dom";
import { downloadFile } from "@/lib/downloads";


export default function ResourcePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Resources", url: "/resources" },
            { name: "SBOM Samples", url: "/resources/sbom-samples" },
          ]}
        />

        <article className="mt-8">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              SBOM Samples
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ready-to-use sbom samples to accelerate your VEX Aware implementation.
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Overview</h2>
            <p>
              These sbom samples are designed to help you quickly implement 
              and configure VEX Aware in your environment. All resources are tested and maintained 
              by the VEX Aware team.
            </p>

            <h2>Available Resources</h2>
            <div className="grid gap-4 my-6">
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      CycloneDX SBOM Sample
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Complete CycloneDX format SBOM example with components, dependencies, and metadata for a web application.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    CycloneDX
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      📦 Components
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      🔗 Dependencies
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      📄 Metadata
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      🛡️ Hashes
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    📋 cyclonedx-sample.json • 2.8 KB
                  </span>
                  <button 
                    onClick={() => {
                      console.log('Download button clicked: CycloneDX SBOM Sample');
                      downloadFile('cyclonedx-sample.json', 'sbom-samples', 'CycloneDX SBOM Sample');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg opacity-60">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      SPDX SBOM Samples
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Software Package Data Exchange (SPDX) format examples with license information and vulnerability data.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
                    COMING SOON
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      📜 SPDX 2.3
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      ⚖️ Licensing
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      🛡️ Security data
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    📋 spdx-samples.zip • Coming Q1 2025
                  </span>
                  <button 
                    disabled
                    className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Coming Soon
                  </button>
                </div>
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
