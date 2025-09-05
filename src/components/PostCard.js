import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post, onDelete, showActions = true, currentUser = 'current_user' }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const handleCardClick = () => {
    // Views are now display-only, no automatic increment
  };

  return (
    <article className="post-card">
      <div className="post-content">
        <div className="post-header">
          <Link to={`/category/${post.category}`} className="category-badge">
            {post.category}
          </Link>
        </div>
        
        <h3 className="post-title">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h3>
        
        <p className="post-excerpt">{post.excerpt || post.content.substring(0, 150) + '...'}</p>
        
        <div className="post-footer">
          <div className="post-info">
            <span className="author">By {post.author}</span>
            <span className="date">📅 {formatDate(post.createdAt)}</span>
            <span className="reading-time">📖 {calculateReadingTime(post.content)} min read</span>
          </div>
          
          <div className="post-stats">

            <span className="views">👁️ {post.views || 0}</span>
            <span className="comments">💬 {post.comments?.length || 0}</span>

          </div>
        </div>
        
        {showActions && (
          <div className="post-actions">

            <Link to={`/edit/${post.id}`} className="action-btn">Edit</Link>
            <button onClick={() => onDelete(post.id)} className="action-btn delete">Delete</button>
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;