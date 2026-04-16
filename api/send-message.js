// SIMPLE WORKING API - No dependencies needed
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'API is working!',
      time: new Date().toISOString()
    });
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      console.log('Received POST data:', req.body);
      
      const { name, email, phone, subject, message } = req.body || {};

      // Simple validation
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields: name, email, subject, message'
        });
      }

      // Return success for now (without email)
      return res.status(200).json({
        success: true,
        message: 'Message received successfully! We will contact you soon.',
        received: { name, email, phone, subject, message }
      });

    } catch (error) {
      console.error('Error in POST handler:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: error.message
      });
    }
  }

  // Method not allowed
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}