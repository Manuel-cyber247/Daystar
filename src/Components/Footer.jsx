// File: components/Footer.jsx (without react-icons)
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Daystar Specialist Hospital & Maternity</h3>
          <p>Providing compassionate, world-class healthcare since 2016. </p>
          <h2>By His stripes we are healed.</h2>
          <div className="social-icons">
          </div>
        </div>
          
        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>📍 Main Branch: NO. 10 Daystar Street, Mgbeke Amuche, Nkwelle-Ezunanka, Oyi, Anambra State</li>
            <li>📍 Annex: 17A Ezeudu Street Umudioka, Awka, Anambra State</li>
            <li>📞 +234 8039331585</li>
            <li>✉️ daystarspecialist@gmail.com</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Opening Hours</h4>
          <ul>
            <li>Mon-Fri: 24/7</li>
            <li>Sat-Sun: 24/7</li>
            <li>🚨 Emergency: Always Open</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Daystar Specialist Hospital & Maternity | Made with ❤️ for better healthcare</p>
      </div>
    </footer>
  );
}