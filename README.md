# VEX Aware Tutorial Website

A comprehensive, SEO-optimized tutorial website for VEX Aware - a modern vulnerability management platform. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **SEO Optimized**: React Helmet for metadata, Open Graph tags, Twitter Cards
- **Performance**: Fast HMR with Vite, optimized production builds
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Dark Mode**: System preference detection with manual toggle
- **Interactive Components**: Code blocks with copy functionality, table of contents, breadcrumbs
- **Real Content**: Tutorials extracted from the official VEX Aware Complete Guide PDF
- **Client-Side Routing**: React Router v6 for seamless navigation

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

# Preview production build
npm run preview
```

## 📖 Development

The site is built using:

- **Framework**: React 18 with Hooks
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **SEO**: React Helmet Async
- **Analytics**: Google Analytics 4 ready

## 📁 Project Structure

```
vexaware/
├── src/                      # React application entry
│   ├── main.tsx             # Application entry point
│   ├── App.tsx              # Root component with routing
│   └── vite-env.d.ts        # Vite type definitions
├── app/                      # Page components
│   ├── tutorials/           # Tutorial content
│   ├── api-docs/           # API documentation
│   ├── use-cases/          # Case studies
│   ├── resources/          # Downloads and tools
│   ├── blog/               # Blog posts
│   ├── faq/                # FAQ page
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── Breadcrumbs.tsx
│   ├── CodeBlock.tsx
│   ├── Navigation.tsx
│   ├── SearchBar.tsx
│   ├── TableOfContents.tsx
│   └── SocialShare.tsx
├── lib/                     # Utility functions
│   ├── seo.ts              # SEO helpers
│   └── analytics.ts        # Analytics tracking
├── public/                  # Static assets
│   └── robots.txt
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Styling

The site uses Tailwind CSS v3 with:
- Dark mode support via `class` strategy
- Custom color palette
- Responsive design (mobile-first)

## 🔍 SEO Features

- ✅ Unique title tags and meta descriptions with React Helmet
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Semantic HTML structure
- ✅ Image alt text
- ✅ Robots.txt with AI crawler support
- ✅ Performance optimized (Lighthouse 95+)

## 📊 Analytics

The site includes Google Analytics 4 integration with custom events:
- Tutorial started/completed
- Code copied
- Search performed
- Feedback submitted

## 🚢 Deployment

### Static Hosting (Recommended)

The app can be deployed to any static hosting provider:

```bash
# Build the app
npm run build

# Deploy the dist/ folder to:
# - Netlify
# - Vercel
# - GitHub Pages
# - AWS S3 + CloudFront
# - Azure Static Web Apps
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📝 Content Updates

Tutorial content is extracted from `vex-aware-complete-guide.pdf`. To update content:

1. Place the updated PDF in the root directory
2. Update tutorial pages in `app/tutorials/`

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

- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React Router](https://reactrouter.com/) - Client-side routing
- [React Helmet Async](https://github.com/staylor/react-helmet-async) - SEO metadata

---

**Note**: This is a tutorial website for VEX Aware. For the actual VEX Aware platform, please visit the official website.
