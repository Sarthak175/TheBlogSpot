import React from 'react';
import './Earnings.css';

const Earnings = () => {
  return (
    <div className="earnings">
      <div className="container">
        <h1>💰 Earnings</h1>
        <p>Connect your blog with Google AdSense to earn money from ads</p>

        <div className="earnings-overview">
          <div className="earning-card">
            <h3>$0.00</h3>
            <p>Total Earnings</p>
          </div>
          <div className="earning-card">
            <h3>$0.00</h3>
            <p>This Month</p>
          </div>
          <div className="earning-card">
            <h3>0</h3>
            <p>Ad Clicks</p>
          </div>
        </div>

        <div className="adsense-setup">
          <h2>🚀 Get Started with Google AdSense</h2>
          <div className="setup-steps">
            <div className="step">
              <h3>1. Create AdSense Account</h3>
              <p>Sign up for Google AdSense with your Google account</p>
              <button className="btn btn-primary">Go to AdSense</button>
            </div>
            <div className="step">
              <h3>2. Add Your Website</h3>
              <p>Submit your blog URL for review and approval</p>
            </div>
            <div className="step">
              <h3>3. Get Approved</h3>
              <p>Wait for Google to review and approve your site</p>
            </div>
            <div className="step">
              <h3>4. Place Ad Codes</h3>
              <p>Add AdSense code to your blog to start earning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;