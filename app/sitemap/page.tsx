import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Footer from '../../components/Footer';

const Sitemap: React.FC = () => {
  const siteLinks = [
    {
      category: "Main Pages",
      links: [
        { title: "Home", url: "/" },
        { title: "About Us", url: "/about" },
        { title: "Contact", url: "/contact" },
        { title: "FAQ", url: "/faq" },
        { title: "Resources", url: "/resources" },
      ]
    },
    {
      category: "API Documentation",
      links: [
        { title: "API Overview", url: "/api-docs" },
        { title: "Authentication", url: "/api-docs/authentication" },
        { title: "Projects API", url: "/api-docs/projects" },
        { title: "Vulnerabilities API", url: "/api-docs/vulnerabilities" },
        { title: "SBOM API", url: "/api-docs/sbom" },
        { title: "VEX Documents API", url: "/api-docs/vex-documents" },
        { title: "Reports API", url: "/api-docs/reports" },
        { title: "Users API", url: "/api-docs/users" },
        { title: "Webhooks API", url: "/api-docs/webhooks" },
        { title: "Integrations API", url: "/api-docs/integrations" },
        { title: "Policies API", url: "/api-docs/policies" },
      ]
    },
    {
      category: "Tutorials",
      links: [
        { title: "Getting Started", url: "/tutorials/getting-started" },
        { title: "Cloud Native Security", url: "/tutorials/cloud-native" },
        { title: "Compliance & Governance", url: "/tutorials/compliance" },
        { title: "Kubernetes & Containers", url: "/tutorials/kubernetes-containers" },
        { title: "Technical Implementation", url: "/tutorials/technical-implementation" },
        { title: "Advanced Tutorials", url: "/tutorials/advanced" },
      ]
    },
    {
      category: "Use Cases",
      links: [
        { title: "Use Cases Overview", url: "/use-cases" },
        { title: "Enterprise Software", url: "/use-cases/enterprise-software" },
        { title: "Financial Services", url: "/use-cases/financial-services" },
        { title: "Healthcare Provider", url: "/use-cases/healthcare-provider" },
        { title: "E-commerce Platform", url: "/use-cases/ecommerce-platform" },
        { title: "Government Agency", url: "/use-cases/government-agency" },
        { title: "SaaS Provider", url: "/use-cases/saas-provider" },
        { title: "Manufacturing", url: "/use-cases/manufacturing" },
        { title: "Education Sector", url: "/use-cases/education-sector" },
        { title: "Telecommunications", url: "/use-cases/telecommunications" },
        { title: "Startup Success", url: "/use-cases/startup-success" },
      ]
    },
    {
      category: "Blog & Resources",
      links: [
        { title: "Blog", url: "/blog" },
        { title: "Understanding VEX Standard", url: "/blog/understanding-vex-standard" },
        { title: "SBOM Integration Guide", url: "/blog/sbom-integration-guide" },
        { title: "Container Scanning Tools", url: "/blog/container-scanning-tools" },
        { title: "DevSecOps Culture", url: "/blog/devsecops-culture" },
        { title: "False Positive Problem", url: "/blog/false-positive-problem" },
        { title: "Kubernetes Security Best Practices", url: "/blog/kubernetes-security-best-practices" },
        { title: "Supply Chain Attacks 2024", url: "/blog/supply-chain-attacks-2024" },
        { title: "Threat Intelligence Feeds", url: "/blog/threat-intelligence-feeds" },
        { title: "Zero Day Vulnerabilities", url: "/blog/zero-day-vulnerabilities" },
        { title: "Compliance Automation", url: "/blog/compliance-automation" },
      ]
    },
    {
      category: "Tools & Resources",
      links: [
        { title: "Browser Extensions", url: "/resources/browser-extensions" },
        { title: "CLI Tools", url: "/resources/cli-tools" },
        { title: "IDE Plugins", url: "/resources/ide-plugins" },
        { title: "Integration Scripts", url: "/resources/integration-scripts" },
        { title: "Testing Tools", url: "/resources/testing-tools" },
        { title: "Migration Tools", url: "/resources/migration-tools" },
        { title: "Policy Templates", url: "/resources/policy-templates" },
        { title: "SBOM Samples", url: "/resources/sbom-samples" },
        { title: "VEX Templates", url: "/resources/vex-templates" },
        { title: "Dashboards", url: "/resources/dashboards" },
      ]
    },
    {
      category: "Legal & Policies",
      links: [
        { title: "Privacy Policy", url: "/privacy" },
        { title: "Terms of Service", url: "/terms" },
        { title: "Disclaimer", url: "/disclaimer" },
        { title: "Cookie Policy", url: "/cookies" },
        { title: "Sitemap", url: "/sitemap" },
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap - Vexaware | Complete Site Navigation & Page Directory</title>
        <meta name="description" content="Complete sitemap of Vexaware platform including all pages, tutorials, API documentation, use cases, blog posts, and resources for easy navigation." />
        <meta name="keywords" content="sitemap, navigation, site map, page directory, vexaware pages, website structure" />
        <meta property="og:title" content="Sitemap - Vexaware Platform" />
        <meta property="og:description" content="Comprehensive sitemap showing all pages and resources available on Vexaware platform" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://vexaware.com/sitemap" />
      </Helmet>
      
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[
            { name: 'Sitemap', url: '/sitemap' }
          ]} />
          
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
              <p className="text-xl text-gray-600">
                Complete directory of all pages and resources on Vexaware platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteLinks.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    {category.category}
                  </h2>
                  <ul className="space-y-2">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a 
                          href={link.url}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-blue-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Need Help Finding Something?</h2>
              <p className="text-blue-800 mb-4">
                Can't find what you're looking for? Our comprehensive platform offers extensive 
                documentation, tutorials, and resources for cybersecurity and vulnerability management.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/faq" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Check FAQ
                </a>
                <a 
                  href="/contact" 
                  className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Contact Support
                </a>
                <a 
                  href="/api-docs" 
                  className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  API Documentation
                </a>
              </div>
            </div>
            
            <div className="mt-8 text-center text-gray-600">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <p className="mt-2">
                Total pages: {siteLinks.reduce((total, category) => total + category.links.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Sitemap;