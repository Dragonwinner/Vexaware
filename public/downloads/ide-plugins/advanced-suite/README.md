# VEX Aware Advanced IDE Plugins Suite

A comprehensive collection of IDE plugins and extensions for working with VEX (Vulnerability Exploitability eXchange) documents across multiple development environments.

## Included Plugins

### 1. VS Code Advanced Extension
- **Location**: `vscode-advanced/`
- **Features**: AI-powered completion, real-time validation, team collaboration
- **Installation**: Install via VSIX file or extension marketplace

### 2. IntelliJ IDEA Plugin
- **Location**: `intellij-plugin/`
- **Features**: Smart completion, integrated SBOM viewer, enterprise features
- **Installation**: Install via plugin manager or JAR file

### 3. Eclipse Plugin  
- **Location**: `eclipse-plugin/`
- **Features**: Workspace integration, validation framework, custom perspectives
- **Installation**: Install via update site or dropins folder

### 4. Vim/Neovim Plugin
- **Location**: `vim-plugin/`
- **Features**: Lightweight syntax support, LSP integration, custom commands
- **Installation**: Install via package manager (Pathogen, Plug, etc.)

### 5. Sublime Text Package
- **Location**: `sublime-package/`
- **Features**: Custom syntax, build systems, project integration
- **Installation**: Install via Package Control or manual installation

### 6. Emacs Mode
- **Location**: `emacs-mode/`
- **Features**: Major mode, flycheck integration, company completion
- **Installation**: Install via MELPA or manual configuration

## Advanced Features

### AI-Powered Capabilities
- **Smart VEX Generation**: Automatically generate VEX documents from SBOM data
- **Vulnerability Analysis**: AI-powered impact assessment and justification suggestions
- **Context-Aware Completion**: Intelligent code completion based on project context
- **Natural Language Processing**: Convert security reports to VEX statements

### Enterprise Integration
- **SSO Authentication**: Single sign-on integration with enterprise systems
- **Policy Enforcement**: Automatic validation against corporate security policies
- **Audit Logging**: Comprehensive logging of document changes and validations
- **Team Collaboration**: Real-time collaborative editing and review workflows

### Advanced Validation
- **Multi-Schema Support**: Support for multiple VEX schema versions
- **Custom Rules Engine**: Define and enforce organization-specific validation rules
- **Dependency Analysis**: Automatic product identification from dependency files
- **Compliance Checking**: Validate against industry compliance frameworks

### Workflow Automation
- **CI/CD Integration**: Automated VEX generation in build pipelines
- **Git Hooks**: Pre-commit validation and automatic document updates
- **Issue Tracking**: Integration with JIRA, GitHub Issues, and other trackers
- **Notification System**: Automated alerts for vulnerability updates

## Quick Start Guide

### 1. Extract the Suite
```bash
unzip advanced-ide-plugins-suite.zip
cd advanced-suite/
```

### 2. Choose Your IDE
Navigate to the appropriate folder for your development environment:
- `vscode-advanced/` - Visual Studio Code
- `intellij-plugin/` - IntelliJ IDEA, PyCharm, WebStorm, etc.
- `eclipse-plugin/` - Eclipse IDE
- `vim-plugin/` - Vim/Neovim
- `sublime-package/` - Sublime Text
- `emacs-mode/` - GNU Emacs

### 3. Follow IDE-Specific Instructions
Each plugin folder contains detailed installation and configuration instructions in its README file.

### 4. Configure Enterprise Features
If using enterprise features:
1. Set up SSO configuration
2. Configure policy validation rules  
3. Enable team collaboration features
4. Set up audit logging

## System Requirements

### Minimum Requirements
- **VS Code**: 1.74.0 or higher
- **IntelliJ**: 2022.1 or higher (Ultimate or Community)
- **Eclipse**: 2022-03 or higher
- **Vim**: 8.0+ or Neovim 0.5+
- **Sublime Text**: Build 4121 or higher
- **Emacs**: 26.1 or higher

### Enterprise Requirements
- **Authentication**: SAML 2.0 or OAuth 2.0 compatible identity provider
- **Network**: HTTPS access to VEX Aware services
- **Storage**: Minimum 500MB for full feature set

## Configuration

### Global Configuration
Create a `.vexaware/config.yaml` file in your home directory:

```yaml
# VEX Aware Advanced Configuration
api:
  endpoint: "https://api.vexaware.com/v1"
  timeout: 30s
  
enterprise:
  sso_enabled: true
  policy_validation: true
  audit_logging: true
  
features:
  ai_completion: true
  real_time_collaboration: true
  vulnerability_scanning: true
```

### IDE-Specific Configuration
Each IDE plugin has additional configuration options documented in their respective folders.

## License and Support

### License
This advanced plugin suite is available under the VEX Aware Enterprise License. See LICENSE file for details.

### Support Channels
- **Enterprise Support**: support@vexaware.com
- **Community Forum**: https://community.vexaware.com
- **Documentation**: https://docs.vexaware.com/plugins
- **Issues**: https://github.com/vexaware/ide-plugins/issues

### Training and Onboarding
- **Online Training**: Available at https://training.vexaware.com
- **Enterprise Onboarding**: Contact sales@vexaware.com
- **Certification Program**: Professional VEX Aware certification available

## Version Information

- **Suite Version**: 2.0.0
- **Release Date**: November 2025
- **Compatibility**: VEX Aware API v2.0+
- **Schema Support**: OpenVEX 0.2.0, CSAF 2.0, CycloneDX 1.5

## What's New in 2.0

### New Features
- **Multi-IDE Synchronization**: Share settings across different IDEs
- **Advanced AI Models**: GPT-4 powered VEX generation and analysis  
- **Real-time Collaboration**: Live editing with team members
- **Enhanced Security**: End-to-end encryption for enterprise features

### Improvements
- **50% Faster Validation**: Optimized validation engine
- **Better IntelliSense**: More accurate code completion
- **Improved UI/UX**: Redesigned interfaces across all plugins
- **Enhanced Compatibility**: Support for latest IDE versions

### Bug Fixes
- Fixed memory leaks in large document handling
- Improved performance with complex dependency graphs
- Better error handling for network connectivity issues
- Resolved conflicts with other security-focused extensions

## Migration Guide

### From Basic Extensions
If upgrading from basic VEX Aware extensions:
1. Uninstall previous basic extensions
2. Install advanced suite following the quick start guide
3. Import existing configurations using the migration tool
4. Enable new features through plugin settings

### From Version 1.x
Existing configurations are automatically migrated. New features are disabled by default and can be enabled in settings.

## Contributing

The advanced plugin suite is part of the VEX Aware ecosystem. For contributions:
1. Fork the repository
2. Create feature branches for each IDE plugin
3. Follow the coding standards for each platform
4. Submit pull requests with comprehensive tests
5. Update documentation as needed

---

For detailed installation and usage instructions, see the README file in each plugin's directory.