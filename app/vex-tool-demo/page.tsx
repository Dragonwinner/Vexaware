import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "VEX Tool Demo - Interactive VEX Document Creator | VEX Aware",
  description: "Try the VEX-aware tool directly in your browser. Create, validate, and query VEX documents for vulnerability management.",
  keywords: ["VEX tool", "VEX document", "vulnerability management", "interactive demo", "security tool"],
};

export default function VexToolDemoPage() {
  const installExample = `# Install VEX Tool
cd vex-tool
npm install
npm run build

# Use CLI
./dist/cli.js create --cve CVE-2024-1234 \\
  --product "pkg:npm/example@1.0.0" \\
  --status not_affected \\
  --justification vulnerable_code_not_in_execute_path`;

  const programmaticExample = `import { VexDocument, VexValidator } from '@vexaware/vex-tool';

// Create a VEX document
const doc = new VexDocument({
  author: 'Security Team',
  timestamp: new Date().toISOString(),
  version: 1
});

doc.addStatement({
  vulnerability: { name: 'CVE-2024-1234' },
  products: [{ '@id': 'pkg:npm/example@1.0.0' }],
  status: 'not_affected',
  justification: 'vulnerable_code_not_in_execute_path'
});

// Validate
const validator = new VexValidator();
const isValid = validator.validate(doc.toJSON());

// Save
doc.save('my-vex-document.json');`;

  const exampleVexDoc = `{
  "@context": "https://openvex.dev/ns/v0.2.0",
  "@id": "https://example.com/vex/2025/001",
  "author": "Security Team",
  "timestamp": "2025-01-15T10:00:00Z",
  "version": 1,
  "tooling": "@vexaware/vex-tool",
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
            { name: "Home", url: "/" },
            { name: "VEX Tool Demo", url: "/vex-tool-demo" },
          ]}
        />

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                Interactive Tool
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              VEX Tool Demo
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              A comprehensive VEX-aware tool for creating, validating, and managing VEX documents.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 id="overview">Overview</h2>
            <p>
              The VEX Tool is a command-line interface and library designed to help security teams manage
              Vulnerability Exploitability eXchange (VEX) documents. It provides functionality for creating,
              validating, querying, and converting VEX documents that communicate vulnerability status.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 my-6">
              <p className="text-blue-900 dark:text-blue-100 font-semibold mb-2">🚀 Key Features</p>
              <ul className="text-blue-800 dark:text-blue-200 space-y-1 mb-0">
                <li>✅ Create VEX documents from vulnerability data</li>
                <li>✅ Validate against OpenVEX v0.2.0 specification</li>
                <li>✅ Query vulnerability status from VEX documents</li>
                <li>✅ Generate VEX from SBOM documents</li>
                <li>✅ Support for JSON and YAML formats</li>
                <li>✅ Command-line interface and programmatic API</li>
                <li>✅ Merge and compare VEX documents</li>
                <li>✅ Calculate risk scores and statistics</li>
              </ul>
            </div>

            <h2 id="installation">Installation</h2>
            <p>
              The VEX Tool is available in the <code>vex-tool</code> directory of this repository.
            </p>

            <CodeBlock code={installExample} language="bash" />

            <h2 id="cli-usage">Command Line Usage</h2>
            <p>The tool provides several commands for working with VEX documents:</p>

            <h3>Create a VEX Document</h3>
            <CodeBlock 
              code={`./dist/cli.js create \\
  --cve CVE-2024-1234 \\
  --product "pkg:npm/example@1.0.0" \\
  --status not_affected \\
  --justification vulnerable_code_not_in_execute_path \\
  --output my-vex.json`}
              language="bash"
            />

            <h3>Validate a VEX Document</h3>
            <CodeBlock 
              code={`./dist/cli.js validate my-vex.json`}
              language="bash"
            />

            <h3>Query Vulnerability Status</h3>
            <CodeBlock 
              code={`./dist/cli.js query my-vex.json CVE-2024-1234`}
              language="bash"
            />

            <h3>Generate from SBOM</h3>
            <CodeBlock 
              code={`./dist/cli.js generate-from-sbom sbom.json --output vex-from-sbom.json`}
              language="bash"
            />

            <h3>Get Statistics</h3>
            <CodeBlock 
              code={`./dist/cli.js stats my-vex.json`}
              language="bash"
            />

            <h2 id="programmatic-usage">Programmatic Usage</h2>
            <p>
              You can also use the VEX Tool as a library in your Node.js applications:
            </p>

            <CodeBlock code={programmaticExample} language="typescript" />

            <h2 id="example-document">Example VEX Document</h2>
            <p>
              Here's an example of a VEX document created by the tool:
            </p>

            <CodeBlock code={exampleVexDoc} language="json" />

            <h2 id="vex-statuses">VEX Status Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="text-green-900 dark:text-green-100 font-semibold mb-2">not_affected</h4>
                <p className="text-green-800 dark:text-green-200 text-sm">
                  Product is not affected by the vulnerability. Requires justification.
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="text-red-900 dark:text-red-100 font-semibold mb-2">affected</h4>
                <p className="text-red-800 dark:text-red-200 text-sm">
                  Product is affected and needs remediation. Should include action statement.
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="text-blue-900 dark:text-blue-100 font-semibold mb-2">fixed</h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  Vulnerability has been fixed. Include fix details in status notes.
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="text-yellow-900 dark:text-yellow-100 font-semibold mb-2">under_investigation</h4>
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  Status is being investigated. Temporary state during analysis.
                </p>
              </div>
            </div>

            <h2 id="available-commands">Available Commands</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Command
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">create</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Create a new VEX document</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">validate</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Validate VEX document format</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">query</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Query vulnerability status</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">stats</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Display document statistics</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">template</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Generate template document</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">merge</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Merge multiple VEX documents</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">convert</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Convert between formats</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">generate-from-sbom</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Generate VEX from SBOM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 id="use-cases">Use Cases</h2>
            <ul>
              <li><strong>Automated Security Reporting</strong>: Generate VEX documents as part of your CI/CD pipeline</li>
              <li><strong>Vulnerability Triage</strong>: Document which CVEs affect your products and which don't</li>
              <li><strong>Compliance</strong>: Provide evidence of vulnerability analysis for audits</li>
              <li><strong>Customer Communication</strong>: Share VEX documents with customers about security status</li>
              <li><strong>SBOM Integration</strong>: Automatically generate VEX from Software Bill of Materials</li>
            </ul>

            <h2 id="next-steps">Next Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <a 
                href="/tutorials/getting-started/what-is-vex-and-why-it-matters"
                className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  📚 Learn About VEX
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Understand the VEX standard and why it matters for security
                </p>
              </a>
              
              <a 
                href="https://github.com/Dragonwinner/Vexaware/tree/main/vex-tool"
                className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  💻 View Source Code
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore the tool's source code and contribute on GitHub
                </p>
              </a>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                📦 Repository Structure
              </h3>
              <CodeBlock 
                code={`vex-tool/
├── src/
│   ├── VexDocument.ts      # Main document class
│   ├── validators/         # Validation logic
│   ├── generators/         # Document generation
│   ├── utils/              # Query utilities
│   └── cli.ts              # Command-line interface
├── examples/               # Sample documents
├── tests/                  # Test suite
└── README.md               # Documentation`}
                language="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
