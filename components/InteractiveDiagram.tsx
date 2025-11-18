"use client";

import { useEffect, useRef, useState } from "react";

interface DiagramProps {
  code: string;
  title?: string;
  description?: string;
}

export default function InteractiveDiagram({ code, title, description }: DiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Mermaid dynamically
    const loadMermaid = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({ 
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
        });
        setIsLoaded(true);
        
        if (containerRef.current) {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, code);
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Failed to load Mermaid:', err);
        setError('Failed to render diagram');
      }
    };

    loadMermaid();
  }, [code]);

  return (
    <div className="my-8 border-2 border-purple-200 dark:border-purple-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-3 border-b border-purple-200 dark:border-purple-800">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-xl">📊</span>
          {title || "Interactive Diagram"}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>
      
      <div className="p-6 bg-gray-50 dark:bg-gray-800">
        {error ? (
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : !isLoaded ? (
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-purple-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading diagram...</span>
          </div>
        ) : (
          <div 
            ref={containerRef} 
            className="flex justify-center items-center overflow-x-auto"
          />
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          💡 <strong>Interactive:</strong> This diagram is rendered using Mermaid.js. You can zoom and pan to explore the visualization.
        </p>
      </div>
    </div>
  );
}
