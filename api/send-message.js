import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle POST
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message } = req.body;

      // Validate
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields' 
        });
      }

      // For testing - just log and return success
      console.log('Received message:', { name, email, phone, subject, message });

      // Return success without actually sending email (for testing)
      return res.status(200).json({ 
        success: true, 
        message: 'Message received! (Email sending disabled for testing)' 
      });

    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Server error' 
      });
    }
  }

  // Handle GET
  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: 'API is working! Use POST to send messages.' 
    });
  }

  // Method not allowed
  return res.status(405).json({ 
    success: false, 
    error: 'Method not allowed' 
  });
}