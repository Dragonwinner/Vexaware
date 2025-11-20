// VEX Aware Browser Extension - Content Script

class VexAwareContentScript {
    constructor() {
        this.vexDocuments = [];
        this.dependencies = [];
        this.pageType = 'unknown';
        this.init();
    }

    init() {
        this.detectPageType();
        this.scanForVexDocuments();
        this.scanForDependencies();
        this.setupMessageListener();
        this.injectPageStyles();
        this.setupContextMenu();
    }

    detectPageType() {
        const url = window.location.href;
        const content = document.body.textContent.toLowerCase();
        
        if (url.includes('github.com') || url.includes('gitlab.com')) {
            this.pageType = 'repository';
        } else if (url.includes('npmjs.com') || url.includes('pypi.org')) {
            this.pageType = 'package_registry';
        } else if (content.includes('package.json') || content.includes('composer.json') || 
                   content.includes('requirements.txt') || content.includes('pom.xml')) {
            this.pageType = 'dependency_file';
        } else if (url.includes('.vex') || content.includes('"@context": "https://openvex.dev/ns/v0.2.0"')) {
            this.pageType = 'vex_document';
        } else {
            this.pageType = 'general';
        }
    }

    scanForVexDocuments() {
        // Look for VEX documents in various formats
        const vexSelectors = [
            'script[type="application/vnd.vex+json"]',
            'link[rel="vex"]',
            'meta[name="vex-document"]',
            '[data-vex-document]'
        ];

        vexSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.vexDocuments.push({
                    type: 'embedded',
                    element: element,
                    content: element.textContent || element.getAttribute('href') || element.getAttribute('content')
                });
            });
        });

        // Scan for VEX document links
        const links = document.querySelectorAll('a[href*=".vex"], a[href*="vex.json"]');
        links.forEach(link => {
            this.vexDocuments.push({
                type: 'linked',
                url: link.href,
                element: link
            });
        });

        // Scan page content for VEX-like JSON structures
        this.scanForVexInContent();
    }

    scanForVexInContent() {
        const codeBlocks = document.querySelectorAll('pre, code, .highlight');
        codeBlocks.forEach(block => {
            const text = block.textContent;
            try {
                const json = JSON.parse(text);
                if (this.isVexDocument(json)) {
                    this.vexDocuments.push({
                        type: 'content',
                        element: block,
                        content: json
                    });
                }
            } catch (e) {
                // Not valid JSON, continue
            }
        });
    }

    isVexDocument(obj) {
        return obj && 
               (obj['@context'] && obj['@context'].includes('openvex.dev')) ||
               (obj.vex_version) ||
               (obj.statements && Array.isArray(obj.statements));
    }

    scanForDependencies() {
        // Scan for dependency files and extract dependencies
        const dependencyPatterns = {
            'package.json': this.extractNpmDependencies,
            'composer.json': this.extractComposerDependencies,
            'requirements.txt': this.extractPythonDependencies,
            'pom.xml': this.extractMavenDependencies,
            'Gemfile': this.extractRubyDependencies
        };

        Object.keys(dependencyPatterns).forEach(filename => {
            const elements = document.querySelectorAll(`[title*="${filename}"], [data-filename="${filename}"]`);
            elements.forEach(element => {
                const extractor = dependencyPatterns[filename];
                const deps = extractor.call(this, element.textContent);
                this.dependencies.push(...deps);
            });
        });

        // Scan for dependency information in repository pages
        if (this.pageType === 'repository') {
            this.scanRepositoryDependencies();
        }
    }

    extractNpmDependencies(content) {
        try {
            const packageJson = JSON.parse(content);
            const deps = [];
            
            ['dependencies', 'devDependencies', 'peerDependencies'].forEach(type => {
                if (packageJson[type]) {
                    Object.entries(packageJson[type]).forEach(([name, version]) => {
                        deps.push({ name, version, type, ecosystem: 'npm' });
                    });
                }
            });
            
            return deps;
        } catch (e) {
            return [];
        }
    }

    extractComposerDependencies(content) {
        try {
            const composerJson = JSON.parse(content);
            const deps = [];
            
            ['require', 'require-dev'].forEach(type => {
                if (composerJson[type]) {
                    Object.entries(composerJson[type]).forEach(([name, version]) => {
                        if (!name.startsWith('php')) {
                            deps.push({ name, version, type, ecosystem: 'packagist' });
                        }
                    });
                }
            });
            
            return deps;
        } catch (e) {
            return [];
        }
    }

    extractPythonDependencies(content) {
        const deps = [];
        const lines = content.split('\n');
        
        lines.forEach(line => {
            const match = line.match(/^([a-zA-Z0-9\-_.]+)([>=<!]+.+)?$/);
            if (match) {
                deps.push({
                    name: match[1],
                    version: match[2] || '',
                    type: 'dependency',
                    ecosystem: 'pypi'
                });
            }
        });
        
        return deps;
    }

    extractMavenDependencies(content) {
        const deps = [];
        const dependencyRegex = /<dependency>[\s\S]*?<groupId>(.*?)<\/groupId>[\s\S]*?<artifactId>(.*?)<\/artifactId>[\s\S]*?<version>(.*?)<\/version>[\s\S]*?<\/dependency>/g;
        
        let match;
        while ((match = dependencyRegex.exec(content)) !== null) {
            deps.push({
                name: `${match[1]}:${match[2]}`,
                version: match[3],
                type: 'dependency',
                ecosystem: 'maven'
            });
        }
        
        return deps;
    }

    extractRubyDependencies(content) {
        const deps = [];
        const gemRegex = /gem\s+['"]([^'"]+)['"](?:\s*,\s*['"]([^'"]+)['"])?/g;
        
        let match;
        while ((match = gemRegex.exec(content)) !== null) {
            deps.push({
                name: match[1],
                version: match[2] || '',
                type: 'dependency',
                ecosystem: 'rubygems'
            });
        }
        
        return deps;
    }

    scanRepositoryDependencies() {
        // Scan GitHub/GitLab repository pages for dependency information
        const dependencyLinks = document.querySelectorAll('a[href*="dependencies"], .js-dependency-link');
        dependencyLinks.forEach(link => {
            const text = link.textContent.trim();
            if (text) {
                this.dependencies.push({
                    name: text,
                    version: 'unknown',
                    type: 'repository_dependency',
                    ecosystem: 'unknown'
                });
            }
        });
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.action) {
                case 'getPageInfo':
                    sendResponse({
                        vexCount: this.vexDocuments.length,
                        dependencyCount: this.dependencies.length,
                        pageType: this.pageType,
                        url: window.location.href
                    });
                    break;
                    
                case 'getVexDocuments':
                    sendResponse({ vexDocuments: this.vexDocuments });
                    break;
                    
                case 'getDependencies':
                    sendResponse({ dependencies: this.dependencies });
                    break;
                    
                case 'highlightVexElements':
                    this.highlightVexElements();
                    sendResponse({ success: true });
                    break;
                    
                case 'extractPageContent':
                    sendResponse({
                        content: this.extractPageContent(),
                        dependencies: this.dependencies,
                        vexDocuments: this.vexDocuments
                    });
                    break;
                    
                default:
                    sendResponse({ error: 'Unknown action' });
            }
        });
    }

    injectPageStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .vex-aware-highlight {
                outline: 2px solid #3498db !important;
                background-color: rgba(52, 152, 219, 0.1) !important;
                position: relative;
            }
            
            .vex-aware-highlight::after {
                content: 'VEX';
                position: absolute;
                top: -20px;
                left: 0;
                background: #3498db;
                color: white;
                padding: 2px 6px;
                font-size: 10px;
                font-weight: bold;
                border-radius: 2px;
                z-index: 1000;
            }
            
            .vex-aware-dependency {
                border-left: 3px solid #e74c3c !important;
                padding-left: 8px !important;
            }
            
            .vex-aware-vulnerability {
                background-color: rgba(231, 76, 60, 0.1) !important;
                border: 1px solid #e74c3c !important;
                border-radius: 4px !important;
            }
        `;
        document.head.appendChild(style);
    }

    highlightVexElements() {
        // Remove existing highlights
        document.querySelectorAll('.vex-aware-highlight').forEach(el => {
            el.classList.remove('vex-aware-highlight');
        });
        
        // Highlight VEX documents
        this.vexDocuments.forEach(doc => {
            if (doc.element) {
                doc.element.classList.add('vex-aware-highlight');
            }
        });
        
        // Highlight dependencies
        this.dependencies.forEach(dep => {
            if (dep.element) {
                dep.element.classList.add('vex-aware-dependency');
            }
        });
    }

    setupContextMenu() {
        // Add context menu event listeners for VEX-related actions
        document.addEventListener('contextmenu', (event) => {
            const element = event.target;
            const isVexRelated = element.textContent.toLowerCase().includes('vex') ||
                               element.href && element.href.includes('vex') ||
                               element.classList.contains('vex-aware-highlight');
            
            if (isVexRelated) {
                // Store context for context menu actions
                window.vexAwareContext = {
                    element: element,
                    isVexRelated: true,
                    content: element.textContent,
                    href: element.href
                };
            }
        });
    }

    extractPageContent() {
        const content = {
            title: document.title,
            url: window.location.href,
            domain: window.location.hostname,
            text: document.body.textContent,
            links: Array.from(document.links).map(link => ({
                href: link.href,
                text: link.textContent.trim()
            })),
            metadata: this.extractMetadata(),
            dependencies: this.dependencies,
            vexDocuments: this.vexDocuments,
            pageType: this.pageType
        };
        
        return content;
    }

    extractMetadata() {
        const metadata = {};
        
        // Extract meta tags
        document.querySelectorAll('meta').forEach(meta => {
            const name = meta.getAttribute('name') || meta.getAttribute('property');
            const content = meta.getAttribute('content');
            if (name && content) {
                metadata[name] = content;
            }
        });
        
        // Extract repository information if on GitHub/GitLab
        if (this.pageType === 'repository') {
            const repoMatch = window.location.pathname.match(/\/([^\/]+)\/([^\/]+)/);
            if (repoMatch) {
                metadata.repository = {
                    owner: repoMatch[1],
                    name: repoMatch[2],
                    url: window.location.href
                };
            }
        }
        
        return metadata;
    }
}

// Initialize content script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new VexAwareContentScript();
    });
} else {
    new VexAwareContentScript();
}

// Handle dynamic content changes
const observer = new MutationObserver((mutations) => {
    let shouldRescan = false;
    
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            shouldRescan = true;
        }
    });
    
    if (shouldRescan) {
        // Debounce rescanning
        clearTimeout(window.vexAwareRescanTimeout);
        window.vexAwareRescanTimeout = setTimeout(() => {
            if (window.vexAwareContentScript) {
                window.vexAwareContentScript.scanForVexDocuments();
                window.vexAwareContentScript.scanForDependencies();
            }
        }, 1000);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Export for global access
window.vexAwareContentScript = new VexAwareContentScript();