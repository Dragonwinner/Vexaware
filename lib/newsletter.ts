// Newsletter subscription utilities with custom backend integration
// This file handles newsletter subscription functionality with your own API

interface SubscriptionResponse {
  success: boolean;
  message: string;
}

// Get newsletter service from environment
const getNewsletterService = (): string => {
  return import.meta.env.VITE_NEWSLETTER_SERVICE || 'custom';
};

// Get API URL
const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || 'http://localhost:3001';
};

// Email validation utility
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Main newsletter subscription function
 * Uses your custom backend API by default
 */
export const subscribeToNewsletter = async (email: string): Promise<SubscriptionResponse> => {
  const service = getNewsletterService();
  
  // Email validation
  if (!isValidEmail(email)) {
    return {
      success: false,
      message: 'Please enter a valid email address'
    };
  }

  try {
    switch (service) {
      case 'mailchimp':
        return await subscribeToMailchimp(email);
      
      case 'convertkit':
        return await subscribeToConvertKit(email);
      
      case 'sendgrid':
        return await subscribeToSendGrid(email);
      
      case 'custom':
      default:
        return await subscribeToCustomAPI(email);
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Subscription failed. Please try again later.'
    };
  }
};

/**
 * Subscribe using your custom backend API
 * This is the main implementation that connects to your server
 */
export const subscribeToCustomAPI = async (email: string): Promise<SubscriptionResponse> => {
  try {
    const apiUrl = getApiUrl();
    
    const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || 'Successfully subscribed! Please check your email to confirm your subscription.'
      };
    } else {
      return {
        success: false,
        message: result.message || 'Subscription failed. Please try again later.'
      };
    }
    
  } catch (error) {
    console.error('Custom API subscription error:', error);
    return {
      success: false,
      message: 'Unable to connect to newsletter service. Please try again later.'
    };
  }
};

/**
 * Alternative service integrations (optional)
 */

// Mailchimp Integration
export const subscribeToMailchimp = async (email: string, listId?: string): Promise<SubscriptionResponse> => {
  const API_KEY = import.meta.env.VITE_MAILCHIMP_API_KEY;
  const LIST_ID = listId || import.meta.env.VITE_MAILCHIMP_AUDIENCE_ID;
  const DC = API_KEY?.split('-')[1];
  
  if (!API_KEY || !LIST_ID) {
    return { success: false, message: 'Mailchimp configuration missing' };
  }
  
  try {
    const url = `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${API_KEY}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['website_footer']
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      return { success: true, message: 'Successfully subscribed to newsletter!' };
    } else {
      return { success: false, message: result.detail || 'Subscription failed' };
    }
  } catch (error) {
    return { success: false, message: 'Failed to connect to Mailchimp' };
  }
};

// ConvertKit Integration
export const subscribeToConvertKit = async (email: string, formId?: string): Promise<SubscriptionResponse> => {
  const API_KEY = import.meta.env.VITE_CONVERTKIT_API_KEY;
  const FORM_ID = formId || import.meta.env.VITE_CONVERTKIT_FORM_ID;
  
  if (!API_KEY || !FORM_ID) {
    return { success: false, message: 'ConvertKit configuration missing' };
  }
  
  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: API_KEY,
        email: email,
        tags: ['vexaware_newsletter']
      })
    });

    const result = await response.json();
    
    if (response.ok && result.subscription) {
      return { success: true, message: 'Successfully subscribed to newsletter!' };
    } else {
      return { success: false, message: 'Subscription failed' };
    }
  } catch (error) {
    return { success: false, message: 'Failed to connect to ConvertKit' };
  }
};

// SendGrid Integration
export const subscribeToSendGrid = async (email: string, listId?: string): Promise<SubscriptionResponse> => {
  const API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
  const LIST_ID = listId || import.meta.env.VITE_SENDGRID_LIST_ID;
  
  if (!API_KEY || !LIST_ID) {
    return { success: false, message: 'SendGrid configuration missing' };
  }
  
  try {
    const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list_ids: [LIST_ID],
        contacts: [{
          email: email,
          custom_fields: {
            signup_source: 'website_footer'
          }
        }]
      })
    });

    if (response.ok) {
      return { success: true, message: 'Successfully subscribed to newsletter!' };
    } else {
      const result = await response.json();
      return { success: false, message: result.errors?.[0]?.message || 'Subscription failed' };
    }
  } catch (error) {
    return { success: false, message: 'Failed to connect to SendGrid' };
  }
};