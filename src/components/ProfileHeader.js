import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../firebase/auth';
import './ProfileHeader.css';

const ProfileHeader = ({ user, showToast, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();

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
      <div className="auth-header">
        <div className="container">
          <div className="auth-content">
            <h1>Welcome to The Blog Spot</h1>
            <p>Please login to access your personal blog dashboard</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-header">
      <div className="container">
        <div className="profile-content">
          <div className="profile-info">
            <div className="avatar">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h2>{user.email}</h2>
              <p>Personal Blog Dashboard</p>
              <div className="user-stats">
                <span>Writer</span>
                <span>Content Creator</span>
                <span>Blogger</span>
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <Link to="/create" className="btn btn-primary">
              Write Post
            </Link>
            <Link to="/analytics" className="btn btn-secondary">
              Analytics
            </Link>
            <button onClick={toggleTheme} className="btn btn-icon" title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </div>
        </div>
        
        <div className="quick-nav">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/bookmarks" className="nav-item">Bookmarks</Link>
          <Link to="/trending" className="nav-item">Trending</Link>
          <Link to="/search" className="nav-item">Search</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;