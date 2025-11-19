import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import SocialShare from "@/components/SocialShare";
import TableOfContents from "@/components/TableOfContents";
import { Link } from "react-router-dom";


export default function TutorialPage() {
  const headings = [
    { id: "introduction", text: "Introduction", level: 2 },
    { id: "prerequisites", text: "Prerequisites", level: 2 },
    { id: "configuration", text: "Configuration", level: 2 },
    { id: "implementation", text: "Implementation", level: 2 },
    { id: "testing", text: "Testing & Validation", level: 2 },
    { id: "best-practices", text: "Best Practices", level: 2 },
    { id: "troubleshooting", text: "Troubleshooting", level: 2 },
    { id: "next-steps", text: "Next Steps", level: 2 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Advanced Topics", url: "/tutorials/advanced" },
            { name: "License Compliance", url: "/tutorials/advanced/license-compliance" },
          ]}
        />

        <article className="mt-8">
          <header className="mb-12">
            <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              45 min • Intermediate
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              License Compliance
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Complete guide to license compliance in VEX Aware.
            </p>
            <SocialShare 
              title="License Compliance"
              url="/tutorials/advanced/license-compliance"
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
                  This comprehensive guide covers license compliance. You'll learn 
                  the concepts, implementation steps, and best practices to successfully deploy 
                  and manage this feature.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 my-6">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    💡 Learning Objectives
                  </p>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1">
                    <li>Understand key concepts and architecture</li>
                    <li>Configure and implement the feature</li>
                    <li>Apply security best practices</li>
                    <li>Troubleshoot common issues</li>
                  </ul>
                </div>
              </section>

              <section id="prerequisites">
                <h2>Prerequisites</h2>
                <p>Before starting this tutorial, ensure you have:</p>
                <ul>
                  <li>VEX Aware installed and running</li>
                  <li>Admin access to your instance</li>
                  <li>Basic understanding of security concepts</li>
                  <li>Familiarity with command-line tools</li>
                </ul>
              </section>

              <section id="configuration">
                <h2>Configuration</h2>
                <p>Let's configure the necessary settings:</p>
                <CodeBlock 
                  code={`# Configuration example
vexaware config set feature.enabled true
vexaware config set feature.mode production
vexaware config set feature.log_level info`}
                  language="bash" 
                />
                <p>
                  These settings enable the feature and configure it for production use with 
                  appropriate logging.
                </p>
              </section>

              <section id="implementation">
                <h2>Implementation</h2>
                <h3>Step 1: Initial Setup</h3>
                <p>Begin by setting up the foundational components:</p>
                <CodeBlock 
                  code={`# Initialize the feature
vexaware advanced init

# Verify installation
vexaware advanced status`}
                  language="bash" 
                />

                <h3>Step 2: Integration</h3>
                <p>Integrate with your existing tools:</p>
                <CodeBlock 
                  code={`# Example integration
vexaware integrate --type cli --name custom-tool
vexaware test integration --name custom-tool`}
                  language="bash" 
                />

                <h3>Step 3: Deployment</h3>
                <p>Deploy the configuration to your environment:</p>
                <CodeBlock 
                  code={`# Apply configuration
vexaware apply --config ./config.yaml

# Restart services
vexaware restart --graceful`}
                  language="bash" 
                />
              </section>

              <section id="testing">
                <h2>Testing & Validation</h2>
                <p>Validate your implementation:</p>
                <CodeBlock 
                  code={`# Run validation tests
vexaware test validate

# Check health status
vexaware health check

# Review logs
vexaware logs tail --lines 100`}
                  language="bash" 
                />
                <p>
                  Ensure all tests pass before moving to production. Address any warnings 
                  or errors that appear.
                </p>
              </section>

              <section id="best-practices">
                <h2>Best Practices</h2>
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-4">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      ✅ Do: Use version control for configurations
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Track all configuration changes in Git to maintain history and enable rollback.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-4">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                      ✅ Do: Test in staging first
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Always validate changes in a staging environment before production deployment.
                    </p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600 p-4">
                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                      ❌ Don't: Skip backups
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                      Always backup your configuration and data before making significant changes.
                    </p>
                  </div>
                </div>
              </section>

              <section id="troubleshooting">
                <h2>Troubleshooting</h2>
                <h3>Common Issues</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Issue: Feature not starting</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Solution:</strong> Check logs for errors, verify configuration syntax, 
                      and ensure all dependencies are running.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Issue: Performance degradation</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <strong>Solution:</strong> Review resource allocation, optimize queries, 
                      and consider scaling horizontally.
                    </p>
                  </div>
                </div>
              </section>

              <section id="next-steps">
                <h2>Next Steps</h2>
                <p>Now that you've completed this tutorial:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <Link to="/tutorials/advanced" className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📚 More Tutorials</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Continue learning</p>
                  </Link>
                  <Link to="/api-docs" className="p-4 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-all">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📖 API Docs</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Explore the API</p>
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
