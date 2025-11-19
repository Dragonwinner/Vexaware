import express from 'express';
import connectDB from '../lib/db.js';
import UseCase from '../lib/models/UseCase.js';

const router = express.Router();

// GET all use cases
router.get('/', async (req, res) => {
  try {
    await connectDB();

    const { published = 'true' } = req.query;
    const useCases = await UseCase.find({ published: published !== 'false' }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: useCases.length,
      data: useCases,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single use case by slug
router.get('/:slug', async (req, res) => {
  try {
    await connectDB();

    const useCase = await UseCase.findOne({ slug: req.params.slug });

    if (!useCase) {
      return res.status(404).json({ success: false, error: 'Use case not found' });
    }

    res.json({
      success: true,
      data: useCase,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Create a new use case
router.post('/', async (req, res) => {
  try {
    await connectDB();

    const useCase = await UseCase.create(req.body);

    res.status(201).json({
      success: true,
      data: useCase,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT - Update a use case
router.put('/:slug', async (req, res) => {
  try {
    await connectDB();

    const useCase = await UseCase.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!useCase) {
      return res.status(404).json({ success: false, error: 'Use case not found' });
    }

    res.json({
      success: true,
      data: useCase,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE - Delete a use case
router.delete('/:slug', async (req, res) => {
  try {
    await connectDB();

    const useCase = await UseCase.findOneAndDelete({ slug: req.params.slug });

    if (!useCase) {
      return res.status(404).json({ success: false, error: 'Use case not found' });
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
