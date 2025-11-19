import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import SocialShare from "@/components/SocialShare";
import TableOfContents from "@/components/TableOfContents";
import { Link } from "react-router-dom";


export default function TutorialPage() {
  const headings = [
    { id: "introduction", text: "Introduction", level: 2 },
    { id: "overview", text: "Overview", level: 2 },
    { id: "key-concepts", text: "Key Concepts", level: 2 },
    { id: "implementation", text: "Implementation", level: 2 },
    { id: "best-practices", text: "Best Practices", level: 2 },
    { id: "examples", text: "Examples", level: 2 },
    { id: "troubleshooting", text: "Troubleshooting", level: 2 },
    { id: "next-steps", text: "Next Steps", level: 2 },
  ];

  const exampleCode = `# Example configuration
apiVersion: v1
kind: Config
metadata:
  name: vexaware-config
spec:
  enabled: true
  settings:
    scanInterval: "24h"
    autoRemediate: false`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Advanced Topics", url: "/tutorials/advanced" },
            { name: "Supply Chain Security", url: "/tutorials/advanced/supply-chain-security" },
          ]}
        />

        <article className="mt-8">
          <header className="mb-12">
            <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              55 min • Advanced
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Supply Chain Security
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Securing your software supply chain with VEX and SBOM
            </p>
            <SocialShare 
              title="Supply Chain Security"
              url="/tutorials/advanced/supply-chain-security"
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
                  This tutorial will guide you through supply chain security. 
                  By the end of this tutorial, you'll have a comprehensive understanding of the key concepts, 
                  implementation strategies, and best practices.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 my-6">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    💡 What You'll Learn
                  </p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1">
                    <li>Core concepts and terminology</li>
                    <li>Practical implementation techniques</li>
                    <li>Real-world examples and use cases</li>
                    <li>Troubleshooting common issues</li>
                  </ul>
                </div>
              </section>

              <section id="overview">
                <h2>Overview</h2>
                <p>
                  Securing your software supply chain with VEX and SBOM This section provides a high-level overview of the topic 
                  and explains why it's important for your security posture.
                </p>
                <h3>Why This Matters</h3>
                <ul>
                  <li><strong>Security Enhancement</strong>: Improves your overall security posture</li>
                  <li><strong>Compliance</strong>: Helps meet regulatory requirements</li>
                  <li><strong>Efficiency</strong>: Automates manual security processes</li>
                  <li><strong>Visibility</strong>: Provides better insight into your vulnerabilities</li>
                </ul>
              </section>

              <section id="key-concepts">
                <h2>Key Concepts</h2>
                <p>
                  Understanding these fundamental concepts will help you make the most of this feature:
                </p>
                <h3>Core Terminology</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">VEX Document</dt>
                    <dd className="text-gray-600 dark:text-gray-400">A machine-readable document that communicates vulnerability status</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">Exploitability</dt>
                    <dd className="text-gray-600 dark:text-gray-400">The likelihood that a vulnerability can be successfully exploited</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gray-900 dark:text-white">SBOM</dt>
                    <dd className="text-gray-600 dark:text-gray-400">Software Bill of Materials listing all components in your software</dd>
                  </div>
                </dl>
              </section>

              <section id="implementation">
                <h2>Implementation</h2>
                <p>
                  Let's dive into the practical implementation steps:
                </p>
                <h3>Step 1: Configuration</h3>
                <p>First, configure the necessary settings:</p>
                <CodeBlock code={exampleCode} language="yaml" />

                <h3>Step 2: Integration</h3>
                <p>Integrate with your existing tools and workflows:</p>
                <CodeBlock 
                  code={`# Example integration command
vexaware integrate --type scanner --name trivy --endpoint http://trivy:8080
vexaware integrate --type ci --name github-actions --token \${GITHUB_TOKEN}`}
                  language="bash" 
                />

                <h3>Step 3: Validation</h3>
                <p>Verify that everything is working correctly:</p>
                <CodeBlock 
                  code={`# Test the integration
vexaware test integration --name trivy

# Expected output:
# ✓ Connection successful
# ✓ Authentication verified
# ✓ Scan capabilities confirmed`}
                  language="bash" 
                />
              </section>

              <section id="best-practices">
                <h2>Best Practices</h2>
                <p>
                  Follow these best practices for optimal results:
                </p>
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-4">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      ✅ Do: Regular Updates
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Keep your VEX documents updated as new information becomes available about vulnerabilities.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-4">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      ✅ Do: Automate Where Possible
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Use automation to reduce manual work and ensure consistency in your security processes.
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4">
                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                      ❌ Don't: Ignore Context
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                      Always consider the context of your application when assessing vulnerabilities.
                    </p>
                  </div>
                </div>
              </section>

              <section id="examples">
                <h2>Examples</h2>
                <p>
                  Here are practical examples to help you get started:
                </p>
                <h3>Example 1: Basic Setup</h3>
                <CodeBlock 
                  code={`# Initialize project
vexaware init --name "my-project"

# Configure scanner
vexaware config scanner trivy

# Run first scan
vexaware scan --target ./my-app`}
                  language="bash" 
                />

                <h3>Example 2: Advanced Configuration</h3>
                <CodeBlock 
                  code={`{
  "project": "my-project",
  "scanners": ["trivy", "grype"],
  "policies": {
    "critical": "block",
    "high": "warn",
    "medium": "info"
  },
  "notifications": {
    "slack": "https://hooks.slack.com/...",
    "email": "security@example.com"
  }
}`}
                  language="json" 
                />
              </section>

              <section id="troubleshooting">
                <h2>Troubleshooting</h2>
                <h3>Common Issues</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Issue: Connection Timeout</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Solution:</strong> Check network connectivity and firewall rules. Verify that the service 
                      endpoint is accessible.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Issue: Authentication Failed</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Solution:</strong> Verify API credentials and ensure they haven't expired. Check that 
                      the user has appropriate permissions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Issue: Scan Results Empty</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Solution:</strong> Ensure the scanner is properly configured and the target path is correct. 
                      Check scanner logs for errors.
                    </p>
                  </div>
                </div>
              </section>

              <section id="next-steps">
                <h2>Next Steps</h2>
                <p>
                  Now that you've completed this tutorial, here are some recommended next steps:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <Link to="/tutorials/advanced" className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📚 More Tutorials</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Explore more tutorials in this category</p>
                  </Link>
                  <Link to="/api-docs" className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 API Documentation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Learn about the VEX Aware API</p>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
