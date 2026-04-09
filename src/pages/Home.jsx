// File: pages/Home.jsx (without react-icons)
import { useState, useEffect } from "react";
import "./home.css";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-overlay"></div>
        <img src={slides[currentSlide]} alt="Hero" className="hero-img" />
        <div className="hero-content">
          <h2>World-Class Healthcare</h2>
          <p>Trusted medical services with modern technology and compassionate care</p>
          
        </div>
      </section>

      <section className="features">
        <div className="card">
          <div className="card-icon">🚑</div>
          <h3>24/7 Emergency</h3>
        
        </div>
        <div className="card">
          <div className="card-icon">👨‍⚕️</div>
          <h3>Expert Doctors</h3>
          <p>Specialized physicians with years of experience</p>
        </div>
        <div className="card">
          <div className="card-icon">🏥</div>
          <h3>Modern Facilities</h3>
          <p>State-of-the-art equipment and comfortable rooms</p>
        </div>
      </section>

      <section className="stats">
        <div className="stat">
          <h3>50K+</h3>
          <p>Happy Patients</p>
        </div>
                <div className="stat">
          <h3>2 Branches</h3>
          <p>To suit your comfort</p>
        </div>

        <div className="stat">
          <h3>98%</h3>
          <p>Satisfaction Rate</p>
        </div>
        <div className="stat">
          <h3>24/7</h3>
          <p>Emergency Care</p>
        </div>
      </section>

      <section className="doctors">
        <h2>Meet Our <span>Specialists</span></h2>
        <div className="doctor-grid">
          <div className="doctor">
            <img src="" />
            <h4>Dr. Chinyelu Uchenna Ufoaroh</h4>
            <p>Physician</p>
            <div className="doctor-social">
              <span>✉️ufoarohcu@gmail.com</span>
              <span>📞08039331585</span>
            </div>
          </div>
          <div className="doctor">
            <img src="" />
            <h4>Dr. Sarah Mitchell</h4>
            <p>Neurologist</p>
            <div className="doctor-social">
              <span>✉️</span>
              <span>📞</span>
            </div>
          </div>
          <div className="doctor">
            <img src="" />
            <h4>Dr. Michael Chen</h4>
            <p>Orthopedic Surgeon</p>
            <div className="doctor-social">
              <span>✉️</span>
              <span>📞</span>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}