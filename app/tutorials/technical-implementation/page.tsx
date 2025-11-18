import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Technical Implementation - VEX Aware Tutorial Series",
  description: "Deploy, configure, and manage VEX Aware in your environment. Learn about architecture, deployment options, and best practices.",
};

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Technical Implementation", url: "/tutorials/technical-implementation" },
          ]}
        />

        <div className="mb-12">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            Intermediate Level
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">⚙️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Technical Implementation
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Deploy, configure, and manage VEX Aware in your environment. Learn about architecture, deployment options, and best practices.
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            ⏱ Estimated time: 10-15 hours
          </div>
        </div>

        <div className="grid gap-6">
          
            <Link
              key="architecture-overview"
              href="/tutorials/technical-implementation/architecture-overview"
              className="block p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      Intermediate
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      ⏱ 25 min
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    VEX Aware Architecture Overview
                  </h2>
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

            <Link
              key="docker-deployment"
              href="/tutorials/technical-implementation/docker-deployment"
              className="block p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(2).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      Intermediate
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      ⏱ 30 min
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Docker Deployment Guide
                  </h2>
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

            <Link
              key="kubernetes-deployment"
              href="/tutorials/technical-implementation/kubernetes-deployment"
              className="block p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(3).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      Intermediate
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      ⏱ 45 min
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Kubernetes Deployment
                  </h2>
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

            <Link
              key="configuration-management"
              href="/tutorials/technical-implementation/configuration-management"
              className="block p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(4).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      Intermediate
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      ⏱ 20 min
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Configuration Management
                  </h2>
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

            <Link
              key="database-setup"
              href="/tutorials/technical-implementation/database-setup"
              className="block p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(5).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      Intermediate
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      ⏱ 35 min
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Database Setup and Migration
                  </h2>
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
              href="/faq"
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
