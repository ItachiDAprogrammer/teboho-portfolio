import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import PortraitCarousel from './components/PortraitCarousel/PortraitCarousel';
import LandscapeCarousel from './components/LandscapeCarousel/LandscapeCarousel';
import Contact from './components/Contact/Contact';

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <LandscapeCarousel />
      <PortraitCarousel />
      <Contact />
    </>
  );
};

export default App;