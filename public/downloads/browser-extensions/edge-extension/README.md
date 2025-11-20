# VEX Aware Chrome Extension

A comprehensive browser extension for managing VEX (Vulnerability Exploitability eXchange) documents and security workflows.

## Features

### 🔍 **VEX Document Management**
- **Automatic Detection**: Scans web pages for VEX documents and vulnerability information
- **Real-time Validation**: Validates VEX documents against official schemas and standards
- **Document Generation**: Creates VEX documents from page content and dependency information
- **Multi-format Support**: Handles JSON, YAML, and XML VEX document formats

### 🛡️ **Vulnerability Scanning**
- **Multiple Database Integration**: Connects to NVD, OSV, GitHub Advisories, and Snyk
- **Dependency Analysis**: Automatically detects and analyzes project dependencies
- **Severity Filtering**: Configurable vulnerability severity thresholds
- **Real-time Alerts**: Browser notifications for critical security issues

### 🔧 **Developer Integration**
- **Repository Support**: Enhanced functionality for GitHub, GitLab, and other code repositories
- **Package Registry Integration**: Works with npm, PyPI, Maven Central, and other registries
- **Context Menu Actions**: Right-click VEX-related actions on any webpage
- **Keyboard Shortcuts**: Quick access to common VEX operations

### ⚙️ **Advanced Configuration**
- **Flexible Settings**: Comprehensive options for validation, scanning, and integration
- **API Integration**: Optional API key support for enhanced features
- **Export/Import**: Backup and restore extension settings
- **Privacy Controls**: Configurable data sharing and analytics options

## Installation

### Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store listing](https://chrome.google.com/webstore/detail/vex-aware)
2. Click "Add to Chrome"
3. Confirm the installation

### Manual Installation (Developer Mode)
1. Download this extension folder
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The VEX Aware extension will appear in your toolbar

## Quick Start

### Basic Usage
1. **Click the extension icon** in your toolbar to open the popup
2. **Navigate to any webpage** with VEX documents or dependencies
3. **Use quick actions** to validate, generate, or scan for vulnerabilities
4. **View results** in the popup or browser notifications

### Configuration
1. **Right-click the extension icon** and select "Options"
2. **Configure settings** across General, Validation, Scanning, and Integration tabs
3. **Set up API integration** for enhanced features (optional)
4. **Save settings** - they'll sync across your Chrome browsers

## Usage Examples

### Validating a VEX Document
```javascript
// The extension automatically detects VEX documents on pages
// Click "Validate VEX Document" in the popup for instant validation
```

### Scanning Repository Dependencies
```javascript
// Navigate to any GitHub repository
// Click "Scan for Vulnerabilities" to analyze package.json, requirements.txt, etc.
```

### Generating VEX Documents
```javascript
// On pages with vulnerability information
// Click "Generate VEX Document" to create standardized VEX files
```

## Supported Platforms

### Code Repositories
- **GitHub**: Full repository analysis and VEX integration
- **GitLab**: Project scanning and vulnerability detection
- **Bitbucket**: Basic dependency analysis
- **SourceForge**: Limited VEX document detection

### Package Registries
- **npm**: JavaScript/Node.js packages
- **PyPI**: Python packages
- **Maven Central**: Java packages
- **RubyGems**: Ruby packages
- **Packagist**: PHP packages

### Vulnerability Databases
- **National Vulnerability Database (NVD)**: Comprehensive CVE database
- **OSV (Open Source Vulnerabilities)**: Google's open source vulnerability database
- **GitHub Security Advisories**: GitHub's security advisory database
- **Snyk Database**: Commercial vulnerability database (API key required)

## Configuration Options

### General Settings
- **Notifications**: Enable/disable browser notifications
- **Context Menu**: Add VEX actions to right-click menu
- **Page Highlighting**: Automatically highlight VEX elements
- **Auto-scan**: Automatic vulnerability scanning on page load
- **Update Interval**: Frequency of vulnerability database updates

### Validation Settings
- **Strictness Levels**: Strict, Standard, or Lenient validation modes
- **Schema Validation**: JSON schema compliance checking
- **Digital Signatures**: Cryptographic signature verification
- **Detailed Results**: Comprehensive validation reporting

### Scanning Settings
- **Database Selection**: Choose which vulnerability databases to query
- **Severity Filtering**: Set minimum severity levels for reporting
- **Dependency Types**: Include/exclude development dependencies
- **Result Caching**: Cache scan results for improved performance

### Integration Settings
- **API Endpoint**: Custom VEX Aware API endpoint
- **Authentication**: API key for enhanced features
- **Data Sharing**: Anonymous usage statistics
- **Export Format**: Default format for downloaded documents

## Keyboard Shortcuts

- **Ctrl+1** (or Cmd+1): Validate VEX Document
- **Ctrl+2** (or Cmd+2): Generate VEX Document  
- **Ctrl+3** (or Cmd+3): Scan for Vulnerabilities
- **Ctrl+Shift+V**: Open VEX Aware popup
- **Ctrl+Shift+S**: Open extension settings

## API Integration

### VEX Aware API
The extension integrates with the VEX Aware API for enhanced functionality:

```javascript
// API endpoint configuration
const apiEndpoint = 'https://api.vexaware.com/v1';

// Enhanced features with API key:
// - Higher rate limits
// - Advanced vulnerability intelligence  
// - Premium vulnerability databases
// - Priority support
```

### Custom API Endpoints
You can configure custom API endpoints in the extension settings for enterprise deployments.

## Privacy & Security

### Data Collection
- **Minimal Data**: Only collects necessary data for VEX operations
- **No Personal Information**: Does not collect or store personal data
- **Optional Analytics**: Anonymous usage statistics (opt-in only)
- **Local Storage**: Settings and cache stored locally in browser

### Permissions Explained
- **activeTab**: Access current tab for VEX document detection
- **storage**: Save extension settings and cache
- **downloads**: Enable VEX document downloads
- **notifications**: Show vulnerability alerts
- **contextMenus**: Add right-click VEX actions
- **scripting**: Inject content scripts for page analysis

### Security Features
- **Content Security Policy**: Strict CSP prevents XSS attacks
- **Permission Minimization**: Only requests necessary permissions
- **Secure Communication**: HTTPS-only API communication
- **Input Validation**: All user inputs validated and sanitized

## Troubleshooting

### Common Issues

#### Extension Not Detecting VEX Documents
- Ensure the page has loaded completely
- Check that VEX documents follow standard formats
- Try refreshing the page
- Verify extension permissions are granted

#### Vulnerability Scanning Not Working
- Check internet connection
- Verify vulnerability database settings
- Ensure target page has recognizable dependency files
- Try clearing extension cache in settings

#### Settings Not Saving
- Check browser storage permissions
- Ensure Chrome sync is enabled
- Try exporting/importing settings manually
- Clear browser cache and restart Chrome

### Error Messages

#### "Failed to validate VEX document"
- Document may not follow VEX standards
- Check JSON syntax for embedded documents
- Verify document accessibility (no authentication required)

#### "No vulnerabilities found"
- Dependencies may not be in vulnerability databases
- Check severity filter settings
- Verify dependency detection is working properly

#### "API rate limit exceeded"
- Configure API key for higher limits
- Reduce scanning frequency
- Use caching to minimize API calls

### Getting Help

#### Documentation
- **Official Docs**: [vexaware.com/resources/browser-extensions](https://vexaware.com/resources/browser-extensions)
- **API Reference**: [api.vexaware.com/docs](https://api.vexaware.com/docs)
- **VEX Standards**: [openvex.dev](https://openvex.dev)

#### Support Channels
- **Email Support**: [support@vexaware.com](mailto:support@vexaware.com)
- **GitHub Issues**: [github.com/vexaware/browser-extensions](https://github.com/vexaware/browser-extensions)
- **Community Forum**: [community.vexaware.com](https://community.vexaware.com)

## Contributing

We welcome contributions to improve the VEX Aware extension!

### Development Setup
1. Clone the repository
2. Load the extension in developer mode
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Guidelines
- Follow existing code style and conventions
- Add comprehensive comments for complex logic
- Include unit tests for new features
- Update documentation for user-facing changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### Version 2.0.0 (Current)
- **NEW**: Complete rewrite with modern Chrome Extension Manifest v3
- **NEW**: Enhanced VEX document validation with multiple schema support
- **NEW**: Advanced vulnerability scanning with multiple database integration
- **NEW**: Comprehensive settings page with import/export functionality
- **NEW**: Real-time notifications and context menu integration
- **IMPROVED**: Better dependency detection across multiple ecosystems
- **IMPROVED**: Enhanced UI with responsive design
- **IMPROVED**: Performance optimizations and caching

### Version 1.x.x (Legacy)
- Basic VEX document detection
- Simple validation functionality
- Limited vulnerability scanning
- Basic popup interface

---

**VEX Aware Extension** - Accelerating secure development workflows through comprehensive VEX document management and vulnerability intelligence.

For more information, visit [vexaware.com](https://vexaware.com)