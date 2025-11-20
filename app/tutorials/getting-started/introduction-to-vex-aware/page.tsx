import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import SocialShare from "@/components/SocialShare";
import TableOfContents from "@/components/TableOfContents";
import TutorialNavigation from "@/components/TutorialNavigation";


export default function IntroVexAwarePage() {
  const headings = [
    { id: "introduction", text: "Introduction", level: 2 },
    { id: "platform-architecture", text: "Platform Architecture", level: 2 },
    { id: "core-capabilities", text: "Core Capabilities", level: 2 },
    { id: "data-ingestion", text: "Data Collection & Ingestion", level: 2 },
    { id: "analysis-engine", text: "The Analysis Engine", level: 2 },
    { id: "intelligence-database", text: "Intelligence Database", level: 2 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Getting Started", url: "/tutorials/getting-started" },
            { name: "VEX Aware Platform", url: "/tutorials/getting-started/introduction-to-vex-aware" },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  Beginner
                </span>
                <span className="text-sm text-gray-500">⏱ 20 min read</span>
                <span className="text-sm text-gray-500">📅 Updated: Jan 15, 2025</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Introduction to VEX Aware Platform
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Get an overview of VEX Aware's features, architecture, and how it solves vulnerability management challenges
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 id="introduction">Introduction</h2>
              <p>
                VEX Aware builds upon VEX standards to create a comprehensive vulnerability intelligence platform. 
                It combines automated VEX generation, intelligent aggregation of vendor VEX statements, custom 
                exploitability assessment tools, and seamless integration with existing security infrastructure.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 my-8 not-prose">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-0 mb-2">💡 What Makes VEX Aware Different</h3>
                <p className="mb-0 text-gray-700 dark:text-gray-300">
                  Unlike traditional vulnerability scanners that simply flag CVEs, VEX Aware provides <strong>intelligence-driven 
                  security</strong>. It doesn't just tell you what vulnerabilities exist—it tells you which ones actually 
                  matter in your specific environment.
                </p>
              </div>

              <h2 id="platform-architecture">Platform Architecture</h2>
              <p>
                VEX Aware operates as a cloud-native platform with on-premises deployment options for air-gapped environments. 
                The architecture consists of five key layers working together:
              </p>

              <div className="grid grid-cols-1 gap-4 my-8 not-prose">
                <div className="border-l-4 border-blue-600 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">1. Ingestion Layer</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Continuously collects SBOMs from CI/CD pipelines, container registries, and artifact repositories. 
                    Simultaneously ingests VEX statements from software vendors, open-source projects, and security 
                    research organizations.
                  </p>
                </div>

                <div className="border-l-4 border-green-600 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2. Analysis Engine</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Applies machine learning models trained on historical vulnerability data to assess exploitability. 
                    Analyzes code paths, configuration files, and runtime environments to determine if vulnerable code 
                    can actually be reached during execution.
                  </p>
                </div>

                <div className="border-l-4 border-purple-600 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">3. Intelligence Database</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Maintains a comprehensive knowledge base of vulnerabilities, exploitability assessments, and contextual 
                    information. Updates in real-time as new vulnerability intelligence emerges.
                  </p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">4. Integration Layer</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Provides APIs, webhooks, and native integrations with popular security tools, ticketing systems, 
                    and DevOps platforms.
                  </p>
                </div>

                <div className="border-l-4 border-red-600 pl-4 py-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">5. Presentation Layer</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Offers intuitive dashboards, customizable reports, and API access for programmatic queries.
                  </p>
                </div>
              </div>

              <h2 id="core-capabilities">Core Capabilities</h2>
              <p>
                VEX Aware provides a comprehensive suite of capabilities designed to transform your vulnerability 
                management operations:
              </p>

              <h3>🤖 Automated VEX Generation</h3>
              <p>
                VEX Aware analyzes your applications and automatically generates VEX documents indicating which 
                vulnerabilities are exploitable in your specific context. This eliminates manual assessment work 
                and provides immediate exploitability insights.
              </p>

              <h3>🔄 Vendor VEX Aggregation</h3>
              <p>
                The platform continuously monitors and aggregates VEX statements from thousands of software vendors, 
                providing a comprehensive view of vulnerability status across your software supply chain. When vendors 
                like Microsoft, Red Hat, or npm publish VEX statements, VEX Aware automatically incorporates them.
              </p>

              <h3>⚙️ Custom Policy Engine</h3>
              <p>
                Define organizational policies that incorporate VEX data, automatically routing genuinely exploitable 
                vulnerabilities to appropriate remediation workflows while filtering out noise. Set severity thresholds, 
                SLA requirements, and escalation procedures.
              </p>

              <h3>📊 Historical Tracking</h3>
              <p>
                Track how vulnerability exploitability evolves over time, understanding when vendors update assessments 
                and how your exposure changes across software versions. Identify trends and patterns in your 
                vulnerability landscape.
              </p>

              <h3>🤝 Collaboration Tools</h3>
              <p>
                Enable security, development, and operations teams to collaborate on vulnerability assessments, share 
                exploitability findings, and coordinate remediation efforts. Built-in commenting, tagging, and 
                assignment features streamline teamwork.
              </p>

              <h2 id="data-ingestion">Data Collection & Ingestion</h2>
              <p>
                VEX Aware employs multiple ingestion mechanisms to ensure comprehensive coverage of your software ecosystem:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📦 SBOM Integration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Native support for CycloneDX and SPDX formats. Automatically imports SBOMs from build systems, 
                    CI/CD pipelines, and artifact repositories.
                  </p>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🐳 Container Registry Scanning</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Direct integration with Docker Hub, Amazon ECR, Google Container Registry, Azure Container Registry, 
                    and private registries.
                  </p>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📚 Package Manager Integration</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Connects with npm, PyPI, Maven Central, NuGet, and other package repositories to track dependencies 
                    and receive vulnerability notifications.
                  </p>
                </div>

                <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🔔 Vendor VEX Feeds</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Subscribes to VEX feeds from major software vendors, open-source projects, and security organizations 
                    for authoritative exploitability assessments.
                  </p>
                </div>
              </div>

              <h2 id="analysis-engine">The Analysis Engine</h2>
              <p>
                VEX Aware's analysis engine represents the platform's intelligence core, employing multiple advanced 
                techniques to assess exploitability:
              </p>

              <h3>Static Code Analysis</h3>
              <p>
                When source code is available, the engine performs deep static analysis to determine if vulnerable code 
                paths can be reached during execution. It traces function calls, analyzes control flow, and identifies 
                dead code that contains vulnerabilities but can never execute.
              </p>

              <h3>Dynamic Configuration Analysis</h3>
              <p>
                Examines configuration files, environment variables, and deployment descriptors to understand how 
                applications are configured. Many vulnerabilities require specific configurations to be exploitable—the 
                engine identifies when safe configurations prevent exploitation.
              </p>

              <h3>Runtime Environment Assessment</h3>
              <p>
                Analyzes the runtime environment including operating system, container configuration, network policies, 
                and security controls. Vulnerabilities that require specific runtime conditions are assessed against 
                actual deployment configurations.
              </p>

              <h3>Machine Learning Models</h3>
              <p>
                Leverages ML models trained on millions of vulnerability instances to predict exploitability based on 
                patterns in vulnerability descriptions, affected code, and historical exploitation data.
              </p>

              <h3>Attack Vector Analysis</h3>
              <p>
                Evaluates CVSS attack vectors against actual system architecture. Network-based vulnerabilities in 
                components without network exposure are flagged as not exploitable.
              </p>

              <h2 id="intelligence-database">Intelligence Database</h2>
              <p>
                The VEX Aware knowledge base aggregates vulnerability intelligence from multiple authoritative sources:
              </p>

              <ul>
                <li><strong>National Vulnerability Database (NVD):</strong> Complete CVE database with CVSS scores, vulnerability descriptions, and affected product information</li>
                <li><strong>GitHub Security Advisories:</strong> Vulnerability reports for open-source packages with detailed remediation guidance</li>
                <li><strong>Vendor Security Advisories:</strong> Direct feeds from Microsoft, Red Hat, Canonical, Oracle, and hundreds of other vendors</li>
                <li><strong>Exploit Databases:</strong> Information about publicly available exploits from Exploit-DB, Metasploit, and security research publications</li>
                <li><strong>Threat Intelligence Feeds:</strong> Real-time intelligence indicating which vulnerabilities are being actively exploited in the wild</li>
                <li><strong>Community Contributions:</strong> Crowdsourced exploitability assessments validated by VEX Aware's expert team</li>
              </ul>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg my-8 not-prose">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🎯 Ready to Get Started?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Now that you understand VEX Aware's architecture and capabilities, you're ready to install and 
                  configure the platform for your environment.
                </p>
                <Link 
                  to="/tutorials/getting-started/installing-vex-aware"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Next: Installing VEX Aware →
                </Link>
              </div>
            </div>

            <SocialShare
              title="Introduction to VEX Aware Platform"
              url="https://vexaware.com/tutorials/getting-started/introduction-to-vex-aware"
            />

            <TutorialNavigation
              previousArticle={{
                title: "The Vulnerability Management Crisis",
                href: "/tutorials/getting-started/vulnerability-management-crisis",
                description: "Understand the challenges facing modern security teams and why traditional approaches fall short."
              }}
              nextArticle={{
                title: "Installing VEX Aware",
                href: "/tutorials/getting-started/installing-vex-aware",
                description: "Step-by-step guide to installing and setting up VEX Aware in your environment."
              }}
            />
          </article>

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
