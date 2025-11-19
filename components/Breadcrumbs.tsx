import { Link } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span>/</span>
            {index === items.length - 1 ? (
              <span className="text-gray-900 dark:text-white font-medium">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.url}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
