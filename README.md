# VEX Aware Tutorial Website

A comprehensive, SEO-optimized **full-stack tutorial website** for VEX Aware - a modern vulnerability management platform. Built with Next.js 16, React, TypeScript, Tailwind CSS, and MongoDB.

## 🚀 Features

- **Full-Stack Architecture**: Next.js API Routes + MongoDB backend with REST API
- **Database-Driven Content**: All tutorials, blogs, and resources stored in MongoDB
- **Modern Tech Stack**: Next.js 16 with App Router, React 19, TypeScript, Tailwind CSS
- **REST API**: Complete CRUD operations for all content types
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

# 4. Run development server
npm run dev

# 5. Build for production
npm run build

# 6. Start production server
npm start
```

For detailed database setup instructions, see [DATABASE_SETUP.md](./DATABASE_SETUP.md).

## 📖 Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **Content**: MDX for rich tutorial content
- **SEO**: Next.js built-in metadata API
- **Analytics**: Google Analytics 4 ready

### Backend
- **Runtime**: Node.js v20
- **API**: Next.js API Routes (REST)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Ready for NextAuth.js integration

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
├── app/                      # Next.js App Router
│   ├── api/                 # REST API Routes
│   │   ├── tutorials/      # Tutorial CRUD endpoints
│   │   ├── blog/           # Blog CRUD endpoints
│   │   ├── use-cases/      # Use case CRUD endpoints
│   │   └── resources/      # Resource CRUD endpoints
│   ├── tutorials/           # Tutorial pages
│   ├── api-docs/           # API documentation pages
│   ├── use-cases/          # Case study pages
│   ├── resources/          # Resource pages
│   ├── blog/               # Blog pages
│   ├── faq/                # FAQ page
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx            # Homepage
│   └── sitemap.ts          # Dynamic sitemap
├── components/              # React components
│   ├── Navigation.tsx
│   ├── Breadcrumbs.tsx
│   ├── CodeBlock.tsx
│   ├── TableOfContents.tsx
│   └── SocialShare.tsx
├── lib/                     # Utility functions & DB
│   ├── db.ts               # MongoDB connection
│   ├── models/             # Mongoose schemas
│   │   ├── Tutorial.ts
│   │   ├── BlogPost.ts
│   │   ├── UseCase.ts
│   │   └── Resource.ts
│   ├── seo.ts              # SEO helpers
│   └── analytics.ts        # Analytics tracking
├── scripts/                 # Utility scripts
│   └── seed-database.js    # Database seeding script
├── types/                   # TypeScript type definitions
│   └── mongoose.d.ts
├── public/                  # Static assets
│   └── robots.txt
├── .env.example            # Environment variables template
├── DATABASE_SETUP.md       # Database setup guide
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
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

The site can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Azure Static Web Apps
- Railway
- Render
- Self-hosted with Node.js

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

- [Next.js](https://nextjs.org/) - React framework with App Router
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [PyPDF2](https://pypdf2.readthedocs.io/) - PDF content extraction

## 🔄 Migration from Static to Full-Stack

This project has been converted from a static Next.js site to a full-stack application:

### What Changed
- ✅ Added MongoDB database for content storage
- ✅ Created Mongoose schemas for all content types
- ✅ Implemented REST API routes for CRUD operations
- ✅ Database seeding script for sample data
- ✅ Full backend infrastructure with Node.js

### What Stayed the Same
- ✅ All existing Tailwind CSS styling (unchanged)
- ✅ All 130+ pages and routes
- ✅ SEO optimization and metadata
- ✅ Interactive components
- ✅ Dark mode support

### Benefits of Full-Stack Architecture
- **Dynamic Content**: Content can be updated without rebuilding
- **API Access**: External applications can fetch content via API
- **Scalability**: Easier to add new features and content types
- **Content Management**: Foundation for future admin dashboard
- **Real-time Updates**: Content changes reflect immediately

---

**Note**: This is a tutorial website for VEX Aware. For the actual VEX Aware platform, please visit the official website.
