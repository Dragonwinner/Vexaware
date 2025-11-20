import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";


export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Cloud Native Security", url: "/tutorials/cloud-native" },
          ]}
        />

        <div className="mb-12">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            Intermediate Level
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">☁️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Cloud Native Security
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Deploy and secure VEX Aware across AWS, Azure, and GCP. Master cloud-native security patterns and serverless protection.
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            ⏱ Estimated time: 8-10 hours
          </div>
        </div>

        <div className="grid gap-6">
          {[
            { title: "AWS ECS/EKS Integration", slug: "aws-integration", duration: "45 min", description: "Deploy VEX Aware on AWS container services with security best practices" },
            { title: "Azure AKS Security", slug: "azure-integration", duration: "45 min", description: "Secure Azure Kubernetes Service deployments with VEX Aware" },
            { title: "GCP GKE Best Practices", slug: "gcp-integration", duration: "40 min", description: "Google Kubernetes Engine security configuration and monitoring" },
            { title: "Multi-Cloud Strategy", slug: "multi-cloud-strategy", duration: "50 min", description: "Implement VEX Aware across multiple cloud providers" },
            { title: "Serverless Security", slug: "serverless-security", duration: "35 min", description: "Secure serverless functions and Lambda deployments" },
            { title: "Cloud SBOM Generation", slug: "cloud-sbom", duration: "40 min", description: "Generate and manage SBOMs for cloud-native applications" },
            { title: "Infrastructure as Code Security", slug: "iac-security", duration: "45 min", description: "Secure Terraform, CloudFormation, and ARM templates" },
            { title: "API Gateway Security", slug: "api-gateway-security", duration: "40 min", description: "Secure API gateways and service meshes" },
            { title: "Microservices Architecture", slug: "microservices-architecture", duration: "50 min", description: "Design secure microservices with VEX Aware integration" },
            { title: "Cloud Compliance", slug: "cloud-compliance", duration: "45 min", description: "Maintain compliance in cloud environments" }
          ].map((tutorial, index) => (
            <Link
              key={tutorial.slug}
              to={`/tutorials/cloud-native/${tutorial.slug}`}
              className="block p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      Intermediate
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      ⏱ {tutorial.duration}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {tutorial.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {tutorial.description}
                  </p>
                </div>
                <svg
                  className="w-6 h-6 text-gray-400 ml-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you get stuck or have questions, we're here to help!
          </p>
          <div className="flex gap-4">
            <Link
              to="/faq"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View FAQ →
            </Link>
            <a
              href="https://discord.gg/vexaware"
              className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors font-semibold"
            >
              Join Discord →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
