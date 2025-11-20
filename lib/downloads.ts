// Download utility functions for VEX Aware resources

export const downloadFile = (filename: string, category: string, displayName?: string) => {
  try {
    // For Vite/React apps, files in public folder are served from root
    const filePath = `/downloads/${category}/${filename}`;
    const name = displayName || filename;
    
    console.log(`Attempting to download: ${name}`);
    console.log(`File path: ${filePath}`);
    
    // Create download link - let the browser handle the download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filename;
    link.setAttribute('aria-label', `Download ${name}`);
    link.style.display = 'none';
    
    // Add the link to the DOM temporarily
    document.body.appendChild(link);
    
    // Add a small delay to ensure the link is ready
    setTimeout(() => {
      // Trigger the download
      link.click();
      
      // Clean up after a short delay
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100);
    }, 10);
    
    console.log(`Download initiated: ${name}`);
    
    // Optional: Track download analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download', {
        event_category: 'resource',
        event_label: `${category}/${filename}`,
        value: 1
      });
    }
    
  } catch (error) {
    console.error('Download failed:', error);
    alert(`Error: Could not download ${displayName || filename}. Please try again later.`);
  }
};

export const copyToClipboard = async (text: string, successMessage?: string) => {
  try {
    await navigator.clipboard.writeText(text);
    
    // You could show a toast notification here
    console.log(successMessage || 'Copied to clipboard');
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      console.log(successMessage || 'Copied to clipboard');
      return true;
    } catch (fallbackErr) {
      console.error('Fallback copy failed: ', fallbackErr);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

export const openInNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

// Resource metadata type
export interface ResourceInfo {
  filename: string;
  displayName: string;
  description: string;
  fileSize: string;
  category: string;
  type: 'json' | 'shell' | 'yaml' | 'zip' | 'pdf' | 'markdown';
  features?: string[];
  comingSoon?: boolean;
}

// Common resources by category
export const resourceCategories = {
  'vex-templates': [
    {
      filename: 'basic-vex-template.json',
      displayName: 'Basic VEX Template',
      description: 'Essential VEX document structure for getting started quickly. Includes basic vulnerability statements and product identifiers.',
      fileSize: '2.1 KB',
      category: 'vex-templates',
      type: 'json' as const,
      features: ['Basic structure', 'Single vulnerability', 'Product identifiers']
    },
    {
      filename: 'advanced-vex-template.json', 
      displayName: 'Advanced VEX Template',
      description: 'Comprehensive VEX document with advanced features, metadata, multiple vulnerabilities, and compliance frameworks.',
      fileSize: '4.8 KB',
      category: 'vex-templates',
      type: 'json' as const,
      features: ['Multiple vulnerabilities', 'Metadata support', 'Compliance frameworks', 'Tool integration']
    }
  ],
  'cli-tools': [
    {
      filename: 'basic-install.sh',
      displayName: 'Basic Installation Script',
      description: 'Automated installation script for VEX Aware CLI with basic configuration. Supports Linux and macOS.',
      fileSize: '3.2 KB',
      category: 'cli-tools',
      type: 'shell' as const,
      features: ['Prerequisites check', 'Auto-download', 'Basic config']
    }
  ],
  'ide-plugins': [
    {
      filename: 'vscode-basic-extension.zip',
      displayName: 'VS Code Basic Extension',
      description: 'Essential VEX document support for VS Code. Includes syntax highlighting, basic validation, and code snippets.',
      fileSize: '245 KB',
      category: 'ide-plugins',
      type: 'zip' as const,
      features: ['Syntax highlighting', 'Code snippets', 'Basic validation']
    },
    {
      filename: 'advanced-ide-plugins-suite.zip',
      displayName: 'Advanced IDE Plugins Suite',
      description: 'Comprehensive IDE plugin collection for multiple editors with AI-powered features and enterprise integrations.',
      fileSize: '1.2 MB',
      category: 'ide-plugins',
      type: 'zip' as const,
      features: ['AI-powered completion', 'Enterprise features', 'Team collaboration', 'Multiple IDEs']
    }
  ],
  'browser-extensions': [
    {
      filename: 'chrome-extension.zip',
      displayName: 'Chrome Extension',
      description: 'Full-featured Chrome extension with VEX document management, real-time vulnerability scanning, and advanced configuration options.',
      fileSize: '485 KB',
      category: 'browser-extensions',
      type: 'zip' as const,
      features: ['Auto-detection', 'Real-time scanning', 'Context menu', 'Settings export/import']
    },
    {
      filename: 'firefox-addon.zip',
      displayName: 'Firefox Add-on',
      description: 'Firefox-compatible add-on with cross-platform VEX functionality and enhanced privacy controls.',
      fileSize: '442 KB',
      category: 'browser-extensions',
      type: 'zip' as const,
      features: ['Privacy controls', 'Developer tools integration', 'Container tabs support']
    },
    {
      filename: 'edge-extension.zip',
      displayName: 'Edge Extension',
      description: 'Microsoft Edge extension optimized for enterprise environments with enhanced security features.',
      fileSize: '498 KB',
      category: 'browser-extensions',
      type: 'zip' as const,
      features: ['Enterprise security', 'Azure integration', 'Group policy support', 'Audit logging']
    }
  ]
};