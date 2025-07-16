import React from 'react';
import './About.css';
import profileImage from '../../assets/teboho.PNG'; 

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-image">
          <img src={profileImage} alt="Teboho Ntene" />
        </div>

        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I’m <span className="highlight">Teboho Ntene</span>, a video editor passionate about transforming visuals into meaningful stories. 
            Whether it’s cinematic cuts, branded content, or dynamic reels, I bring ideas to life with rhythm and style.
          </p>
          <p>
            With a sharp eye for flow and pacing, I craft edits that captivate — every frame counts.
          </p>
          <a href="#contact" className="about-btn">Let’s Work Together</a>
        </div>
      </div>
    </section>
  );
};

export default About;