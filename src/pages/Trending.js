import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import './Home.css';

const Trending = ({ posts, onDeletePost, onLikePost, onTogglePin, onBookmarkPost, showToast, currentUser }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    // Calculate trending posts based on views and likes in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const trending = posts
      .filter(post => new Date(post.createdAt) >= sevenDaysAgo)
      .sort((a, b) => {
        const scoreA = (a.views || 0) + (a.likes || 0) * 2;
        const scoreB = (b.views || 0) + (b.likes || 0) * 2;
        return scoreB - scoreA;
      })
      .slice(0, 10);

    setTrendingPosts(trending);
  }, [posts]);

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

  return (
    <div className="home">
      <div className="container">
        <div className="home-content">
          <main className="main-content">
            <div className="trending-header">
              <h1>🔥 Trending Posts</h1>
              <p>Most popular posts from the last 7 days</p>
            </div>

            {trendingPosts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-content">
                  <h2>No trending posts yet</h2>
                  <p>Posts will appear here as they gain popularity</p>
                </div>
              </div>
            ) : (
              <div className="posts-grid">
                {trendingPosts.map(post => (
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

export default Trending;