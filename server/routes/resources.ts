import express from 'express';
import connectDB from '../lib/db.js';
import Resource from '../lib/models/Resource.js';

const router = express.Router();

// GET all resources
router.get('/', async (req, res) => {
  try {
    await connectDB();

    const { published = 'true' } = req.query;
    const resources = await Resource.find({ published: published !== 'false' }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single resource by slug
router.get('/:slug', async (req, res) => {
  try {
    await connectDB();

    const resource = await Resource.findOne({ slug: req.params.slug });

    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    res.json({
      success: true,
      data: resource,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Create a new resource
router.post('/', async (req, res) => {
  try {
    await connectDB();

    const resource = await Resource.create(req.body);

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT - Update a resource
router.put('/:slug', async (req, res) => {
  try {
    await connectDB();

    const resource = await Resource.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    res.json({
      success: true,
      data: resource,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE - Delete a resource
router.delete('/:slug', async (req, res) => {
  try {
    await connectDB();

    const resource = await Resource.findOneAndDelete({ slug: req.params.slug });

    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
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
