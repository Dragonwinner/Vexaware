# VEX Aware Basic VS Code Extension

A Visual Studio Code extension that provides essential support for VEX (Vulnerability Exploitability eXchange) documents.

## Features

- **Syntax Highlighting**: Enhanced JSON syntax highlighting with VEX-specific keywords
- **Schema Validation**: Automatic validation of VEX documents against the official schema
- **Code Snippets**: Quick templates for creating VEX documents and statements
- **Hover Information**: Contextual help for VEX properties
- **Commands**: Validate documents and create templates via command palette

## Installation

### From VSIX (Recommended)

1. Download the `.vsix` file from this package
2. Open VS Code
3. Press `Ctrl+Shift+P` to open the command palette
4. Type "Extensions: Install from VSIX..."
5. Select the downloaded `.vsix` file
6. Reload VS Code

### Manual Installation

1. Extract this ZIP file to your VS Code extensions directory:
   - Windows: `%USERPROFILE%\.vscode\extensions\`
   - macOS: `~/.vscode/extensions/`
   - Linux: `~/.vscode/extensions/`
2. Reload VS Code

## Usage

### Creating a VEX Document

1. Create a new file with `.vex.json` extension
2. Type `vex-basic` and press Tab to insert a complete VEX template
3. Fill in the placeholders with your specific information

### Available Snippets

- `vex-basic` - Complete VEX document template
- `vex-statement` - Individual vulnerability statement
- `vex-product` - Product identifier object
- `vex-vulnerability` - Vulnerability object

### Commands

Access these commands via `Ctrl+Shift+P`:

- **VEX Aware: Validate Document** - Validate the current VEX document
- **VEX Aware: Create Template** - Create a new VEX document from template

### File Types

The extension automatically activates for:
- `.vex` files
- `.vex.json` files
- JSON files containing VEX context

## VEX Document Structure

A minimal VEX document requires:

```json
{
  "@context": "https://openvex.dev/ns",
  "statements": [
    {
      "vulnerability": {
        "name": "CVE-2024-1234"
      },
      "products": [
        {
          "@id": "pkg:npm/example@1.0.0"
        }
      ],
      "status": "not_affected"
    }
  ]
}
```

## Status Values

- `affected` - The vulnerability affects the product
- `not_affected` - The vulnerability does not affect the product
- `fixed` - The vulnerability has been fixed
- `under_investigation` - Impact is being investigated

## Justification Values (for not_affected status)

- `component_not_present` - Component is not included
- `vulnerable_code_not_present` - Vulnerable code is not present
- `vulnerable_code_not_in_execute_path` - Code is present but not executed
- `vulnerable_code_cannot_be_controlled_by_adversary` - Code cannot be controlled
- `inline_mitigations_already_exist` - Mitigations are in place

## Requirements

- VS Code 1.74.0 or higher
- JSON language support (built-in)

## Extension Settings

This extension contributes the following settings:

- File associations for `.vex` and `.vex.json` files
- JSON schema validation for VEX documents
- Custom syntax highlighting rules

## Known Issues

- Schema validation requires internet connection for external schema references
- Large VEX documents may experience slower validation

## Release Notes

### 1.0.0

- Initial release
- Basic VEX document support
- Schema validation
- Code snippets
- Syntax highlighting

## Contributing

This extension is part of the VEX Aware project. For issues and contributions, please visit our GitHub repository.

## License

This extension is licensed under the MIT License.