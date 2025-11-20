# Newsletter Setup Guide

## Overview
Your VEX Aware platform now includes a fully functional newsletter subscription system with support for multiple email service providers.

## Quick Start

1. **Copy the environment file:**
   ```bash
   copy .env.example .env
   ```

2. **Choose your newsletter service and configure API keys in `.env`:**

### Option 1: Mailchimp (Recommended)
```env
VITE_NEWSLETTER_SERVICE=mailchimp
VITE_MAILCHIMP_API_KEY=your_api_key_here
VITE_MAILCHIMP_AUDIENCE_ID=your_audience_id
VITE_MAILCHIMP_SERVER_PREFIX=us1
```

### Option 2: ConvertKit
```env
VITE_NEWSLETTER_SERVICE=convertkit
VITE_CONVERTKIT_API_KEY=your_api_key_here
VITE_CONVERTKIT_FORM_ID=your_form_id
```

### Option 3: SendGrid
```env
VITE_NEWSLETTER_SERVICE=sendgrid
VITE_SENDGRID_API_KEY=your_api_key_here
VITE_SENDGRID_LIST_ID=your_list_id
```

### Option 4: Local Development (No API keys needed)
```env
VITE_NEWSLETTER_SERVICE=local
```

## Getting API Keys

### Mailchimp Setup
1. Go to [Mailchimp](https://mailchimp.com) → Account → Extras → API keys
2. Create a new API key
3. Find your Audience ID: Audience → Settings → Audience name and defaults
4. Check your server prefix in the API key (e.g., `us1`, `us2`, etc.)

### ConvertKit Setup
1. Go to [ConvertKit](https://convertkit.com) → Account Settings → Advanced
2. Copy your API Key
3. Create a form and note the Form ID from the URL

### SendGrid Setup
1. Go to [SendGrid](https://sendgrid.com) → Settings → API Keys
2. Create a new API key with Mail Send permissions
3. Create a contact list and note the List ID

## Features Included

✅ **Email Validation** - Real-time email format checking  
✅ **Loading States** - User-friendly subscription process  
✅ **Success/Error Messages** - Clear feedback for users  
✅ **Multiple Providers** - Support for Mailchimp, ConvertKit, SendGrid  
✅ **Local Testing** - No API keys needed for development  
✅ **Responsive Design** - Works on all device sizes  
✅ **Error Handling** - Graceful failure management  

## Testing

### Local Development
Set `VITE_NEWSLETTER_SERVICE=local` in your `.env` file. The system will simulate API calls and show success/error states without making real API requests.

### Production Testing
1. Set up your chosen service with API keys
2. Test with a real email address
3. Verify the subscription appears in your email service dashboard

## Customization

### Adding Custom Email Services
Edit `lib/newsletter.ts` to add support for additional email service providers:

```typescript
const customServiceConfig = {
  apiUrl: 'https://your-api.com/subscribe',
  headers: {
    'Authorization': `Bearer ${process.env.VITE_CUSTOM_API_KEY}`,
    'Content-Type': 'application/json'
  }
};
```

### Styling Changes
The newsletter form is in `components/Footer.tsx` with Tailwind CSS classes. Customize colors, spacing, and layout as needed.

## Troubleshooting

**Issue: "Network Error" or failed subscriptions**
- Check your API keys are correct and active
- Verify your internet connection
- Check browser console for specific error messages

**Issue: CORS errors in development**
- Some services require HTTPS in production
- Consider using a backend proxy for API calls

**Issue: Subscribers not appearing in dashboard**
- Verify the correct Audience/List ID is configured
- Check if double opt-in is enabled in your service

## Security Notes

- Never commit `.env` files to version control
- Use environment-specific configurations for development/production
- Regularly rotate API keys
- Consider rate limiting in production

## Production Deployment

1. Set environment variables in your hosting platform
2. Ensure HTTPS is enabled for secure API calls
3. Test the subscription flow with real email addresses
4. Monitor error rates and subscription success

Your newsletter subscription system is now ready to collect real subscribers! 🎉