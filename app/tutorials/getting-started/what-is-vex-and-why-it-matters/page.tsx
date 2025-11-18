import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";
import SocialShare from "@/components/SocialShare";
import TableOfContents from "@/components/TableOfContents";
import CodePlayground from "@/components/CodePlayground";
import Comments from "@/components/Comments";
import InteractiveDiagram from "@/components/InteractiveDiagram";

export const metadata: Metadata = {
  title: "What is VEX and Why It Matters - VEX Aware Tutorial",
  description: "Learn about VEX (Vulnerability Exploitability eXchange) and understand why it's revolutionizing vulnerability management in modern DevSecOps.",
  keywords: ["VEX", "Vulnerability Exploitability eXchange", "SBOM", "vulnerability management", "security"],
};

export default function WhatIsVEXPage() {
  const headings = [
    { id: "introduction", text: "Introduction", level: 2 },
    { id: "what-is-vex", text: "What is VEX?", level: 2 },
    { id: "the-problem", text: "The Problem VEX Solves", level: 2 },
    { id: "how-vex-works", text: "How VEX Works", level: 2 },
    { id: "vex-standards", text: "VEX Standards", level: 2 },
    { id: "real-world-example", text: "Real-World Example", level: 2 },
    { id: "benefits", text: "Key Benefits", level: 2 },
    { id: "interactive-demo", text: "Try It Yourself", level: 2 },
    { id: "next-steps", text: "Next Steps", level: 2 },
  ];

  const diagramCode = `graph TD
    A[Vulnerability Scanner] -->|Detects CVE-2024-1234| B[VEX Document]
    B -->|Analyzes Context| C{Is Code Path Used?}
    C -->|No| D[Status: not_affected]
    C -->|Yes| E[Status: affected]
    D -->|85% of cases| F[No Action Needed]
    E -->|15% of cases| G[Remediation Required]
    F --> H[Security Team Efficiency ⬆️]
    G --> I[Prioritize Fix]
    
    style D fill:#90EE90
    style E fill:#FFB6C1
    style F fill:#90EE90
    style H fill:#87CEEB`;

  const vexExample = `{
  "@context": "https://openvex.dev/ns/v0.2.0",
  "@id": "https://example.com/vex/2025/001",
  "author": "Example Security Team",
  "timestamp": "2025-01-15T10:00:00Z",
  "version": 1,
  "statements": [
    {
      "vulnerability": {
        "name": "CVE-2024-1234"
      },
      "products": [
        {
          "@id": "pkg:npm/example-package@1.2.3"
        }
      ],
      "status": "not_affected",
      "justification": "vulnerable_code_not_in_execute_path",
      "impact_statement": "The vulnerable code path is not used."
    }
  ]
}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { name: "Tutorials", url: "/tutorials/getting-started" },
            { name: "Getting Started", url: "/tutorials/getting-started" },
            { name: "What is VEX", url: "/tutorials/getting-started/what-is-vex-and-why-it-matters" },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  Beginner
                </span>
                <span className="text-sm text-gray-500">⏱ 15 min read</span>
                <span className="text-sm text-gray-500">📅 Updated: Jan 15, 2025</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                What is VEX and Why It Matters
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Learn about VEX (Vulnerability Exploitability eXchange) and understand why it's revolutionizing vulnerability management.
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 id="introduction">Introduction</h2>
              <p>
                In today's software development landscape, security vulnerabilities are discovered at an unprecedented rate.
                Traditional vulnerability scanners flag thousands of potential issues, overwhelming security teams with alerts.
                But here's the critical question: <strong>How many of these vulnerabilities actually affect your application?</strong>
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 my-8 not-prose">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-0 mb-2">💡 Key Insight</h3>
                <p className="mb-0 text-gray-700 dark:text-gray-300">
                  Studies show that <strong>85% of vulnerability alerts are false positives</strong> or don't affect the actual
                  application. VEX helps you identify which vulnerabilities are actually exploitable in your context.
                </p>
              </div>

              <h2 id="what-is-vex">What is VEX?</h2>
              <p>
                VEX stands for <strong>Vulnerability Exploitability eXchange</strong>. It's a standardized format for communicating
                whether a specific vulnerability affects a particular software product.
              </p>

              <h2 id="the-problem">The Problem VEX Solves</h2>
              <p>
                Traditional vulnerability scanning reports <em>every</em> known vulnerability in your dependencies,
                regardless of whether they're actually exploitable in your specific use case.
              </p>

              <h2 id="how-vex-works">How VEX Works</h2>
              <p>VEX documents contain statements about vulnerabilities:</p>
              <ol>
                <li><strong>Vulnerability Identifier</strong> (e.g., CVE-2024-1234)</li>
                <li><strong>Product/Component</strong> (what software this applies to)</li>
                <li><strong>Status</strong> (not_affected, affected, fixed, or under_investigation)</li>
                <li><strong>Justification</strong> (why it's not affected, if applicable)</li>
              </ol>

              <CodeBlock
                code={vexExample}
                language="json"
                filename="example-vex-document.json"
              />

              <h2 id="vex-standards">VEX Standards</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 not-prose">
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">OpenVEX</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lightweight, JSON-based format
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">CycloneDX VEX</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Part of CycloneDX SBOM standard
                  </p>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">CSAF VEX</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Created by OASIS
                  </p>
                </div>
              </div>

              <h2 id="real-world-example">Real-World Example</h2>
              <p>Financial services company case study:</p>
              <ul>
                <li><strong>Before:</strong> 2,847 alerts, 120 hours/month investigation</li>
                <li><strong>After:</strong> 387 real vulnerabilities, 28 hours/month (78% reduction)</li>
              </ul>

              <h2 id="benefits">Key Benefits</h2>
              <ul>
                <li>🎯 Reduced alert fatigue</li>
                <li>⚡ Faster response time</li>
                <li>📊 Better compliance</li>
                <li>🤝 Improved communication</li>
              </ul>

              <InteractiveDiagram 
                code={diagramCode}
                title="VEX Workflow Visualization"
                description="See how VEX reduces false positives in the vulnerability management process"
              />

              <h2 id="interactive-demo">Try It Yourself</h2>
              <p>
                Experience VEX firsthand! Modify the VEX document below and run it to see how different 
                vulnerability statuses affect the output.
              </p>

              <CodePlayground
                initialCode={vexExample}
                language="json"
                title="VEX Document Playground"
                description="Edit the VEX document and see the results"
              />

              <h2 id="next-steps">Next Steps</h2>
              <p>
                Now that you understand VEX, continue to the next tutorial to learn about the vulnerability management crisis.
              </p>
            </div>

            <SocialShare
              title="What is VEX and Why It Matters"
              url="https://vexaware.com/tutorials/getting-started/what-is-vex-and-why-it-matters"
            />

            <Comments pageId="what-is-vex-and-why-it-matters" />
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
