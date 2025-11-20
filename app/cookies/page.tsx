import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Footer from '../../components/Footer';

const CookiePolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Vexaware | Cookie Usage & Management</title>
        <meta name="description" content="Learn how Vexaware uses cookies and similar technologies. Understand what cookies we use, why we use them, and how to manage your cookie preferences." />
        <meta name="keywords" content="cookie policy, cookies, tracking, privacy, data collection, cookie consent" />
        <meta property="og:title" content="Cookie Policy - Vexaware" />
        <meta property="og:description" content="Comprehensive cookie policy explaining our use of cookies and tracking technologies" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://vexaware.com/cookies" />
      </Helmet>
      
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[
            { name: 'Cookie Policy', url: '/cookies' }
          ]} />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
              <p className="text-gray-700 mb-6">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit a website. They are widely used to make websites work more efficiently and to 
                provide information to website owners.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Cookies</h2>
              <p className="text-gray-700 mb-4">We use cookies for several purposes:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant advertisements</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-700 mb-4">These cookies are necessary for the website to function properly:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Session management cookies</li>
                  <li>Security cookies</li>
                  <li>Load balancing cookies</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="text-gray-700 mb-4">We use Google Analytics to understand website usage:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>_ga: Distinguishes unique users</li>
                  <li>_gid: Distinguishes unique users</li>
                  <li>_gat: Throttles request rate</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Advertising Cookies</h3>
                <p className="text-gray-700 mb-4">Google AdSense uses cookies to:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-700">
                  <li>Display relevant advertisements</li>
                  <li>Measure ad performance</li>
                  <li>Prevent showing the same ad repeatedly</li>
                  <li>Detect click fraud</li>
                </ul>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-gray-700 mb-4">You can control cookies through:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
                <li><strong>Google Ad Settings:</strong> Manage personalized advertising preferences</li>
                <li><strong>Opt-out Tools:</strong> Use industry opt-out mechanisms</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-700 mb-6">
                Our website may use third-party services that set their own cookies, including:
                Google Analytics, Google AdSense, and social media platforms. These services have 
                their own privacy policies governing their use of cookies.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Consent</h2>
              <p className="text-gray-700 mb-6">
                By using our website, you consent to our use of cookies as described in this policy. 
                You can withdraw your consent at any time by adjusting your browser settings or 
                using our cookie preference center.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this cookie policy from time to time. Any changes will be posted on 
                this page with an updated revision date.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have questions about our use of cookies, please contact us at:
                <br />Email: privacy@vexaware.com
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

export default CookiePolicy;