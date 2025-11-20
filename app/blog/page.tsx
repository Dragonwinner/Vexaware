import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import { blogMetadata } from "../../lib/metadata";

export const metadata = blogMetadata;

export default function BlogPage() {
  const blogPosts = [
    {
      title: "Understanding the VEX Standard",
      description: "A comprehensive guide to Vulnerability Exploitability eXchange (VEX) and how it transforms security workflows.",
      date: "November 15, 2024",
      readTime: "8 min read",
      category: "Standards",
      slug: "understanding-vex-standard",
      featured: true,
    },
    {
      title: "Supply Chain Attacks in 2024",
      description: "Analysis of recent supply chain vulnerabilities and how VEX documents help mitigate these sophisticated threats.",
      date: "November 10, 2024",
      readTime: "12 min read",
      category: "Security Threats",
      slug: "supply-chain-attacks-2024",
      featured: true,
    },
    {
      title: "Building a DevSecOps Culture",
      description: "How to integrate security practices into your development workflow and foster a security-first mindset.",
      date: "November 5, 2024",
      readTime: "10 min read",
      category: "DevSecOps",
      slug: "devsecops-culture",
      featured: false,
    },
    {
      title: "The False Positive Problem",
      description: "Understanding why vulnerability scanners produce false positives and how VEX documents provide the solution.",
      date: "October 28, 2024",
      readTime: "7 min read",
      category: "Vulnerability Management",
      slug: "false-positive-problem",
      featured: false,
    },
    {
      title: "Kubernetes Security Best Practices",
      description: "Essential security configurations and practices for securing Kubernetes clusters in production environments.",
      date: "October 20, 2024",
      readTime: "15 min read",
      category: "Container Security",
      slug: "kubernetes-security-best-practices",
      featured: false,
    },
    {
      title: "SBOM Integration Guide",
      description: "Step-by-step guide to implementing Software Bill of Materials (SBOM) in your development pipeline.",
      date: "October 15, 2024",
      readTime: "11 min read",
      category: "SBOM",
      slug: "sbom-integration-guide",
      featured: false,
    },
    {
      title: "Container Scanning Tools Comparison",
      description: "Comprehensive comparison of popular container security scanning tools and their integration with VEX Aware.",
      date: "October 8, 2024",
      readTime: "13 min read",
      category: "Tools",
      slug: "container-scanning-tools",
      featured: false,
    },
    {
      title: "Threat Intelligence Feeds",
      description: "How to integrate external threat intelligence feeds to enhance your vulnerability management program.",
      date: "September 30, 2024",
      readTime: "9 min read",
      category: "Threat Intelligence",
      slug: "threat-intelligence-feeds",
      featured: false,
    },
    {
      title: "Zero-Day Vulnerabilities Management",
      description: "Strategies for handling zero-day vulnerabilities and maintaining security posture during critical periods.",
      date: "September 22, 2024",
      readTime: "14 min read",
      category: "Zero-Day",
      slug: "zero-day-vulnerabilities",
      featured: false,
    },
    {
      title: "Compliance Automation Strategies",
      description: "Automating compliance workflows and maintaining continuous compliance with industry standards.",
      date: "September 15, 2024",
      readTime: "12 min read",
      category: "Compliance",
      slug: "compliance-automation",
      featured: false,
    },
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Blog - VEX Aware</title>
        <meta name="description" content="Latest news and insights about vulnerability management, VEX standards, and cybersecurity best practices." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Latest news and insights about vulnerability management, VEX standards, and cybersecurity best practices
          </p>
        </div>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                        {post.category}
                      </span>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {post.date}
                      </span>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                        Read Article
                        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">All Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
                    {post.category}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {post.date}
                  </span>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-xs font-medium">
                    Read
                    <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Get the latest insights on vulnerability management, security best practices, and VEX Aware updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
