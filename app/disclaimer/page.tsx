import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Footer from '../../components/Footer';

const Disclaimer: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer - Vexaware | Legal Disclaimers & Limitations</title>
        <meta name="description" content="Read our legal disclaimer covering liability limitations, accuracy of information, and terms of use for Vexaware platform and services." />
        <meta name="keywords" content="disclaimer, legal notice, liability, accuracy, terms of use, limitations" />
        <meta property="og:title" content="Disclaimer - Vexaware" />
        <meta property="og:description" content="Legal disclaimer and liability limitations for Vexaware platform" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://vexaware.com/disclaimer" />
      </Helmet>
      
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[
            { name: 'Disclaimer', url: '/disclaimer' }
          ]} />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose max-w-none">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <p className="text-yellow-800">
                  <strong>Important:</strong> Please read this disclaimer carefully before using our services. 
                  By accessing and using Vexaware, you acknowledge and agree to the terms outlined below.
                </p>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. General Information</h2>
              <p className="text-gray-700 mb-6">
                The information on this website is provided on an "as is" basis. To the fullest extent 
                permitted by law, Vexaware excludes all representations, warranties, obligations, and 
                liabilities arising out of or in connection with the information, content, materials, 
                and functions on this website.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Accuracy of Information</h2>
              <p className="text-gray-700 mb-6">
                While we strive to provide accurate and up-to-date information, we make no representations 
                or warranties about the accuracy, completeness, or suitability of the information, software, 
                products, or services contained on this website for any purpose.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Security Scanning Limitations</h2>
              <p className="text-gray-700 mb-4">
                Our vulnerability scanning and security analysis tools are provided as aids to help identify 
                potential security issues. However:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>No security tool can guarantee 100% detection of all vulnerabilities</li>
                <li>False positives and false negatives may occur</li>
                <li>Additional manual testing and verification may be required</li>
                <li>Security landscapes change rapidly; regular updates are recommended</li>
                <li>Users should implement additional security measures beyond our recommendations</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Professional Advice</h2>
              <p className="text-gray-700 mb-6">
                The content on this website does not constitute professional security advice. You should 
                consult qualified cybersecurity professionals for advice specific to your situation. 
                We recommend conducting thorough security assessments before making critical security decisions.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Content and Links</h2>
              <p className="text-gray-700 mb-6">
                Our website may contain links to third-party websites, resources, or services. We have no 
                control over the contents of those sites or resources and accept no responsibility for them 
                or for any loss or damage that may arise from your use of them.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                To the maximum extent permitted by law, Vexaware shall not be liable for any direct, 
                indirect, incidental, consequential, or punitive damages arising out of your access to 
                or use of the website or services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Loss of data or business interruption</li>
                <li>Security breaches not detected by our tools</li>
                <li>Damages resulting from reliance on our analysis</li>
                <li>Financial losses from security incidents</li>
                <li>Regulatory compliance failures</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to Content</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify, update, or remove any content on this website at any time 
                without notice. We also reserve the right to change our services, features, and pricing 
                at any time.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Compliance and Regulatory Matters</h2>
              <p className="text-gray-700 mb-6">
                While our platform provides compliance assistance tools, users remain responsible for 
                ensuring their own compliance with applicable laws, regulations, and industry standards. 
                Our tools and recommendations do not constitute legal or regulatory advice.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Beta Features and Experimental Tools</h2>
              <p className="text-gray-700 mb-6">
                Some features on our platform may be marked as "beta," "experimental," or "preview." 
                These features are provided for testing purposes and may not be fully functional or 
                may contain errors. Use such features at your own risk.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                If you have questions about this disclaimer or need clarification on any of our services, 
                please contact us at:
                <br />Email: legal@vexaware.com
                <br />Address: [Your Business Address]
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
                <p className="text-blue-800">
                  <strong>Note:</strong> This disclaimer is subject to change without notice. 
                  Please review it periodically to stay informed of any updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Disclaimer;