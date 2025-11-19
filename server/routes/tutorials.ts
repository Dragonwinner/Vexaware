import express from 'express';
import connectDB from '../lib/db.js';
import Tutorial from '../lib/models/Tutorial.js';

const router = express.Router();

// GET all tutorials or filter by category
router.get('/', async (req, res) => {
  try {
    await connectDB();

    const { category, subcategory, published = 'true' } = req.query;
    const query: any = { published: published !== 'false' };
    
    if (category) {
      query.category = category;
    }
    
    if (subcategory) {
      query.subcategory = subcategory;
    }

    const tutorials = await Tutorial.find(query).sort({ category: 1, order: 1 });

    res.json({
      success: true,
      count: tutorials.length,
      data: tutorials,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single tutorial by slug
router.get('/:slug', async (req, res) => {
  try {
    await connectDB();

    const tutorial = await Tutorial.findOne({ slug: req.params.slug });

    if (!tutorial) {
      return res.status(404).json({ success: false, error: 'Tutorial not found' });
    }

    res.json({
      success: true,
      data: tutorial,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Create a new tutorial
router.post('/', async (req, res) => {
  try {
    await connectDB();

    const tutorial = await Tutorial.create(req.body);

    res.status(201).json({
      success: true,
      data: tutorial,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT - Update a tutorial
router.put('/:slug', async (req, res) => {
  try {
    await connectDB();

    const tutorial = await Tutorial.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!tutorial) {
      return res.status(404).json({ success: false, error: 'Tutorial not found' });
    }

    res.json({
      success: true,
      data: tutorial,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE - Delete a tutorial
router.delete('/:slug', async (req, res) => {
  try {
    await connectDB();

    const tutorial = await Tutorial.findOneAndDelete({ slug: req.params.slug });

    if (!tutorial) {
      return res.status(404).json({ success: false, error: 'Tutorial not found' });
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
