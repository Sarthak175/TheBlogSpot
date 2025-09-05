import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../firebase/auth';
import './Navbar.css';

const Navbar = ({ onSearch, isDarkMode, toggleTheme, user, showToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = async () => {
    const { error } = await logoutUser();
    if (error) {
      showToast('Logout failed: ' + error, 'error');
    } else {
      showToast('Logged out successfully!', 'success');
      navigate('/login');
    }
  };

  if (!user) {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="nav-logo">
              The Blog Spot
            </Link>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <div className="user-header">
        <div className="container">
          <div className="user-info">
            <div className="user-avatar">{user.email.charAt(0).toUpperCase()}</div>
            <div className="user-details">
              <h3>{user.email}</h3>
              <p>Personal Blog Dashboard</p>
            </div>
          </div>
          <div className="user-actions">
            <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
            <Link to="/create" className="btn btn-secondary">Write Post</Link>
            <button onClick={toggleTheme} className="btn btn-secondary">
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </div>
        </div>
      </div>
      
      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="nav-logo">
              The Blog Spot
            </Link>
            
            <div className="nav-center">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  Search
                </button>
              </form>
            </div>

            <div className={`nav-links ${isOpen ? 'nav-open' : ''}`}>
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Posts
              </Link>

              <Link 
                to="/bookmarks" 
                className={`nav-link ${isActive('/bookmarks') ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Bookmarks
              </Link>
            </div>

            <button 
              className="nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;