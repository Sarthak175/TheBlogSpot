import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    blogTitle: 'The Blog Spot',
    blogDescription: 'A clean, minimal blog application',
    customDomain: '',
    httpsEnabled: true,
    seoTitle: '',
    metaDescription: '',
    googleAnalytics: '',
    facebookPixel: ''
  });

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings">
      <div className="container">
        <h1>⚙️ Settings</h1>
        <p>Configure your blog settings, SEO, and integrations</p>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-section">
            <h2>📝 Basic Settings</h2>
            <div className="form-group">
              <label>Blog Title</label>
              <input
                type="text"
                name="blogTitle"
                value={settings.blogTitle}
                onChange={handleChange}
                placeholder="Your blog title"
              />
            </div>
            <div className="form-group">
              <label>Blog Description</label>
              <textarea
                name="blogDescription"
                value={settings.blogDescription}
                onChange={handleChange}
                placeholder="Describe your blog"
                rows="3"
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>🔗 Domain & Security</h2>
            <div className="form-group">
              <label>Custom Domain</label>
              <input
                type="text"
                name="customDomain"
                value={settings.customDomain}
                onChange={handleChange}
                placeholder="yourblog.com"
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={settings.httpsEnabled}
                  onChange={(e) => setSettings({...settings, httpsEnabled: e.target.checked})}
                />
                Enable HTTPS (Recommended)
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2>🔍 SEO Settings</h2>
            <div className="form-group">
              <label>SEO Title</label>
              <input
                type="text"
                name="seoTitle"
                value={settings.seoTitle}
                onChange={handleChange}
                placeholder="SEO optimized title"
              />
            </div>
            <div className="form-group">
              <label>Meta Description</label>
              <textarea
                name="metaDescription"
                value={settings.metaDescription}
                onChange={handleChange}
                placeholder="SEO meta description"
                rows="2"
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>📊 Analytics & Tracking</h2>
            <div className="form-group">
              <label>Google Analytics ID</label>
              <input
                type="text"
                name="googleAnalytics"
                value={settings.googleAnalytics}
                onChange={handleChange}
                placeholder="GA-XXXXXXXXX-X"
              />
            </div>
            <div className="form-group">
              <label>Facebook Pixel ID</label>
              <input
                type="text"
                name="facebookPixel"
                value={settings.facebookPixel}
                onChange={handleChange}
                placeholder="Facebook Pixel ID"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            💾 Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;