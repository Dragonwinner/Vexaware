import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "VEX Aware Tutorial - Complete Guide to Vulnerability Management",
    template: "%s - VEX Aware Tutorial"
  },
  description: "Learn VEX Aware from basics to advanced. Free tutorials on vulnerability exploitability, SBOM integration, container security, and compliance.",
  keywords: ["VEX", "vulnerability management", "security", "SBOM", "container security", "compliance", "tutorial"],
  authors: [{ name: "VEX Aware" }],
  creator: "VEX Aware",
  publisher: "VEX Aware",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vexaware.com",
    siteName: "VEX Aware Tutorial",
    title: "VEX Aware Tutorial - Complete Guide to Vulnerability Management",
    description: "Learn VEX Aware from basics to advanced. Free tutorials on vulnerability exploitability, SBOM integration, container security, and compliance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VEX Aware Tutorial - Complete Guide to Vulnerability Management",
    description: "Learn VEX Aware from basics to advanced. Free tutorials on vulnerability exploitability, SBOM integration, container security, and compliance.",
    creator: "@VexAwareTutorial",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://vexaware.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "VEX Aware Tutorial",
              "url": "https://vexaware.com",
              "description": "Complete guide to vulnerability management with VEX Aware",
              "publisher": {
                "@type": "Organization",
                "name": "VEX Aware",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
