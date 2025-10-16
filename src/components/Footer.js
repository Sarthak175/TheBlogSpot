import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>The Blog Spot</h2>
          <p>Your go-to destination for insightful articles, creative stories, and engaging content across various topics.</p>
          <div className="footer-icons">
            <div className="footer-icon">📷</div>
            <div className="footer-icon">💼</div>
            <div className="footer-icon">✒️</div>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Categories</h3>
          <ul className="footer-links">
            <li><a href="/category/technology">Technology</a></li>
            <li><a href="/category/travel">Travel</a></li>
            <li><a href="/category/lifestyle">Lifestyle</a></li>
            <li><a href="/category/business">Business</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Stay Connected</h3>
          <p style={{color: '#9ca3af', marginBottom: '16px'}}>Subscribe to get the latest updates</p>
          <div className="footer-subscribe">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2024 The Blog Spot. All rights reserved.</p>
        <p className="made-with-love">Made with ❤️ for bloggers everywhere.</p>
      </div>
    </footer>
  );
};

export default Footer;