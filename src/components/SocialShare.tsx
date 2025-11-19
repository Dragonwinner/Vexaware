
interface SocialShareProps {
  title: string;
  url: string;
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: "𝕏",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:bg-black",
    },
    {
      name: "LinkedIn",
      icon: "in",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-blue-700",
    },
    {
      name: "Reddit",
      icon: "⬆",
      url: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: "hover:bg-orange-600",
    },
  ];

  return (
    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
      <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${link.color} transition-colors`}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
