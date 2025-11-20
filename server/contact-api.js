const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure contactus directory exists
const contactusDir = path.join(process.cwd(), 'contactus');
if (!fs.existsSync(contactusDir)) {
  fs.mkdirSync(contactusDir, { recursive: true });
}

// Save contact submission
app.post('/api/contact', (req, res) => {
  try {
    const formData = req.body;
    
    // Generate unique ID
    const id = Math.random().toString(36).substr(2, 9);
    
    // Get current timestamp
    const now = new Date();
    const timestamp = now.toISOString();
    
    // Format filename with date and time
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
    const filename = `contact_${dateStr}_${timeStr}_${id}.json`;
    
    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';
    
    // Create submission object
    const submission = {
      id,
      timestamp,
      name: formData.name,
      email: formData.email,
      company: formData.company || '',
      subject: formData.subject,
      message: formData.message,
      inquiryType: formData.inquiryType,
      ipAddress,
      userAgent
    };
    
    // Save to contactus folder
    const filePath = path.join(contactusDir, filename);
    fs.writeFileSync(filePath, JSON.stringify(submission, null, 2), 'utf8');
    
    console.log(`Contact submission saved: ${filename}`);
    
    res.json({
      success: true,
      submissionId: id,
      message: 'Contact submission saved successfully'
    });
    
  } catch (error) {
    console.error('Error saving contact submission:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save contact submission'
    });
  }
});

// Get all contact submissions
app.get('/api/contact', (req, res) => {
  try {
    const files = fs.readdirSync(contactusDir)
      .filter(file => file.startsWith('contact_') && file.endsWith('.json'))
      .sort()
      .reverse(); // newest first
    
    const submissions = [];
    
    for (const file of files) {
      try {
        const filePath = path.join(contactusDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const submission = JSON.parse(content);
        submissions.push(submission);
      } catch (error) {
        console.error(`Error reading submission file ${file}:`, error);
      }
    }
    
    res.json({
      success: true,
      submissions,
      count: submissions.length
    });
    
  } catch (error) {
    console.error('Error getting contact submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get contact submissions'
    });
  }
});

// Delete all submissions (admin only)
app.delete('/api/contact', (req, res) => {
  try {
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
      message: `Deleted ${deletedCount} contact submissions`
    });
    
  } catch (error) {
    console.error('Error deleting contact submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete contact submissions'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API server running on http://localhost:${PORT}`);
  console.log(`Contact submissions will be saved to: ${contactusDir}`);
});