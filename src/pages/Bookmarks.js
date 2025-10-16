import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import './Home.css';

const Bookmarks = ({ posts, onDeletePost, onLikePost, onTogglePin, onBookmarkPost, showToast, currentUser }) => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  useEffect(() => {
    // Filter posts that are bookmarked by current user
    const bookmarks = posts.filter(post => 
      post.bookmarkedBy?.includes(currentUser)
    );
    setBookmarkedPosts(bookmarks);
  }, [posts, currentUser]);

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
            <div className="bookmarks-header">
              <h1>🔖 Saved Posts</h1>
              <p>Posts you've bookmarked for later reading</p>
            </div>

            {bookmarkedPosts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-content">
                  <h2>No bookmarks yet</h2>
                  <p>Bookmark posts to save them for later reading</p>
                </div>
              </div>
            ) : (
              <div className="posts-grid">
                {bookmarkedPosts.map(post => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    onDelete={handleDelete}
                    onLike={onLikePost}
                    onTogglePin={onTogglePin}
                    onBookmark={onBookmarkPost}
                    showActions={true}
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

export default Bookmarks;