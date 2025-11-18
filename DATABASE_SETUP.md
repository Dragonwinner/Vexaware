# Database Setup Guide

This guide explains how to set up and use the MongoDB database for the VEX Aware Tutorial website.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)

## Installation Options

### Option 1: Local MongoDB

1. **Install MongoDB locally:**
   - macOS: `brew install mongodb-community`
   - Ubuntu: `sudo apt-get install mongodb`
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

2. **Start MongoDB:**
   ```bash
   # macOS/Linux
   mongod --dbpath /path/to/data/directory
   
   # Or use brew services on macOS
   brew services start mongodb-community
   ```

3. **Set environment variable:**
   ```bash
   echo "MONGODB_URI=mongodb://localhost:27017/vexaware" > .env.local
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create a free account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster:**
   - Click "Build a Database"
   - Select "Shared" (Free tier)
   - Choose your region
   - Click "Create Cluster"

3. **Get connection string:**
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

4. **Set environment variable:**
   ```bash
   echo "MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vexaware" > .env.local
   ```

## Database Seeding

Populate the database with sample content:

```bash
npm run seed
```

This will:
- Clear existing data
- Insert sample tutorials
- Insert sample blog posts
- Insert sample use cases
- Insert sample resources

## API Endpoints

### Tutorials

- `GET /api/tutorials` - Get all tutorials
- `GET /api/tutorials?category=getting-started` - Filter by category
- `GET /api/tutorials/[slug]` - Get single tutorial
- `POST /api/tutorials` - Create new tutorial
- `PUT /api/tutorials/[slug]` - Update tutorial
- `DELETE /api/tutorials/[slug]` - Delete tutorial

### Blog Posts

- `GET /api/blog` - Get all blog posts
- `GET /api/blog/[slug]` - Get single blog post
- `POST /api/blog` - Create new blog post
- `PUT /api/blog/[slug]` - Update blog post
- `DELETE /api/blog/[slug]` - Delete blog post

### Use Cases

- `GET /api/use-cases` - Get all use cases
- `GET /api/use-cases?industry=healthcare` - Filter by industry
- `GET /api/use-cases/[slug]` - Get single use case
- `POST /api/use-cases` - Create new use case
- `PUT /api/use-cases/[slug]` - Update use case
- `DELETE /api/use-cases/[slug]` - Delete use case

### Resources

- `GET /api/resources` - Get all resources
- `GET /api/resources?category=templates` - Filter by category
- `GET /api/resources/[slug]` - Get single resource
- `POST /api/resources` - Create new resource
- `PUT /api/resources/[slug]` - Update resource
- `DELETE /api/resources/[slug]` - Delete resource

## Testing API Endpoints

### Using curl

```bash
# Get all tutorials
curl http://localhost:3000/api/tutorials

# Get tutorials by category
curl http://localhost:3000/api/tutorials?category=getting-started

# Get single tutorial
curl http://localhost:3000/api/tutorials/what-is-vex-and-why-it-matters

# Create a new tutorial
curl -X POST http://localhost:3000/api/tutorials \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Tutorial",
    "slug": "new-tutorial",
    "category": "getting-started",
    "description": "Tutorial description",
    "content": "Tutorial content...",
    "difficulty": "Beginner",
    "duration": "10 min",
    "tags": ["tutorial"],
    "keywords": ["keyword1", "keyword2"]
  }'
```

### Using JavaScript fetch

```javascript
// Get all tutorials
const response = await fetch('/api/tutorials');
const data = await response.json();
console.log(data);

// Create a new tutorial
const response = await fetch('/api/tutorials', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Tutorial',
    slug: 'new-tutorial',
    category: 'getting-started',
    description: 'Tutorial description',
    content: 'Tutorial content...',
    difficulty: 'Beginner',
    duration: '10 min',
    tags: ['tutorial'],
    keywords: ['keyword1', 'keyword2']
  })
});
const data = await response.json();
console.log(data);
```

## Database Schema

### Tutorial Schema
```javascript
{
  title: String (required),
  slug: String (required, unique),
  category: String (required),
  subcategory: String (optional),
  description: String (required),
  content: String (required),
  difficulty: String (Beginner/Intermediate/Advanced),
  duration: String (required),
  readingTime: Number (optional),
  author: String (default: 'VEX Aware Team'),
  tags: Array of Strings,
  keywords: Array of Strings,
  published: Boolean (default: true),
  featured: Boolean (default: false),
  order: Number (default: 0),
  metaTitle: String (optional),
  metaDescription: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### BlogPost Schema
```javascript
{
  title: String (required),
  slug: String (required, unique),
  description: String (required),
  content: String (required),
  author: String (default: 'VEX Aware Team'),
  tags: Array of Strings,
  keywords: Array of Strings,
  published: Boolean (default: true),
  featured: Boolean (default: false),
  readingTime: Number (optional),
  metaTitle: String (optional),
  metaDescription: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### UseCase Schema
```javascript
{
  title: String (required),
  slug: String (required, unique),
  industry: String (required),
  description: String (required),
  content: String (required),
  challenge: String (required),
  solution: String (required),
  results: Array of {
    metric: String,
    value: String
  },
  tags: Array of Strings,
  published: Boolean (default: true),
  featured: Boolean (default: false),
  metaTitle: String (optional),
  metaDescription: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Resource Schema
```javascript
{
  title: String (required),
  slug: String (required, unique),
  category: String (required),
  description: String (required),
  content: String (required),
  resourceType: String (required),
  downloadUrl: String (optional),
  tags: Array of Strings,
  published: Boolean (default: true),
  featured: Boolean (default: false),
  metaTitle: String (optional),
  metaDescription: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Troubleshooting

### MongoDB Connection Issues

**Problem:** Cannot connect to MongoDB

**Solutions:**
1. Check if MongoDB is running: `ps aux | grep mongod`
2. Verify connection string in `.env.local`
3. For Atlas: Check network access whitelist (add your IP)
4. For Atlas: Verify database user credentials

### Seed Script Errors

**Problem:** Seed script fails with "Duplicate key error"

**Solution:** The database already has data. Clear it first:
```bash
# Connect to MongoDB shell
mongosh

# Use the database
use vexaware

# Drop collections
db.tutorials.drop()
db.blogposts.drop()
db.usecases.drop()
db.resources.drop()

# Exit
exit

# Run seed again
npm run seed
```

## Development Workflow

1. **Start MongoDB** (if using local)
2. **Run seed script** (first time only): `npm run seed`
3. **Start development server**: `npm run dev`
4. **Access API**: http://localhost:3000/api/*
5. **Access website**: http://localhost:3000

## Production Deployment

For production, use MongoDB Atlas and set the `MONGODB_URI` environment variable in your hosting platform (Vercel, Netlify, etc.).

**Important:** Never commit `.env.local` or connection strings with credentials to version control!
