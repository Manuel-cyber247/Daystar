import "./contact.css";

export default function Contact() {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message"></textarea>
        <button>Send Message</button>
      </form>
    </div>
  );
}