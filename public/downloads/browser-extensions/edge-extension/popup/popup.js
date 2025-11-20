// VEX Aware Browser Extension - Popup JavaScript

class VexAwarePopup {
    constructor() {
        this.isLoading = false;
        this.currentTab = null;
        this.init();
    }

    async init() {
        await this.getCurrentTab();
        this.setupEventListeners();
        this.updatePageInfo();
        this.checkPageStatus();
    }

    async getCurrentTab() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            this.currentTab = tab;
        } catch (error) {
            console.error('Error getting current tab:', error);
        }
    }

    setupEventListeners() {
        // Action buttons
        document.getElementById('validateBtn').addEventListener('click', () => this.validateDocument());
        document.getElementById('generateBtn').addEventListener('click', () => this.generateDocument());
        document.getElementById('scanBtn').addEventListener('click', () => this.scanVulnerabilities());
        
        // Footer buttons
        document.getElementById('settingsBtn').addEventListener('click', () => this.openSettings());
        document.getElementById('helpBtn').addEventListener('click', () => this.openHelp());
    }

    async updatePageInfo() {
        try {
            // Get page information from content script
            const response = await chrome.tabs.sendMessage(this.currentTab.id, {
                action: 'getPageInfo'
            });

            if (response) {
                document.getElementById('vexCount').textContent = response.vexCount || 0;
                document.getElementById('depCount').textContent = response.dependencyCount || 0;
            }
        } catch (error) {
            console.error('Error updating page info:', error);
            // Fallback values
            document.getElementById('vexCount').textContent = '0';
            document.getElementById('depCount').textContent = '0';
        }
    }

    async checkPageStatus() {
        const statusIndicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');
        const pageStatus = document.getElementById('pageStatus');

        try {
            // Check if current page has VEX documents or is a development page
            if (this.currentTab.url.includes('github.com') || 
                this.currentTab.url.includes('gitlab.com') ||
                this.currentTab.url.includes('package.json') ||
                this.currentTab.url.includes('composer.json') ||
                this.currentTab.url.includes('requirements.txt')) {
                
                statusIndicator.className = 'status-indicator';
                statusText.textContent = 'VEX Ready';
                pageStatus.textContent = 'Development Page';
            } else if (this.currentTab.url.includes('.vex') || 
                      this.currentTab.url.includes('vex.json')) {
                
                statusIndicator.className = 'status-indicator';
                statusText.textContent = 'VEX Document Found';
                pageStatus.textContent = 'VEX Document';
            } else {
                statusIndicator.className = 'status-indicator warning';
                statusText.textContent = 'No VEX Context';
                pageStatus.textContent = 'General Page';
            }
        } catch (error) {
            statusIndicator.className = 'status-indicator error';
            statusText.textContent = 'Error';
            pageStatus.textContent = 'Unknown';
        }
    }

    async validateDocument() {
        if (this.isLoading) return;
        
        this.setLoading(true, 'Validating VEX document...');
        
        try {
            const response = await chrome.runtime.sendMessage({
                action: 'validateVex',
                url: this.currentTab.url
            });

            this.showResults('Validation Results', response.results || response.message);
            
            if (response.success) {
                this.updateStatus('success', 'Validation Complete');
            } else {
                this.updateStatus('warning', 'Validation Issues Found');
            }
        } catch (error) {
            this.showResults('Validation Error', `Error: ${error.message}`);
            this.updateStatus('error', 'Validation Failed');
        } finally {
            this.setLoading(false);
        }
    }

    async generateDocument() {
        if (this.isLoading) return;
        
        this.setLoading(true, 'Generating VEX document...');
        
        try {
            const response = await chrome.runtime.sendMessage({
                action: 'generateVex',
                url: this.currentTab.url
            });

            if (response.success) {
                this.showResults('Generation Results', 'VEX document generated successfully!');
                this.updateStatus('success', 'Document Generated');
                
                // Trigger download
                if (response.downloadUrl) {
                    chrome.downloads.download({
                        url: response.downloadUrl,
                        filename: response.filename || 'vex-document.json'
                    });
                }
            } else {
                this.showResults('Generation Error', response.message || 'Failed to generate VEX document');
                this.updateStatus('error', 'Generation Failed');
            }
        } catch (error) {
            this.showResults('Generation Error', `Error: ${error.message}`);
            this.updateStatus('error', 'Generation Failed');
        } finally {
            this.setLoading(false);
        }
    }

    async scanVulnerabilities() {
        if (this.isLoading) return;
        
        this.setLoading(true, 'Scanning for vulnerabilities...');
        
        try {
            const response = await chrome.runtime.sendMessage({
                action: 'scanVulnerabilities',
                url: this.currentTab.url
            });

            if (response.success) {
                const vulnerabilities = response.vulnerabilities || [];
                const resultsText = vulnerabilities.length > 0 
                    ? `Found ${vulnerabilities.length} vulnerabilities:\n${vulnerabilities.map(v => `• ${v.id}: ${v.title}`).join('\n')}`
                    : 'No vulnerabilities found!';
                
                this.showResults('Vulnerability Scan Results', resultsText);
                
                if (vulnerabilities.length > 0) {
                    this.updateStatus('warning', `${vulnerabilities.length} Issues Found`);
                } else {
                    this.updateStatus('success', 'No Issues Found');
                }
            } else {
                this.showResults('Scan Error', response.message || 'Failed to scan for vulnerabilities');
                this.updateStatus('error', 'Scan Failed');
            }
        } catch (error) {
            this.showResults('Scan Error', `Error: ${error.message}`);
            this.updateStatus('error', 'Scan Failed');
        } finally {
            this.setLoading(false);
        }
    }

    showResults(title, content) {
        const resultsSection = document.getElementById('resultsSection');
        const resultsContent = document.getElementById('resultsContent');
        
        resultsContent.innerHTML = `
            <div class="result-item">
                <strong>${title}</strong><br>
                <pre style="white-space: pre-wrap; margin-top: 8px; font-family: monospace; font-size: 12px;">${content}</pre>
            </div>
        `;
        
        resultsSection.style.display = 'block';
        resultsSection.classList.add('fade-in');
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            resultsSection.style.display = 'none';
            resultsSection.classList.remove('fade-in');
        }, 10000);
    }

    updateStatus(type, message) {
        const statusIndicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');
        
        statusIndicator.className = `status-indicator ${type}`;
        statusText.textContent = message;
        
        // Reset to default after 5 seconds
        setTimeout(() => {
            this.checkPageStatus();
        }, 5000);
    }

    setLoading(loading, message = '') {
        this.isLoading = loading;
        const buttons = document.querySelectorAll('.action-btn');
        const statusText = document.getElementById('statusText');
        
        buttons.forEach(btn => {
            btn.disabled = loading;
            btn.classList.toggle('loading', loading);
        });
        
        if (loading) {
            statusText.textContent = message || 'Working...';
        }
    }

    openSettings() {
        chrome.runtime.openOptionsPage();
    }

    openHelp() {
        chrome.tabs.create({
            url: 'https://vexaware.com/resources/browser-extensions'
        });
    }
}

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new VexAwarePopup();
});

// Handle messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updatePopup') {
        // Update popup with new information
        if (request.data) {
            Object.keys(request.data).forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = request.data[key];
                }
            });
        }
    }
    
    sendResponse({ received: true });
});

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case '1':
                event.preventDefault();
                document.getElementById('validateBtn').click();
                break;
            case '2':
                event.preventDefault();
                document.getElementById('generateBtn').click();
                break;
            case '3':
                event.preventDefault();
                document.getElementById('scanBtn').click();
                break;
        }
    }
});

// Handle extension icon clicks
chrome.action.onClicked.addListener((tab) => {
    // This is handled by the popup, but we can add additional logic here if needed
});

// Update page info when tab changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.active) {
        // Refresh popup if it's open
        if (document.querySelector('.container')) {
            setTimeout(() => {
                const popup = new VexAwarePopup();
            }, 500);
        }
    }
});