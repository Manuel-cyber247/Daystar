// File: pages/Services.jsx (without react-icons)
import "./services.css";

export default function Services() {
const servicesList = [
    { icon: "🫁", name: "Respiratory/Pulmonology", desc: "Comprehensive lung and respiratory care" },
    { icon: "🩺", name: "Internal/General Medicine", desc: "Advanced diagnostic and treatment for adults" },
    { icon: "👶", name: "Paediatrics", desc: "Specialized care for children" },
    { icon: "👶⚕️", name: "Paediatrics Surgery", desc: "Surgical procedures for infants and children" },
    { icon: "🔪", name: "General Surgery", desc: "Minimally invasive and general surgical procedures" },
    { icon: "🔬", name: "Full Laboratory Services", desc: "24/7 diagnostic and testing services" },
    { icon: "💊", name: "Pharmacy", desc: "Full-service medical pharmacy" },
    { icon: "💉", name: "Plastic and Reconstruction Surgery", desc: "Cosmetic and reconstructive procedures" },
    { icon: "🔥", name: "Burns Center", desc: "Specialized burn treatment and care" },
    { icon: "🤰", name: "Obstetrics & Gynaecology", desc: "Women's health, pregnancy, and childbirth care" },
    { icon: "📋", name: "And many more....", desc: "Contact us for complete list of services" },
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
            
          </div>
        ))}
      </div>
    </div>
  );
}