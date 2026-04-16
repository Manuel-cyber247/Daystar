import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://daystar.vercel.app', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Handle OPTIONS requests (preflight)
app.options('/api/send-message', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
});

// Test endpoint (GET)
app.get('/api/test', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Backend is working on Vercel!',
    timestamp: new Date().toISOString()
  });
});

// Send message endpoint (POST)
app.post('/api/send-message', async (req, res) => {
  console.log('Received POST request:', req.body);
  
  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields: name, email, subject, message' 
    });
  }

  // Check email credentials
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Missing email credentials');
    return res.status(500).json({ 
      success: false, 
      message: 'Email service not configured. Please call us directly.' 
    });
  }

  try {
    // Verify transporter
    await transporter.verify();
    console.log('Email transporter verified');

    // Email to hospital admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📨 New Patient Message: ${subject}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent from Daystar Specialist Hospital Website</small></p>
      `
    });

    // Auto-reply to patient
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting Daystar Specialist Hospital`,
      html: `
        <h2>Dear ${name},</h2>
        <p>Thank you for contacting Daystar Specialist Hospital. We have received your message and will respond within 24 hours.</p>
        <p><strong>Your message:</strong> "${message.substring(0, 200)}"</p>
        <p>For emergencies, please call: <strong>+234 906 382 1361</strong></p>
        <br>
        <p>Best regards,</p>
        <p><strong>Daystar Specialist Hospital Team</strong></p>
        <p><em>By His Stripes We Are Healed</em></p>
      `
    });

    console.log('Email sent successfully to:', email);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully! Our team will respond within 24 hours.' 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please call us directly at +234 906 382 1361' 
    });
  }
});

// Handle any other requests
app.all('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint not found' 
  });
});

// Export for Vercel (CRITICAL - must be default export)
export default app;