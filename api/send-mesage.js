import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
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

// POST endpoint for sending messages
app.post('/api/send-message', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields' 
    });
  }

  try {
    // Email to hospital admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📨 New Patient Message: ${subject}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Auto-reply to patient
    const patientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting Daystar Specialist Hospital`,
      html: `
        <h2>Dear ${name},</h2>
        <p>Thank you for contacting Daystar Specialist Hospital. We will respond within 24 hours.</p>
        <p>For emergencies, please call: <strong>+(234) 8039331585</strong></p>
        <br>
        <p>Best regards,<br>Daystar Specialist Hospital Team</p>
      `
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(patientMailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please call us directly.' 
    });
  }
});

// GET endpoint for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working on Vercel!' });
});

// Export the Express app for Vercel
export default app;