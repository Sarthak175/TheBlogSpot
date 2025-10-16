import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ posts, categories, onSubscribe }) => {
  const [email, setEmail] = useState('');

  const recentPosts = posts.slice(0, 5);
  const popularPosts = posts.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe(email);
      setEmail('');
    }
  };

  return (
    <aside className="sidebar">
      {/* Categories */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Categories</h3>
        <ul className="categories-list">
          {categories.filter(category => category.count > 0).map((category, index) => (
            <li key={index} className="category-item">
              <Link to={`/category/${category.name}`} className="category-link">
                <span className="category-name">{category.name}</span>
                <span className="category-count">({category.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Recent Posts</h3>
        <div className="posts-list">
          {recentPosts.map(post => (
            <div key={post.id} className="sidebar-post">
              <img 
                src={post.image || '/default-post.svg'} 
                alt={post.title} 
                className="sidebar-post-image"
                onError={(e) => {
                  e.target.src = '/default-post.svg';
                }}
              />
              <div className="sidebar-post-content">
                <Link to={`/edit/${post.id}`} className="sidebar-post-title">
                  {post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}
                </Link>
                <div className="sidebar-post-meta">
                  <span className="sidebar-post-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="sidebar-widget">
        <h3 className="widget-title">Popular Posts</h3>
        <div className="posts-list">
          {popularPosts.map(post => (
            <div key={post.id} className="sidebar-post">
              <img 
                src={post.image || '/default-post.svg'} 
                alt={post.title} 
                className="sidebar-post-image"
                onError={(e) => {
                  e.target.src = '/default-post.svg';
                }}
              />
              <div className="sidebar-post-content">
                <Link to={`/edit/${post.id}`} className="sidebar-post-title">
                  {post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}
                </Link>
                <div className="sidebar-post-meta">
                  <span className="sidebar-post-views">{post.views || 0} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="sidebar-widget newsletter-widget">
        <h3 className="widget-title">Stay Updated</h3>
        <p className="newsletter-description">
          Get the latest posts delivered right to your inbox
        </p>
        <form onSubmit={handleSubscribe} className="newsletter-form">
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
    </aside>
  );
};

export default Sidebar;