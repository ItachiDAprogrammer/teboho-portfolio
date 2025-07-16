import React, { useState } from 'react';
import './Navbar.css';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="#" className="logo">
  <img src="/src/assets/logo.png" alt="Teboho Ntene Logo" />
</a>

        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#my-work" onClick={closeMenu}>My Work</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Nav;