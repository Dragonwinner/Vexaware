import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";

export default function Home() {
  const features = [
    {
      title: "Automated VEX Generation",
      description: "Generate VEX documents automatically from your vulnerability scans with AI-powered insights",
      icon: "🤖",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Vendor Aggregation",
      description: "Consolidate vulnerability data from multiple vendors in one unified dashboard",
      icon: "🔄",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "SBOM Integration",
      description: "Seamlessly integrate with your Software Bill of Materials for complete visibility",
      icon: "📦",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Container Security",
      description: "Comprehensive security scanning for Docker and Kubernetes environments",
      icon: "🐳",
      gradient: "from-green-500 to-teal-500",
    },
    {
      title: "Compliance Ready",
      description: "Meet SOC 2, PCI DSS, HIPAA, and ISO 27001 requirements effortlessly",
      icon: "✅",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Real-time Monitoring",
      description: "Monitor vulnerabilities across your entire infrastructure in real-time",
      icon: "📊",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const stats = [
    { number: "127+", label: "Tutorial Pages", icon: "📚" },
    { number: "5", label: "Learning Paths", icon: "🎯" },
    { number: "78", label: "Comprehensive Tutorials", icon: "📖" },
    { number: "Free", label: "All Content", icon: "🎁" },
  ];

  const tutorialPaths = [
    {
      level: "Beginner",
      title: "Getting Started",
      description: "Learn the fundamentals of VEX and vulnerability management from scratch",
      link: "/tutorials/getting-started",
      duration: "2-3 hours",
      icon: "🎯",
      color: "from-green-400 to-green-600",
    },
    {
      level: "Intermediate",
      title: "Technical Implementation",
      description: "Deploy and configure VEX Aware in your production environment",
      link: "/tutorials/technical-implementation",
      duration: "4-6 hours",
      icon: "⚙️",
      color: "from-blue-400 to-blue-600",
    },
    {
      level: "Advanced",
      title: "Enterprise & Compliance",
      description: "Master advanced features, automation workflows, and compliance requirements",
      link: "/tutorials/advanced",
      duration: "8-10 hours",
      icon: "🚀",
      color: "from-purple-400 to-purple-600",
    },
  ];

  const testimonials = [
    {
      quote: "VEX Aware transformed our vulnerability management process. We reduced our response time by 70%.",
      author: "Sarah Chen",
      role: "Security Director, TechCorp",
      avatar: "SC"
    },
    {
      quote: "The best documentation I've seen for any security tool. Clear, comprehensive, and actionable.",
      author: "Michael Rodriguez",
      role: "DevSecOps Lead, CloudScale",
      avatar: "MR"
    },
    {
      quote: "Compliance requirements that used to take weeks now take hours. Game-changing platform.",
      author: "Emily Thompson",
      role: "CISO, FinanceFirst",
      avatar: "ET"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Helmet>
        <title>VEX Aware Tutorial - Master Vulnerability Management | 100+ Free Tutorials</title>
        <meta name="description" content="Complete VEX Aware guide with 100+ tutorials covering security, compliance, Kubernetes, cloud native, and more. Learn vulnerability management from basics to advanced." />
        <meta name="keywords" content="VEX, vulnerability management, SBOM, security tutorials, DevSecOps, compliance" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Helmet>

      <Navigation />

      {/* Hero Section with Modern Design */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold mb-8 shadow-lg hover-lift">
            <span className="animate-pulse mr-2">🔥</span>
            <span>Trending #1 Security Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Master Vulnerability <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Management Today
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Learn VEX Aware from basics to advanced. <span className="font-semibold text-blue-600 dark:text-blue-400">100+ free tutorials</span> on vulnerability exploitability, SBOM integration, container security, and compliance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/tutorials/getting-started"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full overflow-hidden shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Start Free Tutorial
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-105"
            >
              Explore Features
            </a>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>10,000+ Active Learners</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>500+ Enterprise Teams</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Cards */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift text-center border border-gray-100 dark:border-gray-700"
              >
                <div className="text-2xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-base text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="gradient-text">VEX Aware</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive vulnerability management platform designed for modern DevSecOps teams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden hover-lift"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorial Pathways with Enhanced Design */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your <span className="gradient-text">Learning Path</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Structured tutorials from beginner to advanced levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorialPaths.map((path, index) => (
              <Link
                key={index}
                to={path.link}
                className="group relative bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${path.color} text-white text-sm font-bold mb-6 shadow-lg`}>
                    {path.level}
                  </div>
                  
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{path.icon}</div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {path.title}
                  </h3>
                  
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {path.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {path.duration}
                    </div>
                    
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Loved by <span className="gradient-text">Security Teams</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See what industry leaders are saying
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover-lift border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Security?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of developers and security teams mastering vulnerability management
          </p>
          <Link
            to="/tutorials/getting-started"
            className="inline-flex items-center px-10 py-5 text-lg font-bold text-blue-600 bg-white rounded-full shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105"
          >
            Start Learning Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer with Modern Design */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">VEX Aware</h3>
              <p className="text-gray-400 leading-relaxed">
                Complete guide to vulnerability management for modern development teams.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Learn</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/tutorials/getting-started" className="hover:text-blue-400 transition-colors">Getting Started</Link></li>
                <li><Link to="/tutorials/technical-implementation" className="hover:text-blue-400 transition-colors">Technical Guides</Link></li>
                <li><Link to="/tutorials/advanced" className="hover:text-blue-400 transition-colors">Advanced Topics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/api-docs" className="hover:text-blue-400 transition-colors">API Documentation</Link></li>
                <li><Link to="/use-cases" className="hover:text-blue-400 transition-colors">Use Cases</Link></li>
                <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Community</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><a href="https://github.com" className="hover:text-blue-400 transition-colors">GitHub</a></li>
                <li><a href="https://twitter.com" className="hover:text-blue-400 transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2025 VEX Aware. Licensed under MIT. Built with ❤️ for the security community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
