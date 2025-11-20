import * as vscode from 'vscode';
import Ajv from 'ajv';

export function activate(context: vscode.ExtensionContext) {
    console.log('VEX Aware Basic extension is now active!');

    // Register commands
    const validateCommand = vscode.commands.registerCommand('vexaware.validateDocument', () => {
        validateVexDocument();
    });

    const createTemplateCommand = vscode.commands.registerCommand('vexaware.createTemplate', () => {
        createVexTemplate();
    });

    // Register document validation on save
    const onSaveValidator = vscode.workspace.onDidSaveTextDocument((document) => {
        if (isVexDocument(document)) {
            validateVexDocument(document);
        }
    });

    // Register hover provider for VEX properties
    const hoverProvider = vscode.languages.registerHoverProvider(['vex', 'json'], {
        provideHover(document, position) {
            const wordRange = document.getWordRangeAtPosition(position);
            const word = document.getText(wordRange);
            
            const vexProperties: { [key: string]: string } = {
                '@context': 'The JSON-LD context for VEX documents',
                '@id': 'Unique identifier for this VEX document',
                'author': 'The entity responsible for the VEX document',
                'timestamp': 'When this VEX document was created',
                'version': 'Version of this VEX document',
                'statements': 'Array of vulnerability statements',
                'vulnerability': 'Information about the vulnerability',
                'products': 'Products affected or not affected by the vulnerability',
                'status': 'Impact status: affected, not_affected, fixed, under_investigation',
                'justification': 'Reason for the status when not affected'
            };

            if (vexProperties[word]) {
                return new vscode.Hover(new vscode.MarkdownString(`**${word}**\n\n${vexProperties[word]}`));
            }
        }
    });

    context.subscriptions.push(validateCommand, createTemplateCommand, onSaveValidator, hoverProvider);
}

function isVexDocument(document: vscode.TextDocument): boolean {
    return document.fileName.endsWith('.vex') || 
           document.fileName.endsWith('.vex.json') ||
           (document.languageId === 'json' && document.getText().includes('"@context"') && 
            document.getText().includes('openvex.dev'));
}

async function validateVexDocument(document?: vscode.TextDocument) {
    const editor = vscode.window.activeTextEditor;
    if (!editor && !document) {
        vscode.window.showErrorMessage('No active editor found');
        return;
    }

    const doc = document || editor!.document;
    
    try {
        const text = doc.getText();
        const vexData = JSON.parse(text);

        // Basic VEX schema validation
        const schema = getBasicVexSchema();
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const valid = validate(vexData);

        if (valid) {
            vscode.window.showInformationMessage('✅ VEX document is valid!');
        } else {
            const errors = validate.errors?.map(err => 
                `${err.instancePath}: ${err.message}`
            ).join('\n') || 'Unknown validation error';
            vscode.window.showErrorMessage(`❌ VEX validation failed:\n${errors}`);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`❌ Invalid JSON: ${error}`);
    }
}

async function createVexTemplate() {
    const template = {
        "@context": "https://openvex.dev/ns",
        "@id": "https://example.com/vex/document-id",
        "author": "Your Organization",
        "timestamp": new Date().toISOString(),
        "version": "1.0.0",
        "statements": [
            {
                "vulnerability": {
                    "name": "CVE-YYYY-XXXX",
                    "@id": "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-YYYY-XXXX"
                },
                "products": [
                    {
                        "@id": "pkg:npm/package-name@1.0.0",
                        "identifiers": {
                            "purl": "pkg:npm/package-name@1.0.0"
                        }
                    }
                ],
                "status": "not_affected",
                "justification": "component_not_present",
                "impact_statement": "This vulnerability does not affect the product.",
                "action_statement": "No action required."
            }
        ]
    };

    const document = await vscode.workspace.openTextDocument({
        content: JSON.stringify(template, null, 2),
        language: 'json'
    });

    await vscode.window.showTextDocument(document);
    vscode.window.showInformationMessage('VEX template created successfully!');
}

function getBasicVexSchema() {
    return {
        type: "object",
        required: ["@context", "statements"],
        properties: {
            "@context": {
                type: "string",
                const: "https://openvex.dev/ns"
            },
            "@id": { type: "string" },
            "author": { type: "string" },
            "timestamp": { type: "string" },
            "version": { type: "string" },
            "statements": {
                type: "array",
                items: {
                    type: "object",
                    required: ["vulnerability", "products", "status"],
                    properties: {
                        "vulnerability": {
                            type: "object",
                            required: ["name"],
                            properties: {
                                "name": { type: "string" },
                                "@id": { type: "string" }
                            }
                        },
                        "products": {
                            type: "array",
                            items: {
                                type: "object",
                                required: ["@id"],
                                properties: {
                                    "@id": { type: "string" },
                                    "identifiers": { type: "object" }
                                }
                            }
                        },
                        "status": {
                            type: "string",
                            enum: ["affected", "not_affected", "fixed", "under_investigation"]
                        },
                        "justification": { type: "string" },
                        "impact_statement": { type: "string" },
                        "action_statement": { type: "string" }
                    }
                }
            }
        }
    };
}

export function deactivate() {}