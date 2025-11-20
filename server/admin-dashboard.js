const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple session storage (in production, use proper session management)
const sessions = new Map();

// Admin credentials (in production, use environment variables and hashed passwords)
const ADMIN_USERNAME = 'admin12#34';
const ADMIN_PASSWORD = 'vexaware20#24'; // Change this!

// Email transporter setup
const createEmailTransporter = () => {
  // Gmail configuration
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
  }
  
  // SMTP configuration
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Development mode
  console.log('⚠️  No email configuration found. Running in development mode.');
  return nodemailer.createTransport({
    streamTransport: true,
    newline: 'unix',
    buffer: true
  });
};

const emailTransporter = createEmailTransporter();

// Helper function to generate session token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Authentication middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const session = sessions.get(token);
  if (Date.now() > session.expires) {
    sessions.delete(token);
    return res.status(401).json({ error: 'Session expired' });
  }
  
  req.admin = session.user;
  next();
}

// Login endpoint
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken();
    const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    sessions.set(token, {
      user: username,
      expires: expires
    });
    
    res.json({
      success: true,
      token: token,
      message: 'Login successful'
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
});

// Logout endpoint
app.post('/admin/logout', requireAuth, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  sessions.delete(token);
  
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Get all contact messages
app.get('/admin/messages', requireAuth, (req, res) => {
  try {
    const contactusDir = path.join(__dirname, 'contactus');
    
    if (!fs.existsSync(contactusDir)) {
      return res.json({
        success: true,
        messages: [],
        count: 0
      });
    }
    
    const files = fs.readdirSync(contactusDir)
      .filter(file => file.startsWith('contact_') && file.endsWith('.json'))
      .sort()
      .reverse(); // newest first
    
    const messages = [];
    
    for (const file of files) {
      try {
        const filePath = path.join(contactusDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const message = JSON.parse(content);
        
        // Add file info for management
        message.fileName = file;
        message.fileSize = fs.statSync(filePath).size;
        
        messages.push(message);
      } catch (error) {
        console.error(`Error reading message file ${file}:`, error);
      }
    }
    
    res.json({
      success: true,
      messages: messages,
      count: messages.length
    });
    
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve messages'
    });
  }
});

// Get single message by ID
app.get('/admin/messages/:id', requireAuth, (req, res) => {
  try {
    const messageId = req.params.id;
    const contactusDir = path.join(__dirname, 'contactus');
    
    const files = fs.readdirSync(contactusDir)
      .filter(file => file.includes(messageId));
    
    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    const filePath = path.join(contactusDir, files[0]);
    const content = fs.readFileSync(filePath, 'utf8');
    const message = JSON.parse(content);
    
    message.fileName = files[0];
    message.fileSize = fs.statSync(filePath).size;
    
    res.json({
      success: true,
      message: message
    });
    
  } catch (error) {
    console.error('Error getting message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve message'
    });
  }
});

// Delete message by ID
app.delete('/admin/messages/:id', requireAuth, (req, res) => {
  try {
    const messageId = req.params.id;
    const contactusDir = path.join(__dirname, 'contactus');
    
    const files = fs.readdirSync(contactusDir)
      .filter(file => file.includes(messageId));
    
    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    const filePath = path.join(contactusDir, files[0]);
    fs.unlinkSync(filePath);
    
    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete message'
    });
  }
});

// Delete all messages
app.delete('/admin/messages', requireAuth, (req, res) => {
  try {
    const contactusDir = path.join(__dirname, 'contactus');
    
    if (!fs.existsSync(contactusDir)) {
      return res.json({
        success: true,
        message: 'No messages to delete'
      });
    }
    
    const files = fs.readdirSync(contactusDir)
      .filter(file => file.startsWith('contact_') && file.endsWith('.json'));
    
    let deletedCount = 0;
    for (const file of files) {
      const filePath = path.join(contactusDir, file);
      fs.unlinkSync(filePath);
      deletedCount++;
    }
    
    res.json({
      success: true,
      message: `Deleted ${deletedCount} messages successfully`
    });
    
  } catch (error) {
    console.error('Error deleting all messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete messages'
    });
  }
});

// Reply to message
app.post('/admin/messages/:id/reply', requireAuth, async (req, res) => {
  try {
    const messageId = req.params.id;
    const { subject, replyMessage, cc, bcc } = req.body;
    
    if (!subject || !replyMessage) {
      return res.status(400).json({
        success: false,
        error: 'Subject and message are required'
      });
    }

    // Get original message
    const contactusDir = path.join(__dirname, 'contactus');
    const files = fs.readdirSync(contactusDir)
      .filter(file => file.includes(messageId));
    
    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Original message not found'
      });
    }
    
    const filePath = path.join(contactusDir, files[0]);
    const content = fs.readFileSync(filePath, 'utf8');
    const originalMessage = JSON.parse(content);

    // Prepare email
    const fromEmail = process.env.FROM_EMAIL || process.env.GMAIL_USER || process.env.SMTP_USER || 'admin@vexaware.com';
    const toEmail = originalMessage.email;
    
    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: subject,
      html: generateReplyEmailHTML(originalMessage, replyMessage, subject),
      text: generateReplyEmailText(originalMessage, replyMessage, subject)
    };

    // Add CC and BCC if provided
    if (cc && cc.trim()) {
      mailOptions.cc = cc.trim();
    }
    if (bcc && bcc.trim()) {
      mailOptions.bcc = bcc.trim();
    }

    // Send email
    const result = await emailTransporter.sendMail(mailOptions);
    
    // Log reply for tracking
    const replyLog = {
      messageId: messageId,
      replyTimestamp: new Date().toISOString(),
      from: fromEmail,
      to: toEmail,
      cc: cc || '',
      bcc: bcc || '',
      subject: subject,
      replyMessage: replyMessage,
      emailResult: result.messageId || 'sent',
      adminUser: req.admin
    };
    
    // Save reply log
    const repliesDir = path.join(__dirname, 'replies');
    if (!fs.existsSync(repliesDir)) {
      fs.mkdirSync(repliesDir, { recursive: true });
    }
    
    const replyFileName = `reply_${messageId}_${Date.now()}.json`;
    const replyFilePath = path.join(repliesDir, replyFileName);
    fs.writeFileSync(replyFilePath, JSON.stringify(replyLog, null, 2), 'utf8');
    
    console.log(`✅ Reply sent to ${toEmail} for message ${messageId}`);
    
    if (result.message) {
      console.log('📧 Reply email content (development mode):');
      console.log(result.message.toString());
    }
    
    res.json({
      success: true,
      message: 'Reply sent successfully',
      messageId: result.messageId,
      replyId: replyFileName
    });
    
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send reply: ' + error.message
    });
  }
});

// Get reply history for a message
app.get('/admin/messages/:id/replies', requireAuth, (req, res) => {
  try {
    const messageId = req.params.id;
    const repliesDir = path.join(__dirname, 'replies');
    
    if (!fs.existsSync(repliesDir)) {
      return res.json({
        success: true,
        replies: [],
        count: 0
      });
    }
    
    const files = fs.readdirSync(repliesDir)
      .filter(file => file.startsWith(`reply_${messageId}_`) && file.endsWith('.json'))
      .sort()
      .reverse(); // newest first
    
    const replies = [];
    
    for (const file of files) {
      try {
        const filePath = path.join(repliesDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const reply = JSON.parse(content);
        replies.push(reply);
      } catch (error) {
        console.error(`Error reading reply file ${file}:`, error);
      }
    }
    
    res.json({
      success: true,
      replies: replies,
      count: replies.length
    });
    
  } catch (error) {
    console.error('Error getting reply history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve reply history'
    });
  }
});

// Helper functions for email templates
function generateReplyEmailHTML(originalMessage, replyMessage, subject) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reply from VEX Aware Support</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .reply-content { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff; }
        .original-message { background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 14px; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🛡️ VEX Aware</h1>
        <p>Support Team Reply</p>
      </div>
      <div class="content">
        <p>Hello ${originalMessage.name},</p>
        
        <div class="reply-content">
          ${replyMessage.replace(/\n/g, '<br>')}
        </div>
        
        <div class="original-message">
          <strong>Original Message:</strong><br>
          <strong>Subject:</strong> ${originalMessage.subject}<br>
          <strong>Date:</strong> ${new Date(originalMessage.timestamp).toLocaleString()}<br>
          <strong>Message:</strong><br>
          ${originalMessage.message.replace(/\n/g, '<br>')}
        </div>
        
        <p>Thank you for contacting VEX Aware. If you have any further questions, please don't hesitate to reach out.</p>
        
        <p>Best regards,<br>
        VEX Aware Support Team</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} VEX Aware. All rights reserved.</p>
        <p>This email was sent in response to your inquiry submitted at vexaware.com</p>
      </div>
    </body>
    </html>
  `;
}

function generateReplyEmailText(originalMessage, replyMessage, subject) {
  return `
    VEX Aware - Support Team Reply
    
    Hello ${originalMessage.name},
    
    ${replyMessage}
    
    Original Message:
    Subject: ${originalMessage.subject}
    Date: ${new Date(originalMessage.timestamp).toLocaleString()}
    Message: ${originalMessage.message}
    
    Thank you for contacting VEX Aware. If you have any further questions, please don't hesitate to reach out.
    
    Best regards,
    VEX Aware Support Team
    
    © ${new Date().getFullYear()} VEX Aware. All rights reserved.
  `;
}

// Get dashboard statistics
app.get('/admin/stats', requireAuth, (req, res) => {
  try {
    const contactusDir = path.join(__dirname, 'contactus');
    
    if (!fs.existsSync(contactusDir)) {
      return res.json({
        success: true,
        stats: {
          totalMessages: 0,
          todayMessages: 0,
          weekMessages: 0,
          inquiryTypes: {},
          averagePerDay: 0
        }
      });
    }
    
    const files = fs.readdirSync(contactusDir)
      .filter(file => file.startsWith('contact_') && file.endsWith('.json'));
    
    const messages = [];
    const inquiryTypes = {};
    
    for (const file of files) {
      try {
        const filePath = path.join(contactusDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const message = JSON.parse(content);
        messages.push(message);
        
        // Count inquiry types
        const type = message.inquiryType || 'general';
        inquiryTypes[type] = (inquiryTypes[type] || 0) + 1;
      } catch (error) {
        console.error(`Error reading stats for ${file}:`, error);
      }
    }
    
    // Calculate time-based stats
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const todayMessages = messages.filter(msg => new Date(msg.timestamp) >= today).length;
    const weekMessages = messages.filter(msg => new Date(msg.timestamp) >= weekAgo).length;
    
    res.json({
      success: true,
      stats: {
        totalMessages: messages.length,
        todayMessages: todayMessages,
        weekMessages: weekMessages,
        inquiryTypes: inquiryTypes,
        averagePerDay: messages.length > 0 ? (weekMessages / 7).toFixed(1) : 0
      }
    });
    
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve statistics'
    });
  }
});

// Serve admin dashboard HTML
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`🔐 Admin Dashboard running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard URL: http://localhost:${PORT}/admin`);
  console.log(`🔑 Default login: admin / vexaware2024`);
});