import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog - VEX Aware",
  description: "Latest insights on vulnerability management, VEX standards, and security best practices",
};

export default function BlogPage() {
  const posts = [
    {
      title: "The Vulnerability Management Crisis: Why 85% of Alerts Are False Positives",
      excerpt: "Explore the challenges facing modern security teams and how VEX is solving the false positive problem.",
      date: "2025-01-15",
      readTime: "8 min",
      slug: "vulnerability-management-crisis",
    },
    {
      title: "VEX Standards Explained: CycloneDX vs OpenVEX vs CSAF",
      excerpt: "A comprehensive comparison of the three major VEX standards and when to use each one.",
      date: "2025-01-14",
      readTime: "12 min",
      slug: "vex-standards-comparison",
    },
    {
      title: "Supply Chain Security in 2025: Complete Guide",
      excerpt: "Learn how to secure your software supply chain with SBOM and VEX integration.",
      date: "2025-01-13",
      readTime: "15 min",
      slug: "supply-chain-security-2025",
    },
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
