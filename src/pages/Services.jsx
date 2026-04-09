// File: pages/Services.jsx (without react-icons)
import "./services.css";

export default function Services() {
  const servicesList = [
    { icon: "❤️", name: "Cardiology", desc: "Comprehensive heart care and surgeries" },
    { icon: "🧠", name: "Neurology", desc: "Advanced brain and nerve treatments" },
    { icon: "👶", name: "Pediatrics", desc: "Specialized care for children" },
    { icon: "🔪", name: "Surgery", desc: "Minimally invasive procedures" },
    { icon: "🔬", name: "Laboratory", desc: "24/7 diagnostic services" },
    { icon: "💊", name: "Pharmacy", desc: "Full-service medical pharmacy" },
    { icon: "👁️", name: "Ophthalmology", desc: "Eye exams and surgeries" },
    { icon: "🦷", name: "Dentistry", desc: "Complete dental care" }
  ];

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Medical Services</h1>
        <p>Comprehensive healthcare solutions tailored to your needs</p>
      </div>
      <div className="services-grid">
        {servicesList.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p>{service.desc}</p>
            <button>Learn More →</button>
          </div>
        ))}
      </div>
    </div>
  );
}