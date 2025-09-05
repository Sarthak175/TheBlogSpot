import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = ({ featuredPost, onTogglePin }) => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Welcome to The Blog Spot</h1>
            <p className="hero-subtitle">
              Discover amazing stories, insights, and ideas from our community of writers
            </p>
          </div>
          
          {featuredPost && (
            <div className="featured-post">
              <div className="featured-banner">
                <div className="banner-gradient">
                  <div className="banner-content">
                    <span className="banner-icon">📝</span>
                    <span className="banner-text">Featured Post</span>
                  </div>
                </div>
                <div className="featured-badge">Featured</div>
              </div>
              <div className="featured-content">
                <div className="featured-meta">
                  <span className="featured-category">{featuredPost.category}</span>
                  <span className="featured-date">{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                </div>
                <h2 className="featured-title">{featuredPost.title}</h2>
                <p className="featured-excerpt">{featuredPost.content.substring(0, 150)}...</p>

                <div className="featured-actions">
                  <Link to={`/edit/${featuredPost.id}`} className="btn btn-primary featured-btn">
                    Read More
                  </Link>
                  {onTogglePin && (featuredPost.authorId === 'current_user' || 'current_user' === 'admin') && (
                    <button 
                      onClick={() => onTogglePin(featuredPost.id)}
                      className={`btn ${featuredPost.isPinned ? 'btn-warning' : 'btn-secondary'} featured-btn`}
                    >
                      {featuredPost.isPinned ? '📌 Unpin' : '📌 Pin'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;