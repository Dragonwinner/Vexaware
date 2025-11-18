# VEX Aware Tutorial Website

A comprehensive, SEO-optimized tutorial website for VEX Aware - a modern vulnerability management platform. Built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, React, TypeScript, Tailwind CSS
- **SEO Optimized**: Built-in metadata, Open Graph tags, Twitter Cards, JSON-LD structured data
- **Performance**: Static generation, optimized images, Core Web Vitals optimized
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Dark Mode**: System preference detection with manual toggle
- **Interactive Components**: Code blocks with copy functionality, table of contents, breadcrumbs
- **Real Content**: Tutorials extracted from the official VEX Aware Complete Guide PDF

## 📚 Content Structure

### Tutorial Categories

- **Getting Started**: Fundamentals of VEX and vulnerability management
  - What is VEX and Why It Matters
  - Understanding the Vulnerability Management Crisis
  - Introduction to VEX Aware Platform
  - Installing VEX Aware
  - Your First VEX Document
  - Dashboard Tour

- **Technical Implementation**: Deployment and configuration guides
- **Kubernetes & Containers**: Container security tutorials
- **Cloud Native**: Microservices and serverless security
- **Compliance & Audit**: SOC 2, PCI DSS, HIPAA, ISO 27001
- **Advanced Topics**: ML-based exploitability, supply chain security

### Additional Resources

- **API Documentation**: Complete REST API reference
- **Use Cases**: Real-world case studies with metrics
- **Resources**: Templates, code samples, tools
- **Blog**: Security insights and best practices
- **FAQ**: Common questions and answers

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for uncommitted changes (runs automatically before build)
npm run check-uncommitted
```

### Pre-build Checks

The project includes automatic checks that run before building:

- **Uncommitted Changes Detection**: The build process will automatically check for uncommitted git changes and fail if any are detected. This ensures all code is properly versioned before deployment.
  - Automatically skipped in CI/CD environments (Vercel, GitHub Actions, etc.)
  - To bypass this check locally, set environment variable: `SKIP_UNCOMMITTED_CHECK=true npm run build`
  - Or run Next.js directly: `next build`
  - Or commit your changes: `git add . && git commit -m "your message"`

## 📖 Development

The site is built using:

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **Content**: MDX for rich tutorial content
- **SEO**: Next.js built-in metadata API
- **Analytics**: Google Analytics 4 ready

## 📁 Project Structure

```
vexaware/
├── app/                      # Next.js App Router pages
│   ├── tutorials/           # Tutorial content
│   ├── api-docs/           # API documentation
│   ├── use-cases/          # Case studies
│   ├── resources/          # Downloads and tools
│   ├── blog/               # Blog posts
│   ├── faq/                # FAQ page
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx            # Homepage
│   └── sitemap.ts          # Dynamic sitemap
├── components/              # React components
│   ├── Breadcrumbs.tsx
│   ├── CodeBlock.tsx
│   ├── TableOfContents.tsx
│   └── SocialShare.tsx
├── lib/                     # Utility functions
│   ├── seo.ts              # SEO helpers
│   └── analytics.ts        # Analytics tracking
├── public/                  # Static assets
│   └── robots.txt
└── content/                 # MDX content files
```

## 🎨 Styling

The site uses Tailwind CSS v4 with:
- Dark mode support via `class` strategy
- Custom color palette
- Typography plugin for rich content
- Responsive design (mobile-first)

## 🔍 SEO Features

- ✅ Unique title tags and meta descriptions
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ JSON-LD structured data (Article, HowTo, FAQ, Breadcrumb)
- ✅ Semantic HTML structure
- ✅ Image alt text
- ✅ XML sitemap
- ✅ Robots.txt with AI crawler support
- ✅ Canonical URLs
- ✅ Performance optimized (Lighthouse 95+)

## 📊 Analytics

The site includes Google Analytics 4 integration with custom events:
- Tutorial started/completed
- Code copied
- Search performed
- Feedback submitted

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The site can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Azure Static Web Apps
- Self-hosted with Node.js

## 📝 Content Updates

Tutorial content is extracted from `vex-aware-complete-guide.pdf`. To update content:

1. Place the updated PDF in the root directory
2. Run the extraction script (if available)
3. Update tutorial pages in `app/tutorials/`

## 🔒 Pre-build Checks

This project includes automated checks to ensure code quality:

- **Uncommitted Changes Detection**: Automatically checks for uncommitted git changes before building
- See [docs/UNCOMMITTED_CHANGES_CHECK.md](docs/UNCOMMITTED_CHANGES_CHECK.md) for detailed documentation

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run build`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [VEX Aware Website](https://vexaware.com)
- [Documentation](https://vexaware.com/tutorials/getting-started)
- [API Reference](https://vexaware.com/api-docs)

## 🏗️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [PyPDF2](https://pypdf2.readthedocs.io/) - PDF content extraction

---

**Note**: This is a tutorial website for VEX Aware. For the actual VEX Aware platform, please visit the official website.
