import "./home.css";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div>
          <h2>World-Class Healthcare</h2>
          <p>Trusted medical services with modern technology</p>
          <button>Our Services</button>
        </div>
        <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3" />
      </section>

      <section className="features">
        <div className="card">
          <img src="https://img.icons8.com/color/96/ambulance.png" />
          <h3>Emergency</h3>
          <p>24/7 response</p>
        </div>
        <div className="card">
          <img src="https://img.icons8.com/color/96/doctor-male.png" />
          <h3>Doctors</h3>
          <p>Professional experts</p>
        </div>
        <div className="card">
          <img src="https://img.icons8.com/color/96/hospital-room.png" />
          <h3>Facilities</h3>
          <p>Modern equipment</p>
        </div>
      </section>

      <section className="doctors">
        <h2>Our Doctors</h2>
        <div className="doctor-grid">
          <div className="doctor">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" />
            <h4>Dr. John</h4>
            <p>Cardiologist</p>
          </div>
          <div className="doctor">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" />
            <h4>Dr. Sarah</h4>
            <p>Neurologist</p>
          </div>
          <div className="doctor">
            <img src="https://randomuser.me/api/portraits/men/50.jpg" />
            <h4>Dr. Mike</h4>
            <p>Surgeon</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Patients Say</h2>
        <div className="testimonial">Amazing service and care!</div>
        <div className="testimonial">Doctors are very professional.</div>
      </section>
    </div>
  );
}
