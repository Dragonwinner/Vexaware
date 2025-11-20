// VEX Aware Browser Extension - Options Page JavaScript

class VexAwareOptions {
    constructor() {
        this.settings = {
            // General settings
            enableNotifications: true,
            enableContextMenu: true,
            enablePageHighlighting: true,
            enableAutoScan: false,
            updateInterval: 15,
            
            // Validation settings
            validationMode: 'standard',
            validateSchemas: true,
            validateSignatures: false,
            showValidationDetails: true,
            
            // Scanning settings
            useNVD: true,
            useOSV: true,
            useGitHubAdvisories: true,
            useSnyk: false,
            scanSeverity: 'medium',
            excludeDevDependencies: false,
            enableCacheScanning: true,
            
            // Integration settings
            apiEndpoint: 'https://api.vexaware.com/v1',
            apiKey: '',
            shareAnonymousData: false,
            exportFormat: 'json'
        };
        
        this.init();
    }

    async init() {
        await this.loadSettings();
        this.setupEventListeners();
        this.populateForm();
        this.updateBuildInfo();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Settings form elements
        document.querySelectorAll('input, select').forEach(element => {
            element.addEventListener('change', () => this.updateSetting(element));
        });

        // Footer buttons
        document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());
        document.getElementById('resetSettings').addEventListener('click', () => this.resetSettings());
        document.getElementById('exportSettings').addEventListener('click', () => this.exportSettings());
        document.getElementById('importSettings').addEventListener('click', () => this.importSettings());

        // File input for import
        document.getElementById('importFileInput').addEventListener('change', (e) => this.handleImportFile(e));
    }

    switchTab(tabId) {
        // Update nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }

    async loadSettings() {
        try {
            const stored = await chrome.storage.sync.get(this.settings);
            this.settings = { ...this.settings, ...stored };
        } catch (error) {
            console.error('Error loading settings:', error);
            this.showNotification('Error loading settings', 'error');
        }
    }

    populateForm() {
        Object.keys(this.settings).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = this.settings[key];
                } else {
                    element.value = this.settings[key];
                }
            }
        });
    }

    updateSetting(element) {
        const key = element.id;
        let value = element.value;

        if (element.type === 'checkbox') {
            value = element.checked;
        } else if (element.type === 'number') {
            value = parseInt(value, 10);
        }

        this.settings[key] = value;
        this.validateSetting(key, value);
    }

    validateSetting(key, value) {
        // Validate specific settings
        switch (key) {
            case 'apiEndpoint':
                if (value && !this.isValidUrl(value)) {
                    this.showNotification('Invalid API endpoint URL', 'warning');
                    return false;
                }
                break;
                
            case 'updateInterval':
                if (value < 5 || value > 1440) {
                    this.showNotification('Update interval must be between 5 and 1440 minutes', 'warning');
                    return false;
                }
                break;
                
            case 'apiKey':
                if (value && value.length < 10) {
                    this.showNotification('API key seems too short', 'warning');
                    return false;
                }
                break;
        }
        
        return true;
    }

    async saveSettings() {
        try {
            // Validate all settings before saving
            const isValid = Object.keys(this.settings).every(key => 
                this.validateSetting(key, this.settings[key])
            );

            if (!isValid) {
                this.showNotification('Please fix validation errors before saving', 'error');
                return;
            }

            await chrome.storage.sync.set(this.settings);
            
            // Notify background script of settings change
            chrome.runtime.sendMessage({
                action: 'settingsUpdated',
                settings: this.settings
            });

            this.showNotification('Settings saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showNotification('Error saving settings', 'error');
        }
    }

    async resetSettings() {
        if (confirm('Are you sure you want to reset all settings to their defaults? This cannot be undone.')) {
            try {
                // Reset to default values
                const defaultSettings = {
                    enableNotifications: true,
                    enableContextMenu: true,
                    enablePageHighlighting: true,
                    enableAutoScan: false,
                    updateInterval: 15,
                    validationMode: 'standard',
                    validateSchemas: true,
                    validateSignatures: false,
                    showValidationDetails: true,
                    useNVD: true,
                    useOSV: true,
                    useGitHubAdvisories: true,
                    useSnyk: false,
                    scanSeverity: 'medium',
                    excludeDevDependencies: false,
                    enableCacheScanning: true,
                    apiEndpoint: 'https://api.vexaware.com/v1',
                    apiKey: '',
                    shareAnonymousData: false,
                    exportFormat: 'json'
                };

                this.settings = defaultSettings;
                await chrome.storage.sync.clear();
                await chrome.storage.sync.set(this.settings);
                
                this.populateForm();
                this.showNotification('Settings reset to defaults', 'success');
            } catch (error) {
                console.error('Error resetting settings:', error);
                this.showNotification('Error resetting settings', 'error');
            }
        }
    }

    exportSettings() {
        try {
            const exportData = {
                version: '2.0.0',
                timestamp: new Date().toISOString(),
                settings: this.settings
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `vex-aware-settings-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showNotification('Settings exported successfully!', 'success');
        } catch (error) {
            console.error('Error exporting settings:', error);
            this.showNotification('Error exporting settings', 'error');
        }
    }

    importSettings() {
        document.getElementById('importFileInput').click();
    }

    async handleImportFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const text = await file.text();
            const importData = JSON.parse(text);

            if (!importData.settings) {
                throw new Error('Invalid settings file format');
            }

            // Validate imported settings
            const validSettings = {};
            Object.keys(this.settings).forEach(key => {
                if (importData.settings.hasOwnProperty(key)) {
                    validSettings[key] = importData.settings[key];
                }
            });

            if (confirm('This will replace your current settings. Are you sure you want to continue?')) {
                this.settings = { ...this.settings, ...validSettings };
                await chrome.storage.sync.set(this.settings);
                this.populateForm();
                this.showNotification('Settings imported successfully!', 'success');
            }
        } catch (error) {
            console.error('Error importing settings:', error);
            this.showNotification('Error importing settings: Invalid file format', 'error');
        }

        // Clear file input
        event.target.value = '';
    }

    updateBuildInfo() {
        const manifest = chrome.runtime.getManifest();
        document.getElementById('releaseDate').textContent = new Date().toLocaleDateString();
        document.getElementById('buildNumber').textContent = `${new Date().getFullYear()}.${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getDate().toString().padStart(2, '0')}`;
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const messageElement = document.getElementById('notificationMessage');
        
        messageElement.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        // Auto-hide after 3 seconds
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
}

// Initialize options page
document.addEventListener('DOMContentLoaded', () => {
    new VexAwareOptions();
});

// Handle settings messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSettings') {
        sendResponse({ settings: window.vexAwareOptions?.settings || {} });
    }
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case 's':
                event.preventDefault();
                document.getElementById('saveSettings').click();
                break;
            case 'r':
                event.preventDefault();
                if (event.shiftKey) {
                    document.getElementById('resetSettings').click();
                }
                break;
            case 'e':
                event.preventDefault();
                document.getElementById('exportSettings').click();
                break;
            case 'i':
                event.preventDefault();
                document.getElementById('importSettings').click();
                break;
        }
    }
});

// Auto-save settings on form changes (debounced)
let autoSaveTimeout;
document.addEventListener('change', (event) => {
    if (event.target.matches('input, select')) {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            if (window.vexAwareOptions) {
                window.vexAwareOptions.saveSettings();
            }
        }, 1000); // Auto-save after 1 second of inactivity
    }
});

// Export for global access
window.vexAwareOptions = null;
document.addEventListener('DOMContentLoaded', () => {
    window.vexAwareOptions = new VexAwareOptions();
});