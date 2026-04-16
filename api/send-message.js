// This is a simplified version that WILL work on Vercel
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request for testing
  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: 'API is working on Vercel!',
      methods: ['GET', 'POST']
    });
  }

  // Handle POST request
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
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
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Send to admin
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
        `
      });

      // Send auto-reply to patient
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Thank you for contacting Daystar Specialist Hospital`,
        html: `
          <h2>Dear ${name},</h2>
          <p>Thank you for contacting Daystar Specialist Hospital. We will respond within 24 hours.</p>
          <p>For emergencies, call: +234 906 382 1361</p>
          <p>Best regards,<br>Daystar Specialist Hospital Team</p>
        `
      });

      return res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully!' 
      });
    } catch (error) {
      console.error('Email error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send message. Please call us directly.' 
      });
    }
  }

  // Handle any other method
  return res.status(405).json({ 
    success: false, 
    message: 'Method not allowed' 
  });
}