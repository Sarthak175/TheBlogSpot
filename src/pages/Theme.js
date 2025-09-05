import React, { useState } from 'react';
import './Theme.css';

const Theme = ({ isDarkMode, toggleTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState(isDarkMode ? 'modern' : 'light');
  const [customColors, setCustomColors] = useState({
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#22c55e',
    background: '#0f172a',
    text: '#e2e8f0'
  });

  const themes = [
    { 
      id: 'modern', 
      name: 'Midnight Pro', 
      preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
      colors: { bg: '#0f172a', text: '#e2e8f0' } 
    },
    { 
      id: 'light', 
      name: 'Pure Elegance', 
      preview: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', 
      colors: { bg: '#ffffff', text: '#1e293b' } 
    },
    { 
      id: 'ocean', 
      name: 'Ocean Depths', 
      preview: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)', 
      colors: { bg: '#0c4a6e', text: '#e0f2fe' } 
    },
    { 
      id: 'royal', 
      name: 'Royal Amethyst', 
      preview: 'linear-gradient(135deg, #581c87 0%, #7c2d92 50%, #a21caf 100%)', 
      colors: { bg: '#581c87', text: '#f3e8ff' } 
    },
    { 
      id: 'forest', 
      name: 'Emerald Forest', 
      preview: 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #059669 100%)', 
      colors: { bg: '#064e3b', text: '#d1fae5' } 
    },
    { 
      id: 'sunset', 
      name: 'Golden Sunset', 
      preview: 'linear-gradient(135deg, #9a3412 0%, #c2410c 50%, #ea580c 100%)', 
      colors: { bg: '#9a3412', text: '#fed7aa' } 
    },
    { 
      id: 'cosmic', 
      name: 'Cosmic Nebula', 
      preview: 'radial-gradient(circle at 20% 50%, #7c3aed 0%, #1e1b4b 50%, #0f0f23 100%)', 
      colors: { bg: '#0f0f23', text: '#e0e7ff' } 
    },
    { 
      id: 'aurora', 
      name: 'Aurora Borealis', 
      preview: 'linear-gradient(45deg, #065f46 0%, #047857 25%, #0891b2 50%, #7c3aed 75%, #be185d 100%)', 
      colors: { bg: '#065f46', text: '#ecfdf5' } 
    },
    { 
      id: 'matrix', 
      name: 'Digital Matrix', 
      preview: 'linear-gradient(135deg, #052e16 0%, #14532d 100%)', 
      colors: { bg: '#052e16', text: '#22c55e' } 
    },
    { 
      id: 'neon', 
      name: 'Neon Nights', 
      preview: 'linear-gradient(135deg, #1a0b2e 0%, #16213e 50%, #0f3460 100%)', 
      colors: { bg: '#1a0b2e', text: '#00ffff' } 
    },
    { 
      id: 'sakura', 
      name: 'Sakura Dreams', 
      preview: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f3e8ff 100%)', 
      colors: { bg: '#fdf2f8', text: '#831843' } 
    },
    { 
      id: 'volcano', 
      name: 'Volcanic Ash', 
      preview: 'radial-gradient(circle at 30% 70%, #dc2626 0%, #7f1d1d 50%, #1c1917 100%)', 
      colors: { bg: '#1c1917', text: '#fecaca' } 
    }
  ];

  const applyTheme = (themeId) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;
    
    setSelectedTheme(themeId);
    
    // Apply theme to document root
    const root = document.documentElement;
    
    if (themeId === 'light') {
      if (isDarkMode) toggleTheme();
    } else if (themeId === 'modern') {
      if (!isDarkMode) toggleTheme();
    } else {
      // Apply custom theme colors and gradients
      root.style.setProperty('--bg-primary', theme.colors.bg);
      root.style.setProperty('--text-primary', theme.colors.text);
      root.style.setProperty('--theme-gradient', theme.preview);
      
      document.body.className = `custom-theme theme-${themeId}`;
    }
  };

  const fonts = [
    { id: 'system', name: 'System Default', preview: 'The quick brown fox' },
    { id: 'inter', name: 'Inter', preview: 'The quick brown fox' },
    { id: 'roboto', name: 'Roboto', preview: 'The quick brown fox' },
    { id: 'opensans', name: 'Open Sans', preview: 'The quick brown fox' },
    { id: 'lato', name: 'Lato', preview: 'The quick brown fox' }
  ];

  return (
    <div className="theme">
      <div className="container">
        <h1>🎭 Theme</h1>
        <p>Change the design of your blog - colors, fonts, and overall appearance</p>

        <div className="theme-sections">
          <div className="theme-section">
            <h2>🎨 Color Themes</h2>
            <div className="themes-grid">
              {themes.map(theme => (
                <div key={theme.id} className={`theme-card ${theme.active ? 'active' : ''}`}>
                  <div className="theme-preview" style={{ background: theme.preview }}>
                    <div className="preview-content">
                      <div className="preview-header"></div>
                      <div className="preview-text"></div>
                      <div className="preview-text short"></div>
                    </div>
                  </div>
                  <h3>{theme.name}</h3>
                  <button 
                    className={`btn ${selectedTheme === theme.id ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => applyTheme(theme.id)}
                  >
                    {selectedTheme === theme.id ? 'Active' : 'Apply'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="theme-section">
            <h2>🔤 Typography</h2>
            <div className="fonts-grid">
              {fonts.map(font => (
                <div key={font.id} className="font-card">
                  <h3>{font.name}</h3>
                  <p className="font-preview" style={{ fontFamily: font.id }}>{font.preview}</p>
                  <button className="btn btn-secondary">Select</button>
                </div>
              ))}
            </div>
          </div>

          <div className="theme-section">
            <h2>🎯 Custom Colors</h2>
            <div className="colors-grid">
              <div className="color-input">
                <label>Primary Color</label>
                <input
                  type="color"
                  value={customColors.primary}
                  onChange={(e) => setCustomColors({...customColors, primary: e.target.value})}
                />
                <span>{customColors.primary}</span>
              </div>
              <div className="color-input">
                <label>Secondary Color</label>
                <input
                  type="color"
                  value={customColors.secondary}
                  onChange={(e) => setCustomColors({...customColors, secondary: e.target.value})}
                />
                <span>{customColors.secondary}</span>
              </div>
              <div className="color-input">
                <label>Accent Color</label>
                <input
                  type="color"
                  value={customColors.accent}
                  onChange={(e) => setCustomColors({...customColors, accent: e.target.value})}
                />
                <span>{customColors.accent}</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-large"
          onClick={() => {
            // Apply custom colors
            const root = document.documentElement;
            root.style.setProperty('--color-primary', customColors.primary);
            root.style.setProperty('--color-secondary', customColors.secondary);
            root.style.setProperty('--color-accent', customColors.accent);
            alert('Custom colors applied!');
          }}
        >
          🎨 Apply Custom Colors
        </button>
      </div>
    </div>
  );
};

export default Theme;