import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/Breadcrumbs";


export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Compliance & Audit", url: "/tutorials/compliance" },
          ]}
        />

        <div className="mb-12">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            Advanced Level
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">✅</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Compliance & Audit
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Meet regulatory requirements with VEX Aware. Comprehensive guides for SOC 2, PCI DSS, HIPAA, and ISO 27001.
          </p>
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            ⏱ Estimated time: 12-15 hours
          </div>
        </div>

        <div className="grid gap-6">
          {[
            { title: "Risk Assessment Framework", slug: "risk-assessment", duration: "45 min", description: "Build comprehensive risk assessment workflows" },
            { title: "SOC 2 Compliance Guide", slug: "soc2-compliance", duration: "50 min", description: "Complete SOC 2 Type II compliance implementation" },
            { title: "PCI DSS Requirements", slug: "pci-dss", duration: "45 min", description: "Payment card industry data security standards" },
            { title: "HIPAA Compliance", slug: "hipaa-compliance", duration: "45 min", description: "Healthcare information privacy and security" },
            { title: "ISO 27001 Certification", slug: "iso-27001", duration: "50 min", description: "Information security management system certification" },
            { title: "NIST Framework Implementation", slug: "nist-framework", duration: "55 min", description: "Cybersecurity framework implementation guide" },
            { title: "Third-Party Security Audits", slug: "third-party-audits", duration: "40 min", description: "Vendor security assessment and audit processes" },
            { title: "Evidence Collection & Documentation", slug: "evidence-collection", duration: "35 min", description: "Automated evidence collection for compliance" },
            { title: "Policy Enforcement", slug: "policy-enforcement", duration: "30 min", description: "Automated policy enforcement and monitoring" },
            { title: "Compliance Reporting", slug: "compliance-reporting", duration: "40 min", description: "Generate compliance reports and dashboards" },
            { title: "Audit Trail Management", slug: "audit-trail", duration: "35 min", description: "Comprehensive audit logging and trail management" },
            { title: "CIS Benchmarks Implementation", slug: "cis-benchmarks", duration: "45 min", description: "Center for Internet Security benchmarks" },
            { title: "Remediation Tracking", slug: "remediation-tracking", duration: "40 min", description: "Track and manage vulnerability remediation" },
            { title: "Regulatory Updates Management", slug: "regulatory-updates", duration: "30 min", description: "Stay current with changing regulations" },
            { title: "Compliance Automation", slug: "compliance-automation", duration: "50 min", description: "Automate compliance workflows and monitoring" }
          ].map((tutorial, index) => (
            <Link
              key={tutorial.slug}
              to={`/tutorials/compliance/${tutorial.slug}`}
              className="block p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      Advanced
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      ⏱ {tutorial.duration}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {tutorial.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {tutorial.description}
                  </p>
                </div>
                <svg
                  className="w-6 h-6 text-gray-400 ml-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Help?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you get stuck or have questions, we're here to help!
          </p>
          <div className="flex gap-4">
            <Link
              to="/faq"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View FAQ →
            </Link>
            <a
              href="https://discord.gg/vexaware"
              className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors font-semibold"
            >
              Join Discord →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
