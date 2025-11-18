import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Use Cases - VEX Aware Success Stories",
  description: "Real-world case studies showing how organizations use VEX Aware to improve security and reduce vulnerability management overhead",
};

export default function UseCasesPage() {
  const cases = [
    {
      title: "Financial Services: 78% Reduction in Investigation Time",
      industry: "Financial Services",
      challenge: "Managing 2,847 vulnerability alerts monthly with limited security team",
      solution: "Implemented VEX Aware to filter false positives and focus on exploitable vulnerabilities",
      results: ["78% reduction in investigation time", "40% faster patch deployment", "$500K annual cost savings"],
      slug: "financial-services",
    },
    {
      title: "Healthcare: HIPAA Compliance Made Simple",
      industry: "Healthcare",
      challenge: "Meeting HIPAA requirements while managing complex medical device software",
      solution: "Used VEX Aware for automated compliance reporting and audit trails",
      results: ["100% HIPAA compliance", "Zero audit findings", "60% reduction in compliance overhead"],
      slug: "healthcare-hipaa",
    },
    {
      title: "E-commerce: 40% Faster Deployments",
      industry: "E-commerce",
      challenge: "Deployment delays due to false-positive vulnerability alerts",
      solution: "Integrated VEX Aware with CI/CD pipeline for automated vulnerability assessment",
      results: ["40% faster deployments", "95% reduction in deployment blocks", "Zero security incidents"],
      slug: "ecommerce-deployment",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ name: "Use Cases", url: "/use-cases" }]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Use Cases & Success Stories
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See how leading organizations use VEX Aware to transform their vulnerability management
          </p>
        </div>

        <div className="grid gap-8">
          {cases.map((useCase) => (
            <article
              key={useCase.slug}
              className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  {useCase.industry}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {useCase.title}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Challenge</h3>
                  <p className="text-gray-600 dark:text-gray-400">{useCase.challenge}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Solution</h3>
                  <p className="text-gray-600 dark:text-gray-400">{useCase.solution}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Results</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                    {useCase.results.map((result, idx) => (
                      <li key={idx}>{result}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={`/use-cases/${useCase.slug}`}
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Read Full Case Study →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
