import Link from "next/link";
import { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "VEX Aware Tutorial - Master Vulnerability Management | 100+ Free Tutorials",
  description: "Complete VEX Aware guide with 100+ tutorials covering security, compliance, Kubernetes, cloud native, and more. Learn vulnerability management from basics to advanced.",
  keywords: ["VEX", "vulnerability management", "SBOM", "security tutorials", "DevSecOps", "compliance"],
};

export default function Home() {
  const features = [
    {
      title: "Automated VEX Generation",
      description: "Generate VEX documents automatically from your vulnerability scans",
      icon: "🤖",
    },
    {
      title: "Vendor Aggregation",
      description: "Consolidate vulnerability data from multiple vendors in one place",
      icon: "🔄",
    },
    {
      title: "SBOM Integration",
      description: "Seamlessly integrate with your Software Bill of Materials",
      icon: "📦",
    },
    {
      title: "Container Security",
      description: "Comprehensive security for Docker and Kubernetes environments",
      icon: "🐳",
    },
    {
      title: "Compliance Ready",
      description: "Meet SOC 2, PCI DSS, HIPAA, and ISO 27001 requirements",
      icon: "✅",
    },
    {
      title: "Real-time Monitoring",
      description: "Monitor vulnerabilities across your entire infrastructure",
      icon: "📊",
    },
  ];

  const stats = [
    { number: "127+", label: "Tutorial Pages" },
    { number: "5", label: "Learning Paths" },
    { number: "78", label: "Comprehensive Tutorials" },
    { number: "Free", label: "All Content" },
  ];

  const tutorialPaths = [
    {
      level: "Beginner",
      title: "Getting Started",
      description: "Learn the fundamentals of VEX and vulnerability management",
      link: "/tutorials/getting-started",
      duration: "2-3 hours",
      icon: "🎯",
    },
    {
      level: "Intermediate",
      title: "Technical Implementation",
      description: "Deploy and configure VEX Aware in your environment",
      link: "/tutorials/technical-implementation",
      duration: "4-6 hours",
      icon: "⚙️",
    },
    {
      level: "Advanced",
      title: "Enterprise & Compliance",
      description: "Master advanced features, automation, and compliance",
      link: "/tutorials/advanced",
      duration: "8-10 hours",
      icon: "🚀",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Master Vulnerability Management <br />
            <span className="text-blue-600 dark:text-blue-400">with VEX Aware</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Learn VEX Aware from basics to advanced. Free tutorials on vulnerability exploitability,
            SBOM integration, container security, and compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tutorials/getting-started"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Free Tutorial
            </Link>
            <Link
              href="#features"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              Learn More
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-500">
            ✨ 10,000+ developers learning VEX Aware • 500+ enterprises trust us
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose VEX Aware?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive vulnerability management platform designed for modern DevSecOps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorial Pathways */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Structured tutorials from beginner to advanced levels
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorialPaths.map((path, index) => (
              <Link
                key={index}
                href={path.link}
                className="block p-8 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-xl transition-all"
              >
                <div className="text-5xl mb-4">{path.icon}</div>
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {path.level}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {path.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{path.description}</p>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  ⏱ {path.duration}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers mastering vulnerability management
          </p>
          <Link
            href="/tutorials/getting-started"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Learning Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">VEX Aware</h3>
              <p className="text-gray-400">
                Complete guide to vulnerability management
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/tutorials/getting-started" className="hover:text-white">Getting Started</Link></li>
                <li><Link href="/tutorials/technical-implementation" className="hover:text-white">Technical Guides</Link></li>
                <li><Link href="/tutorials/advanced" className="hover:text-white">Advanced Topics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/api-docs" className="hover:text-white">API Documentation</Link></li>
                <li><Link href="/use-cases" className="hover:text-white">Use Cases</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><a href="https://github.com" className="hover:text-white">GitHub</a></li>
                <li><a href="https://twitter.com" className="hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 VEX Aware. Licensed under MIT.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
