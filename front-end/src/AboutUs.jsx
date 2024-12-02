import React from 'react';
import './css/AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
  <div>

<div className="header">
    <h2>TaskHive</h2>

    <div className="right">
    <div className="links">
        <Link to='/features' className="link">Features</Link>
        <Link to='/aboutus' className="link">About Us</Link>
        <Link to='/contact' className="link">Contact Us</Link>
    </div>

    <div className="auth">
      <Link className="link" to='/login'>Log in</Link>
      <Link className="link red" to='/signup'>Start For Free</Link>
    </div>

    </div>
  </div>

    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-text">
          <h1 className="about-us-title">About Our Todo App</h1>
          <p className="about-us-description">
            We are a passionate team dedicated to helping individuals and teams 
            maximize their productivity and organization. Our todo app was born 
            from a simple idea: making task management intuitive, efficient, and 
            enjoyable.
          </p>
          <p className="about-us-description">
            Founded by a group of productivity enthusiasts, we understand the 
            challenges of managing tasks across multiple projects and priorities. 
            Our app is designed to simplify your workflow, providing powerful 
            tools that help you stay focused, track progress, and achieve your 
            goals with ease.
          </p>
          <div className="about-us-values">
            <h2>Our Core Values</h2>
            <ul>
              <li>Simplicity in Design</li>
              <li>User-Centric Approach</li>
              <li>Continuous Improvement</li>
              <li>Empowering Productivity</li>
            </ul>
          </div>
          <div className="about-us-mission">
            <h2>Our Mission</h2>
            <p>
              To create a task management solution that transforms how people 
              organize, prioritize, and accomplish their most important work.
            </p>
          </div>
        </div>
        <div className="about-us-image-container">
          <img 
            src="../team.jpg" 
            alt="Our Team" 
            className="about-us-image"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;