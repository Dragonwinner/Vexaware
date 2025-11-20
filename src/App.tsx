import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navigation from '../components/Navigation'
import Home from '../app/page'

// Import tutorial pages
import Tutorials from '../app/tutorials/page'
import GettingStarted from '../app/tutorials/getting-started/page'
import TechnicalImplementation from '../app/tutorials/technical-implementation/page'
import Advanced from '../app/tutorials/advanced/page'

// Import getting-started nested pages
import WhatIsVex from '../app/tutorials/getting-started/what-is-vex-and-why-it-matters/page'
import VulnerabilityManagementCrisis from '../app/tutorials/getting-started/vulnerability-management-crisis/page'
import IntroductionToVexAware from '../app/tutorials/getting-started/introduction-to-vex-aware/page'
import InstallingVexAware from '../app/tutorials/getting-started/installing-vex-aware/page'
import DashboardTour from '../app/tutorials/getting-started/dashboard-tour/page'
import FirstVexDocument from '../app/tutorials/getting-started/first-vex-document/page'

// Import technical implementation nested pages
import ArchitectureOverview from '../app/tutorials/technical-implementation/architecture-overview/page'
import DockerDeployment from '../app/tutorials/technical-implementation/docker-deployment/page'
import KubernetesDeployment from '../app/tutorials/technical-implementation/kubernetes-deployment/page'
import DatabaseSetup from '../app/tutorials/technical-implementation/database-setup/page'
import AuthenticationSetup from '../app/tutorials/technical-implementation/authentication-setup/page'
import ApiIntegration from '../app/tutorials/technical-implementation/api-integration/page'
import ConfigurationManagement from '../app/tutorials/technical-implementation/configuration-management/page'
import MonitoringLogging from '../app/tutorials/technical-implementation/monitoring-logging/page'
import PerformanceTuning from '../app/tutorials/technical-implementation/performance-tuning/page'
import BackupRecovery from '../app/tutorials/technical-implementation/backup-recovery/page'
import CustomPolicies from '../app/tutorials/technical-implementation/custom-policies/page'
import AlertConfiguration from '../app/tutorials/technical-implementation/alert-configuration/page'
import WebhookConfiguration from '../app/tutorials/technical-implementation/webhook-configuration/page'
import Troubleshooting from '../app/tutorials/technical-implementation/troubleshooting/page'
import UpgradeProcedures from '../app/tutorials/technical-implementation/upgrade-procedures/page'

// Import advanced tutorial pages
import AdvancedAnalytics from '../app/tutorials/advanced/advanced-analytics/page'
import AutomationOrchestration from '../app/tutorials/advanced/automation-orchestration/page'
import CustomCveDatabase from '../app/tutorials/advanced/custom-cve-database/page'
import BugBounty from '../app/tutorials/advanced/bug-bounty/page'
import CostOptimization from '../app/tutorials/advanced/cost-optimization/page'
import VexAutomation from '../app/tutorials/advanced/vex-automation/page'
import ThreatIntelligence from '../app/tutorials/advanced/threat-intelligence/page'
import ZeroDayManagement from '../app/tutorials/advanced/zero-day-management/page'
import SupplyChainSecurity from '../app/tutorials/advanced/supply-chain-security/page'
import SoarIntegration from '../app/tutorials/advanced/soar-integration/page'
import SecurityChampions from '../app/tutorials/advanced/security-champions/page'
import LicenseCompliance from '../app/tutorials/advanced/license-compliance/page'
import PredictiveSecurity from '../app/tutorials/advanced/predictive-security/page'
import SecurityMetrics from '../app/tutorials/advanced/security-metrics/page'
import PenetrationTesting from '../app/tutorials/advanced/penetration-testing/page'
import MlExploitability from '../app/tutorials/advanced/ml-exploitability/page'
import ExecutiveDashboards from '../app/tutorials/advanced/executive-dashboards/page'
import IncidentResponse from '../app/tutorials/advanced/incident-response/page'
import DevsecopsIntegration from '../app/tutorials/advanced/devsecops-integration/page'
import OpenSourceRisk from '../app/tutorials/advanced/open-source-risk/page'

// Import compliance tutorial pages
import Compliance from '../app/tutorials/compliance/page'
import AuditTrail from '../app/tutorials/compliance/audit-trail/page'
import CisBenchmarks from '../app/tutorials/compliance/cis-benchmarks/page'
import ComplianceAutomation from '../app/tutorials/compliance/compliance-automation/page'
import ComplianceReporting from '../app/tutorials/compliance/compliance-reporting/page'
import EvidenceCollection from '../app/tutorials/compliance/evidence-collection/page'
import HipaaCompliance from '../app/tutorials/compliance/hipaa-compliance/page'
import Iso27001 from '../app/tutorials/compliance/iso-27001/page'
import NistFramework from '../app/tutorials/compliance/nist-framework/page'
import PciDss from '../app/tutorials/compliance/pci-dss/page'
import PolicyEnforcement from '../app/tutorials/compliance/policy-enforcement/page'
import RegulatoryUpdates from '../app/tutorials/compliance/regulatory-updates/page'
import RemediationTracking from '../app/tutorials/compliance/remediation-tracking/page'
import RiskAssessment from '../app/tutorials/compliance/risk-assessment/page'
import Soc2Compliance from '../app/tutorials/compliance/soc2-compliance/page'
import ThirdPartyAudits from '../app/tutorials/compliance/third-party-audits/page'

// Import cloud-native tutorial pages
import CloudNative from '../app/tutorials/cloud-native/page'
import ApiGatewaySecurity from '../app/tutorials/cloud-native/api-gateway-security/page'
import AwsIntegration from '../app/tutorials/cloud-native/aws-integration/page'
import AzureIntegration from '../app/tutorials/cloud-native/azure-integration/page'
import CloudCompliance from '../app/tutorials/cloud-native/cloud-compliance/page'
import CloudSbom from '../app/tutorials/cloud-native/cloud-sbom/page'
import GcpIntegration from '../app/tutorials/cloud-native/gcp-integration/page'
import IacSecurity from '../app/tutorials/cloud-native/iac-security/page'
import MicroservicesArchitecture from '../app/tutorials/cloud-native/microservices-architecture/page'
import MultiCloudStrategy from '../app/tutorials/cloud-native/multi-cloud-strategy/page'
import ServerlessSecurity from '../app/tutorials/cloud-native/serverless-security/page'

// Import kubernetes-containers tutorial pages
import KubernetesContainers from '../app/tutorials/kubernetes-containers/page'
import AdmissionControllers from '../app/tutorials/kubernetes-containers/admission-controllers/page'
import CicdIntegration from '../app/tutorials/kubernetes-containers/cicd-integration/page'
import ContainerSecurityBasics from '../app/tutorials/kubernetes-containers/container-security-basics/page'
import HelmSecurity from '../app/tutorials/kubernetes-containers/helm-security/page'
import ImageScanning from '../app/tutorials/kubernetes-containers/image-scanning/page'
import KubernetesSbom from '../app/tutorials/kubernetes-containers/kubernetes-sbom/page'
import KubernetesSecurityContext from '../app/tutorials/kubernetes-containers/kubernetes-security-context/page'
import NetworkPolicies from '../app/tutorials/kubernetes-containers/network-policies/page'
import PodSecurityPolicies from '../app/tutorials/kubernetes-containers/pod-security-policies/page'
import RegistryIntegration from '../app/tutorials/kubernetes-containers/registry-integration/page'
import RuntimeSecurity from '../app/tutorials/kubernetes-containers/runtime-security/page'
import ServiceMeshSecurity from '../app/tutorials/kubernetes-containers/service-mesh-security/page'

// Import blog article pages
import BlogComplianceAutomation from '../app/blog/compliance-automation/page'
import BlogContainerScanningTools from '../app/blog/container-scanning-tools/page'
import BlogDevsecopsculture from '../app/blog/devsecops-culture/page'
import BlogFalsePositiveProblem from '../app/blog/false-positive-problem/page'
import BlogKubernetesSecurityBestPractices from '../app/blog/kubernetes-security-best-practices/page'
import BlogSbomIntegrationGuide from '../app/blog/sbom-integration-guide/page'
import BlogSupplyChainAttacks2024 from '../app/blog/supply-chain-attacks-2024/page'
import BlogThreatIntelligenceFeeds from '../app/blog/threat-intelligence-feeds/page'
import BlogUnderstandingVexStandard from '../app/blog/understanding-vex-standard/page'
import BlogZeroDayVulnerabilities from '../app/blog/zero-day-vulnerabilities/page'

// Import resource pages
import CliTools from '../app/resources/cli-tools/page'
import VexTemplates from '../app/resources/vex-templates/page'
import SbomSamples from '../app/resources/sbom-samples/page'
import PolicyTemplates from '../app/resources/policy-templates/page'
import IdePlugins from '../app/resources/ide-plugins/page'
import BrowserExtensions from '../app/resources/browser-extensions/page'
import Dashboards from '../app/resources/dashboards/page'
import TestingTools from '../app/resources/testing-tools/page'
import IntegrationScripts from '../app/resources/integration-scripts/page'
import MigrationTools from '../app/resources/migration-tools/page'

// Import use case pages
import EcommercePlatform from '../app/use-cases/ecommerce-platform/page'
import EducationSector from '../app/use-cases/education-sector/page'
import EnterpriseSoftware from '../app/use-cases/enterprise-software/page'
import FinancialServices from '../app/use-cases/financial-services/page'
import GovernmentAgency from '../app/use-cases/government-agency/page'
import HealthcareProvider from '../app/use-cases/healthcare-provider/page'
import Manufacturing from '../app/use-cases/manufacturing/page'
import SaasProvider from '../app/use-cases/saas-provider/page'
import StartupSuccess from '../app/use-cases/startup-success/page'
import Telecommunications from '../app/use-cases/telecommunications/page'

// Import API documentation pages
import ApiAuthentication from '../app/api-docs/authentication/page'
import ApiIntegrations from '../app/api-docs/integrations/page'
import ApiPolicies from '../app/api-docs/policies/page'
import ApiProjects from '../app/api-docs/projects/page'
import ApiReports from '../app/api-docs/reports/page'
import ApiSbom from '../app/api-docs/sbom/page'
import ApiUsers from '../app/api-docs/users/page'
import ApiVexDocuments from '../app/api-docs/vex-documents/page'
import ApiVulnerabilities from '../app/api-docs/vulnerabilities/page'
import ApiWebhooks from '../app/api-docs/webhooks/page'

// Import other pages
import ApiDocs from '../app/api-docs/page'
import UseCases from '../app/use-cases/page'
import Resources from '../app/resources/page'
import Blog from '../app/blog/page'
import FAQ from '../app/faq/page'
import Contact from '../app/contact/page'
import ContactSubmissions from '../app/admin/contact-submissions/page'

// Import AdSense-required pages
import AboutUs from '../app/about/page'
import PrivacyPolicy from '../app/privacy/page'
import TermsOfService from '../app/terms/page'
import Disclaimer from '../app/disclaimer/page'
import CookiePolicy from '../app/cookies/page'
import Sitemap from '../app/sitemap/page'

function App() {
  return (
    <>
      <Helmet>
        <title>VEX Aware Tutorial - Complete Guide to Vulnerability Management</title>
        <meta name="description" content="Learn VEX Aware from basics to advanced. Free tutorials on vulnerability exploitability, SBOM integration, container security, and compliance." />
      </Helmet>
      
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Tutorial Routes */}
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tutorials/getting-started" element={<GettingStarted />} />
        <Route path="/tutorials/getting-started/what-is-vex-and-why-it-matters" element={<WhatIsVex />} />
        <Route path="/tutorials/getting-started/vulnerability-management-crisis" element={<VulnerabilityManagementCrisis />} />
        <Route path="/tutorials/getting-started/introduction-to-vex-aware" element={<IntroductionToVexAware />} />
        <Route path="/tutorials/getting-started/installing-vex-aware" element={<InstallingVexAware />} />
        <Route path="/tutorials/getting-started/dashboard-tour" element={<DashboardTour />} />
        <Route path="/tutorials/getting-started/first-vex-document" element={<FirstVexDocument />} />
        
        <Route path="/tutorials/technical-implementation" element={<TechnicalImplementation />} />
        <Route path="/tutorials/technical-implementation/architecture-overview" element={<ArchitectureOverview />} />
        <Route path="/tutorials/technical-implementation/docker-deployment" element={<DockerDeployment />} />
        <Route path="/tutorials/technical-implementation/kubernetes-deployment" element={<KubernetesDeployment />} />
        <Route path="/tutorials/technical-implementation/database-setup" element={<DatabaseSetup />} />
        <Route path="/tutorials/technical-implementation/authentication-setup" element={<AuthenticationSetup />} />
        <Route path="/tutorials/technical-implementation/api-integration" element={<ApiIntegration />} />
        <Route path="/tutorials/technical-implementation/configuration-management" element={<ConfigurationManagement />} />
        <Route path="/tutorials/technical-implementation/monitoring-logging" element={<MonitoringLogging />} />
        <Route path="/tutorials/technical-implementation/performance-tuning" element={<PerformanceTuning />} />
        <Route path="/tutorials/technical-implementation/backup-recovery" element={<BackupRecovery />} />
        <Route path="/tutorials/technical-implementation/custom-policies" element={<CustomPolicies />} />
        <Route path="/tutorials/technical-implementation/alert-configuration" element={<AlertConfiguration />} />
        <Route path="/tutorials/technical-implementation/webhook-configuration" element={<WebhookConfiguration />} />
        <Route path="/tutorials/technical-implementation/troubleshooting" element={<Troubleshooting />} />
        <Route path="/tutorials/technical-implementation/upgrade-procedures" element={<UpgradeProcedures />} />
        
        <Route path="/tutorials/advanced" element={<Advanced />} />
        <Route path="/tutorials/advanced/advanced-analytics" element={<AdvancedAnalytics />} />
        <Route path="/tutorials/advanced/automation-orchestration" element={<AutomationOrchestration />} />
        <Route path="/tutorials/advanced/custom-cve-database" element={<CustomCveDatabase />} />
        <Route path="/tutorials/advanced/bug-bounty" element={<BugBounty />} />
        <Route path="/tutorials/advanced/cost-optimization" element={<CostOptimization />} />
        <Route path="/tutorials/advanced/vex-automation" element={<VexAutomation />} />
        <Route path="/tutorials/advanced/threat-intelligence" element={<ThreatIntelligence />} />
        <Route path="/tutorials/advanced/zero-day-management" element={<ZeroDayManagement />} />
        <Route path="/tutorials/advanced/supply-chain-security" element={<SupplyChainSecurity />} />
        <Route path="/tutorials/advanced/soar-integration" element={<SoarIntegration />} />
        <Route path="/tutorials/advanced/security-champions" element={<SecurityChampions />} />
        <Route path="/tutorials/advanced/license-compliance" element={<LicenseCompliance />} />
        <Route path="/tutorials/advanced/predictive-security" element={<PredictiveSecurity />} />
        <Route path="/tutorials/advanced/security-metrics" element={<SecurityMetrics />} />
        <Route path="/tutorials/advanced/penetration-testing" element={<PenetrationTesting />} />
        <Route path="/tutorials/advanced/ml-exploitability" element={<MlExploitability />} />
        <Route path="/tutorials/advanced/executive-dashboards" element={<ExecutiveDashboards />} />
        <Route path="/tutorials/advanced/incident-response" element={<IncidentResponse />} />
        <Route path="/tutorials/advanced/devsecops-integration" element={<DevsecopsIntegration />} />
        <Route path="/tutorials/advanced/open-source-risk" element={<OpenSourceRisk />} />
        
        <Route path="/tutorials/compliance" element={<Compliance />} />
        <Route path="/tutorials/compliance/audit-trail" element={<AuditTrail />} />
        <Route path="/tutorials/compliance/cis-benchmarks" element={<CisBenchmarks />} />
        <Route path="/tutorials/compliance/compliance-automation" element={<ComplianceAutomation />} />
        <Route path="/tutorials/compliance/compliance-reporting" element={<ComplianceReporting />} />
        <Route path="/tutorials/compliance/evidence-collection" element={<EvidenceCollection />} />
        <Route path="/tutorials/compliance/hipaa-compliance" element={<HipaaCompliance />} />
        <Route path="/tutorials/compliance/iso-27001" element={<Iso27001 />} />
        <Route path="/tutorials/compliance/nist-framework" element={<NistFramework />} />
        <Route path="/tutorials/compliance/pci-dss" element={<PciDss />} />
        <Route path="/tutorials/compliance/policy-enforcement" element={<PolicyEnforcement />} />
        <Route path="/tutorials/compliance/regulatory-updates" element={<RegulatoryUpdates />} />
        <Route path="/tutorials/compliance/remediation-tracking" element={<RemediationTracking />} />
        <Route path="/tutorials/compliance/risk-assessment" element={<RiskAssessment />} />
        <Route path="/tutorials/compliance/soc2-compliance" element={<Soc2Compliance />} />
        <Route path="/tutorials/compliance/third-party-audits" element={<ThirdPartyAudits />} />
        
        <Route path="/tutorials/cloud-native" element={<CloudNative />} />
        <Route path="/tutorials/cloud-native/api-gateway-security" element={<ApiGatewaySecurity />} />
        <Route path="/tutorials/cloud-native/aws-integration" element={<AwsIntegration />} />
        <Route path="/tutorials/cloud-native/azure-integration" element={<AzureIntegration />} />
        <Route path="/tutorials/cloud-native/cloud-compliance" element={<CloudCompliance />} />
        <Route path="/tutorials/cloud-native/cloud-sbom" element={<CloudSbom />} />
        <Route path="/tutorials/cloud-native/gcp-integration" element={<GcpIntegration />} />
        <Route path="/tutorials/cloud-native/iac-security" element={<IacSecurity />} />
        <Route path="/tutorials/cloud-native/microservices-architecture" element={<MicroservicesArchitecture />} />
        <Route path="/tutorials/cloud-native/multi-cloud-strategy" element={<MultiCloudStrategy />} />
        <Route path="/tutorials/cloud-native/serverless-security" element={<ServerlessSecurity />} />
        
        <Route path="/tutorials/kubernetes-containers" element={<KubernetesContainers />} />
        <Route path="/tutorials/kubernetes-containers/admission-controllers" element={<AdmissionControllers />} />
        <Route path="/tutorials/kubernetes-containers/cicd-integration" element={<CicdIntegration />} />
        <Route path="/tutorials/kubernetes-containers/container-security-basics" element={<ContainerSecurityBasics />} />
        <Route path="/tutorials/kubernetes-containers/helm-security" element={<HelmSecurity />} />
        <Route path="/tutorials/kubernetes-containers/image-scanning" element={<ImageScanning />} />
        <Route path="/tutorials/kubernetes-containers/kubernetes-sbom" element={<KubernetesSbom />} />
        <Route path="/tutorials/kubernetes-containers/kubernetes-security-context" element={<KubernetesSecurityContext />} />
        <Route path="/tutorials/kubernetes-containers/network-policies" element={<NetworkPolicies />} />
        <Route path="/tutorials/kubernetes-containers/pod-security-policies" element={<PodSecurityPolicies />} />
        <Route path="/tutorials/kubernetes-containers/registry-integration" element={<RegistryIntegration />} />
        <Route path="/tutorials/kubernetes-containers/runtime-security" element={<RuntimeSecurity />} />
        <Route path="/tutorials/kubernetes-containers/service-mesh-security" element={<ServiceMeshSecurity />} />
        
        {/* Resource Routes */}
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/cli-tools" element={<CliTools />} />
        <Route path="/resources/vex-templates" element={<VexTemplates />} />
        <Route path="/resources/sbom-samples" element={<SbomSamples />} />
        <Route path="/resources/policy-templates" element={<PolicyTemplates />} />
        <Route path="/resources/ide-plugins" element={<IdePlugins />} />
        <Route path="/resources/browser-extensions" element={<BrowserExtensions />} />
        <Route path="/resources/dashboards" element={<Dashboards />} />
        <Route path="/resources/testing-tools" element={<TestingTools />} />
        <Route path="/resources/integration-scripts" element={<IntegrationScripts />} />
        <Route path="/resources/migration-tools" element={<MigrationTools />} />
        
        {/* Use Case Routes */}
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/use-cases/ecommerce-platform" element={<EcommercePlatform />} />
        <Route path="/use-cases/education-sector" element={<EducationSector />} />
        <Route path="/use-cases/enterprise-software" element={<EnterpriseSoftware />} />
        <Route path="/use-cases/financial-services" element={<FinancialServices />} />
        <Route path="/use-cases/government-agency" element={<GovernmentAgency />} />
        <Route path="/use-cases/healthcare-provider" element={<HealthcareProvider />} />
        <Route path="/use-cases/manufacturing" element={<Manufacturing />} />
        <Route path="/use-cases/saas-provider" element={<SaasProvider />} />
        <Route path="/use-cases/startup-success" element={<StartupSuccess />} />
        <Route path="/use-cases/telecommunications" element={<Telecommunications />} />
        
        {/* API Documentation Routes */}
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route path="/api-docs/authentication" element={<ApiAuthentication />} />
        <Route path="/api-docs/integrations" element={<ApiIntegrations />} />
        <Route path="/api-docs/policies" element={<ApiPolicies />} />
        <Route path="/api-docs/projects" element={<ApiProjects />} />
        <Route path="/api-docs/reports" element={<ApiReports />} />
        <Route path="/api-docs/sbom" element={<ApiSbom />} />
        <Route path="/api-docs/users" element={<ApiUsers />} />
        <Route path="/api-docs/vex-documents" element={<ApiVexDocuments />} />
        <Route path="/api-docs/vulnerabilities" element={<ApiVulnerabilities />} />
        <Route path="/api-docs/webhooks" element={<ApiWebhooks />} />
        
        {/* Other Routes */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/compliance-automation" element={<BlogComplianceAutomation />} />
        <Route path="/blog/container-scanning-tools" element={<BlogContainerScanningTools />} />
        <Route path="/blog/devsecops-culture" element={<BlogDevsecopsculture />} />
        <Route path="/blog/false-positive-problem" element={<BlogFalsePositiveProblem />} />
        <Route path="/blog/kubernetes-security-best-practices" element={<BlogKubernetesSecurityBestPractices />} />
        <Route path="/blog/sbom-integration-guide" element={<BlogSbomIntegrationGuide />} />
        <Route path="/blog/supply-chain-attacks-2024" element={<BlogSupplyChainAttacks2024 />} />
        <Route path="/blog/threat-intelligence-feeds" element={<BlogThreatIntelligenceFeeds />} />
        <Route path="/blog/understanding-vex-standard" element={<BlogUnderstandingVexStandard />} />
        <Route path="/blog/zero-day-vulnerabilities" element={<BlogZeroDayVulnerabilities />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* AdSense Required Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/sitemap" element={<Sitemap />} />
        
        {/* Admin Routes */}
        <Route path="/admin/contact-submissions" element={<ContactSubmissions />} />
      </Routes>
    </>
  )
}

export default App
