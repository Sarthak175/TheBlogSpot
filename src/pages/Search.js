import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import './Home.css';

const Search = ({ posts, onDeletePost, onLikePost, onTogglePin, onBookmarkPost, showToast, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery) {
      filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (filterBy !== 'all') {
      filtered = filtered.filter(post => post.category.toLowerCase() === filterBy);
    }

    // Sort posts
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case 'views':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, sortBy, filterBy]);

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
            <div className="search-header">
              <h1>🔍 Advanced Search</h1>
              <p>Find posts by title, content, author, category, or tags</p>
            </div>

            <div className="search-controls">
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input-advanced"
                />
              </div>

              <div className="filter-controls">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Liked</option>
                  <option value="views">Most Viewed</option>
                </select>

                <select 
                  value={filterBy} 
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  <option value="technology">Technology</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="travel">Travel</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <div className="search-results">
              <p className="results-count">
                {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
              </p>

              {filteredPosts.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-content">
                    <h2>No posts found</h2>
                    <p>Try adjusting your search terms or filters</p>
                  </div>
                </div>
              ) : (
                <div className="posts-grid">
                  {filteredPosts.map(post => (
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Search;