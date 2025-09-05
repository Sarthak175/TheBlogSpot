import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          <div className="about-header">
            <h1>About The Blog Spot</h1>
            <p>Your destination for amazing stories and insights</p>
          </div>

          <div className="about-sections">
            <section className="about-section">
              <h2>Our Mission</h2>
              <p>
                The Blog Spot is dedicated to providing a platform where writers can share their thoughts, 
                experiences, and expertise with a global audience. We believe in the power of storytelling 
                and the importance of diverse voices in shaping our understanding of the world.
              </p>
            </section>

            <section className="about-section">
              <h2>What We Offer</h2>
              <div className="features-grid">
                <div className="feature">
                  <h3>📝 Easy Publishing</h3>
                  <p>Simple and intuitive tools to create and publish your content</p>
                </div>
                <div className="feature">
                  <h3>🎨 Beautiful Design</h3>
                  <p>Clean, modern interface that makes reading a pleasure</p>
                </div>
                <div className="feature">
                  <h3>📱 Mobile Friendly</h3>
                  <p>Optimized for all devices, from desktop to mobile</p>
                </div>
                <div className="feature">
                  <h3>🔍 Easy Discovery</h3>
                  <p>Powerful search and categorization to find content you love</p>
                </div>
              </div>
            </section>

            <section className="about-section">
              <h2>Join Our Community</h2>
              <p>
                Whether you're a seasoned writer or just starting your blogging journey, 
                The Blog Spot welcomes you. Share your stories, connect with readers, 
                and be part of a growing community of passionate writers and readers.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;