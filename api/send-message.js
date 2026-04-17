import nodemailer from 'nodemailer';

export default async function handler(req, res) {
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
      message: 'API is working! Use POST to send messages.' 
    });
  }

  // Handle POST
  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Please fill in all required fields' 
        });
      }

      // Check if email credentials are configured
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Missing email credentials in environment variables');
        return res.status(500).json({ 
          success: false, 
          error: 'Email service not configured. Please contact the administrator.' 
        });
      }

      // Create email transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Verify transporter works
      await transporter.verify();

      // Email to hospital admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to the hospital email
        subject: `📨 New Patient Message: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .container { padding: 20px; background: #f0fdfa; border-radius: 10px; }
              .header { background: #004d40; color: white; padding: 15px; border-radius: 10px 10px 0 0; }
              .content { padding: 20px; background: white; border-radius: 10px; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #004d40; }
              .footer { margin-top: 20px; padding: 10px; text-align: center; color: #666; font-size: 12px; }
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
                  <p>${name}</p>
                </div>
                <div class="field">
                  <div class="label">📧 Email:</div>
                  <p>${email}</p>
                </div>
                <div class="field">
                  <div class="label">📞 Phone:</div>
                  <p>${phone || 'Not provided'}</p>
                </div>
                <div class="field">
                  <div class="label">📝 Subject:</div>
                  <p>${subject}</p>
                </div>
                <div class="field">
                  <div class="label">💬 Message:</div>
                  <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
              <div class="footer">
                <p>Sent from Daystar Specialist Hospital Website</p>
                <p>${new Date().toLocaleString()}</p>
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
              .container { padding: 20px; background: #f0fdfa; border-radius: 10px; }
              .header { background: #004d40; color: white; padding: 15px; border-radius: 10px 10px 0 0; }
              .content { padding: 20px; background: white; border-radius: 10px; }
              .footer { margin-top: 20px; padding: 10px; text-align: center; color: #666; font-size: 12px; }
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
                <p>Thank you for contacting Daystar Specialist Hospital. We have received your message and our medical team will review it shortly.</p>
                <p><strong>Your message:</strong></p>
                <p><em>"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</em></p>
                <p>We will get back to you within <strong>24 hours</strong> via email or phone.</p>
                <p>If you need immediate medical assistance, please call our emergency line:</p>
                <p><strong>📞 Emergency: +234 906 382 1361</strong></p>
                <br>
                <p>Best regards,</p>
                <p><strong>Daystar Specialist Hospital Team</strong></p>
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

      console.log('Email sent successfully to hospital and patient:', email);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully! Our team will respond within 24 hours.' 
      });

    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send message. Please call us directly at +234 906 382 1361' 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}