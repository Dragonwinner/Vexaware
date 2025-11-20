import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import SocialShare from "@/components/SocialShare";
import TableOfContents from "@/components/TableOfContents";
import TutorialNavigation from "@/components/TutorialNavigation";
import { Link } from "react-router-dom";


export default function TutorialPage() {
  const headings = [
    { id: "introduction", text: "Introduction", level: 2 },
    { id: "prerequisites", text: "Prerequisites", level: 2 },
    { id: "step-by-step", text: "Step-by-Step Guide", level: 2 },
    { id: "best-practices", text: "Best Practices", level: 2 },
    { id: "troubleshooting", text: "Troubleshooting", level: 2 },
    { id: "next-steps", text: "Next Steps", level: 2 },
  ];

  const exampleCode = `# Example command
vexaware init --name "my-first-project"
vexaware scan --target ./my-app
vexaware generate vex --output vex-document.json`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Getting Started", url: "/tutorials/getting-started" },
            { name: "Your First VEX Document in 10 Minutes", url: "/tutorials/getting-started/first-vex-document" },
          ]}
        />

        <article className="mt-8">
          <header className="mb-12">
            <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              10 min • Beginner
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Your First VEX Document in 10 Minutes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Create and publish your first VEX document to communicate vulnerability status.
            </p>
            <SocialShare 
              title="Your First VEX Document in 10 Minutes"
              url="/tutorials/getting-started/first-vex-document"
            />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <TableOfContents headings={headings} />
            </aside>

            <div className="lg:col-span-3 prose prose-lg dark:prose-invert max-w-none">
              <section id="introduction">
                <h2>Introduction</h2>
                <p>
                  Create and publish your first VEX document to communicate vulnerability status. This tutorial provides a comprehensive, easy-to-follow 
                  guide that will have you up and running quickly.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 my-6">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    💡 What You'll Learn
                  </p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1">
                    <li>Core concepts and fundamentals</li>
                    <li>Step-by-step implementation</li>
                    <li>Best practices and tips</li>
                    <li>Common pitfalls to avoid</li>
                  </ul>
                </div>
              </section>

              <section id="prerequisites">
                <h2>Prerequisites</h2>
                <p>Before starting this tutorial, make sure you have:</p>
                <ul>
                  <li>Basic understanding of security concepts</li>
                  <li>Command-line familiarity</li>
                  <li>Text editor or IDE</li>
                  <li>Internet connection</li>
                </ul>
              </section>

              <section id="step-by-step">
                <h2>Step-by-Step Guide</h2>
                <h3>Step 1: Setup</h3>
                <p>Begin by setting up your environment:</p>
                <CodeBlock code={exampleCode} language="bash" />

                <h3>Step 2: Configuration</h3>
                <p>Configure the necessary settings for your use case:</p>
                <CodeBlock 
                  code={`# Configuration
vexaware config set project.name "My Project"
vexaware config set scanner.type trivy
vexaware config set output.format json`}
                  language="bash" 
                />

                <h3>Step 3: Verification</h3>
                <p>Verify everything is working correctly:</p>
                <CodeBlock 
                  code={`# Verify installation
vexaware version
vexaware health check

# Expected output:
# ✓ VEX Aware v2.0.0
# ✓ All systems operational`}
                  language="bash" 
                />
              </section>

              <section id="best-practices">
                <h2>Best Practices</h2>
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-4">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      ✅ Do: Start with small, incremental changes
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Don't try to do everything at once. Start small and iterate.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-4">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      ✅ Do: Document your configurations
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Keep track of your settings and changes for future reference.
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4">
                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                      ❌ Don't: Skip testing
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                      Always test your configuration before deploying to production.
                    </p>
                  </div>
                </div>
              </section>

              <section id="troubleshooting">
                <h2>Troubleshooting</h2>
                <h3>Common Issues</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Issue: Command not found</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Solution:</strong> Ensure VEX Aware is properly installed and in your PATH. 
                      Run the installation script again if needed.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Issue: Configuration errors</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Solution:</strong> Check your configuration file for syntax errors. 
                      Use <code>vexaware config validate</code> to verify.
                    </p>
                  </div>
                </div>
              </section>

              <section id="next-steps">
                <h2>Next Steps</h2>
                <p>Congratulations on completing this tutorial! Here's what to explore next:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <Link to="/tutorials/getting-started" className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📚 More Getting Started</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Continue with more beginner tutorials</p>
                  </Link>
                  <Link to="/tutorials/technical-implementation" className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚙️ Technical Implementation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Learn deployment and configuration</p>
                  </Link>
                </div>
              </section>
            </div>
          </div>
          
          <TutorialNavigation
            previousArticle={{
              title: "Dashboard Tour",
              href: "/tutorials/getting-started/dashboard-tour",
              description: "Take a guided tour of the VEX Aware dashboard and learn about its key features."
            }}
            nextArticle={{
              title: "Technical Implementation",
              href: "/tutorials/technical-implementation",
              description: "Learn how to deploy and configure VEX Aware in production environments."
            }}
          />
        </article>
      </div>
    </div>
  );
}
