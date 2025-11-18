import { Helmet } from 'react-helmet-async'
import Navigation from '../components/Navigation'

export default function FAQPage() {
  const faqs = [
    {
      question: "What is VEX?",
      answer: "VEX (Vulnerability Exploitability eXchange) is a standard format for communicating the exploitability status of vulnerabilities in software products."
    },
    {
      question: "Why use VEX Aware?",
      answer: "VEX Aware simplifies vulnerability management by providing automated VEX generation, vendor aggregation, and real-time monitoring capabilities."
    },
    {
      question: "Is VEX Aware open source?",
      answer: "VEX Aware offers both community and enterprise editions. Check our licensing page for more details."
    },
  ];

  return (
    <>
      <Helmet>
        <title>FAQ - VEX Aware</title>
        <meta name="description" content="Frequently asked questions about VEX Aware" />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Common questions and answers about VEX Aware
          </p>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
