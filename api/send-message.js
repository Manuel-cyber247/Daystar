export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET
  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: 'Send message API is working! Use POST to send messages.' 
    });
  }

  // Handle POST
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;
    
    console.log('Received:', { name, email, phone, subject, message });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Message received! We will contact you soon.',
      received: { name, email, subject }
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}