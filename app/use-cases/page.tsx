import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import { useCasesMetadata } from "../../lib/metadata";

export const metadata = useCasesMetadata;

export default function Page() {
  const useCases = [
    {
      title: "E-commerce Platform",
      description: "Securing online retail infrastructure with comprehensive vulnerability management",
      icon: "🛒",
      path: "/use-cases/ecommerce-platform",
      tags: ["Retail", "Payment Security", "Customer Data"]
    },
    {
      title: "Financial Services",
      description: "Banking and fintech security compliance with regulatory requirements",
      icon: "🏦",
      path: "/use-cases/financial-services",
      tags: ["Banking", "Compliance", "PCI DSS"]
    },
    {
      title: "Healthcare Provider",
      description: "HIPAA-compliant vulnerability management for healthcare systems",
      icon: "🏥",
      path: "/use-cases/healthcare-provider",
      tags: ["HIPAA", "Patient Data", "Medical Devices"]
    },
    {
      title: "Government Agency",
      description: "Public sector security frameworks and compliance standards",
      icon: "🏛️",
      path: "/use-cases/government-agency",
      tags: ["Government", "Security Clearance", "FedRAMP"]
    },
    {
      title: "Enterprise Software",
      description: "Large-scale enterprise application security management",
      icon: "🏢",
      path: "/use-cases/enterprise-software",
      tags: ["Enterprise", "Scale", "Integration"]
    },
    {
      title: "SaaS Provider",
      description: "Multi-tenant cloud security and customer data protection",
      icon: "☁️",
      path: "/use-cases/saas-provider",
      tags: ["SaaS", "Multi-tenant", "Cloud Security"]
    },
    {
      title: "Manufacturing",
      description: "Industrial IoT and operational technology security",
      icon: "🏭",
      path: "/use-cases/manufacturing",
      tags: ["IoT", "OT Security", "Industrial"]
    },
    {
      title: "Education Sector",
      description: "Educational institution cybersecurity and student data protection",
      icon: "🎓",
      path: "/use-cases/education-sector",
      tags: ["Education", "FERPA", "Student Data"]
    },
    {
      title: "Telecommunications",
      description: "Telecom infrastructure security and network protection",
      icon: "📡",
      path: "/use-cases/telecommunications",
      tags: ["Telecom", "Network Security", "Infrastructure"]
    },
    {
      title: "Startup Success",
      description: "Security-first approach for growing technology companies",
      icon: "🚀",
      path: "/use-cases/startup-success",
      tags: ["Startup", "Growth", "Security-First"]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Use Cases - VEX Aware</title>
        <meta name="description" content="Explore real-world use cases and success stories of VEX Aware implementation across different industries and organizations." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Use Cases
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover how organizations across different industries implement VEX Aware 
            to strengthen their security posture and achieve compliance goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <a
              key={useCase.path}
              href={useCase.path}
              className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 hover:shadow-lg"
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {useCase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {useCase.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {useCase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                Read Case Study
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              VEX Aware is designed to adapt to any industry's security requirements. 
              Contact our team to discuss your specific use case and implementation needs.
            </p>
            <a
              href="/tutorials/getting-started"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started Today
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
