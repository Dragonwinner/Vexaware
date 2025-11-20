// VEX Aware Browser Extension - Background Service Worker
// Handles extension lifecycle, API communication, and context menus

class VexAwareExtension {
    constructor() {
        this.apiEndpoint = 'https://api.vexaware.com/v2';
        this.isEnabled = true;
        this.cache = new Map();
        this.init();
    }

    init() {
        // Set up extension lifecycle listeners
        chrome.runtime.onInstalled.addListener(this.handleInstall.bind(this));
        chrome.runtime.onStartup.addListener(this.handleStartup.bind(this));
        
        // Set up message passing
        chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
        
        // Set up context menus
        this.setupContextMenus();
        
        // Set up commands
        chrome.commands.onCommand.addListener(this.handleCommand.bind(this));
        
        // Set up alarms for periodic tasks
        chrome.alarms.onAlarm.addListener(this.handleAlarm.bind(this));
        
        console.log('VEX Aware extension background script initialized');
    }

    handleInstall(details) {
        if (details.reason === 'install') {
            // First-time installation
            this.showWelcomeNotification();
            this.setDefaultSettings();
        } else if (details.reason === 'update') {
            // Extension updated
            this.handleUpdate(details);
        }
    }

    handleStartup() {
        // Extension started
        this.loadSettings();
        this.schedulePeriodicTasks();
    }

    setupContextMenus() {
        chrome.contextMenus.create({
            id: 'vexaware-validate',
            title: 'Validate VEX Document',
            contexts: ['page', 'selection'],
            documentUrlPatterns: ['*://*/*']
        });

        chrome.contextMenus.create({
            id: 'vexaware-generate',
            title: 'Generate VEX from Selection',
            contexts: ['selection'],
            documentUrlPatterns: ['*://*/*']
        });

        chrome.contextMenus.create({
            id: 'vexaware-scan',
            title: 'Scan Page for Vulnerabilities',
            contexts: ['page'],
            documentUrlPatterns: ['*://*/*']
        });

        chrome.contextMenus.onClicked.addListener(this.handleContextMenu.bind(this));
    }

    async handleContextMenu(info, tab) {
        switch (info.menuItemId) {
            case 'vexaware-validate':
                await this.validatePageVex(tab);
                break;
            case 'vexaware-generate':
                await this.generateVexFromSelection(info, tab);
                break;
            case 'vexaware-scan':
                await this.scanPageForVulnerabilities(tab);
                break;
        }
    }

    async handleMessage(request, sender, sendResponse) {
        try {
            switch (request.action) {
                case 'validateVex':
                    const validationResult = await this.validateVexDocument(request.content);
                    sendResponse({ success: true, result: validationResult });
                    break;

                case 'generateVex':
                    const generated = await this.generateVexDocument(request.data);
                    sendResponse({ success: true, result: generated });
                    break;

                case 'scanVulnerabilities':
                    const scanResult = await this.scanForVulnerabilities(request.content);
                    sendResponse({ success: true, result: scanResult });
                    break;

                case 'getSettings':
                    const settings = await this.getSettings();
                    sendResponse({ success: true, settings });
                    break;

                case 'updateSettings':
                    await this.updateSettings(request.settings);
                    sendResponse({ success: true });
                    break;

                default:
                    sendResponse({ success: false, error: 'Unknown action' });
            }
        } catch (error) {
            console.error('Background script error:', error);
            sendResponse({ success: false, error: error.message });
        }

        return true; // Keep message channel open for async response
    }

    async handleCommand(command) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        switch (command) {
            case 'validate_vex':
                await this.validatePageVex(tab);
                break;
            case 'generate_vex':
                await this.generateVexFromPage(tab);
                break;
        }
    }

    async validatePageVex(tab) {
        try {
            // Inject content script to extract VEX content
            const [result] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: this.extractVexFromPage
            });

            if (result.result) {
                const validation = await this.validateVexDocument(result.result);
                this.showValidationResult(validation);
            } else {
                this.showNotification('No VEX document found on this page', 'warning');
            }
        } catch (error) {
            console.error('Validation error:', error);
            this.showNotification('Validation failed: ' + error.message, 'error');
        }
    }

    async generateVexFromSelection(info, tab) {
        try {
            const selection = info.selectionText;
            if (!selection) {
                this.showNotification('Please select text to generate VEX from', 'warning');
                return;
            }

            const vexDocument = await this.generateVexDocument({
                source: 'selection',
                content: selection,
                url: tab.url,
                title: tab.title
            });

            // Open generated VEX in new tab
            const blob = new Blob([JSON.stringify(vexDocument, null, 2)], {
                type: 'application/json'
            });
            
            const dataUrl = URL.createObjectURL(blob);
            
            chrome.downloads.download({
                url: dataUrl,
                filename: `vex-document-${Date.now()}.json`,
                saveAs: true
            });

            this.showNotification('VEX document generated and downloaded', 'success');
        } catch (error) {
            console.error('Generation error:', error);
            this.showNotification('Generation failed: ' + error.message, 'error');
        }
    }

    async scanPageForVulnerabilities(tab) {
        try {
            // Inject content script to extract dependency information
            const [result] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: this.extractDependencies
            });

            if (result.result && result.result.length > 0) {
                const scanResult = await this.scanForVulnerabilities(result.result);
                this.showScanResults(scanResult);
            } else {
                this.showNotification('No dependencies found to scan', 'info');
            }
        } catch (error) {
            console.error('Scan error:', error);
            this.showNotification('Scan failed: ' + error.message, 'error');
        }
    }

    // Content extraction functions (injected into page)
    extractVexFromPage() {
        // Look for VEX documents in various formats
        const vexSelectors = [
            'script[type="application/vnd.vex+json"]',
            'script[type="application/json"][data-vex]',
            '[data-vex-document]'
        ];

        for (const selector of vexSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                try {
                    const content = element.textContent || element.innerHTML;
                    return JSON.parse(content);
                } catch (e) {
                    continue;
                }
            }
        }

        // Check for JSON content that looks like VEX
        const scriptTags = document.querySelectorAll('script[type="application/json"]');
        for (const script of scriptTags) {
            try {
                const content = JSON.parse(script.textContent);
                if (content['@context'] && content['@context'].includes('openvex.dev')) {
                    return content;
                }
            } catch (e) {
                continue;
            }
        }

        return null;
    }

    extractDependencies() {
        const dependencies = [];

        // Extract from package.json if visible
        const packageJsonScript = document.querySelector('script[type="application/json"]:not([src])');
        if (packageJsonScript) {
            try {
                const pkg = JSON.parse(packageJsonScript.textContent);
                if (pkg.dependencies) {
                    Object.entries(pkg.dependencies).forEach(([name, version]) => {
                        dependencies.push(`pkg:npm/${name}@${version.replace(/[^\\d\\.]/g, '')}`);
                    });
                }
            } catch (e) {
                // Ignore parsing errors
            }
        }

        // Extract from HTML meta tags
        const metaTags = document.querySelectorAll('meta[name*="dependency"], meta[property*="dependency"]');
        metaTags.forEach(meta => {
            const content = meta.getAttribute('content');
            if (content) {
                dependencies.push(content);
            }
        });

        return dependencies;
    }

    async validateVexDocument(vexContent) {
        // Basic VEX validation
        const errors = [];
        const warnings = [];

        try {
            if (typeof vexContent === 'string') {
                vexContent = JSON.parse(vexContent);
            }

            // Required fields validation
            if (!vexContent['@context']) {
                errors.push('Missing required @context field');
            } else if (vexContent['@context'] !== 'https://openvex.dev/ns') {
                warnings.push('Unexpected @context value');
            }

            if (!vexContent.statements || !Array.isArray(vexContent.statements)) {
                errors.push('Missing or invalid statements array');
            } else {
                vexContent.statements.forEach((stmt, index) => {
                    if (!stmt.vulnerability) {
                        errors.push(`Statement ${index}: Missing vulnerability`);
                    }
                    if (!stmt.products || !Array.isArray(stmt.products)) {
                        errors.push(`Statement ${index}: Missing or invalid products`);
                    }
                    if (!stmt.status) {
                        errors.push(`Statement ${index}: Missing status`);
                    } else if (!['affected', 'not_affected', 'fixed', 'under_investigation'].includes(stmt.status)) {
                        errors.push(`Statement ${index}: Invalid status value`);
                    }
                });
            }

            return {
                valid: errors.length === 0,
                errors,
                warnings,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            return {
                valid: false,
                errors: ['Invalid JSON: ' + error.message],
                warnings: [],
                timestamp: new Date().toISOString()
            };
        }
    }

    async generateVexDocument(data) {
        // Generate a basic VEX document template
        const template = {
            '@context': 'https://openvex.dev/ns',
            '@id': `https://example.com/vex/${Date.now()}`,
            'author': 'VEX Aware Browser Extension',
            'timestamp': new Date().toISOString(),
            'version': '1.0.0',
            'statements': []
        };

        if (data.source === 'selection') {
            // Try to extract CVE IDs from selection
            const cveMatches = data.content.match(/CVE-\\d{4}-\\d{4,}/g) || [];
            
            cveMatches.forEach(cve => {
                template.statements.push({
                    vulnerability: {
                        name: cve,
                        '@id': `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cve}`
                    },
                    products: [{
                        '@id': `pkg:generic/web-application@1.0.0`,
                        identifiers: {
                            purl: `pkg:generic/web-application@1.0.0`
                        }
                    }],
                    status: 'under_investigation',
                    impact_statement: 'Impact assessment pending',
                    action_statement: 'Investigation required'
                });
            });
        }

        return template;
    }

    async scanForVulnerabilities(dependencies) {
        // Mock vulnerability scanning (in real implementation, would call vulnerability databases)
        const results = {
            scanned: dependencies.length,
            vulnerabilities: [],
            timestamp: new Date().toISOString()
        };

        // Simulate finding some vulnerabilities
        dependencies.forEach(dep => {
            if (Math.random() > 0.8) { // 20% chance of finding a vulnerability
                results.vulnerabilities.push({
                    product: dep,
                    vulnerability: `CVE-2024-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
                    severity: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'][Math.floor(Math.random() * 4)],
                    description: 'Simulated vulnerability for demonstration'
                });
            }
        });

        return results;
    }

    showValidationResult(result) {
        const message = result.valid 
            ? 'VEX document is valid ✓'
            : `VEX validation failed with ${result.errors.length} error(s)`;
        
        this.showNotification(message, result.valid ? 'success' : 'error');
    }

    showScanResults(results) {
        const message = results.vulnerabilities.length > 0
            ? `Found ${results.vulnerabilities.length} vulnerabilities in ${results.scanned} dependencies`
            : `No vulnerabilities found in ${results.scanned} dependencies`;
        
        this.showNotification(message, results.vulnerabilities.length > 0 ? 'warning' : 'success');
    }

    showNotification(message, type = 'info') {
        const iconUrl = `icons/icon-${type === 'error' ? '32' : '48'}.png`;
        
        chrome.notifications.create({
            type: 'basic',
            iconUrl,
            title: 'VEX Aware',
            message
        });
    }

    showWelcomeNotification() {
        this.showNotification('VEX Aware extension installed successfully! Right-click on any page to get started.', 'success');
    }

    async setDefaultSettings() {
        const defaultSettings = {
            apiEndpoint: this.apiEndpoint,
            enableAutoScan: true,
            enableNotifications: true,
            validateOnPageLoad: false,
            theme: 'auto'
        };

        await chrome.storage.sync.set({ vexAwareSettings: defaultSettings });
    }

    async getSettings() {
        const result = await chrome.storage.sync.get(['vexAwareSettings']);
        return result.vexAwareSettings || {};
    }

    async updateSettings(settings) {
        await chrome.storage.sync.set({ vexAwareSettings: settings });
    }

    async loadSettings() {
        const settings = await this.getSettings();
        this.isEnabled = settings.enableAutoScan !== false;
    }

    schedulePeriodicTasks() {
        // Schedule periodic vulnerability database updates
        chrome.alarms.create('updateVulnDb', { periodInMinutes: 60 });
    }

    handleAlarm(alarm) {
        switch (alarm.name) {
            case 'updateVulnDb':
                this.updateVulnerabilityDatabase();
                break;
        }
    }

    async updateVulnerabilityDatabase() {
        // In a real implementation, this would fetch latest vulnerability data
        console.log('Updating vulnerability database...');
    }

    handleUpdate(details) {
        console.log('Extension updated from', details.previousVersion, 'to', chrome.runtime.getManifest().version);
    }
}

// Initialize the extension
const vexAwareExtension = new VexAwareExtension();