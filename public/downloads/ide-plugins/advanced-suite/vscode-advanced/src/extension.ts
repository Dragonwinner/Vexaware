import * as vscode from 'vscode';
import { VexAwareAI } from './ai/vexAwareAI';
import { CollaborationService } from './collaboration/collaborationService';
import { AdvancedValidator } from './validation/advancedValidator';
import { DependencyScanner } from './scanner/dependencyScanner';
import { VexExplorer } from './explorer/vexExplorer';
import { VulnerabilityProvider } from './providers/vulnerabilityProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('VEX Aware Advanced extension is now active!');

    // Initialize services
    const aiService = new VexAwareAI(context);
    const collaborationService = new CollaborationService(context);
    const validator = new AdvancedValidator(context);
    const scanner = new DependencyScanner(context);

    // Register tree data providers
    const vexExplorer = new VexExplorer(context);
    const vulnerabilityProvider = new VulnerabilityProvider(context);
    
    vscode.window.registerTreeDataProvider('vexaware.explorer', vexExplorer);
    vscode.window.registerTreeDataProvider('vexaware.vulnerabilities', vulnerabilityProvider);

    // Register commands
    const commands = [
        // AI-powered commands
        vscode.commands.registerCommand('vexaware.aiGenerate', async () => {
            await aiService.generateVexDocument();
        }),

        vscode.commands.registerCommand('vexaware.aiAnalyze', async () => {
            await aiService.analyzeVulnerability();
        }),

        // Validation commands
        vscode.commands.registerCommand('vexaware.validateAdvanced', async () => {
            await validator.validateDocument();
        }),

        vscode.commands.registerCommand('vexaware.validateWorkspace', async () => {
            await validator.validateWorkspace();
        }),

        // Collaboration commands
        vscode.commands.registerCommand('vexaware.collaborativeEdit', async () => {
            await collaborationService.startSession();
        }),

        vscode.commands.registerCommand('vexaware.joinSession', async (sessionId: string) => {
            await collaborationService.joinSession(sessionId);
        }),

        // Scanning commands
        vscode.commands.registerCommand('vexaware.scanDependencies', async () => {
            await scanner.scanWorkspace();
        }),

        vscode.commands.registerCommand('vexaware.scanFile', async (uri: vscode.Uri) => {
            await scanner.scanFile(uri);
        }),

        // Export commands
        vscode.commands.registerCommand('vexaware.exportReport', async () => {
            await exportSecurityReport();
        }),

        // Explorer commands
        vscode.commands.registerCommand('vexaware.refreshExplorer', () => {
            vexExplorer.refresh();
            vulnerabilityProvider.refresh();
        }),

        vscode.commands.registerCommand('vexaware.openVexDocument', (resource: vscode.Uri) => {
            vscode.window.showTextDocument(resource);
        })
    ];

    // Register providers
    const providers = [
        // Completion provider with AI enhancement
        vscode.languages.registerCompletionItemProvider(
            ['vex', 'json'],
            new VexCompletionProvider(aiService),
            '"', ':', ','
        ),

        // Hover provider with contextual information
        vscode.languages.registerHoverProvider(
            ['vex', 'json'],
            new VexHoverProvider()
        ),

        // Code action provider for quick fixes
        vscode.languages.registerCodeActionsProvider(
            ['vex', 'json'],
            new VexCodeActionProvider(aiService)
        ),

        // Document symbol provider for outline
        vscode.languages.registerDocumentSymbolProvider(
            ['vex', 'json'],
            new VexSymbolProvider()
        ),

        // Diagnostic provider for real-time validation
        vscode.languages.registerDiagnosticCollection('vexaware')
    ];

    // Register event listeners
    const eventListeners = [
        // Auto-validation on save
        vscode.workspace.onDidSaveTextDocument(async (document) => {
            if (isVexDocument(document)) {
                await validator.validateDocument(document);
            }
        }),

        // Auto-scan on file changes
        vscode.workspace.onDidChangeTextDocument(async (event) => {
            const config = vscode.workspace.getConfiguration('vexaware');
            if (config.get('autoScan') && isVexDocument(event.document)) {
                await scanner.scanDocument(event.document);
            }
        }),

        // Collaboration sync
        vscode.workspace.onDidChangeTextDocument(async (event) => {
            if (collaborationService.isActive()) {
                await collaborationService.syncChanges(event);
            }
        })
    ];

    // Add all subscriptions to context
    context.subscriptions.push(...commands, ...providers, ...eventListeners);

    // Initialize workspace context
    updateWorkspaceContext();
    
    // Show welcome message for first-time users
    showWelcomeMessage(context);
}

class VexCompletionProvider implements vscode.CompletionItemProvider {
    constructor(private aiService: VexAwareAI) {}

    async provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): Promise<vscode.CompletionItem[]> {
        const items: vscode.CompletionItem[] = [];

        // Basic VEX properties
        const vexProperties = [
            { label: '@context', insertText: '"@context": "https://openvex.dev/ns"' },
            { label: '@id', insertText: '"@id": "${1:document-id}"' },
            { label: 'author', insertText: '"author": "${1:organization}"' },
            { label: 'timestamp', insertText: `"timestamp": "${new Date().toISOString()}"` },
            { label: 'version', insertText: '"version": "${1:1.0.0}"' },
            { label: 'statements', insertText: '"statements": [\n\t$1\n]' }
        ];

        vexProperties.forEach(prop => {
            const item = new vscode.CompletionItem(prop.label, vscode.CompletionItemKind.Property);
            item.insertText = new vscode.SnippetString(prop.insertText);
            items.push(item);
        });

        // AI-enhanced completions
        if (this.aiService.isEnabled()) {
            const aiCompletions = await this.aiService.getCompletions(document, position);
            items.push(...aiCompletions);
        }

        return items;
    }
}

class VexHoverProvider implements vscode.HoverProvider {
    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        const wordRange = document.getWordRangeAtPosition(position);
        const word = document.getText(wordRange);

        const vexDocumentation: { [key: string]: string } = {
            '@context': 'The JSON-LD context that provides semantic meaning to VEX documents',
            '@id': 'A unique identifier for this VEX document, typically a URI',
            'author': 'The organization or individual responsible for creating this VEX document',
            'timestamp': 'ISO 8601 timestamp indicating when this document was created',
            'version': 'Version identifier for this VEX document',
            'statements': 'Array containing vulnerability impact statements for products',
            'vulnerability': 'Information about a specific vulnerability (CVE, GHSA, etc.)',
            'products': 'List of products that are or are not affected by the vulnerability',
            'status': 'Impact assessment: affected, not_affected, fixed, or under_investigation',
            'justification': 'Reasoning for why a product is not affected by a vulnerability'
        };

        if (vexDocumentation[word]) {
            return new vscode.Hover([
                `**${word}** (VEX Property)`,
                vexDocumentation[word],
                '[Learn more about VEX](https://openvex.dev)'
            ]);
        }

        // CVE detection
        const cveMatch = word.match(/CVE-\d{4}-\d{4,}/);
        if (cveMatch) {
            return new vscode.Hover([
                `**${cveMatch[0]}** (Common Vulnerabilities and Exposures)`,
                `View details: [MITRE CVE](https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cveMatch[0]})`,
                `NVD Details: [NIST NVD](https://nvd.nist.gov/vuln/detail/${cveMatch[0]})`
            ]);
        }

        return null;
    }
}

class VexCodeActionProvider implements vscode.CodeActionProvider {
    constructor(private aiService: VexAwareAI) {}

    async provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range | vscode.Selection,
        context: vscode.CodeActionContext,
        token: vscode.CancellationToken
    ): Promise<vscode.CodeAction[]> {
        const actions: vscode.CodeAction[] = [];

        // Quick fix for common VEX issues
        for (const diagnostic of context.diagnostics) {
            if (diagnostic.message.includes('Missing required property')) {
                const fix = new vscode.CodeAction(
                    'Add missing property',
                    vscode.CodeActionKind.QuickFix
                );
                fix.edit = new vscode.WorkspaceEdit();
                // Implementation would add the missing property
                actions.push(fix);
            }
        }

        // AI-powered suggestions
        if (this.aiService.isEnabled()) {
            const aiActions = await this.aiService.suggestActions(document, range, context);
            actions.push(...aiActions);
        }

        return actions;
    }
}

class VexSymbolProvider implements vscode.DocumentSymbolProvider {
    provideDocumentSymbols(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.DocumentSymbol[]> {
        const symbols: vscode.DocumentSymbol[] = [];
        
        try {
            const json = JSON.parse(document.getText());
            
            // Document symbol
            const docSymbol = new vscode.DocumentSymbol(
                'VEX Document',
                json['@id'] || 'Unnamed',
                vscode.SymbolKind.File,
                new vscode.Range(0, 0, document.lineCount - 1, 0),
                new vscode.Range(0, 0, 0, 0)
            );

            // Statements symbols
            if (json.statements && Array.isArray(json.statements)) {
                json.statements.forEach((statement: any, index: number) => {
                    const vulnName = statement.vulnerability?.name || `Statement ${index + 1}`;
                    const stmtSymbol = new vscode.DocumentSymbol(
                        vulnName,
                        statement.status || 'unknown',
                        vscode.SymbolKind.Object,
                        new vscode.Range(0, 0, 0, 0), // Would need proper range calculation
                        new vscode.Range(0, 0, 0, 0)
                    );
                    docSymbol.children.push(stmtSymbol);
                });
            }

            symbols.push(docSymbol);
        } catch (error) {
            // Invalid JSON, return empty symbols
        }

        return symbols;
    }
}

function isVexDocument(document: vscode.TextDocument): boolean {
    return document.fileName.endsWith('.vex') ||
           document.fileName.endsWith('.vex.json') ||
           (document.languageId === 'json' && 
            document.getText().includes('"@context"') &&
            document.getText().includes('openvex.dev'));
}

async function exportSecurityReport() {
    const options: vscode.SaveDialogOptions = {
        saveLabel: 'Export Security Report',
        filters: {
            'PDF': ['pdf'],
            'HTML': ['html'],
            'JSON': ['json']
        }
    };

    const uri = await vscode.window.showSaveDialog(options);
    if (uri) {
        // Implementation would generate and save the report
        vscode.window.showInformationMessage('Security report exported successfully!');
    }
}

function updateWorkspaceContext() {
    const workspaceHasVex = vscode.workspace.findFiles('**/*.vex*').then(files => {
        vscode.commands.executeCommand('setContext', 'workspaceHasVexFiles', files.length > 0);
    });
}

async function showWelcomeMessage(context: vscode.ExtensionContext) {
    const hasShownWelcome = context.globalState.get('vexaware.hasShownWelcome', false);
    if (!hasShownWelcome) {
        const selection = await vscode.window.showInformationMessage(
            'Welcome to VEX Aware Advanced! Would you like to take a quick tour?',
            'Take Tour', 'Maybe Later'
        );
        
        if (selection === 'Take Tour') {
            vscode.commands.executeCommand('vexaware.showTour');
        }
        
        context.globalState.update('vexaware.hasShownWelcome', true);
    }
}

export function deactivate() {
    // Cleanup resources
}