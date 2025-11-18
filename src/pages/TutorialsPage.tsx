import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'

export default function TutorialsPage() {
  const categories = [
    {
      title: "Getting Started",
      description: "Learn the fundamentals of VEX and vulnerability management",
      link: "/tutorials/getting-started",
      icon: "🎯",
    },
    {
      title: "Technical Implementation",
      description: "Deploy and configure VEX Aware in your environment",
      link: "/tutorials/technical-implementation",
      icon: "⚙️",
    },
    {
      title: "Kubernetes & Containers",
      description: "Container security and orchestration tutorials",
      link: "/tutorials/kubernetes",
      icon: "☸️",
    },
    {
      title: "Cloud Native",
      description: "Microservices and serverless security patterns",
      link: "/tutorials/cloud-native",
      icon: "☁️",
    },
    {
      title: "Compliance & Audit",
      description: "SOC 2, PCI DSS, HIPAA, and ISO 27001 guides",
      link: "/tutorials/compliance",
      icon: "📋",
    },
    {
      title: "Advanced Topics",
      description: "ML-based exploitability and supply chain security",
      link: "/tutorials/advanced",
      icon: "🚀",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Tutorials - VEX Aware</title>
        <meta 
          name="description" 
          content="Comprehensive tutorials for learning VEX Aware from beginner to advanced level" 
        />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              VEX Aware Tutorials
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive guides to master vulnerability management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="block p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
