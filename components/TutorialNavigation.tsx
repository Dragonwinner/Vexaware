import { Link } from "react-router-dom";

interface NavigationItem {
  title: string;
  href: string;
  description?: string;
}

interface TutorialNavigationProps {
  previousArticle?: NavigationItem;
  nextArticle?: NavigationItem;
}

export default function TutorialNavigation({ previousArticle, nextArticle }: TutorialNavigationProps) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Article */}
        {previousArticle ? (
          <Link
            to={previousArticle.href}
            className="group flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Previous
              </p>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {previousArticle.title}
              </h3>
              {previousArticle.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {previousArticle.description}
                </p>
              )}
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {/* Next Article */}
        {nextArticle && (
          <Link
            to={nextArticle.href}
            className="group flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex-1 min-w-0 text-right">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Next
              </p>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {nextArticle.title}
              </h3>
              {nextArticle.description && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {nextArticle.description}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 ml-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Continue Your Learning Journey
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore more tutorials and master VEX Aware step by step
            </p>
          </div>
          <Link
            to="/tutorials/getting-started"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap text-sm font-medium"
          >
            View All Tutorials
          </Link>
        </div>
      </div>
    </div>
  );
}