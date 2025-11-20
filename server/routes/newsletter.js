const express = require('express');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');
const { database } = require('../database/db');
const { sendConfirmationEmail, sendWelcomeEmail } = require('../services/emailService');

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if subscriber already exists
    const existingSubscriber = await database.getSubscriber(normalizedEmail);
    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed to our newsletter'
      });
    }

    // Generate tokens
    const confirmationToken = uuidv4();
    const unsubscribeToken = uuidv4();
    
    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Add subscriber to database
    const subscriber = await database.addSubscriber(
      normalizedEmail,
      ipAddress,
      userAgent,
      confirmationToken,
      unsubscribeToken
    );

    // Send confirmation email
    try {
      await sendConfirmationEmail(normalizedEmail, confirmationToken);
      await database.logEmail(subscriber.id, 'confirmation', true);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      await database.logEmail(subscriber.id, 'confirmation', false, emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed! Please check your email to confirm your subscription.'
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process subscription. Please try again later.'
    });
  }
});

// Confirm subscription
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    const confirmed = await database.confirmSubscriber(token);
    
    if (confirmed) {
      // Send welcome email
      try {
        const subscriber = await new Promise((resolve, reject) => {
          database.db.get(
            'SELECT * FROM subscribers WHERE confirmation_token = ?',
            [token],
            (err, row) => {
              if (err) reject(err);
              else resolve(row);
            }
          );
        });
        
        if (subscriber) {
          await sendWelcomeEmail(subscriber.email);
          await database.logEmail(subscriber.id, 'welcome', true);
        }
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
      }
      
      res.json({
        success: true,
        message: 'Email confirmed! Welcome to our newsletter.'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired confirmation token'
      });
    }
  } catch (error) {
    console.error('Confirmation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm subscription'
    });
  }
});

// Unsubscribe
router.get('/unsubscribe/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    const unsubscribed = await database.unsubscribe(token);
    
    if (unsubscribed) {
      res.json({
        success: true,
        message: 'Successfully unsubscribed from our newsletter'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid unsubscribe token'
      });
    }
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process unsubscribe request'
    });
  }
});

// Get all subscribers (admin endpoint)
router.get('/subscribers', async (req, res) => {
  try {
    // Simple admin authentication (you should implement proper auth)
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_KEY) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    const subscribers = await database.getAllSubscribers(limit, offset);
    const stats = await database.getStats();

    res.json({
      success: true,
      data: {
        subscribers,
        stats,
        pagination: {
          page,
          limit,
          hasMore: subscribers.length === limit
        }
      }
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers'
    });
  }
});

// Get newsletter stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await database.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
});

module.exports = router;