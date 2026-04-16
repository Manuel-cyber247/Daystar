import { useState } from 'react';
import './consultation.css';

export default function Consultation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccess('');
  setError('');

  try {
    const formDataToSend = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message
    };

    console.log('Sending:', formDataToSend);

    const response = await fetch('https://daystarlovat.vercel.app/api/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);

    if (data.success) {
      setSuccess('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } else {
      setError(data.error || 'Failed to send message');
    }
  } catch (err) {
    console.error('Error:', err);
    setError('Unable to send message. Please call us directly.');
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="consultation-page">
      <div className="consultation-header">
        <h1>Send Us a Message</h1>
        <p>We're here to answer your questions and provide medical guidance</p>
      </div>

      <div className="consultation-container">
        <div className="consultation-info">
          <h2>Get in Touch</h2>
          
          <div className="info-section">
            <div className="info-icon">🏥</div>
            <div className="info-text">
              <h3>Main Branch</h3>
              <p>NO. 10 DAYSTAR STREET, MGBEKE AMUCHE</p>
              <p>NKWELLE-EZUNAKA, OYI, ANAMBRA STATE</p>
              <p>📞 +234 906 382 1361</p>
            </div>
          </div>

          <div className="info-section">
            <div className="info-icon">🌿</div>
            <div className="info-text">
              <h3>Annex Branch</h3>
              <p>17A EZEUDU STREET UMUDIOKA, AWKA, ANAMBRA STATE</p>
              <p>📞 +234 706 285 4744</p>
            </div>
          </div>

          <div className="info-section">
            <div className="info-icon">📧</div>
            <div className="info-text">
              <h3>Email Us</h3>
              <p>daystarspecialist@gmail.com.com</p>
             
            </div>
          </div>

          <div className="info-section">
            <div className="info-icon">🕐</div>
            <div className="info-text">
              <h3>Working Hours</h3>
              <p>Monday - Sunday: 24/7</p>
              <p>Emergency Services: Always Open</p>
            </div>
          </div>

          <div className="emergency-box">
            <h3>🚨 Emergency?</h3>
            <p>Call us immediately for urgent medical assistance</p>
            <p className="emergency-number">+234 906 382 1361, +234 706 285 4744 </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="consultation-form">
          <h2>Send Your Message</h2>
          <p className="form-subtitle">Our medical team will respond within 24 hours</p>
          
          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Your Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 XXX XXX XXXX"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What is your message about?"
            />
          </div>

          <div className="form-group">
            <label>Your Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Please describe your health concern, question, or message for our doctors..."
            ></textarea>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : '✉️ Send Message'}
          </button>

          <p className="form-note">
            By submitting this form, you agree to our privacy policy. Your information will be kept confidential.
          </p>
        </form>
      </div>
    </div>
  );
}