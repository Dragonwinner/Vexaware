import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Footer from '../../components/Footer';

const TermsOfService: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Vexaware | Legal Terms & Conditions</title>
        <meta name="description" content="Read our comprehensive terms of service and conditions for using Vexaware platform. Understand your rights and responsibilities as a user." />
        <meta name="keywords" content="terms of service, legal terms, conditions, user agreement, terms and conditions" />
        <meta property="og:title" content="Terms of Service - Vexaware" />
        <meta property="og:description" content="Legal terms and conditions for using Vexaware platform" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://vexaware.com/terms" />
      </Helmet>
      
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[
            { name: 'Terms of Service', url: '/terms' }
          ]} />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using the Vexaware platform, you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-6">
                Vexaware provides vulnerability management, security scanning, and compliance tools 
                for software development teams. Our platform includes SBOM generation, VEX document 
                creation, and security analytics.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 mb-4">To use certain features, you must:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Create an account with accurate information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 mb-4">You agree not to use the service to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for competitive intelligence</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 mb-6">
                The service and its original content, features, and functionality are owned by Vexaware 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Privacy Policy</h2>
              <p className="text-gray-700 mb-6">
                Your privacy is important to us. Please review our Privacy Policy, which also governs 
                your use of the service, to understand our practices.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                In no event shall Vexaware be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 mb-6">
                We may terminate or suspend your account immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms of Service, please contact us at:
                <br />Email: legal@vexaware.com
                <br />Address: [Your Business Address]
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;