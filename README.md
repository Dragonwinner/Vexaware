# VEX Aware Tutorial Website

A comprehensive, SEO-optimized **full-stack tutorial website** for VEX Aware - a modern vulnerability management platform. Built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, **Express.js**, and **MongoDB**.

## 🚀 Features

- **Full-Stack Architecture**: Express.js API + MongoDB backend with REST API
- **Database-Driven Content**: All tutorials, blogs, and resources stored in MongoDB
- **Modern Tech Stack**: React 19, Vite, TypeScript, Tailwind CSS, Express.js
- **REST API**: Complete CRUD operations for all content types
- **SEO Optimized**: React Helmet for metadata, Open Graph tags, Twitter Cards
- **Performance**: Vite for fast development and optimized production builds
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

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher) - [Installation Guide](./DATABASE_SETUP.md)

### Setup Steps

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your MongoDB URI

# 3. Seed the database (optional, for development)
npm run seed

# 4. Run development servers (requires two terminals)

## Terminal 1: Start the Express API server
npm run server:dev

## Terminal 2: Start the Vite dev server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

For detailed database setup instructions, see [DATABASE_SETUP.md](./DATABASE_SETUP.md).

## 📖 Technology Stack

### Frontend
- **Framework**: React 19 with React Router
- **Build Tool**: Vite 7.x
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **SEO**: React Helmet Async
- **State Management**: React Hooks

### Backend
- **Runtime**: Node.js v20
- **API Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Ready for integration

### Database Schema
- **Tutorials**: Complete tutorial content with metadata
- **Blog Posts**: Security articles and best practices
- **Use Cases**: Industry-specific case studies
- **Resources**: Templates, samples, and tools

## 🔌 API Endpoints

The application provides a full REST API for content management:

### Tutorials API
- `GET /api/tutorials` - List all tutorials
- `GET /api/tutorials?category=getting-started` - Filter by category
- `GET /api/tutorials/[slug]` - Get single tutorial
- `POST /api/tutorials` - Create new tutorial
- `PUT /api/tutorials/[slug]` - Update tutorial
- `DELETE /api/tutorials/[slug]` - Delete tutorial

### Blog API
- `GET /api/blog` - List all blog posts
- `GET /api/blog/[slug]` - Get single blog post
- `POST /api/blog` - Create new blog post
- `PUT /api/blog/[slug]` - Update blog post
- `DELETE /api/blog/[slug]` - Delete blog post

### Use Cases API
- `GET /api/use-cases` - List all use cases
- `GET /api/use-cases/[slug]` - Get single use case
- `POST /api/use-cases` - Create new use case
- `PUT /api/use-cases/[slug]` - Update use case
- `DELETE /api/use-cases/[slug]` - Delete use case

### Resources API
- `GET /api/resources` - List all resources
- `GET /api/resources/[slug]` - Get single resource
- `POST /api/resources` - Create new resource
- `PUT /api/resources/[slug]` - Update resource
- `DELETE /api/resources/[slug]` - Delete resource

## 📁 Project Structure

```
vexaware/
├── src/                      # React application source
│   ├── components/          # React components
│   │   ├── Navigation.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── TableOfContents.tsx
│   │   └── SearchBar.tsx
│   ├── pages/               # Page components
│   │   └── Home.tsx
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # App entry point
│   └── globals.css          # Global styles
├── server/                   # Express.js backend
│   ├── routes/              # API route handlers
│   │   ├── tutorials.ts
│   │   ├── blog.ts
│   │   ├── use-cases.ts
│   │   └── resources.ts
│   ├── lib/                 # Server utilities
│   │   ├── db.ts           # MongoDB connection
│   │   └── models/         # Mongoose schemas
│   │       ├── Tutorial.ts
│   │       ├── BlogPost.ts
│   │       ├── UseCase.ts
│   │       └── Resource.ts
│   └── index.ts            # Express server entry
├── public/                  # Static assets
│   └── robots.txt
├── scripts/                 # Utility scripts
│   └── seed-database.js    # Database seeding script
├── types/                   # TypeScript type definitions
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config (client)
├── tsconfig.server.json    # TypeScript config (server)
├── .env.example            # Environment variables template
└── package.json
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

### Environment Variables

Set the following environment variables in your deployment platform:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vexaware
PORT=5000
```

### Deploying the Frontend (Vite/React)

The frontend can be deployed to any static hosting service:
- **Vercel**: Connect your Git repository and deploy
- **Netlify**: Import project and configure build settings
- **AWS S3 + CloudFront**: Upload dist folder after build
- **GitHub Pages**: Use gh-pages for deployment

Build command: `npm run build`
Publish directory: `dist`

### Deploying the Backend (Express API)

The backend can be deployed to any Node.js hosting platform:
- **Heroku**: Deploy using Heroku CLI or GitHub integration
- **Railway**: Connect repository and auto-deploy
- **AWS Elastic Beanstalk**: Deploy Node.js application
- **DigitalOcean App Platform**: Connect Git repository
- **Render**: Deploy as Web Service

Start command: `node server/index.js` (after compilation)

**Important:** Ensure MongoDB is accessible from your deployment environment. Use MongoDB Atlas for production.

## 📝 Content Management

### Adding Content via API

You can add content programmatically using the REST API:

```javascript
// Example: Create a new tutorial
const response = await fetch('/api/tutorials', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Tutorial',
    slug: 'new-tutorial',
    category: 'getting-started',
    description: 'Tutorial description',
    content: 'Tutorial content in markdown...',
    difficulty: 'Beginner',
    duration: '15 min',
    tags: ['tutorial', 'beginner'],
    keywords: ['keyword1', 'keyword2'],
    published: true
  })
});
```

### Database Seeding

To populate the database with sample content:

```bash
npm run seed
```

This will insert sample tutorials, blog posts, use cases, and resources into MongoDB.

### Future: Admin Dashboard

An admin dashboard for content management through a web UI can be added in future iterations.

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

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - UI library
- [React Router](https://reactrouter.com/) - Client-side routing
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM

## 🔄 Migration from Next.js to React

This project has been migrated from Next.js to React with Vite:

### What Changed
- ✅ Migrated from Next.js App Router to React with React Router
- ✅ Replaced Next.js API Routes with Express.js backend
- ✅ Changed build tool from Next.js to Vite for faster development
- ✅ Updated SEO management from Next.js metadata API to React Helmet
- ✅ Converted all Next.js Link components to React Router Link
- ✅ Removed MDX dependencies (can be added back if needed)
- ✅ Separated frontend and backend into distinct applications

### Benefits of React + Vite Architecture
- **Faster Development**: Vite HMR is significantly faster than Next.js
- **Simpler Architecture**: Clear separation between frontend and backend
- **More Flexible**: Can deploy frontend and backend independently
- **Better Performance**: Optimized production builds with Vite
- **Easier to Understand**: Standard React patterns without Next.js abstractions
- **Wider Deployment Options**: Frontend can be deployed to any static host

### Migration Notes
- The original Next.js `app/` directory has been preserved for reference
- All MongoDB models and database logic remain unchanged
- API endpoints maintain the same structure and responses
- Frontend routing uses React Router instead of file-based routing

---

**Note**: This is a tutorial website for VEX Aware. For the actual VEX Aware platform, please visit the official website.
