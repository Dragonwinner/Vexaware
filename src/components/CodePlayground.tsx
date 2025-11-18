import { useState } from "react";

interface CodePlaygroundProps {
  initialCode: string;
  language: string;
  title?: string;
  description?: string;
}

export default function CodePlayground({ 
  initialCode, 
  language, 
  title = "Try it yourself",
  description 
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput("Running code...");
    
    // Simulate code execution
    setTimeout(() => {
      try {
        if (language === "bash" || language === "shell") {
          setOutput(`$ ${code}\n\n✓ Command executed successfully\n\nOutput:\nVEX document generated: vex-document.json\nStatus: not_affected\nVulnerabilities analyzed: 42\nFalse positives reduced: 85%`);
        } else if (language === "javascript" || language === "typescript") {
          setOutput(`✓ Code executed successfully\n\n> ${code}\n\nResult:\n{ success: true, vulnerabilities: 42, status: 'analyzed' }`);
        } else if (language === "json") {
          setOutput(`✓ JSON validated successfully\n\nParsed structure:\n- vulnerability: CVE-2024-1234\n- status: not_affected\n- justification: vulnerable_code_not_in_execute_path`);
        } else {
          setOutput(`✓ Code executed successfully\n\nOutput: Command completed without errors`);
        }
      } catch (error) {
        setOutput(`✗ Error: ${error}`);
      }
      setIsRunning(false);
    }, 1500);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
  };

  return (
    <div className="my-8 border-2 border-blue-200 dark:border-blue-800 rounded-lg overflow-hidden">
      <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-xl">⚡</span>
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetCode}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              disabled={isRunning}
            >
              Reset
            </button>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isRunning ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Running...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Run Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900">
        <div className="p-4">
          <div className="mb-2 text-xs text-gray-500 dark:text-gray-500 font-semibold uppercase">
            Editor
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-40 p-3 font-mono text-sm bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100"
            spellCheck={false}
          />
        </div>

        {output && (
          <div className="px-4 pb-4">
            <div className="mb-2 text-xs text-gray-500 dark:text-gray-500 font-semibold uppercase">
              Output
            </div>
            <pre className="p-3 bg-gray-900 dark:bg-black text-green-400 rounded font-mono text-sm overflow-x-auto whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          💡 <strong>Tip:</strong> Modify the code above and click "Run Code" to see the results. This is a simulated environment for learning purposes.
        </p>
      </div>
    </div>
  );
}
