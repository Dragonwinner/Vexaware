import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import TutorialNavigation from "@/components/TutorialNavigation";

export default function TechnicalImplementationPage() {
  const tutorials = [
    {
      title: "Architecture Overview",
      description: "Understand VEX Aware's architecture, components, and how they work together",
      slug: "architecture-overview",
      duration: "25 min",
      difficulty: "Intermediate",
    },
    {
      title: "Docker Deployment",
      description: "Deploy VEX Aware using Docker containers with best practices and configurations",
      slug: "docker-deployment",
      duration: "40 min",
      difficulty: "Intermediate",
    },
    {
      title: "Kubernetes Deployment",
      description: "Deploy and scale VEX Aware on Kubernetes with Helm charts and manifests",
      slug: "kubernetes-deployment",
      duration: "50 min",
      difficulty: "Advanced",
    },
    {
      title: "Database Setup",
      description: "Configure and optimize databases for VEX Aware including PostgreSQL and Redis",
      slug: "database-setup",
      duration: "35 min",
      difficulty: "Intermediate",
    },
    {
      title: "Authentication Setup",
      description: "Configure authentication methods including SAML, LDAP, and OAuth integration",
      slug: "authentication-setup",
      duration: "45 min",
      difficulty: "Advanced",
    },
    {
      title: "API Integration",
      description: "Integrate VEX Aware with external systems using REST APIs and webhooks",
      slug: "api-integration",
      duration: "30 min",
      difficulty: "Intermediate",
    },
    {
      title: "Configuration Management",
      description: "Best practices for managing configuration files and environment variables",
      slug: "configuration-management",
      duration: "20 min",
      difficulty: "Beginner",
    },
    {
      title: "Monitoring & Logging",
      description: "Set up comprehensive monitoring, logging, and alerting for production deployments",
      slug: "monitoring-logging",
      duration: "40 min",
      difficulty: "Intermediate",
    },
    {
      title: "Performance Tuning",
      description: "Optimize VEX Aware performance for high-volume vulnerability scanning",
      slug: "performance-tuning",
      duration: "35 min",
      difficulty: "Advanced",
    },
    {
      title: "Backup & Recovery",
      description: "Implement backup strategies and disaster recovery procedures",
      slug: "backup-recovery",
      duration: "30 min",
      difficulty: "Intermediate",
    },
    {
      title: "Custom Policies",
      description: "Create and deploy custom security policies and vulnerability assessment rules",
      slug: "custom-policies",
      duration: "45 min",
      difficulty: "Advanced",
    },
    {
      title: "Alert Configuration",
      description: "Configure intelligent alerting and notification systems for security events",
      slug: "alert-configuration",
      duration: "25 min",
      difficulty: "Intermediate",
    },
    {
      title: "Webhook Configuration",
      description: "Set up webhooks for real-time integration with CI/CD pipelines and security tools",
      slug: "webhook-configuration",
      duration: "20 min",
      difficulty: "Intermediate",
    },
    {
      title: "Troubleshooting",
      description: "Common issues, diagnostic procedures, and troubleshooting techniques",
      slug: "troubleshooting",
      duration: "30 min",
      difficulty: "Intermediate",
    },
    {
      title: "Upgrade Procedures",
      description: "Safe upgrade procedures and version migration strategies",
      slug: "upgrade-procedures",
      duration: "25 min",
      difficulty: "Intermediate",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30";
      case "Intermediate": return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30";
      case "Advanced": return "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30";
      default: return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Technical Implementation - VEX Aware</title>
        <meta name="description" content="Deploy and configure VEX Aware in your environment. Learn Docker, Kubernetes deployment, database setup, and production best practices." />
        <meta name="keywords" content="VEX deployment, Docker, Kubernetes, technical implementation, production setup" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Technical Implementation", url: "/tutorials/technical-implementation" },
          ]}
        />

        <div className="mb-12 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Implementation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Deploy and configure VEX Aware in your environment. From Docker containers to Kubernetes clusters, 
            learn production-ready deployment strategies and best practices.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial, index) => (
            <Link
              key={index}
              to={`/tutorials/technical-implementation/${tutorial.slug}`}
              className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
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

        <div className="mt-16 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready for Production?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Before deploying to production, make sure you've completed the getting started tutorials and 
            understand the basics of VEX Aware.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/tutorials/getting-started"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Getting Started Guide
            </Link>
            <Link
              to="/resources"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Download Resources
            </Link>
          </div>
        </div>
        
        <TutorialNavigation
          previousArticle={{
            title: "Getting Started",
            href: "/tutorials/getting-started",
            description: "Complete the basic tutorials to understand VEX fundamentals."
          }}
          nextArticle={{
            title: "Architecture Overview",
            href: "/tutorials/technical-implementation/architecture-overview",
            description: "Start with understanding VEX Aware's system architecture."
          }}
        />
      </div>
    </div>
  );
}
