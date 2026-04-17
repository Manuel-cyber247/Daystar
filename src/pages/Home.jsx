// File: pages/Home.jsx (with custom image support)
import { useState, useEffect } from "react";
import "./home.css";

// ============================================
// IMPORT YOUR CUSTOM IMAGES HERE
// ============================================
// Hero Slider Images - Add your own images
import heroImg1 from "../assets/doctor.jpg";
import heroImg2 from "../assets/daystar-one.jpeg";
import heroImg3 from "../assets/main-branch.jpg";

// Doctor Images - Add your own doctor photos
import doctor4Img from "../assets/doctor1.png";
import doctor2Img from "../assets/doctor2.jpeg";
import doctor3Img from "../assets/doctor3.jpeg";
import doctor1Img from "../assets/doctor1.jpeg";

// If you don't have images yet, use these placeholders or URL strings:
// const heroImg1 = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3";
// const heroImg2 = "https://images.unsplash.com/photo-1576091160550-2173dba999ef";
// const heroImg3 = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d";
// const doctor1Img = "https://randomuser.me/api/portraits/men/32.jpg";
// const doctor2Img = "https://randomuser.me/api/portraits/men/45.jpg";
// const doctor3Img = "https://randomuser.me/api/portraits/men/50.jpg";
// const doctor4Img = "https://randomuser.me/api/portraits/women/44.jpg";
// ============================================

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [heroImg1, heroImg2, heroImg3];

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
          <p>Immediate response with advanced life support</p>
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
          <h3>10K+</h3>
          <p>Happy Patients</p>
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
            <img src={doctor1Img} alt="Dr. Chinyelu Uchenna Ufoaroh" />
            <h4>Dr. Chinyelu Uchenna Ufoaroh</h4>
            <p>Internal Physician <br />Pulmonology/Chest Medicine</p>
            <div className="doctor-social">
              <span>✉️ ufoarohcu@yahoo.com</span>
              <span>📞 08039331585</span>
            </div>
          </div>
          <div className="doctor">
            <img src={doctor2Img} alt="Dr. Modekwe Victor Ifeanyichukwu" />
            <h4>Dr. Modekwe Victor Ifeanyichukwu</h4>
            <p>Paediatric and General Surgeon</p>
            <div className="doctor-social">
              <span>✉️ victormodekwe@yahoo.com</span>
              <span>📞 08036083266</span>
            </div>
          </div>
          <div className="doctor">
            <img src={doctor3Img} alt="Dr. Nwankwo Ezekiel Uchechukwu" />
            <h4>Dr. Nwankwo Ezekiel Uchechukwu</h4>
            <p>Plastic Surgeon</p>
            <div className="doctor-social">
              <span>✉️ ucnwankwo3@gmail.com</span>
              <span>📞 08012345678</span>
            </div>
          </div>
          <div className="doctor">
            <img src={doctor4Img} alt="Dr. Somto Celestine Ngonnadi" />
            <h4>Dr. Somto Celestine Ngonnadi</h4>
            <p>Paediatrics</p>
            <div className="doctor-social">
              <span>✉️ somtongonadi@email.com</span>
              <span>📞 08012345678</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}