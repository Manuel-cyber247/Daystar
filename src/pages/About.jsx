// File: pages/About.jsx (without react-icons)
import "./about.css";

export default function About() {
  return (
    <div className="about">
      <div className="about-hero">
        <h1>About Daystar Specialit Hospital & Maternity</h1>
        <p>Excellence in healthcare for over 25 years</p>
      </div>
      
      <div className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>To provide compassionate, high-quality healthcare services that improve the well-being of our community through innovation, research, and patient-centered care.</p>
          <h2>Our Vision</h2>
          <p>To be a globally recognized healthcare institution setting benchmarks in medical excellence, patient safety, and holistic healing.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef" alt="Hospital" />
      </div>

      <div className="about-stats">
        <div><div className="stat-icon">🏆</div><h3>25+ Years</h3><p>Of Excellence</p></div>
        <div><div className="stat-icon">🩺</div><h3></h3><p>Specialists</p></div>
        <div><div className="stat-icon">👥</div><h3>10K+ Patients</h3><p>Treated Yearly</p></div>
        <div><div className="stat-icon">❤️</div><h3></h3><p>Patients Satisfaction</p></div>
      </div>
    </div>
  );
}