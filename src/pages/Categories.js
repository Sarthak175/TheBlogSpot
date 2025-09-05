import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';

const Categories = ({ posts }) => {
  // Get unique categories from actual posts
  const categoryStats = posts.reduce((acc, post) => {
    const category = post.category || 'General';
    if (!acc[category]) {
      acc[category] = {
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-'),
        count: 0,
        color: getColorForCategory(category)
      };
    }
    acc[category].count++;
    return acc;
  }, {});

  // Convert to array and sort by count
  const categories = Object.values(categoryStats)
    .filter(cat => cat.count > 0)
    .sort((a, b) => b.count - a.count);

  function getColorForCategory(category) {
    const colors = {
      'Technology': '#6366f1',
      'Design': '#8b5cf6', 
      'Welcome': '#10b981',
      'Business': '#f59e0b',
      'Lifestyle': '#ef4444',
      'Travel': '#06b6d4',
      'General': '#64748b'
    };
    return colors[category] || '#64748b';
  }

  return (
    <div className="categories-page">
      <div className="container">
        <div className="page-header">
          <h1>Categories</h1>
          <p>Explore posts by category</p>
        </div>

        <div className="categories-grid">
          {categories.length === 0 ? (
            <div className="no-categories">
              <p>No categories yet. Create some posts to see categories here!</p>
            </div>
          ) : (
            categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon" style={{ backgroundColor: category.color }}>
                  {category.name.charAt(0)}
                </div>
                <h3>{category.name}</h3>
                <p>{category.count} {category.count === 1 ? 'post' : 'posts'}</p>
                <Link to={`/category/${category.slug}`} className="btn btn-secondary">
                  View Posts
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;