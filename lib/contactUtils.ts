export interface ContactSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
  ipAddress?: string;
  userAgent?: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

// Save contact submission to server
export const saveContactSubmission = async (formData: Omit<ContactSubmission, 'id' | 'timestamp' | 'ipAddress' | 'userAgent'>): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Contact submission saved to contactus folder:', result.submissionId);
      return result.submissionId;
    } else {
      throw new Error(result.error || 'Failed to save submission');
    }
  } catch (error) {
    console.error('Error saving contact submission:', error);
    
    // Fallback to localStorage if API fails
    console.log('Falling back to localStorage...');
    return await saveContactSubmissionFallback(formData);
  }
};

// Fallback storage using localStorage
const saveContactSubmissionFallback = async (formData: Omit<ContactSubmission, 'id' | 'timestamp' | 'ipAddress' | 'userAgent'>): Promise<string> => {
  const id = Math.random().toString(36).substr(2, 9);
  const now = new Date();
  const timestamp = now.toISOString();
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
  
  const submission: ContactSubmission = {
    id,
    timestamp,
    name: formData.name,
    email: formData.email,
    company: formData.company,
    subject: formData.subject,
    message: formData.message,
    inquiryType: formData.inquiryType,
    ipAddress: 'localhost',
    userAgent
  };
  
  // Save to localStorage as fallback
  const storageKey = 'vexaware_contact_submissions';
  const existingSubmissions = getContactSubmissionsFromStorage();
  const updatedSubmissions = [submission, ...existingSubmissions];
  localStorage.setItem(storageKey, JSON.stringify(updatedSubmissions));
  
  console.log('Contact submission saved to localStorage (fallback)');
  return id;
};

export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      return result.submissions || [];
    } else {
      throw new Error(result.error || 'Failed to get submissions');
    }
  } catch (error) {
    console.error('Error getting contact submissions from API:', error);
    
    // Fallback to localStorage
    console.log('Falling back to localStorage...');
    return getContactSubmissionsFromStorage();
  }
};

const getContactSubmissionsFromStorage = (): ContactSubmission[] => {
  try {
    const storageKey = 'vexaware_contact_submissions';
    const storedSubmissions = localStorage.getItem(storageKey);
    
    if (!storedSubmissions) {
      return [];
    }
    
    const submissions: ContactSubmission[] = JSON.parse(storedSubmissions);
    
    // Sort by timestamp (newest first)
    return submissions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error('Error getting contact submissions from storage:', error);
    return [];
  }
};

// Export all submissions as a single file
export const exportAllSubmissions = async () => {
  try {
    const submissions = await getContactSubmissions();
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const filename = `vexaware_contact_submissions_${dateStr}.json`;
    
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(link.href);
    
    console.log(`Exported ${submissions.length} submissions to ${filename}`);
  } catch (error) {
    console.error('Error exporting submissions:', error);
  }
};

// Clear all submissions (admin function)
export const clearAllSubmissions = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log('All contact submissions cleared from server');
      // Also clear localStorage
      const storageKey = 'vexaware_contact_submissions';
      localStorage.removeItem(storageKey);
    } else {
      throw new Error(result.error || 'Failed to clear submissions');
    }
  } catch (error) {
    console.error('Error clearing submissions:', error);
    
    // Fallback: clear localStorage only
    const storageKey = 'vexaware_contact_submissions';
    localStorage.removeItem(storageKey);
    console.log('Cleared localStorage submissions (fallback)');
  }
};