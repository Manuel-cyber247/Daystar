import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

// Test endpoint to check if backend is running
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Send message endpoint
app.post('/api/send-message', async (req, res) => {
  console.log('Received request:', req.body);
  const { name, email, phone, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields.' 
    });
  }

  try {
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
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f0fdfa; border-radius: 10px; }
            .header { background: linear-gradient(135deg, #004d40, #00695c); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 20px; background: white; border-radius: 10px; margin-top: 20px; }
            .field { margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 8px; }
            .label { font-weight: bold; color: #00695c; font-size: 14px; }
            .value { margin-top: 5px; color: #333; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🏥 Daystar Specialist Hospital</h2>
              <p>New Patient Consultation Message</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Patient Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="field">
                <div class="label">📞 Phone:</div>
                <div class="value">${phone || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">📝 Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">💬 Message:</div>
                <div class="value">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This message was sent from Daystar Specialist Hospital website.</p>
              <p>Please respond to this patient within 24 hours.</p>
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
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f0fdfa; border-radius: 10px; }
            .header { background: linear-gradient(135deg, #004d40, #00695c); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 20px; background: white; border-radius: 10px; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 10px 20px; background: #26a69a; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🏥 Daystar Specialist Hospital</h2>
              <p>By His Stripes We Are Healed</p>
            </div>
            <div class="content">
              <h3>Dear ${name},</h3>
              <p>Thank you for reaching out to Daystar Specialist Hospital. We have received your message and our medical team will review it shortly.</p>
              <p><strong>Your message:</strong> "${message.substring(0, 100)}..."</p>
              <p>We will get back to you within <strong>24 hours</strong> via email or phone.</p>
              <p>If you need immediate medical assistance, please call our emergency line:</p>
              <p><strong>📞 Emergency: +(234) 8039331585</strong></p>
              <a href="https://daystar-hospital.vercel.app" class="button">Visit Our Website</a>
            </div>
            <div class="footer">
              <p>© 2026 Daystar Specialist Hospital. All rights reserved.</p>
              <p>NO. 10 DAYSTAR STREET, MGBEKE AMUCHE, NKWELLE-EZUNAKA, OYI, ANAMBRA STATE</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send both emails
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
      message: 'Failed to send message. Please call us directly at +(234) 8039331585' 
    });
  }
});

