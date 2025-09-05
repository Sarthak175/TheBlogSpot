import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">The Blog Spot</h3>
            <p className="footer-description">
              Discover amazing stories, insights, and ideas from our community of passionate writers.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                📷
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                💼
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                🐦
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/category/tech">Technology</Link></li>
              <li><Link to="/category/travel">Travel</Link></li>
              <li><Link to="/category/lifestyle">Lifestyle</Link></li>
              <li><Link to="/category/business">Business</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Stay Connected</h4>
            <p className="newsletter-text">
              Subscribe to our newsletter for the latest updates
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button type="submit" className="btn btn-primary newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © 2024 The Blog Spot. All rights reserved.
          </p>
          <p className="made-with">
            Made with ❤️ for bloggers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;