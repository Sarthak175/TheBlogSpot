import React, { useState } from 'react';
import './Layout.css';

const Layout = () => {
  const [layout, setLayout] = useState({
    showSidebar: true,
    sidebarPosition: 'right',
    showSearchBar: true,
    showPopularPosts: true,
    showCategories: true,
    showFollowByEmail: false,
    showRecentPosts: true,
    showSocialLinks: false,
    showNewsletterSignup: true,
    headerStyle: 'modern',
    footerStyle: 'minimal',
    postsPerPage: 6,
    showPostExcerpts: true,
    showReadingTime: true,
    showPostDates: true
  });

  const toggleWidget = (widgetId) => {
    const fieldMap = {
      'search': 'showSearchBar',
      'popular': 'showPopularPosts', 
      'categories': 'showCategories',
      'email': 'showFollowByEmail',
      'recent': 'showRecentPosts',
      'social': 'showSocialLinks',
      'newsletter': 'showNewsletterSignup'
    };
    
    const fieldName = fieldMap[widgetId];
    if (fieldName) {
      setLayout(prev => ({
        ...prev,
        [fieldName]: !prev[fieldName]
      }));
    }
  };

  const widgets = [
    { id: 'search', name: 'Search Bar', description: 'Let readers search your posts', enabled: layout.showSearchBar },
    { id: 'popular', name: 'Popular Posts', description: 'Show most viewed posts', enabled: layout.showPopularPosts },
    { id: 'categories', name: 'Categories', description: 'Display post categories', enabled: layout.showCategories },
    { id: 'email', name: 'Follow by Email', description: 'Email subscription widget', enabled: layout.showFollowByEmail },
    { id: 'recent', name: 'Recent Posts', description: 'Show latest blog posts', enabled: layout.showRecentPosts },
    { id: 'social', name: 'Social Links', description: 'Social media follow buttons', enabled: layout.showSocialLinks },
    { id: 'newsletter', name: 'Newsletter Signup', description: 'Email newsletter subscription', enabled: layout.showNewsletterSignup }
  ];

  return (
    <div className="layout">
      <div className="container">
        <h1>🎨 Layout</h1>
        <p>Control what appears on your homepage (sidebars, header, footer)</p>

        <div className="layout-sections">
          <div className="layout-section">
            <h2>📱 Sidebar Settings</h2>
            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={layout.showSidebar}
                  onChange={(e) => setLayout({...layout, showSidebar: e.target.checked})}
                />
                Show Sidebar
              </label>
            </div>
            <div className="setting-group">
              <label>Sidebar Position</label>
              <select
                value={layout.sidebarPosition}
                onChange={(e) => setLayout({...layout, sidebarPosition: e.target.value})}
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>

          <div className="layout-section">
            <h2>🧩 Widgets</h2>
            <div className="widgets-grid">
              {widgets.map(widget => (
                <div key={widget.id} className="widget-card">
                  <div className="widget-header">
                    <h3>{widget.name}</h3>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={widget.enabled}
                        onChange={() => toggleWidget(widget.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <p>{widget.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="layout-section">
            <h2>📄 Post Display Settings</h2>
            <div className="setting-group">
              <label>Posts Per Page</label>
              <select
                value={layout.postsPerPage}
                onChange={(e) => setLayout({...layout, postsPerPage: parseInt(e.target.value)})}
              >
                <option value="3">3 posts</option>
                <option value="6">6 posts</option>
                <option value="9">9 posts</option>
                <option value="12">12 posts</option>
              </select>
            </div>
            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={layout.showPostExcerpts}
                  onChange={(e) => setLayout({...layout, showPostExcerpts: e.target.checked})}
                />
                Show Post Excerpts
              </label>
            </div>
            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={layout.showReadingTime}
                  onChange={(e) => setLayout({...layout, showReadingTime: e.target.checked})}
                />
                Show Reading Time
              </label>
            </div>
            <div className="setting-group">
              <label>
                <input
                  type="checkbox"
                  checked={layout.showPostDates}
                  onChange={(e) => setLayout({...layout, showPostDates: e.target.checked})}
                />
                Show Post Dates
              </label>
            </div>
          </div>

          <div className="layout-section">
            <h2>🎯 Header & Footer</h2>
            <div className="setting-group">
              <label>Header Style</label>
              <select
                value={layout.headerStyle}
                onChange={(e) => setLayout({...layout, headerStyle: e.target.value})}
              >
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>
            <div className="setting-group">
              <label>Footer Style</label>
              <select
                value={layout.footerStyle}
                onChange={(e) => setLayout({...layout, footerStyle: e.target.value})}
              >
                <option value="minimal">Minimal</option>
                <option value="detailed">Detailed</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>
          </div>

          <div className="layout-section">
            <h2>🔍 Layout Preview</h2>
            <div className="layout-preview">
              <div className="preview-container">
                <div className="preview-header">Header ({layout.headerStyle})</div>
                <div className="preview-content">
                  <div className="preview-main">
                    <div className="preview-post">Post 1</div>
                    <div className="preview-post">Post 2</div>
                    <div className="preview-post">Post 3</div>
                  </div>
                  {layout.showSidebar && (
                    <div className={`preview-sidebar ${layout.sidebarPosition}`}>
                      <div className="preview-widget">Sidebar</div>
                      {layout.showSearchBar && <div className="preview-widget">Search</div>}
                      {layout.showCategories && <div className="preview-widget">Categories</div>}
                      {layout.showPopularPosts && <div className="preview-widget">Popular</div>}
                    </div>
                  )}
                </div>
                <div className="preview-footer">Footer ({layout.footerStyle})</div>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-large"
          onClick={() => {
            console.log('Layout settings:', layout);
            alert('Layout settings saved!\n\n' + JSON.stringify(layout, null, 2));
          }}
        >
          💾 Save Layout Changes
        </button>
      </div>
    </div>
  );
};

export default Layout;