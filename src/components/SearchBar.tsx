import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface SearchResult {
  title: string;
  url: string;
  category: string;
  description?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Sample search index - in production, this would come from an API or static JSON
  const searchIndex: SearchResult[] = [
    { title: "What is VEX and Why It Matters", url: "/tutorials/getting-started/what-is-vex-and-why-it-matters", category: "Getting Started" },
    { title: "Installing VEX Aware", url: "/tutorials/getting-started/installing-vex-aware", category: "Getting Started" },
    { title: "Architecture Overview", url: "/tutorials/technical-implementation/architecture-overview", category: "Technical Implementation" },
    { title: "Docker Deployment", url: "/tutorials/technical-implementation/docker-deployment", category: "Technical Implementation" },
    { title: "Kubernetes Deployment", url: "/tutorials/technical-implementation/kubernetes-deployment", category: "Technical Implementation" },
    { title: "Container Security Basics", url: "/tutorials/kubernetes-containers/container-security-basics", category: "Kubernetes & Containers" },
    { title: "Image Scanning", url: "/tutorials/kubernetes-containers/image-scanning", category: "Kubernetes & Containers" },
    { title: "AWS Integration", url: "/tutorials/cloud-native/aws-integration", category: "Cloud Native" },
    { title: "SOC 2 Compliance", url: "/tutorials/compliance/soc2-compliance", category: "Compliance" },
    { title: "Machine Learning Exploitability", url: "/tutorials/advanced/ml-exploitability", category: "Advanced Topics" },
    { title: "API Documentation", url: "/api-docs", category: "Documentation" },
    { title: "Use Cases", url: "/use-cases", category: "Resources" },
    { title: "FAQ", url: "/faq", category: "Support" },
  ];

  useEffect(() => {
    if (query.length > 1) {
      const filtered = searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search tutorials, docs..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <Link
              key={index}
              to={result.url}
              className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {result.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {result.category}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length > 1 && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No results found for "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
