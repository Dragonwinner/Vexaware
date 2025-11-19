import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "react-router-dom";


export default function UseCasePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Use Cases", url: "/use-cases" },
            { name: "Telecommunications", url: "/use-cases/telecommunications" },
          ]}
        />

        <article className="mt-8">
          <header className="mb-12">
            <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              Telecom
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Telecommunications
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              How telecommunications transformed their vulnerability management with VEX Aware.
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>The Challenge</h2>
            <p>
              Before implementing VEX Aware, the organization faced significant challenges:
            </p>
            <ul>
              <li>85% false positive rate from vulnerability scanners</li>
              <li>Security team overwhelmed with alerts</li>
              <li>Slow remediation process</li>
              <li>Compliance reporting took weeks</li>
              <li>Lack of visibility across cloud environments</li>
            </ul>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg my-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Company Profile
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-semibold">Industry:</dt>
                  <dd>Telecom</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-semibold">Team Size:</dt>
                  <dd>50+ developers, 5 security engineers</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-semibold">Infrastructure:</dt>
                  <dd>Kubernetes, AWS, 200+ microservices</dd>
                </div>
              </dl>
            </div>

            <h2>The Solution</h2>
            <p>
              The organization implemented VEX Aware to:
            </p>
            <ol>
              <li>Automate VEX document generation from scanner results</li>
              <li>Integrate with existing CI/CD pipelines</li>
              <li>Enable real-time exploitability analysis</li>
              <li>Streamline compliance reporting</li>
              <li>Provide unified dashboard for all vulnerabilities</li>
            </ol>

            <h2>Implementation</h2>
            <p>
              The rollout was completed in 4 weeks:
            </p>
            <ul>
              <li><strong>Week 1</strong>: Infrastructure setup and integration</li>
              <li><strong>Week 2</strong>: Policy configuration and testing</li>
              <li><strong>Week 3</strong>: Team training and documentation</li>
              <li><strong>Week 4</strong>: Full production deployment</li>
            </ul>

            <h2>Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  90%
                </div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Reduction in false positives
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  75%
                </div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Faster remediation time
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  95%
                </div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Compliance automation
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  $500K
                </div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Annual cost savings
                </p>
              </div>
            </div>

            <h2>Key Takeaways</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 my-6">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                💡 Success Factors
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 mt-2 space-y-1">
                <li>Executive buy-in and clear objectives</li>
                <li>Phased implementation approach</li>
                <li>Comprehensive team training</li>
                <li>Integration with existing workflows</li>
                <li>Continuous monitoring and optimization</li>
              </ul>
            </div>

            <h2>Conclusion</h2>
            <p>
              By implementing VEX Aware, telecommunications achieved significant improvements 
              in security efficiency, compliance, and cost savings. The organization now has a scalable, 
              automated vulnerability management process that grows with their business.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-4">
              <Link to="/use-cases" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                ← View All Use Cases
              </Link>
              <Link to="/tutorials/getting-started" className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors font-semibold">
                Get Started →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
