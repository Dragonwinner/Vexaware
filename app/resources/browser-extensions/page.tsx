import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import { Link } from "react-router-dom";
import { downloadFile } from "@/lib/downloads";

export default function BrowserExtensionsPage() {
  const handleDownload = (filename: string, category: string) => {
    downloadFile(filename, category);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Browser Extensions - VEX Aware Resources</title>
        <meta name="description" content="Ready-to-use browser extensions for VEX Aware implementation. Chrome, Firefox, Edge extensions for vulnerability management and VEX document handling." />
        <meta name="keywords" content="VEX Aware, browser extensions, Chrome extension, Firefox addon, Edge extension, vulnerability scanning, security tools" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Resources", url: "/resources" },
            { name: "Browser Extensions", url: "/resources/browser-extensions" },
          ]}
        />

        <article className="mt-8">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  Browser Extensions
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Production-ready browser extensions for seamless VEX workflow integration
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Production Ready
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                Multi-Browser Support
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                Real-time Scanning
              </span>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Transform your browser into a powerful VEX management tool. Our extensions provide real-time 
                vulnerability scanning, VEX document validation, and seamless integration with development workflows 
                across GitHub, GitLab, npm, and other platforms.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Browser Platforms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Supported Sites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Vulnerability DBs</div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">📦</span>
              Available Extensions
            </h2>
            
            <div className="grid gap-6 my-8">
              {/* Chrome Extension */}
              <div className="group p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 6L12 12.65 7.35 8l1.41-1.41L12 9.83l3.24-3.24L16.65 8z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Chrome Extension
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">v2.0.0 • Manifest v3</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                      Stable
                    </span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                      Latest
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Full-featured Chrome extension with VEX document management, real-time vulnerability scanning, 
                  and advanced configuration options. Supports all major development platforms and package registries.
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Auto-detection of VEX documents on web pages</li>
                    <li>• Real-time vulnerability scanning with 4+ databases</li>
                    <li>• Context menu integration for quick actions</li>
                    <li>• Comprehensive settings with export/import</li>
                    <li>• GitHub, GitLab, npm, PyPI integration</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDownload('chrome-extension.zip', 'browser-extensions')}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
                    </svg>
                    Download Extension
                  </button>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    View Docs
                  </button>
                </div>
              </div>

              {/* Firefox Extension */}
              <div className="group p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3l4 4h-3v4h-2V9H8l4-4z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Firefox Add-on
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">v2.0.0 • WebExtensions</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded text-xs font-medium">
                      Beta
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Firefox-compatible add-on with cross-platform VEX functionality. Features enhanced privacy 
                  controls and seamless integration with Firefox's developer tools ecosystem.
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Enhanced privacy and security controls</li>
                    <li>• Firefox Developer Tools integration</li>
                    <li>• Cross-platform settings synchronization</li>
                    <li>• Advanced vulnerability filtering</li>
                    <li>• Container tabs support for isolated scanning</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDownload('firefox-addon.zip', 'browser-extensions')}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
                    </svg>
                    Download Add-on
                  </button>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    View Docs
                  </button>
                </div>
              </div>

              {/* Edge Extension */}
              <div className="group p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Edge Extension
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">v2.0.0 • Chromium-based</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                      Preview
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Microsoft Edge extension optimized for enterprise environments. Includes enhanced security 
                  features, Azure integration, and compliance-focused vulnerability management.
                </p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Enterprise security and compliance features</li>
                    <li>• Azure DevOps and GitHub integration</li>
                    <li>• Advanced group policy support</li>
                    <li>• Corporate proxy and authentication</li>
                    <li>• Detailed audit logging and reporting</li>
                  </ul>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleDownload('edge-extension.zip', 'browser-extensions')}
                    className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
                    </svg>
                    Download Extension
                  </button>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    View Docs
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg my-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Quick Installation Guide
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Chrome/Edge Installation:</h3>
                  <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                    <li>Download and extract the extension package</li>
                    <li>Open Chrome/Edge and navigate to <code>chrome://extensions/</code> or <code>edge://extensions/</code></li>
                    <li>Enable "Developer mode" in the top right</li>
                    <li>Click "Load unpacked" and select the extracted folder</li>
                    <li>The VEX Aware extension will appear in your toolbar</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Firefox Installation:</h3>
                  <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                    <li>Download the Firefox add-on package</li>
                    <li>Open Firefox and navigate to <code>about:debugging</code></li>
                    <li>Click "This Firefox" in the sidebar</li>
                    <li>Click "Load Temporary Add-on" and select the manifest.json file</li>
                    <li>The extension will be active for the current browser session</li>
                  </ol>
                </div>
              </div>
            </div>

            <CodeBlock
              language="javascript"
              title="Extension API Usage"
              code={`// Basic VEX validation
chrome.runtime.sendMessage({
  action: 'validateVex',
  url: window.location.href
}, (response) => {
  if (response.success) {
    console.log('VEX document is valid');
  } else {
    console.log('Validation errors:', response.errors);
  }
});

// Generate VEX document from page content
chrome.runtime.sendMessage({
  action: 'generateVex',
  url: window.location.href,
  dependencies: extractedDependencies
}, (response) => {
  if (response.success) {
    downloadVexDocument(response.document);
  }
});

// Scan for vulnerabilities
chrome.runtime.sendMessage({
  action: 'scanVulnerabilities',
  dependencies: ['react@18.2.0', 'express@4.18.2']
}, (response) => {
  displayVulnerabilities(response.vulnerabilities);
});`}
            />

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🔧</span>
              Configuration & Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  Supported Platforms
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• GitHub & GitHub Enterprise</li>
                  <li>• GitLab & GitLab Self-Managed</li>
                  <li>• npm Registry & Private Registries</li>
                  <li>• PyPI & Custom Python Indexes</li>
                  <li>• Maven Central & Nexus</li>
                  <li>• RubyGems & Packagist</li>
                  <li>• Docker Hub & Harbor</li>
                  <li>• Snyk & Security Platforms</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  Vulnerability Sources
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• National Vulnerability Database (NVD)</li>
                  <li>• OSV (Open Source Vulnerabilities)</li>
                  <li>• GitHub Security Advisories</li>
                  <li>• Snyk Intelligence (API key required)</li>
                  <li>• CVE Details & MITRE</li>
                  <li>• Custom vulnerability feeds</li>
                  <li>• Real-time threat intelligence</li>
                  <li>• Historical vulnerability data</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Development Extensions</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    These are development versions of the extensions. For production use, install from the official browser stores:
                    <a href="#" className="underline ml-1">Chrome Web Store</a> |
                    <a href="#" className="underline ml-1">Firefox Add-ons</a> |
                    <a href="#" className="underline ml-1">Edge Add-ons</a>
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📖</span>
              Usage Examples
            </h2>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Repository Scanning</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Navigate to any GitHub repository and click the extension icon to scan for vulnerabilities:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Automatic detection of package.json, requirements.txt, pom.xml</li>
                  <li>Real-time vulnerability scanning with severity assessment</li>
                  <li>VEX document generation for found issues</li>
                  <li>Integration with repository security features</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">VEX Document Management</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Right-click on any VEX document link or JSON structure:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                  <li>Validate VEX document format and compliance</li>
                  <li>Generate enhanced VEX documents with additional metadata</li>
                  <li>Export in multiple formats (JSON, YAML, XML)</li>
                  <li>Compare with vulnerability databases</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-xl">🔗</span>
                More Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/resources/ide-plugins" className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🔌 IDE Plugins</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Integrate VEX Aware into your development environment</p>
                </Link>
                <Link to="/resources/cli-tools" className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">⚡ CLI Tools</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Command-line tools for VEX document automation</p>
                </Link>
                <Link to="/tutorials/getting-started" className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Get Started</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learn VEX Aware with step-by-step tutorials</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
