import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = ({ posts }) => {
  const categories = [
    { name: 'Technology', slug: 'tech', count: posts.filter(p => p.category === 'Technology').length, color: '#6366f1' },
    { name: 'Design', slug: 'design', count: posts.filter(p => p.category === 'Design').length, color: '#8b5cf6' },
    { name: 'Welcome', slug: 'welcome', count: posts.filter(p => p.category === 'Welcome').length, color: '#10b981' },
    { name: 'Business', slug: 'business', count: posts.filter(p => p.category === 'Business').length, color: '#f59e0b' },
    { name: 'Lifestyle', slug: 'lifestyle', count: posts.filter(p => p.category === 'Lifestyle').length, color: '#ef4444' },
    { name: 'Travel', slug: 'travel', count: posts.filter(p => p.category === 'Travel').length, color: '#06b6d4' }
  ];

  return (
    <div className="categories-page">
      <div className="container">
        <div className="page-header">
          <h1>Categories</h1>
          <p>Explore posts by category</p>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-icon" style={{ backgroundColor: category.color }}>
                {category.name.charAt(0)}
              </div>
              <h3>{category.name}</h3>
              <p>{category.count} posts</p>
              <Link to={`/category/${category.slug}`} className="btn btn-secondary">
                View Posts
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;