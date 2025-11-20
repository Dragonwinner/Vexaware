import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import { resourcesMetadata } from "../../lib/metadata";

export const metadata = resourcesMetadata;

export default function Page() {
  const resources = [
    {
      title: "CLI Tools",
      description: "Command-line utilities and scripts for VEX Aware automation",
      slug: "cli-tools",
      icon: "⚡",
      items: ["Installation scripts", "Automation tools", "Configuration helpers"],
    },
    {
      title: "VEX Templates",
      description: "Ready-to-use VEX document templates for common scenarios",
      slug: "vex-templates",
      icon: "📄",
      items: ["Standard VEX formats", "Industry templates", "Custom examples"],
    },
    {
      title: "SBOM Samples",
      description: "Sample Software Bills of Materials in various formats",
      slug: "sbom-samples",
      icon: "📋",
      items: ["SPDX examples", "CycloneDX samples", "Custom formats"],
    },
    {
      title: "Policy Templates",
      description: "Security policy templates and governance frameworks",
      slug: "policy-templates",
      icon: "📜",
      items: ["Compliance templates", "Risk policies", "Governance frameworks"],
    },
    {
      title: "IDE Plugins",
      description: "Editor extensions and plugins for popular IDEs",
      slug: "ide-plugins",
      icon: "🔧",
      items: ["VS Code extension", "IntelliJ plugin", "Eclipse tools"],
    },
    {
      title: "Browser Extensions",
      description: "Browser extensions for web-based vulnerability analysis",
      slug: "browser-extensions",
      icon: "🌐",
      items: ["Chrome extension", "Firefox addon", "Security scanners"],
    },
    {
      title: "Dashboards",
      description: "Pre-configured monitoring and analytics dashboards",
      slug: "dashboards",
      icon: "📊",
      items: ["Grafana templates", "Kibana configs", "Custom dashboards"],
    },
    {
      title: "Testing Tools",
      description: "Automated testing and validation utilities",
      slug: "testing-tools",
      icon: "🧪",
      items: ["Test suites", "Validation scripts", "CI/CD integrations"],
    },
    {
      title: "Integration Scripts",
      description: "Scripts for integrating VEX Aware with other tools",
      slug: "integration-scripts",
      icon: "🔗",
      items: ["API connectors", "Webhook handlers", "Third-party integrations"],
    },
    {
      title: "Migration Tools",
      description: "Tools for migrating from other vulnerability management systems",
      slug: "migration-tools",
      icon: "📦",
      items: ["Data importers", "Format converters", "Migration guides"],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Resources - VEX Aware</title>
        <meta name="description" content="Downloads, templates, and tools for VEX Aware. Ready-to-use resources to accelerate your vulnerability management implementation." />
        <meta name="keywords" content="VEX resources, templates, tools, CLI, SBOM, vulnerability management" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Downloads, templates, and tools for VEX Aware. Ready-to-use resources to accelerate your vulnerability management implementation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={`/resources/${resource.slug}`}
              className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{resource.icon}</span>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Resource
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {resource.description}
              </p>
              <div className="space-y-1">
                {resource.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                    <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                    {item}
                  </div>
                ))}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Check out our comprehensive tutorials and documentation to make the most of these resources.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/tutorials/getting-started"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Getting Started Guide
            </a>
            <a
              href="/api-docs"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              API Documentation
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
