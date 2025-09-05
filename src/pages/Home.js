import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import './Home.css';

const Home = ({ posts, onDeletePost, onViewPost, showToast, searchQuery, currentUser }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Calculate real categories from actual posts
  const categoryStats = posts.reduce((acc, post) => {
    const category = post.category || 'General';
    if (!acc[category]) {
      acc[category] = {
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-'),
        count: 0
      };
    }
    acc[category].count++;
    return acc;
  }, {});

  const categories = Object.values(categoryStats);

  useEffect(() => {
    // Show only current user's posts
    let filtered = posts.filter(post => post.authorId === currentUser);
    
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [posts, searchQuery, currentUser]);

  const handleDelete = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDeletePost(postId);
    }
  };

  const handleSubscribe = (email) => {
    showToast('Successfully subscribed to newsletter!', 'success');
  };



  const handleViewPost = (postId) => {
    onViewPost(postId);
  };



  const userPosts = posts.filter(post => post.authorId === currentUser);
  const featuredPost = userPosts.length > 0 ? userPosts[0] : null;
  
  // Sort posts by date
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      <div className="home-header">
        <div className="container">
          <div className="header-content">
            <h1>Your Posts</h1>
            <p>Manage and view all your blog posts</p>
            <Link to="/create" className="btn btn-primary">Write New Post</Link>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="home-content">
          <main className="main-content">
            {searchQuery && (
              <div className="search-results-header">
                <h2>Search Results for "{searchQuery}"</h2>
                <p>{filteredPosts.length} posts found</p>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-content">
                  <div className="empty-icon">📝</div>
                  <h2>{searchQuery ? 'No posts found' : 'Start Your Blogging Journey'}</h2>
                  <p>
                    {searchQuery 
                      ? 'Try adjusting your search terms' 
                      : 'Create your first post and share your thoughts with the world!'}
                  </p>
                  {!searchQuery && (
                    <Link to="/create" className="btn btn-primary btn-large">
                      Write Your First Post
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="posts-grid">
                  {currentPosts.map(post => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      onDelete={handleDelete}



                      showActions={true}
                      currentUser={currentUser}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn btn-secondary pagination-btn"
                    >
                      Previous
                    </button>
                    
                    <div className="pagination-numbers">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => paginate(index + 1)}
                          className={`pagination-number ${
                            currentPage === index + 1 ? 'active' : ''
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="btn btn-secondary pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

          <Sidebar 
            posts={userPosts} 
            categories={categories}
            onSubscribe={handleSubscribe}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;