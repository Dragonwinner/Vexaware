import React from 'react';
import { Helmet } from 'react-helmet';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import Footer from '../../components/Footer';

const AboutUs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Vexaware | Cybersecurity & Vulnerability Management Platform</title>
        <meta name="description" content="Learn about Vexaware's mission to revolutionize cybersecurity through advanced vulnerability management, SBOM generation, and compliance automation for modern development teams." />
        <meta name="keywords" content="about vexaware, cybersecurity company, vulnerability management, SBOM, VEX, security platform, team" />
        <meta property="og:title" content="About Vexaware - Leading Cybersecurity Platform" />
        <meta property="og:description" content="Discover how Vexaware is transforming cybersecurity with innovative vulnerability management solutions" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://vexaware.com/about" />
      </Helmet>
      
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumbs items={[
            { name: 'About Us', url: '/about' }
          ]} />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">About Vexaware</h1>
            
            <div className="prose max-w-none">
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 text-lg mb-6">
                  At Vexaware, we're revolutionizing cybersecurity by providing comprehensive vulnerability 
                  management solutions that empower development teams to build secure, compliant software 
                  from the ground up. Our platform bridges the gap between security and development, 
                  making enterprise-grade security accessible to organizations of all sizes.
                </p>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Do</h2>
                <p className="text-gray-700 mb-4">
                  Vexaware specializes in advanced vulnerability management, offering:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700">
                  <li><strong>SBOM Generation:</strong> Automated Software Bill of Materials creation and management</li>
                  <li><strong>VEX Documents:</strong> Vulnerability Exploitability eXchange for accurate risk assessment</li>
                  <li><strong>Compliance Automation:</strong> Streamlined compliance with industry standards</li>
                  <li><strong>Security Analytics:</strong> Advanced threat intelligence and vulnerability analysis</li>
                  <li><strong>Integration Tools:</strong> Seamless integration with existing development workflows</li>
                  <li><strong>Container Security:</strong> Comprehensive container and Kubernetes security scanning</li>
                </ul>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-700 mb-6">
                  We envision a world where security is seamlessly integrated into every stage of the 
                  software development lifecycle. By providing intelligent, automated security tools, 
                  we aim to eliminate the traditional friction between security and development teams, 
                  enabling faster, more secure software delivery.
                </p>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Vexaware?</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Innovation</h3>
                    <p className="text-blue-800">Cutting-edge technology and continuous innovation in cybersecurity</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Expertise</h3>
                    <p className="text-green-800">Deep cybersecurity expertise with industry-proven solutions</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Integration</h3>
                    <p className="text-purple-800">Seamless integration with existing development tools and workflows</p>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">Support</h3>
                    <p className="text-orange-800">Dedicated support and comprehensive documentation</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Industries We Serve</h2>
                <p className="text-gray-700 mb-4">Our platform serves diverse industries including:</p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Financial Services</h4>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Healthcare</h4>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold text-gray-900">E-commerce</h4>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Government</h4>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Manufacturing</h4>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Technology</h4>
                  </div>
                </div>
              </div>
              
              <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Company Information</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Founded</h4>
                      <p className="text-gray-700">2024</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Headquarters</h4>
                      <p className="text-gray-700">[Your Location]</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                      <p className="text-gray-700">info@vexaware.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                      <p className="text-gray-700">support@vexaware.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center bg-blue-600 text-white p-8 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Ready to Secure Your Development Pipeline?</h2>
                <p className="text-lg mb-6">Join thousands of developers who trust Vexaware for their security needs.</p>
                <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Contact Us Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;