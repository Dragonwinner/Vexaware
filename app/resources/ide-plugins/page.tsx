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
            { name: "IDE Plugins", url: "/resources/ide-plugins" },
          ]}
        />

        <article className="mt-8">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              IDE Plugins
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ready-to-use ide plugins to accelerate your VEX Aware implementation.
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Overview</h2>
            <p>
              These ide plugins are designed to help you quickly implement 
              and configure VEX Aware in your environment. All resources are tested and maintained 
              by the VEX Aware team.
            </p>

            <h2>Available Resources</h2>
            <div className="grid gap-4 my-6">
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      VS Code Basic Extension
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Essential VEX document support for VS Code. Includes syntax highlighting, basic validation, and code snippets for quick VEX document creation.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                    EXTENSION
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      ✓ Syntax highlighting
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      ✓ Code snippets
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      ✓ Basic validation
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    📦 vscode-basic-extension.zip • 245 KB
                  </span>
                  <button 
                    onClick={() => {
                      console.log('Download button clicked: VS Code Basic Extension');
                      downloadFile('vscode-basic-extension.zip', 'ide-plugins', 'VS Code Basic Extension');
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
              <div className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Advanced IDE Plugins Suite
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Comprehensive IDE plugin collection for VS Code, IntelliJ, Eclipse, and more. Includes AI-powered features, advanced validation, team collaboration, and enterprise integrations.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
                    SUITE
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      🤖 AI-powered completion
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      🏢 Enterprise features
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      👥 Team collaboration
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      🔧 Multiple IDEs
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    📦 advanced-ide-plugins-suite.zip • 1.2 MB
                  </span>
                  <button 
                    onClick={() => {
                      console.log('Download button clicked: Advanced IDE Plugins Suite');
                      downloadFile('advanced-ide-plugins-suite.zip', 'ide-plugins', 'Advanced IDE Plugins Suite');
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
            </div>

            <h2>Installation Instructions</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-6">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">📦 VS Code Extension Installation</h3>
              <ol className="text-blue-800 dark:text-blue-200 space-y-2">
                <li>1. Download the extension ZIP file</li>
                <li>2. Extract the contents to a folder</li>
                <li>3. Open VS Code and go to Extensions (Ctrl+Shift+X)</li>
                <li>4. Click the "..." menu and select "Install from VSIX"</li>
                <li>5. Select the .vsix file from the extracted folder</li>
                <li>6. Reload VS Code to activate the extension</li>
              </ol>
            </div>

            <h2>Supported IDEs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🔵 VS Code</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full-featured extension with syntax highlighting and validation</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🟠 IntelliJ IDEA</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Plugin for JetBrains IDEs with smart completion</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🟣 Eclipse</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Eclipse plugin for Java-based development environments</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🟢 Vim/Neovim</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lightweight plugin for terminal-based editing</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🟡 Sublime Text</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Package for Sublime Text with custom themes</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">⚫ Atom</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Legacy support for Atom editor users</p>
              </div>
            </div>

            <h2>Features Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Basic Extension Features</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• VEX document syntax highlighting</li>
                  <li>• JSON schema validation for VEX documents</li>
                  <li>• Code snippets for common VEX patterns</li>
                  <li>• Basic error detection and warnings</li>
                  <li>• Document outline and navigation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Advanced Suite Features</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• AI-powered VEX document generation</li>
                  <li>• Real-time vulnerability scanning integration</li>
                  <li>• Advanced semantic highlighting</li>
                  <li>• Team collaboration and sharing</li>
                  <li>• Enterprise SSO and security features</li>
                  <li>• Integrated SBOM viewer and editor</li>
                  <li>• Custom debugger for VEX validation</li>
                </ul>
              </div>
            </div>

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
