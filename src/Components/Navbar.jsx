// File: components/Navbar.jsx (with smaller logo image)
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";
import medicalLogo from "../assets/medical-logo.png"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="logo">
        <div className="logo-icon">
          <img src={medicalLogo} alt="medicallogo" />
        </div>
        <div className="heading">
          <h1>Daystar Specialist Hospital & Maternity</h1>
          <p>By His Stripes We Are Healed</p>
        </div>
      </div>
      <div className={`links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/services" onClick={() => setMenuOpen(false)}>Services</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        <NavLink to="/consultation" onClick={() => setMenuOpen(false)}>Send Message</NavLink>
      </div>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}