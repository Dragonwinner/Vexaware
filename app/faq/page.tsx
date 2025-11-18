import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - VEX Aware",
  description: "Common questions about VEX Aware, vulnerability management, and VEX implementation",
  keywords: ["FAQ", "questions", "VEX aware help", "vulnerability management"],
};

export default function FAQPage() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is the difference between VEX and traditional vulnerability scanning?",
          a: "Traditional scanning identifies all known vulnerabilities in your dependencies. VEX adds context about whether those vulnerabilities are actually exploitable in your specific implementation, dramatically reducing false positives."
        },
        {
          q: "How long does VEX Aware implementation take?",
          a: "Most organizations can complete basic implementation in 1-2 weeks. Full integration with CI/CD pipelines typically takes 4-6 weeks depending on complexity."
        },
        {
          q: "What is the average ROI for VEX Aware?",
          a: "Organizations typically see 70-85% reduction in vulnerability investigation time, resulting in significant cost savings. The average ROI is achieved within 3-6 months."
        },
      ],
    },
    {
      category: "Technical",
      questions: [
        {
          q: "Does VEX Aware work with my existing tools?",
          a: "Yes! VEX Aware integrates with popular security scanners, CI/CD platforms, and SBOM tools. We support OpenVEX, CycloneDX, and CSAF formats."
        },
        {
          q: "Can I deploy VEX Aware on-premises?",
          a: "Absolutely. VEX Aware offers both cloud and on-premises deployment options to meet your security and compliance requirements."
        },
        {
          q: "What programming languages does VEX Aware support?",
          a: "VEX Aware is language-agnostic and works with any technology stack. Our API has client libraries for Python, JavaScript, Go, and Java."
        },
      ],
    },
    {
      category: "Compliance",
      questions: [
        {
          q: "Is VEX Aware compliant with SOC 2 and ISO 27001?",
          a: "Yes, VEX Aware is SOC 2 Type II certified and ISO 27001 compliant. We also support HIPAA and PCI DSS requirements."
        },
        {
          q: "How does VEX Aware help with security audits?",
          a: "VEX Aware provides comprehensive audit trails, automated compliance reports, and documented justifications for vulnerability assessments."
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.flatMap((category) =>
              category.questions.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: a,
                },
              }))
            ),
          }),
        }}
      />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ name: "FAQ", url: "/faq" }]} />

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find answers to common questions about VEX Aware and vulnerability management
            </p>
          </div>

          <div className="space-y-12">
            {faqs.map((category) => (
              <section key={category.category}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {category.questions.map((faq, index) => (
                    <div
                      key={index}
                      className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {faq.q}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Can't find what you're looking for? Check out our comprehensive documentation or contact our support team.
            </p>
            <div className="flex gap-4">
              <a
                href="/tutorials/getting-started"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                View Tutorials
              </a>
              <a
                href="/api-docs"
                className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg hover:border-blue-600 dark:hover:border-blue-400 transition-colors font-semibold"
              >
                API Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
