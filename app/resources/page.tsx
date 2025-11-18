import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Resources - VEX Aware",
  description: "Free VEX templates, code samples, and resources for vulnerability management",
  keywords: ["VEX templates", "code samples", "resources", "downloads", "documentation"],
};

export default function ResourcesPage() {
  const resources = [
    {
      category: "Templates",
      items: [
        { name: "OpenVEX Document Template", type: "JSON", size: "2 KB" },
        { name: "CycloneDX VEX Template", type: "XML", size: "3 KB" },
        { name: "CSAF VEX Template", type: "JSON", size: "4 KB" },
      ],
    },
    {
      category: "Code Samples",
      items: [
        { name: "Python Integration Example", type: "Python", size: "5 KB" },
        { name: "JavaScript/Node.js Example", type: "JavaScript", size: "4 KB" },
        { name: "Go Integration Example", type: "Go", size: "6 KB" },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "VEX Validator", type: "CLI Tool", size: "15 MB" },
        { name: "SBOM to VEX Converter", type: "CLI Tool", size: "12 MB" },
        { name: "VEX Document Generator", type: "Web Tool", size: "Online" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ name: "Resources", url: "/resources" }]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Free templates, code samples, and tools to accelerate your VEX implementation
          </p>
        </div>

        <div className="grid gap-8">
          {resources.map((section) => (
            <section key={section.category}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {section.category}
              </h2>
              <div className="grid gap-4">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {item.type}
                        </span>
                        <span>{item.size}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ROI Calculator
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Calculate the potential time and cost savings of implementing VEX Aware in your organization
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Launch Calculator
          </button>
        </div>
      </div>
    </div>
  );
}
