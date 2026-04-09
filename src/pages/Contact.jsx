// File: pages/Contact.jsx (Original Layout with Custom Images)
import { useState } from "react";
import "./contact.css";
// Import your custom images here
import mainBranchImg from "../assets/main-branch.jpg";
import annexBranchImg from "../assets/doctor.jpg";

export default function Contact() {
  const [selectedBranch, setSelectedBranch] = useState("main");

  const branches = {
    main: {
      name: "Daystar Specialist Hospital & Maternity",
      address: "NO. 10 DAYSTAR STREET, MGBEKE AMUCHE, NKWELLE-EZUNAKA, OYI, ANAMBRA STATE",
      phone: "+(234) 8039331585",
      email: "main@careplus.com",
      hours: "24/7 Emergency Services",
      mapLink: "https://www.google.com/maps/place/Day+star+hospital/@6.2056056,6.8621718,15z/data=!4m10!1m2!2m1!1sdaystar+nkwelle+ezunanka!3m6!1s0x10438f486a12d735:0xee71c43465de74ee!8m2!3d6.2055455!4d6.8622905!15sChdkYXlzdGFyIG5rd2VsbGUgZXp1bmFrYZIBCGhvc3BpdGFs4AEA!16s%2Fg%2F11jp08p3jl?entry=ttu&g_ep=EgoyMDI2MDQwNi4wIKXMDSoASAFQAw%3D%3D",
      image: mainBranchImg
    },
    west: {
      name: "Daystar Specialist Hospital & Maternity",
      address: "24 Emenike Okoye Avenue",
      phone: "+(234) 704356733",
      email: "west@careplus.com",
      hours: "24/7 Emergency Services",
      mapLink: "https://www.google.com/maps/place/Daystar+specialist+hospital+and+Maternity/@6.2149345,7.0710193,19z/data=!4m14!1m7!3m6!1s0x104383403e8160b3:0x1b117dcec044781!2sDaystar+specialist+hospital+and+Maternity!8m2!3d6.2150318!4d7.0714646!16s%2Fg%2F11h3nhgk5v!3m5!1s0x104383403e8160b3:0x1b117dcec044781!8m2!3d6.2150318!4d7.0714646!16s%2Fg%2F11h3nhgk5v?entry=ttu&g_ep=EgoyMDI2MDQwNi4wIKXMDSoASAFQAw%3D%3D",
      image: annexBranchImg
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Our Hospital Branches</h1>
        <p>Two convenient locations to serve you better</p>
      </div>

      <div className="branch-tabs">
        <button 
          className={selectedBranch === "main" ? "active" : ""} 
          onClick={() => setSelectedBranch("main")}
        >
          🏥 Main Branch
        </button>
        <button 
          className={selectedBranch === "west" ? "active" : ""} 
          onClick={() => setSelectedBranch("west")}
        >
          🌆 Annex Branch
        </button>
      </div>

      <div className="branch-details">
        <div className="branch-image">
          <img src={branches[selectedBranch].image} alt={branches[selectedBranch].name} />
        </div>
        <div className="branch-info">
          <h2>{branches[selectedBranch].name}</h2>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <div>
              <strong>Address:</strong>
              <p>{branches[selectedBranch].address}</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <strong>Phone:</strong>
              <p>{branches[selectedBranch].phone}</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">✉️</span>
            <div>
              <strong>Email:</strong>
              <p>{branches[selectedBranch].email}</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">🕐</span>
            <div>
              <strong>Opening Hours:</strong>
              <p>{branches[selectedBranch].hours}</p>
            </div>
          </div>
          <a 
            href={branches[selectedBranch].mapLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="map-button"
          >
            🗺️ Get Directions
          </a>
        </div>
      </div>

      <div className="branches-showcase">
        <h3>Both Branches Are Ready to Serve You</h3>
        <div className="branch-cards">
          <div className="branch-card" onClick={() => setSelectedBranch("main")}>
            <div className="branch-card-icon">🏥</div>
            <h4>Main Branch</h4>
            <p>Nkwelle-Ezunaka</p>
            <span className="branch-card-hours">24/7 Open</span>
          </div>
          <div className="branch-card" onClick={() => setSelectedBranch("west")}>
            <div className="branch-card-icon">🌆</div>
            <h4>Annex Branch</h4>
            <p>Emenike Okoye Avenue</p>
            <span className="branch-card-hours">24/7 Open</span>
          </div>
        </div>
      </div>
    </div>
  );
}