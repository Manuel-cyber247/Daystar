import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className="logo">CarePlus</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}