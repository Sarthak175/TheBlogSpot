import React from 'react';
import './Analytics.css';

const Analytics = ({ posts, currentUser }) => {
  const userPosts = posts.filter(post => post.authorId === currentUser);
  const totalViews = userPosts.reduce((sum, post) => sum + (post.views || 0), 0);
  const totalComments = userPosts.reduce((sum, post) => sum + (post.comments?.length || 0), 0);

  return (
    <div className="analytics">
      <div className="container">
        <h1>📊 Analytics Dashboard</h1>
        <p>Your blog performance and statistics</p>

        <div className="stats-overview">
          <div className="stat-card">
            <h3>📝 {userPosts.length}</h3>
            <p>Total Posts</p>
          </div>
          <div className="stat-card">
            <h3>👁️ {totalViews}</h3>
            <p>Total Views</p>
          </div>
          <div className="stat-card">
            <h3>💬 {totalComments}</h3>
            <p>Total Comments</p>
          </div>
          <div className="stat-card">
            <h3>📈 {userPosts.length ? Math.round(totalViews / userPosts.length) : 0}</h3>
            <p>Avg Views/Post</p>
          </div>
        </div>

        <div className="posts-performance">
          <h2>📈 Posts Performance</h2>
          <div className="posts-list">
            {userPosts.map(post => (
              <div key={post.id} className="post-stat">
                <h4>{post.title}</h4>
                <div className="post-metrics">
                  <span>👁️ {post.views || 0} views</span>
                  <span>💬 {post.comments?.length || 0} comments</span>
                  <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;