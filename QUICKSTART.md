# VEX Aware Full-Stack Tutorial Website - Quick Start Guide

## 🚀 What Is This?

A complete, production-ready full-stack tutorial website for VEX Aware vulnerability management platform.

### Tech Stack
```
Frontend:  Next.js 16 + React 19 + Tailwind CSS + TypeScript
Backend:   Node.js + Next.js API Routes
Database:  MongoDB + Mongoose ODM
Content:   130+ Tutorial Pages
API:       12 REST Endpoints
```

## ⚡ Quick Start (5 Minutes)

### Option 1: With Database (Full Stack)

```bash
# 1. Install dependencies
npm install

# 2. Set up MongoDB (choose one):
#    A. Local MongoDB
brew install mongodb-community && brew services start mongodb-community

#    B. MongoDB Atlas (cloud)
#    - Go to mongodb.com/cloud/atlas
#    - Create free cluster
#    - Get connection string

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local and set:
# MONGODB_URI=mongodb://localhost:27017/vexaware
# or
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vexaware

# 4. Seed database with sample content
npm run seed

# 5. Start development server
npm run dev

# 6. Open browser
# Website: http://localhost:3000
# API: http://localhost:3000/api/tutorials
# Examples: http://localhost:3000/api-docs/examples
```

### Option 2: Without Database (Static Only)

```bash
# Just run the site without backend features
npm install
npm run dev
# Visit http://localhost:3000
```

## 📚 What's Included?

### Content (130+ Pages)
- ✅ 81 Tutorial pages across 6 categories
- ✅ 10 Blog articles
- ✅ 10 Use case studies
- ✅ 10 Resource pages
- ✅ API documentation
- ✅ FAQ and more

### Features
- ✅ Full-stack architecture (frontend + backend + database)
- ✅ REST API with CRUD operations
- ✅ Beautiful Tailwind CSS styling
- ✅ Dark mode support
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized
- ✅ TypeScript throughout
- ✅ Interactive components
- ✅ Search functionality
- ✅ Code examples with syntax highlighting

## 🔌 Using the API

### Fetch Data
```javascript
// Get all tutorials
const response = await fetch('/api/tutorials');
const { data } = await response.json();

// Get tutorials by category
const response = await fetch('/api/tutorials?category=getting-started');
const { data } = await response.json();

// Get single tutorial
const response = await fetch('/api/tutorials/what-is-vex-and-why-it-matters');
const { data } = await response.json();
```

### Create Content
```javascript
await fetch('/api/tutorials', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My New Tutorial',
    slug: 'my-new-tutorial',
    category: 'getting-started',
    description: 'Tutorial description',
    content: '# Tutorial Content\n\nMarkdown content here...',
    difficulty: 'Beginner',
    duration: '15 min',
    tags: ['tutorial', 'beginner'],
    keywords: ['keyword1', 'keyword2'],
  })
});
```

### Update Content
```javascript
await fetch('/api/tutorials/my-new-tutorial', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    duration: '20 min',
    content: '# Updated Content\n\nNew content here...',
  })
});
```

### Delete Content
```javascript
await fetch('/api/tutorials/my-new-tutorial', {
  method: 'DELETE'
});
```

## 📖 Documentation

### Essential Guides
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Complete database setup instructions
- **[FULLSTACK_CONVERSION.md](./FULLSTACK_CONVERSION.md)** - Detailed conversion summary
- **[README.md](./README.md)** - Main project documentation
- **[/api-docs/examples](http://localhost:3000/api-docs/examples)** - Live API examples

### API Endpoints

**Tutorials** (`/api/tutorials`)
- GET - List all | GET /[slug] - Get one
- POST - Create | PUT /[slug] - Update | DELETE /[slug] - Remove

**Blog Posts** (`/api/blog`)
- GET - List all | GET /[slug] - Get one
- POST - Create | PUT /[slug] - Update | DELETE /[slug] - Remove

**Use Cases** (`/api/use-cases`)
- GET - List all | GET /[slug] - Get one
- POST - Create | PUT /[slug] - Update | DELETE /[slug] - Remove

**Resources** (`/api/resources`)
- GET - List all | GET /[slug] - Get one
- POST - Create | PUT /[slug] - Update | DELETE /[slug] - Remove

## 🎨 Styling

**Tailwind CSS v4** is already implemented throughout the entire project.

- ✅ Consistent design system
- ✅ Dark mode support
- ✅ Responsive layouts
- ✅ Beautiful components
- ✅ Accessible UI elements
- ✅ Tutorial-friendly interface

**No CSS changes needed** - the styling is already excellent!

## 🚢 Deployment

### Vercel (Recommended)

```bash
# 1. Push code to GitHub
git push origin main

# 2. Import project in Vercel
# 3. Add environment variable:
#    MONGODB_URI = your-mongodb-atlas-connection-string

# 4. Deploy!
```

### Environment Variables for Production
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vexaware
NEXT_PUBLIC_API_URL=https://your-domain.com
```

## 📁 Project Structure

```
vexaware/
├── app/
│   ├── api/              # 🆕 REST API routes
│   │   ├── tutorials/    # Tutorial CRUD
│   │   ├── blog/         # Blog CRUD
│   │   ├── use-cases/    # Use case CRUD
│   │   └── resources/    # Resource CRUD
│   ├── tutorials/        # 130+ tutorial pages
│   ├── api-docs/         # API documentation
│   │   └── examples/     # 🆕 API examples page
│   ├── blog/             # Blog pages
│   ├── use-cases/        # Case study pages
│   └── ...
├── lib/
│   ├── db.ts            # 🆕 MongoDB connection
│   └── models/          # 🆕 Database schemas
│       ├── Tutorial.ts
│       ├── BlogPost.ts
│       ├── UseCase.ts
│       └── Resource.ts
├── components/          # React components
├── scripts/
│   └── seed-database.js # 🆕 Database seeding
├── types/
│   └── mongoose.d.ts    # 🆕 Type definitions
├── .env.example         # 🆕 Environment template
└── ...
```

## 🧪 Testing

### Test the Website
```bash
npm run dev
# Visit http://localhost:3000
```

### Test the API
```bash
# With curl
curl http://localhost:3000/api/tutorials

# With browser
open http://localhost:3000/api/tutorials

# See examples page
open http://localhost:3000/api-docs/examples
```

### Build for Production
```bash
npm run build
npm start
```

## 🆘 Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Make sure MongoDB is running
```bash
# Check if running
ps aux | grep mongod

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Seed Script Fails
```
Error: Duplicate key error
```
**Solution**: Clear existing data first
```bash
# In MongoDB shell
mongosh
use vexaware
db.dropDatabase()
exit

# Run seed again
npm run seed
```

## 🎯 Next Steps

1. ✅ **Basic Setup**: Website runs → You're here!
2. 📊 **Add Database**: Follow DATABASE_SETUP.md
3. 🌱 **Seed Data**: Run `npm run seed`
4. 🔌 **Use API**: Visit /api-docs/examples
5. 🚀 **Deploy**: Push to Vercel with MongoDB Atlas

## 💡 Pro Tips

- Use **MongoDB Atlas** for production (free tier available)
- Check **/api-docs/examples** for copy-paste code snippets
- All API responses use consistent JSON format
- TypeScript provides full IntelliSense support
- Dark mode works automatically based on system preference

## 📞 Resources

- **Live Examples**: http://localhost:3000/api-docs/examples
- **API Docs**: http://localhost:3000/api-docs
- **Tutorials**: http://localhost:3000/tutorials/getting-started
- **GitHub**: https://github.com/Dragonwinner/Vexaware

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB setup (local or Atlas)
- [ ] Dependencies installed (`npm install`)
- [ ] Environment configured (`.env.local`)
- [ ] Database seeded (`npm run seed`)
- [ ] Dev server running (`npm run dev`)
- [ ] Website loads at http://localhost:3000
- [ ] API responds at http://localhost:3000/api/tutorials

---

**You're ready to go! 🎉**

Visit http://localhost:3000 to see the site, or http://localhost:3000/api-docs/examples to start using the API.
