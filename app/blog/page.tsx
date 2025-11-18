import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog - VEX Aware",
  description: "Latest insights on vulnerability management, VEX standards, and security best practices",
};

export default function BlogPage() {
  const posts = [
    { title: "Understanding the VEX Standard", excerpt: "Learn about the VEX standard and its role in modern vulnerability management.", date: "2025-01-15", readTime: "10 min", slug: "understanding-vex-standard" },
    { title: "The False Positive Problem in Vulnerability Scanning", excerpt: "Explore why 85% of vulnerability alerts are false positives and how to solve this.", date: "2025-01-12", readTime: "8 min", slug: "false-positive-problem" },
    { title: "SBOM Integration: Complete Guide", excerpt: "A comprehensive guide to integrating Software Bill of Materials with VEX.", date: "2025-01-10", readTime: "12 min", slug: "sbom-integration-guide" },
    { title: "Supply Chain Attacks in 2024: Lessons Learned", excerpt: "Analysis of major supply chain attacks and how to prevent them.", date: "2025-01-08", readTime: "15 min", slug: "supply-chain-attacks-2024" },
    { title: "Kubernetes Security Best Practices", excerpt: "Essential security practices for Kubernetes deployments.", date: "2025-01-05", readTime: "10 min", slug: "kubernetes-security-best-practices" },
    { title: "Managing Zero-Day Vulnerabilities", excerpt: "Strategies for handling zero-day vulnerabilities effectively.", date: "2025-01-03", readTime: "12 min", slug: "zero-day-vulnerabilities" },
    { title: "Automating Security Compliance", excerpt: "How to automate compliance processes with VEX Aware.", date: "2025-01-01", readTime: "10 min", slug: "compliance-automation" },
    { title: "Integrating Threat Intelligence Feeds", excerpt: "Enhance your security with external threat intelligence.", date: "2024-12-28", readTime: "8 min", slug: "threat-intelligence-feeds" },
    { title: "Comparing Container Scanning Tools", excerpt: "An in-depth comparison of popular container security scanners.", date: "2024-12-25", readTime: "15 min", slug: "container-scanning-tools" },
    { title: "Building a DevSecOps Culture", excerpt: "Creating a security-first culture in your development team.", date: "2024-12-22", readTime: "10 min", slug: "devsecops-culture" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ name: "Blog", url: "/blog" }]} />

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Latest insights on vulnerability management and security best practices
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-3">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{post.readTime} read</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
