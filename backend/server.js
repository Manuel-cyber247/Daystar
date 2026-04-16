import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Backend is working!',
    port: 5000,
    endpoints: {
      test: 'GET /api/test',
      sendMessage: 'POST /api/send-message'
    }
  });
});

// Send message endpoint
app.post('/api/send-message', async (req, res) => {
  console.log('Received request:', req.body);
  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields: name, email, subject, message' 
    });
  }

  // Check if email credentials are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials not configured');
    return res.status(500).json({ 
      success: false, 
      message: 'Email service not configured. Please call us directly.' 
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify transporter
    await transporter.verify();

    // Email to hospital admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📨 New Patient Message: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; background: #f0fdfa; }
            .header { background: #004d40; color: white; padding: 10px; }
            .content { padding: 20px; background: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Daystar Specialist Hospital</h2>
            </div>
            <div class="content">
              <h3>New Message from ${name}</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Auto-reply to patient
    const patientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting Daystar Specialist Hospital`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { padding: 20px; background: #f0fdfa; }
            .header { background: #004d40; color: white; padding: 10px; }
            .content { padding: 20px; background: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Daystar Specialist Hospital</h2>
              <p>By His Stripes We Are Healed</p>
            </div>
            <div class="content">
              <h3>Dear ${name},</h3>
              <p>Thank you for contacting Daystar Specialist Hospital. We have received your message and will respond within 24 hours.</p>
              <p><strong>Your message:</strong> "${message.substring(0, 200)}"</p>
              <p>For emergencies, please call: <strong>+234 906 382 1361</strong></p>
              <br>
              <p>Best regards,</p>
              <p><strong>Daystar Specialist Hospital Team</strong></p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(patientMailOptions);

    console.log('Email sent successfully to:', email);
    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully! Our team will respond within 24 hours.' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please call us directly at +234 906 382 1361' 
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📨 Send message: POST http://localhost:${PORT}/api/send-message`);
});