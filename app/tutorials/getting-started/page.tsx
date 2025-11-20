import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import TutorialNavigation from "@/components/TutorialNavigation";
import { generateTutorialMetadata } from "../../../lib/metadata";

export const metadata = generateTutorialMetadata({
  title: "Getting Started with VEX Aware",
  description: "Learn the fundamentals of VEX documents, vulnerability management, and security automation with our comprehensive getting started guide.",
  slug: "getting-started",
  difficulty: "beginner",
  category: "Tutorial"
});

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
      duration: "15 min",
      difficulty: "Beginner",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Getting Started with VEX Aware - Tutorial Series</title>
        <meta name="description" content="Learn the fundamentals of VEX and vulnerability management. Step-by-step tutorials for beginners." />
        <meta name="keywords" content="VEX tutorial, getting started, vulnerability management, VEX aware beginner guide" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Getting Started", url: "/tutorials/getting-started" },
          ]}
        />

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Getting Started with VEX Aware
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Learn the fundamentals of VEX and vulnerability management. Step-by-step tutorials for beginners.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial, index) => (
            <Link
              key={index}
              to={`/tutorials/getting-started/${tutorial.slug}`}
              className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {tutorial.difficulty}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ⏱ {tutorial.duration}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {tutorial.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tutorial.description}
              </p>
            </Link>
          ))}
        </div>
        
        <TutorialNavigation
          nextArticle={{
            title: "What is VEX and Why It Matters",
            href: "/tutorials/getting-started/what-is-vex-and-why-it-matters",
            description: "Start your VEX journey by understanding the fundamentals and importance of VEX."
          }}
        />
      </div>
    </div>
  );
}
