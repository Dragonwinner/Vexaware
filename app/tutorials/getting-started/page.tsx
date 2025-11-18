import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Getting Started with VEX Aware - Tutorial Series",
  description: "Learn the fundamentals of VEX and vulnerability management. Step-by-step tutorials for beginners.",
  keywords: ["VEX tutorial", "getting started", "vulnerability management", "VEX aware beginner guide"],
};

export default function GettingStartedPage() {
  const tutorials = [
    {
      title: "What is VEX and Why It Matters",
      description: "Understand the fundamentals of VEX (Vulnerability Exploitability eXchange) and its importance in modern security",
      slug: "what-is-vex-and-why-it-matters",
      duration: "15 min",
      difficulty: "Beginner",
    },
    {
      title: "Understanding the Vulnerability Management Crisis",
      description: "Learn about the challenges of traditional vulnerability scanning and why 85% of alerts are false positives",
      slug: "vulnerability-management-crisis",
      duration: "12 min",
      difficulty: "Beginner",
    },
    {
      title: "Introduction to VEX Aware Platform",
      description: "Get an overview of VEX Aware's features, architecture, and how it solves vulnerability management challenges",
      slug: "introduction-to-vex-aware",
      duration: "20 min",
      difficulty: "Beginner",
    },
    {
      title: "Installing VEX Aware - Quick Start Guide",
      description: "Step-by-step guide to install and configure VEX Aware in your environment",
      slug: "installing-vex-aware",
      duration: "30 min",
      difficulty: "Beginner",
    },
    {
      title: "Your First VEX Document in 10 Minutes",
      description: "Create your first VEX document and understand its structure and components",
      slug: "first-vex-document",
      duration: "10 min",
      difficulty: "Beginner",
    },
    {
      title: "VEX Aware Dashboard Tour",
      description: "Navigate the VEX Aware dashboard and understand all the key features and sections",
      slug: "dashboard-tour",
      duration: "18 min",
      difficulty: "Beginner",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Getting Started", url: "/tutorials/getting-started" },
          ]}
        />

        <div className="mb-12">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            Beginner Level
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Getting Started with VEX Aware
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Learn the fundamentals of VEX and vulnerability management. Perfect for those new to VEX Aware.
          </p>
        </div>

        <div className="grid gap-6">
          {tutorials.map((tutorial, index) => (
            <Link
              key={tutorial.slug}
              href={`/tutorials/getting-started/${tutorial.slug}`}
              className="block p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      {tutorial.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      ⏱ {tutorial.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {tutorial.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
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
            Ready for More?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Once you've completed these tutorials, move on to technical implementation and advanced topics.
          </p>
          <div className="flex gap-4">
            <Link
              href="/tutorials/technical-implementation"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Technical Implementation →
            </Link>
            <Link
              href="/tutorials/kubernetes-containers"
              className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors font-semibold"
            >
              Container Security →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
