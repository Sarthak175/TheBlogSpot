import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import './Home.css';

const Category = ({ posts, onDeletePost, onLikePost, onTogglePin, onBookmarkPost, showToast, currentUser }) => {
  const { categoryName } = useParams();
  const [categoryPosts, setCategoryPosts] = useState([]);

  useEffect(() => {
    // Filter posts by category
    const filtered = posts.filter(post => 
      post.category?.toLowerCase() === categoryName?.toLowerCase()
    );
    setCategoryPosts(filtered);
  }, [posts, categoryName]);

  const handleDelete = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post && (post.authorId !== currentUser && currentUser !== 'admin')) {
      showToast('You can only delete your own posts', 'error');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDeletePost(postId);
      showToast('Post deleted successfully!', 'success');
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'technology': '💻',
      'design': '🎨',
      'business': '💼',
      'lifestyle': '🌟',
      'travel': '✈️',
      'general': '📝'
    };
    return icons[category?.toLowerCase()] || '📝';
  };

  return (
    <div className="home">
      <div className="container">
        <div className="home-content">
          <main className="main-content">
            <div className="category-header">
              <h1>{getCategoryIcon(categoryName)} {categoryName} Posts</h1>
              <p>All posts in the {categoryName} category</p>
            </div>

            {categoryPosts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-content">
                  <h2>No posts in this category yet</h2>
                  <p>Be the first to create a {categoryName} post!</p>
                </div>
              </div>
            ) : (
              <div className="posts-grid">
                {categoryPosts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onDelete={handleDelete}
                    onLike={onLikePost}
                    onTogglePin={onTogglePin}
                    onBookmark={onBookmarkPost}
                    showActions={post.authorId === currentUser || currentUser === 'admin'}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Category;