import * as vscode from 'vscode';
import { OpenAI } from 'openai';

export class VexAwareAI {
    private openai: OpenAI | null = null;
    private config: vscode.WorkspaceConfiguration;

    constructor(private context: vscode.ExtensionContext) {
        this.config = vscode.workspace.getConfiguration('vexaware');
        this.initializeAI();
    }

    private initializeAI() {
        const apiKey = this.config.get<string>('openaiApiKey');
        if (apiKey && this.isEnabled()) {
            this.openai = new OpenAI({ apiKey });
        }
    }

    isEnabled(): boolean {
        return this.config.get<boolean>('enableAI', true);
    }

    async generateVexDocument(): Promise<void> {
        if (!this.isEnabled()) {
            vscode.window.showWarningMessage('AI features are disabled. Enable them in settings.');
            return;
        }

        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active editor found.');
                return;
            }

            // Show input dialog for context
            const vulnerability = await vscode.window.showInputBox({
                prompt: 'Enter vulnerability ID (e.g., CVE-2024-1234)',
                placeHolder: 'CVE-2024-1234'
            });

            if (!vulnerability) return;

            const product = await vscode.window.showInputBox({
                prompt: 'Enter product identifier (PURL format preferred)',
                placeHolder: 'pkg:npm/package-name@1.0.0'
            });

            if (!product) return;

            // Generate VEX document using AI
            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generating VEX document with AI...",
                cancellable: true
            }, async (progress, token) => {
                try {
                    const vexDocument = await this.generateVexWithAI(vulnerability, product, progress);
                    
                    // Insert generated content
                    await editor.edit(editBuilder => {
                        const fullRange = new vscode.Range(
                            new vscode.Position(0, 0),
                            new vscode.Position(editor.document.lineCount, 0)
                        );
                        editBuilder.replace(fullRange, JSON.stringify(vexDocument, null, 2));
                    });

                    vscode.window.showInformationMessage('VEX document generated successfully!');
                } catch (error) {
                    vscode.window.showErrorMessage(`AI generation failed: ${error}`);
                }
            });

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to generate VEX document: ${error}`);
        }
    }

    async analyzeVulnerability(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText) {
            vscode.window.showErrorMessage('Please select a vulnerability ID to analyze.');
            return;
        }

        const cveMatch = selectedText.match(/CVE-\d{4}-\d{4,}/);
        if (!cveMatch) {
            vscode.window.showErrorMessage('Selected text is not a valid CVE identifier.');
            return;
        }

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Analyzing ${cveMatch[0]}...`,
            cancellable: true
        }, async (progress, token) => {
            try {
                const analysis = await this.performVulnerabilityAnalysis(cveMatch[0], progress);
                this.showAnalysisResults(analysis);
            } catch (error) {
                vscode.window.showErrorMessage(`Analysis failed: ${error}`);
            }
        });
    }

    async getCompletions(
        document: vscode.TextDocument, 
        position: vscode.Position
    ): Promise<vscode.CompletionItem[]> {
        if (!this.isEnabled() || !this.openai) {
            return [];
        }

        const items: vscode.CompletionItem[] = [];
        const context = this.getDocumentContext(document, position);

        try {
            // Use AI to suggest contextually relevant completions
            const suggestions = await this.getAICompletions(context);
            
            suggestions.forEach(suggestion => {
                const item = new vscode.CompletionItem(
                    suggestion.label,
                    vscode.CompletionItemKind.Text
                );
                item.insertText = suggestion.insertText;
                item.detail = suggestion.detail;
                item.documentation = suggestion.documentation;
                items.push(item);
            });

        } catch (error) {
            console.error('AI completion failed:', error);
        }

        return items;
    }

    async suggestActions(
        document: vscode.TextDocument,
        range: vscode.Range,
        context: vscode.CodeActionContext
    ): Promise<vscode.CodeAction[]> {
        if (!this.isEnabled()) return [];

        const actions: vscode.CodeAction[] = [];
        const documentText = document.getText(range);

        try {
            // AI-powered quick fixes
            const suggestions = await this.getAIQuickFixes(documentText, context);
            
            suggestions.forEach(suggestion => {
                const action = new vscode.CodeAction(
                    suggestion.title,
                    vscode.CodeActionKind.QuickFix
                );
                action.edit = suggestion.edit;
                action.diagnostics = context.diagnostics;
                actions.push(action);
            });

        } catch (error) {
            console.error('AI action suggestions failed:', error);
        }

        return actions;
    }

    private async generateVexWithAI(
        vulnerability: string, 
        product: string, 
        progress: vscode.Progress<{message?: string; increment?: number}>
    ): Promise<any> {
        if (!this.openai) {
            throw new Error('OpenAI client not initialized');
        }

        progress.report({ message: 'Fetching vulnerability data...', increment: 25 });

        const prompt = `Generate a complete VEX (Vulnerability Exploitability eXchange) document for:
- Vulnerability: ${vulnerability}
- Product: ${product}

The document should follow the OpenVEX specification and include:
1. Proper @context and @id
2. Author and timestamp information
3. A vulnerability statement with appropriate status and justification
4. Impact and action statements

Please analyze the vulnerability and make an educated assessment of whether the product is affected.
Return only valid JSON that conforms to the VEX schema.`;

        progress.report({ message: 'Generating VEX document...', increment: 50 });

        const response = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a cybersecurity expert specializing in VEX documents. Generate accurate, well-structured VEX documents based on vulnerability and product information."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.3,
            max_tokens: 2000
        });

        progress.report({ message: 'Processing response...', increment: 75 });

        const generatedContent = response.choices[0]?.message?.content;
        if (!generatedContent) {
            throw new Error('No response from AI service');
        }

        try {
            const vexDocument = JSON.parse(generatedContent);
            progress.report({ message: 'Complete!', increment: 100 });
            return vexDocument;
        } catch (error) {
            throw new Error('AI generated invalid JSON');
        }
    }

    private async performVulnerabilityAnalysis(
        cveId: string,
        progress: vscode.Progress<{message?: string; increment?: number}>
    ): Promise<any> {
        if (!this.openai) {
            throw new Error('OpenAI client not initialized');
        }

        progress.report({ message: 'Analyzing vulnerability...', increment: 50 });

        const prompt = `Analyze the vulnerability ${cveId} and provide:
1. CVSS score and severity
2. Affected components/products
3. Attack vectors and prerequisites
4. Available mitigations
5. Recommended VEX status (affected/not_affected/fixed/under_investigation)
6. Suggested justification if not affected

Please provide a comprehensive security analysis.`;

        const response = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a cybersecurity analyst providing detailed vulnerability assessments."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.2,
            max_tokens: 1500
        });

        progress.report({ increment: 100 });

        return {
            vulnerability: cveId,
            analysis: response.choices[0]?.message?.content || 'Analysis unavailable'
        };
    }

    private getDocumentContext(document: vscode.TextDocument, position: vscode.Position): string {
        const line = document.lineAt(position);
        const linePrefix = line.text.substr(0, position.character);
        const lineSuffix = line.text.substr(position.character);
        
        return `${linePrefix}|CURSOR|${lineSuffix}`;
    }

    private async getAICompletions(context: string): Promise<any[]> {
        if (!this.openai) return [];

        const response = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a VEX document completion assistant. Suggest appropriate completions based on context."
                },
                {
                    role: "user",
                    content: `Context: ${context}\nSuggest relevant VEX property completions.`
                }
            ],
            temperature: 0.3,
            max_tokens: 500
        });

        // Parse and return suggestions (implementation would be more sophisticated)
        return [];
    }

    private async getAIQuickFixes(text: string, context: vscode.CodeActionContext): Promise<any[]> {
        if (!this.openai) return [];

        // Implementation would analyze diagnostics and suggest fixes
        return [];
    }

    private showAnalysisResults(analysis: any): void {
        const panel = vscode.window.createWebviewPanel(
            'vexAnalysis',
            `Vulnerability Analysis: ${analysis.vulnerability}`,
            vscode.ViewColumn.Beside,
            {
                enableScripts: true
            }
        );

        panel.webview.html = this.getAnalysisHtml(analysis);
    }

    private getAnalysisHtml(analysis: any): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vulnerability Analysis</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 20px;
            line-height: 1.6;
        }
        .header {
            border-bottom: 1px solid var(--vscode-panel-border);
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .section {
            margin-bottom: 20px;
        }
        .vulnerability-id {
            font-size: 1.5em;
            font-weight: bold;
            color: var(--vscode-errorForeground);
        }
        pre {
            background-color: var(--vscode-textCodeBlock-background);
            padding: 10px;
            border-radius: 4px;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="vulnerability-id">${analysis.vulnerability}</div>
    </div>
    
    <div class="section">
        <h2>Analysis Results</h2>
        <pre>${analysis.analysis}</pre>
    </div>
</body>
</html>`;
    }
}