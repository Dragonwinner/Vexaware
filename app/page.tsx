import Footer from "../components/Footer";
import StructuredData, { MultipleStructuredData } from "../components/StructuredData";
import { homeMetadata } from "../lib/metadata";
import { generateOrganizationSchema, generateWebsiteSchema, generateSoftwareSchema } from "../lib/seo";

export const metadata = homeMetadata;

export default function Home() {
  const features = [
    {
      title: "Automated VEX Generation",
      description: "Generate VEX documents automatically from your vulnerability scans",
      icon: "🤖",
      link: "/tutorials/technical-implementation/api-integration",
    },
    {
      title: "Vendor Aggregation",
      description: "Consolidate vulnerability data from multiple vendors in one place",
      icon: "🔄",
      link: "/api-docs/integrations",
    },
    {
      title: "SBOM Integration",
      description: "Seamlessly integrate with your Software Bill of Materials",
      icon: "📦",
      link: "/api-docs/sbom",
    },
    {
      title: "Container Security",
      description: "Comprehensive security for Docker and Kubernetes environments",
      icon: "🐳",
      link: "/tutorials/technical-implementation/kubernetes-deployment",
    },
    {
      title: "Compliance Ready",
      description: "Meet SOC 2, PCI DSS, HIPAA, and ISO 27001 requirements",
      icon: "✅",
      link: "/tutorials/advanced",
    },
    {
      title: "Real-time Monitoring",
      description: "Monitor vulnerabilities across your entire infrastructure",
      icon: "📊",
      link: "/tutorials/technical-implementation/monitoring-logging",
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
            <a
              href="/tutorials/getting-started"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Free Tutorial
            </a>
            <a
              href="#features"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:border-blue-600 dark:hover:border-blue-400 transition-colors inline-block"
            >
              Learn More
            </a>
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
              <a
                key={index}
                href={feature.link}
                className="block p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{feature.description}</p>
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
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
              <a
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
              </a>
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
          <a
            href="/tutorials/getting-started"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Learning Now
          </a>
        </div>
      </section>

      <Footer />

      {/* Structured Data */}
      <MultipleStructuredData schemas={[
        generateOrganizationSchema(),
        generateWebsiteSchema(),
        generateSoftwareSchema({
          name: 'VEX Aware Platform',
          description: 'Advanced vulnerability intelligence and VEX document management platform for enterprise security',
          category: 'SecurityApplication',
          features: [
            'Automated VEX Document Generation',
            'Multi-Vendor Vulnerability Aggregation',
            'SBOM Integration & Analysis',
            'Container Security Scanning',
            'Compliance Automation',
            'Real-time Security Reporting',
            'API-First Architecture',
            'Enterprise-Grade Security'
          ]
        })
      ]} />
    </div>
  );
}
