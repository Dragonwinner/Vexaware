import express from 'express';
import connectDB from '../lib/db.js';
import BlogPost from '../lib/models/BlogPost.js';

const router = express.Router();

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    await connectDB();

    const { published = 'true' } = req.query;
    const blogPosts = await BlogPost.find({ published: published !== 'false' }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogPosts.length,
      data: blogPosts,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    await connectDB();

    const blogPost = await BlogPost.findOne({ slug: req.params.slug });

    if (!blogPost) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }

    res.json({
      success: true,
      data: blogPost,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Create a new blog post
router.post('/', async (req, res) => {
  try {
    await connectDB();

    const blogPost = await BlogPost.create(req.body);

    res.status(201).json({
      success: true,
      data: blogPost,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT - Update a blog post
router.put('/:slug', async (req, res) => {
  try {
    await connectDB();

    const blogPost = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!blogPost) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }

    res.json({
      success: true,
      data: blogPost,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE - Delete a blog post
router.delete('/:slug', async (req, res) => {
  try {
    await connectDB();

    const blogPost = await BlogPost.findOneAndDelete({ slug: req.params.slug });

    if (!blogPost) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }

    res.json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
