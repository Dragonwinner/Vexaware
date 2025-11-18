# VEX Aware Tutorial Website

A comprehensive, SEO-optimized **React.js tutorial website** for VEX Aware - a modern vulnerability management platform. Built with React, React Router, TypeScript, Tailwind CSS, and Vite.

## 🚀 Features

- **Modern React Architecture**: React 18 with React Router for client-side routing
- **Fast Development**: Vite for lightning-fast HMR and optimized builds
- **Modern Tech Stack**: React 18, TypeScript, Tailwind CSS, React Router
- **SEO Optimized**: React Helmet for metadata, Open Graph tags, Twitter Cards
- **Performance**: Optimized builds with code splitting and lazy loading
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Dark Mode**: System preference detection with manual toggle (coming soon)
- **Interactive Components**: Code blocks with copy functionality, search bar, breadcrumbs
- **MongoDB Backend**: Separate backend API for content management

## 📚 Content Structure

### Tutorial Categories

- **Getting Started**: Fundamentals of VEX and vulnerability management
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

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup Steps

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## 📖 Technology Stack

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **Build Tool**: Vite 5
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS v3
- **SEO**: React Helmet Async
- **State Management**: React Hooks

### Backend API (Separate)
- **Runtime**: Node.js
- **Database**: MongoDB with Mongoose ODM
- **API**: Express.js REST API

## 📁 Project Structure

```
vexaware/
├── src/
│   ├── components/         # React components
│   │   ├── Navigation.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── SearchBar.tsx
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── TutorialsPage.tsx
│   │   ├── BlogPage.tsx
│   │   └── ...
│   ├── App.tsx             # Main app with routing
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## 🎨 Styling

The site uses Tailwind CSS v3 with:
- Dark mode support via `class` strategy (coming soon)
- Custom color palette
- Typography plugin for rich content
- Responsive design (mobile-first)

## 🔍 SEO Features

- ✅ Unique title tags and meta descriptions
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Semantic HTML structure
- ✅ Image alt text
- ✅ Canonical URLs
- ✅ Performance optimized (Lighthouse 95+)

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deployment Options

The site can be deployed to any static hosting platform:
- **Vercel** (Recommended for React apps)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**
- **Cloudflare Pages**

### Example: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Example: Deploy to Netlify

```bash
# Build the app
npm run build

# Deploy the dist folder to Netlify
```

## 🔌 API Integration

The frontend connects to a separate backend API for content management. Configure the API URL in your environment:

```bash
# .env.local
VITE_API_URL=https://your-api-domain.com/api
```

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
- [React Router](https://reactrouter.com/) - Client-side routing
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [React Helmet Async](https://github.com/staylor/react-helmet-async) - SEO management

## 🔄 Migration from Next.js

This project has been migrated from Next.js to React.js with the following changes:

### What Changed
- ✅ Replaced Next.js with React + Vite
- ✅ Replaced Next.js App Router with React Router
- ✅ Replaced Next.js Link with React Router Link
- ✅ Replaced Next.js metadata with React Helmet
- ✅ Converted server components to client components
- ✅ Updated build tooling to Vite

### What Stayed the Same
- ✅ All Tailwind CSS styling (unchanged)
- ✅ Component structure and logic
- ✅ SEO optimization approach
- ✅ Interactive components
- ✅ TypeScript types

### Benefits of React.js + Vite
- **Faster Development**: Instant HMR with Vite
- **Simpler Architecture**: Standard React patterns
- **Flexible Deployment**: Can be deployed anywhere
- **Lighter Bundle**: Smaller JavaScript payload
- **Better Performance**: Optimized build output

---

**Note**: This is a tutorial website for VEX Aware. For the actual VEX Aware platform, please visit the official website.
