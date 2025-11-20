import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";

interface TutorialSection {
  title: string;
  description: string;
  path: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  topics: string[];
  icon: string;
}

const tutorialSections: TutorialSection[] = [
  {
    title: "Getting Started",
    description: "Learn the fundamentals of VEX Aware and vulnerability management. Perfect for beginners who want to understand the basics.",
    path: "/tutorials/getting-started",
    difficulty: "Beginner",
    duration: "2-3 hours",
    topics: ["VEX Basics", "Platform Overview", "First VEX Document", "Dashboard Navigation"],
    icon: "🚀"
  },
  {
    title: "Technical Implementation",
    description: "Deep dive into deployment, configuration, and integration. Covers Docker, Kubernetes, APIs, and monitoring.",
    path: "/tutorials/technical-implementation",
    difficulty: "Intermediate",
    duration: "4-6 hours",
    topics: ["Docker Deployment", "Kubernetes Setup", "API Integration", "Monitoring & Logging"],
    icon: "⚙️"
  },
  {
    title: "Advanced Topics",
    description: "Master advanced features including custom analytics, automation, and enterprise-scale deployments.",
    path: "/tutorials/advanced",
    difficulty: "Advanced",
    duration: "6-8 hours",
    topics: ["Custom Analytics", "Automation", "Enterprise Features", "Performance Optimization"],
    icon: "🎯"
  },
  {
    title: "Compliance & Governance",
    description: "Learn about regulatory compliance, risk assessment, and governance frameworks with VEX Aware.",
    path: "/tutorials/compliance",
    difficulty: "Intermediate",
    duration: "3-4 hours",
    topics: ["SOC 2 Compliance", "Risk Assessment", "Third-party Audits", "Remediation Tracking"],
    icon: "📋"
  },
  {
    title: "Cloud-Native Security",
    description: "Specialized tutorials for cloud-native environments, serverless security, and multi-cloud strategies.",
    path: "/tutorials/cloud-native",
    difficulty: "Advanced",
    duration: "4-5 hours",
    topics: ["Serverless Security", "Multi-cloud Strategy", "Container Security", "Cloud Compliance"],
    icon: "☁️"
  },
  {
    title: "Kubernetes & Containers",
    description: "Comprehensive guide to securing containerized applications and Kubernetes clusters with VEX Aware.",
    path: "/tutorials/kubernetes-containers",
    difficulty: "Intermediate",
    duration: "5-6 hours",
    topics: ["K8s Security", "Container Scanning", "Helm Charts", "Security Policies"],
    icon: "🐳"
  }
];

const difficultyColors = {
  'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Advanced': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Tutorials - VEX Aware</title>
        <meta name="description" content="Comprehensive tutorials for VEX Aware vulnerability management platform. Learn from basics to advanced topics." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            VEX Aware Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Master vulnerability management with our comprehensive tutorial series. 
            From basic concepts to advanced enterprise deployments, learn at your own pace.
          </p>
          
          {/* Learning Path */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              📚 Recommended Learning Path
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Start with Getting Started → Technical Implementation → Choose specialization (Advanced/Compliance/Cloud-Native)
            </p>
          </div>
        </div>

        {/* Tutorial Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {tutorialSections.map((section, index) => (
            <a
              key={index}
              href={section.path}
              className="group bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                {/* Icon and Title */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{section.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {section.title}
                  </h3>
                </div>

                {/* Difficulty and Duration */}
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[section.difficulty]}`}>
                    {section.difficulty}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ⏱️ {section.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {section.description}
                </p>

                {/* Topics */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What you'll learn:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {section.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  Start Learning
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Start Options
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Choose your preferred way to get started with VEX Aware
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">5-Minute Setup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get VEX Aware running quickly with our Docker setup
              </p>
              <a
                href="/tutorials/getting-started/installing-vex-aware"
                className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
              >
                Quick Install Guide →
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Demo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Try VEX Aware features with our guided demo environment
              </p>
              <a
                href="/tutorials/getting-started/dashboard-tour"
                className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
              >
                Launch Demo →
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Video Course</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Watch comprehensive video tutorials step-by-step
              </p>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
              >
                Watch Videos →
              </a>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Additional Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Complement your learning with these helpful resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <a
              href="/api-docs"
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">API Documentation</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Complete API reference</p>
            </a>

            <a
              href="/resources"
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Tools & Resources</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">CLI tools, templates, samples</p>
            </a>

            <a
              href="/use-cases"
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Use Cases</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Industry-specific examples</p>
            </a>

            <a
              href="/contact"
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.196L12 6m0 12v3.804M2.196 12H6m12 0h3.804" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Get Support</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Contact our team</p>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}