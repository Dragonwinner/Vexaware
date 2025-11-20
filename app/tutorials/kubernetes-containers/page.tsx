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
            { name: "Kubernetes & Containers", url: "/tutorials/kubernetes-containers" },
          ]}
        />

        <div className="mb-12">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            Intermediate Level
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🐳</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Kubernetes & Containers
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Comprehensive security for Docker and Kubernetes environments. Learn container scanning, runtime protection, and SBOM management.
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            ⏱ Estimated time: 8-10 hours
          </div>
        </div>

        <div className="grid gap-6">
          {[
            { title: "Container Security Fundamentals", slug: "container-security-basics", duration: "30 min", description: "Essential container security concepts and best practices" },
            { title: "Container Image Scanning", slug: "image-scanning", duration: "40 min", description: "Comprehensive container image vulnerability scanning" },
            { title: "Kubernetes SBOM Integration", slug: "kubernetes-sbom", duration: "35 min", description: "Generate and manage SBOMs in Kubernetes environments" },
            { title: "Runtime Security Monitoring", slug: "runtime-security", duration: "45 min", description: "Real-time monitoring and threat detection for containers" },
            { title: "Network Security Policies", slug: "network-policies", duration: "40 min", description: "Configure and manage Kubernetes network policies" },
            { title: "Pod Security Standards", slug: "pod-security-policies", duration: "35 min", description: "Implement pod security standards and admission controllers" },
            { title: "Kubernetes Security Context", slug: "kubernetes-security-context", duration: "30 min", description: "Configure secure contexts for pods and containers" },
            { title: "Registry Security Integration", slug: "registry-integration", duration: "35 min", description: "Secure container registries and image distribution" },
            { title: "Helm Chart Security", slug: "helm-security", duration: "40 min", description: "Security best practices for Helm deployments" },
            { title: "CI/CD Pipeline Integration", slug: "cicd-integration", duration: "45 min", description: "Integrate security scanning in CI/CD pipelines" },
            { title: "Admission Controllers", slug: "admission-controllers", duration: "50 min", description: "Custom admission controllers for security enforcement" },
            { title: "Service Mesh Security", slug: "service-mesh-security", duration: "55 min", description: "Secure service-to-service communication with Istio/Linkerd" }
          ].map((tutorial, index) => (
            <Link
              key={tutorial.slug}
              to={`/tutorials/kubernetes-containers/${tutorial.slug}`}
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
