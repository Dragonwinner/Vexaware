#!/bin/bash

# VEX Aware Basic CLI Installation Script
# Version: 1.0.0
# Description: Basic installation and setup for VEX Aware

set -e

echo "🚀 Starting VEX Aware Basic Installation..."

# Check prerequisites
check_prerequisites() {
    echo "📋 Checking prerequisites..."
    
    if ! command -v curl &> /dev/null; then
        echo "❌ curl is required but not installed."
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        echo "❌ jq is required but not installed."
        exit 1
    fi
    
    echo "✅ Prerequisites check passed"
}

# Download VEX Aware binary
download_vexaware() {
    echo "📥 Downloading VEX Aware..."
    
    # Determine OS and architecture
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)
    
    case $ARCH in
        x86_64) ARCH="amd64" ;;
        arm64|aarch64) ARCH="arm64" ;;
        *) echo "❌ Unsupported architecture: $ARCH"; exit 1 ;;
    esac
    
    DOWNLOAD_URL="https://github.com/vexaware/vexaware/releases/latest/download/vexaware-${OS}-${ARCH}"
    
    echo "📡 Downloading from: $DOWNLOAD_URL"
    curl -L -o vexaware "$DOWNLOAD_URL"
    chmod +x vexaware
    
    echo "✅ VEX Aware downloaded successfully"
}

# Install VEX Aware
install_vexaware() {
    echo "📦 Installing VEX Aware..."
    
    # Create installation directory
    sudo mkdir -p /usr/local/bin
    sudo mv vexaware /usr/local/bin/
    
    # Verify installation
    if command -v vexaware &> /dev/null; then
        echo "✅ VEX Aware installed successfully"
        echo "📍 Installation path: /usr/local/bin/vexaware"
        vexaware version
    else
        echo "❌ Installation failed"
        exit 1
    fi
}

# Basic configuration
configure_vexaware() {
    echo "⚙️  Setting up basic configuration..."
    
    # Create config directory
    mkdir -p ~/.vexaware
    
    # Create basic config file
    cat > ~/.vexaware/config.yaml << EOF
# VEX Aware Basic Configuration
api:
  timeout: 30s
  retries: 3

scanner:
  type: trivy
  timeout: 300s

output:
  format: json
  directory: ./vex-output

logging:
  level: info
  file: ~/.vexaware/vexaware.log
EOF
    
    echo "✅ Basic configuration created at ~/.vexaware/config.yaml"
}

# Main installation flow
main() {
    echo "🎯 VEX Aware Basic CLI Installation"
    echo "=================================="
    
    check_prerequisites
    download_vexaware
    install_vexaware
    configure_vexaware
    
    echo ""
    echo "🎉 Installation completed successfully!"
    echo ""
    echo "📚 Next steps:"
    echo "  1. Run 'vexaware --help' to see available commands"
    echo "  2. Run 'vexaware init' to initialize your first project"
    echo "  3. Check the documentation at https://docs.vexaware.com"
    echo ""
}

main "$@"