import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      message: 'API is working! Use POST to send messages.' 
    });
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Please fill in all required fields' 
        });
      }

      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Missing email credentials');
        return res.status(500).json({ 
          success: false, 
          error: 'Email service not configured.' 
        });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.verify();

      // Email to hospital admin with REPLY-TO set to patient
      const adminMailOptions = {
        from: `"Daystar Hospital" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,  // 👈 CRITICAL: Replies go to patient
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
              .reply-info { background: #e8f5e9; padding: 10px; border-radius: 5px; margin-top: 15px; }
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
                  <div class="label">📧 Patient Email:</div>
                  <p><a href="mailto:${email}">${email}</a></p>
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
                <div class="reply-info">
                  <strong>💡 Quick Reply:</strong> Just click "Reply" and your response will go directly to <strong>${email}</strong>
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
        from: `"Daystar Specialist Hospital" <${process.env.EMAIL_USER}>`,
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
                <p>Thank you for contacting Daystar Specialist Hospital. We have received your message and will respond within 24 hours.</p>
                <p><strong>Your message:</strong></p>
                <p><em>"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</em></p>
                <p>For emergencies, please call: <strong>+234 906 382 1361</strong></p>
                <br>
                <p>Best regards,</p>
                <p><strong>Daystar Specialist Hospital Team</strong></p>
              </div>
              <div class="footer">
                <p>© 2026 Daystar Specialist Hospital</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(patientMailOptions);

      console.log('Email sent. Reply-To set to:', email);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully! Our team will respond within 24 hours.' 
      });

    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send message. Please call us directly.' 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}