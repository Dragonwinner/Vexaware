import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Footer from "../../components/Footer";
import { faqMetadata } from "../../lib/metadata";

export const metadata = faqMetadata;

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "Getting Started",
    question: "What is VEX Aware?",
    answer: "VEX Aware is a comprehensive vulnerability management platform that helps organizations identify, assess, and remediate security vulnerabilities in their software supply chain. It provides real-time visibility into your security posture and automates compliance reporting."
  },
  {
    category: "Getting Started",
    question: "How do I get started with VEX Aware?",
    answer: "Getting started is simple: 1) Sign up for an account, 2) Install our CLI tools or integrate with your CI/CD pipeline, 3) Run your first vulnerability scan, 4) Review and prioritize findings in the dashboard. Our getting started guide provides step-by-step instructions."
  },
  {
    category: "Getting Started",
    question: "What programming languages and frameworks does VEX Aware support?",
    answer: "VEX Aware supports a wide range of technologies including JavaScript/Node.js, Python, Java, .NET, Go, Rust, PHP, Ruby, and more. We also support container scanning, Infrastructure as Code (IaC), and cloud-native applications."
  },
  {
    category: "Features",
    question: "What is a VEX document?",
    answer: "VEX (Vulnerability Exploitability eXchange) documents provide detailed information about vulnerabilities and their exploitability status in your specific context. They help communicate whether a vulnerability affects your application and what actions should be taken."
  },
  {
    category: "Features",
    question: "How does SBOM integration work?",
    answer: "Software Bill of Materials (SBOM) integration allows you to import and analyze your software components automatically. VEX Aware can generate SBOMs from your code, import existing SBOMs in SPDX or CycloneDX formats, and continuously monitor components for new vulnerabilities."
  },
  {
    category: "Features",
    question: "Can I integrate VEX Aware with my existing tools?",
    answer: "Yes! VEX Aware offers extensive integrations including CI/CD platforms (GitHub Actions, Jenkins, GitLab), security tools (SAST/DAST scanners), issue tracking systems (Jira, ServiceNow), and monitoring platforms. Our REST API allows custom integrations."
  },
  {
    category: "Security",
    question: "How secure is my data with VEX Aware?",
    answer: "Security is our top priority. We use enterprise-grade encryption, SOC 2 compliance, role-based access control, and secure cloud infrastructure. Your code and vulnerability data are protected with industry-standard security measures."
  },
  {
    category: "Security",
    question: "Do you support on-premises deployment?",
    answer: "Yes, we offer both cloud-hosted and on-premises deployment options. Our enterprise plans include private cloud and hybrid deployment models to meet your organization's security and compliance requirements."
  },
  {
    category: "Pricing",
    question: "What pricing plans are available?",
    answer: "We offer flexible pricing including a free tier for small projects, professional plans for growing teams, and enterprise solutions for large organizations. Pricing is based on the number of repositories, users, and advanced features needed."
  },
  {
    category: "Pricing",
    question: "Is there a free trial?",
    answer: "Yes! We offer a 14-day free trial of our professional features, and our basic plan remains free forever for public repositories and small teams. No credit card required to get started."
  },
  {
    category: "Support",
    question: "What support options are available?",
    answer: "We provide comprehensive support including documentation, video tutorials, community forums, email support, and dedicated customer success managers for enterprise customers. Our support team is available 24/7 for critical issues."
  },
  {
    category: "Support",
    question: "How can I report a bug or request a feature?",
    answer: "You can report bugs or request features through our support portal, GitHub issues, or by contacting our support team directly. We prioritize feedback from our users and regularly release updates based on community input."
  }
];

export default function Page() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(faqData.map(item => item.category)))];
  const filteredFAQs = selectedCategory === "All" 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Frequently Asked Questions - VEX Aware</title>
        <meta name="description" content="Find answers to common questions about VEX Aware's vulnerability management platform, VEX documents, and security features." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about VEX Aware's vulnerability management platform, 
            features, pricing, and support options.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.map((faq, index) => {
            const globalIndex = faqData.indexOf(faq);
            const isOpen = openItems.includes(globalIndex);
            
            return (
              <div key={globalIndex} className="mb-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <button
                    onClick={() => toggleItem(globalIndex)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div>
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Support Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you get the most out of VEX Aware.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
              >
                Contact Support
              </a>
              <a
                href="/tutorials"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
              >
                View Tutorials
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
