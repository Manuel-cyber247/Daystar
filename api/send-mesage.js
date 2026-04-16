import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/send-message', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please fill in all required fields' 
    });
  }

  try {
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📨 New Patient Message: ${subject}`,
      html: `<h2>New Message from ${name}</h2>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
             <p><strong>Message:</strong> ${message}</p>`
    };

    const patientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting Daystar Specialist Hospital`,
      html: `<h2>Dear ${name},</h2>
             <p>Thank you for contacting us. We will respond within 24 hours.</p>
             <p>For emergencies, call: +(234) 8039331585</p>`
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(patientMailOptions);

    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please call us directly.' 
    });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working on Vercel!' });
});

export default app;