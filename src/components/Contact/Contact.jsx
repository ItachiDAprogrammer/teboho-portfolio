import React from 'react';
import './Contact.css';
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2>Let’s Work Together</h2>
        <p>If you’re looking for a creative video editor to collaborate with, I’d love to hear from you.</p>

        <a href="mailto:your@email.com" className="contact-email">
          <FaEnvelope /> your@email.com
        </a>

        <div className="contact-socials">
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
        </div>

        <p className="rights-tag">© 2025 Teboho Ntene. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Contact;