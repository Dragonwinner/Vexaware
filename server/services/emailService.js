const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // Gmail configuration (you can change this to any email service)
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS // Use App Password for Gmail
      }
    });
  }
  
  // SMTP configuration for custom email servers
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

  // Development mode - log emails to console
  console.log('⚠️  No email configuration found. Running in development mode.');
  return nodemailer.createTransport({
    streamTransport: true,
    newline: 'unix',
    buffer: true
  });
};

const transporter = createTransporter();

// Email templates
const getConfirmationEmailTemplate = (confirmationToken) => {
  const confirmUrl = `${process.env.API_URL || 'http://localhost:3001'}/api/newsletter/confirm/${confirmationToken}`;
  
  return {
    subject: 'Please confirm your VEX Aware newsletter subscription',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirm Your Subscription</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .button:hover { background: #0056b3; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🛡️ VEX Aware</h1>
          <p>Confirm Your Newsletter Subscription</p>
        </div>
        <div class="content">
          <h2>Almost there! 🎉</h2>
          <p>Thank you for subscribing to the VEX Aware newsletter. To complete your subscription and start receiving our latest security insights, vulnerability reports, and platform updates, please confirm your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmUrl}" class="button">Confirm My Subscription</a>
          </div>
          
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px; font-family: monospace;">${confirmUrl}</p>
          
          <h3>What you'll get:</h3>
          <ul>
            <li>🔒 Latest security vulnerability reports</li>
            <li>📊 VEX document best practices</li>
            <li>🛠️ New platform features and updates</li>
            <li>🎯 Industry security insights</li>
            <li>📚 Educational content and tutorials</li>
          </ul>
          
          <p><strong>This confirmation link will expire in 24 hours.</strong></p>
          
          <p>If you didn't subscribe to this newsletter, please ignore this email.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} VEX Aware. All rights reserved.</p>
          <p>This email was sent because you subscribed to our newsletter at vexaware.com</p>
        </div>
      </body>
      </html>
    `,
    text: `
      VEX Aware - Confirm Your Newsletter Subscription
      
      Thank you for subscribing to the VEX Aware newsletter!
      
      To complete your subscription, please visit this link:
      ${confirmUrl}
      
      This link will expire in 24 hours.
      
      If you didn't subscribe to this newsletter, please ignore this email.
      
      © ${new Date().getFullYear()} VEX Aware. All rights reserved.
    `
  };
};

const getWelcomeEmailTemplate = () => {
  return {
    subject: 'Welcome to VEX Aware Newsletter! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to VEX Aware</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .resources { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🛡️ VEX Aware</h1>
          <p>Welcome to Our Community!</p>
        </div>
        <div class="content">
          <h2>Welcome aboard! 🚀</h2>
          <p>Your email has been confirmed and you're now officially part of the VEX Aware community. You'll receive our newsletter with the latest security insights, vulnerability reports, and platform updates.</p>
          
          <div class="resources">
            <h3>🎯 Get Started:</h3>
            <ul>
              <li><strong>Explore VEX Documents:</strong> Learn about our vulnerability exchange format</li>
              <li><strong>Try Our APIs:</strong> Integrate security data into your workflows</li>
              <li><strong>Browse Tutorials:</strong> Step-by-step guides for all skill levels</li>
              <li><strong>Join Discussions:</strong> Connect with other security professionals</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" class="button">Visit VEX Aware Platform</a>
          </div>
          
          <h3>📧 What to expect:</h3>
          <ul>
            <li><strong>Weekly Updates:</strong> Latest vulnerability reports and security trends</li>
            <li><strong>Feature Announcements:</strong> New tools and platform capabilities</li>
            <li><strong>Educational Content:</strong> Best practices and security insights</li>
            <li><strong>Community Highlights:</strong> User stories and case studies</li>
          </ul>
          
          <p>Thank you for choosing VEX Aware as your trusted security partner. We're excited to help you stay ahead of emerging threats!</p>
          
          <p><em>Questions or feedback? Simply reply to this email - we'd love to hear from you!</em></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} VEX Aware. All rights reserved.</p>
          <p>You can update your preferences or unsubscribe at any time from our newsletter emails.</p>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to VEX Aware Newsletter!
      
      Your email has been confirmed and you're now part of our security community.
      
      What to expect:
      - Weekly vulnerability reports and security updates
      - New platform features and announcements  
      - Educational content and best practices
      - Community highlights and case studies
      
      Visit our platform: ${process.env.FRONTEND_URL || 'http://localhost:5173'}
      
      Thank you for choosing VEX Aware!
      
      © ${new Date().getFullYear()} VEX Aware. All rights reserved.
    `
  };
};

// Send confirmation email
const sendConfirmationEmail = async (email, confirmationToken) => {
  const template = getConfirmationEmailTemplate(confirmationToken);
  
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@vexaware.com',
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent to:', email);
    
    // In development mode, log the email content
    if (result.message) {
      console.log('📧 Email content (development mode):');
      console.log(result.message.toString());
    }
    
    return result;
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error);
    throw error;
  }
};

// Send welcome email
const sendWelcomeEmail = async (email) => {
  const template = getWelcomeEmailTemplate();
  
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@vexaware.com',
    to: email,
    subject: template.subject,
    html: template.html,
    text: template.text
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', email);
    
    if (result.message) {
      console.log('📧 Welcome email content (development mode):');
      console.log(result.message.toString());
    }
    
    return result;
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    throw error;
  }
};

module.exports = {
  sendConfirmationEmail,
  sendWelcomeEmail
};